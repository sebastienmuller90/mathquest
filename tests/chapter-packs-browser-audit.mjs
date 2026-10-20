import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],fail=m=>errors.push(m);
const ids=['6p','fr6a','hg6o','pc6f','6g','fr6j','svt6a','hg6s'];
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:430,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const id='packqa',profile={name:'PackQA',avatar:'🦊',grade:'6e',subj:'maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}},recent:{},chap:{},lessons:{},lessonScores:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},competencies:{},xp:0,coins:0,totalQ:0,totalOk:0};localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:id,profiles:{[id]:profile}}));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('runtime:'+e.message));
await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQChapterPacks&&window.MQChapterPackIntegration&&window.MQPedagogicalWorkshop&&window.MQPedagogicalExercise&&window.MQFinotRemediation,{timeout:8000});

const audit=await page.evaluate(ids=>{
 const allowed=new Set(['source','creation','reconstitution','synthese','simulation']);
 const out={packCount:Object.keys(MQChapterPacks.packs||{}).length,version:MQChapterPacks.version,packs:{},semantic:{},genericWitness:null,errors:[]};
 for(const id of ids){
  const p=MQChapterPacks.packs?.[id],r={exists:!!p,levels:0,questions:0,answersHidden:true,provenance:null,lessonWorkshopCount:0,specific:false,exerciseRouting:false,finotRouting:false};
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
  const probeQ=p.levels?.[1]?.questions?.[0],saved=probeQ?.a,sentinel='__MQ_PRIVATE_ANSWER_'+id+'__';
  if(probeQ){probeQ.a=sentinel;const probeHtml=MQChapterPackIntegration.buildSpecific(id)?.h||'';r.answersHidden=!probeHtml.includes(sentinel)&&!/mq-pack-answer|data-answer/i.test(probeHtml);probeQ.a=saved;}
  if(!r.answersHidden)out.errors.push('answer-leak:'+id);
  const generated=CHMAP[id].g(2),applies=typeof MQChapterPacks.matchesQuestion==='function'?MQChapterPacks.matchesQuestion(p,generated):true;
  const specificContext=generated?._mq?.applicationSource==='chapter-pack'&&generated._mq.application===p.exerciseContext;
  r.exerciseRouting=applies?specificContext:generated?._mq?.applicationSource==='generic';
  if(!r.exerciseRouting)out.errors.push('exercise-context-routing:'+id+':'+(applies?'specific':'generic'));
  const tip=MQFinotRemediation.tipFor({cid:id,q:generated}),isSpecificTip=Array.isArray(tip)&&tip[0]===p.misconception?.[0]&&tip[1]===p.misconception?.[1];
  r.finotRouting=applies?isSpecificTip:!isSpecificTip;
  if(!r.finotRouting)out.errors.push('finot-routing:'+id+':'+(applies?'specific':'generic'));
  out.packs[id]=r;
 }
 const allText=id=>{const p=MQChapterPacks.packs?.[id]||{},qs=Object.values(p.levels||{}).flatMap(x=>x.questions||[]);return [p.competency,p.object?.title,p.object?.html,p.exerciseContext,p.transfer?.prompt,...qs.flatMap(x=>[x.q,x.hint])].join(' ').toLowerCase();};
 out.semantic.fractions=/partage/.test(allText('6g'))&&/quotient/.test(allText('6g'))&&/7\/4/.test(allText('6g'));
 out.semantic.natureFunction=/nature/.test(allText('fr6j'))&&/fonction/.test(allText('fr6j'))&&/sujet/.test(allText('fr6j'))&&/cod/.test(allText('fr6j'));
 out.semantic.nutrition=/protéin|protein/.test(allText('svt6a'))&&/énergie|energie/.test(allText('svt6a'))&&/conseil alimentaire personnalisé|conseil alimentaire personnalise/.test(allText('svt6a'));
 out.semantic.constraints=/contrainte/.test(allText('hg6s'))&&/adaptation/.test(allText('hg6s'))&&/fictif|imaginaire/.test(allText('hg6s'));
 const witness=Object.keys(CHMAP).find(id=>typeof CHMAP[id]?.g==='function'&&!MQChapterPacks.packs?.[id]&&MQPedagogicalWorkshop.build(id)?.meta?.kind!=='specific');
 if(witness){const w=MQPedagogicalWorkshop.build(witness),st=lessonSteps(witness);out.genericWitness={id:witness,kind:w?.meta?.kind||null,oneWorkshop:st.filter(x=>x?.k==='mqworkshop').length===1,specific:/mq-specific-pack/.test(w?.h||'')};}
 else out.errors.push('missing-generic-witness');
 return out;
},ids);
if(audit.packCount!==8)fail('unexpected-pack-count:'+audit.packCount);
if(audit.version!=='1.3')fail('unexpected-pack-version:'+audit.version);
if(audit.errors.length)errors.push(...audit.errors);
for(const [name,ok] of Object.entries(audit.semantic))if(!ok)fail('semantic-pack-check:'+name);
if(!audit.genericWitness||!audit.genericWitness.oneWorkshop||audit.genericWitness.specific)fail('generic-fallback-regression');

