import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const code = fs.readFileSync(path.join(root, 'js/primary-engine.js'), 'utf8');
const math = Object.create(Math);
let randomValue = 0;
math.random = () => randomValue;
const ctx = { console, Math: math, JSON, String, Number, Array, Object, Set, Map, RegExp, Error };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx, { filename: 'js/primary-engine.js' });
const P = ctx.MQPrimary;

P.add('CP', {
  'p-francais': [{
    id: 'qa-mix-chapter',
    name: 'QA mélange',
    c: { r: ['test'] },
    g: () => ({ type: 'text', q: 'legacy', acc: ['legacy'], source: 'legacy' })
  }]
});
P.enrich('qa-mix-chapter', {
  w: .85,
  items: [['Question enrichie ?', 'enrichie', ['fausse'], 'QA']]
});
const chapter = P._reg.byId['qa-mix-chapter'];

// Sous le seuil : banque enrichie. Au-dessus : générateur historique.
randomValue = .84;
const enriched = chapter.g(1);
randomValue = .86;
const legacy = chapter.g(1);

const checks = [
  { name: 'w=.85 sélectionne la banque enrichie sous le seuil', ok: enriched?.source !== 'legacy' && enriched?.q === 'Question enrichie ?', detail: enriched },
  { name: 'w=.85 conserve le générateur historique au-dessus du seuil', ok: legacy?.source === 'legacy' && legacy?.q === 'legacy', detail: legacy }
];
const failed = checks.filter(x => !x.ok);
console.log(JSON.stringify({ summary: { checks: checks.length, passed: checks.length - failed.length, failed: failed.length }, checks }, null, 2));
if (failed.length) process.exitCode = 1;
else console.log('\n✅ Mélange enrichi/historique : fallback 15 % conservé par le moteur.');
