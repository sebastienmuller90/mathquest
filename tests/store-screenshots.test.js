/* Outil de captures Google Play (02/11/2026) — tools/store-screenshots.mjs.
   Sans émulateur : 1) contrôles statiques (écrans exigés, noms de fichiers, données fictives, mode démonstration, aucune publication) ;
   2) les MÊMES expressions de navigation que l'outil exécute sur l'AVD sont jouées contre le produit réel dans Chromium (profil créé par
   l'assistant réel, progression fictive, puis chaque écran et son attente), en format téléphone et tablette, réseau externe bloqué. */
const fs=require('fs'),path=require('path');
const {execFileSync}=require('child_process');
const {pathToFileURL}=require('url');
const {serve,launch,main,ROOT}=require('./lib');
const TOOL=path.join(ROOT,'tools','store-screenshots.mjs');
const REQUIRED=['accueil','matieres','cours','exercice','correction','parcours','lecture','dictee','finot-chat','progression','espace-parents'];

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const src=fs.existsSync(TOOL)?fs.readFileSync(TOOL,'utf8'):'';
 T('Outil versionné : tools/store-screenshots.mjs et tools/android-cdp.mjs présents',!!src&&fs.existsSync(path.join(ROOT,'tools','android-cdp.mjs')),'');
 const mod=await import(pathToFileURL(TOOL).href);
 const ids=mod.SCREENS.map(s=>s.id),names=[...mod.SCREENS.map(s=>mod.fileName(s,'phone')),...mod.SCREENS.map(s=>mod.fileName(s,'tablet'))];
 T('Écrans exigés couverts : accueil, matières, cours, exercice et correction, parcours, lecture, dictée, chat Finot, progression, espace parents',REQUIRED.every(i=>ids.includes(i)),ids.join(','));
 T('Noms de fichiers uniques ; tablette distincte du téléphone ; extension .png',new Set(names).size===names.length&&names.every(n=>/\.png$/.test(n))&&mod.fileName(mod.SCREENS[0],'tablet').includes('tablet'),names.slice(0,3).join(','));
 T('Données fictives uniquement : profil « Léo » (CM1) créé par l’assistant réel, aucune donnée réelle dans l’outil',mod.PROFILE.name==='Léo'&&mod.PROFILE.grade==='CM1'&&!/@[a-z0-9.-]+\.[a-z]{2,}|\b0[67]\d{8}\b/i.test(src),JSON.stringify(mod.PROFILE));
 T('Captures propres : barre d’état Android en mode démonstration (10:10, batterie pleine, sans notification), animations attendues, aucune publication ni envoi réseau',/sysui_demo_allowed/.test(src)&&/hhmm', '1010'/.test(src)&&/notifications', '-e', 'visible', 'false'/.test(src)&&/getAnimations/.test(src)&&!/androidpublisher|googleapis|https?:\/\/(?!127\.0\.0\.1)/.test(src.replace(/\/\*[\s\S]*?\*\//,'')),'');
 let ign='';try{ign=execFileSync('git',['-c','safe.directory='+ROOT.replace(/\\/g,'/'),'check-ignore','artifacts/google-play/store-screens/phone/01-accueil.png'],{cwd:ROOT,encoding:'utf8'}).trim();}catch(e){}
 T('Sortie par défaut dans artifacts/google-play/store-screens/ (non versionné : ignoré par Git)',/artifacts['"], 'google-play['"], 'store-screens/.test(src)&&!!ign,ign);
 T('Un écran n’est accepté que si son attente est vraie (3 essais, image trop légère refusée)',/t < 3 && !ok/.test(src)&&/image trop légère/.test(src)&&mod.SCREENS.every(s=>typeof s.expect==='string'&&s.expect.length>5),'');

 const {srv,url}=await serve();const b=await launch();
 try{for(const [lab,vp] of [['téléphone',{width:412,height:840}],['tablette',{width:1280,height:800}]]){
  const ctx=await b.newContext({viewport:vp});const external=[];await ctx.route('**/*',r=>{const u=r.request().url();if(u.startsWith(url)||u.startsWith('data:')||u.startsWith('blob:'))return r.continue();external.push(u.slice(0,80));return r.abort();});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&!!document.querySelector('#pob-name'),null,{timeout:8000});
  const prof=await p.evaluate(mod.ONBOARDING_JS);
  T(`${lab} : profil fictif créé par l’assistant d’accueil réel`,prof.name==='Léo'&&prof.grade==='CM1',JSON.stringify(prof));
  const seed=await p.evaluate(mod.SEED_JS);const kp=await p.evaluate(()=>({stars:Object.values(S.chap).reduce((a,c)=>a+(c.stars||0),0),streak:S.streak.n,xp:S.xp,act:(S.activityLog||[]).length}));
  T(`${lab} : progression fictive crédible (étoiles, série, XP, journal d’activité)`,seed.seeded>=15&&kp.stars>=20&&kp.streak===6&&kp.xp>1000&&kp.act>=12,JSON.stringify({seed,kp}));
  for(const s of mod.SCREENS){let res=null,ok=false,err='';
   for(let t=0;t<3&&!ok;t++){try{res=await p.evaluate(s.js);await p.waitForTimeout(400);ok=(await p.evaluate(`!!(${s.expect})`))===true;}catch(e){err=e.message.slice(0,120);}if(!ok){await p.evaluate('ACT.home()').catch(()=>{});await p.waitForTimeout(400);}}
   T(`${lab} : écran « ${s.id} » obtenu par les vraies actions de l’application`,ok,err||JSON.stringify(res));
   if(s.after)await p.evaluate(s.after).catch(()=>{});}
  T(`${lab} : aucune erreur JavaScript, aucune requête externe`,!errs.length&&!external.length,errs.concat(external).join(' | '));
  await ctx.close();}}
 finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
