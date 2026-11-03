// Issue #54 — test de régression du chat Finot : la première bulle d'accueil doit être entièrement visible dans la
// conversation sur les petits écrans portrait, la saisie et « Envoyer » restent visibles (clavier ouvert, police agrandie),
// les suggestions défilent au lieu d'écraser la conversation. Aucune injection CSS : le produit réel est mesuré.
const {serve,launch,seedProfile,main}=require('./lib');

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();
 const CASES=[['Portrait 320×568',320,568],['Petit téléphone 360×640',360,640],['Téléphone 412×915',412,915],['Tablette 768×1024',768,1024],['Paysage court 864×360',864,360]];
 const measure=p=>p.evaluate(()=>{
  const chat=document.getElementById('finotchat'),body=document.getElementById('fchBody');
  const first=body&&body.querySelector('.fch-msg');
  if(!chat||!body||!first)return {missing:true};
  const br=body.getBoundingClientRect(),r=first.getBoundingClientRect();
  const inp=document.getElementById('finotin').getBoundingClientRect(),snd=document.querySelector('[data-a=finotsend]').getBoundingClientRect();
  const vis=x=>x.top>=-1&&x.bottom<=innerHeight+1&&x.height>10&&x.width>10;
  return {H:innerHeight,body:{top:br.top,bottom:br.bottom,height:br.height},first:{top:r.top,bottom:r.bottom,height:r.height},
    fullyInBody:r.top>=br.top-1&&r.bottom<=br.bottom+1,fullyInViewport:r.top>=-1&&r.bottom<=innerHeight+1,
    inputVisible:vis(inp),sendVisible:vis(snd),hScroll:document.documentElement.scrollWidth>innerWidth+1};
 });
 const open=async(p)=>{await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(p.__url+'index.html',{waitUntil:'load'});await seedProfile(p,'Géométrie','CM1');await p.evaluate(()=>{ACT.home();finotOpen();});await p.waitForTimeout(350);};
 try{
  for(const [name,w,h] of CASES){
   const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true});
   await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
   const p=await ctx.newPage();p.__url=url;const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});
   await open(p);
   const g=await measure(p);
   T(`${name} : la bulle d'accueil existe`,!g.missing,JSON.stringify(g));
   T(`${name} : la bulle d'accueil est entièrement visible dans la conversation`,!g.missing&&g.fullyInBody&&g.fullyInViewport,JSON.stringify(g));
   T(`${name} : saisie et bouton Envoyer visibles, aucun défilement horizontal`,!g.missing&&g.inputVisible&&g.sendVisible&&!g.hScroll,JSON.stringify(g));
   // Clavier Android ouvert (la WebView est redimensionnée) : la saisie et Envoyer restent visibles.
   if(h>=560&&w<=420){
    await p.setViewportSize({width:w,height:Math.round(h*0.55)});await p.waitForTimeout(150);
    const k=await measure(p);
    T(`${name} : clavier ouvert (hauteur ${Math.round(h*0.55)} px) — saisie et Envoyer restent visibles`,!k.missing&&k.inputVisible&&k.sendVisible,JSON.stringify(k));
    await p.setViewportSize({width:w,height:h});await p.waitForTimeout(100);
   }
   // Police système agrandie (échelle 1,3 sur le rem) : la saisie reste accessible, la conversation défile.
   if(w<=420){
    await p.evaluate(()=>{document.documentElement.style.fontSize='130%';});await p.waitForTimeout(150);
    const f=await measure(p);
    T(`${name} : police agrandie 130 % — saisie et Envoyer visibles`,!f.missing&&f.inputVisible&&f.sendVisible&&!f.hScroll,JSON.stringify(f));
    await p.evaluate(()=>{document.documentElement.style.fontSize='';});
   }
   // Suggestions : le bloc défile (overflow) au lieu de repousser la saisie hors écran.
   const ch=await p.evaluate(()=>{const c=document.getElementById('fchChips');if(!c)return null;const cs=getComputedStyle(c);return {oy:cs.overflowY,h:c.getBoundingClientRect().height,n:c.children.length};});
   T(`${name} : suggestions défilantes (overflow-y)`,ch&&/auto|scroll/.test(ch.oy),JSON.stringify(ch));
   T(`${name} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
   await ctx.close();
  }
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)main(run);module.exports=run;
