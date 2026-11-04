#!/usr/bin/env node
/* Vérificateur STATIQUE du projet iOS (Capacitor 8, Swift Package Manager) — sans Mac, sans Xcode, sans CocoaPods.
 *
 * Ce que cet outil FAIT : analyser les fichiers versionnés sous ios/ (project.pbxproj, plists, storyboards, catalogues d'assets,
 * Package.swift, sources Swift) et les recouper avec package.json / capacitor.config.json / node_modules, pour détecter
 * avant le jour du Mac : syntaxe cassée, identifiants orphelins, fichiers manquants, versions incohérentes.
 * Ce qu'il NE FAIT PAS : compiler, résoudre les paquets Swift, signer, archiver. Un « tout vert » ici n'est PAS un build iOS validé.
 *
 * Usage : node tools/ios-static-check.mjs [racine-du-dépôt]   (code de sortie 1 si une vérification échoue)
 * API   : import { checkIosProject } from './tools/ios-static-check.mjs' → [{ id, ok, detail }]
 * Aucune dépendance : modules natifs de Node uniquement. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

/* ---------- Analyse du format plist « ancien » (project.pbxproj) ---------- */
export function parsePbx(src) {
  src = src.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  if (!src.startsWith('// !$*UTF8*$!')) throw new Error('en-tête « // !$*UTF8*$! » absent');
  let i = 0; const n = src.length;
  const line = () => src.slice(0, i).split('\n').length;
  const fail = m => { throw new Error(`${m} (ligne ${line()})`); };
  const ws = () => {
    for (;;) {
      while (i < n && /\s/.test(src[i])) i++;
      if (src.startsWith('/*', i)) { const e = src.indexOf('*/', i + 2); if (e < 0) fail('commentaire non fermé'); i = e + 2; }
      else if (src.startsWith('//', i)) { while (i < n && src[i] !== '\n') i++; }
      else break;
    }
  };
  const str = () => {
    i++; let o = '';
    while (i < n && src[i] !== '"') { if (src[i] === '\\') { o += src[i + 1]; i += 2; } else o += src[i++]; }
    if (src[i] !== '"') fail('chaîne non fermée'); i++; return o;
  };
  const lit = () => { const m = /^[A-Za-z0-9_$./\-]+/.exec(src.slice(i, i + 400)); if (!m) fail(`jeton inattendu « ${src[i]} »`); i += m[0].length; return m[0]; };
  const val = () => {
    ws();
    if (src[i] === '{') {
      i++; const o = Object.create(null);
      for (;;) {
        ws(); if (src[i] === '}') { i++; return o; }
        const k = src[i] === '"' ? str() : lit();
        ws(); if (src[i] !== '=') fail(`« = » attendu après la clé ${k}`); i++;
        const v = val(); ws();
        if (src[i] !== ';') fail(`« ; » attendu après la valeur de ${k}`); i++;
        if (k in o) fail(`clé dupliquée ${k}`);
        o[k] = v;
      }
    }
    if (src[i] === '(') {
      i++; const a = [];
      for (;;) {
        ws(); if (src[i] === ')') { i++; return a; }
        a.push(val()); ws();
        if (src[i] === ',') i++; else if (src[i] !== ')') fail('« , » ou « ) » attendu dans une liste');
      }
    }
    if (src[i] === '"') return str();
    return lit();
  };
  ws(); if (src[i] !== '{') fail('« { » racine attendu');
  const root = val(); ws(); if (i < n) fail('contenu après l’objet racine');
  return root;
}

/* ---------- XML strict minimal (bien formé : balises, attributs, entités, racine unique) ---------- */
export function parseXml(src) {
  src = src.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  let i = 0; const n = src.length;
  const root = { name: '#doc', attrs: {}, children: [], text: '' }; const stack = [root]; let rootCount = 0, sawDoctype = false;
  const line = () => src.slice(0, i).split('\n').length;
  const fail = m => { throw new Error(`${m} (ligne ${line()})`); };
  const ent = /&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9A-Fa-f]+);/y;
  const text = t => {
    for (let k = 0; k < t.length; k++) if (t[k] === '&') { ent.lastIndex = k; if (!ent.test(t)) { i -= t.length - k; fail('« & » isolé ou entité invalide'); } }
    const top = stack[stack.length - 1];
    if (stack.length === 1 && t.trim()) fail('texte en dehors de l’élément racine');
    top.text += t;
  };
  if (!/^<\?xml[^>]*\?>/.test(src)) fail('déclaration <?xml ... ?> absente');
  while (i < n) {
    const lt = src.indexOf('<', i);
    if (lt < 0) { text(src.slice(i)); i = n; break; }
    if (lt > i) { const t = src.slice(i, lt); i = lt; text(t); }
    if (src.startsWith('<!--', i)) { const e = src.indexOf('-->', i + 4); if (e < 0) fail('commentaire non fermé'); if (src.slice(i + 4, e).includes('--')) fail('« -- » interdit dans un commentaire'); i = e + 3; continue; }
    if (src.startsWith('<?', i)) { const e = src.indexOf('?>', i); if (e < 0) fail('instruction <? non fermée'); i = e + 2; continue; }
    if (src.startsWith('<![CDATA[', i)) { const e = src.indexOf(']]>', i); if (e < 0) fail('CDATA non fermé'); stack[stack.length - 1].text += src.slice(i + 9, e); i = e + 3; continue; }
    if (src.startsWith('<!DOCTYPE', i)) { if (rootCount || sawDoctype) fail('DOCTYPE mal placé'); const e = src.indexOf('>', i); if (e < 0) fail('DOCTYPE non fermé'); sawDoctype = true; i = e + 1; continue; }
    if (src.startsWith('</', i)) {
      const m = /^<\/([A-Za-z_][\w:.\-]*)\s*>/.exec(src.slice(i, i + 200)); if (!m) fail('balise fermante invalide');
      const top = stack[stack.length - 1]; if (stack.length === 1 || top.name !== m[1]) fail(`balise fermante </${m[1]}> inattendue (ouverte : ${stack.length === 1 ? 'aucune' : top.name})`);
      stack.pop(); i += m[0].length; continue;
    }
    const m = /^<([A-Za-z_][\w:.\-]*)/.exec(src.slice(i, i + 200)); if (!m) fail('« < » isolé');
    i += m[0].length; const attrs = {};
    for (;;) {
      const w = /^\s+([A-Za-z_][\w:.\-]*)\s*=\s*("([^"<]*)"|'([^'<]*)')/.exec(src.slice(i));
      if (!w) break;
      if (w[1] in attrs) fail(`attribut dupliqué ${w[1]}`);
      attrs[w[1]] = w[3] !== undefined ? w[3] : w[4]; i += w[0].length;
    }
    const end = /^\s*(\/?)>/.exec(src.slice(i, i + 20)); if (!end) fail(`balise <${m[1]}> mal formée`);
    i += end[0].length;
    const node = { name: m[1], attrs, children: [], text: '' };
    const parent = stack[stack.length - 1]; if (stack.length === 1) { if (++rootCount > 1) fail('plusieurs éléments racines'); }
    parent.children.push(node);
    if (!end[1]) stack.push(node);
  }
  if (stack.length !== 1) fail(`balise <${stack[stack.length - 1].name}> non fermée`);
  if (rootCount !== 1) fail('aucun élément racine');
  return root.children[0];
}

