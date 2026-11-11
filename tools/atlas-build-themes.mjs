// Génère data/atlas-eau.js et data/atlas-relief.js (voir atlas-build.mjs pour les sources et la méthode).
// Usage : node tools/atlas-build-themes.mjs
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as L from './atlas-build.mjs';
const { sparql, entities, ENT, ids, best, num, round, label, isoOf, conts, clip, uniqSlug, ROOT } = L;

const lim = (arr, n) => arr.slice(0, n);
const merge = (...lists) => { const m = new Map(); for (const l of lists) for (const x of l) if (!m.has(x.q)) m.set(x.q, x); return [...m.values()]; };
// classement par propriété (valeur décroissante), sans filtre de notoriété
const byValue = (cls, prop, n, min = 0) => sparql(`SELECT ?i ?v ?sl WHERE { ?i wdt:P31 wd:${cls}; wdt:${prop} ?v; wikibase:sitelinks ?sl. FILTER(?sl >= ${min}) } ORDER BY DESC(?v) LIMIT ${n}`);
const rank = (cls, prop, min, n) => L.rank(cls, prop, min, n);
const rankNoProp = (cls, min, n) => sparql(`SELECT ?i ?sl WHERE { ?i wdt:P31 wd:${cls}; wikibase:sitelinks ?sl. FILTER(?sl >= ${min}) } ORDER BY DESC(?sl) LIMIT ${n}`);

const taken = new Set();
const used = new Set(); // une entité n'apparaît que dans un seul thème
const fresh = list => list.filter(x => !used.has(x.q));
const mark = obj => Object.values(obj).forEach(o => used.add(o.q));
const instanceLabel = (e) => ids(e, 'P31').map(q => label(q)).join(' | ');

const SEA_CLASSES = new Set(['Q165', 'Q9430', 'Q1322134', 'Q39594', 'Q37901', 'Q1210950', 'Q1172599', 'Q4022', 'Q37901', 'Q641846']);
function seaType(e) {
  const s = instanceLabel(e).toLowerCase();
  if (/océan/.test(s)) return 'océan';
  if (/golfe/.test(s)) return 'golfe';
  if (/baie/.test(s)) return 'baie';
  if (/détroit|bras de mer|canal/.test(s)) return 'détroit';
  return 'mer';
}

const sorted = o => Object.fromEntries(Object.entries(o).sort((a, b) => a[1].n.localeCompare(b[1].n, 'fr')));

async function themed(name, list, refProps, make) {
  const out = await L.build({ list: list.map(x => x.q), refProps, make: (q, e) => make(q, e), slug: (q, e, o) => uniqSlug(taken, o.n, q) });
  console.log(name, list.length, '→', Object.keys(out).length);
  return out;
}

// ---------------- EAU ----------------
const eau = {};
{
  const oc = await rank('Q9430', 'P2046', 0, 10);
  eau.oceans = await themed('océans', fresh(oc).filter(x => x.q !== 'Q1'), ['P17'], (q, e) => {
    const n = label(q); if (/mondial/i.test(n)) return null;
    return clip({ n: n.replace(/^océan /i, 'Océan '), t: 'océan', km2: round(num(e, 'P2046', 'km2')), prof: round(num(e, 'P4511', 'm')), alt: round(num(e, 'P2044', 'm')) });
  });
  mark(eau.oceans);

  const seas = merge(await rank('Q165', 'P2046', 45, 70), await byValue('Q165', 'P2046', 25, 20));
  eau.mers = await themed('mers', fresh(seas), ['P205', 'P17'], (q, e) => {
    const iso = [...new Set([...ids(e, 'P205'), ...ids(e, 'P17')])];
    return clip({ n: label(q), t: seaType(e), km2: round(num(e, 'P2046', 'km2')), prof: round(num(e, 'P4511', 'm')), _c: iso });
  });
  mark(eau.mers);

  const rivers = merge(await rank('Q4022', 'P2043', 28, 110), await byValue('Q4022', 'P2043', 60, 8));
  eau.fleuves = await themed('fleuves', fresh(rivers), ['P403', 'P885', 'P17', 'P4552'], (q, e) => {
    const mouth = ids(e, 'P403')[0]; const me = mouth && ENT.get(mouth);
    const toSea = me && (ids(me, 'P31').some(c => SEA_CLASSES.has(c) && c !== 'Q4022') || /\b(mer|océan|golfe|baie|manche)\b/i.test(label(mouth)));
    return clip({ n: label(q), t: me ? (toSea ? 'fleuve' : 'rivière') : 'cours d’eau', km: round(num(e, 'P2043', 'km')), bassin: round(num(e, 'P2053', 'km2')), debit: round(num(e, 'P2225', 'm3s')),
      src2: label(ids(e, 'P885')[0] || ''), emb: me ? label(mouth) : '', _c: ids(e, 'P17') });
  });
  mark(eau.fleuves);

  const lakes = merge(await rank('Q23397', 'P2046', 35, 75), await byValue('Q23397', 'P2046', 40, 25));
  eau.lacs = await themed('lacs', fresh(lakes), ['P17', 'P205'], (q, e) => clip({ n: label(q), t: 'lac', km2: round(num(e, 'P2046', 'km2')), prof: round(num(e, 'P4511', 'm')), alt: round(num(e, 'P2044', 'm')), _c: [...new Set([...ids(e, 'P17'), ...ids(e, 'P205')])] }));
  mark(eau.lacs);
}

