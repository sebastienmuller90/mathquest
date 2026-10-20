import { chromium } from 'playwright';
import fs from 'node:fs';

const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173';
fs.mkdirSync('tests/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{
 const p={version:3,active:'qa',profiles:{qa:{name:'Audit QA',avatar:'🦊',grade:'6e',subj:'maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}}}}};
 localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));
});
const page=await ctx.newPage();
const errors=[];
page.on('pageerror',e=>errors.push('PAGE: '+e.message));
page.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE: '+m.text())});
await page.goto(base+'/index.html',{waitUntil:'load',timeout:120000});
await page.waitForFunction(()=>document.querySelector('#app')?.textContent?.trim().length>10,{timeout:60000});
await page.waitForFunction(()=>typeof ACT!=='undefined'&&typeof CHMAP!=='undefined'&&Object.keys(CHMAP).length>1000,{timeout:60000});
// Points d'extension (js/app-hooks.js) chargés statiquement : les abonnements sont actifs dès le chargement.
await page.waitForFunction(()=>window.MQHooks&&MQHooks.has('answer:after','question-transfer'),{timeout:15000});

const result=await page.evaluate(async()=>{
 const out={chapters:0,worlds:0,lessonSteps:0,grades:{},screens:0,lexCats:0,pathBuilds:0,errors:[],warnings:[]};
 const fail=(where,e)=>out.errors.push(where+': '+(e?.message||e));
 const bad=()=>/\bundefined\b|\bNaN\b|\[object Object\]/.test((document.getElementById('app')?.innerText||''));
 const assertScreen=name=>{out.screens++;const a=document.getElementById('app');if(!a||!a.innerText.trim())throw Error(name+' écran vide');if(bad())throw Error(name+' contient une valeur invalide');};
 // Tous les niveaux : matière visible, accueil, parcours valide sur plusieurs dates/graines.
 for(const g of ['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'])try{
   S.grade=g;S.path=null;ensureSubj();applyStage();home();assertScreen('home '+g);
   const vs=visibleSubjects(g);if(!vs.length)throw Error('aucune matière visible');
   let paths=0;for(let i=0;i<20;i++){const d='2026-10-'+String((i%28)+1).padStart(2,'0'),p=makeDailyPath(S,d,'qa-'+g+'-'+i);if(!p||p.steps.length!==6)throw Error('parcours invalide');const lessons=p.steps.slice(0,4);if(lessons.some(s=>WMAP[s.cid]?.lvl!==g))throw Error('parcours contient une autre classe');if(new Set(lessons.map(s=>s.cid)).size<Math.min(4,lessons.length))out.warnings.push('Parcours '+g+' avec chapitre répété');paths++;}out.pathBuilds+=paths;out.grades[g]={subjects:vs.length};
 }catch(e){fail('grade '+g,e)}
 // Tous les mondes et leurs listes de cours.
 for(const w of WALL)try{worldScreen(w.id);assertScreen('world '+w.id);coursesScreen(w.id);assertScreen('courses '+w.id);out.worlds++;}catch(e){fail('world '+w.id,e)}
 // Toutes les fiches + 100 % des leçons et de leurs étapes dans le vrai DOM.
 for(const ch of Object.values(CHMAP)){
   out.chapters++;
   try{fiche(ch.id);assertScreen('fiche '+ch.id);}catch(e){fail('fiche '+ch.id,e);continue}
   try{
     openLesson(ch.id);if(!L||L.id!==ch.id||!Array.isArray(L.steps)||!L.steps.length)throw Error('L non initialisée');
     for(let i=0;i<L.steps.length;i++){
       L.i=i;L.exn=1;L.q=null;L.pq=null;L.rq=null;L.rSession=null;L.rResults=[];L.locked=false;
       renderLesson();out.lessonSteps++;const card=document.querySelector('.lcard');if(!card||!card.innerText.trim())throw Error('étape '+i+' vide ('+L.steps[i].k+')');if(/\bundefined\b|\bNaN\b|\[object Object\]/.test(card.innerText))throw Error('étape '+i+' valeur invalide ('+L.steps[i].k+')');
     }
   }catch(e){fail('lesson '+ch.id,e)}
 }
 // Écrans globaux.
 const globals=[['home',()=>home()],['profiles',()=>profilesScreen()],['badges',()=>badgesScreen()],['rewards',()=>rewardsScreen()],['shop',()=>shop()],['flash',()=>flashMenu()],['mistakes',()=>mistakesScreen()],['review',()=>smartReviewScreen()],['path',()=>{S.grade='6e';S.path=null;ensureSubj();pathScreen()}]];
 for(const [n,f] of globals)try{f();assertScreen(n)}catch(e){fail('screen '+n,e)}
 // Parent local : lecture seule des onglets principaux.
 try{PARENT=true;for(const tab of ['suivi','recomp','reglages']){parentScreen(tab);assertScreen('parent '+tab)}PARENT=false}catch(e){fail('parent local',e)}
 // Lexique : toutes catégories réellement affichables.
 try{for(const s of SUBJECTS.filter(x=>x.id==='anglais'||x.id==='italien'))for(const w of s.worlds){const lang=w.id.startsWith('it')?'it':'en',lc=LEX[lang];if(!lc)continue;lexiconScreen(w.id);assertScreen('lexicon '+w.id);for(const cat of Object.keys(lc.cats)){lexiconScreen(w.id,cat);assertScreen('lexcat '+lang+' '+cat);out.lexCats++;}}}catch(e){fail('lexicon',e)}
 // Le patch de ponctuation doit être actif dans le vrai runtime.
 try{const r=MQDictation.analyze('Je mange, puis je pars.','Je mange puis, je pars.');if(r.perfect||!r.errors.some(e=>e.type==='ponctuation'))throw Error('ponctuation déplacée acceptée');}catch(e){fail('dictation runtime',e)}
 // Sauvegarde/relecture locale de l'état courant.
 try{S.name='Audit Persist';S.grade='CM2';if(saveLocal()===false)throw Error('saveLocal false');const db=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));if(db.profiles[db.active].name!=='Audit Persist'||db.profiles[db.active].grade!=='CM2')throw Error('état non persisté')}catch(e){fail('persistence',e)}
 return out;
});

