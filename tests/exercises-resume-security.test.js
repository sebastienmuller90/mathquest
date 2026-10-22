/* Sécurité reprise d'exercice : un instantané est strictement lié à l'appareil qui l'a créé. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQExerciseResume,{timeout:5000});
  const local=await p.evaluate(()=>{const cid=reco().id;startMission([cid]);MQExerciseResume.capture();return {device:MQExerciseResume.deviceToken(),savedDevice:S.exerciseResume?.device,valid:!!MQExerciseResume.payload(),blob:S.exerciseResume?.blob?.length||0};});
  T('Instantané local : token appareil présent et reprise valide',local.device&&local.savedDevice===local.device&&local.valid&&local.blob>100,JSON.stringify(local));

  const foreign=await p.evaluate(()=>{const before=S.exerciseResume;S.exerciseResume={...before,device:'foreign-device-token-0000000000000000000000'};saveLocal();const payload=MQExerciseResume.payload();const info=MQExerciseResume.resumeInfo();return {payload:!!payload,info:!!info,stored:!!S.exerciseResume};});
  T('Instantané d’un autre appareil : conservé comme donnée mais strictement refusé à la restauration',foreign.stored&&!foreign.payload&&!foreign.info,JSON.stringify(foreign));

  const forged=await p.evaluate(()=>{const device=MQExerciseResume.deviceToken();const bad={m:{ids:[reco().id],q:{q:'x'},flash:false},html:'<img src=x onerror="window.__pwn=1">',fields:[],scroll:0,phase:'question'};const enc=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o))));S.exerciseResume={v:1,at:Date.now(),device,blob:enc(bad)};saveLocal();const payload=MQExerciseResume.payload();return {payload:!!payload,pwn:window.__pwn||0};});
  T('HTML de reprise forgé avec gestionnaire inline : rejeté avant toute injection',!forged.payload&&!forged.pwn,JSON.stringify(forged));
  T('Aucune erreur JavaScript pendant les contrôles de sécurité',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
