import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

// --- Références réglementaires 2026-2027 ---
const en6 = read('data/pedagogy/course-depth-anglais-6e.js');
const en5 = read('data/pedagogy/course-depth-anglais-5e.js');
const hg = read('data/pedagogy/course-depth-hg-emc-primary.js');

check(
  'Anglais 6e : nouveau programme BO n°22 du 29 mai 2025',
  /BO[^\n]{0,40}(?:n[°o]\s*)?22[^\n]{0,80}29\s+mai\s+2025/i.test(en6) || /29\s+mai\s+2025/i.test(en6),
  'Le programme 2025 est applicable en 6e depuis 2025-2026.'
);
check(
  'Anglais 6e LVA : cible A1+',
  /A1\+/i.test(en6),
  'Pour 2026-2027 : A1+ en LVA ; A1 en LVB bilangue.'
);
check(
  'Anglais 5e : nouveau programme BO n°22 du 29 mai 2025',
  /BO[^\n]{0,40}(?:n[°o]\s*)?22[^\n]{0,80}29\s+mai\s+2025/i.test(en5) || /29\s+mai\s+2025/i.test(en5),
  'Le programme 2025 devient applicable en 5e à la rentrée 2026.'
);
check(
  'Anglais 5e LVA : cible A2',
  /\bA2\b/i.test(en5),
  'Pour 2026-2027 : A2 en LVA ; A1+ en LVB.'
);
check(
  'HG/EMC primaire : références 2026-2027 explicites',
  /2026/.test(hg) && /BO\s*2024/i.test(hg) && !/programmes?\s+2025\s*\(HG\s+et\s+EMC\)/i.test(hg),
  'Attendu : distinguer entrée progressive HG/espace-temps 2026 (CM1 en 2026-2027) et EMC BO 2024 ; ne pas utiliser une référence générique « programmes 2025 ».'
);

// --- Régression dictée : erreurs éloignées ne doivent pas être fusionnées ---
const ctx = { console, Math, JSON, String, Number, Array, Object, Set, Map, RegExp, Error };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(read('js/dictation-engine.js'), ctx, { filename: 'js/dictation-engine.js' });
const D = ctx.MQDictation;
const analysis = D.analyze('Le chat dort dans la maison.', 'Le dort dans la maison rouge.');
const kinds = analysis.errors.map(e => e.kind);
check(
  'Dictée : mot manquant et mot en trop éloignés restent deux erreurs distinctes',
  analysis.missing === 1 && analysis.extra === 1 && kinds.includes('mot manquant') && kinds.includes('mot en trop') && !kinds.every(k => k === 'mot incorrect'),
  JSON.stringify({ missing: analysis.missing, extra: analysis.extra, kinds, errors: analysis.errors })
);

const failed = results.filter(r => !r.ok);
console.log(JSON.stringify({ summary: { checks: results.length, passed: results.length - failed.length, failed: failed.length }, results }, null, 2));
if (failed.length) {
  console.error(`\n❌ ${failed.length} blocage(s) Wave 1 encore présent(s).`);
  process.exitCode = 1;
} else {
  console.log('\n✅ Tous les blocages Wave 1 sont corrigés.');
}
