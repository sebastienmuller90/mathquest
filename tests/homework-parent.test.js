/* Devoirs scolaires parent-validés — aucun gain avant validation adulte, aucune double récompense. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQHomework&&!!window.MQEconomy);

  await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector('[data-homework-parent="1"]');
  await p.fill('#hw-title','Exercices 4 et 5 page 72');await p.selectOption('#hw-subj','p-maths');await p.fill('#hw-due','2026-10-23');await p.fill('#hw-note','Poser les opérations dans le cahier.');await p.click('[data-a="hwcreate"]');
  const created=await p.evaluate(()=>S.homework?.[0]);
  T('Parent : création d’un devoir complet, sans récompense immédiate',created?.title==='Exercices 4 et 5 page 72'&&created?.status==='todo'&&!created?.rewardedAt&&created?.subject==='p-maths',JSON.stringify(created));

  await p.evaluate(()=>home());await p.waitForSelector('[data-homework-child="1"]');const before=await p.evaluate(()=>({xp:S.xp,coins:S.coins,merit:S.merit.pts,streak:S.streak.n,qualified:MQEconomy.day.qualified,id:S.homework[0].id}));
  await p.click(`[data-a="hwclaim:${before.id}"]`);const claim=await p.evaluate(()=>({x:S.homework[0],xp:S.xp,coins:S.coins,merit:S.merit.pts,streak:S.streak.n,qualified:MQEconomy.day.qualified}));
  T('Enfant : « J’ai terminé » ne donne absolument aucune récompense ni assiduité',claim.x.status==='claimed'&&claim.xp===before.xp&&claim.coins===before.coins&&claim.merit===before.merit&&claim.streak===before.streak&&claim.qualified===before.qualified,JSON.stringify({before,claim}));

  await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector(`[data-a="hwvalidate:${before.id}"]`);await p.click(`[data-a="hwvalidate:${before.id}"]`);
  const val=await p.evaluate(()=>({x:S.homework[0],xp:S.xp,coins:S.coins,merit:S.merit.pts,streak:S.streak.n,qualified:MQEconomy.day.qualified}));
  T('Parent : validation unique déclenche 15 XP, 3 pièces, bons points et journée qualifiée',val.x.status==='validated'&&val.x.rewardedAt>0&&val.x.reward?.xp===15&&val.x.reward?.coins===3&&val.x.reward?.merit===2&&val.xp===before.xp+15&&val.coins===before.coins+3&&val.merit>=before.merit+2&&val.qualified===true,JSON.stringify(val));

  const once=await p.evaluate(id=>{const a={xp:S.xp,coins:S.coins,merit:S.merit.pts,rewarded:S.homework[0].rewardedAt};const ok=MQHomework.validate(id),b={xp:S.xp,coins:S.coins,merit:S.merit.pts,rewarded:S.homework[0].rewardedAt};return {ok,a,b};},before.id);
  T('Double validation : aucun second gain possible',once.ok===false&&JSON.stringify(once.a)===JSON.stringify(once.b),JSON.stringify(once));

  const cap=await p.evaluate(()=>{const mk=n=>({id:`hw_cap_${n}`,title:`Devoir ${n}`,subject:'p-francais',due:'',note:'',status:'claimed',createdAt:Date.now()+n,claimedAt:Date.now(),validatedAt:0,rewardedAt:0,rewardDay:'',reward:null});S.homework.push(mk(2),mk(3));const b={xp:S.xp,coins:S.coins,merit:S.merit.pts};MQHomework.validate('hw_cap_2');const m={xp:S.xp,coins:S.coins,merit:S.merit.pts};MQHomework.validate('hw_cap_3');const a={xp:S.xp,coins:S.coins,merit:S.merit.pts};return {b,m,a,t2:S.homework.find(x=>x.id==='hw_cap_2'),t3:S.homework.find(x=>x.id==='hw_cap_3')};});
  T('Plafond : deuxième devoir rémunéré, troisième validé mais sans farm de récompense',cap.m.xp===cap.b.xp+15&&cap.m.coins===cap.b.coins+3&&cap.a.xp===cap.m.xp&&cap.a.coins===cap.m.coins&&cap.t3.status==='validated'&&cap.t3.reward?.capped===true,JSON.stringify(cap));

  const redo=await p.evaluate(()=>{const x={id:'hw_redo',title:'À corriger',subject:'p-maths',due:'',note:'',status:'claimed',createdAt:Date.now(),claimedAt:Date.now(),validatedAt:0,rewardedAt:0,rewardDay:'',reward:null};S.homework.push(x);MQHomework.returnTodo(x.id);return S.homework.find(v=>v.id===x.id);});
  T('Parent : « À refaire » remet le devoir à faire sans gain',redo.status==='todo'&&!redo.rewardedAt&&redo.claimedAt===0,JSON.stringify(redo));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQHomework);const persist=await p.evaluate(()=>({n:S.homework?.length,valid:S.homework?.filter(x=>x.status==='validated').length,reward:S.homework?.[0]?.rewardedAt}));
  T('Rechargement : devoirs et validations persistent',persist.n>=4&&persist.valid>=3&&persist.reward>0,JSON.stringify(persist));

  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);const iso=await p.evaluate(()=>({name:S.name,n:S.homework?.length||0}));
  T('Multi-profils : les devoirs d’un enfant ne fuient pas vers l’autre',iso.name==='Noé'&&iso.n===0,JSON.stringify(iso));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{S.homework=[{id:'hw_mobile',title:'Lire le texte de français',subject:'p-francais',due:'2026-10-23',note:'Deux fois à voix haute.',status:'todo',createdAt:Date.now(),claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null}];home();});await p.waitForSelector('[data-homework-child="1"]');const mob=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,w:innerWidth,r:document.querySelector('[data-homework-child="1"]').getBoundingClientRect().right}));
  T('Mobile 320 px : carte devoir sans débordement horizontal',mob.sw<=mob.w+1&&mob.r<=mob.w+1,JSON.stringify(mob));
  T('Aucune erreur JavaScript pendant le parcours devoirs',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}return R;
}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
