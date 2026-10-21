/* Défis famille — baseline équitable, profils de niveaux différents, historique et 320 px. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844},timezoneId:'Europe/Paris'});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQFamilyChallenges,{timeout:5000});
  const alice=await p.evaluate(()=>ACTIVE);
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');const bob=await p.evaluate(()=>ACTIVE);
  const setup=await p.evaluate(([alice,bob])=>{const A=PDB.profiles[alice],B=PDB.profiles[bob];A.totalQ=1200;A.totalOk=1080;A.xp=9000;A.answerLog=[];A.activityLog=[];B.totalQ=12;B.totalOk=7;B.xp=80;B.answerLog=[];B.activityLog=[];const ca=ALLCH.find(c=>WMAP[c.id]?.lvl===A.grade),cb=ALLCH.find(c=>WMAP[c.id]?.lvl===B.grade);A.recent[ca.id]=[1,1,1,1,1,1,1,1];A.chap[ca.id]={ok:50,tot:50,stars:3};MQAdaptive.refreshMastery(A,ca.id);B.recent[cb.id]=[0,0,1,0,0];B.chap[cb.id]={ok:1,tot:5,stars:0};MQAdaptive.refreshMastery(B,cb.id);saveLocal();const ch=MQFamilyChallenges.start([alice,bob],'Défi test',7);return {id:ch.id,start:ch.startedAt,end:ch.endsAt,ca:ca.id,cb:cb.id,baseA:ch.baseline[alice],baseB:ch.baseline[bob],oldA:{q:A.totalQ,xp:A.xp},oldB:{q:B.totalQ,xp:B.xp}};},[alice,bob]);
  T('Départ : baseline propre à chaque profil malgré des historiques très différents',setup.baseA.totalQ===1200&&setup.baseB.totalQ===12&&setup.oldA.xp>setup.oldB.xp&&setup.end>setup.start,JSON.stringify(setup));

  const scored=await p.evaluate(({alice,bob,setup})=>{const ch=MQFamilyChallenges.current(),A=PDB.profiles[alice],B=PDB.profiles[bob],t=ch.startedAt;
    // Lina, pourtant historiquement très avancée, fait seulement 2 réponses sur un seul jour.
    A.answerLog.push({t:t+3600000,cid:setup.ca,ok:true},{t:t+3700000,cid:setup.ca,ok:true});A.totalQ+=2;A.totalOk+=2;
    // Noé travaille sur 3 jours et fait progresser une notion faible.
    for(let i=0;i<12;i++){const day=i%3,BT=t+day*86400000+3600000+i*1000;B.answerLog.push({t:BT,cid:setup.cb,ok:i<10});B.totalQ++;if(i<10)B.totalOk++;}
    B.recent[setup.cb]=[1,1,1,1,1,1,1,1,1,1];B.chap[setup.cb]={ok:18,tot:20,stars:2};MQAdaptive.refreshMastery(B,setup.cb);saveLocal();const r=MQFamilyChallenges.ranking(ch,t+4*86400000);return {r,a:MQFamilyChallenges.scoreProfile(alice,ch,t+4*86400000),b:MQFamilyChallenges.scoreProfile(bob,ch,t+4*86400000)};},{alice,bob,setup});
  T('Équité : le profil qui progresse pendant le défi bat celui qui avait beaucoup plus d’XP avant',scored.r[0]?.pid===bob&&scored.b.score>scored.a.score&&scored.a.q===2&&scored.b.q===12,JSON.stringify(scored));
  T('Score transparent : 4 composantes bornées et total ≤ 100',scored.r.every(x=>x.effort<=35&&x.regularity<=25&&x.learning<=25&&x.quality<=15&&x.score===x.effort+x.regularity+x.learning+x.quality&&x.score<=100),JSON.stringify(scored.r));

  const civil=await p.evaluate(()=>{const t=new Date('2026-03-27T18:00:00+01:00').getTime(),e=MQFamilyChallenges.civilAdd(t,7),a=new Date(t),b=new Date(e);return {start:a.toLocaleString('sv-SE'),end:b.toLocaleString('sv-SE'),hourA:a.getHours(),hourB:b.getHours(),hours:(e-t)/3600000};});
  T('Durée : 7 jours civils Europe/Paris restent 7 dates même au changement d’heure',civil.hourA===civil.hourB&&civil.hours!==168&&/^2026-04-03/.test(civil.end),JSON.stringify(civil));

  // Le défi est partagé au niveau PDB : changer de profil ne crée pas un second défi.
  const shared=await p.evaluate(([alice,bob])=>{const before=MQFamilyChallenges.current()?.id;activateProfile(alice,false);const a=MQFamilyChallenges.current()?.id;activateProfile(bob,false);const b=MQFamilyChallenges.current()?.id;return {before,a,b};},[alice,bob]);
  T('Partage appareil : le même défi est visible depuis tous les profils',shared.before===setup.id&&shared.a===setup.id&&shared.b===setup.id,JSON.stringify(shared));

  await p.evaluate(()=>MQFamilyChallenges.screen());await p.waitForSelector('.mq-family-rank');const ui=await p.evaluate(()=>({rows:document.querySelectorAll('.mq-family-rank').length,components:[...document.querySelectorAll('.mq-family-rank')].map(x=>x.querySelectorAll('.mq-family-components span').length),overflow:document.documentElement.scrollWidth-innerWidth,text:document.querySelector('.mq-family')?.innerText||''}));
  T('UI : classement lisible avec 4 composantes par participant et explication du score',ui.rows===2&&ui.components.every(n=>n===4)&&/effort 35.*régularité 25.*maîtrise 25.*qualité 15/is.test(ui.text)&&ui.overflow<=1,JSON.stringify(ui));

  const done=await p.evaluate(()=>{const before=MQFamilyChallenges.current();const final=MQFamilyChallenges.finalize(true),store=MQFamilyChallenges.db();return {before:before?.id,final:final?.id,active:store.active,history:store.history.length,winner:store.history[0]?.finalRanking?.[0]?.name};});
  T('Fin de défi : résultat figé dans l’historique, défi actif supprimé',done.before===setup.id&&done.final===setup.id&&!done.active&&done.history===1&&done.winner==='Noé',JSON.stringify(done));

  await p.evaluate(()=>{HOMETAB='progres';home();});await p.waitForTimeout(80);const access=await p.evaluate(()=>({button:!!document.querySelector('[data-a="familychallenges"]'),tabs:document.querySelectorAll('#hometabs .htab').length}));
  T('Navigation : Défis famille apparaît dans Progrès sans ajouter d’onglet principal',access.button&&access.tabs===4,JSON.stringify(access));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>MQFamilyChallenges.screen());await p.waitForTimeout(60);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-family')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : aucun débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les défis famille',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
