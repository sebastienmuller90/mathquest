import * as playwright from 'playwright';
// Moteur choisi par la CI (matrice chromium / firefox / webkit) ; chromium par défaut.
const engine=playwright[process.env.MQ_BROWSER||'chromium'];
import fs from 'node:fs';
const base=process.env.MQ_BASE_URL||'http://127.0.0.1:4173',errors=[],warnings=[],fail=m=>errors.push(m);
const browser=await engine.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:430,height:900},reducedMotion:'reduce'});
await ctx.addInitScript(()=>{const id='phase4qa',profile={name:'Phase4QA',avatar:'🦊',grade:'6e',subj:'maths',sound:false,dailyGoal:20,sync:{child:'',parent:''},tts:{auto:false,rate:1,voices:{}},recent:{},chap:{},lessons:{},lessonScores:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},competencies:{},xp:0,coins:0,totalQ:0,totalOk:0};localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:id,profiles:{[id]:profile}}));});
const page=await ctx.newPage();page.on('pageerror',e=>fail('runtime:'+e.message));
await page.goto(base+'/index.html',{waitUntil:'load'});
await page.waitForFunction(()=>window.MQPedagogyBanks&&window.MQPedagogicalWorkshop&&window.MQPedagogicalExercise&&window.MQFinotRemediation&&window.MQQuestionTransfer&&window.MQCompetency,{timeout:8000});
await page.waitForFunction(()=>MQFinotRemediation.hookActive,{timeout:5000});

