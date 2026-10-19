import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173';
fs.mkdirSync('tests/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1280,height:820},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const p={version:3,active:'pedqa',profiles:{pedqa:{name:'Petit Test',avatar:'🦊',grade:'CP',subj:'francais',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}}}}};localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));});
const page=await ctx.newPage(),runtime=[];page.on('pageerror',e=>runtime.push('PAGE '+e.message));page.on('console',m=>{if(m.type()==='error')runtime.push('CONSOLE '+m.text())});
await page.goto(base+'/index.html',{waitUntil:'load',timeout:120000});
await page.waitForFunction(()=>window.MQPedagogy&&window.MQPedagogyContent&&window.MQFinotLearning&&typeof CHMAP!=='undefined'&&Object.keys(CHMAP).length>1000,{timeout:60000});
const report=await page.evaluate(()=>{
 const o={chapters:0,pickers:0,easy:0,medium:0,hard:0,strategies:0,selfChecks:0,manualExerciseChecks:0,manualConfidenceChecks:0,finotChecks:0,finotSearches:0,errors:[],warnings:[]};
 const fail=(id,e)=>o.errors.push(id+': '+(e?.message||e));
 const invalid=el=>/\bundefined\b|\bNaN\b|\[object Object\]/.test(el?.innerText||'');
 for(const ch of Object.values(CHMAP)){
  o.chapters++;
  try{
   ACT.lesson(ch.id);const cards=[...document.querySelectorAll('.mq-level-card')];if(cards.length!==3)throw Error('sélecteur leçon != 3 niveaux');if(invalid(document.getElementById('app')))throw Error('sélecteur invalide');o.pickers++;
   for(const d of [1,2,3]){
    MQPedagogy.openLessonAtLevel(ch.id,d);if(!L||L.id!==ch.id)throw Error('L absente niveau '+d);if(L.lessonLevel!==d||L.quizDifficulty!==d)throw Error('niveau non conservé '+d);if(!Array.isArray(L.steps)||!L.steps.length)throw Error('aucune étape niveau '+d);
    const ks=L.steps.map(x=>x.k);if(!ks.includes('mqstrategy'))throw Error('méthode matière absente niveau '+d);if(!ks.includes('mqselfcheck'))throw Error('auto-évaluation absente niveau '+d);o.strategies++;o.selfChecks++;
    if(d===1&&!ks.includes('mqeasy'))throw Error('version facile sans guidage');if(d===2&&(ks.includes('mqeasy')||ks.includes('mqhard')))throw Error('version moyenne altérée');if(d===3&&!ks.includes('mqhard'))throw Error('version difficile sans approfondissement');
    const targets=d===1?['mqeasy','mqstrategy','mqselfcheck']:d===3?['mqhard','mqstrategy','mqselfcheck']:['mqstrategy','mqselfcheck'];for(const k of targets){const at=L.steps.findIndex(x=>x.k===k);if(at<0)throw Error('étape '+k+' absente');L.i=at;L.q=null;L.pq=null;L.locked=false;renderLesson();const card=document.querySelector('.lcard');if(!card||!card.innerText.trim()||invalid(card))throw Error('rendu '+k+' invalide niveau '+d);}
    const badge=document.querySelector('.lcard .mq-level-badge');if(!badge||!badge.textContent.includes(MQPedagogy.levels[d].name))throw Error('badge niveau absent '+d);
    ACT.conf(d===1?3:1,null);if(L.quizDifficulty!==d)throw Error('la confiance a changé le niveau manuel '+d);o.manualConfidenceChecks++;
    if(d===1)o.easy++;else if(d===2)o.medium++;else o.hard++;
   }
   ACT.start(ch.id);if(document.querySelectorAll('.mq-level-card').length!==3)throw Error('sélecteur exercice != 3 niveaux');
  }catch(e){fail(ch.id,e)}
 }
 // Exercices : un échantillon de chaque classe vérifie le maintien du niveau après une réponse.
 for(const g of ['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'])try{
  S.grade=g;ensureSubj();const ch=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl===g);if(!ch)throw Error('chapitre introuvable');
  for(const d of [1,2,3]){M=null;MQPedagogy.startMissionAtLevel(ch.id,d);if(!M||M.d!==d||M.forcedDifficulty!==d||!M.q)throw Error('mission niveau '+d+' non initialisée');result(true);if(M&&(M.d!==d||M.dById?.[ch.id]!==d))throw Error('niveau '+d+' modifié après réponse');o.manualExerciseChecks++;M=null;}
 }catch(e){fail('mission '+g,e)}
 // Recherche scolaire : au moins une notion de chaque classe doit être retrouvée uniquement dans la bonne classe.
 for(const g of ['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'])try{S.grade=g;ensureSubj();const ch=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl===g);const found=MQFinotLearning.search('je veux réviser '+ch.name);if(!found.length||found.some(x=>WMAP[x.id]?.lvl!==g))throw Error('recherche incorrecte');o.finotSearches++;}catch(e){fail('recherche Finot '+g,e)}
 // Finot jeune enfant : utilisable sans clavier et capable de retrouver le programme de sa classe.
 try{
  const cp=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP');if(!cp)throw Error('chapitre CP introuvable');S.grade='CP';ensureSubj();MQPedagogy.openLessonAtLevel(cp.id,1);finotOpen();
  const box=document.getElementById('finotchat');if(!box?.classList.contains('young'))throw Error('mode jeune non activé');if(!box.querySelector('[data-a="finotvoice"]'))throw Error('bouton micro absent');if(box.querySelectorAll('.fch-chip.kid').length<4)throw Error('pas assez de grosses actions');o.finotChecks+=3;
  const n=FCHAT.msgs.length;finotAsk("j'ai pas compris");if(FCHAT.msgs.length<=n)throw Error('intention aide non traitée');if(!/simple|retenir|réflexe/i.test(FCHAT.msgs.at(-1)?.html||''))throw Error('réponse aide inattendue');o.finotChecks++;
  finotAsk('donne moi un indice');if(!/indice|regarde|réflexe|retenir/i.test(FCHAT.msgs.at(-1)?.html||''))throw Error('intention indice non traitée');o.finotChecks++;
  finotAsk('lis moi la question');o.finotChecks++;
  const before=FCHAT.msgs.length;finotAsk('je veux travailler '+cp.name);if(FCHAT.msgs.length<=before||!/Cours facile|Exercices|Fiche/.test(FCHAT.msgs.at(-1)?.html||''))throw Error('Finot ne propose pas les actions scolaires');o.finotSearches++;
  ACT.finotvoice();o.finotChecks++;finotClose();
 }catch(e){fail('Finot CP',e)}
 return o;
});
// Captures + responsive du choix de niveau et de Finot.
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{S.grade='CP';ensureSubj();const id=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP').id;ACT.lesson(id)});let overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>3)runtime.push('RESPONSIVE picker mobile '+overflow+'px');await page.screenshot({path:'tests/screenshots/levels-mobile.png',fullPage:true});
await page.evaluate(()=>{const id=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP').id;MQPedagogy.openLessonAtLevel(id,1);finotOpen()});overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>3)runtime.push('RESPONSIVE Finot mobile '+overflow+'px');await page.screenshot({path:'tests/screenshots/finot-cp-mobile.png',fullPage:true});
await browser.close();
const out={...report,runtimeErrors:runtime,errorCount:report.errors.length+runtime.length};fs.writeFileSync('tests/pedagogy-browser-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(out.errorCount)process.exitCode=1;else console.log('PEDAGOGY_BROWSER_AUDIT_OK');
