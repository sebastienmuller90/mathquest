// Génère data/atlas-eau.js et data/atlas-relief.js (voir atlas-build.mjs pour les sources et la méthode).
// Usage : ATLAS_CACHE=<dossier> node tools/atlas-build-themes.mjs
// Sélection = union des éléments les plus connus (nombre de langues de Wikipédia), des plus grands, et des éléments français.
// Champs : n nom, t type, km2 superficie, km longueur, prof profondeur (m), alt altitude (m), bassin (km²), debit (m³/s), orig source du cours d'eau,
//          emb embouchure, massif, pop, npays, id (continent), pays [ISO], c [continents], bref [paragraphes], src (url du texte), sw 'v'|'w', q (QID Wikidata).
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as L from './atlas-build.mjs';
const { rankClosure, rank, dedupe, entities, ENT, ids, num, round, sig, label, isoOf, conts, clip, uniqSlug, ROOT } = L;

const merge = (...lists) => dedupe(lists.flat());
const FR = '?i wdt:P17 wd:Q142.';
const taken = new Set();
const used = new Set();                                   // une entité n'apparaît que dans un seul thème
const fresh = list => list.filter(x => !used.has(x.q));
const mark = obj => Object.values(obj).forEach(o => used.add(o.q));
const instanceLabel = (e) => ids(e, 'P31').map(q => label(q)).join(' | ').toLowerCase();
const sorted = o => Object.fromEntries(Object.entries(o).sort((a, b) => a[1].n.localeCompare(b[1].n, 'fr')));

// Plages de vraisemblance : une valeur hors plage est supprimée (jamais corrigée de mémoire).
const RANGES = { km: [1, 7000], km2: [0.5, 1.8e8], bassin: [1, 7.1e6], debit: [10, 250000], prof: [1, 12000], alt: [-500, 9000], pop: [0, 2e10] };
function plausible(o) { for (const [k, [a, b]] of Object.entries(RANGES)) if (o[k] != null && !(o[k] >= a && o[k] <= b)) delete o[k]; }

async function themed(name, list, refProps, make, extra = {}) {
  const { out, dropped } = await L.build({ list: list.map(x => x.q), refProps, make, slug: (q, e, o) => uniqSlug(taken, o.n, q), ...extra, post: (o, e, t) => { extra.post?.(o, e, t); plausible(o); } });
  console.log(`${name} : ${list.length} candidats → ${Object.keys(out).length} retenus ; écartés : ${dropped.map(d => d.join(' [') + ']').join(', ').slice(0, 900)}`);
  return out;
}
const sl = list => new Map(list.map(x => [x.q, x.sl]));

const seaType = (e) => { const s = instanceLabel(e); return /océan/.test(s) ? 'océan' : /golfe/.test(s) ? 'golfe' : /baie/.test(s) ? 'baie' : /détroit|bras de mer|canal/.test(s) ? 'détroit' : 'mer'; };
const SEA_CLASSES = new Set(['Q165', 'Q9430', 'Q1322134', 'Q39594', 'Q37901', 'Q1210950', 'Q1172599', 'Q641846']);

// ---------------- EAU ----------------
const eau = {};
{
  const oc = await rank('Q9430', 'P2046', 0, 10);
  eau.oceans = await themed('océans', fresh(oc), ['P17', 'P31'], (q, e) => {
    const n = label(q); if (/mondial/i.test(n)) return null;
    return clip({ n, t: 'océan', km2: round(num(e, 'P2046', 'km2')), prof: round(num(e, 'P4511', 'm')) });
  });
  mark(eau.oceans);

  const seas = merge(await rankClosure(['Q165', 'Q1322134', 'Q39594'], 'P2046', 60, 140), await rankClosure(['Q165', 'Q1322134', 'Q39594'], 'P2046', 25, 14, { extra: FR }));
  eau.mers = await themed('mers', fresh(seas), ['P205', 'P17', 'P31'], (q, e) => {
    const t = seaType(e); if (t === 'océan') return null;
    return clip({ n: label(q), t, km2: round(num(e, 'P2046', 'km2')), prof: round(num(e, 'P4511', 'm')), _c: [...new Set([...ids(e, 'P205'), ...ids(e, 'P17')])] });
  });
  mark(eau.mers);

  const rivers = merge(await rankClosure(['Q4022'], 'P2043', 28, 115), await rankClosure(['Q4022'], 'P2043', 25, 60, { by: 'v' }), await rankClosure(['Q4022'], 'P2043', 12, 45, { extra: FR, by: 'v' }));
  eau.fleuves = await themed('fleuves', fresh(rivers), ['P403', 'P885', 'P17', 'P31'], (q, e) => {
    const n = label(q); if (/Yarlung|Tsangpo/i.test(n)) return null;
    const mouth = ids(e, 'P403')[0]; const me = mouth && ENT.get(mouth);
    const toSea = me && (ids(me, 'P31').some(c => SEA_CLASSES.has(c)) || /\b(mer|océan|golfe|baie|manche)\b/i.test(label(mouth)));
    return clip({ n, t: me ? (toSea ? 'fleuve' : 'rivière') : 'cours d’eau', km: round(num(e, 'P2043', 'km')), bassin: round(num(e, 'P2053', 'km2')), debit: round(num(e, 'P2225', 'm3s')),
      orig: label(ids(e, 'P885')[0] || ''), emb: me ? label(mouth) : '', _c: ids(e, 'P17') });
  }, {
    // Le type vient de la première phrase du texte (premier des mots « fleuve » / « rivière ») ; repli sur l'embouchure.
    post: (o) => { const m = (o.bref?.[0] || '').split(/(?<=[.!?])\s/)[0].match(/\b(fleuve|rivière)s?\b/i); if (m) o.t = m[1].toLowerCase(); }
  });
  mark(eau.fleuves);

  const LAKES = ['Q23397', 'Q131681'];
  const lakes = merge(await rankClosure(LAKES, 'P2046', 33, 70), await rankClosure(LAKES, 'P2046', 15, 30, { by: 'v' }), await rankClosure(LAKES, 'P2046', 20, 10, { extra: FR }));
  eau.lacs = await themed('lacs', fresh(lakes), ['P17', 'P205'], (q, e) => {
    const km2 = round(num(e, 'P2046', 'km2')); if (!(km2 >= 1)) return null;
    return clip({ n: label(q), t: 'lac', km2, prof: round(num(e, 'P4511', 'm')), alt: round(num(e, 'P2044', 'm')), _c: [...new Set([...ids(e, 'P17'), ...ids(e, 'P205')])] });
  });
  mark(eau.lacs);
}

