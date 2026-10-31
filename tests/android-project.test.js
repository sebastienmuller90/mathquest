/* Projet Android (Capacitor 8) prêt pour Google Play / Galaxy Store — vérifications statiques, 31/10/2026.
   Ne nécessite ni JDK ni SDK Android : contrôle la configuration versionnée (capacitor.config.json, Gradle, manifeste,
   ressources), les permissions déclarées par chaque plugin, l'absence de tout secret de signature, et la synchronisation
   réelle www/ → android/app/src/main/assets/public (npx cap copy). Les pixels des icônes sont lus par Chromium. */
const fs=require('fs'),path=require('path');
const {spawnSync,execFileSync}=require('child_process');
const {ROOT,launchEngine}=require('./lib');
const A=p=>path.join(ROOT,'android',p);
const read=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 // 1. capacitor.config.json
 let cfg={};try{cfg=JSON.parse(read(path.join(ROOT,'capacitor.config.json')));}catch(e){}
 T('capacitor.config.json : identifiant de DÉVELOPPEMENT par défaut (fr.finot.academie.dev), nom « Finot Académie », webDir www',cfg.appId==='fr.finot.academie.dev'&&cfg.appName==='Finot Académie'&&cfg.webDir==='www',JSON.stringify({appId:cfg.appId,appName:cfg.appName,webDir:cfg.webDir}));
 T('Origine figée https://localhost (changer schéma ou hôte effacerait localStorage, donc tous les profils)',cfg.server&&cfg.server.androidScheme==='https'&&cfg.server.hostname==='localhost'&&!cfg.server.url&&!cfg.server.cleartext,JSON.stringify(cfg.server));
 T('WebView durcie : pas de contenu mixte, pas de débogage distant en production',cfg.android&&cfg.android.allowMixedContent===false&&cfg.android.webContentsDebuggingEnabled===false,JSON.stringify(cfg.android));
 T('Zones sûres : SystemBars insetsHandling « native » (les env(safe-area-inset-*) existants suffisent)',cfg.plugins&&cfg.plugins.SystemBars&&cfg.plugins.SystemBars.insetsHandling==='native',JSON.stringify(cfg.plugins));

 // 2. Gradle
 const g=read(A('app/build.gradle')),v=read(A('variables.gradle')),root=read(A('build.gradle'));
 const num=k=>+((v.match(new RegExp(k+'\\s*=\\s*(\\d+)'))||[])[1]||0);
 T('SDK : minSdk 24, compileSdk ≥ 36, targetSdk ≥ 36 (exigence Google Play depuis le 31/08/2026)',num('minSdkVersion')===24&&num('compileSdkVersion')>=36&&num('targetSdkVersion')>=36,JSON.stringify({min:num('minSdkVersion'),compile:num('compileSdkVersion'),target:num('targetSdkVersion')}));
 T('Namespace de code stable « fr.finot.academie » ; applicationId configurable (finotAppId / FINOT_APP_ID), « .dev » par défaut, format validé',/namespace\s*=?\s*"fr\.finot\.academie"/.test(g)&&/findProperty\('finotAppId'\)/.test(g)&&/FINOT_APP_ID/.test(g)&&/'fr\.finot\.academie\.dev'/.test(g)&&/applicationId\s+finotAppId/.test(g)&&/GradleException/.test(g),'');
 T('versionCode / versionName lus dans finot-package.json embarqué (jamais codés en dur)',/finot-package\.json/.test(g)&&/versionCode\s+finot\.versionCode/.test(g)&&/versionName\s+finot\.versionName/.test(g)&&!/versionCode\s+\d/.test(g),'');
 T('Signature : uniquement par variables d’environnement (FINOT_UPLOAD_*), aucun mot de passe ni chemin de clé dans Git',/System\.getenv\('FINOT_UPLOAD_KEYSTORE'\)/.test(g)&&!/storePassword\s+["']/.test(g)&&!/keyPassword\s+["']/.test(g),'');
 T('Aucun service Google (Firebase, google-services) : pas de SDK de suivi',!/google-services|gms/.test(g+root),'');

 // 3. Manifeste et sécurité réseau
 const man=read(A('app/src/main/AndroidManifest.xml'));
 const perms=[...man.matchAll(/<uses-permission[^>]*android:name="([^"]+)"([^>]*)>/g)].filter(m=>!/tools:node="remove"/.test(m[2])).map(m=>m[1]);
 T('Permissions minimales : INTERNET seule (suivi parent à distance facultatif)',JSON.stringify(perms)==='["android.permission.INTERNET"]',perms.join(', '));
 T('Identifiant publicitaire explicitement retiré (AD_ID, tools:node="remove")',/com\.google\.android\.gms\.permission\.AD_ID"[^>]*tools:node="remove"|tools:node="remove"[^>]*com\.google\.android\.gms\.permission\.AD_ID"/.test(man.replace(/\s+/g,' ')),'');
 const nsc=read(A('app/src/main/res/xml/network_security_config.xml'));
 T('Réseau : trafic en clair interdit (network_security_config, aucun usesCleartextTraffic)',/android:networkSecurityConfig="@xml\/network_security_config"/.test(man)&&/cleartextTrafficPermitted="false"/.test(nsc)&&!/cleartextTrafficPermitted="true"/.test(nsc)&&!/usesCleartextTraffic="true"/.test(man),'');
 const fp=read(A('app/src/main/res/xml/file_paths.xml'));
 T('FileProvider : aucun accès global au stockage externe ; cache interne uniquement',!/external-path\b/.test(fp)&&/<cache-path\b[^>]*path="\."/.test(fp),fp.replace(/\s+/g,' ').trim());
 const filters=[...man.matchAll(/<intent-filter[\s\S]*?<\/intent-filter>/g)].map(m=>m[0]);
 T('Aucun lien profond ni intent exporté en dehors du lanceur',filters.length===1&&/MAIN/.test(filters[0])&&/LAUNCHER/.test(filters[0])&&!/android\.intent\.action\.VIEW/.test(man),filters.length+' intent-filter');
 T('Rotation, clavier et thème sombre sans redémarrage de l’activité (configChanges)',['orientation','screenSize','keyboardHidden','uiMode','smallestScreenSize','screenLayout'].every(k=>new RegExp('configChanges="[^"]*\\b'+k+'\\b').test(man)),'');
 T('Orientation libre (téléphones et tablettes, portrait et paysage)',!/screenOrientation=/.test(man),'');
 const plugins=[];for(const dir of ['@capacitor/android/capacitor','@capacitor/app/android','@capacitor-community/text-to-speech/android']){const m=read(path.join(ROOT,'node_modules',dir,'src/main/AndroidManifest.xml'));plugins.push({dir,perms:[...m.matchAll(/<uses-permission[^>]*android:name="([^"]+)"/g)].map(x=>x[1])});}
 T('Plugins natifs : aucune permission ajoutée (Capacitor, App, TextToSpeech)',plugins.every(p=>!p.perms.length),JSON.stringify(plugins));

 // 4. Nom, icônes, écran de démarrage
 T('Nom affiché « Finot Académie »',/<string name="app_name">Finot Académie<\/string>/.test(read(A('app/src/main/res/values/strings.xml'))),'');
 const adapt=read(A('app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml'));
 T('Icône adaptative : fond #7C3AED + premier plan Finot',/<background android:drawable="@color\/ic_launcher_background"\/>/.test(adapt)&&/<foreground android:drawable="@mipmap\/ic_launcher_foreground"\/>/.test(adapt)&&/#7C3AED/i.test(read(A('app/src/main/res/values/ic_launcher_background.xml'))),'');
 T('Logo Capacitor du modèle supprimé (drawable vectoriel inutilisé)',!fs.existsSync(A('app/src/main/res/drawable-v24/ic_launcher_foreground.xml'))&&!fs.existsSync(A('app/src/main/res/drawable/ic_launcher_background.xml')),'');
 const st=read(A('app/src/main/res/values/styles.xml'));
 T('Écran de démarrage Android 12+ : fond #F4F1FF, icône Finot, puis thème de l’app',/windowSplashScreenBackground">@color\/finot_splash_background/.test(st)&&/postSplashScreenTheme">@style\/AppTheme\.NoActionBar/.test(st)&&/#F4F1FF/i.test(read(A('app/src/main/res/values/colors.xml'))),'');
 const b=await launchEngine('chromium');const pg=await b.newPage();
 const px=async(file,points)=>pg.evaluate(async({uri,points})=>{const im=new Image();im.src=uri;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
  return {w:im.width,h:im.height,p:points.map(([fx,fy])=>Array.from(x.getImageData(Math.min(im.width-1,Math.round(fx*im.width)),Math.min(im.height-1,Math.round(fy*im.height)),1,1).data))};},{uri:'data:image/png;base64,'+fs.readFileSync(file).toString('base64'),points});
 const dens={mdpi:1,hdpi:1.5,xhdpi:2,xxhdpi:3,xxxhdpi:4};const bad=[];
 for(const [d,k] of Object.entries(dens)){
  const fg=await px(A(`app/src/main/res/mipmap-${d}/ic_launcher_foreground.png`),[[.5,.5],[.01,.01],[.27,.5]]);
  if(fg.w!==Math.round(108*k)||fg.p[0][3]!==255||fg.p[1][3]!==0)bad.push(d+' foreground '+JSON.stringify(fg));
  for(const n of ['ic_launcher','ic_launcher_round']){const ic=await px(A(`app/src/main/res/mipmap-${d}/${n}.png`),[[.5,.5]]);if(ic.w!==Math.round(48*k)||ic.p[0][3]!==255)bad.push(d+' '+n+' '+JSON.stringify(ic));}
  const sp=await px(A(`app/src/main/res/drawable-port-${d}/splash.png`),[[.02,.02],[.5,.5]]);
  if(String(sp.p[0].slice(0,3))!=='244,241,255')bad.push(d+' splash '+JSON.stringify(sp));}
 // Le fox de Finot est au centre : pixel central blanc/clair du disque, jamais le fond du modèle Capacitor.
 T('Icônes (5 densités, tailles exactes, opaques au centre, premier plan transparent en bordure) et splash Finot (#F4F1FF)',!bad.length,bad.slice(0,4).join(' | '));
 await b.close();

 // 5. Aucun secret
 const tracked=execFileSync('git',['-c','safe.directory=*','ls-files','-z','--','android','capacitor.config.json'],{cwd:ROOT,encoding:'utf8'}).split('\0').filter(Boolean);
 const onDisk=[];(function walk(d){if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='node_modules'||e.name==='build'||e.name==='.gradle')continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else onDisk.push(path.relative(ROOT,p));}})(A(''));
 const secret=/\.(?:jks|keystore|p12|pem)$|keystore\.properties$|google-services\.json$|local\.properties$/i;
 T('Aucune clé de signature, keystore.properties, google-services.json ou local.properties dans Git',!tracked.some(f=>secret.test(f)),tracked.filter(f=>secret.test(f)).join(', '));
 const gi=read(A('.gitignore'));
 T('android/.gitignore exclut clés et propriétés locales (*.jks, *.keystore, keystore.properties)',/^\*\.jks$/m.test(gi)&&/^\*\.keystore$/m.test(gi)&&/^keystore\.properties$/m.test(gi)&&/^local\.properties$/m.test(gi),'');
 T('Aucune clé présente sur le disque dans android/ (hors build)',!onDisk.some(f=>/\.(?:jks|keystore|p12)$/i.test(f)),onDisk.filter(f=>/\.(?:jks|keystore|p12)$/i.test(f)).join(', '));

 // 6. Synchronisation réelle www/ → assets Android
 const sync=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run','-s','android:sync'],{cwd:ROOT,encoding:'utf8',shell:process.platform==='win32',timeout:600000});
 T('npm run android:sync : packaging + cap sync android réussis',sync.status===0,(sync.stdout+sync.stderr).slice(-600));
 const pub=A('app/src/main/assets/public');let www={},emb={};
 try{www=JSON.parse(read(path.join(ROOT,'www','finot-package.json')));emb=JSON.parse(read(path.join(pub,'finot-package.json')));}catch(e){}
 const swv=(read(path.join(ROOT,'sw.js')).match(/const VERSION='([^']+)'/)||[])[1];
 T('Assets Android = www/ (même empreinte), version = sw.js',emb.digest&&emb.digest===www.digest&&emb.version===swv,JSON.stringify({emb:emb.digest,www:www.digest,v:emb.version,swv}));
 const extra=[];(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else extra.push(path.relative(pub,p).split(path.sep).join('/'));}})(pub);
 const listed=new Set((emb.files||[]).map(f=>f.path).concat('finot-package.json','cordova.js','cordova_plugins.js'));
 const unexpected=extra.filter(f=>!listed.has(f));
 T('Assets Android : aucun fichier en plus de ceux du paquet (à part les fichiers techniques de Capacitor)',!unexpected.length,unexpected.slice(0,8).join(' | '));
 const capCfg=JSON.parse(read(A('app/src/main/assets/capacitor.config.json'))||'{}');
 T('Configuration embarquée cohérente (origine https://localhost, débogage désactivé)',capCfg.server&&capCfg.server.androidScheme==='https'&&capCfg.android&&capCfg.android.webContentsDebuggingEnabled===false,JSON.stringify(capCfg.server));
 return R;}
require('./lib').main(run);
