/* Finot vivant — machine d'états, priorités, vestiaire, profils et mobile. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQFinotLive,{timeout:5000});await p.waitForTimeout(60);

  const boot=await p.evaluate(async()=>{const states=Object.entries(MQFinotLive.states),assets=await Promise.all(states.map(async([k,v])=>[k,v.src,(await fetch(v.src)).ok]));return {states:states.map(x=>x[0]),events:Object.keys(MQFinotLive.eventMap),accessories:Object.keys(MQFinotLive.accessories),assets,base:finotEtat(S),card:!!document.querySelector('.finot-card'),fab:!!document.querySelector('.finot-fab')};});
  T('Moteur chargé : 10 états, API Carnet/Diplômes, 5 choix de vestiaire et toutes les images existent',boot.states.length===10&&boot.events.includes('exercise.correct')&&boot.events.includes('chapter.mastered')&&boot.events.includes('error.repaired')&&boot.accessories.length===5&&boot.assets.every(x=>x[2])&&boot.card&&boot.fab,JSON.stringify(boot));

  const fail=await p.evaluate(()=>{MQFinotLive.clear();MQFinotLive.emit('exercise.failed');MQFinotLive.paint();const c=MQFinotLive.current,card=document.querySelector('.finot-card'),fab=document.querySelector('.finot-fab');return {state:c?.state,priority:c?.priority,text:card?.innerText||'',cardState:card?.dataset.finotState,fabState:fab?.dataset.finotState,img:card?.querySelector('img.finot-live')?.getAttribute('src')};});
  T('Erreur : Finot reste bienveillant et utilise son expression d’encouragement',fail.state==='sad-but-supportive'&&fail.cardState==='sad-but-supportive'&&fail.fabState==='sad-but-supportive'&&/erreur.*aider|répare/i.test(fail.text)&&/03-expression-encouragement/.test(fail.img||''),JSON.stringify(fail));

  const priority=await p.evaluate(()=>{const low=MQFinotLive.emit('exercise.correct'),afterLow=MQFinotLive.current;const high=MQFinotLive.emit('chapter.mastered',{text:'Chapitre maîtrisé !'}),afterHigh=MQFinotLive.current;return {low,lowState:afterLow?.state,high,highState:afterHigh?.state,highText:afterHigh?.text};});
  T('Priorités : une petite réussite ne remplace pas un encouragement actif, mais un chapitre maîtrisé prend la priorité',priority.low===false&&priority.lowState==='sad-but-supportive'&&priority.high===true&&priority.highState==='proud'&&/Chapitre maîtrisé/.test(priority.highText||''),JSON.stringify(priority));

  const mission=await p.evaluate(()=>({perfect:MQFinotLive.missionState({ok:8,n:8}),good:MQFinotLive.missionState({ok:6,n:8}),mid:MQFinotLive.missionState({ok:4,n:8}),low:MQFinotLive.missionState({ok:2,n:8})}));
  T('Résultat mission : parfait→célébration, ≥75%→fierté, moyen→heureux, faible→encouragement',mission.perfect==='celebrating'&&mission.good==='proud'&&mission.mid==='happy'&&mission.low==='encouraging',JSON.stringify(mission));

  const expiry0=await p.evaluate(()=>{MQFinotLive.clear();const b=finotEtat(S);MQFinotLive.setState('surprised',{ttl:500,force:true,text:'État temporaire'});MQFinotLive.paint();return {baseText:b.texte,baseImg:b.img,temp:MQFinotLive.current?.state,tempText:document.querySelector('.finot-card')?.innerText||''};});
  await p.waitForTimeout(650);
  const expiry1=await p.evaluate(()=>{const b=finotEtat(S),card=document.querySelector('.finot-card');return {cur:MQFinotLive.current,state:card?.dataset.finotState||'',text:card?.innerText||'',img:card?.querySelector('img.finot-live')?.getAttribute('src'),baseText:b.texte,baseImg:b.img,react:card?.classList.contains('mq-finot-reacting')};});
  T('Expiration : retour automatique à l’état naturel historique de Finot',expiry0.temp==='surprised'&&!expiry1.cur&&!expiry1.state&&!expiry1.react&&expiry1.text.includes(expiry1.baseText)&&expiry1.img===expiry1.baseImg,JSON.stringify({expiry0,expiry1}));

  await p.evaluate(()=>{MQFinotLive.clear();finotOpen();});await p.waitForTimeout(40);const chatOpen=await p.evaluate(()=>({state:MQFinotLive.current?.state,head:document.querySelector('#finotchat .fch-head img')?.getAttribute('src')}));
  await p.evaluate(()=>finotPush('finot','Voici une explication simple.'));await p.waitForTimeout(240);const chatMsg=await p.evaluate(()=>({state:MQFinotLive.current?.state,head:document.querySelector('#finotchat .fch-head img')?.getAttribute('src')}));
  T('Chat Finot : ouverture en réflexion puis réponse en mode explication',chatOpen.state==='thinking'&&/07-expression-indice/.test(chatOpen.head||'')&&chatMsg.state==='explaining'&&/10-expression-revision/.test(chatMsg.head||''),JSON.stringify({chatOpen,chatMsg}));

  const pass=await p.evaluate(()=>{let hit=0;MQHooks.on('finot:intent',()=>{hit++;return true;},{id:'test-live-pass',order:999});const taken=MQHooks.first('finot:intent',{raw:'zz-live-pass-through-zz',echo:()=>{}});MQHooks.off('finot:intent','test-live-pass');return {hit,taken};});
  T('Compatibilité assistant : Finot vivant ne consomme pas les intentions destinées aux autres modules',pass.hit===1&&pass.taken===true,JSON.stringify(pass));

  // Vestiaire : mêmes seuils d'assiduité que le repaire existant, sans dépense de pièces.
  await p.evaluate(()=>{finotClose();S.streak.best=0;S.streak.n=0;S.finotLiving={accessory:'none'};saveLocal();finotScreen();MQFinotLive.paint();});await p.waitForSelector('.finot-wardrobe');
  const locked=await p.evaluate(()=>({buttons:[...document.querySelectorAll('.finot-wear')].map(b=>({a:b.dataset.a,disabled:b.getAttribute('aria-disabled'),pressed:b.getAttribute('aria-pressed')})),crown:MQFinotLive.selectAccessory('crown'),coins:S.coins}));
  T('Vestiaire à 0 jour : foulard disponible, chapeau/cape/couronne verrouillés et aucun coût en pièces',locked.buttons.length===5&&locked.buttons.find(x=>x.a==='finotwear:scarf')?.disabled===null&&locked.buttons.find(x=>x.a==='finotwear:hat')?.disabled==='true'&&locked.buttons.find(x=>x.a==='finotwear:cape')?.disabled==='true'&&locked.buttons.find(x=>x.a==='finotwear:crown')?.disabled==='true'&&locked.crown===false,JSON.stringify(locked));

  const scarf=await p.evaluate(()=>{const coins=S.coins,ok=MQFinotLive.selectAccessory('scarf');home();MQFinotLive.paint();const n1=document.querySelectorAll('.mq-finot-worn').length;MQFinotLive.paint();MQFinotLive.paint();const n2=document.querySelectorAll('.mq-finot-worn').length;return {ok,selected:MQFinotLive.selectedAccessory,saved:S.finotLiving?.accessory,coinsBefore:coins,coinsAfter:S.coins,n1,n2,badges:[...document.querySelectorAll('.mq-finot-worn img')].map(x=>x.getAttribute('src'))};});
  T('Foulard : sélection persistée gratuitement et paint() idempotent sans badges dupliqués',scarf.ok&&scarf.selected==='scarf'&&scarf.saved==='scarf'&&scarf.coinsAfter===scarf.coinsBefore&&scarf.n1>0&&scarf.n2===scarf.n1&&scarf.badges.every(x=>/ui-objet-foulard/.test(x||'')),JSON.stringify(scarf));

  const crown=await p.evaluate(()=>{S.streak.best=30;saveLocal();finotScreen();MQFinotLive.paint();const friends=[...document.querySelectorAll('img[src*="ami-"]')].map(x=>x.getAttribute('src'));const ok=MQFinotLive.selectAccessory('crown');const friends2=[...document.querySelectorAll('img[src*="ami-"]')].map(x=>x.getAttribute('src'));const wardrobes=document.querySelectorAll('.finot-wardrobe').length;return {ok,selected:MQFinotLive.selectedAccessory,saved:S.finotLiving?.accessory,friends,friends2,wardrobes,crownButton:document.querySelector('[data-a="finotwear:crown"]')?.getAttribute('aria-pressed')};});
  T('30 jours : couronne débloquée, un seul vestiaire et les images des amis de Finot restent intactes',crown.ok&&crown.selected==='crown'&&crown.saved==='crown'&&crown.wardrobes===1&&JSON.stringify(crown.friends)===JSON.stringify(crown.friends2)&&crown.crownButton==='true',JSON.stringify(crown));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQFinotLive,{timeout:5000});await p.waitForTimeout(70);
  const persisted=await p.evaluate(()=>({name:S.name,selected:MQFinotLive.selectedAccessory,saved:S.finotLiving?.accessory,best:S.streak.best}));
  T('Rechargement : l’accessoire choisi reste propre au profil',persisted.name==='Lina'&&persisted.selected==='crown'&&persisted.saved==='crown'&&persisted.best===30,JSON.stringify(persisted));

  await p.evaluate(()=>{MQFinotLive.setState('celebrating',{force:true,ttl:10000});createProfile();});await seedProfile(p,'Noé','CM1');await p.waitForTimeout(80);
  const profile=await p.evaluate(()=>({name:S.name,current:MQFinotLive.current,state:document.querySelector('.finot-card')?.dataset.finotState||'',natural:finotEtat(S).texte,text:document.querySelector('.finot-card')?.innerText||'',accessory:MQFinotLive.selectedAccessory,saved:S.finotLiving?.accessory}));
  T('Multi-profils : ni émotion ni accessoire de Lina ne fuit vers Noé',profile.name==='Noé'&&!profile.current&&!profile.state&&profile.text.includes(profile.natural)&&profile.accessory==='none'&&profile.saved==='none',JSON.stringify(profile));

  const publicApi=await p.evaluate(()=>{const a=MQFinotLive.emit('error.repaired',{text:'Erreur réparée !'}),s1=MQFinotLive.current?.state;MQFinotLive.clear();const b=MQFinotLive.emit('chapter.mastered',{text:'Nouveau chapitre maîtrisé !'}),s2=MQFinotLive.current?.state;return {a,s1,b,s2};});
  T('API inter-modules : Carnet et Diplômes peuvent déclencher fierté sans couplage direct',publicApi.a&&publicApi.s1==='proud'&&publicApi.b&&publicApi.s2==='proud',JSON.stringify(publicApi));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{S.streak.best=30;MQFinotLive.selectAccessory('hat');home();MQFinotLive.setState('celebrating',{force:true,ttl:5000});MQFinotLive.paint();});await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.finot-card')?.getBoundingClientRect().right||0,vw:innerWidth,fabRight:document.querySelector('.finot-fab')?.getBoundingClientRect().right||0,badges:document.querySelectorAll('.mq-finot-worn').length}));
  T('Mobile 320 px : réactions et accessoire Finot sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2&&mobile.fabRight<=mobile.vw+2&&mobile.badges>0,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les états et le vestiaire de Finot',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
