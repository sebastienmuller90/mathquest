/* Couche plateforme web / natif (Capacitor Android), 31/10/2026.
   L'app native est simulée dans Chromium : le www/ réellement produit par scripts/package-www.mjs est servi tel quel, et un
   faux pont Capacitor (window.Capacitor + plugins App et TextToSpeech) est injecté avant tout script, comme le fait la
   WebView Android. La WebView Android n'a pas speechSynthesis : on l'enlève pour reproduire ce manque.
   Vérifie : détection, aucun service worker en natif (mais toujours en web), hors ligne natif, persistance après
   redémarrage, bouton Retour Android, cycle de vie (pause/reprise), réseau, lien de suivi parent public, version affichée,
   synthèse vocale native branchée sur le moteur audio existant. */
const fs=require('fs'),path=require('path'),os=require('os');
const {spawnSync}=require('child_process');
const {serve,launchEngine,ROOT,seedProfile}=require('./lib');

const FAKE_CAP=()=>{
 const calls=window.__capCalls=[],L=window.__capListeners={};
 const voices=[{name:'fr-fr-x-frb-local',lang:'fr-FR',voiceURI:'fr-fr-x-frb-local',localService:true,default:true},
  {name:'en-gb-x-gba-local',lang:'en-GB',voiceURI:'en-gb-x-gba-local',localService:true,default:false},
  {name:'it-it-x-itb-local',lang:'it-IT',voiceURI:'it-it-x-itb-local',localService:true,default:false}];
 const listener=(plugin)=>(ev,fn)=>{(L[plugin+':'+ev]=L[plugin+':'+ev]||[]).push(fn);calls.push([plugin+'.addListener',ev]);return Promise.resolve({remove(){const a=L[plugin+':'+ev];const i=a.indexOf(fn);if(i>=0)a.splice(i,1);}});};
 window.__capFire=(plugin,ev,data)=>{(L[plugin+':'+ev]||[]).slice().forEach(f=>f(data));};
 window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'android',isPluginAvailable:n=>!!window.Capacitor.Plugins[n],Plugins:{
  App:{addListener:listener('App'),minimizeApp(){calls.push(['App.minimizeApp']);return Promise.resolve();},exitApp(){calls.push(['App.exitApp']);return Promise.resolve();},
   getInfo(){return Promise.resolve({name:'Finot Académie',id:'fr.finot.academie',version:'8.73.2',build:'8073002'});}},
  TextToSpeech:{speak(o){calls.push(['TTS.speak',o]);return new Promise(r=>setTimeout(r,40));},stop(){calls.push(['TTS.stop']);return Promise.resolve();},
   getSupportedVoices(){return Promise.resolve({voices});},getSupportedLanguages(){return Promise.resolve({languages:voices.map(v=>v.lang)});},isLanguageSupported(o){return Promise.resolve({supported:voices.some(v=>v.lang===o.lang)});}}}};
 // La WebView Android n'expose pas la synthèse vocale du web.
 try{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true,writable:true});}catch(e){}
 try{Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true,writable:true});}catch(e){}
 // Espion d'enregistrement du service worker.
 window.__swRegister=0;try{if(navigator.serviceWorker){const o=navigator.serviceWorker.register.bind(navigator.serviceWorker);navigator.serviceWorker.register=(...a)=>{window.__swRegister++;return o(...a);};}}catch(e){}
};
const SW_SPY=()=>{window.__swRegister=0;try{const o=navigator.serviceWorker.register.bind(navigator.serviceWorker);navigator.serviceWorker.register=(...a)=>{window.__swRegister++;return o(...a);};}catch(e){}};

