/* Pourquoi cette activité ? — explications fondées sur des preuves, sans modifier la progression. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  await p.waitForFunction(()=>!!window.MQWhyActivity,{timeout:5000});
  const boot=await p.evaluate(()=>({loaded:!!MQWhyActivity,js:document.querySelectorAll('script[src="js/why-this-activity.js"]').length,css:document.querySelectorAll('link[href="js/why-this-activity.css"]').length}));
  T('Module « Pourquoi ? » chargé statiquement une seule fois',boot.loaded&&boot.js===1&&boot.css===1,JSON.stringify(boot));

  const prepared=await p.evaluate(()=>{const cs=ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).slice(0,4);if(cs.length<4)return {err:'chapitres insuffisants'};const [mist,due,weak,plain]=cs;S.mistakes[mist.id]=[{q:'x',answer:'y',expl:'',at:Date.now(),seen:0}];S.chap[mist.id]={ok:1,tot:4,stars:0};S.recent[mist.id]=[false,false,true,false];S.review[due.id]={last:Date.now()-86400000,next:Date.now()-1,days:1};S.chap[due.id]={ok:4,tot:6,stars:1};S.recent[due.id]=[true,true,false,true];S.chap[weak.id]={ok:1,tot:5,stars:0};S.recent[weak.id]=[false,false,true,false];const out={ids:{mist:mist.id,due:due.id,weak:weak.id,plain:plain.id},mist:MQWhyActivity.evidence(mist.id),due:MQWhyActivity.evidence(due.id),weak:MQWhyActivity.evidence(weak.id),plain:MQWhyActivity.evidence(plain.id)};return out;});
  T('Preuve prioritaire : une erreur non réparée est expliquée en premier',!prepared.err&&prepared.mist.primary.id==='error'&&/erreur/.test(prepared.mist.primary.title.toLowerCase()),JSON.stringify(prepared.mist));
  T('Preuve prioritaire : une révision due est explicitement reconnue',prepared.due.items.some(x=>x.id==='due')&&prepared.due.primary.id==='due',JSON.stringify(prepared.due));
  T('Fragilité : le moteur expose une faiblesse réelle sans inventer d’urgence',prepared.weak.items.some(x=>['recent','mastery','skill'].includes(x.id)),JSON.stringify(prepared.weak));
  T('Aucune preuve : fallback honnête « entraînement de ton niveau »',prepared.plain.items.length===1&&prepared.plain.primary.id==='level'&&/Aucun signal d’urgence/.test(prepared.plain.primary.text),JSON.stringify(prepared.plain));

  await p.evaluate(id=>startMission([id],{n:2}),prepared.ids.mist);await p.waitForSelector('[data-a="whyactivity"]');
  const before=await p.evaluate(()=>({xp:S.xp,coins:S.coins,totalQ:S.totalQ,mastery:JSON.stringify(S.mastery),i:M.i,cid:M.cid,q:String(M.q?.q||'')}));
  await p.click('[data-a="whyactivity"]');await p.waitForSelector('.mq-why-card');
  const opened=await p.evaluate(()=>({expanded:document.querySelector('[data-a="whyactivity"]')?.getAttribute('aria-expanded'),text:document.querySelector('.mq-why-card')?.textContent||'',count:document.querySelectorAll('.mq-why-item').length}));
  const during=await p.evaluate(()=>({xp:S.xp,coins:S.coins,totalQ:S.totalQ,mastery:JSON.stringify(S.mastery),i:M.i,cid:M.cid,q:String(M.q?.q||'')}));
  T('Mission : bouton injecté et panneau explique la raison sans jargon de score interne',opened.expanded==='true'&&opened.count>=1&&/Pourquoi maintenant/.test(opened.text)&&/Ce n’est pas un jugement/.test(opened.text),JSON.stringify(opened));
  T('Lecture de l’explication : zéro mutation XP/pièces/progression/question',JSON.stringify(before)===JSON.stringify(during),JSON.stringify({before,during}));

  await p.click('[data-a="whyactivity"]');
  const closed=await p.evaluate(()=>({card:!!document.querySelector('.mq-why-card'),expanded:document.querySelector('[data-a="whyactivity"]')?.getAttribute('aria-expanded')}));
  T('Bouton : ouverture/fermeture idempotente avec aria-expanded correct',!closed.card&&closed.expanded==='false',JSON.stringify(closed));

  const path=await p.evaluate(id=>{M.path=true;M.cid=id;return MQWhyActivity.evidence(id);},prepared.ids.plain);
  T('Parcours du jour : cette raison est exposée quand elle est réellement active',path.items.some(x=>x.id==='path'),JSON.stringify(path));

  const flash=await p.evaluate(()=>{const old=M.flash;M.flash=true;const qb=document.querySelector('.qbtns');qb?.querySelector('[data-a="whyactivity"]')?.remove();const ok=MQWhyActivity.inject({M});M.flash=old;return {ok,btn:!!qb?.querySelector('[data-a="whyactivity"]')};});
  T('Défi éclair : aucune explication adaptative ajoutée',flash.ok===false&&!flash.btn,JSON.stringify(flash));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{M.path=false;document.querySelector('.qbtns')?.querySelector('[data-a="whyactivity"]')?.remove();MQWhyActivity.inject({M});});await p.click('[data-a="whyactivity"]');
  const mobile=await p.evaluate(()=>{const c=document.querySelector('.mq-why-card'),r=c.getBoundingClientRect();return {left:r.left,right:r.right,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,btn:document.querySelector('[data-a="whyactivity"]')?.getBoundingClientRect().width||0};});
  T('Mobile 320 px : panneau et bouton restent utilisables sans débordement',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1&&mobile.btn>80,JSON.stringify(mobile));

  T('Aucune erreur JavaScript pendant la transparence adaptative',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
