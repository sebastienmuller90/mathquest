/* P3-E — Finot flottant ne doit pas masquer l'Aide aux devoirs.
   1) Sur l'accueil, toute la carte cliquable « Aide aux devoirs » doit rester hors de la boîte du FAB pendant le scroll.
   2) Une fois l'aide ouverte, Finot est déjà présent dans l'expérience : le FAB flottant doit rester masqué,
      afin de ne recouvrir aucun bouton matière/thème/action sur petit mobile Android. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const errs=[];
 try{
  for(const vp of [{width:320,height:720},{width:360,height:800},{width:390,height:844}]){
   const p=await b.newPage({viewport:vp});p.on('pageerror',e=>errs.push(`${vp.width}x${vp.height}: ${e.message}`));
   await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Finot devoirs','6e');

   await p.evaluate(()=>home());await p.waitForTimeout(180);
   const homeProbe=await p.evaluate(async()=>{
    const fab=document.querySelector('.finot-fab.show'),card=document.querySelector('[data-homework-help-card]'),arrow=card?.lastElementChild;
    if(!fab||!card||!arrow)return {fab:!!fab,card:!!card,arrow:!!arrow,hits:[]};
    const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
    const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),hits=[];
    const ys=[...new Set([0,max,...Array.from({length:Math.ceil(max/32)+1},(_,i)=>Math.min(max,i*32))])];
    for(const y of ys){scrollTo(0,y);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const fr=fab.getBoundingClientRect(),cr=card.getBoundingClientRect(),ar=arrow.getBoundingClientRect(),area=overlap(fr,cr);if(area>2)hits.push({y,area:Math.round(area),fab:[Math.round(fr.left),Math.round(fr.top),Math.round(fr.right),Math.round(fr.bottom)],card:[Math.round(cr.left),Math.round(cr.top),Math.round(cr.right),Math.round(cr.bottom)],arrowVisible:ar.width>2&&ar.height>2});}
    const ar=arrow.getBoundingClientRect();return {fab:true,card:true,arrow:true,arrowVisible:ar.width>2&&ar.height>2,max,hits:hits.slice(0,8)};
   });
   T(`Accueil ${vp.width}×${vp.height} : Finot ne recouvre jamais la carte Aide aux devoirs`,homeProbe.fab&&homeProbe.card&&homeProbe.arrow&&homeProbe.arrowVisible&&!homeProbe.hits.length,JSON.stringify(homeProbe));

   const ids=await p.evaluate(()=>{const s=MQHomeworkHelp.subjects().find(x=>MQHomeworkHelp.chapters(x.id).length);const c=s&&MQHomeworkHelp.chapters(s.id)[0];return {sid:s?.id||'',cid:c?.id||''};});
   const routes=[['intro',()=>p.evaluate(()=>MQHomeworkHelp.open())],['matière',()=>p.evaluate(s=>ACT.hhsubject(s),ids.sid)],['thème',()=>p.evaluate(c=>ACT.hhtopic(c),ids.cid)]];
   for(const [label,open] of routes){
    await open();await p.waitForTimeout(100);
    const probe=await p.evaluate(()=>({cur:CUR,exists:!!document.querySelector('.finot-fab'),shown:!!document.querySelector('.finot-fab.show'),hidden:document.querySelector('.finot-fab')?.getAttribute('aria-hidden')}));
    T(`Aide aux devoirs ${label} ${vp.width}×${vp.height} : Finot flottant masqué`,probe.cur==='homework-help'&&probe.exists&&!probe.shown&&probe.hidden==='true',JSON.stringify(probe));
   }
   await p.close();
  }
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
