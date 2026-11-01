/* Recette émulateurs (01/11/2026) — police système Android agrandie (Pixel API 36, police 200 %).
   La WebView applique la taille de police système à tout le texte (textZoom) : les libellés de la barre d'onglets
   doublent, les onglets (flex:1, largeur minimale = libellé) débordaient et « Plus » (accès à l'espace parent)
   sortait de l'écran ; avec l'affichage agrandi (317 px), « Progrès » aussi.
   Simulation : libellés des onglets × facteur de zoom ; chaque onglet doit rester dans l'écran, sans chevauchement,
   libellé entier visible, et « Plus » doit rester touchable. */
const {serve,launch,seedProfile,main}=require('./lib');
const CASES=[[412,840,2,'Pixel, police 200 %'],[317,641,2,'Pixel, police 200 % + affichage agrandi'],[360,640,1.3,'petit téléphone, police 130 %'],[360,640,2,'petit téléphone, police 200 %'],[412,840,1,'Pixel, police normale']];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const {srv,url}=await serve();const b=await launch();
 try{for(const [W,H,z,lab] of CASES){
  const ctx=await b.newContext({viewport:{width:W,height:H}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Grande Police','CM1');
  await p.evaluate(()=>ACT.home());await p.waitForTimeout(300);
  const r=await p.evaluate(async z=>{const nav=document.getElementById('hometabs');const l=nav&&nav.querySelector('.htl');if(!l)return {err:'barre d’onglets absente'};
    const fs=parseFloat(getComputedStyle(l).fontSize),st=document.createElement('style');st.textContent=`#hometabs .htl{font-size:${fs*z}px!important}`;document.head.appendChild(st);
    await new Promise(r=>setTimeout(r,150));
    const W=innerWidth,tabs=[...nav.querySelectorAll('.htab')].map(t=>{const r=t.getBoundingClientRect(),lr=t.querySelector('.htl').getBoundingClientRect(),c=document.elementFromPoint(Math.min(Math.max(r.left+r.width/2,0),W-1),r.top+r.height/2);
      return {a:t.dataset.a,l:Math.round(r.left),r:Math.round(r.right),inView:r.left>=-1&&r.right<=W+1,labelIn:lr.left>=r.left-1&&lr.right<=r.right+1,hit:!!c&&t.contains(c)}});
    let overlap=0;for(let i=1;i<tabs.length;i++)if(tabs[i].l<tabs[i-1].r-1)overlap++;
    // bas de page : le dernier bloc de l'accueil doit pouvoir remonter entièrement au-dessus de la barre
    const barTop=nav.getBoundingClientRect().top;scrollTo(0,document.documentElement.scrollHeight);await new Promise(r=>setTimeout(r,100));
    const kids=[...document.getElementById('app').children].filter(e=>e.getClientRects().length),last=kids[kids.length-1],lastBottom=last?Math.round(last.getBoundingClientRect().bottom):null;
    const fab=document.querySelector('.finot-fab.show'),fr=fab&&fab.getBoundingClientRect();
    return {fs,z,n:tabs.length,overlap,bad:tabs.filter(t=>!t.inView||!t.labelIn||!t.hit),barH:Math.round(nav.getBoundingClientRect().height),barTop:Math.round(barTop),lastBottom,fabBottom:fr?Math.round(fr.bottom):null};},z);
  T(`${lab} (${W} px) : les 5 onglets dans l’écran, libellés entiers, sans chevauchement, tous touchables`,!r.err&&r.n===5&&!r.overlap&&!r.bad.length,JSON.stringify(r));
  T(`${lab} : bouton Finot au-dessus de la barre et fin de l’accueil atteignable au-dessus de la barre`,!r.err&&(r.fabBottom===null||r.fabBottom<=r.barTop+1)&&r.lastBottom!==null&&r.lastBottom<=r.barTop+1,JSON.stringify({barTop:r.barTop,fabBottom:r.fabBottom,lastBottom:r.lastBottom}));
  T(`${lab} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
  await ctx.close();}
  // Constaté sur l'AVD : la police Nunito se charge après la première mesure ; les libellés s'élargissent sans que
  // la hauteur de la barre change, donc sans nouveau signal ResizeObserver. La barre doit être remesurée quand les
  // polices finissent de charger et à chaque nouveau rendu des onglets.
  for(const [how,trigger] of [['fin de chargement des polices',()=>document.fonts.dispatchEvent(new Event('loadingdone'))],['nouveau rendu de l’accueil',()=>ACT.home()]]){
   const ctx=await b.newContext({viewport:{width:412,height:840}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Grande Police','CM1');await p.evaluate(()=>ACT.home());await p.waitForTimeout(300);
   const r=await p.evaluate(async t=>{const w=ms=>new Promise(r=>setTimeout(r,ms)),nav=document.getElementById('hometabs'),st=document.createElement('style');document.head.appendChild(st);
     st.textContent='#hometabs .htl{font-size:24px!important;line-height:30px!important;letter-spacing:-4px!important}';await w(200);
     const before={tight:nav.classList.contains('htabs-tight'),sw:nav.scrollWidth,cw:nav.clientWidth,h:nav.offsetHeight};
     st.textContent='#hometabs .htl{font-size:24px!important;line-height:30px!important;letter-spacing:0!important}';await w(200);
     const mid={tight:nav.classList.contains('htabs-tight'),sw:nav.scrollWidth,h:nav.offsetHeight};
     (0,eval)('('+t+')')();await w(200);
     const plus=document.querySelector('#hometabs [data-a="hometab:plus"]').getBoundingClientRect();
     return {before,mid,after:{tight:nav.classList.contains('htabs-tight'),sw:nav.scrollWidth,cw:nav.clientWidth},plusRight:Math.round(plus.right),W:innerWidth};},trigger.toString());
   T(`Police 200 % (412 px), libellés élargis à hauteur constante puis ${how} : « Plus » revient dans l’écran`,!r.before.tight&&r.before.sw<=r.before.cw+1&&r.mid.sw>r.before.cw+1&&r.after.tight&&r.plusRight<=r.W+1,JSON.stringify(r));
   T(`Remesure après ${how} : aucune erreur JavaScript`,!errs.length,errs.join(' | '));
   await ctx.close();}}
 finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
