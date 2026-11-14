// Contrôle qualité des données « thèmes » de l'Atlas (data/atlas-eau.js, data/atlas-relief.js). Node pur, aucune dépendance, hors ligne.
// Usage : node tools/atlas-check.mjs            (code de sortie 1 si une règle est violée)
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const w = {};
for (const f of ['atlas.js', 'atlas-eau.js', 'atlas-relief.js']) new Function('window', readFileSync(join(ROOT, 'data', f), 'utf8'))(w);
const T = w.MQ_ATLAS_T, PAYS = w.MQ_ATLAS.pays;

const MIN = { oceans: 5, mers: 55, fleuves: 110, lacs: 60, montagnes: 120, iles: 80, deserts: 25, continents: 7 };
const TYPES = { oceans: ['océan'], mers: ['mer', 'golfe', 'baie', 'détroit'], fleuves: ['fleuve', 'rivière', 'cours d’eau'], lacs: ['lac'], montagnes: ['sommet', 'massif', 'volcan'], iles: ['île'], deserts: ['désert'], continents: ['continent'] };
const RANGES = { km: [1, 7000], km2: [0.5, 1.8e8], bassin: [1, 7.1e6], debit: [10, 250000], prof: [1, 12000], alt: [-500, 9000], pop: [0, 2e10] };
const NONLATIN = /[^\u0000-ɏḀ-ỿ -⁯←-⇿∀-⋿ -ÿ]/;
const SRC = /^https:\/\/fr\.(vikidia|wikipedia)\.org\/wiki\//;
const ART = /<|>|\{\{|\}\}|\[réf|\[\d+\]|\[\s*\]|^\s*\d+°|\bhttps?:\/\//;

const errs = [], warns = [];
const err = (m) => errs.push(m), warn = (m) => warns.push(m);
const names = new Map(); let total = 0;
for (const [theme, group] of Object.entries(T)) {
  if (!(theme in MIN)) continue;
  const rows = Object.entries(group); total += rows.length;
  if (rows.length < MIN[theme]) err(`${theme} : ${rows.length} entrées, minimum ${MIN[theme]}`);
  for (const [slug, o] of rows) {
    const id = `${theme}/${slug}`;
    if (!o.n || typeof o.n !== 'string') err(`${id} : nom absent`);
    if (!TYPES[theme].includes(o.t)) err(`${id} : type « ${o.t} » inattendu`);
    if (!/^[a-z0-9-]+$/.test(slug)) err(`${id} : identifiant invalide`);
    if (!Array.isArray(o.bref) || !o.bref.length) err(`${id} : texte absent`);
    else for (const p of o.bref) {
      if (typeof p !== 'string' || p.length < 30) err(`${id} : paragraphe trop court`);
      else {
        if (p.length > 950) warn(`${id} : paragraphe long (${p.length})`);
        if (ART.test(p)) err(`${id} : artefact dans le texte « ${p.slice(0, 60)} »`);
        if (NONLATIN.test(p)) err(`${id} : caractères non latins dans le texte « ${p.slice(0, 60)} »`);
        if (/\(\s*\)|\(\s*[;,]|[;,]\s*\)/.test(p)) err(`${id} : parenthèse vide ou mal formée`);
        if (!/[.!?»)]$/.test(p.trim())) err(`${id} : paragraphe qui ne finit pas sur une phrase complète`);
      }
    }
    if (!SRC.test(o.src || '')) err(`${id} : source de texte invalide (${o.src})`);
    if (!['v', 'w'].includes(o.sw)) err(`${id} : type de source (sw) invalide`);
    if (!/^Q\d+$/.test(o.q || '')) err(`${id} : identifiant Wikidata absent`);
    for (const c of o.pays || []) if (!PAYS[c]) err(`${id} : code pays inconnu ${c}`);
    for (const [k, [a, b]] of Object.entries(RANGES)) if (o[k] != null && !(typeof o[k] === 'number' && o[k] >= a && o[k] <= b)) err(`${id} : ${k}=${o[k]} hors plage [${a}, ${b}]`);
    for (const k of ['n', 'orig', 'emb', 'massif']) if (o[k] && (NONLATIN.test(o[k]) || /[<>{}]/.test(o[k]))) err(`${id} : champ ${k} douteux « ${o[k]} »`);
    const key = o.n.toLowerCase();
    if (names.has(key)) err(`${id} : doublon de nom avec ${names.get(key)}`); else names.set(key, id);
    if (theme === 'fleuves' && !(o.km > 0)) warn(`${id} : longueur absente`);
    if (theme === 'montagnes' && o.t !== 'massif' && !(o.alt > 0)) err(`${id} : altitude absente`);
    if (['oceans', 'mers', 'lacs', 'iles', 'deserts'].includes(theme) && !(o.km2 > 0)) warn(`${id} : superficie absente`);
  }
}
for (const t of Object.keys(MIN)) if (!T[t]) err(`thème manquant : ${t}`);

console.log(`${total} entrées contrôlées.`);
for (const t of Object.keys(MIN)) console.log(`  ${t.padEnd(11)} ${String(Object.keys(T[t] || {}).length).padStart(4)} (minimum ${MIN[t]})`);
if (warns.length) console.log(`\n${warns.length} avertissement(s) :\n  ` + warns.slice(0, 40).join('\n  '));
if (errs.length) { console.log(`\n${errs.length} ERREUR(S) :\n  ` + errs.slice(0, 80).join('\n  ')); process.exit(1); }
console.log('\nRÉSULTAT : SUCCÈS');
