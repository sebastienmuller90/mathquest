// Bibliothèque du générateur de données « thèmes » de l'Atlas (océans, fleuves, montagnes…).
// Sources ouvertes : Wikidata (CC0) pour les chiffres, Vikidia puis Wikipédia (CC BY-SA 4.0) pour les textes.
// Les réponses du réseau sont mises en cache dans ATLAS_CACHE ; aucune valeur n'est inventée : une donnée absente reste vide.
// Utilisée par tools/atlas-build-themes.mjs (et par tools/atlas-build-france.mjs).
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
      await sleep(/query\.wikidata/.test(url) ? 3000 : 400);                      // politesse envers les serveurs
      const r = await fetch(url, { headers: { ...UA, ...headers } });
      const t = await r.text();
      if (r.status === 429 || r.status === 503) { const ra = +r.headers.get('retry-after') || 0; const e = new Error(r.status + ' trop de requêtes'); e.wait = Math.max(ra, 20 * (i + 1)) * 1000; throw e; }
      if (!r.ok) throw new Error(r.status + ' ' + t.slice(0, 80));
      const j = JSON.parse(t); writeFileSync(f, t); return j;
    } catch (e) { if (i === tries - 1) throw new Error(url.slice(0, 120) + ' → ' + e.message); await sleep(e.wait || 2500 * (i + 1)); }
  }
}
const dedupe = list => { const m = new Map(); for (const x of list) if (!m.has(x.q)) m.set(x.q, x); return [...m.values()]; };
const sparql = q => getJSON('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q), { headers: { Accept: 'application/sparql-results+json' } })
  .then(j => dedupe(j.results.bindings.map(b => ({ q: b.i.value.split('/').pop(), sl: +(b.sl?.value || 0), v: (b.m || b.v) ? +(b.m || b.v).value : null }))));

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

// Unités : dimension et facteur vers l'unité de base (mètre pour L, km² pour A, m³/s pour Q).
const UNITS = {
  Q11573: ['L', 1], Q828224: ['L', 1000], Q174728: ['L', 0.01], Q3710: ['L', 0.3048], Q253276: ['L', 1609.344], Q218593: ['L', 0.0254],
  Q712226: ['A', 1], Q25343: ['A', 1e-6], Q35852: ['A', 0.01], Q81292: ['A', 0.00404686], Q4243638: ['A', 2.58999],
  Q794261: ['Q', 1]
};
// want : 'km' | 'm' (longueurs), 'km2' (surfaces), 'm3s' (débit), 'raw' (nombre sans unité). Renvoie null si l'unité est absente ou inconnue.
function num(e, p, want) {
  const cs = best(e, p); if (!cs.length) return null;
  const c = cs.length > 1 ? cs.slice().sort((a, b) => (b.qualifiers?.P585?.[0]?.datavalue?.value?.time || '').localeCompare(a.qualifiers?.P585?.[0]?.datavalue?.value?.time || ''))[0] : cs[0];
  const v = c.mainsnak.datavalue.value; if (!v || v.amount == null) return null;
  const a = parseFloat(v.amount); const u = (v.unit || '').split('/').pop();
  if (!Number.isFinite(a)) return null;
  if (u === '1' || u === '') return want === 'raw' ? a : null;
  const U = UNITS[u]; if (!U || want === 'raw') return null;
  if (want === 'km' && U[0] === 'L') return a * U[1] / 1000;
  if (want === 'm' && U[0] === 'L') return a * U[1];
  if (want === 'km2' && U[0] === 'A') return a * U[1];
  if (want === 'm3s' && U[0] === 'Q') return a * U[1];
  return null;
}
const round = (x, d = 0) => x == null ? null : (d ? Math.round(x * 10 ** d) / 10 ** d : Math.round(x));
const sig = (x, n = 2) => { if (x == null || !x) return null; const p = 10 ** (Math.floor(Math.log10(Math.abs(x))) - n + 1); return Math.round(x / p) * p; };

// ---------- pays : ISO → continents (données existantes de l'appli) ----------
const ATLAS = (() => { const w = {}; new Function('window', readFileSync(join(ROOT, 'data/atlas.js'), 'utf8'))(w); return w.MQ_ATLAS; })();
const COUNTRY_CONT = Object.fromEntries(Object.entries(ATLAS.pays).map(([k, p]) => [k, p.c || []]));
async function isoOf(qids) {
  await entities(qids);
  return [...new Set(qids.map(q => claims(ENT.get(q), 'P297')[0]?.mainsnak.datavalue.value).filter(v => v && ATLAS.pays[v]))];
}

// ---------- nettoyage des textes ----------
const LATIN = /[^\u0000-ɏḀ-ỿ -⁯←-⇿∀-⋿ -ÿ]/; // tout ce qui n'est pas latin ni ponctuation courante
const IPA = /[ɐ-˿ᴀ-ᶿ]/;
const KW = /(fleuve|rivière|cours d.eau|affluent|lac|mer|océan|golfe|baie|détroit|montagne|mont|massif|sommet|volcan|île|archipel|désert|continent|région|département|chaîne|plateau|péninsule|bassin|glacier|plaine|vallée|collectivité|territoire|point culminant|manche)/i;
function clean(t) {
  let s = String(t || '');
  s = s.replace(/\[[^\]]{0,60}\]/g, '');                                    // [1], [réf. à confirmer], [ˈtisɒ]
  for (let i = 0; i < 4; i++) s = s.replace(/\s*\([^()]*\)/g, m => (LATIN.test(m) || IPA.test(m) || /prononc|\bAPI\b|écouter|\/[^/]{1,30}\//i.test(m)) ? '' : m); // parenthèses non latines / phonétiques
  s = s.replace(/\s*\(\s*\)/g, '').replace(/\s*\(\s*[;,]\s*/g, ' (').replace(/\s*[;,]\s*\)/g, ')');
  s = s.split(/\s+/).filter(w => !LATIN.test(w) && !IPA.test(w)).join(' ');        // mots restants en écriture non latine
  s = s.replace(/\s{2,}/g, ' ').replace(/ ([;:!?»])/g, ' $1').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').replace(/\s+([.,])/g, '$1').trim();
  return s;
}
const COORD = /^\s*[-+]?\d+(?:[.,]\d+)?\s*°/;
function cut(text, max = 720) {
  const paras = String(text).split(/\n+/).map(clean).filter(x => x.length > 30 && !COORD.test(x) && !/^[\d\s°′″NSEOW.,/–-]+$/.test(x));
  const out = []; let n = 0;
  for (const p of paras) {
    if (n >= max || out.length >= 2) break;
    if (n + p.length <= max * 1.15) { out.push(p); n += p.length; continue; }
    const s = p.split(/(?<=[.!?])\s+(?=[A-ZÀ-ÖØ-Þ«“"(])/); let acc = '';
    for (const x of s) { if ((acc ? acc + ' ' + x : x).length > max && acc) break; acc = acc ? acc + ' ' + x : x; }
    out.push(acc.trim()); break;
  }
  return out.filter(x => x.length > 30 && /[.!?»)]$/.test(x));
}
async function extracts(host, titles) {
  const res = {};
  for (let k = 0; k < titles.length; k += 20) {
    const part = titles.slice(k, k + 20);
    const j = await getJSON(`https://${host}/w/api.php?action=query&format=json&prop=extracts|pageprops&exintro=1&explaintext=1&redirects=1&exlimit=20&ppprop=disambiguation&titles=${encodeURIComponent(part.join('|'))}`).catch(() => ({}));
    const map = {}; for (const n of j.query?.normalized || []) map[n.to] = n.from; for (const r of j.query?.redirects || []) map[r.to] = map[r.from] || r.from;
    for (const pg of Object.values(j.query?.pages || {})) {
      if (pg.missing !== undefined || !pg.extract || pg.pageprops?.disambiguation !== undefined) continue;
      res[map[pg.title] || pg.title] = { title: pg.title, text: pg.extract };
    }
  }
  return res;
}
const firstSentence = s => String(s).split(/(?<=[.!?])\s/)[0] || '';
async function texts(items) { // items : [{q,title}] → Map q → {bref, src, srcw, raw}
  const wp = await extracts('fr.wikipedia.org', items.map(i => i.title));
  const vk = await extracts('fr.vikidia.org', items.map(i => i.title));
  const out = new Map();
  for (const it of items) {
    const v = vk[it.title], w = wp[it.title];
    const useV = v && KW.test(firstSentence(v.text)) && v.text.length > 120 && cut(v.text).length;
    const src = useV ? v : w; if (!src) continue;
    const bref = cut(src.text); if (!bref.length) continue;
    out.set(it.q, { bref, src: (useV ? 'https://fr.vikidia.org/wiki/' : 'https://fr.wikipedia.org/wiki/') + encodeURIComponent(src.title.replace(/ /g, '_')), srcw: useV ? 'vikidia' : 'wikipedia', raw: (w?.text || src.text).slice(0, 6000) });
  }
  return out;
}
const frTitle = q => ENT.get(q)?.sitelinks?.frwiki?.title;

// ---------- classements Wikidata (notoriété = nombre de langues de Wikipédia) ----------
// Variante simple (P31 exact) ; rankClosure ajoute les sous-classes et se replie sur la variante simple en cas d'échec.
// Plusieurs valeurs par élément (ex. plusieurs superficies datées) multiplieraient les lignes : on agrège (MAX) côté requête, groupé par élément.
const rank = (cls, prop, min, limit, extra = '') => sparql(`SELECT ?i ?sl (MAX(?v) AS ?m) WHERE { ?i wdt:P31 wd:${cls}; wdt:${prop} ?v; wikibase:sitelinks ?sl. ${extra} FILTER(?sl >= ${min}) } GROUP BY ?i ?sl ORDER BY DESC(?sl) LIMIT ${limit}`);
async function rankClosure(classes, prop, min, limit, { extra = '', by = 'sl' } = {}) {
  const vals = classes.map(c => 'wd:' + c).join(' ');
  const body = (closure) => `SELECT ?i ?sl ${prop ? '(MAX(?v) AS ?m)' : ''} WHERE { VALUES ?cls { ${vals} } ?i ${closure ? 'wdt:P31/wdt:P279*' : 'wdt:P31'} ?cls; ${prop ? `wdt:${prop} ?v;` : ''} wikibase:sitelinks ?sl. ${extra} FILTER(?sl >= ${min}) } GROUP BY ?i ?sl ORDER BY DESC(?${by === 'v' && prop ? 'm' : 'sl'}) LIMIT ${limit}`;
  try { return await sparql(body(true)); } catch (e) { console.log('  (repli sans sous-classes)', classes.join(','), e.message.slice(-60)); return sparql(body(false)); }
}

async function build(spec) {
  // spec : {list:[qid], refProps, make(q,e)→obj|null, post?(o,e,t), reject?(o), slug(q,e,o), requireText?:true}
  await entities(spec.list);
  const refs = new Set(); for (const q of spec.list) for (const p of spec.refProps || []) for (const r of ids(ENT.get(q), p)) refs.add(r);
  await entities([...refs]);
  const T = await texts(spec.list.filter(q => frTitle(q)).map(q => ({ q, title: frTitle(q) })));
  const out = {}, dropped = [];
  for (const q of spec.list) {
    const e = ENT.get(q); if (!e || e.missing || !label(q)) { dropped.push([q, 'sans libellé']); continue; }
    const o = spec.make(q, e); if (!o) { dropped.push([label(q), 'exclu par la règle du thème']); continue; }
    const t = T.get(q);
    if (t) { o.bref = t.bref; o.src = t.src; o.sw = t.srcw === 'vikidia' ? 'v' : 'w'; } else if (spec.requireText !== false) { dropped.push([label(q), 'sans texte']); continue; }
    spec.post?.(o, e, t);
    if (spec.reject?.(o)) { dropped.push([o.n, 'rejeté après calcul']); continue; }
    o.n = o.n.charAt(0).toUpperCase() + o.n.slice(1);
    o.q = q; out[spec.slug(q, e, o)] = o;
  }
  return { out, dropped };
}
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const uniqSlug = (taken, base, q) => { let s = slugify(base) || q.toLowerCase(); if (taken.has(s)) s = s + '-' + q.toLowerCase(); taken.add(s); return s; };
const conts = isos => [...new Set(isos.flatMap(i => COUNTRY_CONT[i] || []))];
const clip = (o) => { for (const k of Object.keys(o)) if (o[k] == null || (Array.isArray(o[k]) && !o[k].length) || o[k] === '' || (typeof o[k] === 'number' && !(o[k] > 0) && k !== 'alt')) delete o[k]; return o; };

export { sparql, rank, rankClosure, dedupe, build, entities, ENT, ids, claims, best, num, round, sig, label, isoOf, conts, clip, uniqSlug, slugify, getJSON, ROOT, ATLAS, frTitle, sleep, texts, cut, clean, KW };
