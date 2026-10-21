/* Économie anti-triche : question unique, rendement décroissant, assiduité et devoir du jour. */
const {serve,launch}=require('./lib');
const answerJS=`(correct)=>{const q=M.q,sel=s=>document.querySelector(s);if(q.type==='choice'){const i=correct?q.ans:(q.ans+1)%q.choices.length;document.querySelectorAll('.choice')[i].click();return;}if(q.type==='order'){const idx=[];let rest=normLang(q.ans,q.lang);const used=new Set();let guard=0;while(rest.length&&guard++<50){const i=q.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(normLang(t,q.lang)));if(i<0)break;used.add(i);idx.push(i);rest=rest.slice(normLang(q.tokens[i],q.lang).length).trim();}if(!correct)idx.reverse();idx.forEach(i=>document.querySelector('[data-a="otok:'+i+'"]').click());}else if(q.type==='multi')q.labels.forEach((_,i)=>sel('#in'+i).value=correct?String(q.ans[i]):'987654');else if(q.type==='num')sel('#in0').value=correct?String(q.ans):'987654';else if(q.type==='frac')sel('#in0').value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';else sel('#in0').value=correct?q.acc[0]:'zzzzqqq';const v=sel('[data-a="valid"]');if(v)v.click();}`;
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  await p.waitForFunction(()=>!!window.MQEconomy,{timeout:5000});
  const boot=await p.evaluate(()=>({loaded:!!MQEconomy,script:document.querySelectorAll('script[src="js/economy-anticheat.js"]').length,okRule:S.merit.rules.ok,costs:S.merit.rewards.map(x=>[x.id,x.c]),version:S.economy?.version}));
  T('Moteur anti-triche chargé ; plus de bon point par simple bonne réponse ; coûts par défaut recalibrés',boot.loaded&&boot.script===1&&boot.okRule===0&&boot.version===1&&boot.costs.find(x=>x[0]==='r1')?.[1]===60&&boot.costs.find(x=>x[0]==='r4')?.[1]===500,JSON.stringify(boot));

  const ids=await p.evaluate(()=>ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).slice(0,2).map(c=>c.id));
  T('Deux chapitres du niveau courant sont disponibles',ids.length>=2,JSON.stringify(ids));

  const qlogic=await p.evaluate(([a,b])=>{
   S.economy={};MQEconomy.ensure();
   const q={type:'num',q:'Combien font 7 + 5 ?',ans:12};
   const first=MQEconomy.quoteQuestion({cid:a,q,d:2,streak:1,mode:'mission',commit:true,ms:30000});
   const repeat=MQEconomy.quoteQuestion({cid:a,q,d:2,streak:9,mode:'mission',commit:true,ms:30000});
   const hint=MQEconomy.quoteQuestion({cid:b,q:{type:'num',q:'Combien font 8 + 5 ?',ans:13},d:2,hint:true,streak:1,mode:'mission',commit:false});
   const plain=MQEconomy.quoteQuestion({cid:b,q:{type:'num',q:'Combien font 8 + 5 ?',ans:13},d:2,hint:false,streak:1,mode:'mission',commit:false});
   const flash=MQEconomy.quoteQuestion({cid:b,q:{type:'num',q:'Combien font 9 + 5 ?',ans:14},d:3,streak:8,mode:'flash',commit:false});
   return {first,repeat,hint,plain,flash};
  },ids);
  T('Question déjà réussie : une seule récompense à vie',qlogic.first.xp>0&&qlogic.first.coins===1&&qlogic.repeat.repeat&&qlogic.repeat.xp===0&&qlogic.repeat.coins===0,JSON.stringify(qlogic));
  T('Indice : XP réduit et aucune pièce ; défi éclair : aucune économie farmable',qlogic.hint.xp<qlogic.plain.xp&&qlogic.hint.coins===0&&qlogic.flash.xp===0&&qlogic.flash.coins===0,JSON.stringify(qlogic));

  const cap=await p.evaluate(cid=>{
   S.economy={};MQEconomy.ensure();const out=[];
   for(let i=1;i<=13;i++)out.push(MQEconomy.quoteQuestion({cid,q:{type:'num',q:`Question unique ${i}`,ans:i},d:2,mode:'mission',commit:true,ms:25000}));
   return {factors:out.map(x=>x.factor),xp:out.map(x=>x.xp),coins:out.map(x=>x.coins),day:MQEconomy.day};
  },ids[0]);
  T('Même chapitre : 8 plein tarif, 4 à 50 %, puis rendement nul',cap.factors.slice(0,8).every(x=>x===1)&&cap.factors.slice(8,12).every(x=>x===.5)&&cap.factors[12]===0&&cap.xp[12]===0,JSON.stringify(cap.factors));

  const star=await p.evaluate(()=>({a:MQEconomy.stars(4,4),b:MQEconomy.stars(3,4),c:MQEconomy.stars(2,4),d:MQEconomy.stars(1,4)}));
  T('Petites séries : étoiles calculées en pourcentage, pas avec les anciens seuils 4/6/8',star.a===3&&star.b===2&&star.c===1&&star.d===0,JSON.stringify(star));

  const mission=await p.evaluate(cid=>{S.economy={};MQEconomy.ensure();const m={ids:[cid],n:8,ok:8,path:false};const a=MQEconomy.missionBonus(m),b=MQEconomy.missionBonus(m),p=MQEconomy.missionBonus({...m,ids:[cid+'-path'],path:{}});return {a,b,p};},ids[0]);
  T('Bonus de fin : une seule fois par mission/jour ; aucune prime de mission sur le devoir du jour',mission.a.xp===10&&mission.a.coins===2&&mission.b.xp===0&&mission.b.coins===0&&mission.p.xp===0&&mission.p.coins===0,JSON.stringify(mission));

  const diligence=await p.evaluate(([a,b])=>{
   S.economy={};S.streak={n:0,best:0,last:''};S.merit.pts=0;MQEconomy.ensure();
   MQEconomy.quoteQuestion({cid:a,q:{type:'num',q:'Seule question',ans:1},d:1,mode:'mission',commit:true,ms:30000});
   const one={qualified:MQEconomy.maybeQualify(),streak:S.streak.n,merit:S.merit.pts};
   for(let i=0;i<3;i++)MQEconomy.quoteQuestion({cid:a,q:{type:'num',q:`A ${i}`,ans:i},d:1,mode:'mission',commit:true,ms:45000});
   for(let i=0;i<3;i++)MQEconomy.quoteQuestion({cid:b,q:{type:'num',q:`B ${i}`,ans:i},d:1,mode:'mission',commit:true,ms:45000});
   const many={qualified:MQEconomy.maybeQualify(),streak:S.streak.n,merit:S.merit.pts,day:MQEconomy.day};return {one,many};
  },ids);
  T('Assiduité : une réponse ne suffit pas ; travail varié réel qualifie la journée',!diligence.one.qualified&&diligence.one.streak===0&&diligence.many.qualified&&diligence.many.streak===1&&diligence.many.merit>=2,JSON.stringify(diligence));

  const path=await p.evaluate(()=>{
   S.merit.rules.path=5;const lesson=(i)=>({kind:'lesson',status:'done',score:100,cid:'x'+i}),ans=Array.from({length:8},(_,i)=>({cid:'x',ok:true,ms:10000}));
   const fake={steps:[lesson(1),lesson(2),lesson(3),lesson(4),{kind:'exo',status:'done',answers:ans},{kind:'exo',status:'done',answers:ans}],chest:false};
   const g=pathChestGains(fake);const before=S.coins;M={path:{answers:[],streak:0,best:0,bonuses:[]},cid:'x',qt:Date.now()};const pb=pathAnswer(true),after=S.coins;M=null;return {g,pb,before,after};
  });
  T('Devoir du jour : coffre plafonné et ancien bonus pièces ×5 supprimé',path.g.coins<=12&&path.g.xp<=20&&path.g.merit<=5&&path.pb===0&&path.after===path.before,JSON.stringify(path));

  // Intégration réelle : la récompense historique est effectivement remplacée dans result().
  await p.evaluate(()=>{S.economy={};S.streak={n:0,best:0,last:''};S.merit.pts=0;MQEconomy.ensure();});
  await p.evaluate(cid=>startMission([cid],{n:2}),ids[0]);const pre=await p.evaluate(()=>({xp:S.xp,coins:S.coins,merit:S.merit.pts,streak:S.streak.n}));
  await p.evaluate(`(${answerJS})(true)`);await p.waitForSelector('#fb .fb.good');
  const real=await p.evaluate(()=>({dx:S.xp-arguments[0].xp,dc:S.coins-arguments[0].coins,dm:S.merit.pts-arguments[0].merit,streak:S.streak.n,note:document.querySelector('.eco-note')?.textContent||'',mxp:M?.xp||0,mcoins:M?.coins||0}),pre);
  T('Intégration : vraie bonne réponse utilise le nouveau barème, sans 🎖️ ni streak instantané',real.dx>0&&real.dx<=12&&real.dc<=1&&real.dm===0&&real.streak===0&&/Nouvelle question|récompens/.test(real.note)&&real.mxp===real.dx&&real.mcoins===real.dc,JSON.stringify({pre,real}));

  await p.evaluate(()=>rewardsScreen());const rewardTxt=await p.locator('.how').innerText();
  T('Écran récompenses : règles anti-farm expliquées à l’enfant',/journée d’étude qualifiée/i.test(rewardTxt)&&/ne donne plus de/.test(rewardTxt)&&/révision programmée/i.test(rewardTxt),rewardTxt);
  T('Aucune erreur JavaScript pendant l’audit économie',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
