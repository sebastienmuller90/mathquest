/* Finot vivant — machine d'états transitoire, priorités, chat, profils et mobile. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQFinotLive,{timeout:5000});await p.waitForTimeout(60);

  const boot=await p.evaluate(()=>({states:Object.keys(MQFinotLive.states),events:Object.keys(MQFinotLive.eventMap),base:finotEtat(S),card:!!document.querySelector('.finot-card'),fab:!!document.querySelector('.finot-fab')}));
  T('Moteur Finot vivant chargé avec 10 états et événements publics',boot.states.length===10&&boot.events.includes('exercise.correct')&&boot.events.includes('chapter.mastered')&&boot.events.includes('error.repaired'),JSON.stringify(boot));

  const fail=await p.evaluate(()=>{MQFinotLive.clear();MQFinotLive.emit('exercise.failed');MQFinotLive.paint();const c=MQFinotLive.current,card=document.querySelector('.finot-card'),fab=document.querySelector('.finot-fab');return {state:c?.state,priority:c?.priority,text:card?.innerText||'',cardState:card?.dataset.finotState,fabState:fab?.dataset.finotState,img:card?.querySelector('img.finot-live')?.getAttribute('src')};});
  T('Erreur : Finot devient encourageant, jamais punitif, sur carte et bouton flottant',fail.state==='sad-but-supportive'&&fail.cardState==='sad-but-supportive'&&fail.fabState==='sad-but-supportive'&&/erreur.*aider|répare/i.test(fail.text)&&/03-expression-encouragement/.test(fail.img||''),JSON.stringify(fail));

  const priority=await p.evaluate(()=>{const before=MQFinotLive.current?.id;const low=MQFinotLive.emit('exercise.correct'),afterLow=MQFinotLive.current;const high=MQFinotLive.emit('chapter.mastered',{text:'Chapitre maîtrisé !'}),afterHigh=MQFinotLive.current;return {before,low,lowState:afterLow?.state,high,highState:afterHigh?.state,highText:afterHigh?.text};});
  T('Priorités : une petite réussite ne remplace pas un encouragement actif, mais un chapitre maîtrisé prend la priorité',priority.low===false&&priority.lowState==='sad-but-supportive'&&priority.high===true&&priority.highState==='proud'&&/Chapitre maîtrisé/.test(priority.highText||''),JSON.stringify(priority));

  const mission=await p.evaluate(()=>({perfect:MQFinotLive.missionState({ok:8,n:8}),good:MQFinotLive.missionState({ok:6,n:8}),mid:MQFinotLive.missionState({ok:4,n:8}),low:MQFinotLive.missionState({ok:2,n:8})}));
  T('Résultat mission : parfait→célébration, ≥75%→fierté, moyen→heureux, faible→encouragement',mission.perfect==='celebrating'&&mission.good==='proud'&&mission.mid==='happy'&&mission.low==='encouraging',JSON.stringify(mission));

  // Expiration rapide forcée : retour exact à l'état naturel finotEtat(S).
  const expiry0=await p.evaluate(()=>{MQFinotLive.clear();const b=finotEtat(S);MQFinotLive.setState('surprised',{ttl:500,force:true,text:'État temporaire'});MQFinotLive.paint();return {baseText:b.texte,baseImg:b.img,temp:MQFinotLive.current?.state,tempText:document.querySelector('.finot-card')?.innerText||''};});
  await p.waitForTimeout(650);
  const expiry1=await p.evaluate(()=>{const b=finotEtat(S),card=document.querySelector('.finot-card');return {cur:MQFinotLive.current,state:card?.dataset.finotState||'',text:card?.innerText||'',img:card?.querySelector('img.finot-live')?.getAttribute('src'),baseText:b.texte,baseImg:b.img,react:card?.classList.contains('mq-finot-reacting')};});
  T('Expiration : retour automatique à l’état naturel historique de Finot',expiry0.temp==='surprised'&&!expiry1.cur&&!expiry1.state&&!expiry1.react&&expiry1.text.includes(expiry1.baseText)&&expiry1.img===expiry1.baseImg,JSON.stringify({expiry0,expiry1}));

  // Chat : ouverture -> thinking ; réponse Finot -> explaining.
  await p.evaluate(()=>{MQFinotLive.clear();finotOpen();});await p.waitForTimeout(40);const chatOpen=await p.evaluate(()=>({state:MQFinotLive.current?.state,head:document.querySelector('#finotchat .fch-head img')?.getAttribute('src')}));
  await p.evaluate(()=>finotPush('finot','Voici une explication simple.'));await p.waitForTimeout(40);const chatMsg=await p.evaluate(()=>({state:MQFinotLive.current?.state,head:document.querySelector('#finotchat .fch-head img')?.getAttribute('src')}));
  T('Chat Finot : ouverture en réflexion puis réponse en mode explication',chatOpen.state==='thinking'&&/07-expression-indice/.test(chatOpen.head||'')&&chatMsg.state==='explaining'&&/10-expression-revision/.test(chatMsg.head||''),JSON.stringify({chatOpen,chatMsg}));

  // Changement de profil réel : l'état transitoire doit disparaître et ne jamais fuir.
  await p.evaluate(()=>{finotClose();MQFinotLive.setState('celebrating',{force:true,ttl:10000});createProfile();});
  await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const profile=await p.evaluate(()=>({name:S.name,current:MQFinotLive.current,state:document.querySelector('.finot-card')?.dataset.finotState||'',natural:finotEtat(S).texte,text:document.querySelector('.finot-card')?.innerText||''}));
  T('Multi-profils : aucun état émotionnel transitoire de Lina ne fuit vers Noé',profile.name==='Noé'&&!profile.current&&!profile.state&&profile.text.includes(profile.natural),JSON.stringify(profile));

  // API publique pour les futures branches Carnet/Diplômes.
  const publicApi=await p.evaluate(()=>{const a=MQFinotLive.emit('error.repaired',{text:'Erreur réparée !'}),s1=MQFinotLive.current?.state;MQFinotLive.clear();const b=MQFinotLive.emit('chapter.mastered',{text:'Nouveau chapitre maîtrisé !'}),s2=MQFinotLive.current?.state;return {a,s1,b,s2};});
  T('API inter-modules : Carnet et Diplômes peuvent déclencher fierté sans couplage direct',publicApi.a&&publicApi.s1==='proud'&&publicApi.b&&publicApi.s2==='proud',JSON.stringify(publicApi));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{home();MQFinotLive.setState('celebrating',{force:true,ttl:5000});MQFinotLive.paint();});await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.finot-card')?.getBoundingClientRect().right||0,vw:innerWidth,fabRight:document.querySelector('.finot-fab')?.getBoundingClientRect().right||0}));
  T('Mobile 320 px : réactions Finot sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2&&mobile.fabRight<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les états de Finot',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
