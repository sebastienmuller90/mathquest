/* Le service worker DOIT s'installer et s'activer : sinon plus de hors ligne ni de mises à jour pour la PWA publiée.
   Régression du 07/11/2026 : js/app-atlas.js contenait href="./data/licence-cartes.html" ; le pré-cache résout les href trouvés dans un fichier
   JS relativement à ce fichier (js/data/licence-cartes.html → 404), et buildCache() fait échouer TOUTE l'installation au moindre fichier
   absent (« Pré-cache incomplet »). Le worker devenait « redundant », sans aucune erreur visible, et pwa-update attendait sans fin.
   Ce test mesure le produit réel : enregistrement, activation, cache rempli, et aucune requête de pré-cache en erreur. */
const {serve,launch,main}=require('./lib');

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,800)});
 const {srv,url}=await serve();const b=await launch();
 try{
  const ctx=await b.newContext();const p=await ctx.newPage();const errs=[],bad=[];
  p.on('pageerror',e=>errs.push(e.message));ctx.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().replace(url,''));});
  await p.goto(url+'index.html',{waitUntil:'load'});
  // attente BORNÉE : un worker « redundant » doit produire un échec lisible, jamais un blocage
  const st=await p.evaluate(()=>new Promise(res=>{const t0=Date.now();const tick=async()=>{const r=await navigator.serviceWorker.getRegistration();
    const w=r&&(r.active||r.installing||r.waiting);const s=w?w.state:'aucun';
    if(s==='activated'||s==='redundant'||Date.now()-t0>45000)return res({state:s,ms:Date.now()-t0,controlled:!!navigator.serviceWorker.controller});setTimeout(tick,250);};tick();}));
  T('Le service worker s\'installe et s\'active (jamais « redundant »)',st.state==='activated',JSON.stringify(st));
  const cache=await p.evaluate(async()=>{const ks=(await caches.keys()).filter(k=>k.startsWith('mathquest-')),out={keys:ks};if(ks.length){const c=await caches.open(ks[0]);out.n=(await c.keys()).length;}return out;});
  T('Le pré-cache est rempli (plus de 600 fichiers)',cache.n>600,JSON.stringify(cache));
  // Même définition que le service worker : seuls les fichiers ESSENTIELS en erreur font échouer l'installation ; les assets optionnels
  // (images…) sont tolérés par buildCache(). On lit la définition dans sw.js pour rester synchrone avec elle.
  const ess=new RegExp((require('fs').readFileSync(require('path').join(__dirname,'..','sw.js'),'utf8').match(/const ESSENTIAL_EXT=\/(.+)\/i;/)||[])[1]||'\\.(?:html?|js|css|webmanifest|woff2?)$','i');
  const uniq=[...new Set(bad)],fatal=uniq.filter(x=>ess.test(x.replace(/^\d+ /,'').split('?')[0]));
  T('Aucun fichier ESSENTIEL (html, js, css, manifeste, polices) en erreur pendant l\'installation',!fatal.length,fatal.join(' | ')+(uniq.length-fatal.length?'  (+ '+(uniq.length-fatal.length)+' assets optionnels tolérés)':''));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  // La page de licence des cartes reste servie hors ligne, depuis le cache
  await ctx.setOffline(true);
  const lic=await p.evaluate(async()=>{try{const r=await fetch('./data/licence-cartes.html');return {ok:r.ok,len:(await r.text()).length};}catch(e){return {err:e.message};}});
  T('La page « Licence des cartes » est disponible hors ligne',lic.ok===true&&lic.len>1000,JSON.stringify(lic));
  await ctx.close();
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
