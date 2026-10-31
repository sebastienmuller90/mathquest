/* P3-E — Finot flottant ne doit masquer aucun contrôle de l'Aide aux devoirs sur petit mobile.
   On balaye le défilement plutôt que de tester uniquement le haut/bas de page : un bouton fixed peut sinon
   recouvrir brièvement une carte plein largeur pendant le scroll. */
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
    const probe=await p.evaluate(async()=>{
     const fab=document.querySelector('.finot-fab.show');if(!fab)return {shown:false,hits:[]};
     const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
     const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),hits=[];
     const ys=[...new Set([0,max,...Array.from({length:Math.ceil(max/80)+1},(_,i)=>Math.min(max,i*80))])];
     for(const y of ys){scrollTo(0,y);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      const fr=fab.getBoundingClientRect();
      for(const el of document.querySelectorAll('#app button,#app a[href],#app input,#app select,#app textarea')){
       const r=el.getBoundingClientRect(),s=getComputedStyle(el);if(s.display==='none'||s.visibility==='hidden'||r.width<2||r.height<2||r.bottom<=0||r.top>=innerHeight)continue;
       const area=overlap(fr,r);if(area>4){hits.push({y,a:el.dataset.a||el.id||el.tagName,area:Math.round(area),fab:[Math.round(fr.left),Math.round(fr.top),Math.round(fr.right),Math.round(fr.bottom)],el:[Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]});if(hits.length>=8)return {shown:true,max,hits};}
      }
     }
     return {shown:true,max,hits};
    });
    T(`Finot / Aide aux devoirs ${label} ${vp.width}×${vp.height} : aucun contrôle recouvert`,probe.shown&&!probe.hits.length,JSON.stringify(probe));
   }
   await p.close();
  }
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