// ---------------- RELIEF ----------------
const rel = {};
{
  const peaks = merge(await rank('Q8502', 'P2044', 35, 90), await byValue('Q8502', 'P2044', 25, 30));
  const volc = await rank('Q8072', 'P2044', 25, 55);
  const ranges = await rankNoProp('Q46831', 35, 55);
  rel.montagnes = await themed('montagnes', fresh(merge(peaks, volc, ranges)), ['P17', 'P4552', 'P30'], (q, e) => {
    const s = instanceLabel(e).toLowerCase();
    const t = /volcan/.test(s) ? 'volcan' : /chaîne|massif|montagnes|chaine/.test(s) ? 'massif' : 'sommet';
    return clip({ n: label(q), t, alt: round(num(e, 'P2044', 'm')), massif: label(ids(e, 'P4552')[0] || ''), _c: ids(e, 'P17') });
  });
  mark(rel.montagnes);

  const isl = merge(await rank('Q23442', 'P2046', 60, 80), await byValue('Q23442', 'P2046', 45, 35));
  rel.iles = await themed('îles', fresh(isl), ['P17'], (q, e) => clip({ n: label(q), t: 'île', km2: round(num(e, 'P2046', 'km2')), pop: round(num(e, 'P1082', 'raw')), _c: ids(e, 'P17') }));
  mark(rel.iles);

  const des = await rankNoProp('Q8514', 30, 40);
  rel.deserts = await themed('déserts', fresh(des), ['P17'], (q, e) => clip({ n: label(q), t: 'désert', km2: round(num(e, 'P2046', 'km2')), _c: ids(e, 'P17') }));
  mark(rel.deserts);

  const CONT = { Q15: 'afrique', Q51: 'antarctique', Q48: 'asie', Q46: 'europe', Q49: 'amerique-nord', Q18: 'amerique-sud', Q538: 'oceanie' };
  const list = Object.keys(CONT).map(q => ({ q }));
  rel.continents = await themed('continents', list, [], (q, e) => {
    const k = CONT[q];
    const pays = Object.values(L.ATLAS.pays).filter(p => (p.c || []).includes(k));
    return clip({ n: label(q), id: k, t: 'continent', km2: round(num(e, 'P2046', 'km2')), pop: round(num(e, 'P1082', 'raw')), npays: pays.length });
  });
}

// ---- pays (codes ISO) : on remplace _c (QID) par des codes ISO + continents ----
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

// Noms des « src2 » / « emb » restent des libellés Wikidata (fr) ; tri alphabétique pour des fichiers stables
const dump = (file, obj, titre) => {
  const body = Object.entries(obj).map(([k, g]) => `${JSON.stringify(k)}:${JSON.stringify(sorted(g))}`).join(',\n');
  writeFileSync(join(ROOT, 'data', file), `/* ${titre} — généré par tools/atlas-build-themes.mjs. Chiffres : Wikidata (CC0). Textes : Vikidia / Wikipédia (CC BY-SA 4.0), lien par fiche. */\nwindow.MQ_ATLAS_T=window.MQ_ATLAS_T||{};Object.assign(window.MQ_ATLAS_T,{\n${body}\n});\n`);
};
dump('atlas-eau.js', eau, 'Atlas : océans, mers, fleuves et rivières, lacs');
dump('atlas-relief.js', rel, 'Atlas : montagnes et volcans, îles, déserts, continents');
for (const [k, g] of Object.entries({ ...eau, ...rel })) console.log(k, Object.keys(g).length, 'avec texte :', Object.values(g).filter(o => o.bref).length);
