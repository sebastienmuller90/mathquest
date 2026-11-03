/* Course « register().then() → refreshVersion() » (03/11/2026) : site minimal servi localement, avec le VRAI js/app-pwa.js.
   Défaut démontré par traces : quand une nouvelle version (V3) vient d'être « installed », Chrome arrête l'ancien worker (V2) pour
   activer V3. Un message {type:'version'} reçu par V2 à cet instant le redémarre et V3 reste « installed » jusqu'au prochain
   rechargement. Le message venait du .then() de navigator.serviceWorker.register().
   Le test rend la course déterministe : la promesse de register() n'est libérée qu'au moment exact où V3 passe « installed ».
   1. Le code de l'appli n'appelle pas refreshVersion() dans le .then() de register().
   2. Version affichée correcte à la première installation et après rechargement simple.
   3. Mise à jour V2 → V3 sans rechargement : V3 devient « activated », aucun message « version » vers V2 pendant l'attente,
      V2 ne redémarre pas pendant son arrêt, controllerchange reçu, version V3 récupérée et affichée. */
const fs=require('fs'),path=require('path'),os=require('os');const {serve,ROOT,chromePath}=require('./lib');
const V2='2.0.0-course-ancienne',V3='3.0.0-course-nouvelle';
const SW=v=>`const VERSION='${v}';
self.addEventListener('message',e=>{if(e.data&&e.data.type==='version'&&e.ports&&e.ports[0])e.ports[0].postMessage({version:VERSION});});
self.addEventListener('install',e=>e.waitUntil(new Promise(r=>setTimeout(r,300)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});`;
// Exécuté avant le code de l'appli : suivi du worker en attente, journal des postMessage, register() retenu jusqu'à « installed ».
const INIT=`(()=>{try{
window.__posts=[];window.__cc=0;window.__pending=null;
const post=ServiceWorker.prototype.postMessage;
ServiceWorker.prototype.postMessage=function(m,t){
 const p=window.__pending;
 window.__posts.push({type:m&&m.type,versLeNouveau:this===p,etatCible:this.state,etatNouveau:p?p.state:null,pile:(new Error().stack||'').split('\\n').slice(2,6).join(' | ')});
 return post.apply(this,arguments);};
navigator.serviceWorker.addEventListener('controllerchange',()=>{window.__cc++;});
let release=null;const gate=sessionStorage.getItem('mq_gate')==='1';
if(gate){const reg=ServiceWorkerContainer.prototype.register;
 ServiceWorkerContainer.prototype.register=function(...a){const p=reg.apply(this,a);return new Promise((res,rej)=>{release=()=>p.then(res,rej);});};}
navigator.serviceWorker.getRegistration().then(r=>{if(!r)return;r.addEventListener('updatefound',()=>{
 const w=r.installing;window.__pending=w;
 w.addEventListener('statechange',()=>{window.__states=(window.__states||[]).concat(w.state);if(w.state==='installed'&&release){const f=release;release=null;f();}});});});
}catch(e){}})();`;
function mkSite(){const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mq-race-')),site=path.join(tmp,'site');fs.mkdirSync(path.join(site,'js'),{recursive:true});
 fs.copyFileSync(path.join(ROOT,'js','app-pwa.js'),path.join(site,'js','app-pwa.js'));
 fs.writeFileSync(path.join(site,'index.html'),'<!doctype html><meta charset="utf-8"><title>course</title><body><div class="mq-appver"></div><script>var ACT={},MQHooks={on(){}};</script><script src="js/app-pwa.js"></script>');
 fs.writeFileSync(path.join(site,'sw.js'),SW(V2));return {tmp,site};}
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 // 1. Garde statique : le .then() de register() ne redemande plus la version (le chargement et controllerchange suffisent).
 const src=fs.readFileSync(path.join(ROOT,'js','app-pwa.js'),'utf8');const m=/register\('\.\/sw\.js'\)\.then\(([^]*?)\)\.catch\(/.exec(src);
 T('app-pwa.js : le .then() de register() n’appelle pas refreshVersion() (sinon l’ancien worker est redémarré pendant son arrêt)',!!m&&!/refreshVersion/.test(m[1]),m?m[1]:'register().then introuvable');
 T('app-pwa.js : refreshVersion() reste appelé au chargement et sur controllerchange',/addEventListener\('controllerchange',\(\)=>\{refreshVersion\(\)/.test(src)&&/\r?\n refreshVersion\(\);\r?\n\}else paint/.test(src));
 const {tmp,site}=mkSite();const PORT=24000+Math.floor(Math.random()*1500);const {srv,url}=await serve(PORT,site,{cacheControl:'no-store'});
 const pw=require('playwright-core');const ctx=await pw.chromium.launchPersistentContext(path.join(tmp,'prof'),{executablePath:chromePath()});
 await ctx.addInitScript(INIT);
 const p=ctx.pages()[0]||await ctx.newPage();const cdp=await ctx.newCDPSession(p);await cdp.send('ServiceWorker.enable');const ev=[];
 cdp.on('ServiceWorker.workerVersionUpdated',e=>e.versions.forEach(v=>ev.push({id:v.versionId,status:v.status,run:v.runningStatus})));
 try{
  // 2. Première installation puis rechargement simple : version V2 récupérée et affichée.
  await p.goto(url+'index.html');await p.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:20000});
  await p.waitForFunction(()=>window.MQ_APP_VERSION,null,{timeout:10000}).catch(()=>{});
  const first=await p.evaluate(()=>({v:window.MQ_APP_VERSION,txt:document.querySelector('.mq-appver').textContent}));
  T('Première installation : version V2 récupérée et affichée',first.v===V2&&first.txt.includes(V2),JSON.stringify(first));
  await p.reload();await p.waitForFunction(()=>window.MQ_APP_VERSION,null,{timeout:10000}).catch(()=>{});
  const again=await p.evaluate(()=>({v:window.MQ_APP_VERSION,ctl:!!navigator.serviceWorker.controller}));
  T('Rechargement simple : contrôleur présent, version V2 inchangée',again.v===V2&&again.ctl,JSON.stringify(again));
  // 3. Mise à jour V2 → V3 : register() retenu jusqu'à l'instant exact où V3 est « installed ».
  fs.writeFileSync(path.join(site,'sw.js'),SW(V3));
  await p.evaluate(()=>sessionStorage.setItem('mq_gate','1'));
  const oldId=ev.filter(e=>e.status==='activated').map(e=>e.id).pop();
  await p.reload();
  await p.evaluate(()=>{window.__loads=(window.__loads||0)+1;});
  const done=await p.waitForFunction(()=>window.__pending&&window.__pending.state==='activated',null,{timeout:25000}).then(()=>true,()=>false);
  const s=await p.evaluate(()=>({st:window.__pending&&window.__pending.state,states:window.__states,cc:window.__cc,posts:window.__posts,loads:window.__loads,ctlState:navigator.serviceWorker.controller&&navigator.serviceWorker.controller.state}));
  T('V3 devient « activated » sans nouveau rechargement',done&&s.st==='activated'&&s.loads===1,'états='+JSON.stringify(s.states)+' état final='+s.st);
  const bad=(s.posts||[]).filter(x=>x.type==='version'&&!x.versLeNouveau&&(x.etatNouveau==='installed'||x.etatNouveau==='activating'));
  T('Aucun message « version » envoyé à V2 pendant que V3 attend / s’active',bad.length===0,JSON.stringify(bad));
  const stoppedAt=ev.findIndex(e=>e.id===oldId&&e.run==='stopping');const restarted=stoppedAt<0?null:ev.slice(stoppedAt+1).filter(e=>e.id===oldId&&(e.run==='starting')).length;
  T('V2 s’arrête et ne redémarre pas pendant son arrêt',stoppedAt>=0&&restarted===0,'arrêts='+stoppedAt+' redémarrages='+restarted);
  T('controllerchange reçu (nouveau contrôleur = V3)',s.cc>=1&&s.ctlState==='activated',JSON.stringify({cc:s.cc,ctl:s.ctlState}));
  const ver=await p.waitForFunction(v=>window.MQ_APP_VERSION===v&&document.querySelector('.mq-appver').textContent.includes(v),V3,{timeout:8000}).then(()=>true,()=>false);
  T('Version V3 récupérée et affichée après la mise à jour',ver,await p.evaluate(()=>window.MQ_APP_VERSION));
 }catch(e){T('Exécution du scénario',false,e&&e.message);}
 await ctx.close().catch(()=>{});await new Promise(r=>{srv.close(()=>r());if(srv.closeAllConnections)srv.closeAllConnections();});try{fs.rmSync(tmp,{recursive:true,force:true});}catch(e){}
 return R;}
require('./lib').main(run);
