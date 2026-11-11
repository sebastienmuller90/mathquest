// Génère data/atlas-france.js : les 18 régions et les 101 départements de France.
// Usage : node tools/atlas-build-france.mjs     (réseau requis ; réponses mises en cache dans ATLAS_CACHE)
// Sources ouvertes :
//   - geo.api.gouv.fr (Licence Ouverte) : liste officielle des régions / départements, population et superficie
//     (sommes des communes) ; Wikidata (CC0) : préfectures et chefs-lieux, voisins ;
//   - Vikidia puis Wikipédia (CC BY-SA 4.0) : textes, avec lien vers l'article.
// Aucune valeur n'est inventée : une donnée absente reste vide. Le résultat est figé dans le fichier de données
// (l'application reste sans étape de build).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = process.env.ATLAS_CACHE || join(ROOT, 'artifacts', 'atlas-cache');
mkdirSync(CACHE, { recursive: true });
const UA = { 'User-Agent': 'FinotAcademie/1.0 (upfactory.apps@gmail.com)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const key = s => createHash('sha1').update(s).digest('hex');
const LOG = (...a) => console.log(...a);

async function getJSON(url, { headers = {}, tries = 4 } = {}) {
  const f = join(CACHE, key(url) + '.json');
  if (existsSync(f)) return JSON.parse(readFileSync(f, 'utf8'));
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { ...UA, ...headers } });
      const t = await r.text();
      if (!r.ok) throw new Error(r.status + ' ' + t.slice(0, 80));
      const j = JSON.parse(t); writeFileSync(f, t); await sleep(150); return j;
    } catch (e) { if (i === tries - 1) throw new Error(url.slice(0, 140) + ' → ' + e.message); await sleep(2500 * (i + 1)); }
  }
}
const sparql = q => getJSON('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q), { headers: { Accept: 'application/sparql-results+json' } })
  .then(j => j.results.bindings);

// ---------- Wikidata : entités par lots ----------
const ENT = new Map();
async function entities(ids) {
  const need = [...new Set(ids)].filter(i => i && !ENT.has(i));
  for (let k = 0; k < need.length; k += 40) {
    const part = need.slice(k, k + 40);
    const j = await getJSON('https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels|claims|sitelinks&languages=fr|en&sitefilter=frwiki&ids=' + part.join('|'));
    for (const id of part) ENT.set(id, j.entities?.[id] || { missing: true });
  }
}
const label = id => ENT.get(id)?.labels?.fr?.value || ENT.get(id)?.labels?.en?.value || '';
const frTitle = id => ENT.get(id)?.sitelinks?.frwiki?.title;
// capitales (P36) encore valables : on écarte les valeurs terminées (qualificatif P582) ou dépréciées, puis on prend le rang préféré s'il existe
function capitals(id) {
  const cs = (ENT.get(id)?.claims?.P36 || []).filter(c => c.rank !== 'deprecated' && c.mainsnak?.datavalue?.value?.id && !c.qualifiers?.P582);
  const pref = cs.filter(c => c.rank === 'preferred');
  return [...new Set((pref.length ? pref : cs).map(c => c.mainsnak.datavalue.value.id))];
}
const claimIds = (id, p) => [...new Set((ENT.get(id)?.claims?.[p] || []).filter(c => c.rank !== 'deprecated' && c.mainsnak?.datavalue?.value?.id).map(c => c.mainsnak.datavalue.value.id))];
const claimNum = (id, p) => { const c = (ENT.get(id)?.claims?.[p] || []).filter(x => x.rank !== 'deprecated' && x.mainsnak?.datavalue?.value?.amount != null); const pref = c.filter(x => x.rank === 'preferred'); const v = (pref.length ? pref : c).slice(-1)[0]; return v ? parseFloat(v.mainsnak.datavalue.value.amount) : null; };

// ---------- textes ----------
const NONLATIN = /[^\u0000-ɏḀ-ỿ -⁯€←-⇿\s]/;
const STAT = /\d[\d\s.,  ]*\s*(habitants|hab\.|km²|km2|km 2|kilomètres carrés|hectares)|\b(Insee|INSEE|La Poste)\b|code (postal|INSEE|Insee)/;
// Informations périssables ou politiques (élus, partis) : écartées, un texte figé dans l'appli ne doit pas vieillir
const PERISSABLE = /\b(présidente?|maire|conseill(?:er|ère)s?|élu(?:e|s|es)?|élections?|députée?s?|sénat(?:eur|rice)s?|devr(?:a|ont)|ser(?:a|ont)|provisoire(?:ment)?|prochainement|bientôt)\b|\((?:LR|PS|PCF|LREM|RN|EELV|UDI|MoDem|DVD|DVG|SE)\)/i;
function stripParens(p) {
  let prev;
  do { prev = p; p = p.replace(/\s*\([^()]*\)/g, m => (NONLATIN.test(m) || /\/[^/)]+\/|prononc|\bAPI\b|écouter/i.test(m)) ? '' : m); } while (p !== prev);
  return p;
}
function cleanText(raw, max = 720) {
  const paras = String(raw || '').split(/\n+/).map(s => s.trim()).filter(Boolean)
    .filter(p => !/^\d+\s*°/.test(p) && !/^[\d.,°′″'"NSEOW\s/-]+$/.test(p));
  const out = []; let n = 0;
  for (let p of paras) {
    p = stripParens(p.replace(/\[[^\]]*\]/g, '')).replace(/\s+([,.])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    const sents = (p.match(/[^.!?…]+(?:[.!?…]+|$)(?:\s+|$)/g) || [p]).map(s => s.trim()).filter(Boolean)
      .filter(s => s.length > 12 && /^[A-ZÀ-ÝŒ«“"‘'(0-9]/.test(s) && !STAT.test(s) && !PERISSABLE.test(s) && !NONLATIN.test(s));
    let acc = '';
    for (const s of sents) {
      if (n + acc.length + s.length > max && (n + acc.length) > 0) break;
      if (!n && !acc && s.length > 900) continue;
      acc += (acc ? ' ' : '') + s;
    }
    if (acc) { out.push(acc); n += acc.length; }
    if (n >= max * 0.7 || out.length >= 2) break;
  }
  return out.map(x => /[.!?…»]$/.test(x) ? x : x + '.');
}
async function extracts(host, titles) {
  const res = {};
  for (let k = 0; k < titles.length; k += 20) {
    const part = titles.slice(k, k + 20);
    const j = await getJSON(`https://${host}/w/api.php?action=query&format=json&prop=extracts|pageprops&exintro=1&explaintext=1&redirects=1&exlimit=20&ppprop=disambiguation&titles=${encodeURIComponent(part.join('|'))}`);
    const map = {}; for (const n of j.query?.normalized || []) map[n.to] = n.from; for (const r of j.query?.redirects || []) map[r.to] = map[r.from] || r.from;
    for (const pg of Object.values(j.query?.pages || {})) {
      if (pg.missing !== undefined || !pg.extract || pg.pageprops?.disambiguation !== undefined) continue;
      res[map[pg.title] || pg.title] = { title: pg.title, text: pg.extract };
    }
  }
  return res;
}
const KWF = /(département|région|collectivité|archipel|île|territoire)/i;
const first = s => String(s).split(/(?<=[.!?])\s/)[0] || '';
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const cmpFr = (a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' });
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- 1. Listes officielles (geo.api.gouv.fr) ----------
const regsGeo = await getJSON('https://geo.api.gouv.fr/regions');
const depsGeo = await getJSON('https://geo.api.gouv.fr/departements');
const OM_REG = new Set(['01', '02', '03', '04', '06']);
if (regsGeo.length !== 18 || depsGeo.length !== 101) throw new Error(`Listes inattendues : ${regsGeo.length} régions, ${depsGeo.length} départements`);
LOG('geo.api.gouv.fr :', regsGeo.length, 'régions,', depsGeo.length, 'départements');

// ---------- 2. Population et superficie : somme des communes ----------
const stat = {}; let nullPop = 0, nullSurf = 0;
for (const d of depsGeo) {
  const cs = await getJSON(`https://geo.api.gouv.fr/communes?codeDepartement=${d.code}&fields=nom,code,population,surface`);
  let pop = 0, ha = 0;
  for (const c of cs) { if (c.population == null) nullPop++; else pop += c.population; if (c.surface == null) nullSurf++; else ha += c.surface; }
  stat[d.code] = { pop, km2: ha / 100, ncom: cs.length, seule: cs.length === 1 ? cs[0].nom : '' };
}
LOG('communes sans population :', nullPop, '; sans surface :', nullSurf);

// ---------- 3. Wikidata : élément de chaque département / région (par code INSEE) ----------
function pickByCode(rows, wanted) {
  const by = {};
  for (const b of rows) { const c = b.code.value; (by[c] = by[c] || []).push({ q: b.i.value.split('/').pop(), sl: +b.sl.value }); }
  const out = {};
  for (const c of wanted) { const l = (by[c] || []).sort((a, b) => b.sl - a.sl); if (l.length) out[c] = l[0].q; }
  return out;
}
const rowsD = await sparql('SELECT ?i ?code ?sl WHERE { ?i wdt:P2586 ?code; wikibase:sitelinks ?sl. FILTER NOT EXISTS { ?i wdt:P576 ?end } }');
const rowsR = await sparql('SELECT ?i ?code ?sl WHERE { ?i wdt:P2585 ?code; wikibase:sitelinks ?sl. FILTER NOT EXISTS { ?i wdt:P576 ?end } }');
const qDep = pickByCode(rowsD, depsGeo.map(d => d.code));
const qReg = pickByCode(rowsR, regsGeo.map(r => r.code));
for (const d of depsGeo) if (!qDep[d.code]) throw new Error('Wikidata : département introuvable ' + d.code);
for (const r of regsGeo) if (!qReg[r.code]) throw new Error('Wikidata : région introuvable ' + r.code);

await entities([...Object.values(qDep), ...Object.values(qReg)]);
const capIds = new Set();
for (const q of [...Object.values(qDep), ...Object.values(qReg)]) capitals(q).forEach(c => capIds.add(c));
await entities([...capIds]);

// ---------- 4. Textes ----------
const all = [...Object.values(qDep), ...Object.values(qReg)];
const titles = [...new Set(all.map(frTitle).filter(Boolean))];
const wp = await extracts('fr.wikipedia.org', titles);
const vk = await extracts('fr.vikidia.org', titles).catch(() => ({}));
function textOf(q) {
  const t = frTitle(q); if (!t) return null;
  const v = vk[t], w = wp[t];
  const useV = v && KWF.test(first(v.text)) && v.text.length > 120;
  const src = useV ? v : w; if (!src) return null;
  const bref = cleanText(src.text);
  return {
    bref, full: (v?.text || '') + '\n' + (w?.text || ''),
    src: (useV ? 'https://fr.vikidia.org/wiki/' : 'https://fr.wikipedia.org/wiki/') + encodeURIComponent(src.title.replace(/ /g, '_')), sw: useV ? 'v' : 'w'
  };
}
// Préfecture / chef-lieu : candidats Wikidata ; si plusieurs, on retient celui que les articles désignent comme préfecture / chef-lieu
function chooseCapital(q, T) {
  const cands = capitals(q).map(c => ({ c, n: label(c) })).filter(x => x.n);
  if (cands.length <= 1) return { name: cands[0]?.n || '', how: cands.length ? 'wikidata' : 'absent', cands: cands.map(x => x.n) };
  const txt = (T?.full || '').replace(/\s+/g, ' ');
  const sc = cands.map(x => {
    const n = norm(x.n).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); let s = 0; const t = norm(txt);
    if (new RegExp('prefecture[^.]{0,60}\\b' + n + '\\b|\\b' + n + '\\b[^.]{0,40}prefecture').test(t)) s += 3;
    if (new RegExp('chef-lieu[^.]{0,60}\\b' + n + '\\b|\\b' + n + '\\b[^.]{0,40}chef-lieu').test(t)) s += 2;
    if (new RegExp('capitale[^.]{0,40}\\b' + n + '\\b').test(t)) s += 1;
    return { ...x, s };
  }).sort((a, b) => b.s - a.s);
  if (sc[0].s > sc[1].s) return { name: sc[0].n, how: 'texte', cands: cands.map(x => x.n) };
  return { name: '', how: 'ambigu', cands: cands.map(x => x.n) };
}

// Superficie : la valeur officielle (Wikidata, celle que les lecteurs retrouvent dans Wikipédia) est retenue si elle reste cohérente
// (à moins de 12 %) avec la somme des communes ; sinon (ex. Rhône sans la Métropole de Lyon) on garde la somme des communes.
await entities(Object.values(qDep).concat(Object.values(qReg)));
const KM2 = {}, KM2SRC = {};
for (const d of depsGeo) {
  const s = stat[d.code], w = claimNum(qDep[d.code], 'P2046');
  if (w && Math.abs(s.km2 - w) / w <= 0.12) { KM2[d.code] = w; KM2SRC[d.code] = 'wikidata'; } else { KM2[d.code] = s.km2; KM2SRC[d.code] = 'communes'; }
}
// ---------- 5. Construction ----------
const depSlug = {}, regSlug = {};
for (const d of depsGeo) depSlug[d.code] = slugify(d.nom);
for (const r of regsGeo) regSlug[r.code] = slugify(r.nom);
if (new Set(Object.values(depSlug)).size !== 101 || new Set(Object.values(regSlug)).size !== 18) throw new Error('Slugs en double');

const issues = [];
const departements = {};
for (const d of depsGeo.slice().sort((a, b) => cmpFr(a.nom, b.nom))) {
  const q = qDep[d.code], T = textOf(q), cap = chooseCapital(q, T);
  if (cap.how === 'absent' && stat[d.code].seule) { cap.name = stat[d.code].seule; cap.how = 'commune unique'; }
  if (cap.how !== 'wikidata') issues.push(`préfecture ${d.nom} : ${cap.how} (${cap.cands.join(' | ')}) → « ${cap.name} »`);
  const o = { n: d.nom, code: d.code, pref: cap.name, reg: regSlug[d.codeRegion], pop: stat[d.code].pop, km2: Math.round(KM2[d.code]), ncom: stat[d.code].ncom };
  if (OM_REG.has(d.codeRegion)) o.om = true;
  if (d.code === '69') o.note = 'Les chiffres réunissent le Rhône et la métropole de Lyon, qui forment ensemble le département 69.';
  if (T?.bref?.length) { o.bref = T.bref; o.src = T.src; o.sw = T.sw; }
  o.q = q; departements[depSlug[d.code]] = o;
}
const qToDep = Object.fromEntries(depsGeo.map(d => [qDep[d.code], depSlug[d.code]]));

// Voisins (P47) : retenus seulement si la relation est réciproque dans Wikidata
{
  const nb = {};
  for (const d of depsGeo) nb[depSlug[d.code]] = new Set(claimIds(qDep[d.code], 'P47').map(x => qToDep[x]).filter(x => x && x !== depSlug[d.code]));
  let asym = 0, tot = 0;
  for (const [a, s] of Object.entries(nb)) for (const b of s) { tot++; if (!nb[b].has(a)) asym++; }
  LOG(`voisins P47 : ${tot} liens, ${asym} non réciproques`);
  if (tot && asym / tot <= 0.03) for (const [a, s] of Object.entries(nb)) { const m = [...s].filter(b => nb[b].has(a)).sort(cmpFr); if (m.length) departements[a].voisins = m; }
  else LOG('→ champ « voisins » omis (relation Wikidata trop incomplète ou incohérente)');
}

const regions = {};
for (const r of regsGeo.slice().sort((a, b) => cmpFr(a.nom, b.nom))) {
  const q = qReg[r.code], T = textOf(q), cap = chooseCapital(q, T);
  if (cap.how !== 'wikidata') issues.push(`chef-lieu ${r.nom} : ${cap.how} (${cap.cands.join(' | ')}) → « ${cap.name} »`);
  const ds = depsGeo.filter(d => d.codeRegion === r.code);
  const sum = ds.reduce((a, d) => ({ pop: a.pop + stat[d.code].pop, km2: a.km2 + KM2[d.code], ncom: a.ncom + stat[d.code].ncom }), { pop: 0, km2: 0, ncom: 0 });
  const o = { n: r.nom, code: r.code, chef: cap.name, pop: sum.pop, km2: Math.round(sum.km2), ncom: sum.ncom, ndep: ds.length, deps: ds.map(d => depSlug[d.code]).sort(cmpFr) };
  if (OM_REG.has(r.code)) o.om = true;
  if (T?.bref?.length) { o.bref = T.bref; o.src = T.src; o.sw = T.sw; }
  o.q = q; regions[regSlug[r.code]] = o;
}

// ---------- 6. Contrôles croisés avec Wikidata (population / superficie), écarts > 3 % signalés ----------
await entities(Object.values(qDep));
const ecarts = [];
for (const d of depsGeo) {
  const q = qDep[d.code], s = stat[d.code], wa = claimNum(q, 'P2046'), wpop = claimNum(q, 'P1082');
  const ra = wa ? Math.abs(s.km2 - wa) / wa : null, rp = wpop ? Math.abs(s.pop - wpop) / wpop : null;
  if (ra != null && ra > 0.03) ecarts.push(`${d.nom} (${d.code}) superficie : ${Math.round(s.km2)} km² (communes) vs ${Math.round(wa)} (Wikidata)`);
  if (rp != null && rp > 0.03) ecarts.push(`${d.nom} (${d.code}) population : ${s.pop} (communes) vs ${Math.round(wpop)} (Wikidata)`);
}
const tot = Object.values(stat).reduce((a, s) => ({ pop: a.pop + s.pop, km2: a.km2 + s.km2 }), { pop: 0, km2: 0 });
LOG(`Total France : ${tot.pop.toLocaleString('fr-FR')} habitants, ${Math.round(tot.km2).toLocaleString('fr-FR')} km² (101 départements)`);
LOG('Superficie : ' + Object.values(KM2SRC).filter(x => x === 'wikidata').length + ' départements depuis Wikidata, ' + Object.entries(KM2SRC).filter(([, x]) => x === 'communes').map(([c]) => c).join(', ') + ' depuis les communes');
LOG('Écarts > 3 % avec Wikidata :', ecarts.length ? '\n  ' + ecarts.join('\n  ') : 'aucun');
LOG('Points à examiner :', issues.length ? '\n  ' + issues.join('\n  ') : 'aucun');

// ---------- 7. Écriture ----------
const body = [['regions', regions], ['departements', departements]].map(([k, g]) => `${JSON.stringify(k)}:{\n${Object.entries(g).map(([s, o]) => `${JSON.stringify(s)}:${JSON.stringify(o)}`).join(',\n')}\n}`).join(',\n');
writeFileSync(join(ROOT, 'data', 'atlas-france.js'),
  '/* Atlas : régions et départements de France — généré par tools/atlas-build-france.mjs.\n' +
  '   Population et superficie : sommes des communes (population municipale INSEE, dernier recensement publié par geo.api.gouv.fr, Licence Ouverte).\n' +
  '   Préfectures et chefs-lieux : Wikidata (CC0). Textes : Vikidia / Wikipédia (CC BY-SA 4.0), lien par fiche.\n' +
  '   Seuls les 18 régions et 101 départements officiels figurent ici : les collectivités d\'outre-mer (Saint-Pierre-et-Miquelon…) n\'en sont pas. */\n' +
  `window.MQ_ATLAS_T=window.MQ_ATLAS_T||{};Object.assign(window.MQ_ATLAS_T,{\n${body}\n});\n`);
LOG('écrit data/atlas-france.js :', Object.keys(regions).length, 'régions,', Object.keys(departements).length, 'départements ;',
  'avec texte :', Object.values(regions).filter(o => o.bref).length, '/', Object.values(departements).filter(o => o.bref).length);
