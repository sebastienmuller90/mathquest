/* Carnet d'erreurs à réparer — vrais parcours navigateur.
   Vérifie : compatibilité données existantes, cible exacte, garde anti-réparation prématurée, récompense unique,
   échec sans faux positif, multi-profils et rendu 320 px. */
const {serve,launch,seedProfile}=require('./lib');
const answerJS=`(correct)=>{const q=M.q,sel=s=>document.querySelector(s);if(q.type==='choice'){const i=correct?q.ans:(q.ans+1)%q.choices.length;document.querySelectorAll('.choice')[i].click();return;}if(q.type==='order'){const idx=[];let rest=normLang(q.ans,q.lang);const used=new Set();let guard=0;while(rest.length&&guard++<50){const i=q.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(normLang(t,q.lang)));if(i<0)break;used.add(i);idx.push(i);rest=rest.slice(normLang(q.tokens[i],q.lang).length).trim();}if(!correct)idx.reverse();idx.forEach(i=>document.querySelector('[data-a="otok:'+i+'"]').click());}else if(q.type==='multi')q.labels.forEach((_,i)=>sel('#in'+i).value=correct?String(q.ans[i]):'987654');else if(q.type==='num')sel('#in0').value=correct?String(q.ans):'987654';else if(q.type==='frac')sel('#in0').value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';else sel('#in0').value=correct?q.acc[0]:'zzzzqqq';const v=sel('[data-a="valid"]');if(v)v.click();}`;
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,800)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const ans=c=>p.evaluate(`(${answerJS})(${c})`);const next=()=>p.evaluate(()=>{const b=document.querySelector('#fb [data-a="next"]');if(b)b.click();else if(M&&M.locked)advance();});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQErrorRepair,{timeout:5000});
  const setup=await p.evaluate(()=>{const cid=reco().id;MQAdaptive.recordMistake(S,cid,{q:'Erreur ancienne ciblée',answer:'42',expl:'Reprendre la méthode pas à pas.'});MQAdaptive.recordMistake(S,cid,{q:'Erreur plus récente',answer:'24',expl:'Vérifier le calcul.'});const a=S.mistakes[cid];a.find(x=>x.q==='Erreur ancienne ciblée').at-=60000;S.recent[cid]=[1,1];saveLocal();const all=MQErrorRepair.items();return {cid,n:all.length,target:all.find(x=>x.x.q==='Erreur ancienne ciblée')?.key,newer:all.find(x=>x.x.q==='Erreur plus récente')?.key,fields:Object.keys(all[0]||{})};});
  T('Données existantes réutilisées : deux erreurs deviennent des cartes sans migration destructive',setup.n>=2&&setup.target&&setup.newer,JSON.stringify(setup));

  await p.evaluate(()=>ACT.mistakes());await p.waitForSelector('.er-card');
  const ui=await p.evaluate(()=>({title:document.querySelector('.bar h1')?.textContent||document.querySelector('h1')?.textContent,cards:document.querySelectorAll('.er-card').length,buttons:document.querySelectorAll('[data-a^="repairerror:"]').length,overflow:document.documentElement.scrollWidth-innerWidth}));
  T('Écran enfant : cartes de réparation, actions ciblées et aucun débordement',ui.cards>=2&&ui.buttons>=2&&ui.overflow<=1,JSON.stringify(ui));

  await p.evaluate(k=>ACT.repairerror(k),setup.target);await p.waitForSelector('.qcard');
  const start=await p.evaluate(k=>({active:MQErrorRepair.active?.key,queue:M?.queue?.length,n:M?.n,target:MQErrorRepair.find(k)?.x?.q,first:S.mistakes[M.cid][0]?.q}),setup.target);
  T('La mission cible exactement la carte choisie et comporte 3 questions',start.active===setup.target&&start.n===3&&start.queue===3&&start.target==='Erreur ancienne ciblée'&&start.first==='Erreur ancienne ciblée',JSON.stringify(start));

  // Les 2 bonnes réponses historiques ne doivent PAS réparer l'erreur dès la première bonne réponse de la mini-mission.
  await ans(true);await p.waitForSelector('#fb .fb');const early=await p.evaluate(k=>({seen:MQErrorRepair.find(k)?.x?.seen||0,streak:MQErrorRepair.find(k)?.streak||0}),setup.target);
  T('Garde anti-faux positif : 2 bonnes réponses anciennes + 1 nouvelle ne réparent pas la carte',!early.seen,JSON.stringify(early));await next();
  await ans(true);await p.waitForSelector('#fb .fb');await next();
  await ans(true);await p.waitForSelector('#fb .fb');await next();await p.waitForTimeout(120);
  const repaired=await p.evaluate(([target,newer])=>{const a=MQErrorRepair.find(target),b=MQErrorRepair.find(newer);return {targetSeen:a?.x?.seen||0,newerSeen:b?.x?.seen||0,reward:S.errorRepair?.rewarded?.[target]||0,coins:S.coins,cur:CUR,m:!!M};},[setup.target,setup.newer]);
  T('3/3 : seule l’erreur choisie est réparée et la récompense est marquée une seule fois',repaired.targetSeen>0&&!repaired.newerSeen&&repaired.reward>0,JSON.stringify(repaired));
  const coinsAfter=repaired.coins;await p.evaluate(()=>MQErrorRepair.screen());await p.waitForSelector('.er-card');const noDouble=await p.evaluate(()=>S.coins);
  T('Réouverture du carnet : aucune récompense doublée',noDouble===coinsAfter,JSON.stringify({coinsAfter,noDouble}));

  // Échec de réparation : une faute au milieu empêche le statut réparé.
  const fail=await p.evaluate(()=>{const cid=reco().id;MQAdaptive.recordMistake(S,cid,{q:'Erreur à retenter',answer:'7',expl:'Encore un essai.'});saveLocal();return MQErrorRepair.items().find(x=>x.x.q==='Erreur à retenter')?.key;});
  await p.evaluate(k=>ACT.repairerror(k),fail);await p.waitForSelector('.qcard');
  await ans(true);await p.waitForSelector('#fb .fb');await next();await ans(false);await p.waitForSelector('#fb .fb');await next();await ans(true);await p.waitForSelector('#fb .fb');await next();await p.waitForTimeout(120);
  const failed=await p.evaluate(k=>({seen:MQErrorRepair.find(k)?.x?.seen||0,reward:S.errorRepair?.rewarded?.[k]||0}),fail);
  T('Mission non parfaite : la carte reste à réparer et aucune récompense n’est donnée',!failed.seen&&!failed.reward,JSON.stringify(failed));

  // Nouveau profil : erreurs et récompenses restent isolées.
  await p.evaluate(()=>createProfile());await seedProfile(p,'Noé','CM1');await p.waitForTimeout(100);
  const iso=await p.evaluate(()=>({name:S.name,items:MQErrorRepair.items().length,rewarded:Object.keys(S.errorRepair?.rewarded||{}).length}));
  T('Multi-profils : le second enfant ne voit ni erreurs ni récompenses du premier',iso.name==='Noé'&&iso.items===0&&iso.rewarded===0,JSON.stringify(iso));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>ACT.mistakes());await p.waitForTimeout(50);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,w:document.querySelector('#app')?.getBoundingClientRect().width||0}));
  T('Mobile 320 px : carnet sans débordement horizontal',mobile.overflow<=1,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant le parcours de réparation',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
