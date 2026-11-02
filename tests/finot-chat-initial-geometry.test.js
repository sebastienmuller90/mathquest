// Issue #54 — garde-fou géométrique du chat Finot à l'ouverture initiale.
// Aucun correctif produit ici : le test dit objectivement si la première bulle
// est entièrement visible, puis valide séparément l'hypothèse CSS 9rem par injection temporaire.
const {serve,launch,seedProfile,main}=require('./lib');

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();
 const CASES=[['Portrait 320×568',320,568],['Petit téléphone 360×640',360,640],['Paysage court 864×360',864,360]];
 const measure=p=>p.evaluate(()=>{
  const chat=document.getElementById('finotchat'),body=document.getElementById('fchBody');
  const first=body&&body.querySelector('.fch-msg');
  if(!chat||!body||!first)return {missing:true};
  const cr=chat.getBoundingClientRect(),br=body.getBoundingClientRect(),r=first.getBoundingClientRect();
  return {
    H:innerHeight,
    body:{top:br.top,bottom:br.bottom,height:br.height,scrollTop:body.scrollTop},
    chat:{top:cr.top,bottom:cr.bottom,height:cr.height},
    first:{top:r.top,bottom:r.bottom,height:r.height},
    fullyInBody:r.top>=br.top-1&&r.bottom<=br.bottom+1,
    fullyInViewport:r.top>=-1&&r.bottom<=innerHeight+1,
    partialTop:r.top<br.top-1&&r.bottom>br.top+1,
    partialBottom:r.bottom>br.bottom+1&&r.top<br.bottom-1
  };
 });
 try{
  for(const [name,w,h] of CASES){
   const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true});
   await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});
   await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});
   await p.goto(url+'index.html',{waitUntil:'load'});
   await seedProfile(p,'Géométrie','CM1');
   await p.evaluate(()=>{ACT.home();finotOpen();});
   await p.waitForTimeout(350);

   const g=await measure(p);
   T(`${name} : la bulle d'accueil existe`,!g.missing,JSON.stringify(g));
   // Ces assertions restent volontairement RED tant que le produit n'est pas corrigé.
   T(`${name} : la bulle d'accueil est entièrement visible dans la conversation`,!g.missing&&g.fullyInBody&&!g.partialTop&&!g.partialBottom,JSON.stringify(g));
   T(`${name} : la bulle d'accueil reste entièrement dans la WebView`,!g.missing&&g.fullyInViewport,JSON.stringify(g));

   // Diagnostic seulement : vérifier qu'un unique changement min-height 6rem -> 9rem suffit,
   // sans modifier styles.css ni sw.js sur cette branche pendant l'investigation PWA parallèle.
   await p.addStyleTag({content:'.fch-body{min-height:min(9rem,30vh)!important}'});
   await p.waitForTimeout(50);
   const h9=await measure(p);
   T(`${name} : diagnostic 9rem rend la bulle entièrement visible`,!h9.missing&&h9.fullyInBody&&!h9.partialTop&&!h9.partialBottom&&h9.fullyInViewport,JSON.stringify(h9));
   T(`${name} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
   await ctx.close();
  }
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)main(run);module.exports=run;