const coverage=await page.evaluate(()=>{
 const out={chapters:0,workshops:0,contexts:0,remediations:0,dataContextualized:0,dataAligned:0,dataNoAnswerLeak:0,kinds:{},subjects:{},topics:{},special:{mathFunction:0,pcSpeed:0},regressionCases:{},errors:[]};
 const expected=(s,txt)=>{
  const m=re=>re.test(txt);
  if(s==='maths'){
   if(m(/\b(?:fonction(?:s)?|affine(?:s)?|lineaire(?:s)?)\b/))return'function';
   if(m(/\b(?:moyenne|moyennes|statistique|statistiques|diagramme|diagrammes|graphique|graphiques|donnee|donnees|tableau|tableaux)\b/))return'statistics';
   if(m(/\b(?:pourcentage|pourcentages|proportion|proportions|proportionnalite|frequence|frequences)\b/))return'proportion';
   if(m(/\b(?:vitesse|vitesses)\b/))return'speed';
   if(m(/\b(?:duree|durees|horaire|horaires|temps)\b/))return'time';
  }
  if(s==='hg'){
   if(m(/\b(?:climat|climats|temperature|temperatures|precipitation|precipitations)\b/))return'climate';
   if(m(/\b(?:population|populations|demographie|demographique|demographiques)\b/))return'population';
  }
  if(s==='svt'){
   if(m(/\b(?:temperature|temperatures|thermique|thermiques)\b/))return'temperature';
   if(m(/\b(?:population|populations|effectif|effectifs|frequence|frequences)\b/))return'population';
   if(m(/\b(?:croissance|grandissement)\b/))return'growth';
  }
  if(s==='pc'){
   if(m(/\b(?:vitesse|vitesses|mouvement|mouvements)\b/))return'speed';
   if(m(/\b(?:temperature|temperatures|thermique|thermiques)\b/))return'temperature';
   if(m(/\b(?:tension|tensions|volt|volts)\b/))return'voltage';
   if(m(/\b(?:intensite|intensites|ampere|amperes|courant|courants)\b/))return'current';
   if(m(/\bmasse(?:s)?\s+volumique(?:s)?\b/))return'density';
   if(m(/\b(?:masse|masses)\b/))return'mass';
   if(m(/\b(?:volume|volumes)\b/))return'volume';
  }
  if(s==='eps'){
   if(m(/\b(?:frequence cardiaque|pouls)\b/))return'heart-rate';
   if(m(/\b(?:performance|performances|chrono|chronometre|vitesse|vitesses)\b/))return'performance';
  }
  return null;
 };
 for(const [id,ch] of Object.entries(CHMAP)){
  if(typeof ch.g!=='function')continue;out.chapters++;
  try{
   const w=MQPedagogicalWorkshop.build(id);
   if(w?.k==='mqworkshop'&&w.h)out.workshops++;else out.errors.push('workshop:'+id);
   out.kinds[w?.meta?.kind||'missing']=(out.kinds[w?.meta?.kind||'missing']||0)+1;
   out.subjects[w?.meta?.subject||'missing']=(out.subjects[w?.meta?.subject||'missing']||0)+1;
   if(w?.meta?.kind==='data'){
    const spec=MQPedagogicalWorkshop.dataSpec(id),txt=MQPedagogicalWorkshop.notionText(id),s=w.meta.subject,exp=expected(s,txt),html=w.h||'';
    out.topics[spec?.topic||'missing']=(out.topics[spec?.topic||'missing']||0)+1;
    if(s==='maths'&&spec?.topic==='function')out.special.mathFunction++;
    if(s==='pc'&&spec?.topic==='speed')out.special.pcSpeed++;
    const meaningful=!!spec&&spec.context?.length>30&&spec.unit?.length>0&&Array.isArray(spec.labels)&&spec.labels.length===spec.values?.length&&Array.isArray(spec.questions)&&spec.questions.length>=3&&/mq-data-workshop/.test(html)&&!/\>A\<.*\>B\<.*\>C\<.*\>D\</s.test(html);
    if(meaningful)out.dataContextualized++;else out.errors.push('data-context:'+id);
    if(exp&&spec?.topic===exp)out.dataAligned++;else out.errors.push('data-topic:'+id+':'+(spec?.topic||'missing')+'!='+(exp||'none'));
    const leaks=(spec?.questions||[]).some(q=>/\(\s*[-+]?\d+(?:[.,]\d+)?/.test(q));if(!leaks)out.dataNoAnswerLeak++;else out.errors.push('data-answer-leak:'+id);
   }
   const steps=lessonSteps(id),n=steps.filter(x=>x.k==='mqworkshop').length;if(n!==1)out.errors.push('lesson-workshop:'+id+':'+n);
   // Règle de stabilisation : contexte spécifique au chapitre (pack, question dans son périmètre) ou ABSENT.
   const q=ch.g(2),pk=window.MQChapterPacks?.packs?.[id],ok=((p,q)=>!!p&&(typeof MQChapterPacks.matchesQuestion!=='function'||MQChapterPacks.matchesQuestion(p,q)))(pk,q)?q?._mq?.application===pk.exerciseContext:!q?._mq?.application;if(ok)out.contexts++;else out.errors.push('context:'+id);
   const tip=MQFinotRemediation.tipFor({cid:id,q});if(Array.isArray(tip)&&tip.length===2)out.remediations++;else out.errors.push('remediation:'+id);
  }catch(e){out.errors.push(id+':'+e.message);}
 }
 const specOf=id=>MQPedagogicalWorkshop.dataSpec(id);
 const generalCase=id=>{const x=specOf(id),d=Array.isArray(x?.values)?x.values.slice(1).map((v,i)=>v-x.values[i]):[];return{exists:!!CHMAP[id],name:CHMAP[id]?.name||'',topic:x?.topic||null,subtype:x?.subtype||null,nonConstant:d.length>1&&new Set(d).size>1};};
 const lin=specOf('3h'),aff=specOf('3i'),weighted=specOf('4j'),elementary=specOf('cp-ma-donnees'),density=specOf('pc5c');
 out.regressionCases.thales={exists:!!CHMAP['3o'],name:CHMAP['3o']?.name||'',topic:specOf('3o')?.topic||null,kind:MQPedagogicalWorkshop.kind('3o'),html:MQPedagogicalWorkshop.build('3o')?.h||''};
 out.regressionCases.relatives={exists:!!CHMAP['5b'],name:CHMAP['5b']?.name||'',topic:specOf('5b')?.topic||null,kind:MQPedagogicalWorkshop.kind('5b')};
 out.regressionCases.linearFunction={exists:!!CHMAP['3h'],name:CHMAP['3h']?.name||'',topic:lin?.topic||null,subtype:lin?.subtype||null,y0:Array.isArray(lin?.values)?lin.values[0]:null};
 out.regressionCases.affineFunction={exists:!!CHMAP['3i'],name:CHMAP['3i']?.name||'',topic:aff?.topic||null,subtype:aff?.subtype||null,y0:Array.isArray(aff?.values)?aff.values[0]:null};
 out.regressionCases.general3g=generalCase('3g');
 out.regressionCases.general4i=generalCase('4i');
 out.regressionCases.general5u=generalCase('5u');
 out.regressionCases.proportion4g={exists:!!CHMAP['4g'],name:CHMAP['4g']?.name||'',title:MQPedagogicalWorkshop.titleText('4g'),topic:specOf('4g')?.topic||null};
 out.regressionCases.proportion5t={exists:!!CHMAP['5t'],name:CHMAP['5t']?.name||'',title:MQPedagogicalWorkshop.titleText('5t'),topic:specOf('5t')?.topic||null};
 out.regressionCases.weighted4j={exists:!!CHMAP['4j'],name:CHMAP['4j']?.name||'',topic:weighted?.topic||null,subtype:weighted?.subtype||null,weights:Array.isArray(weighted?.weights)?weighted.weights.slice():[],values:Array.isArray(weighted?.values)?weighted.values.slice():[],weightRow:/mq-data-weights/.test(MQPedagogicalWorkshop.build('4j')?.h||'')};
 out.regressionCases.elementaryCp={exists:!!CHMAP['cp-ma-donnees'],name:CHMAP['cp-ma-donnees']?.name||'',grade:WMAP['cp-ma-donnees']?.lvl||'',topic:elementary?.topic||null,subtype:elementary?.subtype||null,values:Array.isArray(elementary?.values)?elementary.values.slice():[],questions:Array.isArray(elementary?.questions)?elementary.questions.slice():[]};
 out.regressionCases.density5c={exists:!!CHMAP['pc5c'],name:CHMAP['pc5c']?.name||'',topic:density?.topic||null,subtype:density?.subtype||null,values:Array.isArray(density?.values)?density.values.slice():[],secondary:Array.isArray(density?.secondary?.values)?density.secondary.values.slice():[],secondaryRow:/mq-data-secondary/.test(MQPedagogicalWorkshop.build('pc5c')?.h||''),questions:Array.isArray(density?.questions)?density.questions.slice():[]};
 out.regressionCases.pcSpeed={exists:!!CHMAP['pc6f'],name:CHMAP['pc6f']?.name||'',topic:specOf('pc6f')?.topic||null};
 return out;
});
if(coverage.chapters!==1129)fail('unexpected-chapter-count:'+coverage.chapters);
if(coverage.workshops!==coverage.chapters)fail('workshop-coverage:'+coverage.workshops+'/'+coverage.chapters);
if(coverage.contexts!==coverage.chapters)fail('exercise-context-coverage:'+coverage.contexts+'/'+coverage.chapters);
if(coverage.remediations!==coverage.chapters)fail('remediation-coverage:'+coverage.remediations+'/'+coverage.chapters);
if((coverage.kinds.data||0)!==coverage.dataContextualized)fail('data-contextualization:'+coverage.dataContextualized+'/'+(coverage.kinds.data||0));
if((coverage.kinds.data||0)!==coverage.dataAligned)fail('data-alignment:'+coverage.dataAligned+'/'+(coverage.kinds.data||0));
if((coverage.kinds.data||0)!==coverage.dataNoAnswerLeak)fail('data-answer-leak-count:'+coverage.dataNoAnswerLeak+'/'+(coverage.kinds.data||0));
if(!coverage.special.mathFunction)fail('no-maths-function-data-case');if(!coverage.special.pcSpeed)fail('no-pc-speed-data-case');
for(const [k,v] of Object.entries(coverage.regressionCases))if(!v.exists)fail('missing-regression-chapter:'+k);
if(coverage.regressionCases.thales.topic!==null||coverage.regressionCases.thales.kind!=='synthesis'||/Situation de transfert/.test(coverage.regressionCases.thales.html))fail('thales-must-use-synthesis');
if(coverage.regressionCases.relatives.topic!==null||coverage.regressionCases.relatives.kind==='data')fail('relatives-false-speed-classification');
if(coverage.regressionCases.linearFunction.topic!=='function'||coverage.regressionCases.linearFunction.subtype!=='linear'||coverage.regressionCases.linearFunction.y0!==0)fail('linear-function-must-pass-origin');
if(coverage.regressionCases.affineFunction.topic!=='function'||coverage.regressionCases.affineFunction.subtype!=='affine'||coverage.regressionCases.affineFunction.y0===0)fail('affine-function-must-have-nonzero-intercept');
for(const k of ['general3g','general4i','general5u']){const x=coverage.regressionCases[k];if(x.topic!=='function'||x.subtype!=='general'||!x.nonConstant)fail(k+'-must-be-general-function');}
if(coverage.regressionCases.proportion4g.topic!=='proportion')fail('4g-must-be-proportion-not-function');
if(coverage.regressionCases.proportion5t.topic!=='proportion')fail('5t-must-be-proportion-not-function');
const w=coverage.regressionCases.weighted4j;if(w.topic!=='statistics'||w.subtype!=='weighted-mean'||w.weights.length!==w.values.length||w.weights.length<2||!w.weights.some(x=>x!==w.weights[0])||!w.weightRow)fail('4j-must-be-weighted-mean-with-visible-weights');
const cp=coverage.regressionCases.elementaryCp;if(cp.grade!=='CP'||cp.topic!=='statistics'||cp.subtype!=='elementary-table'||!cp.values.length||cp.values.some(v=>v>10)||cp.questions.some(q=>/moyenne|étendue|etendue|pourcent/i.test(q)))fail('cp-table-must-stay-elementary');
const den=coverage.regressionCases.density5c;if(den.topic!=='density'||den.subtype!=='mass-volume'||den.values.length!==den.secondary.length||den.values.length<2||!den.secondaryRow||!den.questions.some(q=>/masse volumique/i.test(q)))fail('pc5c-must-use-mass-and-volume');
if(coverage.regressionCases.pcSpeed.topic!=='speed')fail('real-pc-speed-not-recognized');
if(coverage.errors.length)errors.push(...coverage.errors.slice(0,30));
for(const k of ['synthesis','situation','science'])if(!coverage.kinds[k])fail('missing-workshop-kind:'+k);if(!coverage.kinds.data)warnings.push('Aucun atelier de données détecté sur le registre actuel');

const intentChecks=await page.evaluate(()=>{const phrases=['Pourquoi je me suis trompé ?','Pourquoi ma réponse est fausse ?','Pourquoi cette réponse est incorrecte ?','Où est mon erreur ?','Comment corriger mon erreur ?'];return phrases.map(text=>({text,ok:MQFinotRemediation.asksWhy(text)}));});
for(const x of intentChecks)if(!x.ok)fail('finot-intent-not-recognized:'+x.text);

const target=await page.evaluate(()=>Object.keys(CHMAP).find(id=>WMAP[id]?.lvl==='6e'&&typeof CHMAP[id].g==='function'));
await page.evaluate(id=>openLesson(id),target);await page.waitForFunction(()=>typeof L!=='undefined'&&L?.steps?.some(x=>x.k==='mqworkshop'));
await page.evaluate(()=>{L.i=L.steps.findIndex(x=>x.k==='mqworkshop');renderLesson();});await page.waitForSelector('.mq-workshop');
const lessonVisual=await page.evaluate(()=>({workshop:!!document.querySelector('.mq-workshop'),analysis:/À toi d.analyser|À toi d'analyser/.test(document.body.innerText),trap:/Piège fréquent/.test(document.body.innerText)}));
if(!lessonVisual.workshop||!lessonVisual.analysis||!lessonVisual.trap)fail('workshop-not-rendered');await page.screenshot({path:'tests/screenshots/phase4-workshop.png',fullPage:true});
await page.evaluate(id=>{home();startMission([id]);},target);await page.waitForSelector('.qcard');await page.waitForTimeout(80);
const exVisual=await page.evaluate(()=>({context:!!document.querySelector('.mq-application'),text:document.querySelector('.mq-application')?.textContent||'',answer:M?.q?.ans,type:M?.q?.type}));const exExpected=await page.evaluate(()=>((p,q)=>!!p&&(typeof MQChapterPacks.matchesQuestion!=='function'||MQChapterPacks.matchesQuestion(p,q)))(window.MQChapterPacks?.packs?.[M.cid],M.q));if(exVisual.context!==exExpected||(exExpected&&!exVisual.text.includes('Pour ce chapitre')))fail('exercise-context-routing:'+JSON.stringify({exExpected,exVisual}));
await page.evaluate(()=>{home();startMission(['6p']);});await page.waitForSelector('.qcard');const packVisual=await page.evaluate(()=>({context:!!document.querySelector('.mq-application'),text:document.querySelector('.mq-application')?.textContent||''}));if(!packVisual.context||!packVisual.text.includes('Pour ce chapitre'))fail('pack-context-not-rendered:'+JSON.stringify(packVisual));await page.screenshot({path:'tests/screenshots/phase4-exercise-context.png',fullPage:true});
const flashCheck=await page.evaluate(()=>{document.querySelector('.mq-application')?.remove();M.flash=true;renderQ();const during=!!document.querySelector('.mq-application');M.flash=false;renderQ();const after=!!document.querySelector('.mq-application');return{during,after};});if(flashCheck.during||!flashCheck.after)fail('flash-context-visibility');
const finotTip=await page.evaluate(()=>{const t=MQFinotRemediation.tipFor({cid:M.cid,q:M.q});return{ok:Array.isArray(t)&&t.length===2,tip:t};});if(!finotTip.ok)fail('finot-remediation-unavailable');
await page.evaluate(()=>{finotOpen();result(false);finotAsk('Pourquoi ma réponse est fausse ?');});await page.waitForTimeout(140);
const typedFinot=await page.evaluate(()=>({last:!!MQFinotError?.last,chat:!!document.querySelector('#finotchat.open'),trap:/Un piège fréquent dans (cette matière|ce chapitre)/.test(document.getElementById('finotchat')?.innerText||''),hook:MQFinotRemediation.hookActive}));if(!typedFinot.last||!typedFinot.chat||!typedFinot.trap||!typedFinot.hook)fail('typed-finot-remediation-missing');
await browser.close();
const out={coverage,intentChecks,lessonVisual,exVisual,flashCheck,finotTip,typedFinot,errorCount:errors.length,errors,warnings};fs.writeFileSync('tests/phase4-pedagogy-audit-report.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));if(errors.length)process.exitCode=1;else console.log('PHASE4_PEDAGOGY_AUDIT_OK');