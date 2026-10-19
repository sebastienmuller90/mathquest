import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173';
fs.mkdirSync('tests/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1280,height:820},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const p={version:3,active:'pedqa',profiles:{pedqa:{name:'Petit Test',avatar:'🦊',grade:'CP',subj:'francais',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}}}}};localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));});
const page=await ctx.newPage(),runtime=[];page.on('pageerror',e=>runtime.push('PAGE '+e.message));page.on('console',m=>{if(m.type()==='error')runtime.push('CONSOLE '+m.text())});
await page.goto(base+'/index.html',{waitUntil:'load',timeout:120000});
await page.waitForFunction(()=>window.MQPedagogy&&typeof CHMAP!=='undefined'&&Object.keys(CHMAP).length>1000,{timeout:60000});
const report=await page.evaluate(()=>{
 const o={chapters:0,pickers:0,easy:0,medium:0,hard:0,finotChecks:0,errors:[],warnings:[]};
 const fail=(id,e)=>o.errors.push(id+': '+(e?.message||e));
 const invalid=el=>/\bundefined\b|\bNaN\b|\[object Object\]/.test(el?.innerText||'');
 for(const ch of Object.values(CHMAP)){
  o.chapters++;
  try{
   ACT.lesson(ch.id);const cards=[...document.querySelectorAll('.mq-level-card')];if(cards.length!==3)throw Error('sélecteur leçon != 3 niveaux');if(invalid(document.getElementById('app')))throw Error('sélecteur invalide');o.pickers++;
   for(const d of [1,2,3]){
    MQPedagogy.openLessonAtLevel(ch.id,d);if(!L||L.id!==ch.id)throw Error('L absente niveau '+d);if(L.lessonLevel!==d||L.quizDifficulty!==d)throw Error('niveau non conservé '+d);if(!Array.isArray(L.steps)||!L.steps.length)throw Error('aucune étape niveau '+d);
    const ks=L.steps.map(x=>x.k);if(d===1&&!ks.includes('mqeasy'))throw Error('version facile sans guidage');if(d===2&&(ks.includes('mqeasy')||ks.includes('mqhard')))throw Error('version moyenne altérée');if(d===3&&!ks.includes('mqhard'))throw Error('version difficile sans approfondissement');
    const special=d===1?L.steps.findIndex(x=>x.k==='mqeasy'):d===3?L.steps.findIndex(x=>x.k==='mqhard'):0;L.i=Math.max(0,special);L.q=null;L.pq=null;L.locked=false;renderLesson();const card=document.querySelector('.lcard');if(!card||!card.innerText.trim()||invalid(card))throw Error('rendu invalide niveau '+d);const badge=card.querySelector('.mq-level-badge');if(!badge||!badge.textContent.includes(MQPedagogy.levels[d].name))throw Error('badge niveau absent '+d);
    if(d===1)o.easy++;else if(d===2)o.medium++;else o.hard++;
   }
   ACT.start(ch.id);if(document.querySelectorAll('.mq-level-card').length!==3)throw Error('sélecteur exercice != 3 niveaux');
  }catch(e){fail(ch.id,e)}
 }
 // Finot jeune enfant : utilisable sans clavier.
 try{
  const cp=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP');if(!cp)throw Error('chapitre CP introuvable');S.grade='CP';ensureSubj();MQPedagogy.openLessonAtLevel(cp.id,1);finotOpen();
  const box=document.getElementById('finotchat');if(!box?.classList.contains('young'))throw Error('mode jeune non activé');if(!box.querySelector('[data-a="finotvoice"]'))throw Error('bouton micro absent');if(box.querySelectorAll('.fch-chip.kid').length<4)throw Error('pas assez de grosses actions');o.finotChecks+=3;
  const n=FCHAT.msgs.length;finotAsk("j'ai pas compris");if(FCHAT.msgs.length<=n)throw Error('intention aide non traitée');if(!/simple|retenir|réflexe/i.test(FCHAT.msgs.at(-1)?.html||''))throw Error('réponse aide inattendue');o.finotChecks++;
  finotAsk('donne moi un indice');if(!/indice|regarde|réflexe|retenir/i.test(FCHAT.msgs.at(-1)?.html||''))throw Error('intention indice non traitée');o.finotChecks++;
  finotAsk('lis moi la question');o.finotChecks++;
  finotClose();
 }catch(e){fail('Finot CP',e)}
 return o;
});
// Captures + responsive du choix de niveau et de Finot.
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{S.grade='CP';ensureSubj();const id=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP').id;ACT.lesson(id)});let overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>3)runtime.push('RESPONSIVE picker mobile '+overflow+'px');await page.screenshot({path:'tests/screenshots/levels-mobile.png',fullPage:true});
await page.evaluate(()=>{const id=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP').id;MQPedagogy.openLessonAtLevel(id,1);finotOpen()});overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(overflow>3)runtime.push('RESPONSIVE Finot mobile '+overflow+'px');await page.screenshot({path:'tests/screenshots/finot-cp-mobile.png',fullPage:true});
await browser.close();
const out={...report,runtimeErrors:runtime,errorCount:report.errors.length+runtime.length};fs.writeFileSync('tests/pedagogy-browser-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(out.errorCount)process.exitCode=1;else console.log('PEDAGOGY_BROWSER_AUDIT_OK');
