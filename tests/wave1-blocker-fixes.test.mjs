import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');

const en6=read('data/pedagogy/course-depth-anglais-6e.js');
assert.match(en6,/BO n°22 du 29 mai 2025/i,'6e : référence BO 2025 absente');
assert.match(en6,/A1\+ en LVA/i,'6e : cible A1+ LVA absente');

const en5=read('data/pedagogy/course-depth-anglais-5e.js');
assert.match(en5,/BO n°22 du 29 mai 2025/i,'5e : référence BO 2025 absente');
assert.match(en5,/A2 en LVA/i,'5e : cible A2 LVA absente');

const ce1=read('data/primary/enrich-ce1.js');
assert.match(ce1,/o:\s*\[\s*['"]poire['"]\s*,\s*['"]pomme['"]\s*,\s*['"]prune['"]\s*\]/,'CE1 : ordre poire → pomme → prune absent');
assert.doesNotMatch(ce1,/o:\s*\[\s*['"]pomme['"]\s*,\s*['"]poire['"]\s*,\s*['"]prune['"]\s*\]/,'CE1 : ancien ordre alphabétique faux encore présent');

const ctx={console,Math,JSON,String,Number,Array,Object,Set,Map,RegExp,Error};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(read('js/dictation-engine.js'),ctx,{filename:'js/dictation-engine.js'});
const D=ctx.MQDictation;

const distant=D.analyze('Le chat dort dans la maison.','Le dort dans la maison rouge.');
assert.equal(distant.missing,1,'Dictée : le mot manquant doit rester compté');
assert.equal(distant.extra,1,'Dictée : le mot en trop doit rester compté');
assert.ok(distant.errors.some(e=>e.kind==='mot manquant'),'Dictée : nature mot manquant absente');
assert.ok(distant.errors.some(e=>e.kind==='mot en trop'),'Dictée : nature mot en trop absente');
assert.ok(!distant.errors.filter(e=>e.type==='missing'||e.type==='extra').every(e=>e.kind==='mot incorrect'),'Dictée : erreurs éloignées encore fusionnées comme remplacement');

// Régression inverse : un vrai remplacement local doit toujours rester présenté comme un mot incorrect.
const adjacent=D.analyze('Le chat dort.','Le chien dort.');
assert.ok(adjacent.errors.some(e=>e.kind==='mot incorrect') || adjacent.errors.some(e=>e.type==='orthographe'),'Dictée : un remplacement local n’est plus reconnu');

console.log('✅ Wave 1 blockers : BO/CECRL 6e-5e, ordre CE1 et dictée distante validés.');
