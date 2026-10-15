/* MathQuest — service worker (fonctionnement hors ligne).
   Principe : TOUTE l'application (pages, données, moteurs) est mise en cache d'un seul bloc, dans un cache
   portant le numéro de version. Les fichiers d'une même version sont donc toujours servis ensemble :
   impossible de mélanger un index.html récent avec des données anciennes.
   ⚠️ À chaque publication, incrémenter VERSION : le navigateur installe alors la nouvelle version complète,
   puis supprime l'ancienne. La page en cours continue avec sa version ; la suivante utilise la nouvelle. */
const VERSION='8.18.0-accessibilite-2026-10-15';
const CACHE='mathquest-'+VERSION;
const CORE=[
  './','./index.html','./parent.html','./manifest.webmanifest','./icon.png',
  './fonts/fonts.css','./fonts/fredoka-latin.woff2','./fonts/fredoka-latin-ext.woff2','./fonts/nunito-latin.woff2','./fonts/nunito-latin-ext.woff2','./js/vendor/qrcode.min.js',
  './data/program-2026-2027.js','./data/math-2026-2027.js','./data/french-2026-2027.js','./data/languages-2026-2027.js',
  './data/hg-emc-2026-2027.js','./data/remaining-2026-2027.js','./data/lexicon.js',
  './js/adaptive-engine.js','./js/primary-engine.js','./js/college-engine.js','./js/audio-engine.js','./js/dictation-engine.js','./data/college/maths-6.js','./data/college/maths-3.js','./data/college/maths-4.js','./data/college/maths-5.js','./data/college/maths-6b.js','./data/college/pc-6-5.js','./data/college/musique.js','./data/college/francais-3.js','./data/college/francais-4.js','./data/college/francais-5.js','./data/college/francais-6.js','./data/college/svt.js','./data/college/pc-4-3.js','./data/college/tech.js','./data/college/pix.js','./data/college/evars-orientation.js','./data/college/emi.js','./data/college/ia.js','./data/college/eps.js','./data/college/hda.js','./data/college/arts.js','./data/college/enrich-anglais.js','./data/college/enrich-italien.js','./data/college/enrich-hg.js','./data/pronunciation-lexicon.js',
  './data/primary/cp.js','./data/primary/ce1.js','./data/primary/ce2.js','./data/primary/cm1.js','./data/primary/cm2.js','./data/primary/enrich-cp.js','./data/primary/enrich-ce1.js','./data/primary/enrich-ce2.js','./data/primary/enrich-cm1.js','./data/primary/enrich-cm2.js','./data/primary/enrich-coverage.js',
  './data/images/finot/01-expression-neutre.jpg','./data/images/finot/02-expression-victoire.jpg','./data/images/finot/03-expression-encouragement.jpg','./data/images/finot/04-expression-surprise.jpg','./data/images/finot/06-expression-fatigue.jpg','./data/images/finot/07-expression-indice.jpg','./data/images/finot/08-expression-bravo.jpg','./data/images/finot/09-expression-carnet.jpg','./data/images/finot/10-expression-revision.jpg','./data/images/finot/11-expression-cadeau.jpg','./data/images/finot/12-expression-bienvenue.jpg','./data/images/finot/39-scene-repaire.jpg','./data/images/finot/35-scene-ile-nombres.jpg','./data/images/finot/36-scene-foret-relatifs.jpg','./data/images/finot/37-scene-volcan-puissances.jpg','./data/images/finot/38-scene-galaxie-fonctions.jpg',
  './data/images/finot/ui-fond-app.jpg','./data/images/finot/ui-cat-general.png','./data/images/finot/ui-cat-langues.png','./data/images/finot/ui-cat-svt.png','./data/images/finot/ui-cat-techno.png','./data/images/finot/ui-cat-artsport.png','./data/images/finot/ui-cat-orientation.png','./data/images/finot/ui-objet-foulard.png','./data/images/finot/ui-objet-hamac.png','./data/images/finot/ui-objet-chapeau.png','./data/images/finot/ui-objet-cape.png','./data/images/finot/ui-objet-couronne.png','./data/images/finot/ui-celeb-badge.png','./data/images/finot/ui-celeb-lien.png'
];
self.addEventListener('install',e=>e.waitUntil(
  // cache:'reload' : on contourne le cache HTTP pour que la version installée soit réellement à jour.
  caches.open(CACHE).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting())
));
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mathquest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
// Clé de cache d'une page : chaque page garde sa propre entrée (index.html ≠ parent.html).
function pageKey(url){const u=new URL(url);let path=u.pathname;const base=new URL('./',self.registration.scope).pathname;
  if(path===base||path.endsWith('/'))path+='index.html';return new URL(path,u.origin).href;}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==location.origin)return; // seules les requêtes de synchronisation (Supabase) sortent : réseau seulement
  if(req.mode==='navigate'){
    e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(pageKey(req.url));if(hit)return hit;
      try{return await fetch(req);}catch(err){return (await c.match(pageKey(new URL('./index.html',self.registration.scope).href)))||Response.error();}})());
    return;
  }
  e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(req,{ignoreSearch:true});if(hit)return hit;
    try{const r=await fetch(req);if(r&&r.ok&&r.type==='basic')c.put(req,r.clone());return r;}catch(err){return Response.error();}})());
});
