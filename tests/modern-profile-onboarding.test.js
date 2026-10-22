/* Création de profil premium : wizard, identité, questionnaire, parcours et responsive. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1600)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.waitForSelector('.pob-shell',{timeout:6000});
  const boot=await p.evaluate(()=>({api:!!MQProfileOnboarding,css:document.querySelectorAll('link[href="js/modern-profile-onboarding.css"]').length,old:document.querySelectorAll('.onb .avs').length,companions:Object.keys(MQProfileOnboarding.companions),step:MQProfileOnboarding.state?.step}));
  T('Wizard premium chargé sans ancien sélecteur emoji',boot.api&&boot.css===1&&boot.old===0&&boot.companions.join(',')==='finot,momo,leo'&&boot.step===0,JSON.stringify(boot));

  await p.fill('#pob-name','Lina');await p.click('[data-pob="gender"][data-value="girl"]');await p.click('[data-pob="next"]');
  await p.fill('#pob-birth','2018-03-15');await p.click('[data-pob="next"]');
  await p.click('[data-pob="stage"][data-value="primaire"]');await p.click('[data-pob="grade"][data-value="CE2"]');await p.click('[data-pob="next"]');
  const companions=await p.evaluate(()=>[...document.querySelectorAll('.pob-companion')].map(x=>({v:x.dataset.value,img:x.querySelector('img')?.getAttribute('src'),name:x.innerText.split('\n')[0]})));
  T('Finot, Momo et Léo utilisent de vraies illustrations',companions.length===3&&companions.every(x=>/data\/images\/finot\/.+\.(jpg|png)/.test(x.img||'')),JSON.stringify(companions));
  await p.click('[data-pob="companion"][data-value="momo"]');await p.click('[data-pob="next"]');
  await p.click('[data-pob="level"][data-value="hard"]');await p.click('[data-pob="confidence"][data-value="low"]');await p.click('[data-pob="help"][data-value="guided"]');await p.click('[data-pob="next"]');
  const subjects=await p.evaluate(()=>MQProfileOnboarding.subjectsForGrade('CE2').map(x=>({id:x.id,name:x.name})));const hard=subjects.find(x=>!/maths|francais/.test(x.id))||subjects[0],fav=subjects.find(x=>x.id!==hard.id)||subjects[0];
  await p.click('[data-pob="goal"][data-value="homework"]');await p.click('[data-pob="goal"][data-value="test"]');
  await p.click(`[data-pob="difficult"][data-value="${hard.id}"]`);if(fav.id!==hard.id)await p.click(`[data-pob="favorite"][data-value="${fav.id}"]`);await p.click('[data-pob="pace"][data-value="short"]');
  const beforeRotate=await p.evaluate(()=>MQProfileOnboarding.state);
  const layouts=[];for(const [width,height,name] of [[390,844,'phone-portrait'],[844,390,'phone-landscape'],[768,1024,'tablet-portrait'],[1024,768,'tablet-landscape'],[1440,900,'desktop']]){await p.setViewportSize({width,height});const x=await p.evaluate(()=>({step:MQProfileOnboarding.state.step,name:MQProfileOnboarding.state.name,doc:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,preview:getComputedStyle(document.querySelector('.pob-preview')).display,cols:getComputedStyle(document.querySelector('.pob-shell')).gridTemplateColumns}));layouts.push({name,width,height,...x});}
  T('Rotation portrait/paysage conserve intégralement le questionnaire',layouts.every(x=>x.step===5&&x.name==='Lina')&&beforeRotate.goals.length===2,JSON.stringify(layouts));
  T('Téléphone/tablette/desktop : aucun débordement horizontal',layouts.every(x=>x.doc<=x.client+1),JSON.stringify(layouts));
  T('Paysage et desktop utilisent une composition avec aperçu latéral',layouts.filter(x=>x.width>x.height||x.width>=900).every(x=>x.preview!=='none'&&String(x.cols).split(' ').length>=2),JSON.stringify(layouts));
  await p.setViewportSize({width:390,height:844});await p.click('[data-pob="next"]');await p.waitForSelector('.pob-summary');
  const summary=await p.evaluate(()=>({txt:document.querySelector('.pob-summary')?.innerText||'',plan:MQProfileOnboarding.plan(),state:MQProfileOnboarding.state}));
  T('Aperçu final explique le parcours sans présenter le ressenti comme une vérité',/profil n’est pas une étiquette/i.test(summary.txt)&&summary.plan.sessionQuestions===5&&summary.state.companion==='momo',JSON.stringify(summary));
  await p.click('[data-pob="finish"]');await p.waitForFunction(()=>typeof S!=='undefined'&&S.name==='Lina'&&S.learnerProfile?.version===1,null,{timeout:6000});
  const saved=await p.evaluate(()=>({name:S.name,gender:S.gender,grade:S.grade,companion:S.companion,avatar:S.avatar,lp:S.learnerProfile,path:S.path&&{applied:S.path.learnerProfileApplied,lessons:S.path.steps.filter(x=>x.kind==='lesson').map(x=>({s:x.subj,c:x.cid,t:x.learnerDeclared||''}))},profiles:Object.keys(PDB.profiles).length}));
  T('Profil sauvegardé : identité + compagnon + questionnaire séparé par enfant',saved.name==='Lina'&&saved.gender==='girl'&&saved.grade==='CE2'&&saved.companion==='momo'&&saved.avatar==='🦉'&&saved.lp.goals.includes('homework')&&saved.lp.difficultSubjects.includes(hard.id),JSON.stringify(saved));
  T('Parcours initial applique légèrement le profil déclaré tout en gardant des chapitres valides de CE2',saved.path&&saved.path.lessons.every(x=>WMAP[x.c]?.lvl==='CE2')&&saved.path.applied===true,JSON.stringify(saved.path));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&S.name==='Lina',null,{timeout:6000});const reload=await p.evaluate(()=>({gender:S.gender,companion:S.companion,goals:S.learnerProfile?.goals||[],difficulty:S.learnerProfile?.difficultSubjects||[]}));
  T('Identité et questionnaire persistent après rechargement',reload.gender==='girl'&&reload.companion==='momo'&&reload.goals.includes('test')&&reload.difficulty.includes(hard.id),JSON.stringify(reload));

  const reset=await p.evaluate(()=>{S.xp=999;const el=document.createElement('button');ACT.reset(null,el);ACT.reset(null,el);return {xp:S.xp,gender:S.gender,companion:S.companion,lp:!!S.learnerProfile,name:S.name,grade:S.grade};});
  T('Réinitialiser la progression conserve l’identité et le profil pédagogique',reset.xp===0&&reset.gender==='girl'&&reset.companion==='momo'&&reset.lp&&reset.name==='Lina'&&reset.grade==='CE2',JSON.stringify(reset));

  await p.evaluate(()=>createProfile());await p.waitForSelector('.pob-shell');const second=await p.evaluate(()=>({name:S.name,lp:S.learnerProfile||null,w:MQProfileOnboarding.state,profiles:Object.keys(PDB.profiles).length}));
  T('Nouveau profil repart sur un questionnaire vierge sans hériter du premier enfant',second.name===''&&!second.lp&&second.w.step===0&&second.w.name===''&&second.profiles===2,JSON.stringify(second));
  T('Aucune erreur JavaScript pendant la création premium',!errs.length,errs.slice(0,12).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
