// Générateur des données « thèmes » de l'Atlas (océans, fleuves, montagnes, régions de France…).
// Usage : node tools/atlas-build.mjs            (réseau requis ; les réponses sont mises en cache dans ATLAS_CACHE)
// Sources ouvertes : Wikidata (CC0) pour les chiffres, geo.api.gouv.fr (Licence Ouverte) pour la France,
// Vikidia puis Wikipédia (CC BY-SA) pour les textes. Aucune valeur n'est inventée : une donnée absente reste vide.
// Le résultat est figé dans data/atlas-eau.js, data/atlas-relief.js et data/atlas-france.js (l'appli reste sans build).
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

async function getJSON(url, { headers = {}, tries = 4 } = {}) {
  const f = join(CACHE, key(url) + '.json');
  if (existsSync(f)) return JSON.parse(readFileSync(f, 'utf8'));
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { ...UA, ...headers } });
      const t = await r.text();
      if (!r.ok) throw new Error(r.status + ' ' + t.slice(0, 80));
      const j = JSON.parse(t); writeFileSync(f, t); return j;
    } catch (e) { if (i === tries - 1) throw new Error(url.slice(0, 120) + ' → ' + e.message); await sleep(2500 * (i + 1)); }
  }
}
const sparql = q => getJSON('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q), { headers: { Accept: 'application/sparql-results+json' } })
  .then(j => j.results.bindings.map(b => ({ q: b.i.value.split('/').pop(), sl: +(b.sl?.value || 0) })));

// ---------- Wikidata : entités par lots ----------
const ENT = new Map();
async function entities(ids) {
  const need = [...new Set(ids)].filter(i => i && !ENT.has(i));
  for (let k = 0; k < need.length; k += 40) {
    const part = need.slice(k, k + 40);
    const j = await getJSON('https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels|claims|sitelinks|descriptions&languages=fr|en&sitefilter=frwiki&ids=' + part.join('|'));
    for (const id of part) ENT.set(id, j.entities?.[id] || { missing: true });
  }
}
const label = (id) => { const e = ENT.get(id); return e?.labels?.fr?.value || e?.labels?.en?.value || ''; };
const claims = (e, p) => (e?.claims?.[p] || []).filter(c => c.rank !== 'deprecated' && c.mainsnak?.datavalue);
const best = (e, p) => { const cs = claims(e, p); const pref = cs.filter(c => c.rank === 'preferred'); return (pref.length ? pref : cs); };
const ids = (e, p) => [...new Set(best(e, p).map(c => c.mainsnak.datavalue.value?.id).filter(Boolean))];
const UNITS = { Q828224: ['km', 1], Q11573: ['km', 0.001], Q712226: ['km2', 1], Q25343: ['km2', 1e-6], Q35852: ['km2', 0.01], Q185078: ['km2', 1], Q253276: ['km', 1.609344], Q174728: ['m', 0.01], Q11574: ['s', 1], Q3710: ['m', 0.3048], Q81292: ['km2', 0.00404686], Q794261: ['m3s', 1] };
// valeur numérique convertie vers l'unité attendue (km, km2, m) ; null si l'unité est inconnue ou incompatible
function num(e, p, want) {
  const cs = best(e, p); if (!cs.length) return null;
  const c = cs.length > 1 ? cs.slice().sort((a, b) => (b.qualifiers?.P585?.[0]?.datavalue?.value?.time || '').localeCompare(a.qualifiers?.P585?.[0]?.datavalue?.value?.time || ''))[0] : cs[0];
  const v = c.mainsnak.datavalue.value; if (!v || v.amount == null) return null;
  const a = parseFloat(v.amount); const u = (v.unit || '').split('/').pop();
  if (u === '1' || u === '') return want === 'raw' ? a : null;
  const U = UNITS[u]; if (!U) return null; if (want === 'raw') return null; if (U[0] !== want) return null;
  return a * U[1];
}
const round = (x, d = 0) => x == null ? null : (d ? Math.round(x * 10 ** d) / 10 ** d : Math.round(x));

// ---------- pays : QID → ISO, ISO → continents (données existantes de l'appli) ----------
const ATLAS = (() => { const w = {}; new Function('window', readFileSync(join(ROOT, 'data/atlas.js'), 'utf8'))(w); return w.MQ_ATLAS; })();
const COUNTRY_CONT = Object.fromEntries(Object.entries(ATLAS.pays).map(([k, p]) => [k, p.c || []]));
async function isoOf(qids) {
  await entities(qids);
  return [...new Set(qids.map(q => claims(ENT.get(q), 'P297')[0]?.mainsnak.datavalue.value).filter(v => v && ATLAS.pays[v]))];
}

// ---------- textes : Vikidia (titre identique) puis Wikipédia ----------
const KW = /(fleuve|rivière|cours d.eau|affluent|lac|mer|océan|golfe|baie|détroit|montagne|mont|massif|sommet|volcan|île|archipel|désert|continent|région|département|chaîne|plateau|péninsule|mer|bassin|glacier|plaine|vallée|collectivité|territoire|point culminant)/i;
function clean(t) {
  return String(t || '').replace(/\[\d+\]/g, '').replace(/\s*\((?:[^()]*?(?:prononc|API|\[[^\]]*\]|écouter)[^()]*?)\)/gi, '').replace(/\s*\(\s*\)/g, '').replace(/\s{2,}/g, ' ').replace(/ ([;:!?»])/g, ' $1').trim();
}
function cut(text, max = 720) {
  const paras = String(text).split(/\n+/).map(clean).filter(x => x.length > 30);
  const out = []; let n = 0;
  for (const p of paras) {
    if (n >= max) break;
    if (n + p.length <= max * 1.25) { out.push(p); n += p.length; continue; }
    const s = p.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [p]; let acc = '';
    for (const x of s) { if ((acc + x).length > max && acc) break; acc += x; }
    out.push(acc.trim()); break;
  }
  return out;
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
async function texts(items) { // items : [{q,title}] → Map q → {bref, src, srcw}
  const wp = await extracts('fr.wikipedia.org', items.map(i => i.title));
  const vk = await extracts('fr.vikidia.org', items.map(i => i.title)).catch(() => ({}));
  const out = new Map();
  for (const it of items) {
    const v = vk[it.title], w = wp[it.title];
    const first = s => String(s).split(/(?<=[.!?])\s/)[0] || '';
    if (v && KW.test(first(v.text)) && v.text.length > 120) out.set(it.q, { bref: cut(v.text), src: 'https://fr.vikidia.org/wiki/' + encodeURIComponent(v.title.replace(/ /g, '_')), srcw: 'vikidia' });
    else if (w) out.set(it.q, { bref: cut(w.text), src: 'https://fr.wikipedia.org/wiki/' + encodeURIComponent(w.title.replace(/ /g, '_')), srcw: 'wikipedia' });
  }
  return out;
}
const frTitle = q => ENT.get(q)?.sitelinks?.frwiki?.title;

// ---------- classements Wikidata (notoriété = nombre de langues de Wikipédia) ----------
const rank = (cls, prop, min, limit, extra = '') => sparql(`SELECT ?i ?sl WHERE { ?i wdt:P31 wd:${cls}; wdt:${prop} ?v; wikibase:sitelinks ?sl. ${extra} FILTER(?sl >= ${min}) } ORDER BY DESC(?sl) LIMIT ${limit}`);

async function build(spec) {
  // spec : {list:[qid], make:(q,e)=>obj|null}
  await entities(spec.list);
  const refs = new Set(); for (const q of spec.list) for (const p of spec.refProps || []) for (const r of ids(ENT.get(q), p)) refs.add(r);
  await entities([...refs]);
  const T = await texts(spec.list.filter(q => frTitle(q)).map(q => ({ q, title: frTitle(q) })));
  const out = {};
  for (const q of spec.list) {
    const e = ENT.get(q); if (!e || e.missing || !label(q)) continue;
    const o = spec.make(q, e); if (!o) continue;
    const t = T.get(q); if (t) { o.bref = t.bref; o.src = t.src; o.sw = t.srcw === 'vikidia' ? 'v' : 'w'; }
    o.q = q; out[spec.slug(q, e, o)] = o;
  }
  return out;
}
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const uniqSlug = (taken, base, q) => { let s = slugify(base) || q.toLowerCase(); if (taken.has(s)) s = s + '-' + q.toLowerCase(); taken.add(s); return s; };
const conts = isos => [...new Set(isos.flatMap(i => COUNTRY_CONT[i] || []))];
const clip = (o) => { for (const k of Object.keys(o)) if (o[k] == null || (Array.isArray(o[k]) && !o[k].length) || o[k] === '') delete o[k]; return o; };

export { sparql, rank, build, entities, ENT, ids, claims, best, num, round, label, isoOf, conts, clip, uniqSlug, slugify, getJSON, ROOT, ATLAS, frTitle, sleep };
