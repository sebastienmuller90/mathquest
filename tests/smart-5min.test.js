/* Séance 5 minutes intelligentes — sélection adaptative et interface. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  await p.waitForFunction(()=>!!window.MQSmart5,{timeout:5000});

  const boot=await p.evaluate(()=>({loaded:!!MQSmart5,js:document.querySelectorAll('script[src="js/smart-5min.js"]').length,css:document.querySelectorAll('link[href="js/smart-5min.css"]').length,q:MQSmart5.questionCount()}));
  T('Module premium chargé statiquement une seule fois',boot.loaded&&boot.js===1&&boot.css===1&&boot.q>=4&&boot.q<=8,JSON.stringify(boot));

  const setup=await p.evaluate(()=>{
   const cs=ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).slice(0,6);if(cs.length<4)return {err:'chapitres insuffisants',n:cs.length};
   const [err,due,weak,strong]=cs;
   // Erreur non réparée : priorité maximale.
   S.mistakes[err.id]=[{q:'Erreur test',answer:'42',expl:'',at:Date.now(),seen:0}];
   S.chap[err.id]={ok:1,tot:4,stars:0};S.recent[err.id]=[false,false,true,false];
   // Révision due avec niveau moyen.
   S.review[due.id]={last:Date.now()-86400000,next:Date.now()-1000,days:1};S.chap[due.id]={ok:4,tot:6,stars:1};S.recent[due.id]=[true,false,true,true];
   // Fragile mais sans erreur/due.
   S.chap[weak.id]={ok:1,tot:5,stars:0};S.recent[weak.id]=[false,true,false,false];
   // Très solide : ne doit pas passer devant les besoins réels.
   S.chap[strong.id]={ok:12,tot:12,stars:3};S.recent[strong.id]=[true,true,true,true,true,true];S.lessonScores[strong.id]=100;S.lessons[strong.id]=true;
   S.answerLog=[];for(let i=0;i<16;i++)S.answerLog.push({t:Date.now()-i*1000,cid:strong.id,ok:true,source:'test',ms:22000+(i%3)*1000});
   saveLocal();
   const plan=MQSmart5.plan();
   return {ids:{err:err.id,due:due.id,weak:weak.id,strong:strong.id},plan,median:MQSmart5.medianMs(),count:MQSmart5.questionCount()};
  });
  T('Erreur non réparée : la notion figure dans la séance et porte la raison correspondante',!setup.err&&setup.plan.items.some(x=>x.id===setup.ids.err&&/erreur/.test(x.reason)),JSON.stringify(setup));
  T('Révision due : elle est sélectionnée avant les notions sans urgence',setup.plan.items.some(x=>x.id===setup.ids.due&&/due/.test(x.reason)),JSON.stringify(setup.plan));
  const posErr=setup.plan.items.findIndex(x=>x.id===setup.ids.err),posStrong=setup.plan.items.findIndex(x=>x.id===setup.ids.strong);
  T('Une notion maîtrisée ne passe pas devant une erreur réelle',posErr>=0&&(posStrong<0||posErr<posStrong),JSON.stringify({posErr,posStrong,items:setup.plan.items}));
  T('Rythme rapide : médiane réelle utilisée et séance bornée à 4–8 questions',setup.median>=22000&&setup.median<=24000&&setup.count>=4&&setup.count<=8,JSON.stringify(setup));

  const speed=await p.evaluate(()=>{const ids=ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).slice(0,3).map(c=>c.id);S.answerLog=[];for(let i=0;i<12;i++)S.answerLog.push({t:Date.now()-i,cid:ids[i%ids.length],ok:true,source:'test',ms:72000+(i%2)*4000});const slow=MQSmart5.questionCount(),med=MQSmart5.medianMs();return {slow,med};});
  T('Rythme lent : la séance raccourcit automatiquement sans descendre sous 4 questions',speed.med>=72000&&speed.slow===4&&speed.slow<setup.count,JSON.stringify({fast:setup.count,...speed}));

  await p.evaluate(()=>{home();});await p.waitForSelector('[data-smart5="1"]');
  const card=await p.evaluate(()=>({items:document.querySelectorAll('.smart5-item').length,text:document.querySelector('[data-smart5="1"]')?.textContent||'',buttons:document.querySelectorAll('[data-a="smart5start"], [data-a="smart5refresh"]').length}));
  T('Accueil : carte explique les choix et propose Commencer/Recalculer',card.items>=2&&/5 minutes intelligentes/.test(card.text)&&/Finot choisit/.test(card.text)&&card.buttons===2,JSON.stringify(card));

  const launch=await p.evaluate(()=>{let call=null;const orig=window.startMission;window.startMission=(ids,opt)=>{call={ids:[...ids],opt:{...opt}};};try{const ok=MQSmart5.start();return {ok,call,last:S.smart5?.last};}finally{window.startMission=orig;}});
  T('Démarrage : une mission mixte est lancée avec le nombre de questions calculé',launch.ok&&launch.call&&launch.call.ids.length>=2&&launch.call.opt.n>=4&&launch.call.opt.n<=8&&launch.last?.n===launch.call.opt.n,JSON.stringify(launch));

  const history=await p.evaluate(()=>{MQHooks.emit('mission:end',{m:{ok:3,n:S.smart5.last.n}});return S.smart5.history.slice(-1)[0];});
  T('Fin de séance : un historique compact est conservé sans dupliquer la progression pédagogique',history&&history.total>=4&&history.ok===3&&Array.isArray(history.ids),JSON.stringify(history));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>home());await p.waitForSelector('[data-smart5="1"]');
  const mobile=await p.evaluate(()=>{const c=document.querySelector('[data-smart5="1"]'),r=c.getBoundingClientRect();return {left:r.left,right:r.right,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,buttons:[...c.querySelectorAll('.smart5-actions .btn')].map(b=>b.getBoundingClientRect().width)};});
  T('Mobile 320 px : carte entièrement dans le viewport sans débordement horizontal',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1&&mobile.buttons.every(w=>w>80),JSON.stringify(mobile));

  // Nouveau profil : le moteur doit produire un plan sans dépendre des données du premier enfant.
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const second=await p.evaluate(()=>({name:S.name,plan:MQSmart5.plan(),history:S.smart5?.history||[]}));
  T('Multi-profils : un nouvel enfant obtient son propre plan et aucun historique ne fuit',second.name==='Noé'&&second.plan.ids.length>=2&&second.history.length===0,JSON.stringify(second));

  T('Aucune erreur JavaScript pendant la séance intelligente',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
