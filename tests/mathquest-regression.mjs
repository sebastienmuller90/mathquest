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

// Stabilisation 20/10/2026 : plus aucun correctif cœur injecté dynamiquement ni timer de réinstallation ; les correctifs
// d'audit vivent dans leur module propriétaire et les extensions s'abonnent à js/app-hooks.js.
const report=read('js/path-report.js');
for(const f of fs.readdirSync(path.join(root,'js')).filter(f=>f.endsWith('.js'))){const src=read('js/'+f);
 assert.ok(!/setInterval\([^;]*,\s*50\s*\)/.test(src),`${f} : timer de 50 ms interdit (réinstallation de hook)`);
 assert.ok(!/createElement\(['"]script['"]\)/.test(src),`${f} : injection dynamique de script interdite`);}
assert.ok(!exists('js/audit-fixes.js')&&!exists('js/audit-followup.js'),'audit-fixes.js / audit-followup.js doivent être absorbés');
const owners={'js/app-screens.js':['balancedQueue','forcedDifficulty','streakById','endPathMission'],'js/app-path.js':['pathChestGains','exerciseAccuracy','pathOfGrade'],'js/app-state.js':['MQ_STORAGE_STATUS','logAnswer','applied.push'],'js/reading-engine.js':['expectedAnswer'],'js/dictation-engine.js':['punctPositions'],'js/parent-compat.js':['MQ_PARENT_EMC_SPLIT']};
for(const [f,ms] of Object.entries(owners)){const src=read(f);for(const m of ms)assert.ok(src.includes(m),`${f} : correctif manquant ${m}`);}
const parent=read('parent.html');
for(const s of ['js/parent-compat.js','js/parent-interrogation.js','js/parent-dashboard.js','js/parent-competencies.js'])assert.ok(parent.includes(`<script src="${s}"></script>`),`parent.html doit charger ${s} statiquement`);

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
const swv=(sw.match(/const VERSION='(\d+)\.(\d+)\.(\d+)-[a-z0-9-]+-\d{4}-\d{2}-\d{2}'/)||[]).slice(1).map(Number);
assert.ok(swv.length===3&&(swv[0]>8||(swv[0]===8&&swv[1]>=54)),'Version du service worker PWA incorrecte pour la phase 4');
assert.ok(sw.includes('lexiconImages'),'Le service worker doit pré-cacher le lexique dynamique');
assert.ok(sw.includes("cache:'reload'"),'Le pré-cache doit contourner le cache HTTP');
assert.ok(sw.includes("rootRelative?scopeURL.href:base"),'Les littéraux JS doivent être résolus depuis la racine applicative');
assert.ok(!sw.includes("add(m[1]);\n return out;"),'La résolution des littéraux JS ne doit pas reprendre aveuglément le dossier du script');

const index=read('index.html');
assert.ok(index.indexOf('js/path-report.js')<index.indexOf('js/app-path.js'),'path-report.js doit être chargé avant app-path.js');
assert.ok(index.indexOf('js/app-hooks.js')>0&&index.indexOf('js/app-hooks.js')<index.indexOf('js/app-content.js'),'js/app-hooks.js doit être chargé avant tous les modules');
for(const ref of ['pedagogy-upgrade.css','age-adaptive.css','js/pedagogy-upgrade.js','js/pedagogy-upgrade-followup.js','js/pedagogy-content-enrichment.js','js/finot-learning-agent.js','js/question-rotation.js','js/activity-tracker.js','js/interrogation-engine.js','js/interrogation-followup.js','js/local-parent-dashboard.js','data/questions/banks.js','data/questions/transfer-scenarios.js','js/competency-engine.js','js/question-enrichment.js','js/question-transfer.js','js/competency-ui.js','js/adaptive-path-followup.js','js/path-skill-focus.js','js/finot-competency.js','js/finot-error-coach.js','js/competency-integration.js','js/local-parent-competencies.js','js/diagnostic-engine.js','js/age-adaptive-ui.js','data/pedagogy/content-banks.js','js/pedagogical-workshop.js','js/pedagogical-exercise-context.js','js/finot-remediation-bank.js'])assert.ok(index.includes(ref),`Couche fonctionnelle non chargée : ${ref}`);
assert.ok(index.indexOf('js/app-content.js')<index.indexOf('js/competency-engine.js'),'Le moteur de compétences doit suivre la construction du registre');
assert.ok(index.indexOf('js/question-rotation.js')<index.indexOf('js/question-enrichment.js'),'L’enrichissement doit suivre la rotation des questions');
assert.ok(index.indexOf('js/question-enrichment.js')<index.indexOf('js/question-transfer.js'),'Le transfert doit suivre l’enrichissement des questions');
assert.ok(index.indexOf('data/pedagogy/content-banks.js')<index.indexOf('js/pedagogical-workshop.js'),'Les banques pédagogiques doivent précéder les ateliers');
assert.ok(index.indexOf('js/pedagogy-content-enrichment.js')<index.indexOf('js/pedagogical-workshop.js'),'L’atelier doit enrichir les étapes pédagogiques déjà construites');
assert.ok(index.indexOf('js/question-transfer.js')<index.indexOf('js/pedagogical-exercise-context.js'),'Le contexte pédagogique doit suivre les transferts existants');
assert.ok(index.indexOf('js/finot-error-coach.js')<index.indexOf('js/finot-remediation-bank.js'),'La remédiation typique doit compléter le diagnostic Finot');
assert.ok(index.indexOf('js/app-path.js')<index.indexOf('js/adaptive-path-followup.js'),'L’adaptation du parcours doit suivre le moteur de parcours');
assert.ok(index.indexOf('js/adaptive-path-followup.js')<index.indexOf('js/path-skill-focus.js'),'Le ciblage fin doit suivre l’adaptation du parcours');
assert.ok(index.indexOf('js/activity-tracker.js')<index.indexOf('js/interrogation-engine.js'),'Le suivi d’activité doit précéder le moteur d’interrogation');
assert.ok(index.indexOf('js/finot-competency.js')<index.indexOf('js/finot-error-coach.js'),'Le diagnostic d’erreur doit suivre les compétences de Finot');
assert.ok(exists('data/questions/README.md'),'Architecture des banques de questions absente');
assert.ok(exists('data/questions/banks.js'),'Banques de situations pédagogiques absentes');
assert.ok(exists('data/questions/transfer-scenarios.js'),'Situations de transfert absentes');
const workshop=read('js/pedagogical-workshop.js');
assert.ok(workshop.includes('Document pédagogique MathQuest'),'Les documents de synthèse doivent être identifiés comme pédagogiques');
assert.ok(workshop.includes("Ce n'est pas une donnée historique ou scientifique réelle"),'Les données simulées doivent être explicitement signalées');
console.log('MathQuest regression audit: OK');