await page.setViewportSize({width:1440,height:900});await page.evaluate(()=>{S.grade='6e';ensureSubj();home()});await page.screenshot({path:'tests/screenshots/home-desktop.png',fullPage:true});
await page.evaluate(()=>{S.grade='CP';ensureSubj();home()});await page.screenshot({path:'tests/screenshots/home-cp-desktop.png',fullPage:true});
await page.evaluate(()=>{S.grade='6e';S.path=null;ensureSubj();pathScreen()});await page.screenshot({path:'tests/screenshots/path-desktop.png',fullPage:true});
await page.evaluate(()=>{const id=Object.keys(CHMAP).find(x=>WMAP[x]?.lvl==='6e');openLesson(id)});await page.screenshot({path:'tests/screenshots/lesson-desktop.png',fullPage:true});
// Responsive sur écrans clés.
for(const [name,w,h] of [['mobile',390,844],['tablet',768,1024],['desktop',1440,900]]){
 await page.setViewportSize({width:w,height:h});
 for(const [screen,fn] of [['home',()=>page.evaluate(()=>home())],['path',()=>page.evaluate(()=>{S.path=null;pathScreen()})]]){await fn();const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>3)errors.push(`RESPONSIVE ${name}/${screen}: débordement horizontal ${overflow}px`);}
 if(name==='mobile')await page.screenshot({path:'tests/screenshots/home-mobile.png',fullPage:true});
}
// Page parent distante sans identifiant : elle doit au minimum se charger sans exception JS.
const parent=await ctx.newPage();parent.on('pageerror',e=>errors.push('PARENT PAGE: '+e.message));parent.on('console',m=>{if(m.type()==='error')errors.push('PARENT CONSOLE: '+m.text())});await parent.goto(base+'/parent.html',{waitUntil:'load',timeout:120000});await parent.waitForTimeout(500);if(!(await parent.locator('body').innerText()).trim())errors.push('PARENT: page vide');await parent.screenshot({path:'tests/screenshots/parent-desktop.png',fullPage:true});
// Offline PWA : après installation SW, la page doit se recharger depuis le cache.
await page.bringToFront();await page.setViewportSize({width:390,height:844});await page.goto(base+'/index.html',{waitUntil:'load'});const swReady=await page.evaluate(async()=>{if(!('serviceWorker'in navigator))return false;try{await navigator.serviceWorker.ready;return true}catch{return false}});if(!swReady)errors.push('PWA: service worker non prêt');else{await page.reload({waitUntil:'load'});await ctx.setOffline(true);try{await page.reload({waitUntil:'domcontentloaded',timeout:30000});if(!(await page.locator('#app').innerText()).trim())errors.push('PWA: application vide hors ligne')}catch(e){errors.push('PWA offline reload: '+e.message)}finally{await ctx.setOffline(false)}}
await browser.close();
const report={...result,browserErrors:errors,errorCount:result.errors.length+errors.length};fs.writeFileSync('tests/browser-audit-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.errorCount)process.exitCode=1;else console.log('BROWSER_AUDIT_OK');
