/* P4 (01/11/2026) — chat Finot et clavier virtuel Android.
   Sur Android, l'ouverture du clavier RÉDUIT la WebView (mesuré sur l'émulateur Pixel API 36 : 840 → 528 px CSS en
   portrait). Le panneau #finotchat (72vh) rétrécit avec elle, mais les suggestions ne pouvaient pas rétrécir : le champ
   « Pose ta question » et « Envoyer » étaient poussés hors du panneau, sous le clavier.
   Le test reproduit ce redimensionnement (Playwright ne sait pas ouvrir un vrai clavier) et vérifie que la saisie reste
   visible et atteignable, que la conversation garde de la place et défile, puis que tout revient à la fermeture. */
const {serve,launch,seedProfile,main}=require('./lib');

/* Mesure, dans la page, de l'état du chat ouvert. */
function MEASURE(){
  const H=innerHeight,chat=document.getElementById('finotchat'),cr=chat.getBoundingClientRect();
  const R=e=>{const r=e.getBoundingClientRect();return {t:r.top,b:r.bottom,l:r.left,r:r.right,w:r.width,h:r.height};};
  const hit=e=>{const r=e.getBoundingClientRect();if(r.width<1||r.height<1)return false;const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!t&&(t===e||e.contains(t));};
  const inp=document.getElementById('finotin'),send=document.querySelector('#finotchat [data-a="finotsend"]'),body=document.getElementById('fchBody');
  const inside=(r)=>r.t>=cr.top-1&&r.b<=cr.bottom+1&&r.b<=H+1&&r.t>=-1;
  const hidden=[...chat.querySelectorAll('button,input')].filter(e=>getComputedStyle(e).display!=='none').filter(e=>{const r=R(e);return r.b>H+1&&!e.closest('.fch-chips');}).map(e=>(e.id||e.dataset.a||e.textContent.trim()).slice(0,20));
  return {H,chat:R(chat),inp:R(inp),send:R(send),inpIn:inside(R(inp)),sendIn:inside(R(send)),inpHit:hit(inp),sendHit:hit(send),
    bodyH:Math.round(body.clientHeight),bodyScroll:body.scrollHeight>body.clientHeight,hidden,focus:document.activeElement===inp,docScrollY:Math.round(scrollY)};
}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const {srv,url}=await serve();const b=await launch();
 // [nom, viewport sans clavier, hauteur avec clavier, place minimale de la conversation] — hauteurs mesurées sur l'émulateur
 // (portrait 840 → 528, paysage 360 → 122) ; en paysage il ne reste presque rien : la saisie passe avant la conversation
 const CASES=[['Portrait 390×844',390,844,528,40],['Petit téléphone 360×640',360,640,330,40],['Paysage 864×360',864,360,122,1]];
 try{for(const [nm,w,h,kh,minBody] of CASES){
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Clavier','CM1');
  await p.evaluate(()=>{ACT.home();finotOpen();});await p.waitForTimeout(350);
  // une conversation assez longue pour devoir défiler
  for(const q of ['C’est quoi les XP ?','Comment débloquer un thème ?','Comment marche mon lien avec toi ?']){await p.fill('#finotin',q);await p.press('#finotin','Enter');await p.waitForTimeout(120);}
  await p.focus('#finotin');
  // le clavier s'ouvre : la WebView rétrécit
  await p.setViewportSize({width:w,height:kh});await p.waitForTimeout(250);
  const k=await p.evaluate(MEASURE);
  T(`${nm} clavier ouvert : « Pose ta question » entièrement visible dans le panneau, au-dessus du clavier`,k.inpIn&&k.inpHit,JSON.stringify({inp:k.inp,chat:k.chat,H:k.H}));
  T(`${nm} clavier ouvert : bouton Envoyer visible et cliquable`,k.sendIn&&k.sendHit,JSON.stringify({send:k.send,chat:k.chat,H:k.H}));
  T(`${nm} clavier ouvert : aucun contrôle du chat caché sous le clavier`,!k.hidden.length,k.hidden.join(', '));
  T(`${nm} clavier ouvert : la conversation garde de la place et défile`,k.bodyH>=minBody&&k.bodyScroll,JSON.stringify({bodyH:k.bodyH,scroll:k.bodyScroll}));
  // les suggestions restent atteignables (par défilement si besoin)
  const chipOk=await p.evaluate(()=>{const cs=[...document.querySelectorAll('#fchChips button')];const last=cs[cs.length-1];if(!last)return true;last.scrollIntoView({block:'nearest'});const r=last.getBoundingClientRect(),t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!t&&(t===last||last.contains(t));});
  T(`${nm} clavier ouvert : la dernière suggestion reste atteignable`,chipOk);
  // envoi pendant que le clavier est ouvert
  await p.fill('#finotin','Ce que je dois revoir');await p.click('#finotchat [data-a="finotsend"]',{timeout:2000}).catch(()=>{});await p.waitForTimeout(150);
  const sent=await p.evaluate(()=>[...document.querySelectorAll('#fchBody .fch-msg.you')].some(m=>/Ce que je dois revoir/.test(m.textContent)));
  T(`${nm} clavier ouvert : l'envoi fonctionne`,sent);
  // le clavier se ferme
  await p.setViewportSize({width:w,height:h});await p.waitForTimeout(250);
  const c=await p.evaluate(MEASURE);
  T(`${nm} clavier fermé : saisie et envoi visibles, panneau revenu à sa taille`,c.inpIn&&c.sendIn&&c.inpHit&&Math.abs(c.chat.h-Math.max(h*0.72,Math.min(c.H,352)))<4,JSON.stringify({chat:c.chat,H:c.H}));
  T(`${nm} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
  await ctx.close();}}
 finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
