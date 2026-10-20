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
assert.ok(report.includes('js/parent-interrogation.js'),'path-report.js doit charger l’interrogation parent distante');
assert.ok(report.includes('js/parent-dashboard.js'),'path-report.js doit charger le tableau de bord parent distant');
assert.ok(report.includes('js/parent-competencies.js'),'path-report.js doit charger les micro-compétences parent distantes');
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
// Format X.Y.Z-description-AAAA-MM-JJ ; la phase micro-compétences exige au moins 8.52.
const swv=(sw.match(/const VERSION='(\d+)\.(\d+)\.(\d+)-[a-z0-9-]+-\d{4}-\d{2}-\d{2}'/)||[]).slice(1).map(Number);
assert.ok(swv.length===3&&(swv[0]>8||(swv[0]===8&&swv[1]>=52)),'Version du service worker PWA incorrecte');
assert.ok(sw.includes('lexiconImages'),'Le service worker doit pré-cacher le lexique dynamique');
assert.ok(sw.includes("cache:'reload'"),'Le pré-cache doit contourner le cache HTTP');
assert.ok(sw.includes("rootRelative?scopeURL.href:base"),'Les littéraux JS doivent être résolus depuis la racine applicative');
assert.ok(!sw.includes("add(m[1]);\n return out;"),'La résolution des littéraux JS ne doit pas reprendre aveuglément le dossier du script');

const index=read('index.html');
assert.ok(index.indexOf('js/path-report.js')<index.indexOf('js/app-path.js'),'path-report.js doit être chargé avant app-path.js');
for(const ref of ['pedagogy-upgrade.css','js/pedagogy-upgrade.js','js/pedagogy-upgrade-followup.js','js/pedagogy-content-enrichment.js','js/finot-learning-agent.js','js/question-rotation.js','js/activity-tracker.js','js/interrogation-engine.js','js/interrogation-followup.js','js/local-parent-dashboard.js','data/questions/banks.js','js/competency-engine.js','js/question-enrichment.js','js/competency-ui.js','js/adaptive-path-followup.js','js/finot-competency.js','js/competency-integration.js','js/local-parent-competencies.js'])assert.ok(index.includes(ref),`Couche fonctionnelle non chargée : ${ref}`);
assert.ok(index.indexOf('js/app-content.js')<index.indexOf('js/competency-engine.js'),'Le moteur de compétences doit suivre la construction du registre');
assert.ok(index.indexOf('js/question-rotation.js')<index.indexOf('js/question-enrichment.js'),'L’enrichissement doit suivre la rotation des questions');
assert.ok(index.indexOf('js/app-path.js')<index.indexOf('js/adaptive-path-followup.js'),'L’adaptation du parcours doit suivre le moteur de parcours');
assert.ok(index.indexOf('js/activity-tracker.js')<index.indexOf('js/interrogation-engine.js'),'Le suivi d’activité doit précéder le moteur d’interrogation');
assert.ok(exists('data/questions/README.md'),'Architecture des banques de questions absente');
assert.ok(exists('data/questions/banks.js'),'Banques de situations pédagogiques absentes');
console.log('MathQuest regression audit: OK');
