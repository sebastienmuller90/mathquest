// Garde-fou géométrique : aucune bulle Finot ne doit être tronquée dans la capture Store téléphone.
const path=require('path');
const {pathToFileURL}=require('url');
const {serve,launch,main,ROOT}=require('./lib');

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,600)});
 const mod=await import(pathToFileURL(path.join(ROOT,'tools','store-screenshots.mjs')).href);
 const chat=mod.SCREENS.find(s=>s.id==='finot-chat');
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:412,height:840}});const p=await ctx.newPage();
  await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&!!document.querySelector('#pob-name'),null,{timeout:8000});
  await p.evaluate(mod.ONBOARDING_JS);await p.evaluate(mod.SEED_JS);await p.evaluate(chat.js);await p.waitForTimeout(500);
  const g=await p.evaluate(()=>{const c=document.getElementById('fchBody'),ms=[...c.querySelectorAll('.fch-msg')],br=c.getBoundingClientRect();const rr=ms.map(m=>{const r=m.getBoundingClientRect();return {top:r.top,bottom:r.bottom,cls:m.className}});return {body:{top:br.top,bottom:br.bottom},scrollTop:c.scrollTop,partialTop:rr.some(r=>r.top<br.top-1&&r.bottom>br.top+1),messages:rr};});
  T('Capture chat téléphone : aucune bulle n’est partiellement coupée en haut',!g.partialTop,JSON.stringify(g));
  await ctx.close();}finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);module.exports=run;