async function nativeCtx(b,url,opts={}){
 const ctx=await b.newContext({viewport:{width:opts.w||412,height:opts.h||915},hasTouch:true,serviceWorkers:'allow'});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 await ctx.addInitScript(FAKE_CAP);
 const p=await ctx.newPage();const errs=[],reqs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});p.on('request',r=>reqs.push(r.url()));
 await p.goto(url+'index.html',{waitUntil:'load'});
 return {ctx,p,errs,reqs};}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const WWW=fs.mkdtempSync(path.join(os.tmpdir(),'finot-www-rt-'));
 const pk=spawnSync(process.execPath,[path.join(ROOT,'scripts','package-www.mjs'),'--out',WWW],{encoding:'utf8'});
 T('Packaging www/ préalable réussi',pk.status===0,pk.stderr);
 const nat=await serve(0,WWW),web=await serve(0,ROOT);const b=await launchEngine('chromium');
 try{
  // ===== WEB : rien ne change
  {const ctx=await b.newContext({viewport:{width:390,height:844}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await ctx.addInitScript(SW_SPY);
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto(web.url+'index.html',{waitUntil:'load'});await p.waitForTimeout(800);
   const w=await p.evaluate(()=>({has:typeof MQPlatform==='object',kind:window.MQPlatform&&MQPlatform.kind,nat:window.MQPlatform&&MQPlatform.isNative,sw:window.__swRegister,
    link:window.MQPlatform&&MQPlatform.publicURL('parent.html#abc'),synth:typeof speechSynthesis}));
   T('Web : MQPlatform présent, plateforme « web », non natif',w.has&&w.kind==='web'&&w.nat===false,JSON.stringify(w));
   T('Web : le service worker est toujours enregistré (PWA inchangée)',w.sw>=1,JSON.stringify(w));
   T('Web : un lien public reste relatif à l’adresse de la page (aucun changement pour la PWA)',w.link===web.url+'parent.html#abc',w.link);
   T('Web : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}

  // ===== NATIF (Capacitor Android simulé, www/ embarqué)
  const {ctx,p,errs,reqs}=await nativeCtx(b,nat.url);
  await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.reload({waitUntil:'load'});
  await seedProfile(p,'Inès','CE2');await p.waitForTimeout(600);
  const d=await p.evaluate(()=>({kind:MQPlatform.kind,nat:MQPlatform.isNative,sw:window.__swRegister,ctrl:!!(navigator.serviceWorker&&navigator.serviceWorker.controller),cur:CUR}));
  T('Natif : plateforme « android » détectée via le pont Capacitor',d.kind==='android'&&d.nat===true,JSON.stringify(d));
  T('Natif : aucun service worker enregistré ni demandé (hors ligne assuré par les fichiers embarqués)',d.sw===0&&!d.ctrl&&!reqs.some(u=>/\/sw\.js/.test(u)),JSON.stringify(d));
  await p.waitForFunction(()=>document.querySelector('.mq-appver')||true);
  const ver=await p.evaluate(async()=>{for(let i=0;i<30&&!window.MQ_APP_VERSION;i++)await new Promise(r=>setTimeout(r,100));return {v:window.MQ_APP_VERSION,label:MQPWA.label()};});
  T('Natif : la version affichée est celle du paquet (finot-package.json), pas « Version de développement »',/^8\.\d+\.\d+-/.test(ver.v||'')&&/^Version 8\./.test(ver.label),JSON.stringify(ver));
  const ext=reqs.filter(u=>!u.startsWith(nat.url)&&!/^data:|^blob:/.test(u));
  T('Natif : au démarrage, aucune requête ne sort de l’app (polices et ressources embarquées)',!ext.length,ext.slice(0,5).join(' | '));

  // Lien de suivi parent : jamais https://localhost (inutilisable sur le téléphone du parent).
  const link=await p.evaluate(()=>{S.sync={child:'C'.repeat(28),parent:'P'.repeat(32)};const l=parentLink();S.sync={child:'',parent:''};return l;});
  T('Natif : le lien de suivi parent pointe vers le site public (https://sebastienmuller90.github.io/mathquest/parent.html#…)',link==='https://sebastienmuller90.github.io/mathquest/parent.html#'+'P'.repeat(32),link);

  // Bouton Retour Android
  const lis=await p.evaluate(()=>window.__capCalls.filter(c=>c[0]==='App.addListener').map(c=>c[1]));
  T('Natif : écoute du bouton Retour, de la pause, de la reprise et de l’état de l’app',['backButton','pause','resume','appStateChange'].every(e=>lis.includes(e)),lis.join(','));
  await p.evaluate(()=>ACT.mistakes());await p.waitForFunction(()=>CUR==='mistakes');
  await p.evaluate(()=>window.__capFire('App','backButton',{canGoBack:false}));await p.waitForTimeout(200);
  T('Retour Android depuis un écran secondaire : revient à l’accueil (comme le bouton ← de l’écran)',await p.evaluate(()=>CUR==='home'));
  await p.evaluate(()=>window.__capCalls.length=0);
  await p.evaluate(()=>window.__capFire('App','backButton',{canGoBack:false}));await p.waitForTimeout(200);
  T('Retour Android depuis l’accueil : l’app passe en arrière-plan (minimizeApp), sans quitter ni effacer quoi que ce soit',await p.evaluate(()=>window.__capCalls.some(c=>c[0]==='App.minimizeApp')&&CUR==='home'));
  await p.evaluate(()=>{startMission([ALLCH.find(c=>c.grade==='CE2'||/^ce2-/.test(c.id)).id]);});await p.waitForFunction(()=>CUR==='mission'||typeof M!=='undefined'&&M&&M.q,null,{timeout:4000});
  const padOk=await p.evaluate(()=>typeof PAD!=='undefined');
  if(padOk){await p.evaluate(()=>{PAD.open=true;const x=document.getElementById('pad');if(x)x.classList.add('open');document.body.classList.add('padopen');});
   await p.evaluate(()=>window.__capFire('App','backButton',{canGoBack:false}));await p.waitForTimeout(150);
   T('Retour Android avec le pavé numérique ouvert : ferme le pavé, sans quitter l’exercice',await p.evaluate(()=>!PAD.open&&typeof M!=='undefined'&&!!M));}

  // Cycle de vie : une modification non encore sauvegardée est écrite au passage en arrière-plan.
  await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home');
  await p.evaluate(()=>{S.xp=(S.xp||0)+1234;});
  await p.evaluate(()=>window.__capFire('App','pause',{}));
  const savedXp=await p.evaluate(()=>{const db=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));return {stored:db.profiles[db.active].xp,live:S.xp};});
  T('Pause Android : l’état courant est sauvegardé immédiatement (aucune perte si Android tue l’app ensuite)',savedXp.stored===savedXp.live,JSON.stringify(savedXp));
  await p.evaluate(()=>{S.coins=(S.coins||0)+7;});await p.evaluate(()=>window.__capFire('App','appStateChange',{isActive:false}));
  T('Passage en arrière-plan (appStateChange) : sauvegarde aussi',await p.evaluate(()=>{const db=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));return db.profiles[db.active].coins===S.coins;}));
  const resumed=await p.evaluate(()=>{let n=0;MQHooks.on('platform:resume',()=>n++,{id:'t-resume'});window.__capFire('App','resume',{});window.__capFire('App','appStateChange',{isActive:true});return n;});
  T('Reprise Android : l’évènement platform:resume est émis (une fois par reprise), sans erreur',resumed>=1&&resumed<=2,String(resumed));

  // Réseau
  await ctx.setOffline(true);await p.waitForTimeout(150);
  const off=await p.evaluate(()=>({on:MQPlatform.isOnline()}));
  await ctx.setOffline(false);await p.waitForTimeout(150);
  const on=await p.evaluate(()=>({on:MQPlatform.isOnline()}));
  T('Réseau : MQPlatform.isOnline() suit la connexion (hors ligne puis en ligne)',off.on===false&&on.on===true,JSON.stringify({off,on}));

  // Synthèse vocale native branchée sur le moteur existant
  const tts=await p.evaluate(async()=>{for(let i=0;i<20&&!(window.speechSynthesis&&speechSynthesis.getVoices().length);i++)await new Promise(r=>setTimeout(r,50));
   window.__capCalls.length=0;const ends=[];
   const u=new SpeechSynthesisUtterance('Bonjour Inès');u.lang='fr-FR';u.rate=.9;u.onend=()=>ends.push('end');speechSynthesis.speak(u);
   await new Promise(r=>setTimeout(r,200));
   const sp=window.__capCalls.find(c=>c[0]==='TTS.speak');
   return {voices:speechSynthesis.getVoices().map(v=>v.lang),sp:sp&&sp[1],ends,speaking:speechSynthesis.speaking};});
  T('Synthèse vocale : speechSynthesis est fourni par le moteur natif Android (voix fr, en, it listées)',['fr-FR','en-GB','it-IT'].every(l=>tts.voices.includes(l)),JSON.stringify(tts.voices));
  T('Synthèse vocale : speak() part vers le TTS natif avec texte, langue et vitesse, et onend est appelé à la fin',tts.sp&&tts.sp.text==='Bonjour Inès'&&tts.sp.lang==='fr-FR'&&Math.abs(tts.sp.rate-.9)<1e-9&&tts.ends.length===1&&tts.speaking===false,JSON.stringify(tts));
  const cancel=await p.evaluate(async()=>{window.__capCalls.length=0;const u=new SpeechSynthesisUtterance('Une longue phrase');u.lang='fr-FR';speechSynthesis.speak(u);speechSynthesis.cancel();await new Promise(r=>setTimeout(r,80));return window.__capCalls.map(c=>c[0]);});
  T('Synthèse vocale : cancel() arrête le TTS natif',cancel.includes('TTS.stop'),cancel.join(','));
  const eng=await p.evaluate(async()=>{window.__capCalls.length=0;let r=null;try{r=MQAudio.status?MQAudio.status():null;}catch(e){}
   try{MQAudio.speak([{t:'Le chat dort.',l:'fr',type:'phrase'}],{character:'finot'});}catch(e){return {err:String(e)};}
   await new Promise(r=>setTimeout(r,500));const sp=window.__capCalls.filter(c=>c[0]==='TTS.speak').map(c=>c[1]);return {sp,status:r&&r.status};});
  T('Moteur audio existant (MQAudio) : la lecture passe par le TTS natif en français',eng.sp&&eng.sp.some(o=>/chat dort/.test(o.text)&&/^fr/.test(o.lang)),JSON.stringify(eng).slice(0,400));

  // Redémarrage : nouvelle page, même stockage
  const before=await p.evaluate(()=>({name:S.name,xp:S.xp,grade:S.grade,id:ACTIVE}));
  await p.close();const p2=await ctx.newPage();const errs2=[];p2.on('pageerror',e=>errs2.push(e.message));
  await p2.goto(nat.url+'index.html',{waitUntil:'load'});await p2.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home',null,{timeout:8000}).catch(()=>{});
  const after=await p2.evaluate(()=>({name:S.name,xp:S.xp,grade:S.grade,id:ACTIVE,cur:CUR}));
  T('Redémarrage de l’app : profil, classe et progression intacts',after.name===before.name&&after.xp===before.xp&&after.grade===before.grade&&after.id===before.id&&after.cur==='home',JSON.stringify({before,after}));

  // Hors ligne natif : démarrage à froid sans aucun réseau, fichiers servis comme par la WebView (assets locaux).
  const offCtx=await b.newContext({viewport:{width:412,height:915},hasTouch:true});await offCtx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await offCtx.addInitScript(FAKE_CAP);
  const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
  const outside=[];
  await offCtx.route('**/*',route=>{const u=new URL(route.request().url());if(u.origin!=='https://localhost'){outside.push(u.href);return route.abort();}
   const f=path.join(WWW,decodeURIComponent(u.pathname==='/'?'/index.html':u.pathname));if(!f.startsWith(WWW)||!fs.existsSync(f))return route.fulfill({status:404,body:''});
   return route.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':mime[path.extname(f)]||'application/octet-stream'}});});
  await offCtx.setOffline(true);
  const po=await offCtx.newPage();const errs3=[];po.on('pageerror',e=>errs3.push(e.message));
  await po.goto('https://localhost/index.html',{waitUntil:'load'});
  await seedProfile(po,'Noé','CM1');
  await po.evaluate(()=>{startMission([ALLCH.find(c=>/^cm1-/.test(c.id)).id]);});
  const offOk=await po.waitForFunction(()=>typeof M!=='undefined'&&M&&M.q,null,{timeout:5000}).then(()=>true).catch(()=>false);
  T('Hors ligne natif : démarrage à froid sans réseau, inscription et exercice fonctionnels (origine https://localhost, sans service worker)',offOk&&!errs3.length,errs3.slice(0,3).join(' | '));
  T('Hors ligne natif : aucune tentative de requête vers l’extérieur',!outside.length,outside.slice(0,5).join(' | '));
  await offCtx.close();

  T('Natif : aucune erreur JavaScript (démarrage, retour, cycle de vie, voix, redémarrage)',!errs.length&&!errs2.length,[...errs,...errs2].slice(0,4).join(' | '));
  await ctx.close();
 }finally{await b.close();nat.srv.close();web.srv.close();fs.rmSync(WWW,{recursive:true,force:true});}
 return R;}
require('./lib').main(run);
