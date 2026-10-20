import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],fail=m=>errors.push(m);
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const id='phase3qa',profile={name:'Phase3QA',avatar:'🦊',grade:'CP',subj:'p-maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}},recent:{},chap:{},lessons:{},lessonScores:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},competencies:{},xp:0,coins:0,totalQ:0,totalOk:0};localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:id,profiles:{[id]:profile}}));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('runtime:'+e.message));
await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQDiagnostic&&window.MQFinotError&&window.MQQuestionTransfer&&window.MQPathSkillFocus&&window.MQAgeUI&&window.MQCompetency);
await page.waitForTimeout(80);
const initial=await page.evaluate(()=>({age:document.body.dataset.mqAge,card:!!document.querySelector('.diag-home-card'),xp:S.xp||0,coins:S.coins||0,eligible:MQDiagnostic.eligible()}));
if(initial.age!=='young')fail('CP-age-not-young');if(!initial.card||!initial.eligible)fail('diagnostic-card-missing');
await page.evaluate(()=>ACT.diagstart());
for(let step=0;step<12;step++){
 await page.waitForSelector('.qcard');
 const acted=await page.evaluate(()=>{const choice=document.querySelector('[data-a^="diagpick:"]');if(choice){choice.click();return'choice';}const toks=[...document.querySelectorAll('[data-a^="diagtok:"]')];if(toks.length){toks.forEach(x=>x.click());document.querySelector('[data-a="diagvalid"]')?.click();return'order';}const ins=[...document.querySelectorAll('[id^="di"]')];if(ins.length){ins.forEach(x=>x.value='0');document.querySelector('[data-a="diagvalid"]')?.click();return'input';}return'';});
 if(!acted){fail('diagnostic-no-input-step-'+step);break;}await page.waitForTimeout(20);
}
await page.waitForFunction(()=>S.diagnostic?.completedAt||document.querySelector('[data-a="home"]'));
const diag=await page.evaluate(()=>({done:!!S.diagnostic?.completedAt,n:S.diagnostic?.answers?.length||0,xp:S.xp||0,coins:S.coins||0,comp:Object.keys(S.competencies||{}).length}));
if(!diag.done||diag.n!==12)fail('diagnostic-not-complete');if(diag.xp!==initial.xp||diag.coins!==initial.coins)fail('diagnostic-rewarded');if(!diag.comp)fail('diagnostic-no-competencies');
const transfer=await page.evaluate(()=>{const id=Object.keys(CHMAP).find(x=>WMAP[x]?.lvl==='CP'&&typeof CHMAP[x].g==='function'),q=CHMAP[id].g(2);return {id,transfer:q?._mq?.transfer||'',skill:q?._mq?.skillKind||''};});
if(!transfer.transfer)fail('transfer-missing');if(!transfer.skill)fail('transfer-skill-missing');
// Crée une faiblesse explicite et vérifie que le parcours peut l'annoter.
const focus=await page.evaluate(()=>{const id=Object.keys(CHMAP).find(x=>WMAP[x]?.lvl==='CP'&&typeof CHMAP[x].g==='function'),skill=MQCompetency.skillsForChapter(id)[0],q=CHMAP[id].g(1);for(let i=0;i<5;i++)MQCompetency.record(S,id,false,{source:'practice',d:1,q,kind:skill.kind});const f=MQPathSkillFocus.focusFor(id);const p={steps:[{kind:'lesson',cid:id,subj:sOf(WMAP[id].id).id,status:'next',score:null,ms:0}],date:dstr(Date.now())};MQPathSkillFocus.ensureFocus(p);return {id,focus:f,stored:p.skillFocus?.[id]||null};});
if(!focus.focus||!focus.stored)fail('path-skill-focus-missing');
// Provoque une erreur standard et vérifie l'analyse Finot.
await page.evaluate(()=>{const id=Object.keys(CHMAP).find(x=>WMAP[x]?.lvl==='CP'&&typeof CHMAP[x].g==='function');startMission([id]);});
await page.waitForSelector('.qcard');
await page.evaluate(()=>{const q=M.q;if(q.type==='choice'){let wrong=0;if(wrong===q.ans)wrong=(wrong+1)%q.choices.length;validate(wrong);}else if(q.type==='order'){q._sel=(q.tokens||[]).map((_,i)=>i).reverse();validate();}else if(q.type==='multi'){document.querySelectorAll('.ans input').forEach(x=>x.value='999999');validate();}else{const x=document.getElementById('in0');if(x)x.value='999999';validate();}});
await page.waitForTimeout(50);
const finot=await page.evaluate(()=>({last:!!MQFinotError.last,button:!!document.querySelector('[data-a="finotwhy"]')}));if(!finot.last)fail('finot-error-not-captured');if(!finot.button)fail('finot-why-button-missing');
// L'interface doit changer de densité avec la classe.
const age=await page.evaluate(()=>{S.grade='3e';MQAgeUI.apply();return document.body.dataset.mqAge;});if(age!=='teen')fail('3e-age-not-teen');
await browser.close();
const out={initial,diag,transfer,focus,finot,teenAge:age,errorCount:errors.length,errors};fs.writeFileSync('tests/phase3-browser-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;else console.log('PHASE3_BROWSER_AUDIT_OK');