const svtRouting=await page.evaluate(()=>{
 const pack=MQChapterPacks.packs.svt6a;
 const nutrition={q:'Quel est le rôle principal des protéines dans les aliments ?'};
 const fermentation={q:'Quel micro-organisme fait lever la pâte à pain ?'};
 const nutritionMatch=MQChapterPacks.matchesQuestion(pack,nutrition),fermentationMatch=MQChapterPacks.matchesQuestion(pack,fermentation);
 MQPedagogicalExercise.decorate('svt6a',nutrition);MQPedagogicalExercise.decorate('svt6a',fermentation);
 const nt=MQFinotRemediation.tipFor({cid:'svt6a',q:nutrition}),ft=MQFinotRemediation.tipFor({cid:'svt6a',q:fermentation});
 const nutritionTipSpecific=Array.isArray(nt)&&nt[0]===pack.misconception[0]&&nt[1]===pack.misconception[1];
 const fermentationTipSpecific=Array.isArray(ft)&&ft[0]===pack.misconception[0]&&ft[1]===pack.misconception[1];
 return{nutritionMatch,fermentationMatch,nutritionSource:nutrition._mq?.applicationSource,fermentationSource:fermentation._mq?.applicationSource,nutritionTipSpecific,fermentationTipSpecific};
});
if(!svtRouting.nutritionMatch||svtRouting.fermentationMatch||svtRouting.nutritionSource!=='chapter-pack'||svtRouting.fermentationSource!=='generic'||!svtRouting.nutritionTipSpecific||svtRouting.fermentationTipSpecific)fail('svt-question-scope-routing:'+JSON.stringify(svtRouting));

const frRouting=await page.evaluate(()=>{
 const pack=MQChapterPacks.packs.fr6a;
 const expressive={q:'Comment lire cette réplique avec expressivité ? Le personnage murmure puis s’exclame.'};
 const numeric={q:'Un élève lit correctement 195 mots en 1 min 30 s. Quelle est sa vitesse de lecture, en mots par minute ?'};
 const expressiveMatch=MQChapterPacks.matchesQuestion(pack,expressive),numericMatch=MQChapterPacks.matchesQuestion(pack,numeric);
 MQPedagogicalExercise.decorate('fr6a',expressive);MQPedagogicalExercise.decorate('fr6a',numeric);
 const et=MQFinotRemediation.tipFor({cid:'fr6a',q:expressive}),nt=MQFinotRemediation.tipFor({cid:'fr6a',q:numeric});
 const expressiveTipSpecific=Array.isArray(et)&&et[0]===pack.misconception[0]&&et[1]===pack.misconception[1];
 const numericTipSpecific=Array.isArray(nt)&&nt[0]===pack.misconception[0]&&nt[1]===pack.misconception[1];
 return{expressiveMatch,numericMatch,expressiveSource:expressive._mq?.applicationSource,numericSource:numeric._mq?.applicationSource,expressiveTipSpecific,numericTipSpecific};
});
if(!frRouting.expressiveMatch||frRouting.numericMatch||frRouting.expressiveSource!=='chapter-pack'||frRouting.numericSource!=='generic'||!frRouting.expressiveTipSpecific||frRouting.numericTipSpecific)fail('fr6a-question-scope-routing:'+JSON.stringify(frRouting));

for(const id of ids){
 await page.evaluate(id=>openLesson(id),id);
 await page.waitForFunction(id=>typeof L!=='undefined'&&L?.steps?.some(x=>x.k==='mqworkshop'&&/mq-specific-pack/.test(x.h||'')),id);
 await page.evaluate(()=>{L.i=L.steps.findIndex(x=>x.k==='mqworkshop');renderLesson();});
 await page.waitForSelector(`.mq-specific-pack[data-chapter-pack="${id}"]`);
 const dom=await page.evaluate(()=>({levels:document.querySelectorAll('.mq-pack-level').length,prov:document.querySelector('.mq-pack-provenance')?.dataset?.provenance||'',transfer:!!document.querySelector('.mq-pack-transfer'),trap:!!document.querySelector('.mq-pack-misconception')}));
 if(dom.levels!==3||!dom.prov||!dom.transfer||!dom.trap)fail('dom-pack:'+id+':'+JSON.stringify(dom));
 if(id==='6p'||id==='6g'||id==='hg6s')await page.screenshot({path:`tests/screenshots/chapter-pack-${id}.png`,fullPage:true});
 await page.evaluate(()=>home());
}

await browser.close();
const report={audit,svtRouting,frRouting,errorCount:errors.length,errors};
fs.writeFileSync('tests/chapter-packs-audit-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;else console.log('CHAPTER_PACKS_AUDIT_OK');