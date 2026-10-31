import * as playwright from 'playwright';
// Moteur choisi par la CI (matrice chromium / firefox / webkit) ; chromium par défaut.
const engine=playwright[process.env.MQ_BROWSER||'chromium'];
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],fail=m=>errors.push(m);
const browser=await engine.launch({headless:true});

// Élève : reprise fiable d'une interrogation + journalisation des exercices nivelés.
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{if(localStorage.getItem('mathquest_profiles_v2'))return;const id='reviewqa',p={version:3,active:id,profiles:{[id]:{name:'QA',avatar:'🦊',grade:'CP',subj:'p-maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}}}}};localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));});
let page=await ctx.newPage();page.on('pageerror',e=>fail('élève: '+e.message));await page.goto(base+'/index.html',{waitUntil:'load'});await page.waitForFunction(()=>window.MQInterrogation?.uiIsolation&&window.MQQuestionRotation?.generateSeeded&&window.MQActivity&&window.MQPedagogy);
const setup=await page.evaluate(()=>{const ch=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP'&&typeof c.g==='function');S.studyLog=[];S.answerLog=[];S.interrogations={active:null,history:[]};S.activityLog=[];MQInterrogation.markStudy(ch.id,'lesson-open');const r=MQInterrogation.create(10,'review');if(!r.ok)return {error:r.reason};ACT.iqstart();const a=S.interrogations.active,it=a.questions[a.i],before=JSON.stringify(it.q);saveLocal();return {cid:ch.id,seed:it.seed,before,index:a.i};});
if(setup.error)fail('création interrogation: '+setup.error);if(!setup.seed)fail('graine stable absente');
await page.reload({waitUntil:'load'});await page.waitForFunction(()=>window.MQInterrogation?.uiIsolation&&window.MQQuestionRotation?.generateSeeded);const resumed=await page.evaluate(()=>{const a=S.interrogations?.active;if(!a)return {error:'active absente'};ACT.iqstart();const it=S.interrogations.active.questions[S.interrogations.active.i];return {after:JSON.stringify(it.q),seed:it.seed,cid:it.cid};});
if(resumed.error)fail('reprise: '+resumed.error);if(resumed.after!==setup.before)fail('question différente/corrompue après rechargement');if(resumed.seed!==setup.seed)fail('graine modifiée après rechargement');
// Sort du contrôle puis vérifie qu'un exercice choisi par niveau crée bien les deux traces.
await page.evaluate(()=>{S.interrogations.active=null;document.body.classList.remove('iq-mode');CUR='home';home();S.studyLog=[];S.activityLog=[];const id=Object.values(CHMAP).find(c=>WMAP[c.id]?.lvl==='CP'&&typeof c.g==='function').id;ACT.start(id);ACT.startlevel(id+'|1');});
const tracked=await page.evaluate(()=>({study:(S.studyLog||[]).some(x=>x.kind==='exercise-open'),active:MQActivity.active()?.kind,forced:M?.forcedDifficulty}));
if(!tracked.study)fail('exercice nivelé absent de studyLog');if(tracked.active!=='exercise')fail('exercice nivelé absent du journal de séance');if(tracked.forced!==1)fail('niveau manuel non conservé');await ctx.close();

// Parent distant : un parcours d'hier ne doit jamais débloquer l'interrogation d'aujourd'hui.
const PARENT_SYNC_TEST={enabled:true,url:'https://finottest.supabase.co',key:'sb_publishable_TESTKEY123',schema:'api'};
const pctx=await browser.newContext({viewport:{width:1100,height:800},reducedMotion:'reduce'});await pctx.addInitScript(c=>{window.FINOT_REMOTE_SYNC=c;},PARENT_SYNC_TEST);const pp=await pctx.newPage();pp.on('pageerror',e=>fail('parent: '+e.message));
const d=new Date(Date.now()-864e5),pad=n=>String(n).padStart(2,'0'),yesterday=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const mock={data:{name:'QA',avatar:'🦊',grade:'CP',xp:0,totalQ:0,totalOk:0,time:0,chap:{},lessons:{},answerLog:[],studyLog:[],activityLog:[],path:{date:yesterday,steps:[{kind:'lesson',cid:'cp-fr-phrase',status:'done'},{kind:'exo',ids:['cp-fr-phrase'],status:'done'}]},interrogations:{active:null,history:[]},merit:{pts:0,req:[],rewards:[],hist:[],rules:{}},sync:{}},pending:[],updated_at:new Date().toISOString()};
await pp.route(PARENT_SYNC_TEST.url+'/rest/v1/rpc/**',async route=>{if(route.request().url().endsWith('/mq_get'))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(mock)});return route.fulfill({status:200,contentType:'application/json',body:'null'});});
await pp.goto(base+'/parent.html#abcdefghijklmnopqrstuvwxyz1234',{waitUntil:'load'});await pp.waitForFunction(()=>document.querySelector('.parent-iq')&&document.querySelector('.dash'));
const stale=await pp.evaluate(()=>({button:!!document.querySelector('[data-a="iqremotecreate"]'),iq:document.querySelector('.parent-iq')?.innerText||'',today:[...document.querySelectorAll('.dash h3')].find(x=>x.textContent.includes('Travail étudié'))?.nextElementSibling?.innerText||''}));
if(stale.button)fail('ancien parcours débloque encore une interrogation');if(!/rien|aucune/i.test(stale.iq))fail('parent n’indique pas l’absence de travail du jour');if(stale.today&&!/aucune/i.test(stale.today))fail('dashboard compte un ancien parcours comme travail du jour');await pctx.close();
await browser.close();
const out={errorCount:errors.length,errors};fs.writeFileSync('tests/review-findings-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;else console.log('REVIEW_FINDINGS_AUDIT_OK');
