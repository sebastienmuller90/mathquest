import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],warnings=[],fail=m=>errors.push(m);
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{if(localStorage.getItem('mathquest_profiles_v2'))return;const id='compqa',p={version:3,active:id,profiles:{[id]:{name:'CompQA',avatar:'🦊',grade:'CP',subj:'p-maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}},recent:{},chap:{},lessons:{},lessonScores:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},competencies:{}}}};localStorage.setItem('mathquest_profiles_v2',JSON.stringify(p));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('runtime: '+e.message));
await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQCompetency&&window.MQQuestionEnrichment&&window.MQAdaptivePath&&window.MQFinotCompetency&&window.MQCompetencyIntegration);
const report=await page.evaluate(()=>{
 const out={chapters:0,skillSets:0,enriched:0,primaryMath:null,path:null,parent:false,finotWeak:0,interrogationWeight:null,errors:[]};
 const ids=Object.keys(CHMAP);out.chapters=ids.length;
 for(const id of ids){
  const skills=MQCompetency.skillsForChapter(id);if(skills.length!==4||new Set(skills.map(x=>x.id)).size!==4)out.errors.push('skills:'+id);else out.skillSets++;
  let q;try{q=CHMAP[id].g(2);}catch(e){out.errors.push('gen:'+id+':'+e.message);continue;}
  if(q?._mq?.enriched&&q._mq.skillLabel&&q._mq.context&&q._mq.reflect)out.enriched++;else out.errors.push('enrich:'+id);
 }
 const pm=ids.find(id=>WMAP[id]?.lvl==='CP'&&(()=>{try{return sOf(WMAP[id].id).id==='p-maths'}catch{return false}})());
 if(pm){const kinds=MQCompetency.skillsForChapter(pm).map(x=>x.kind);out.primaryMath={id:pm,kinds};if(!kinds.includes('calculer')||!kinds.includes('raisonner'))out.errors.push('primary-alias');}
 // Crée une faiblesse nette dans un chapitre de maths CP.
 const mathIds=ids.filter(id=>WMAP[id]?.lvl==='CP'&&(()=>{try{return sOf(WMAP[id].id).id==='p-maths'}catch{return false}})()&&typeof CHMAP[id].g==='function');
 const weak=mathIds[0];if(weak){S.grade='CP';S.competencies={};S.recent={};S.chap={};S.lessons={};S.lessonScores={};S.review={};const q=CHMAP[weak].g(2),kind=MQCompetency.skillsForChapter(weak)[0].kind;for(let i=0;i<8;i++)MQCompetency.record(S,weak,false,{source:'practice',d:2,q,kind});for(const id of mathIds.slice(1,6)){const qq=CHMAP[id].g(2),kk=MQCompetency.skillsForChapter(id)[0].kind;for(let i=0;i<6;i++)MQCompetency.record(S,id,true,{source:'practice',d:2,q:qq,kind:kk});}
  const p=makeDailyPath(S,'2026-10-20','compqa'),mathStep=p?.steps?.find(x=>x.kind==='lesson'&&x.subj==='p-maths');out.path={weak,selected:mathStep?.cid||null,adaptive:p?.adaptive||false};if(!p?.adaptive)out.errors.push('path-not-adaptive');if(mathStep&&mathStep.cid!==weak)out.errors.push('path-weak-not-selected');
  out.finotWeak=MQFinotCompetency.weak(5).length;if(!out.finotWeak)out.errors.push('finot-no-weak');
 }
 // Une preuve d'interrogation doit peser plus qu'un entraînement ordinaire.
 if(pm){S.competencies={};S.competencyEvalSeen=[];S.interrogations={active:{id:'iqtest',i:1,questions:[{cid:pm,d:2,q:CHMAP[pm].g(2)}],answers:[{ok:true}]},history:[]};MQCompetencyIntegration.recordIQ({id:'iqtest',i:0,it:S.interrogations.active.questions[0]});const e=Object.values(S.competencies)[0];out.interrogationWeight=e?.recent?.[0]?.w||0;if(!(out.interrogationWeight>1))out.errors.push('interrogation-weight');}
 try{PARENT=true;parentScreen('suivi');out.parent=!!document.querySelector('.mqp');if(!out.parent)out.errors.push('parent-competencies-missing');}catch(e){out.errors.push('parent:'+e.message);}
 return out;
});
errors.push(...report.errors);await ctx.close();await browser.close();
const out={...report,errorCount:errors.length,errors,warnings};fs.writeFileSync('tests/competency-browser-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;else console.log('COMPETENCY_BROWSER_AUDIT_OK');
