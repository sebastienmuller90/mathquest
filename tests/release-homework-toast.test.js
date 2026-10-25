/* Audit de release (25/10/2026) — le toast de validation d'un devoir annonce les gains RÉELS (XP, pièces, bons points),
   y compris les bons points de la journée d'étude qualifiée par le 1er devoir du jour. Aucune modification de l'économie. */
const {serve,launchEngine,freshContext,wizard}=require('./release-lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const add=(p,n)=>p.evaluate(n=>{const id='hw_t'+n+'_'+Math.random().toString(36).slice(2,6);S.homework.push({id,title:'Devoir '+n,subject:'p-maths',due:'',note:'',status:'claimed',createdAt:Date.now()+n,claimedAt:Date.now(),validatedAt:0,rewardedAt:0,rewardDay:'',reward:null});saveLocal();return id;},n);
  const val=async(p,id)=>{const a=await p.evaluate(()=>({xp:S.xp,c:S.coins,m:S.merit.pts,h:S.merit.hist.length}));
   const r=await p.evaluate(id=>{const t=document.getElementById('toast');if(t)t.textContent='';const ok=MQHomework.validate(id);return {ok,txt:document.getElementById('toast')?document.getElementById('toast').textContent:''};},id);
   const z=await p.evaluate(()=>({xp:S.xp,c:S.coins,m:S.merit.pts,h:S.merit.hist.length}));
   return {...r,dx:z.xp-a.xp,dc:z.c-a.c,dm:z.m-a.m,dh:z.h-a.h};};
  const say=(v,x,c,m)=>v.txt.includes(`+${x} XP`)&&v.txt.includes(`+${c} 🪙`)&&v.txt.includes(`+${m} 🎖️`)&&v.dx===x&&v.dc===c&&v.dm===m;
  // — Scénario A : journée non qualifiée —
  {const {ctx,p,errs}=await freshContext(b,url);await wizard(p,{name:'Alice',grade:'CE2',birth:'2017-05-05'});
   const q0=await p.evaluate(()=>MQEconomy.day.qualified);
   const h1=await add(p,1),h2=await add(p,2),h3=await add(p,3);
   const v1=await val(p,h1);
   T('1er devoir du jour : le toast annonce +15 XP, +3 pièces, +4 bons points dont 2 pour la journée d’étude réussie (gains réels)',!q0&&v1.ok&&say(v1,15,3,4)&&/dont 2 pour la journée d’étude réussie/.test(v1.txt),JSON.stringify(v1));
   const v2=await val(p,h2);
   T('2e devoir du jour : +15 XP, +3 pièces, +2 bons points, sans mention de journée',v2.ok&&say(v2,15,3,2)&&!/dont/.test(v2.txt),JSON.stringify(v2));
   const v3=await val(p,h3);
   T('3e devoir (plafond journalier atteint) : message de plafond, aucun gain, aucun chiffre de récompense annoncé',v3.ok&&/plafond/.test(v3.txt)&&!/\+\d+ XP/.test(v3.txt)&&v3.dx===0&&v3.dc===0&&v3.dm===0,JSON.stringify(v3));
   const again=await val(p,h1);
   T('Revalidation d’un devoir déjà validé : refusée, aucun gain, aucun toast de récompense',again.ok===false&&again.dx===0&&again.dc===0&&again.dm===0&&again.dh===0&&!/\+\d+ XP/.test(again.txt),JSON.stringify(again));
   const before=await p.evaluate(()=>({xp:S.xp,c:S.coins,m:S.merit.pts,hw:S.homework.map(h=>h.status+':'+!!h.rewardedAt).join()}));
   await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home');
   const rl=await val(p,h1);const rl2=await val(p,h2);const after=await p.evaluate(()=>({xp:S.xp,c:S.coins,m:S.merit.pts,hw:S.homework.map(h=>h.status+':'+!!h.rewardedAt).join()}));
   T('Rechargement puis revalidation : aucune double récompense (XP, pièces, bons points, statuts identiques)',!rl.ok&&!rl2.ok&&JSON.stringify(before)===JSON.stringify(after),JSON.stringify({before,after}));
   // Ligne « reward » côté parent : cohérente avec ce que le devoir a reçu lui-même (+15/+3/+2), le plafonné affiche +0
   const row=await p.evaluate(()=>{PARENT=true;parentScreen('suivi');return new Promise(r=>setTimeout(()=>r([...document.querySelectorAll('[data-homework-parent="1"] .hw-status')].map(x=>x.textContent.replace(/\s+/g,' '))),150));});
   T('Espace parent : la ligne de chaque devoir affiche ses gains propres (+15 XP · +3 🪙 · +2 🎖️ pour les deux récompensés, +0 pour le plafonné)',row.filter(t=>/\+15 XP · \+3 🪙 · \+2 🎖️/.test(t)).length===2&&row.filter(t=>/\+0 XP/.test(t)).length<=1,row.join(' || '));
   T('Aucune erreur JavaScript (scénario A)',!errs.length,errs.slice(0,3).join(' | '));await ctx.close();}
  // — Scénario B : journée DÉJÀ qualifiée avant le devoir —
  {const {ctx,p,errs}=await freshContext(b,url);await wizard(p,{name:'Bruno',grade:'CM1',birth:'2016-05-05',gender:'boy'});
   const q=await p.evaluate(()=>{MQEconomy.qualifyDay('test');return MQEconomy.day.qualified;});
   const h=await add(p,1);const v=await val(p,h);
   T('Journée déjà qualifiée : le 1er devoir annonce +15 XP, +3 pièces, +2 bons points, sans « journée d’étude »',q&&v.ok&&say(v,15,3,2)&&!/journée/.test(v.txt),JSON.stringify(v));
   T('Aucune erreur JavaScript (scénario B)',!errs.length,errs.slice(0,3).join(' | '));await ctx.close();}
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