// ---------------- RELIEF ----------------
const rel = {};
{
  const CONT_Q = ['Q15', 'Q48', 'Q46', 'Q49', 'Q18', 'Q538', 'Q51'];
  const byCont = []; for (const c of CONT_Q) byCont.push(...await rankClosure(['Q8502'], 'P2044', 25, 6, { extra: `?i wdt:P30 wd:${c}.`, by: 'v' }));
  const peaks = merge(await rankClosure(['Q8502'], 'P2044', 50, 110), byCont, await rankClosure(['Q8502'], 'P2044', 30, 15, { by: 'v' }), await rankClosure(['Q8502'], 'P2044', 18, 18, { extra: FR }));
  const volc = merge(await rankClosure(['Q8072'], 'P2044', 40, 50), await rankClosure(['Q8072'], 'P2044', 12, 8, { extra: FR }));
  const ranges = merge(await rankClosure(['Q46831'], null, 35, 55), await rankClosure(['Q46831'], null, 15, 10, { extra: FR }));
  const obscur = /Rushmore|des Oliviers|Scenery|Pain de Sucre|Arafat/i;
  rel.montagnes = await themed('montagnes', fresh(merge(peaks, volc, ranges)), ['P17', 'P4552', 'P31'], (q, e) => {
    const s = instanceLabel(e), n = label(q);
    if (/\bîle\b|archipel/.test(s) || obscur.test(n) || L.claims(e, 'P376').length) return null;   // P376 : situé sur un autre astre (Mars…)
    const t = /volcan/.test(s) ? 'volcan' : /chaîne|massif|montagnes|groupe|système|plateau/.test(s) ? 'massif' : 'sommet';
    const alt = round(num(e, 'P2044', 'm')); if (t !== 'massif' && !(alt >= 700)) return null;
    return clip({ n, t, alt, massif: label(ids(e, 'P4552')[0] || ''), _c: ids(e, 'P17') });
  });
  mark(rel.montagnes);

  const isl = merge(await rankClosure(['Q23442'], 'P2046', 70, 60), await rankClosure(['Q23442'], 'P2046', 25, 35, { by: 'v' }), await rankClosure(['Q23442'], 'P2046', 25, 22, { extra: FR }));
  rel.iles = await themed('îles', fresh(isl), ['P17'], (q, e) => {
    const km2 = round(num(e, 'P2046', 'km2')); if (!(km2 >= 10)) return null;
    return clip({ n: label(q), t: 'île', km2, pop: round(num(e, 'P1082', 'raw')), _c: ids(e, 'P17') });
  });
  mark(rel.iles);

  const des = await rankClosure(['Q8514'], null, 30, 90); const desSl = sl(des);
  rel.deserts = await themed('déserts', fresh(des), ['P17'], (q, e) => {
    const n = label(q); if (/vallée de la Mort|Painted|Arabah|Dahna|Błędów/i.test(n)) return null;
    const km2 = round(num(e, 'P2046', 'km2')); if (!((km2 >= 50000) || desSl.get(q) >= 90)) return null;
    return clip({ n, t: 'désert', km2, _c: ids(e, 'P17') });
  });
  mark(rel.deserts);

  const CONT = { Q15: 'afrique', Q51: 'antarctique', Q48: 'asie', Q46: 'europe', Q49: 'amerique-nord', Q18: 'amerique-sud', Q538: 'oceanie' };
  // La superficie vient du texte de l'article (regex sur « … km² ») ; sinon elle n'est pas affichée (les valeurs Wikidata des continents sont incohérentes).
  const areaFromText = (raw) => {
    const t = String(raw || '').replace(/[  ]/g, ' ');
    const a = t.match(/(\d{1,3}(?: \d{3})+)\s*(?:km2|km²|kilomètres carrés)/), b = t.match(/(\d+(?:[,.]\d+)?)\s*millions?\s*de\s*(?:km2|km²|kilomètres carrés)/);
    const va = a ? { i: a.index, v: +a[1].replace(/ /g, '') } : null, vb = b ? { i: b.index, v: Math.round(parseFloat(b[1].replace(',', '.')) * 1e6) } : null;
    const r = [va, vb].filter(Boolean).sort((x, y) => x.i - y.i)[0]; return r ? r.v : null;
  };
  rel.continents = await themed('continents', Object.keys(CONT).map(q => ({ q })), [], (q, e) => {
    const k = CONT[q]; const pays = Object.values(L.ATLAS.pays).filter(p => (p.c || []).includes(k));
    return clip({ n: label(q), id: k, t: 'continent', pop: sig(num(e, 'P1082', 'raw'), 2), npays: pays.length });
  }, { post: (o, e, t) => { const a = areaFromText(t?.raw); if (a >= 1e6 && a <= 6e7) o.km2 = a; else delete o.km2; } });
}