/* Plist XML → valeur JS ; clés dupliquées et types inconnus refusés. */
export function plistValue(node) {
  switch (node.name) {
    case 'string': return node.text;
    case 'integer': if (!/^-?\d+$/.test(node.text.trim())) throw new Error('integer invalide'); return Number(node.text);
    case 'real': if (!Number.isFinite(Number(node.text))) throw new Error('real invalide'); return Number(node.text);
    case 'true': return true; case 'false': return false;
    case 'date': case 'data': return node.text.trim();
    case 'array': return node.children.map(plistValue);
    case 'dict': {
      const o = {}; if (node.children.length % 2) throw new Error('dict : clé sans valeur');
      for (let k = 0; k < node.children.length; k += 2) {
        const key = node.children[k]; if (key.name !== 'key') throw new Error(`dict : <key> attendu, trouvé <${key.name}>`);
        if (key.text in o) throw new Error(`clé plist dupliquée ${key.text}`);
        o[key.text] = plistValue(node.children[k + 1]);
      }
      return o;
    }
    default: throw new Error(`type plist inconnu <${node.name}>`);
  }
}
export function parsePlist(src) {
  const root = parseXml(src); if (root.name !== 'plist' || root.attrs.version !== '1.0') throw new Error('racine <plist version="1.0"> attendue');
  if (root.children.length !== 1) throw new Error('<plist> doit contenir un seul élément');
  return plistValue(root.children[0]);
}

/* ---------- PNG : en-tête, CRC de chaque bloc, décompression complète ---------- */
const CRC = (() => { const t = new Uint32Array(256); for (let k = 0; k < 256; k++) { let c = k; for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[k] = c >>> 0; } return t; })();
const crc32 = b => { let c = 0xffffffff; for (const x of b) c = CRC[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
export function inspectPng(file) {
  const b = fs.readFileSync(file);
  if (b.length < 33 || b.readUInt32BE(0) !== 0x89504e47 || b.readUInt32BE(4) !== 0x0d0a1a0a) throw new Error('signature PNG invalide');
  let off = 8, ihdr = null, trns = false, end = false; const idat = [];
  while (off < b.length) {
    if (off + 12 > b.length) throw new Error('bloc PNG tronqué');
    const len = b.readUInt32BE(off), type = b.toString('latin1', off + 4, off + 8);
    if (off + 12 + len > b.length) throw new Error(`bloc ${type} tronqué`);
    const data = b.subarray(off + 8, off + 8 + len);
    if (crc32(b.subarray(off + 4, off + 8 + len)) !== b.readUInt32BE(off + 8 + len)) throw new Error(`CRC invalide (bloc ${type})`);
    if (type === 'IHDR') ihdr = { w: data.readUInt32BE(0), h: data.readUInt32BE(4), depth: data[8], ct: data[9], interlace: data[12] };
    else if (type === 'IDAT') idat.push(data); else if (type === 'tRNS') trns = true; else if (type === 'IEND') end = true;
    off += 12 + len;
  }
  if (!ihdr) throw new Error('IHDR absent'); if (!end) throw new Error('IEND absent');
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const ch = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ihdr.ct];
  if (!ihdr.interlace && ihdr.depth === 8 && raw.length !== ihdr.h * (ihdr.w * ch + 1)) throw new Error('taille des données image incohérente');
  return { ...ihdr, trns, hasAlpha: ihdr.ct === 4 || ihdr.ct === 6 || trns };
}

/* ---------- Utilitaires ---------- */
const semver = v => { const m = /^(\d+)\.(\d+)\.(\d+)/.exec(v || ''); return m ? [+m[1], +m[2], +m[3]] : null; };
const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
const stripSwift = s => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"(?:\\.|[^"\\\n])*"/g, '""').replace(/\/\/.*$/gm, '');
const HEX24 = /^[0-9A-F]{24}$/;

