/* Onboarding historique de secours — normalement remplacé par le wizard premium, mais doit rester fiable
   pour les migrations/cas de fallback. On le rend directement sans modifier la préférence produit. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const inspect=()=>p.evaluate(()=>{
  const card=document.querySelector('.onb.card'),r=card?.getBoundingClientRect();
  const visible=e=>{const s=getComputedStyle(e),x=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&x.width>0&&x.height>0;};
  const controls=[...document.querySelectorAll('.onb button,.onb input')].filter(visible).map(e=>{const x=e.getBoundingClientRect();return {a:e.dataset.a||'',id:e.id||'',l:x.left,r:x.right,w:x.width,h:x.height};});
  const bad=controls.filter(x=>x.l<-1||x.r>innerWidth+1||x.w<1||x.h<40);
  const cs=card?getComputedStyle(card):null,bs=getComputedStyle(document.body);
  return {card:!!card,left:r?.left||0,right:r?.right||0,width:r?.width||0,vw:innerWidth,sw:document.documentElement.scrollWidth,controls,bad,stage:document.querySelectorAll('.stb').length,grades:document.querySelectorAll('.grb').length,selected:document.querySelector('.grb.sel')?.textContent||'',avatars:document.querySelectorAll('.avb').length,name:!!document.querySelector('#nm'),date:!!document.querySelector('#bd'),begin:!!document.querySelector('[data-a="begin"]'),cardBg:cs?.backgroundColor,cardColor:cs?.color,bodyBg:bs.backgroundColor};
 });
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.waitForFunction(()=>typeof onboarding==='function'&&typeof stageOf==='function',{timeout:5000});

  for(const vp of [{n:'320 px',w:320,h:700},{n:'iPhone',w:390,h:844},{n:'paysage',w:844,h:390},{n:'desktop',w:1280,h:800}]){
   await p.setViewportSize({width:vp.w,height:vp.h});
   await p.evaluate(()=>{document.documentElement.dataset.theme='light';ONBG='CE2';ONB='🦊';onboarding(false);scrollTo(0,0);});await p.waitForTimeout(40);
   const x=await inspect();
   T(`Onboarding historique ${vp.n} : complet et sans débordement`,x.card&&x.stage>=2&&x.grades>=5&&x.selected.trim()==='CE2'&&x.avatars>=3&&x.name&&x.date&&x.begin&&x.sw<=x.vw+1&&x.left>=-1&&x.right<=x.vw+1&&!x.bad.length,JSON.stringify(x));
  }

  await p.setViewportSize({width:390,height:844});
  await p.evaluate(()=>{document.documentElement.dataset.theme='dark';ONBG='4e';ONB='🐼';onboarding(true);});await p.waitForTimeout(40);
  const dark=await inspect();
  T('Onboarding historique sombre : carte distincte, contrôles présents et 4e sélectionnée',dark.card&&dark.selected.trim()==='4e'&&dark.cardBg!==dark.bodyBg&&dark.cardColor!==dark.cardBg&&!dark.bad.length&&dark.sw<=dark.vw+1,JSON.stringify(dark));
  T('Aucune erreur JavaScript pendant le fallback onboarding',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
