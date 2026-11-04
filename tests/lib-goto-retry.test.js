/* Harnais : chargement de page avec UNE relance visible en cas de dépassement de délai (contention CPU/disque de la machine de test).
   Garanties vérifiées ici : une seule relance, erreurs non liées au délai jamais avalées, relances comptées, et suite en échec au-delà du seuil. */
const lib=require('./lib');
const R=[];const T=(name,ok,detail)=>R.push({name,ok:!!ok,detail});
const timeoutErr=()=>new Error('page.goto: Timeout 30000ms exceeded.');
function fakePage(script){const calls=[];return {calls,goto:async(u,o)=>{calls.push([u,o]);const s=script[calls.length-1];if(s instanceof Error)throw s;return s||'ok';}};}
async function run(){
  T('gotoRetry est exporté par lib.js',typeof lib.gotoRetry==='function'&&typeof lib.loadRetryVerdict==='function',typeof lib.gotoRetry);
  if(typeof lib.gotoRetry!=='function')return R;
  lib.resetLoadRetries();
  let p=fakePage(['ok']);await lib.gotoRetry(p,'http://x/index.html',{waitUntil:'load'});
  T('Chargement normal : un seul appel, aucune relance',p.calls.length===1&&lib.loadRetryVerdict().retries===0,JSON.stringify(lib.loadRetryVerdict()));
  p=fakePage([timeoutErr(),'ok']);const r=await lib.gotoRetry(p,'http://x/index.html',{waitUntil:'load'});
  T('Un dépassement de délai : une relance avec les mêmes options, comptée',p.calls.length===2&&r==='ok'&&p.calls[1][1].waitUntil==='load'&&lib.loadRetryVerdict().retries===1,JSON.stringify(lib.loadRetryVerdict()));
  p=fakePage([timeoutErr(),timeoutErr(),'ok']);let err=null;try{await lib.gotoRetry(p,'http://x/index.html');}catch(e){err=e;}
  T('Deux dépassements de suite : l’erreur remonte (une seule relance, jamais de boucle)',!!err&&/Timeout/.test(err.message)&&p.calls.length===2,'appels='+p.calls.length);
  lib.resetLoadRetries();p=fakePage([new Error('net::ERR_CONNECTION_REFUSED at http://x/')]);err=null;try{await lib.gotoRetry(p,'http://x/');}catch(e){err=e;}
  T('Erreur sans rapport avec le délai : jamais relancée ni avalée',!!err&&/ERR_CONNECTION_REFUSED/.test(err.message)&&p.calls.length===1&&lib.loadRetryVerdict().retries===0,'appels='+p.calls.length);
  lib.resetLoadRetries();for(let i=0;i<3;i++){const q=fakePage([timeoutErr(),'ok']);await lib.gotoRetry(q,'http://x/');}
  const v=lib.loadRetryVerdict();
  T('Au-delà du seuil de relances, le verdict est négatif (la suite échoue, pas de masquage)',v.retries===3&&v.ok===false&&v.max===2,JSON.stringify(v));
  lib.resetLoadRetries();
  return R;}
if(require.main===module)lib.main(run);
module.exports=run;
