/* P3-A — les SystemBars Android doivent suivre à chaud prefers-color-scheme. */
const {serve,launch}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();
 const ctx=await b.newContext({viewport:{width:390,height:844},colorScheme:'light'});
 await ctx.addInitScript(()=>{
  const calls=window.__systemBarsCalls=[];
  const listeners={};
  window.Capacitor={
   isNativePlatform:()=>true,getPlatform:()=>'android',
   Plugins:{
    App:{addListener:(ev,fn)=>{listeners[ev]=fn;return Promise.resolve({remove(){delete listeners[ev];}});},minimizeApp:()=>Promise.resolve()},
    SystemBars:{setStyle:o=>{calls.push({...o});return Promise.resolve();}}
   }
  };
 });
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForTimeout(120);
  const first=await p.evaluate(()=>window.__systemBarsCalls.slice());
  T('Android clair : SystemBars reçoit le style LIGHT au démarrage',first.some(x=>x.style==='LIGHT'),JSON.stringify(first));

  await p.emulateMedia({colorScheme:'dark'});await p.waitForTimeout(120);
  const dark=await p.evaluate(()=>window.__systemBarsCalls.slice());
  T('Passage à sombre à chaud : SystemBars reçoit DARK',dark.length>first.length&&dark.at(-1)?.style==='DARK',JSON.stringify(dark));

  await p.emulateMedia({colorScheme:'light'});await p.waitForTimeout(120);
  const light=await p.evaluate(()=>window.__systemBarsCalls.slice());
  T('Retour à clair à chaud : SystemBars revient à LIGHT',light.length>dark.length&&light.at(-1)?.style==='LIGHT',JSON.stringify(light));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
