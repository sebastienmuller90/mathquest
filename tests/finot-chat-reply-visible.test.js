// Chat Finot : après une question, la réponse (et la question) doivent rester ENTIÈREMENT visibles dans la conversation sur les
// téléphones courants. Cause du défaut mesuré (capture Play 09, 04/11/2026) : les suggestions (.fch-chips) n'avaient aucune hauteur
// maximale et occupaient jusqu'à six rangées, ce qui écrasait la conversation. Les suggestions doivent défiler, pas grandir.
// Le produit réel est mesuré, sans injection CSS.
const {serve,launch,seedProfile,main}=require('./lib');

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,800)});
 const {srv,url}=await serve();const b=await launch();
 // [nom, largeur, hauteur, la question ET la réponse doivent être entières, police agrandie ×1,3 en plus]
 const CASES=[['Téléphone 360×800',360,800,true],['Grand téléphone 412×915',412,915,true],['Petit téléphone 360×640',360,640,false],['Portrait 320×568',320,568,false]];
 const measure=p=>p.evaluate(()=>{
  const body=document.getElementById('fchBody'),chips=document.querySelector('.fch-chips'),chat=document.getElementById('finotchat');
  const msgs=[...body.querySelectorAll('.fch-msg')],br=body.getBoundingClientRect();
  const inBody=m=>{const r=m.getBoundingClientRect();return r.top>=br.top-1&&r.bottom<=br.bottom+1;};
  const last=msgs[msgs.length-1],q=msgs.find(m=>m.classList.contains('you'));
  const cr=chips.getBoundingClientRect(),pr=chat.getBoundingClientRect();
  const inp=document.getElementById('finotin').getBoundingClientRect(),snd=document.querySelector('[data-a=finotsend]').getBoundingClientRect();
  return {n:msgs.length,lastIsReply:!!last&&last.classList.contains('finot')&&msgs.length>=3,replyFull:!!last&&inBody(last),questionFull:!!q&&inBody(q),
   bodyH:Math.round(br.height),chipsH:Math.round(cr.height),panelH:Math.round(pr.height),chipsShare:+(cr.height/pr.height).toFixed(2),
   chipsScrollable:chips.scrollHeight>chips.clientHeight+1,chipsOverflowY:getComputedStyle(chips).overflowY,
   inputVisible:inp.bottom<=innerHeight+1&&inp.top>=0,sendVisible:snd.bottom<=innerHeight+1&&snd.top>=0,hScroll:document.documentElement.scrollWidth>innerWidth+1};
 });
 try{
  for(const [name,w,h,both] of CASES){
   const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true});
   await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
   await seedProfile(p,'Réponse','CM1');
   await p.evaluate(()=>{ACT.home();finotOpen();});await p.waitForTimeout(350);
   await p.evaluate(()=>{const b=document.querySelector('#finotchat [data-a="finotsug:0"]');if(!b)throw new Error('suggestion 0 absente');b.click();});
   await p.waitForFunction(()=>document.querySelectorAll('#fchBody .fch-msg').length>=3,null,{timeout:8000}).catch(()=>{});
   await p.waitForTimeout(400);
   const m=await measure(p);
   T(`${name} : question posée, réponse reçue`,m.n>=3&&m.lastIsReply,JSON.stringify(m));
   T(`${name} : la réponse de Finot est entièrement visible dans la conversation`,m.replyFull,JSON.stringify(m));
   if(both)T(`${name} : la question et la réponse sont toutes deux entières`,m.questionFull&&m.replyFull,JSON.stringify(m));
   T(`${name} : les suggestions défilent (≤ 40 % du panneau, défilement vertical) au lieu d'écraser la conversation`,m.chipsShare<=0.4&&m.chipsOverflowY!=='visible'&&m.chipsOverflowY!=='hidden',JSON.stringify(m));
   T(`${name} : saisie et Envoyer visibles, aucun défilement horizontal`,m.inputVisible&&m.sendVisible&&!m.hScroll,JSON.stringify(m));
   // Aucune suggestion n'est perdue : toutes restent atteignables en faisant défiler leur zone.
   const reach=await p.evaluate(()=>{const c=document.querySelector('.fch-chips'),n=c.querySelectorAll('.fch-chip,button').length;const before=c.scrollTop;c.scrollTop=c.scrollHeight;const moved=c.scrollTop>=before;const last=[...c.querySelectorAll('.fch-chip,button')].pop();const r=last&&last.getBoundingClientRect(),cr=c.getBoundingClientRect();return {n,moved,lastVisible:!!r&&r.bottom<=cr.bottom+1&&r.top>=cr.top-1};});
   T(`${name} : toutes les suggestions restent atteignables (la dernière devient visible en défilant)`,reach.n>=5&&reach.lastVisible,JSON.stringify(reach));
   T(`${name} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
   await ctx.close();
  }
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
