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
const swv=(sw.match(/const VERSION='(\d+)\.(\d+)\.(\d+)-[a-z0-9-]+-\d{4}-\d{2}-\d{2}'/)||[]).slice(1).map(Number);
assert.ok(swv.length===3&&(swv[0]>8||(swv[0]===8&&swv[1]>=56)),'Version du service worker PWA incorrecte pour le deuxième lot de packs spécifiques');
assert.ok(sw.includes('lexiconImages'),'Le service worker doit pré-cacher le lexique dynamique');
assert.ok(sw.includes("cache:'reload'"),'Le pré-cache doit contourner le cache HTTP');
assert.ok(sw.includes("rootRelative?scopeURL.href:base"),'Les littéraux JS doivent être résolus depuis la racine applicative');
assert.ok(!sw.includes("add(m[1]);\n return out;"),'La résolution des littéraux JS ne doit pas reprendre aveuglément le dossier du script');

const index=read('index.html');
assert.ok(index.indexOf('js/path-report.js')<index.indexOf('js/app-path.js'),'path-report.js doit être chargé avant app-path.js');
for(const ref of ['pedagogy-upgrade.css','age-adaptive.css','js/pedagogy-upgrade.js','js/pedagogy-upgrade-followup.js','js/pedagogy-content-enrichment.js','js/finot-learning-agent.js','js/question-rotation.js','js/activity-tracker.js','js/interrogation-engine.js','js/interrogation-followup.js','js/local-parent-dashboard.js','data/questions/banks.js','data/questions/transfer-scenarios.js','js/competency-engine.js','js/question-enrichment.js','js/question-transfer.js','js/competency-ui.js','js/adaptive-path-followup.js','js/path-skill-focus.js','js/finot-competency.js','js/finot-error-coach.js','js/competency-integration.js','js/local-parent-competencies.js','js/diagnostic-engine.js','js/age-adaptive-ui.js','data/pedagogy/content-banks.js','data/pedagogy/chapter-packs-6e.js','data/pedagogy/chapter-packs-6e-lot2.js','js/pedagogical-workshop.js','js/chapter-pack-integration.js','js/pedagogical-exercise-context.js','js/finot-remediation-bank.js'])assert.ok(index.includes(ref),`Couche fonctionnelle non chargée : ${ref}`);
assert.ok(index.indexOf('js/app-content.js')<index.indexOf('js/competency-engine.js'),'Le moteur de compétences doit suivre la construction du registre');
assert.ok(index.indexOf('js/question-rotation.js')<index.indexOf('js/question-enrichment.js'),'L’enrichissement doit suivre la rotation des questions');
assert.ok(index.indexOf('js/question-enrichment.js')<index.indexOf('js/question-transfer.js'),'Le transfert doit suivre l’enrichissement des questions');
assert.ok(index.indexOf('data/pedagogy/content-banks.js')<index.indexOf('data/pedagogy/chapter-packs-6e.js'),'Les banques transversales doivent précéder les packs spécifiques');
assert.ok(index.indexOf('data/pedagogy/chapter-packs-6e.js')<index.indexOf('data/pedagogy/chapter-packs-6e-lot2.js'),'Le lot 1 doit être chargé avant son extension lot 2');
assert.ok(index.indexOf('data/pedagogy/chapter-packs-6e-lot2.js')<index.indexOf('js/pedagogical-workshop.js'),'Tous les packs spécifiques doivent être disponibles avant les ateliers');
assert.ok(index.indexOf('js/pedagogy-content-enrichment.js')<index.indexOf('js/pedagogical-workshop.js'),'L’atelier doit enrichir les étapes pédagogiques déjà construites');
assert.ok(index.indexOf('js/pedagogical-workshop.js')<index.indexOf('js/chapter-pack-integration.js'),'L’intégration spécifique doit suivre l’atelier transversal');
assert.ok(index.indexOf('js/chapter-pack-integration.js')<index.indexOf('js/pedagogical-exercise-context.js'),'Les packs doivent être intégrés avant le contexte d’exercice');
assert.ok(index.indexOf('js/question-transfer.js')<index.indexOf('js/pedagogical-exercise-context.js'),'Le contexte pédagogique doit suivre les transferts existants');
assert.ok(index.indexOf('js/finot-error-coach.js')<index.indexOf('js/finot-remediation-bank.js'),'La remédiation typique doit compléter le diagnostic Finot');
assert.ok(index.indexOf('js/app-path.js')<index.indexOf('js/adaptive-path-followup.js'),'L’adaptation du parcours doit suivre le moteur de parcours');
assert.ok(index.indexOf('js/adaptive-path-followup.js')<index.indexOf('js/path-skill-focus.js'),'Le ciblage fin doit suivre l’adaptation du parcours');
assert.ok(index.indexOf('js/activity-tracker.js')<index.indexOf('js/interrogation-engine.js'),'Le suivi d’activité doit précéder le moteur d’interrogation');
assert.ok(index.indexOf('js/finot-competency.js')<index.indexOf('js/finot-error-coach.js'),'Le diagnostic d’erreur doit suivre les compétences de Finot');
assert.ok(exists('data/questions/README.md'),'Architecture des banques de questions absente');
assert.ok(exists('data/questions/banks.js'),'Banques de situations pédagogiques absentes');
assert.ok(exists('data/questions/transfer-scenarios.js'),'Situations de transfert absentes');
assert.ok(exists('data/pedagogy/chapter-packs-6e.js'),'Banque de packs spécifiques 6e absente');
assert.ok(exists('data/pedagogy/chapter-packs-6e-lot2.js'),'Deuxième lot de packs spécifiques 6e absent');
assert.ok(exists('js/chapter-pack-integration.js'),'Intégration des packs spécifiques absente');
const workshop=read('js/pedagogical-workshop.js');
assert.ok(workshop.includes('Document pédagogique MathQuest'),'Les documents de synthèse doivent être identifiés comme pédagogiques');
assert.ok(workshop.includes("Ce n'est pas une donnée historique ou scientifique réelle"),'Les données simulées doivent être explicitement signalées');
const packs=read('data/pedagogy/chapter-packs-6e.js');
for(const id of ["'6p'","'fr6a'","'hg6o'","'pc6f'"])assert.ok(packs.includes(id),`Pack spécifique lot 1 manquant : ${id}`);
for(const type of ["type:'simulation'","type:'creation'","type:'reconstitution'"])assert.ok(packs.includes(type),`Provenance de pack lot 1 absente : ${type}`);
const packs2=read('data/pedagogy/chapter-packs-6e-lot2.js');
for(const id of ["'6g'","'fr6j'","'svt6a'","'hg6s'"])assert.ok(packs2.includes(id),`Pack spécifique lot 2 manquant : ${id}`);
for(const marker of ['partage, mesure et quotient','nature grammaticale','conseil alimentaire personnalisé','contrainte naturelle'])assert.ok(packs2.toLowerCase().includes(marker.toLowerCase()),`Contrôle sémantique lot 2 manquant : ${marker}`);
assert.ok(read('data/pedagogy/README.md').includes('`creation`'),'Le standard de provenance doit distinguer les créations originales');
assert.ok(read('js/chapter-pack-integration.js').includes('mq-specific-pack'),'Le rendu spécifique doit être identifiable dans le DOM');
console.log('MathQuest regression audit: OK');