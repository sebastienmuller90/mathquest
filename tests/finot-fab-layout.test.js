/* Finot flottant — géométrie réelle : visible hors apprentissage, jamais au-dessus d'une action.
   Le test descend en bas des écrans les plus longs pour couvrir le cas signalé lors de la revue V1. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const measure=()=>p.evaluate(()=>{
  const fab=document.querySelector('.finot-fab'),fr=fab?.getBoundingClientRect();
  const shown=!!fab&&getComputedStyle(fab).display!=='none'&&fr.width>0&&fr.height>0;
  const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
  const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
  const controls=[...document.querySelectorAll('#app button,#app a,#app input,#app select,#app textarea,#hometabs button')].filter(visible);
  const hits=shown?controls.map(e=>{const r=e.getBoundingClientRect(),area=overlap(fr,r);return {area,a:e.getAttribute('data-a')||'',txt:(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,80),r:{l:r.left,t:r.top,rr:r.right,b:r.bottom}};}).filter(x=>x.area>2):[];
  const app=document.querySelector('#app'),cs=app?getComputedStyle(app):null;
  return {shown,raised:fab?.classList.contains('raised')||false,fab:fr?{l:fr.left,t:fr.top,r:fr.right,b:fr.bottom,w:fr.width,h:fr.height}:null,hits,paddingBottom:cs?.paddingBottom||'',scrollY,scrollH:document.documentElement.scrollHeight,vw:innerWidth,vh:innerHeight,overflow:document.documentElement.scrollWidth-innerWidth};
 });
 async function screen(name,fn,{bottom=true,expectShow=true,expectRaised=null}={}){
  await p.evaluate(fn);
  // Reproduit la synchronisation normalement effectuée par le routeur après un changement d'écran : la barre d'onglets
  // et le FAB sont deux éléments persistants hors de #app, leur état doit donc être recalculé avant toute mesure.
  await p.evaluate(()=>{if(typeof hometabsSync==='function')hometabsSync();if(typeof finotFabSync==='function')finotFabSync();});
  await p.waitForTimeout(60);if(bottom){await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(40);}const m=await measure();
  const raisedOk=expectRaised==null||m.raised===expectRaised;
  T(`${name} : Finot ${expectShow?'visible sans masquer d’action':'masqué comme prévu'}`,m.shown===expectShow&&raisedOk&&m.hits.length===0&&m.overflow<=1,JSON.stringify(m));
 }
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>typeof finotFabSync==='function'&&!!document.querySelector('.finot-fab'),{timeout:5000});

  for(const vp of [{n:'320 px',w:320,h:700},{n:'iPhone',w:390,h:844},{n:'paysage',w:844,h:390},{n:'desktop',w:1280,h:800}]){
   await p.setViewportSize({width:vp.w,height:vp.h});
   await screen(`Accueil ${vp.n}`,()=>{PARENT=false;home();},{bottom:true,expectShow:true,expectRaised:true});
  }

  await p.setViewportSize({width:390,height:844});
  await screen('Boutique',()=>{PARENT=false;CUR='shop';shop();},{bottom:true,expectShow:true,expectRaised:false});
  await screen('Badges',()=>{PARENT=false;CUR='badges';badgesScreen();},{bottom:true,expectShow:true,expectRaised:false});
  await screen('Repaire de Finot',()=>{PARENT=false;CUR='finot';finotScreen();},{bottom:true,expectShow:true,expectRaised:false});

  await screen('Espace parent',()=>{parentScreen('suivi');},{bottom:false,expectShow:false,expectRaised:false});
  await screen('Exercice',()=>{PARENT=false;const c=ALLCH.find(x=>WMAP[x.id]?.lvl===S.grade);if(!c)throw new Error('Chapitre de test introuvable');startMission([c.id],{n:1});},{bottom:false,expectShow:false,expectRaised:false});

  T('Aucune erreur JavaScript pendant le contrôle du bouton Finot',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
