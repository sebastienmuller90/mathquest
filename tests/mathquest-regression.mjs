import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));

function localRefs(html){
 const out=[];let m;const re=/(?:src|href)=["']([^"']+)["']/g;
 while((m=re.exec(html))){const u=m[1];if(!u||u.startsWith('data:')||/^https?:/i.test(u)||u.startsWith('#'))continue;out.push(u.split(/[?#]/)[0]);}
 return out;
}
for(const page of ['index.html','parent.html'])for(const ref of localRefs(read(page)))assert.ok(exists(ref),`${page} référence un fichier absent : ${ref}`);

const report=read('js/path-report.js');
assert.ok(report.includes('js/audit-fixes.js'),'path-report.js doit charger audit-fixes.js');
const fixes=read('js/audit-fixes.js');
for(const marker of ['expectedReadingAnswer','balancedQueue','pathChestGains','MQDictation.best','saveLocal','applyParent'])assert.ok(fixes.includes(marker),`Correctif manquant : ${marker}`);

const context={console};vm.createContext(context);vm.runInContext(report,context,{filename:'js/path-report.js'});
assert.equal(typeof context.pathVerdicts,'function','pathVerdicts doit rester disponible');
const p={date:'2026-10-20',chest:false,steps:[
 {kind:'lesson',cid:'a',subj:'maths',status:'done',score:100,ms:1},
 {kind:'lesson',cid:'b',subj:'francais',status:'done',score:100,ms:1},
 {kind:'lesson',cid:'c',subj:'hg',status:'done',score:100,ms:1},
 {kind:'lesson',cid:'d',subj:'anglais',status:'review',score:50,ms:1},
 {kind:'exo',status:'done',answers:[{cid:'a',ok:true},{cid:'b',ok:false},{cid:'c',ok:true},{cid:'d',ok:true}]},
 {kind:'exo',status:'done',answers:[{cid:'a',ok:true},{cid:'b',ok:true},{cid:'c',ok:true},{cid:'d',ok:true}]}
]};
const verdicts=context.pathVerdicts(p);
assert.equal(verdicts.find(x=>x.cid==='a').good,true);
assert.equal(verdicts.find(x=>x.cid==='b').good,false);
assert.equal(verdicts.find(x=>x.cid==='d').good,false);
assert.equal(context.pathCompact(p).steps.length,6);

const sw=read('sw.js');
assert.ok(sw.includes("8.47.0-pedagogy-levels-2026-10-20"),'Version du service worker pédagogique incorrecte');
assert.ok(sw.includes('lexiconImages'),'Le service worker doit pré-cacher le lexique dynamique');
assert.ok(sw.includes("cache:'reload'"),'Le pré-cache doit contourner le cache HTTP');

const index=read('index.html');
assert.ok(index.indexOf('js/path-report.js')<index.indexOf('js/app-path.js'),'path-report.js doit être chargé avant app-path.js');
for(const ref of ['pedagogy-upgrade.css','js/pedagogy-upgrade.js','js/pedagogy-upgrade-followup.js','js/pedagogy-content-enrichment.js','js/finot-learning-agent.js'])assert.ok(index.includes(ref),`Couche pédagogique non chargée : ${ref}`);
assert.ok(index.indexOf('js/app-path.js')<index.indexOf('js/pedagogy-upgrade.js'),'La couche pédagogique doit être chargée après le moteur principal');
console.log('MathQuest regression audit: OK');