export function checkIosProject(root, opts = {}) {
  const R = [];
  const T = (id, ok, detail = '') => R.push({ id, ok: !!ok, detail: String(detail).slice(0, 700) });
  const guard = (id, fn) => { try { fn(); } catch (e) { T(id + ' (exception)', false, e && e.message || e); } };
  const nm = opts.nodeModules || path.join(root, 'node_modules');
  const ios = path.join(root, 'ios'), proj = path.join(ios, 'App'), appDir = path.join(proj, 'App');
  const rd = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/\r\n?/g, '\n') : null;
  const jsonOf = p => { const t = rd(p); if (t === null) return null; return JSON.parse(t); };
  const pkg = (() => { try { return jsonOf(path.join(root, 'package.json')) || {}; } catch { return {}; } })();
  const cfg = (() => { try { return jsonOf(path.join(root, 'capacitor.config.json')) || {}; } catch { return {}; } })();
  const dev = pkg.devDependencies || {};
  const iosGen = new Set((rd(path.join(ios, '.gitignore')) || '').split('\n').map(s => s.trim()).filter(Boolean));

  /* 1. project.pbxproj */
  let P = null, objs = null;
  const pbxPath = path.join(proj, 'App.xcodeproj', 'project.pbxproj');
  guard('pbxproj : syntaxe', () => {
    const src = rd(pbxPath); if (src === null) return T('project.pbxproj présent', false, pbxPath);
    P = parsePbx(src); objs = P.objects;
    T('project.pbxproj : syntaxe plist ancien format valide (accolades, « ; », « = », listes, pas de clé dupliquée)', P && objs && typeof objs === 'object', '');
  });
  if (P && objs) {
    guard('pbxproj : identifiants', () => {
      const bad = Object.keys(objs).filter(k => !HEX24.test(k));
      T('pbxproj : tous les identifiants d’objets sont 24 hexadécimaux majuscules (donc uniques : clés dupliquées refusées à l’analyse)', !bad.length, bad.join(', '));
      const refs = new Set(); const walk = v => { if (typeof v === 'string') { if (HEX24.test(v)) refs.add(v); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (HEX24.test(k)) refs.add(k); walk(x); } };
      for (const o of Object.values(objs)) walk(o); walk(P.rootObject);
      const dang = [...refs].filter(r => !(r in objs));
      T('pbxproj : aucune référence d’identifiant vers un objet inexistant', !dang.length, dang.join(', '));
      const reach = new Set(); const visit = id => { if (reach.has(id) || !(id in objs)) return; reach.add(id); const w = v => { if (typeof v === 'string') { if (HEX24.test(v)) visit(v); } else if (Array.isArray(v)) v.forEach(w); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (HEX24.test(k)) visit(k); w(x); } }; w(objs[id]); };
      visit(P.rootObject);
      const orphan = Object.keys(objs).filter(k => !reach.has(k));
      T('pbxproj : tous les objets sont atteignables depuis rootObject (aucun objet orphelin)', !orphan.length, orphan.join(', '));
      T('pbxproj : rootObject est un PBXProject, archiveVersion 1, objectVersion lisible', objs[P.rootObject] && objs[P.rootObject].isa === 'PBXProject' && P.archiveVersion === '1' && /^\d+$/.test(P.objectVersion), `${P.archiveVersion}/${P.objectVersion}`);
    });
    const of = isa => Object.entries(objs).filter(([, o]) => o.isa === isa);
    const project = objs[P.rootObject];
    const targets = (project.targets || []).map(t => objs[t]);
    guard('pbxproj : cible', () => {
      T('pbxproj : une seule cible « App » de type application', targets.length === 1 && targets[0].name === 'App' && targets[0].productType === 'com.apple.product-type.application', targets.map(t => t.name).join(','));
      const t = targets[0];
      const phases = (t.buildPhases || []).map(p => objs[p].isa);
      T('pbxproj : phases de build Sources, Frameworks, Resources (dans cet ordre)', JSON.stringify(phases) === JSON.stringify(['PBXSourcesBuildPhase', 'PBXFrameworksBuildPhase', 'PBXResourcesBuildPhase']), phases.join(','));
      const used = new Map();
      for (const ph of t.buildPhases) for (const f of objs[ph].files) used.set(f, (used.get(f) || 0) + 1);
      const bf = of('PBXBuildFile').map(([id]) => id);
      T('pbxproj : chaque PBXBuildFile est utilisé par exactement une phase', bf.every(id => used.get(id) === 1) && [...used.keys()].every(id => bf.includes(id)), bf.filter(id => used.get(id) !== 1).join(','));
      const badBf = of('PBXBuildFile').filter(([, o]) => {
        if (o.fileRef) return !objs[o.fileRef] || !['PBXFileReference', 'PBXVariantGroup'].includes(objs[o.fileRef].isa);
        if (o.productRef) return !objs[o.productRef] || objs[o.productRef].isa !== 'XCSwiftPackageProductDependency';
        return true;
      }).map(([id]) => id);
      T('pbxproj : chaque PBXBuildFile pointe vers un PBXFileReference / PBXVariantGroup (ou un produit de paquet Swift) existant', !badBf.length, badBf.join(','));
      const name = id => { const b = objs[id], r = objs[b.fileRef || b.productRef]; return r.name || r.path || r.productName; };
      const srcFiles = objs[t.buildPhases[0]].files.map(name), resFiles = objs[t.buildPhases[2]].files.map(name);
      T('pbxproj : phase Sources = uniquement des .swift', srcFiles.length && srcFiles.every(f => /\.swift$/.test(f)), srcFiles.join(','));
      const onDisk = fs.existsSync(appDir) ? fs.readdirSync(appDir).filter(f => /\.swift$/.test(f)) : [];
      T('pbxproj : tout fichier .swift du dossier ios/App/App est compilé (phase Sources), et inversement', JSON.stringify([...onDisk].sort()) === JSON.stringify([...srcFiles].sort()), `disque=${onDisk} projet=${srcFiles}`);
      const wantRes = ['LaunchScreen.storyboard', 'Main.storyboard', 'Assets.xcassets', 'PrivacyInfo.xcprivacy', 'capacitor.config.json', 'config.xml', 'public'];
      T('pbxproj : phase Resources contient storyboards, Assets.xcassets, PrivacyInfo.xcprivacy et les ressources générées par « cap sync » (capacitor.config.json, config.xml, public)', wantRes.every(w => resFiles.includes(w)) && resFiles.length === wantRes.length, resFiles.join(','));
      T('pbxproj : Info.plist n’est PAS dans les ressources (il est lu via INFOPLIST_FILE)', !resFiles.includes('Info.plist'), '');
      const fw = objs[t.buildPhases[1]].files.map(name);
      T('pbxproj : phase Frameworks = produit CapApp-SPM uniquement', JSON.stringify(fw) === '["CapApp-SPM"]', fw.join(','));
      const dep = (t.packageProductDependencies || []).map(d => objs[d]);
      T('pbxproj : dépendance de paquet Swift locale « CapApp-SPM » (XCLocalSwiftPackageReference, chemin relatif CapApp-SPM)', dep.length === 1 && dep[0].productName === 'CapApp-SPM' && objs[dep[0].package].isa === 'XCLocalSwiftPackageReference' && objs[dep[0].package].relativePath === 'CapApp-SPM' && project.packageReferences.includes(dep[0].package), '');
      T('pbxproj : productReference = App.app (BUILT_PRODUCTS_DIR) dans le groupe Products', objs[t.productReference].path === 'App.app' && objs[t.productReference].sourceTree === 'BUILT_PRODUCTS_DIR', '');
    });
    guard('pbxproj : fichiers sur disque', () => {
      const miss = [], gen = [];
      const walk = (id, dir) => {
        const o = objs[id];
        if (o.isa === 'PBXGroup' || o.isa === 'PBXVariantGroup') {
          const d = o.path && o.sourceTree === '<group>' ? path.join(dir, o.path) : dir;
          for (const c of o.children) walk(c, d);
        } else if (o.isa === 'PBXFileReference') {
          if (o.sourceTree === 'BUILT_PRODUCTS_DIR') return;
          const p = o.sourceTree === 'SOURCE_ROOT' ? path.join(proj, o.path) : path.join(dir, o.path);
          if (!fs.existsSync(p)) { const rel = path.relative(appDir, p).split(path.sep).join('/'); (iosGen.has('App/App/' + rel) ? gen : miss).push(rel); }
        }
      };
      walk(project.mainGroup, proj);
      T('pbxproj : chaque fichier référencé existe sur disque (hors fichiers générés par « cap sync »)', !miss.length, miss.join(', '));
      const expected = ['capacitor.config.json', 'config.xml', 'public'];
      T('pbxproj : seuls capacitor.config.json, config.xml et public sont absents du dépôt, et ils sont ignorés par ios/.gitignore (générés par « npm run ios:sync » : à lancer AVANT d’ouvrir Xcode)',
        expected.every(e => iosGen.has('App/App/' + e) || (e === 'public' && iosGen.has('App/App/public'))) && gen.every(g => expected.includes(g)), gen.join(', '));
      const variants = of('PBXVariantGroup').flatMap(([, o]) => o.children.map(c => objs[c]));
      T('pbxproj : variantes de storyboards en Base.lproj, région Base déclarée dans knownRegions, developmentRegion déclarée', variants.every(v => v.name === 'Base' && /^Base\.lproj\//.test(v.path)) && project.knownRegions.includes('Base') && project.knownRegions.includes(project.developmentRegion), `${project.developmentRegion} / ${project.knownRegions}`);
    });
    guard('pbxproj : configurations', () => {
      const lists = of('XCConfigurationList').map(([, o]) => o);
      T('pbxproj : projet et cible ont chacun les configurations Debug et Release (défaut Release)', lists.length === 2 && lists.every(l => JSON.stringify(l.buildConfigurations.map(c => objs[c].name)) === '["Debug","Release"]' && l.defaultConfigurationName === 'Release'), '');
      const tl = objs[targets[0].buildConfigurationList], pl = objs[project.buildConfigurationList];
      const tcfg = n => objs[tl.buildConfigurations.find(c => objs[c].name === n)], pcfg = n => objs[pl.buildConfigurations.find(c => objs[c].name === n)];
      const all = [tcfg('Debug'), tcfg('Release'), pcfg('Debug'), pcfg('Release')];
      const spm = rd(path.join(proj, 'CapApp-SPM', 'Package.swift')) || '';
      const spmMin = +((/\.iOS\(\.v(\d+)\)/.exec(spm) || [])[1] || 0);
      const targ = all.map(c => c.buildSettings.IPHONEOS_DEPLOYMENT_TARGET);
      T('IPHONEOS_DEPLOYMENT_TARGET identique dans les 4 configurations et égal à la plateforme de CapApp-SPM/Package.swift (iOS 15 = minimum de Capacitor 8)', targ.every(v => v === '15.0') && spmMin === 15, JSON.stringify({ targ, spmMin }));
      const same = (k, v) => ['Debug', 'Release'].every(n => tcfg(n).buildSettings[k] === v);
      T('PRODUCT_BUNDLE_IDENTIFIER = fr.finot.academie (Debug et Release) = appId de capacitor.config.json', same('PRODUCT_BUNDLE_IDENTIFIER', 'fr.finot.academie') && cfg.appId === 'fr.finot.academie', cfg.appId);
      const mv = ['Debug', 'Release'].map(n => tcfg(n).buildSettings.MARKETING_VERSION), cv = ['Debug', 'Release'].map(n => tcfg(n).buildSettings.CURRENT_PROJECT_VERSION);
      let sv = null; try { sv = (jsonOf(path.join(root, 'android', 'store-version.json')) || {}).versionName; } catch { /* absent */ }
      T('MARKETING_VERSION identique en Debug/Release, au format X.Y.Z, égale à android/store-version.json ; CURRENT_PROJECT_VERSION entier ≥ 1 identique', mv[0] === mv[1] && /^\d+\.\d+\.\d+$/.test(mv[0]) && (sv === null || sv === mv[0]) && cv[0] === cv[1] && /^[1-9]\d*$/.test(cv[0]), JSON.stringify({ mv, cv, sv }));
      T('TARGETED_DEVICE_FAMILY = "1,2" (iPhone + iPad) en Debug et Release', same('TARGETED_DEVICE_FAMILY', '1,2'), '');
      const teams = all.map(c => c.buildSettings.DEVELOPMENT_TEAM).filter(v => v !== undefined);
      T('DEVELOPMENT_TEAM absent ou vide partout (aucun identifiant d’équipe Apple dans le dépôt public)', teams.every(v => v === '' || v === '""'), teams.join(','));
      T('Signature automatique (CODE_SIGN_STYLE = Automatic), aucun PROVISIONING_PROFILE figé, aucun CODE_SIGN_ENTITLEMENTS', same('CODE_SIGN_STYLE', 'Automatic') && all.every(c => c.buildSettings.PROVISIONING_PROFILE === undefined && c.buildSettings.PROVISIONING_PROFILE_SPECIFIER === undefined && c.buildSettings.CODE_SIGN_ENTITLEMENTS === undefined), '');
      const iconSet = fs.existsSync(path.join(appDir, 'Assets.xcassets')) ? fs.readdirSync(path.join(appDir, 'Assets.xcassets')).filter(f => f.endsWith('.appiconset')).map(f => f.replace('.appiconset', '')) : [];
      T('ASSETCATALOG_COMPILER_APPICON_NAME désigne un .appiconset existant', same('ASSETCATALOG_COMPILER_APPICON_NAME', 'AppIcon') && iconSet.includes('AppIcon'), iconSet.join(','));
      T('INFOPLIST_FILE pointe vers un Info.plist existant (relatif à ios/App)', same('INFOPLIST_FILE', 'App/Info.plist') && fs.existsSync(path.join(proj, 'App', 'Info.plist')), '');
      T('SWIFT_VERSION défini ; SDKROOT = iphoneos dans les deux configurations du projet', /^5(\.\d)?$/.test(tcfg('Debug').buildSettings.SWIFT_VERSION || '') && pcfg('Debug').buildSettings.SDKROOT === 'iphoneos' && pcfg('Release').buildSettings.SDKROOT === 'iphoneos', '');
      const base = objs[tcfg('Debug').baseConfigurationReference];
      const xc = base && rd(path.join(proj, base.path));
      T('Configuration Debug rattachée à ios/debug.xcconfig (CAPACITOR_DEBUG = true) ; Release sans xcconfig (CAPACITOR_DEBUG vide en Release)', base && base.path === '../debug.xcconfig' && /CAPACITOR_DEBUG\s*=\s*true/.test(xc || '') && tcfg('Release').baseConfigurationReference === undefined, '');
      T('Release : optimisation -O, module entier, symboles dSYM ; Debug : -Onone et DEBUG défini', pcfg('Release').buildSettings.SWIFT_OPTIMIZATION_LEVEL === '-O' && pcfg('Release').buildSettings.DEBUG_INFORMATION_FORMAT === 'dwarf-with-dsym' && pcfg('Debug').buildSettings.SWIFT_OPTIMIZATION_LEVEL === '-Onone' && tcfg('Debug').buildSettings.SWIFT_ACTIVE_COMPILATION_CONDITIONS === 'DEBUG', '');
    });
  }

  /* 2. Info.plist, PrivacyInfo, plists divers */
  let plist = null;
  guard('Info.plist', () => {
    const src = rd(path.join(appDir, 'Info.plist')); if (src === null) return T('Info.plist présent', false, '');
    plist = parsePlist(src);
    T('Info.plist : XML bien formé et plist valide (types, paires clé/valeur, pas de clé dupliquée)', true);
    const miss = ['CFBundleDevelopmentRegion', 'CFBundleDisplayName', 'CFBundleExecutable', 'CFBundleIdentifier', 'CFBundleInfoDictionaryVersion', 'CFBundleName', 'CFBundlePackageType', 'CFBundleShortVersionString', 'CFBundleVersion', 'LSRequiresIPhoneOS', 'UILaunchStoryboardName', 'UIRequiredDeviceCapabilities', 'UISupportedInterfaceOrientations', 'UISupportedInterfaceOrientations~ipad', 'UIApplicationSceneManifest'].filter(k => !(k in plist));
    T('Info.plist : clés obligatoires présentes (identité, version, lancement, orientations, scene manifest)', !miss.length, miss.join(','));
    const vars = new Set(); for (const v of JSON.stringify(plist).matchAll(/\$\(([A-Z_a-z0-9]+)\)/g)) vars.add(v[1]);
    const known = new Set(['EXECUTABLE_NAME', 'PRODUCT_BUNDLE_IDENTIFIER', 'PRODUCT_NAME', 'MARKETING_VERSION', 'CURRENT_PROJECT_VERSION', 'PRODUCT_MODULE_NAME', 'CAPACITOR_DEBUG']);
    T('Info.plist : toutes les variables $(…) sont des réglages Xcode connus ou définis par le projet', [...vars].every(v => known.has(v)), [...vars].filter(v => !known.has(v)).join(','));
    const ph = plist['UISupportedInterfaceOrientations'], pad = plist['UISupportedInterfaceOrientations~ipad'];
    const all4 = ['Portrait', 'PortraitUpsideDown', 'LandscapeLeft', 'LandscapeRight'].map(o => 'UIInterfaceOrientation' + o);
    T('Orientations : valeurs valides sans doublon ; iPhone ⊂ iPad ; iPad = les 4 orientations (exigé par Apple pour le multitâche tant que UIRequiresFullScreen est absent)', [ph, pad].every(a => Array.isArray(a) && new Set(a).size === a.length && a.every(x => all4.includes(x))) && ph.every(x => pad.includes(x)) && pad.length === 4 && plist.UIRequiresFullScreen === undefined && plist['UIRequiresFullScreen~ipad'] === undefined, JSON.stringify({ ph, pad }));
    T('Info.plist : aucune clé de permission (*UsageDescription), de suivi, d’URL, d’ATS, d’arrière-plan ni d’UIFileSharing', !Object.keys(plist).some(k => /UsageDescription$|^NSUserTracking|^NSAppTransportSecurity$|^CFBundleURLTypes$|^LSApplicationQueriesSchemes$|^UIBackgroundModes$|^UIFileSharingEnabled$|^LSSupportsOpeningDocumentsInPlace$|^WKAppBoundDomains$/.test(k)), Object.keys(plist).join(','));
    const sm = plist.UIApplicationSceneManifest || {}, conf = ((sm.UISceneConfigurations || {}).UIWindowSceneSessionRoleApplication || [])[0] || {};
    const sd = rd(path.join(appDir, 'SceneDelegate.swift')) || '', ad = rd(path.join(appDir, 'AppDelegate.swift')) || '';
    const sdc = stripSwift(sd), adc = stripSwift(ad);
    const cls = /^\$\(PRODUCT_MODULE_NAME\)\.(\w+)$/.exec(conf.UISceneDelegateClassName || '');
    T('Scene manifest : un seul rôle, mono-fenêtre (UIApplicationSupportsMultipleScenes = false), configuration « Default Configuration »', sm.UIApplicationSupportsMultipleScenes === false && Object.keys(sm.UISceneConfigurations || {}).length === 1 && conf.UISceneConfigurationName === 'Default Configuration', JSON.stringify(conf));
    T('Scene manifest : UISceneDelegateClassName désigne une classe UIWindowSceneDelegate définie dans SceneDelegate.swift', cls && new RegExp(`class\\s+${cls[1]}\\b[^{]*UIWindowSceneDelegate`).test(sdc), conf.UISceneDelegateClassName);
    T('AppDelegate.swift : retourne la configuration « Default Configuration » avec SceneDelegate, un seul point d’entrée (@UIApplicationMain XOR @main)', cls && /UISceneConfiguration\(name:\s*""/.test(adc) && ad.includes('name: "Default Configuration"') && new RegExp(`delegateClass\\s*=\\s*${cls[1]}\\.self`).test(adc) && ((adc.match(/@UIApplicationMain/g) || []).length + (adc.match(/@main\b/g) || []).length) === 1, '');
    T('SceneDelegate.swift : importe Capacitor, installe CAPBridgeViewController, relaie vers SceneDelegateProxy (openURL / continue / willConnectTo)', /import Capacitor/.test(sdc) && /CAPBridgeViewController\(\)/.test(sdc) && ['willConnectTo', 'openURLContexts', 'continue'].every(m => new RegExp(`SceneDelegateProxy\\.shared\\.scene\\(scene, ${m}`).test(sdc)), '');
    const bal = s => { let d = 0; for (const c of s) { if (c === '{') d++; else if (c === '}') d--; if (d < 0) return false; } return d === 0; };
    T('Sources Swift : accolades équilibrées (AppDelegate, SceneDelegate, CapApp-SPM)', [adc, sdc, stripSwift(rd(path.join(proj, 'CapApp-SPM', 'Sources', 'CapApp-SPM', 'CapApp-SPM.swift')) || '')].every(bal), '');
    const sbDir = path.join(appDir, 'Base.lproj');
    T('Storyboards référencés par Info.plist (UILaunchStoryboardName, UIMainStoryboardFile, UISceneStoryboardFile) présents dans Base.lproj', [plist.UILaunchStoryboardName, plist.UIMainStoryboardFile, conf.UISceneStoryboardFile].every(s => s && fs.existsSync(path.join(sbDir, s + '.storyboard'))), JSON.stringify([plist.UILaunchStoryboardName, plist.UIMainStoryboardFile, conf.UISceneStoryboardFile]));
    T('UIViewControllerBasedStatusBarAppearance = true (exigé par le plugin SystemBars de Capacitor 8 sous iOS) ; ni UIStatusBarHidden ni UIStatusBarStyle imposés', plist.UIViewControllerBasedStatusBarAppearance === true && plist.UIStatusBarHidden === undefined && plist.UIStatusBarStyle === undefined, String(plist.UIViewControllerBasedStatusBarAppearance));
    const caps = plist.UIRequiredDeviceCapabilities;
    T('UIRequiredDeviceCapabilities = [arm64] (iOS 15 n’existe pas sur armv7)', Array.isArray(caps) && caps.length === 1 && caps[0] === 'arm64', JSON.stringify(caps));
    T('Info.plist : ITSAppUsesNonExemptEncryption = false, CFBundleDevelopmentRegion = fr, nom affiché = appName de capacitor.config.json', plist.ITSAppUsesNonExemptEncryption === false && plist.CFBundleDevelopmentRegion === 'fr' && plist.CFBundleDisplayName === cfg.appName, `${plist.CFBundleDisplayName} / ${cfg.appName}`);
  });
  guard('PrivacyInfo', () => {
    const src = rd(path.join(appDir, 'PrivacyInfo.xcprivacy')); if (src === null) return T('PrivacyInfo.xcprivacy présent', false);
    const pm = parsePlist(src);
    T('PrivacyInfo.xcprivacy : XML/plist valide', true);
    const okTypes = typeof pm.NSPrivacyTracking === 'boolean' && Array.isArray(pm.NSPrivacyTrackingDomains) && Array.isArray(pm.NSPrivacyCollectedDataTypes) && Array.isArray(pm.NSPrivacyAccessedAPITypes);
    T('PrivacyInfo.xcprivacy : les 4 clés de premier niveau existent avec le bon type (Tracking booléen ; les 3 autres tableaux)', okTypes && Object.keys(pm).length === 4, Object.keys(pm).join(','));
    const cats = ['NSPrivacyAccessedAPICategoryFileTimestamp', 'NSPrivacyAccessedAPICategorySystemBootTime', 'NSPrivacyAccessedAPICategoryDiskSpace', 'NSPrivacyAccessedAPICategoryActiveKeyboards', 'NSPrivacyAccessedAPICategoryUserDefaults'];
    T('PrivacyInfo.xcprivacy : chaque API déclarée a une catégorie Apple valide et au moins une raison (vide aujourd’hui : aucune API « required reason » utilisée)', (pm.NSPrivacyAccessedAPITypes || []).every(a => cats.includes(a.NSPrivacyAccessedAPIType) && Array.isArray(a.NSPrivacyAccessedAPITypeReasons) && a.NSPrivacyAccessedAPITypeReasons.length), '');
    T('PrivacyInfo.xcprivacy : pas de suivi, aucun domaine de suivi, aucune donnée collectée', pm.NSPrivacyTracking === false && !pm.NSPrivacyTrackingDomains.length && !pm.NSPrivacyCollectedDataTypes.length, '');
  });
  guard('plists divers', () => {
    const p = path.join(proj, 'App.xcodeproj', 'project.xcworkspace', 'xcshareddata', 'IDEWorkspaceChecks.plist');
    const v = parsePlist(rd(p) || ''); T('IDEWorkspaceChecks.plist : plist valide (IDEDidComputeMac32BitWarning = true, comme le gabarit)', v.IDEDidComputeMac32BitWarning === true, JSON.stringify(v));
  });

  /* 3. Storyboards */
  guard('storyboards', () => {
    const names = ['LaunchScreen', 'Main']; const catalog = path.join(appDir, 'Assets.xcassets');
    for (const nme of names) {
      const src = rd(path.join(appDir, 'Base.lproj', nme + '.storyboard')); if (src === null) { T(`${nme}.storyboard présent`, false); continue; }
      const doc = parseXml(src);
      T(`${nme}.storyboard : XML bien formé, racine <document> de type Storyboard`, doc.name === 'document' && /Storyboard/.test(doc.attrs.type || ''), doc.attrs.type);
      const ids = []; const all = []; const walk = x => { all.push(x); if (x.attrs.id) ids.push(x.attrs.id); x.children.forEach(walk); }; walk(doc);
      const dup = ids.filter((v, k) => ids.indexOf(v) !== k);
      T(`${nme}.storyboard : identifiants (id) uniques et initialViewController existant`, !dup.length && ids.includes(doc.attrs.initialViewController), dup.join(',') + ' / ' + doc.attrs.initialViewController);
      const refs = all.flatMap(x => ['destination', 'firstItem', 'secondItem', 'initialViewController'].map(a => x.attrs[a]).filter(Boolean));
      T(`${nme}.storyboard : toutes les références internes (destination, contraintes) pointent vers un id existant`, refs.every(r => ids.includes(r)), refs.filter(r => !ids.includes(r)).join(','));
      const imgs = all.filter(x => x.name === 'imageView' && x.attrs.image).map(x => x.attrs.image);
      const resImgs = all.filter(x => x.name === 'image' && x.attrs.name).map(x => x.attrs.name);
      T(`${nme}.storyboard : images référencées déclarées en resources et présentes comme .imageset`, imgs.every(i => resImgs.includes(i) && fs.existsSync(path.join(catalog, i + '.imageset', 'Contents.json'))), imgs.join(','));
      if (nme === 'Main') {
        const vc = all.find(x => x.name === 'viewController');
        T('Main.storyboard : contrôleur initial = CAPBridgeViewController du module Capacitor', vc && vc.attrs.customClass === 'CAPBridgeViewController' && vc.attrs.customModule === 'Capacitor', JSON.stringify(vc && vc.attrs));
        const cap = path.join(nm, '@capacitor', 'ios', 'Capacitor', 'Capacitor', 'CAPBridgeViewController.swift');
        if (fs.existsSync(cap)) T('CAPBridgeViewController existe dans @capacitor/ios installé (classe publique ouverte)', /open class CAPBridgeViewController/.test(rd(cap)), '');
      }
    }
  });

  /* 4. Catalogues d'assets */
  guard('assets', () => {
    const cat = path.join(appDir, 'Assets.xcassets');
    const top = jsonOf(path.join(cat, 'Contents.json'));
    T('Assets.xcassets/Contents.json : JSON valide avec info.version = 1', top && top.info && top.info.version === 1, '');
    const sets = fs.readdirSync(cat, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
    T('Assets.xcassets : exactement AppIcon.appiconset et Splash.imageset', JSON.stringify(sets.sort()) === '["AppIcon.appiconset","Splash.imageset"]', sets.join(','));
    for (const s of sets) {
      const dir = path.join(cat, s), c = jsonOf(path.join(dir, 'Contents.json'));
      const files = (c.images || []).map(i => i.filename).filter(Boolean);
      T(`${s} : Contents.json valide, chaque fichier référencé existe, aucun PNG orphelin`, c.info && c.info.version === 1 && files.every(f => fs.existsSync(path.join(dir, f))) && fs.readdirSync(dir).filter(f => f !== 'Contents.json').every(f => files.includes(f)), `référencés=${files} disque=${fs.readdirSync(dir)}`);
      for (const f of files) {
        let info; try { info = inspectPng(path.join(dir, f)); } catch (e) { T(`${s}/${f} : PNG intact (signature, CRC, données)`, false, e.message); continue; }
        T(`${s}/${f} : PNG intact (signature, CRC de chaque bloc, données décompressables)`, true, `${info.w}×${info.h} type=${info.ct}`);
        if (s === 'AppIcon.appiconset') {
          const e = c.images.find(i => i.filename === f);
          T('AppIcon : entrée 1024x1024 universal/ios, PNG exactement 1024×1024, SANS canal alpha (rejet App Store sinon), 8 bits', e.size === '1024x1024' && e.idiom === 'universal' && e.platform === 'ios' && info.w === 1024 && info.h === 1024 && !info.hasAlpha && info.depth === 8, JSON.stringify(info));
        } else {
          T('Splash : PNG carré ≥ 2048 px (couvre iPad Pro 13" en paysage avec scaleAspectFill), un seul fichier, entrée universal', info.w === info.h && info.w >= 2048 && files.length === 1 && c.images.every(i => i.idiom === 'universal'), `${info.w}×${info.h}`);
        }
      }
    }
  });

  /* 5. Package.swift / CapApp-SPM et plugins */
  guard('SPM', () => {
    const spm = rd(path.join(proj, 'CapApp-SPM', 'Package.swift')); if (spm === null) return T('CapApp-SPM/Package.swift présent', false);
    const tools = (/swift-tools-version:\s*([\d.]+)/.exec(spm) || [])[1];
    T('Package.swift : swift-tools-version ≥ 5.9 (exigé par Capacitor 8 / Xcode 26) et plateforme .iOS(.v15)', tools && cmp(semver(tools + '.0') || [0, 0, 0], [5, 9, 0]) >= 0 && /platforms:\s*\[\.iOS\(\.v15\)\]/.test(spm), tools);
    const core = dev['@capacitor/core'], pm = (/capacitor-swift-pm\.git",\s*exact:\s*"([^"]+)"/.exec(spm) || [])[1];
    T('Package.swift : capacitor-swift-pm épinglé (exact) à la version de @capacitor/core, de @capacitor/ios et de @capacitor/cli de package.json', pm && pm === core && pm === dev['@capacitor/ios'] && pm === dev['@capacitor/cli'], `${pm} / ${core}`);
    const lp = [...spm.matchAll(/\.package\(name:\s*"([^"]+)",\s*path:\s*"([^"]+)"\)/g)].map(m => ({ name: m[1], path: m[2] }));
    const plugins = Object.keys(dev).filter(k => /^@capacitor(-community)?\//.test(k) && !['@capacitor/android', '@capacitor/cli', '@capacitor/core', '@capacitor/ios'].includes(k));
    const resolved = lp.map(p => ({ ...p, abs: path.join(nm, p.path.split('node_modules/')[1] || '∅') }));
    T('Package.swift : un .package(path:) local par plugin Capacitor déclaré dans package.json (ni plus, ni moins), chemin relatif vers node_modules', resolved.length === plugins.length && resolved.every(r => /^\.\.\/\.\.\/\.\.\/node_modules\/@/.test(r.path)) && plugins.every(pl => resolved.some(r => r.path.endsWith('node_modules/' + pl))), `${plugins} / ${lp.map(l => l.path)}`);
    const deps = [...spm.matchAll(/\.product\(name:\s*"([^"]+)",\s*package:\s*"([^"]+)"\)/g)].map(m => [m[1], m[2]]);
    const declared = new Set(['capacitor-swift-pm', ...lp.map(l => l.name)]);
    T('Package.swift : chaque .product(...) de la cible dépend d’un paquet déclaré, et chaque paquet local est utilisé', deps.every(([, p]) => declared.has(p)) && lp.every(l => deps.some(([, p]) => p === l.name)) && ['Capacitor', 'Cordova'].every(p => deps.some(([n, pk]) => n === p && pk === 'capacitor-swift-pm')), JSON.stringify(deps));
    if (!fs.existsSync(nm)) { T('Paquets locaux Swift : vérification croisée avec node_modules (IGNORÉE : node_modules absent, lancer « npm ci »)', true, 'ignorée'); return; }
    for (const r of resolved) {
      const pp = path.join(r.abs, 'Package.swift'), t = rd(pp);
      if (t === null) { T(`Plugin ${r.name} : Package.swift présent à ${r.path}`, false, r.abs); continue; }
      const nameIn = (/name:\s*"([^"]+)",\s*platforms/.exec(t) || [])[1], prod = [...t.matchAll(/\.library\(\s*name:\s*"([^"]+)"/g)].map(m => m[1]);
      const min = +((/\.iOS\(\.v(\d+)\)/.exec(t) || [])[1] || 0), tv = (/swift-tools-version:\s*([\d.]+)/.exec(t) || [])[1];
      const from = (/capacitor-swift-pm\.git",\s*from:\s*"([^"]+)"/.exec(t) || [])[1];
      T(`Plugin ${r.name} : le nom du paquet (${nameIn}) et le produit déclaré par CapApp-SPM correspondent`, nameIn === r.name && prod.includes(r.name) && deps.some(([n, p]) => n === r.name && p === r.name), prod.join(','));
      T(`Plugin ${r.name} : iOS minimal ${min} ≤ 15 (celui de l’app) et swift-tools-version ${tv} ≤ 5.9`, min > 0 && min <= 15 && cmp(semver(tv + '.0') || [99, 0, 0], [5, 9, 0]) <= 0, `${min}/${tv}`);
      T(`Plugin ${r.name} : exigence « from: ${from} » de capacitor-swift-pm satisfaite par ${pm} (même majeure, ≥)`, from && pm && semver(from + (from.split('.').length < 3 ? '.0' : '')) && semver(pm) && semver(pm)[0] === semver(from)[0] && cmp(semver(pm), semver(from)) >= 0, from);
      const targetPaths = [...t.matchAll(/path:\s*"([^"]+)"/g)].map(m => m[1]);
      const missingP = targetPaths.filter(tp => !fs.existsSync(path.join(r.abs, tp)));
      T(`Plugin ${r.name} : tous les dossiers de cibles (sources ET tests) déclarés dans son Package.swift existent dans node_modules (sinon SPM refuse le paquet)`, !missingP.length, missingP.join(','));
      const pj = jsonOf(path.join(r.abs, 'package.json')) || {}, peer = (pj.peerDependencies || {})['@capacitor/core'];
      T(`Plugin ${r.name} ${pj.version} : dépendance de pair @capacitor/core « ${peer} » satisfaite par ${core}`, peer && core && /^>=\s*(\d+)\.(\d+)\.(\d+)$/.test(peer) && cmp(semver(core), semver(peer.replace(/^>=\s*/, ''))) >= 0, peer);
      T(`Plugin ${r.name} : version installée = version épinglée dans package.json`, pj.version === dev[pj.name], `${pj.version} / ${dev[pj.name]}`);
    }
    const iosPkg = jsonOf(path.join(nm, '@capacitor', 'ios', 'package.json')) || {};
    T('@capacitor/ios installé = version épinglée (et tag capacitor-swift-pm homonyme à vérifier sur le registre)', iosPkg.version === dev['@capacitor/ios'], iosPkg.version);
  });

  /* 6. capacitor.config.json et scripts */
  guard('config', () => {
    const wd = cfg.webDir, pw = rd(path.join(root, 'scripts', 'package-www.mjs')) || '';
    T('capacitor.config.json : appId fr.finot.academie, appName « Finot Académie », webDir « www »', cfg.appId === 'fr.finot.academie' && cfg.appName === 'Finot Académie' && wd === 'www', JSON.stringify([cfg.appId, cfg.appName, wd]));
    T('webDir « www » = dossier produit par scripts/package-www.mjs et jamais versionné (liste blanche .gitignore : aucune ligne « !/www »)', /['"`]www['"`]/.test(pw) && !/^!\/?www/m.test(rd(path.join(root, '.gitignore')) || ''), '');
    const i = cfg.ios || {};
    const allowed = ['contentInset', 'allowsLinkPreview', 'scrollEnabled', 'limitsNavigationsToAppBoundDomains', 'preferredContentMode', 'webContentsDebuggingEnabled', 'handleApplicationNotifications', 'scheme', 'path', 'overrideUserAgent', 'appendUserAgent', 'backgroundColor', 'zoomEnabled', 'buildOptions'];
    T('capacitor.config.json : section ios — clés connues de Capacitor 8 et valeurs valides (contentInset ∈ never/automatic/always/scrollableAxes)', Object.keys(i).every(k => allowed.includes(k)) && (i.contentInset === undefined || ['never', 'automatic', 'always', 'scrollableAxes'].includes(i.contentInset)) && (i.allowsLinkPreview === undefined || typeof i.allowsLinkPreview === 'boolean'), JSON.stringify(i));
    T('Scripts npm : ios:sync = packaging www puis « cap sync ios » ; android:sync analogue ; test:ios déclaré', (pkg.scripts || {})['ios:sync'] === 'node scripts/package-www.mjs && cap sync ios' && (pkg.scripts || {})['android:sync'] === 'node scripts/package-www.mjs && cap sync android' && /ios-config\.test\.js/.test((pkg.scripts || {})['test:ios'] || ''), (pkg.scripts || {})['ios:sync']);
    const lock = (() => { try { return jsonOf(path.join(root, 'package-lock.json')) || {}; } catch { return {}; } })();
    const bad = Object.keys(dev).filter(k => /^@capacitor/.test(k)).filter(k => !lock.packages || !lock.packages['node_modules/' + k] || lock.packages['node_modules/' + k].version !== dev[k]);
    T('package-lock.json : chaque dépendance Capacitor est verrouillée à la version exacte de package.json', !bad.length && Object.keys(dev).filter(k => /^@capacitor/.test(k)).every(k => /^\d+\.\d+\.\d+$/.test(dev[k])), bad.join(','));
  });
  return R;
}

/* ---------- CLI ---------- */
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const res = checkIosProject(root);
  let bad = 0;
  for (const r of res) { if (!r.ok) bad++; console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id}${r.ok || !r.detail ? '' : '\n        -> ' + r.detail}`); }
  console.log(`\n${res.length - bad}/${res.length} vérifications statiques réussies. Rappel : ceci ne valide PAS un build iOS (Xcode requis).`);
  process.exit(bad ? 1 : 0);
}