// ---- pays : QID → codes ISO + continents ----
async function resolveCountries(group) {
  const all = [...new Set(Object.values(group).flatMap(o => o._c || []))];
  await entities(all);
  for (const o of Object.values(group)) {
    if (!o._c) continue;
    const isos = await isoOf(o._c); delete o._c;
    if (isos.length) { o.pays = isos; o.c = conts(isos); }
  }
}
for (const g of [...Object.values(eau), ...Object.values(rel)]) await resolveCountries(g);

// ---- noms identiques : on ajoute un qualificatif (type de thème, sinon premier pays) pour que chaque fiche soit non ambiguë ----
{
  const THEME_WORD = { oceans: 'océan', mers: 'mer', fleuves: 'fleuve', lacs: 'lac', montagnes: 'montagnes', iles: 'île', deserts: 'désert', continents: 'continent' };
  const all = []; for (const [theme, g] of Object.entries({ ...eau, ...rel })) for (const o of Object.values(g)) all.push([theme, o]);
  const byName = new Map(); for (const [theme, o] of all) { const k = o.n.toLowerCase(); (byName.get(k) || byName.set(k, []).get(k)).push([theme, o]); }
  for (const list of byName.values()) {
    if (list.length < 2) continue;
    const themes = new Set(list.map(([t]) => t));
    for (const [theme, o] of list) {
      const q = themes.size > 1 ? THEME_WORD[theme] : (o.pays?.[0] && L.ATLAS.pays[o.pays[0]]?.n) || o.q;
      o.n = `${o.n} (${q})`;
    }
  }
}

// Même nom pour l'île et pour l'État (Irlande) : on garde l'entrée dont le texte parle de l'île, sinon la plus grande ; « X (X) » redevient « X ».
for (const g of [...Object.values(eau), ...Object.values(rel)]) {
  const by = {};
  for (const [k, o] of Object.entries(g)) { (by[o.n] = by[o.n] || []).push(k); }
  for (const ks of Object.values(by)) {
    if (ks.length < 2) continue;
    const score = k => (/%C3%AEle|île/i.test(g[k].src || '') ? 1e12 : 0) + (g[k].km2 || 0);
    ks.sort((x, y) => score(y) - score(x));
    for (const k of ks.slice(1)) delete g[k];
  }
  for (const o of Object.values(g)) { const m = o.n.match(/^(.*) \((.*)\)$/); if (m && m[1] === m[2]) o.n = m[1]; }
}

const dump = (file, obj, titre) => {
  const body = Object.entries(obj).map(([k, g]) => `${JSON.stringify(k)}:${JSON.stringify(sorted(g))}`).join(',\n');
  writeFileSync(join(ROOT, 'data', file), `/* ${titre} — généré par tools/atlas-build-themes.mjs. Chiffres : Wikidata (CC0). Textes : Vikidia / Wikipédia (CC BY-SA 4.0), lien par fiche (src). */\nwindow.MQ_ATLAS_T=window.MQ_ATLAS_T||{};Object.assign(window.MQ_ATLAS_T,{\n${body}\n});\n`);
};
dump('atlas-eau.js', eau, 'Atlas : océans, mers, fleuves et rivières, lacs');
dump('atlas-relief.js', rel, 'Atlas : montagnes et volcans, îles, déserts, continents');
for (const [k, g] of Object.entries({ ...eau, ...rel })) console.log(k, Object.keys(g).length);
