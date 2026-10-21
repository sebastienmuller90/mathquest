import * as playwright from 'playwright';
// Moteur choisi par la CI (matrice chromium / firefox / webkit) ; chromium par défaut.
const engine=playwright[process.env.MQ_BROWSER||'chromium'];
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173';
fs.mkdirSync('tests/screenshots',{recursive:true});
const browser=await engine.launch({headless:true});
const errors=[];const fail=m=>errors.push(m);

// ===== Application élève : interrogation uniquement sur le travail du jour =====
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const id='qa',p={version:3,active:id,profiles:{[id]:{name:'QA',avatar:'🦊',grade:'CP',subj:'p-maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}}}}};localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('ELÈVE pageerror: '+e.message));
await page.goto(base+'/index.html',{waitUntil:'load',timeout:120000});
await page.waitForFunction(()=>window.MQInterrogation&&window.MQQuestionRotation&&window.MQActivity&&typeof CHMAP!=='undefined',{timeout:60000});
const prep=await page.evaluate(()=>{
 const cp=Object.values(CHMAP).filter(c=>WMAP[c.id]?.lvl==='CP'&&typeof c.g==='function');if(cp.length<3)return {error:'moins de 3 chapitres CP'};
 const [a,b,old]=cp;S.studyLog=[];S.answerLog=[];S.lessons={};S.interrogations={active:null,history:[]};S.path=null;
 const now=Date.now(),y=now-864e5;S.studyLog.push({t:now,cid:a.id,kind:'lesson-open'},{t:now,cid:b.id,kind:'exercise-open'},{t:y,cid:old.id,kind:'old'});saveLocal();
 const before={xp:S.xp,coins:S.coins};const r=MQInterrogation.create(20,'qa');return {ok:r.ok,ids:[a.id,b.id],old:old.id,before,active:S.interrogations.active&&{n:S.interrogations.active.questions.length,cids:S.interrogations.active.questions.map(x=>x.cid)}};
});
if(prep.error)fail(prep.error);if(!prep.ok)fail('interrogation non créée');if(prep.active?.n!==20)fail('interrogation != 20 questions');if(prep.active?.cids.some(id=>!prep.ids.includes(id)))fail('une question sort du travail du jour');if(prep.active?.cids.includes(prep.old))fail('ancienne notion incluse dans l’interrogation');
await page.evaluate(()=>ACT.iqstart());if(!(await page.evaluate(()=>document.body.classList.contains('iq-mode'))))fail('mode interrogation non isolé');
const finotHidden=await page.evaluate(()=>{const f=document.querySelector('.finot-fab');return !f||getComputedStyle(f).display==='none';});if(!finotHidden)fail('Finot visible pendant interrogation');
for(let guard=0;guard<50;guard++){
 const st=await page.evaluate(()=>{const a=S.interrogations?.active;if(!a)return {done:true};const it=a.questions[a.i];if(!it)return {done:true};return {done:false,type:it.q.type,q:it.q};});if(st.done)break;
 if(st.type==='choice')await page.evaluate(ans=>ACT.iqpick(ans),st.q.ans);
 else if(st.type==='multi')await page.evaluate(vals=>{vals.forEach((v,i)=>document.getElementById('iqin'+i).value=String(v));ACT.iqvalid();},st.q.ans);
 else if(st.type==='order')await page.evaluate(q=>{const used=new Set(),sel=[];for(const want of String(q.ans).split(' ')){let ix=q.tokens.findIndex((t,i)=>!used.has(i)&&t===want);if(ix<0)ix=q.tokens.findIndex((t,i)=>!used.has(i));used.add(ix);sel.push(ix);}S.interrogations.active.questions[S.interrogations.active.i].q._sel=sel;ACT.iqvalid();},st.q);
 else {const v=st.type==='frac'?`${st.q.ans[0]}/${st.q.ans[1]}`:st.type==='text'?(st.q.acc?.[0]??st.q.ans):st.q.ans;await page.evaluate(v=>{document.getElementById('iqin0').value=String(v);ACT.iqvalid();},v);}
}
await page.waitForTimeout(50);
const end=await page.evaluate(()=>({xp:S.xp,coins:S.coins,active:S.interrogations?.active,hist:S.interrogations?.history?.[0],iqMode:document.body.classList.contains('iq-mode'),activity:(S.activityLog||[]).filter(x=>x.kind==='interrogation').at(-1)}));
if(end.active)fail('interrogation encore active après toutes les réponses');if(end.hist?.score!==100)fail('score final attendu 100%');if(end.xp!==prep.before.xp||end.coins!==prep.before.coins)fail('l’interrogation a attribué XP ou pièces');if(end.iqMode)fail('mode interrogation non quitté');if(!end.activity)fail('séance interrogation non journalisée');
await page.screenshot({path:'tests/screenshots/interrogation-finished-mobile.png',fullPage:true});
const empty=await page.evaluate(()=>{S.studyLog=[];S.answerLog=[];S.lessons={};S.path=null;S.interrogations.active=null;return MQInterrogation.create(10,'qa-empty');});if(empty.ok||empty.reason!=='no-study-today')fail('interrogation créée sans travail du jour');await ctx.close();

// ===== Page parent distante : tableau de bord + ordre d’interrogation =====
const pctx=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),pp=await pctx.newPage();pp.on('pageerror',e=>fail('PARENT pageerror: '+e.message));
const now=Date.now();let sent=null;const mock={data:{name:'QA',avatar:'🦊',grade:'CP',xp:100,totalQ:0,totalOk:0,time:900,chap:{},lessons:{},answerLog:[],studyLog:[],activityLog:[],interrogations:{active:null,history:[]},merit:{pts:0,req:[],rewards:[],hist:[],rules:{}},sync:{}},pending:[],updated_at:new Date().toISOString()};
await pp.route('https://nctmxxixugoxairmtjsa.supabase.co/rest/v1/rpc/**',async route=>{const url=route.request().url(),body=JSON.parse(route.request().postData()||'{}');if(url.endsWith('/mq_get'))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(mock)});if(url.endsWith('/mq_act')){sent=body;mock.pending=[{kind:body.p_kind,payload:body.p_payload}];return route.fulfill({status:200,contentType:'application/json',body:'null'});}return route.fulfill({status:200,contentType:'application/json',body:'null'});});
await pp.goto(base+'/parent.html#abcdefghijklmnopqrstuvwxyz1234',{waitUntil:'load',timeout:120000});await pp.waitForFunction(()=>document.querySelector('.dash')&&document.querySelector('.parent-iq'),{timeout:30000});
const real=await pp.evaluate(()=>{const cp=(typeof ALLCH!=='undefined'?ALLCH:[]).filter(c=>WMAP[c.id]?.lvl==='CP');const ma=cp.find(c=>sOf(WMAP[c.id].id).id==='p-maths')||cp[0],fr=cp.find(c=>sOf(WMAP[c.id].id).id==='p-francais'&&c.id!==ma?.id)||cp.find(c=>c.id!==ma?.id);return {ma:ma?.id,fr:fr?.id};});
if(!real.ma||!real.fr)fail('chapitres CP réels introuvables dans parent.html');
mock.data.totalQ=2;mock.data.totalOk=1;mock.data.lessons={[real.fr]:now};mock.data.answerLog=[{t:now,cid:real.ma,ok:true,source:'practice',ms:20000},{t:now,cid:real.fr,ok:false,source:'lesson',ms:30000}];mock.data.studyLog=[{t:now,cid:real.ma,kind:'exercise-open'},{t:now,cid:real.fr,kind:'lesson-open'}];mock.data.activityLog=[{id:'a1',t0:now-180000,t1:now-60000,ms:120000,kind:'exercise',ids:[real.ma],grade:'CP',subj:'p-maths'},{id:'a2',t0:now-60000,t1:now,ms:60000,kind:'lesson',ids:[real.fr],grade:'CP',subj:'p-francais'}];
await pp.evaluate(()=>refresh(true));await pp.waitForFunction(()=>document.querySelector('[data-a="iqremotecreate"]')&&document.querySelector('.dash-pie'),{timeout:10000});
const dash=await pp.evaluate(()=>({pie:!!document.querySelector('.dash-pie'),kpis:[...document.querySelectorAll('.dash-kpis .smart-card')].map(x=>x.innerText),iq:document.querySelector('.parent-iq')?.innerText||'',overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
if(!dash.pie)fail('diagramme circulaire parent absent');if(dash.kpis.length<6)fail('moins de 6 indicateurs parent');if(!dash.kpis.some(x=>/Exercices/.test(x))||!dash.kpis.some(x=>/Leçons/.test(x))||!dash.kpis.some(x=>/Programme validé/.test(x)))fail('KPI parent incomplets');if(!/travail du jour|aujourd’hui/i.test(dash.iq))fail('interrogation parent non limitée au jour');if(dash.overflow>3)fail('dashboard parent déborde horizontalement');
await pp.click('[data-a="dashperiod:today"]');await pp.waitForTimeout(50);if(!await pp.locator('.dash').count())fail('filtre Aujourd’hui casse le dashboard');await pp.click('[data-a="iqremotecreate"]');await pp.waitForTimeout(100);if(sent?.p_kind!=='interrogation'||sent?.p_payload?.scope!=='today')fail('ordre interrogation distante incorrect');
await pp.screenshot({path:'tests/screenshots/parent-dashboard.png',fullPage:true});await pctx.close();

await browser.close();const out={errorCount:errors.length,errors};fs.writeFileSync('tests/interrogation-dashboard-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;else console.log('INTERROGATION_DASHBOARD_AUDIT_OK');
