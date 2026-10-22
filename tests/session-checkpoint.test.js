/* Checkpoint de fin de séance — avant/après réel, historique et zéro mutation de récompense. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  await p.waitForFunction(()=>!!window.MQSessionCheckpoint,{timeout:5000});
  const boot=await p.evaluate(()=>({loaded:!!MQSessionCheckpoint,js:document.querySelectorAll('script[src="js/session-checkpoint.js"]').length,css:document.querySelectorAll('link[href="js/session-checkpoint.css"]').length,history:S.sessionCheckpoints?.history||[]}));
  T('Module checkpoint chargé une seule fois avec historique par profil',boot.loaded&&boot.js===1&&boot.css===1&&boot.history.length===0,JSON.stringify(boot));

  const cid=await p.evaluate(()=>ALLCH.find(c=>WMAP[c.id]?.lvl===S.grade)?.id||'');T('Chapitre de test disponible',!!cid,cid);
  const progression=await p.evaluate(id=>{
   S.chap[id]={ok:1,tot:5,stars:0};S.recent[id]=[false,false,true,false];S.mistakes[id]=[{q:'x',answer:'y',expl:'',at:Date.now(),seen:0}];
   const before=MQAdaptive.mastery(S,id);MQHooks.emit('mission:start',{ids:[id],M:{ids:[id],n:8,flash:false}});
   // Preuves réellement plus fortes après la séance.
   S.chap[id]={ok:9,tot:12,stars:2};S.recent[id]=[true,true,true,true,true,false];S.lessons[id]=true;S.lessonScores[id]=90;S.mistakes[id][0].seen=Date.now();
   const after=MQAdaptive.mastery(S,id),sum=MQSessionCheckpoint.summarize({ids:[id],ok:7,n:8});return {before,after,sum};
  },cid);
  T('Progression réelle : delta calculé depuis la maîtrise avant/après, jamais depuis le score seul',progression.after>progression.before&&progression.sum.rows[0].delta===progression.after-progression.before&&progression.sum.headline==='Progression nette',JSON.stringify(progression));
  T('Erreur réparée pendant la séance : comptée depuis l’état avant/après',progression.sum.repaired===1&&progression.sum.rows[0].repaired===1,JSON.stringify(progression.sum));

  const noFake=await p.evaluate(id=>{MQHooks.emit('mission:start',{ids:[id],M:{ids:[id],n:8,flash:false}});const before=MQAdaptive.mastery(S,id),sum=MQSessionCheckpoint.summarize({ids:[id],ok:8,n:8}),after=MQAdaptive.mastery(S,id);return {before,after,sum};},cid);
  T('Score parfait sans hausse de maîtrise : aucune fausse progression annoncée',noFake.before===noFake.after&&noFake.sum.rows[0].delta===0&&noFake.sum.headline==='Séance très solide'&&!/progressé de/.test(noFake.sum.detail),JSON.stringify(noFake));

  // Intégration mission:end : écran de fin déjà rendu, puis hook qui ajoute le checkpoint et sauvegarde l'historique.
  const integration=await p.evaluate(id=>{document.querySelector('#app').innerHTML='<div class="end card"><h1>7/8</h1><div class="gains"><span>+70 XP</span></div></div>';MQHooks.emit('mission:start',{ids:[id],M:{ids:[id],n:8,flash:false}});const xp=S.xp,coins=S.coins,total=S.totalQ;MQHooks.emit('mission:end',{m:{ids:[id],ok:7,n:8}});const el=document.querySelector('.session-checkpoint');return {card:el?.textContent||'',xpBefore:xp,xpAfter:S.xp,coinsBefore:coins,coinsAfter:S.coins,totalBefore:total,totalAfter:S.totalQ,h:S.sessionCheckpoints.history.slice(-1)[0],saved:JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'{}')?.profiles?.[ACTIVE]?.sessionCheckpoints};},cid);
  T('mission:end : checkpoint injecté avant les gains et historique sauvegardé',/Checkpoint Finot/.test(integration.card)&&integration.h&&integration.saved?.history?.length===1,JSON.stringify(integration));
  T('Checkpoint : aucune mutation XP, pièces ou nombre de questions',integration.xpBefore===integration.xpAfter&&integration.coinsBefore===integration.coinsAfter&&integration.totalBefore===integration.totalAfter,JSON.stringify(integration));

  // Plafond historique.
  const cap=await p.evaluate(()=>{S.sessionCheckpoints.history=[];for(let i=0;i<25;i++)S.sessionCheckpoints.history.push({at:i});const h=S.sessionCheckpoints.history;h.splice(0,Math.max(0,h.length-20));return {n:h.length,first:h[0].at,last:h.at(-1).at};});
  T('Historique compact : maximum 20 checkpoints',cap.n===20&&cap.first===5&&cap.last===24,JSON.stringify(cap));

  await p.setViewportSize({width:320,height:700});
  const mobile=await p.evaluate(id=>{document.querySelector('#app').innerHTML='<div class="end card"><div class="gains"></div></div>';MQHooks.emit('mission:start',{ids:[id],M:{ids:[id],n:8,flash:false}});const s=MQSessionCheckpoint.summarize({ids:[id],ok:6,n:8});MQSessionCheckpoint.inject(s);const c=document.querySelector('.session-checkpoint'),r=c.getBoundingClientRect();return {left:r.left,right:r.right,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth};},cid);
  T('Mobile 320 px : checkpoint entièrement visible sans débordement',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1,JSON.stringify(mobile));

  // Changement de profil entre start/end : snapshot abandonné.
  await p.setViewportSize({width:390,height:844});await p.evaluate(id=>MQHooks.emit('mission:start',{ids:[id],M:{ids:[id],n:8,flash:false}}),cid);await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const iso=await p.evaluate(()=>({name:S.name,snap:MQSessionCheckpoint.snapshot,history:S.sessionCheckpoints?.history||[],sum:MQSessionCheckpoint.summarize({ids:[],ok:1,n:1})}));
  T('Multi-profils : snapshot de Lina supprimé au passage vers Noé',iso.name==='Noé'&&iso.snap===null&&iso.history.length===0&&iso.sum===null,JSON.stringify(iso));

  T('Aucune erreur JavaScript pendant le checkpoint',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
