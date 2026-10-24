import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const results = [];
const warnings = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

// --- Références réglementaires 2026-2027 ---
const en6 = read('data/pedagogy/course-depth-anglais-6e.js');
const en5 = read('data/pedagogy/course-depth-anglais-5e.js');
const hgDepth = read('data/pedagogy/course-depth-hg-emc-primary.js');

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

// Le moteur primaire central est l'autorité fonctionnelle pour les références par classe.
const primaryCtx = { console, Math, JSON, String, Number, Array, Object, Set, Map, RegExp, Error };
primaryCtx.window = primaryCtx;
primaryCtx.globalThis = primaryCtx;
vm.createContext(primaryCtx);
vm.runInContext(read('js/primary-engine.js'), primaryCtx, { filename: 'js/primary-engine.js' });
const P = primaryCtx.MQPrimary;
check(
  'Primaire : mapping HG/EMC 2026-2027 du moteur central',
  P?.REF?.['p-hg']?.CM1 === 'HGEPS_2026' &&
  P?.REF?.['p-hg']?.CM2 === 'C2C3_2020' &&
  ['CP','CE1','CE2','CM1','CM2'].every(g => P?.REF?.['p-emc']?.[g] === 'EMC_2024'),
  JSON.stringify({ hg: P?.REF?.['p-hg'], emc: P?.REF?.['p-emc'] })
);
if (/programmes?\s+2025\s*\(HG\s+et\s+EMC\)/i.test(hgDepth)) {
  warnings.push({
    name: 'Documentation HG/EMC du fichier d’approfondissement',
    detail: 'L’en-tête « programmes 2025 (HG et EMC) » est obsolète/générique et doit être aligné sur le référentiel central 2026-2027, mais le mapping fonctionnel MQPrimary.REF est déjà correct.'
  });
}

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
console.log(JSON.stringify({ summary: { checks: results.length, passed: results.length - failed.length, failed: failed.length, warnings: warnings.length }, results, warnings }, null, 2));
if (failed.length) {
  console.error(`\n❌ ${failed.length} blocage(s) Wave 1 encore présent(s).`);
  process.exitCode = 1;
} else {
  console.log('\n✅ Tous les blocages fonctionnels Wave 1 sont corrigés.');
}
