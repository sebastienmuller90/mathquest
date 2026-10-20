/* Mise à jour de l'appli installée (20/10/2026) : site copié dans un dossier temporaire, servi localement.
   1. Première ouverture : service worker installé, version affichée dans « Plus » (identique à sw.js).
   2. N → N+1 avec l'onglet DÉJÀ OUVERT : nouvelle version publiée, vérification de mise à jour → bandeau « Nouvelle version »
      dans le flux (pas par-dessus l'écran), aucun rechargement automatique ; clic « Mettre à jour » → un seul rechargement,
      nouvelle version active et affichée, plus de bandeau, progression conservée.
   3. Image de leçon remplacée au même chemin : la nouvelle image est servie après revalidation (plus d'ancienne image figée).
   4. Démarrage 100 % hors ligne (serveur arrêté) après installation : accueil, exercice, aucune erreur. */
const fs=require('fs'),path=require('path'),os=require('os');const {serve,ROOT,chromePath}=require('./lib');
const SKIP=new Set(['tests','reports','node_modules','.git','docs']);
function copyDir(a,b){fs.mkdirSync(b,{recursive:true});for(const n of fs.readdirSync(a)){if(SKIP.has(n)||/^WORK-|\.md$/.test(n))continue;const s=path.join(a,n),d=path.join(b,n);if(fs.statSync(s).isDirectory())copyDir(s,d);else fs.copyFileSync(s,d);}}
const bump=(dir,v)=>{const sp=path.join(dir,'sw.js');fs.writeFileSync(sp,fs.readFileSync(sp,'utf8').replace(/const VERSION='[^']*';/,`const VERSION='${v}';`));};
const stop=srv=>new Promise(r=>{srv.close(()=>r());if(srv.closeAllConnections)srv.closeAllConnections();});
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,600)});
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'mq-pwa-'));const site=path.join(tmp,'site'),prof=path.join(tmp,'profile');copyDir(ROOT,site);
 const V1='9.10.0-test-n-2026-10-20',V2='9.11.0-test-n-plus-un-2026-10-20';bump(site,V1);
 // Moteur : MQ_ENGINES (premier de la liste ; « chromium » par défaut) — en CI, chaque jambe de la matrice teste le sien.
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim(),pw=require('playwright-core');const PORT=20000+Math.floor(Math.random()*2000);let {srv,url}=await serve(PORT,site);
 const ctx=await pw[eng].launchPersistentContext(prof,{...(eng==='chromium'?{executablePath:chromePath()}:{}),viewport:{width:390,height:844}});
 // Compteur de chargements de page (détecte une boucle de rechargement).
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('mq_loads',String(+(sessionStorage.getItem('mq_loads')||0)+1));}catch(e){}});
 const p=ctx.pages()[0]||await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url+'index.html',{waitUntil:'load'});
 await p.evaluate(async()=>{await navigator.serviceWorker.ready;});await p.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:60000}).catch(()=>{});
 if(!(await p.evaluate(()=>!!navigator.serviceWorker.controller))){await p.reload({waitUntil:'load'});}
 await p.fill('#nm','Maj');await p.click('[data-a="pickstage:college"]');await p.click('[data-a="pickgrade:6e"]');await p.click('[data-a="begin"]');await p.waitForTimeout(200);
 await p.evaluate(()=>MQPWA.refreshVersion());await p.evaluate(()=>{ACT.hometab('plus');});
 const v1=await p.evaluate(()=>({v:window.MQ_APP_VERSION,shown:document.querySelector('.mq-appver')?.textContent||''}));
 T(eng+' — Version identifiable : celle du service worker, affichée dans « Plus »',v1.v===V1&&v1.shown.includes(V1),JSON.stringify(v1));
 // Progression à conserver à travers la mise à jour.
 await p.evaluate(()=>{S.xp=123;save();});
 // N → N+1 : nouvelle version publiée pendant que l'onglet est ouvert.
 bump(site,V2);const img='data/images/lecons/'+fs.readdirSync(path.join(site,'data/images/lecons')).find(f=>f.endsWith('.webp'));
 const imgSize1=await p.evaluate(async u=>{const r=await fetch(u);return (await r.arrayBuffer()).byteLength;},img);
 await p.evaluate(()=>MQPWA.check());
 await p.waitForSelector('.mq-update',{timeout:90000}).catch(()=>{});
 const ban=await p.evaluate(()=>{const b=document.querySelector('.mq-update');if(!b)return null;const cs=getComputedStyle(b);return {txt:b.innerText,pos:cs.position,before:b.nextElementSibling&&b.nextElementSibling.id,loads:+sessionStorage.getItem('mq_loads')};});
 T('Nouvelle version : bandeau « Nouvelle version » dans le flux, sans rechargement automatique',ban&&/nouvelle version/i.test(ban.txt)&&ban.pos!=='fixed'&&ban.before==='app'&&ban.loads===1,JSON.stringify(ban));
 await Promise.all([p.waitForNavigation({waitUntil:'load'}),p.click('[data-a="appupdate"]')]);await p.waitForTimeout(800);
 await p.evaluate(()=>MQPWA.refreshVersion());await p.evaluate(()=>{ACT.hometab('plus');});await p.waitForTimeout(1500);
 const after=await p.evaluate(()=>({v:window.MQ_APP_VERSION,shown:document.querySelector('.mq-appver')?.textContent||'',banner:!!document.querySelector('.mq-update'),loads:+sessionStorage.getItem('mq_loads'),xp:S.xp,caches:null}));
 after.caches=await p.evaluate(async()=>(await caches.keys()).filter(k=>k.startsWith('mathquest-')));
 T('Après « Mettre à jour » : un seul rechargement, nouvelle version active et affichée, ancien cache supprimé, progression conservée',after.v===V2&&after.shown.includes(V2)&&!after.banner&&after.loads===2&&after.xp===123&&after.caches.length===1&&after.caches[0].includes(V2),JSON.stringify(after));
 // Image remplacée au même chemin : servie neuve après revalidation.
 const src=path.join(site,img),orig=fs.readFileSync(src);fs.writeFileSync(src,Buffer.concat([orig,Buffer.alloc(777)]));
 await p.evaluate(async u=>{await fetch(u);},img);await p.waitForTimeout(600);
 const imgSize2=await p.evaluate(async u=>{const r=await fetch(u);return (await r.arrayBuffer()).byteLength;},img);
 T('Image de leçon remplacée au même chemin : la nouvelle version est servie (revalidation en arrière-plan)',imgSize2===imgSize1+777,`${imgSize1} → ${imgSize2}`);
 // Démarrage 100 % hors ligne.
 await stop(srv);const p2=await ctx.newPage();p2.on('pageerror',e=>errs.push(e.message));
 let off={};try{await p2.goto(url+'index.html',{waitUntil:'load',timeout:20000});await p2.waitForTimeout(400);
  off=await p2.evaluate(()=>{const id=reco().id;startMission([id]);return {home:!!S.name,q:!!(M&&M.q),cur:CUR,v:window.MQ_APP_VERSION};});}catch(e){off={err:e.message};}
 T('Démarrage hors ligne (serveur arrêté) : appli et exercice disponibles',off.home&&off.q&&off.cur==='mission',JSON.stringify(off));
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await ctx.close();try{fs.rmSync(tmp,{recursive:true,force:true});}catch(e){}return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
