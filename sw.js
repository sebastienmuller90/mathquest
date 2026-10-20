/* MathQuest — service worker hors ligne.
   V8.49 : cache auto-découvert + niveaux pédagogiques, Finot enrichi, interrogation parent,
   rotation anti-mémorisation, tableaux de bord parent détaillés et résolution fiable des assets JS.
   L'installation part des deux pages, suit leurs scripts/styles/assets locaux, puis découvre les images
   référencées dans les fichiers texte. Le lexique est traité spécialement car ses images sont dynamiques. */
const VERSION='8.50.0-images-lecons-2026-10-20';
const CACHE='mathquest-'+VERSION;
// Images des leçons et de l'atlas : trop nombreuses pour être préchargées. Mises en cache au premier affichage, dans un
// cache à part qui survit aux changements de version (son nom ne commence pas par « mathquest- »).
const IMGCACHE='mqimg-lecons-v1';const ONDEMAND=/\/data\/images\/(?:lecons|atlas)\//;
const SEEDS=['./','./index.html','./parent.html','./manifest.webmanifest','./icon.png','./styles.css','./fonts/fonts.css'];
const TEXT_EXT=/\.(?:html?|js|css|webmanifest)$/i;
const ESSENTIAL_EXT=/\.(?:html?|js|css|webmanifest|woff2?)$/i;
const ASSET_EXT=/\.(?:html?|js|css|webmanifest|woff2?|png|jpe?g|webp|svg)$/i;
const scopeURL=new URL('./',self.registration.scope);
const inScope=u=>u.origin===scopeURL.origin&&u.pathname.startsWith(scopeURL.pathname);
const normalize=(ref,base=scopeURL.href)=>{try{const u=new URL(ref,base);u.hash='';return inScope(u)?u:null;}catch(e){return null;}};
function refsFromText(text,base){const out=[];const add=(r,b=base)=>{const u=normalize(r,b);if(u&&ASSET_EXT.test(u.pathname))out.push(u.href);};let m;
 // HTML/CSS : les références relatives sont résolues depuis le fichier qui les contient.
 const attr=/(?:src|href)\s*=\s*["']([^"']+)["']/gi;while((m=attr.exec(text)))add(m[1],base);
 const css=/url\(\s*["']?([^"')]+)["']?\s*\)/gi;while((m=css.exec(text)))add(m[1],base);
 // Littéraux applicatifs dans les fichiers JS : `js/...`, `data/...`, `fonts/...` sont des chemins
 // depuis la racine de l'application, pas depuis le dossier du script qui les référence.
 const lit=/["']((?:\.\.?\/)?(?:data|js|fonts)\/[^"'\s)]+?\.(?:js|css|woff2?|png|jpe?g|webp|svg|webmanifest))["']/gi;
 while((m=lit.exec(text))){const ref=m[1],rootRelative=/^(?:data|js|fonts)\//.test(ref);add(ref,rootRelative?scopeURL.href:base);}
 return out;}
function lexiconImages(text){const out=[];const re=/\[\s*'(?:\\.|[^'\\])*'\s*,\s*'(?:\\.|[^'\\])*'\s*,\s*'(?:\\.|[^'\\])*'\s*,\s*'([^']*)'\s*\]/g;let m;while((m=re.exec(text)))if(m[1])out.push(new URL('./data/images/lexique/'+m[1]+'.webp',scopeURL).href);return out;}
async function buildCache(){const cache=await caches.open(CACHE),seen=new Set(),queue=SEEDS.map(x=>new URL(x,scopeURL).href),fail=[];
 while(queue.length){const batch=[];while(queue.length&&batch.length<24){const url=queue.shift();if(seen.has(url))continue;seen.add(url);batch.push(url);}if(!batch.length)continue;
  await Promise.all(batch.map(async url=>{try{const req=new Request(url,{cache:'reload'}),res=await fetch(req);if(!res.ok)throw new Error('HTTP '+res.status);await cache.put(req,res.clone());const path=new URL(url).pathname;if(TEXT_EXT.test(path)){const text=await res.clone().text();for(const r of refsFromText(text,url))if(!seen.has(r))queue.push(r);if(path.endsWith('/data/lexicon.js'))for(const r of lexiconImages(text))if(!seen.has(r))queue.push(r);}}catch(e){if(ESSENTIAL_EXT.test(new URL(url).pathname))fail.push(url+' — '+String(e&&e.message||e));else console.warn('[MathQuest SW] asset optionnel non mis en cache',url,e);}}));}
 if(fail.length)throw new Error('Pré-cache incomplet : '+fail.slice(0,8).join(' | '));}
self.addEventListener('install',e=>e.waitUntil(buildCache().then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mathquest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function pageKey(url){const u=new URL(url);let path=u.pathname;if(path===scopeURL.pathname||path.endsWith('/'))path+='index.html';return new URL(path,u.origin).href;}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==scopeURL.origin)return;
 if(req.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE),key=pageKey(req.url),hit=await c.match(key);if(hit)return hit;try{const r=await fetch(req);if(r&&r.ok)await c.put(key,r.clone());return r;}catch(err){return (await c.match(new URL('./index.html',scopeURL).href))||Response.error();}})());return;}
 if(ONDEMAND.test(url.pathname)){e.respondWith((async()=>{const c=await caches.open(IMGCACHE),hit=await c.match(req,{ignoreSearch:true});if(hit)return hit;try{const r=await fetch(req);if(r&&r.ok&&r.type==='basic')await c.put(req,r.clone());return r;}catch(err){return Response.error();}})());return;}
 e.respondWith((async()=>{const c=await caches.open(CACHE),hit=await c.match(req,{ignoreSearch:true});if(hit)return hit;try{const r=await fetch(req);if(r&&r.ok&&r.type==='basic')await c.put(req,r.clone());return r;}catch(err){return Response.error();}})());
});
