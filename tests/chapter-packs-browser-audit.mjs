import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],fail=m=>errors.push(m);
const ids=['6p','fr6a','hg6o','pc6f'];
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:430,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const id='packqa',profile={name:'PackQA',avatar:'🦊',grade:'6e',subj:'maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}},recent:{},chap:{},lessons:{},lessonScores:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},competencies:{},xp:0,coins:0,totalQ:0,totalOk:0};localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:id,profiles:{[id]:profile}}));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('runtime:'+e.message));
await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQChapterPacks&&window.MQChapterPackIntegration&&window.MQPedagogicalWorkshop&&window.MQPedagogicalExercise&&window.MQFinotRemediation,{timeout:8000});

const audit=await page.evaluate(ids=>{
 const allowed=new Set(['source','reconstitution','synthese','simulation']);
 const out={packCount:Object.keys(MQChapterPacks.packs||{}).length,packs:{},genericWitness:null,errors:[]};
 for(const id of ids){
  const p=MQChapterPacks.packs?.[id],r={exists:!!p,levels:0,questions:0,answersHidden:true,provenance:null,lessonWorkshopCount:0,specific:false,exerciseSpecific:false,finotSpecific:false};
  if(!p){out.errors.push('missing-pack:'+id);out.packs[id]=r;continue;}
  r.provenance=p.provenance?.type||null;
  if(!allowed.has(r.provenance))out.errors.push('bad-provenance:'+id+':'+r.provenance);
  if(!Array.isArray(p.provenance?.refs)||!p.provenance.refs.length)out.errors.push('missing-refs:'+id);
  if(!p.competency||!p.object?.title||!p.object?.html||!p.exerciseContext||!p.transfer?.prompt)out.errors.push('incomplete-pack:'+id);
  if(/<script\b|\bon\w+\s*=/i.test(p.object?.html||''))out.errors.push('unsafe-object-html:'+id);
  for(const n of [1,2,3]){
   const l=p.levels?.[n],qs=Array.isArray(l?.questions)?l.questions:[];if(l)r.levels++;
   if(qs.length<2)out.errors.push('too-few-questions:'+id+':'+n);
   for(const q of qs){r.questions++;if(!q?.q||!q?.a||!q?.hint)out.errors.push('incomplete-question:'+id+':'+n);}
  }
  const w=MQPedagogicalWorkshop.build(id),steps=lessonSteps(id),ws=steps.filter(x=>x?.k==='mqworkshop');
  r.lessonWorkshopCount=ws.length;r.specific=w?.meta?.kind==='specific'&&/mq-specific-pack/.test(w?.h||'')&&ws.length===1&&/mq-specific-pack/.test(ws[0]?.h||'');
  if(!r.specific)out.errors.push('specific-workshop-missing:'+id);
  const rendered=(w?.h||'');
  for(const n of [1,2,3])for(const q of(p.levels?.[n]?.questions||[]))if(rendered.includes(String(q.a)))r.answersHidden=false;
  if(!r.answersHidden||/mq-answer|data-answer/i.test(rendered))out.errors.push('answer-leak:'+id);
  const generated=CHMAP[id].g(2);r.exerciseSpecific=generated?._mq?.applicationSource==='chapter-pack'&&generated._mq.application===p.exerciseContext;
  if(!r.exerciseSpecific)out.errors.push('specific-exercise-context:'+id);
  const tip=MQFinotRemediation.tipFor({cid:id,q:generated});r.finotSpecific=Array.isArray(tip)&&tip[0]===p.misconception?.[0]&&tip[1]===p.misconception?.[1];
  if(!r.finotSpecific)out.errors.push('specific-finot:'+id);
  out.packs[id]=r;
 }
 const witness=Object.keys(CHMAP).find(id=>typeof CHMAP[id]?.g==='function'&&!MQChapterPacks.packs?.[id]&&MQPedagogicalWorkshop.build(id)?.meta?.kind!=='specific');
 if(witness){const w=MQPedagogicalWorkshop.build(witness),st=lessonSteps(witness);out.genericWitness={id:witness,kind:w?.meta?.kind||null,oneWorkshop:st.filter(x=>x?.k==='mqworkshop').length===1,specific:/mq-specific-pack/.test(w?.h||'')};}
 else out.errors.push('missing-generic-witness');
 return out;
},ids);
if(audit.packCount!==4)fail('unexpected-pack-count:'+audit.packCount);
if(audit.errors.length)errors.push(...audit.errors);
if(!audit.genericWitness||!audit.genericWitness.oneWorkshop||audit.genericWitness.specific)fail('generic-fallback-regression');

for(const id of ids){
 await page.evaluate(id=>openLesson(id),id);
 await page.waitForFunction(id=>typeof L!=='undefined'&&L?.steps?.some(x=>x.k==='mqworkshop'&&/mq-specific-pack/.test(x.h||'')),id);
 await page.evaluate(()=>{L.i=L.steps.findIndex(x=>x.k==='mqworkshop');renderLesson();});
 await page.waitForSelector(`.mq-specific-pack[data-chapter-pack="${id}"]`);
 const dom=await page.evaluate(()=>({levels:document.querySelectorAll('.mq-pack-level').length,prov:document.querySelector('.mq-pack-provenance')?.dataset?.provenance||'',transfer:!!document.querySelector('.mq-pack-transfer'),trap:!!document.querySelector('.mq-pack-misconception')}));
 if(dom.levels!==3||!dom.prov||!dom.transfer||!dom.trap)fail('dom-pack:'+id+':'+JSON.stringify(dom));
 if(id==='6p')await page.screenshot({path:'tests/screenshots/chapter-pack-6p.png',fullPage:true});
 await page.evaluate(()=>home());
}

await browser.close();
const report={audit,errorCount:errors.length,errors};
fs.writeFileSync('tests/chapter-packs-audit-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;else console.log('CHAPTER_PACKS_AUDIT_OK');