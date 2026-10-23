/* Finition premium V2 — sous-écrans parent non couverts par l'audit visuel V1.
   Vérifie Programme, bilan hebdomadaire et devoirs sur mobile étroit, iPhone, desktop et thème sombre. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const geom=()=>p.evaluate(()=>{
  const visible=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
  const actions=[...document.querySelectorAll('button,a,input,select,textarea')].filter(visible).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,a:e.getAttribute('data-a')||'',l:r.left,r:r.right,t:r.top,b:r.bottom,w:r.width,h:r.height};});
  return {vw:innerWidth,sw:document.documentElement.scrollWidth,actions,bad:actions.filter(x=>x.l<-1||x.r>innerWidth+1||x.w<1||x.h<1)};
 });
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>typeof parentScreen==='function'&&!!window.MQWeeklyReport&&!!window.MQHomework,{timeout:5000});

  for(const vp of [{n:'320 px',w:320,h:700},{n:'iPhone',w:390,h:844},{n:'desktop',w:1280,h:800}]){
   await p.setViewportSize({width:vp.w,height:vp.h});
   await p.evaluate(()=>parentScreen('programme'));await p.waitForSelector('.program-card');
   const pg=await geom();const info=await p.evaluate(()=>({cards:document.querySelectorAll('.program-card').length,head:!!document.querySelector('.program-head'),links:[...document.querySelectorAll('.program-src')].filter(x=>x.offsetParent!==null).length}));
   T(`Parent Programme ${vp.n} : cartes et sources lisibles sans débordement`,info.cards>0&&info.head&&info.links>0&&pg.sw<=pg.vw+1&&!pg.bad.length,JSON.stringify({info,pg}));

   await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector('.mq-weekly');await p.waitForSelector('[data-homework-parent="1"]');
   const sg=await geom();const suivi=await p.evaluate(()=>({weekly:document.querySelectorAll('.mq-weekly').length,weeklyKpi:document.querySelectorAll('.mq-weekly-kpi').length,homework:document.querySelectorAll('[data-homework-parent="1"]').length,form:!!document.querySelector('#hw-title'),actions:[...document.querySelectorAll('.mq-weekly-actions .btn')].filter(x=>x.offsetParent!==null).length}));
   T(`Parent Suivi ${vp.n} : bilan hebdomadaire et devoirs restent dans le viewport`,suivi.weekly===1&&suivi.weeklyKpi===4&&suivi.homework===1&&suivi.form&&suivi.actions>=2&&sg.sw<=sg.vw+1&&!sg.bad.length,JSON.stringify({suivi,sg}));
  }

  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>{document.documentElement.dataset.theme='dark';parentScreen('programme');});await p.waitForSelector('.program-card');
  const dark=await p.evaluate(()=>{const card=document.querySelector('.program-card'),cs=getComputedStyle(card),body=getComputedStyle(document.body);return {cardBg:cs.backgroundColor,cardColor:cs.color,bodyBg:body.backgroundColor,overflow:document.documentElement.scrollWidth-innerWidth};});
  T('Parent Programme sombre : thème appliqué sans overflow',dark.overflow<=1&&dark.cardBg!==dark.bodyBg&&dark.cardColor!==dark.cardBg,JSON.stringify(dark));

  T('Aucune erreur JavaScript pendant l’audit parent V2',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
