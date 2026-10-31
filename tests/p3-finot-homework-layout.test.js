/* P3-E — l'Aide aux devoirs est déjà guidée par Finot : le FAB flottant doit y rester masqué.
   Cela garantit qu'aucun bouton matière/thème/action ne peut être recouvert pendant le défilement,
   y compris sur les petits écrans Android. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const errs=[];
 try{
  for(const vp of [{width:320,height:720},{width:360,height:800},{width:390,height:844}]){
   const p=await b.newPage({viewport:vp});p.on('pageerror',e=>errs.push(`${vp.width}x${vp.height}: ${e.message}`));
   await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Finot devoirs','6e');
   const ids=await p.evaluate(()=>{const s=MQHomeworkHelp.subjects().find(x=>MQHomeworkHelp.chapters(x.id).length);const c=s&&MQHomeworkHelp.chapters(s.id)[0];return {sid:s?.id||'',cid:c?.id||''};});
   const routes=[
    ['intro',()=>p.evaluate(()=>MQHomeworkHelp.open())],
    ['matière',()=>p.evaluate(s=>ACT.hhsubject(s),ids.sid)],
    ['thème',()=>p.evaluate(c=>ACT.hhtopic(c),ids.cid)]
   ];
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
