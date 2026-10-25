/* Audit de release (25/10/2026) — PWA : lacunes laissées par pwa.test.js, pwa-update.test.js et offline-real.test.js.
   Site copié dans un dossier temporaire et servi en local (la copie peut être « mise à jour » à volonté) :
   1. pré-cache statique : aucune grosse banque d'images (leçons, atlas) précachée, poids total raisonnable, chaque script/feuille de style/
      police des deux pages présent, aucun fichier du pré-cache absent du disque ;
   2. premières ouvertures de index.html et parent.html : aucune réponse 4xx/5xx importante, aucune erreur JavaScript ;
   3. mise à jour N → N+1 avec d'anciens caches : un cache « mathquest-… » d'une très vieille version est supprimé à l'activation, le cache
      d'images (mqimg-…) et un cache étranger sont conservés, localStorage intact, un seul rechargement, jamais de boucle de rechargement,
      jamais de page blanche ;
   4. mise à jour CASSÉE (un fichier du pré-cache disparaît côté serveur) : l'ancien service worker et l'ancien cache restent actifs et
      l'appli démarre toujours hors ligne ; la mise à jour réparée s'installe ensuite normalement ;
   5. démarrage hors ligne avec un ancien service worker qui n'a jamais été remplacé. */
const fs=require('fs'),path=require('path'),os=require('os');const {serve,ROOT,chromePath,seedProfile,swPrecache}=require('./lib');
const SKIP=new Set(['tests','reports','node_modules','.git','docs']);
function copyDir(a,b){fs.mkdirSync(b,{recursive:true});for(const n of fs.readdirSync(a)){if(SKIP.has(n)||/^WORK-|\.md$/.test(n))continue;const s=path.join(a,n),d=path.join(b,n);if(fs.statSync(s).isDirectory())copyDir(s,d);else fs.copyFileSync(s,d);}}
const bump=(dir,v)=>{const sp=path.join(dir,'sw.js');fs.writeFileSync(sp,fs.readFileSync(sp,'utf8').replace(/const VERSION='[^']*';/,`const VERSION='${v}';`));};
const stop=srv=>new Promise(r=>{srv.close(()=>r());if(srv.closeAllConnections)srv.closeAllConnections();});
const MAX_PRECACHE_MB=40;

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 // ===== 1. Pré-cache statique
 const list=swPrecache();const mb=list.reduce((a,f)=>{try{return a+fs.statSync(path.join(ROOT,f||'index.html')).size;}catch(e){return a;}},0)/1e6;
 const big=list.filter(f=>/^data\/images\/(lecons|atlas)\//.test(f));
 T(`Pré-cache : ${list.length} fichiers, ${mb.toFixed(1)} Mo (plafond ${MAX_PRECACHE_MB} Mo), aucune image de leçon ni d’atlas (chargées à la demande)`,!big.length&&mb<MAX_PRECACHE_MB,big.slice(0,4).join(', ')||mb.toFixed(1)+' Mo');
 const miss=[];for(const page of ['index.html','parent.html']){const h=fs.readFileSync(path.join(ROOT,page),'utf8');
  const refs=[...h.matchAll(/<(?:script|link|img)\b[^>]*?(?:src|href)="([^"#?]+)"/g)].map(m=>m[1]).filter(s=>!/^(?:https?:|data:|mailto:)/.test(s));
  for(const r of refs){const rel=r.replace(/^\.\//,'');if(!fs.existsSync(path.join(ROOT,rel)))miss.push(page+' → '+r+' (fichier absent)');else if(!list.includes(rel)&&!/\.(?:html?)$/.test(rel))miss.push(page+' → '+r+' (non précaché)');}}
 T('index.html et parent.html : tous les scripts, feuilles de style, polices et images référencés existent et sont précachés',!miss.length,miss.slice(0,6).join(' | '));
 const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
 T('Service worker : activation = suppression des anciens caches « mathquest- » seulement (pas le cache d’images ni les caches d’autres applis), skipWaiting + clients.claim',/startsWith\('mathquest-'\)&&k!==CACHE/.test(sw)&&/skipWaiting/.test(sw)&&/clients\.claim/.test(sw)&&/IMGCACHE='mqimg-/.test(sw));

 // ===== 2-5. Navigateur réel
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mq-pwaaudit-')),site=path.join(tmp,'site'),prof=path.join(tmp,'profile');copyDir(ROOT,site);
 const V1='9.20.0-audit-n-2026-10-25',V2='9.21.0-audit-n-plus-un-2026-10-25',V3='9.22.0-audit-n-plus-deux-2026-10-25';bump(site,V1);
 const pw=require('playwright-core');const PORT=22000+Math.floor(Math.random()*2000);let {srv,url}=await serve(PORT,site,{cacheControl:'max-age=600'});
 const ctx=await pw.chromium.launchPersistentContext(prof,{executablePath:chromePath(),viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');sessionStorage.setItem('mq_loads',String(+(sessionStorage.getItem('mq_loads')||0)+1));}catch(e){}});
 const errs=[],bad=[];const hook=pg=>{pg.on('pageerror',e=>errs.push(e.message));pg.on('response',r=>{if(r.status()>=400&&!/favicon/.test(r.url()))bad.push(r.status()+' '+r.url().replace(url,'/'));});};
 const p=ctx.pages()[0]||await ctx.newPage();hook(p);
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await p.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:60000}).catch(()=>{});if(!(await p.evaluate(()=>!!navigator.serviceWorker.controller)))await p.reload({waitUntil:'load'});
 await seedProfile(p,'Audit','CE2');
 const pp=await ctx.newPage();hook(pp);await pp.goto(url+'parent.html',{waitUntil:'load'});await pp.waitForTimeout(500);await pp.close();
 await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForTimeout(500);
 T('Premières ouvertures (index.html, parent.html, rechargement) : aucune réponse 4xx/5xx, aucune erreur JavaScript',!bad.length&&!errs.length,bad.concat(errs).slice(0,5).join(' | '));
 const inst=await p.evaluate(async()=>{const ks=await caches.keys();const k=ks.find(x=>x.startsWith('mathquest-'));const c=await caches.open(k);const reqs=await c.keys();return {ks,n:reqs.length,img:reqs.filter(r=>/\/data\/images\/(lecons|atlas)\//.test(r.url)).length,idx:!!(await c.match(location.origin+'/index.html')),par:!!(await c.match(location.origin+'/parent.html'))};});
 T('Installation réelle : un seul cache versionné, index + parent présents, aucune image de leçon/atlas précachée',inst.ks.filter(k=>k.startsWith('mathquest-')).length===1&&inst.idx&&inst.par&&inst.img===0&&inst.n>=list.length*0.95,JSON.stringify(inst));
 // d'anciens caches et des données utilisateur
 await p.evaluate(async()=>{for(const [name,url] of [['mathquest-8.0.0-tres-ancien','/old.js'],['mathquest-v1','/old2.js'],['mqimg-lecons-v1','/data/images/lecons/zz-test.webp'],['autre-application-v1','/x']]){const c=await caches.open(name);await c.put(url,new Response('x'));}
  S.xp=321;S.coins=45;save();localStorage.setItem('mq_audit_marqueur','intact');});
 const snap0=await p.evaluate(()=>({ls:Object.keys(localStorage).sort().join(','),prof:localStorage.getItem('mathquest_profiles_v2')}));
 // ===== 3. Mise à jour N → N+1
 bump(site,V2);const loads0=await p.evaluate(()=>+sessionStorage.getItem('mq_loads'));
 await p.evaluate(()=>MQPWA.check());await p.waitForSelector('.mq-update',{timeout:90000}).catch(()=>{});
 // l'activation (suppression des anciens caches) suit l'installation : on attend qu'il ne reste qu'un cache « mathquest- » (30 s max)
 await p.evaluate(async()=>{const t0=Date.now();while(Date.now()-t0<30000){const ks=await caches.keys(),r=await navigator.serviceWorker.getRegistration();if(ks.filter(k=>k.startsWith('mathquest-')).length===1&&r.active&&!r.installing&&!r.waiting)return;await new Promise(r=>setTimeout(r,250));}});
 const ks1=await p.evaluate(async()=>(await caches.keys()).sort());
 T('Mise à jour installée : anciens caches « mathquest- » supprimés, cache d’images et cache étranger conservés',!ks1.some(k=>/mathquest-(?:8\.0\.0|v1|9\.20)/.test(k))&&ks1.includes('mqimg-lecons-v1')&&ks1.includes('autre-application-v1')&&ks1.filter(k=>k.startsWith('mathquest-')).length===1&&ks1.some(k=>k.includes(V2)),ks1.join(', '));
 const loads1=await p.evaluate(()=>+sessionStorage.getItem('mq_loads'));
 T('Nouvelle version : aucun rechargement automatique (la page ouverte n’est pas rechargée sous les pieds de l’élève)',loads1===loads0,`${loads0} → ${loads1}`);
 await Promise.all([p.waitForNavigation({waitUntil:'load'}),p.click('[data-a="appupdate"]')]);await p.waitForTimeout(4000);
 const after=await p.evaluate(()=>({loads:+sessionStorage.getItem('mq_loads'),v:window.MQ_APP_VERSION,app:document.getElementById('app').innerText.length,xp:S.xp,coins:S.coins,mark:localStorage.getItem('mq_audit_marqueur'),ls:Object.keys(localStorage).sort().join(','),prof:localStorage.getItem('mathquest_profiles_v2'),upd:!!document.querySelector('.mq-update')}));
 T('Après « Mettre à jour » : exactement 1 rechargement en 4 s (pas de boucle), page non blanche, bandeau disparu',after.loads===loads0+1&&after.app>50&&!after.upd,JSON.stringify({l:after.loads,l0:loads0,app:after.app,upd:after.upd}));
 const sameProf=(()=>{try{const a=JSON.parse(snap0.prof),b=JSON.parse(after.prof);return a.active===b.active&&Object.keys(a.profiles).join()===Object.keys(b.profiles).join();}catch(e){return false;}})();
 T('localStorage intact après la mise à jour (mêmes clés, même profil actif, XP/pièces et marqueur conservés)',after.ls===snap0.ls&&after.mark==='intact'&&after.xp===321&&after.coins===45&&sameProf,`${snap0.ls===after.ls} ${after.xp}/${after.coins} ${after.mark} ${sameProf}`);
 // ===== 4. Mise à jour CASSÉE : un fichier du pré-cache disparaît côté serveur
 const victim=path.join(site,'js','app-pwa.js'),keep=fs.readFileSync(victim);const verOf=()=>p.evaluate(()=>new Promise(res=>{const ch=new MessageChannel();ch.port1.onmessage=e=>res(e.data&&e.data.version);navigator.serviceWorker.controller.postMessage({type:'version'},[ch.port2]);setTimeout(()=>res(null),3000);}));
 fs.unlinkSync(victim);bump(site,V3);
 await p.evaluate(async()=>{try{const r=await navigator.serviceWorker.getRegistration();await r.update();}catch(e){}});// l'installation cassée échoue seulement après avoir parcouru tout le pré-cache : on attend sa fin (60 s max)
 await p.evaluate(async()=>{const t0=Date.now();await new Promise(r=>setTimeout(r,1500));while(Date.now()-t0<60000){const r=await navigator.serviceWorker.getRegistration();if(!r.installing&&!r.waiting)return;await new Promise(r=>setTimeout(r,300));}});
 const broken=await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();const ks=await caches.keys();return {waiting:!!r.waiting,installing:!!r.installing,mq:ks.filter(k=>k.startsWith('mathquest-'))};});
 const vNow=await verOf();
 T('Mise à jour cassée (fichier absent du serveur) : l’ancien service worker reste actif (version N+1 intacte), rien n’est mis en attente',vNow===V2&&!broken.waiting&&!broken.installing,JSON.stringify({vNow,broken}));
 // l'ancien cache complet est toujours là et sert l'appli hors ligne
 await stop(srv);
 const off=await ctx.newPage();hook(off);let offRes={};try{await off.goto(url+'index.html',{waitUntil:'load',timeout:20000});await off.waitForTimeout(400);offRes=await off.evaluate(()=>({v:window.MQ_APP_VERSION,pwa:typeof MQPWA,app:document.getElementById('app').innerText.length,xp:S.xp,q:(()=>{try{startMission([reco().id]);return !!(M&&M.q);}catch(e){return String(e);}})()}));}catch(e){offRes={err:e.message};}
 T('Après la mise à jour cassée, démarrage hors ligne : appli complète (anciennes scripts, y compris celui qui a disparu du serveur), progression et exercice disponibles',!offRes.err&&offRes.pwa==='object'&&offRes.app>50&&offRes.xp===321&&offRes.q===true,JSON.stringify(offRes));
 await off.close();
 // ===== mise à jour réparée
 fs.writeFileSync(victim,keep);({srv,url}=await serve(PORT,site,{cacheControl:'max-age=600'}));
 await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForTimeout(500);
 await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update();});
 await p.evaluate(async v=>{const t0=Date.now();while(Date.now()-t0<30000){const ks=await caches.keys();if(ks.some(k=>k.includes(v))&&ks.filter(k=>k.startsWith('mathquest-')).length===1)return;await new Promise(r=>setTimeout(r,250));}},V3);
 const ks3=await p.evaluate(async()=>(await caches.keys()).sort());const vFix=await verOf();
 T('Mise à jour réparée : la version suivante s’installe, un seul cache « mathquest- » (le reste, y compris le cache partiel de la tentative cassée, est supprimé)',ks3.filter(k=>k.startsWith('mathquest-')).length===1&&ks3.some(k=>k.includes(V3))&&vFix===V3&&ks3.includes('mqimg-lecons-v1'),ks3.join(', ')+' / '+vFix);
 // aucune boucle de rechargement après activation (la page reste stable)
 const lA=await p.evaluate(()=>+sessionStorage.getItem('mq_loads'));await p.waitForTimeout(3500);const lB=await p.evaluate(()=>+sessionStorage.getItem('mq_loads'));
 T('Aucun rechargement spontané pendant 3,5 s après l’activation d’une nouvelle version',lA===lB,`${lA} → ${lB}`);
 T('Aucune erreur JavaScript, aucune réponse 4xx/5xx pendant les parcours de mise à jour',!errs.length&&!bad.length,errs.concat(bad).slice(0,5).join(' | '));
 await ctx.close();await stop(srv);try{fs.rmSync(tmp,{recursive:true,force:true});}catch(e){}return R;}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
