/* Préparation Google Play (03/11/2026) — vérifications statiques, sans JDK ni SDK : dossier docs/google-play complet,
   registre de versions cohérent avec sw.js, script de release à arrêt immédiat, aucun secret de signature dans le dépôt,
   garde-fous .gitignore, cohérence des déclarations avec le manifeste Android. */
const fs=require('fs'),path=require('path');
const {execFileSync}=require('child_process');
const {main}=require('./lib');
const ROOT=path.join(__dirname,'..');
const read=p=>{try{return fs.readFileSync(path.join(ROOT,p),'utf8');}catch(e){return '';}};
const DOCS=['data-safety-draft','families-compliance','privacy-policy-draft','store-listing-fr','store-assets-checklist','play-console-answers-draft','release-checklist','release-audit','signing'];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const missing=DOCS.filter(d=>read(`docs/google-play/${d}.md`).length<500);
 T('Dossier docs/google-play : les 9 documents sont présents et non vides',!missing.length,missing.join(', '));
 let ledger={};try{ledger=JSON.parse(read('docs/google-play/version-ledger.json'));}catch(e){}
 const codes=(ledger.uploaded||[]).map(u=>u.versionCode);
 const sw=(read('sw.js').match(/const VERSION='([^']+)'/)||[])[1]||'';const p=(sw.match(/^(\d+)\.(\d+)\.(\d+)/)||[]).slice(1).map(Number);
 const code=p.length?p[0]*1e6+p[1]*1e3+p[2]:0;
 T('Registre des versionCode : JSON valide, sans doublon, strictement croissant, inférieur ou égal au versionCode courant de sw.js',Array.isArray(ledger.uploaded)&&new Set(codes).size===codes.length&&codes.every((c,i)=>i===0||c>codes[i-1])&&codes.every(c=>c<=code),JSON.stringify({code,codes}));
 const sv=(()=>{try{return JSON.parse(read('android/store-version.json')).versionName;}catch(e){return null;}})();
 const lastName=((ledger.uploaded||[]).map(u=>u.versionName).filter(Boolean).pop())||null;
 T('Version commerciale : android/store-version.json au format X.Y.Z, cité par le script de release, strictement supérieure aux versions déjà téléversées',/^\d+\.\d+\.\d+$/.test(String(sv))&&/store-version\.json/.test(read('tools/google-play-release.mjs'))&&(!lastName||sv.split('.').map(Number).join('.')!==lastName),JSON.stringify({sv,lastName}));
 T('versionCode courant : calculé comme scripts/package-www.mjs (major·1e6 + minor·1e3 + patch), < 2 100 000 000 (limite Google Play)',code>0&&code<2100000000&&/maj\*1e6\+min\*1e3\+pat/.test(read('scripts/package-www.mjs')),String(code));
 const s=read('tools/google-play-release.mjs'),cmd=read('tools/build-google-play-release.cmd'),key=read('tools/create-upload-key.cmd');
 T('Script de release : base officielle (SHA 40 caractères), arbre propre, tests rouges, secret manquant, permission non prévue, composant exporté, identifiant .dev, versionCode déjà utilisé → arrêt immédiat',
  /OFFICIAL_BASE\s*=\s*'[0-9a-f]{40}'/.test(s)&&/merge-base', '--is-ancestor'/.test(s)&&/arbre de travail modifié/.test(s)&&/test rouge/.test(s)&&/variables manquantes/.test(s)&&/permission\(s\) non prévue/.test(s)&&/composant\(s\) exporté\(s\) inattendu/.test(s)&&/identifiant de développement/.test(s)&&/déjà téléversé/.test(s)&&/process\.exit\(1\)/.test(s),'');
 T('Script de release : aucune publication (aucune API Play, aucun envoi réseau), aucun mot de passe en clair, keystore refusé dans le dépôt',!/androidpublisher|googleapis|fetch\(|https?:\/\/(?!www\.)/.test(s.replace(/\/\*[\s\S]*?\*\//,''))&&!/Password\s*[:=]\s*['"`][^'"`$]+['"`]/.test(s)&&/est DANS le dépôt/.test(s),'');
 T('Signature : variables FINOT_UPLOAD_* (celles de app/build.gradle) uniquement ; le .cmd de génération de clé ne contient aucun mot de passe',['FINOT_UPLOAD_KEYSTORE','FINOT_UPLOAD_KEYSTORE_PASSWORD','FINOT_UPLOAD_KEY_ALIAS','FINOT_UPLOAD_KEY_PASSWORD'].every(k=>s.includes(k)&&read('android/app/build.gradle').includes(k.replace(/_PASSWORD$/,'_PASSWORD')))&&!/-storepass|-keypass/.test(key+cmd),'');
 T('Générateur de clé : le chemin fourni est canonicalisé en chemin absolu AVANT le contrôle anti-dépôt, y compris pour un argument relatif',/for %%I in \("%KS%"\) do set "KS=%%~fI"/i.test(key)&&/for %%I in \("%CD%"\) do set "REPO=%%~fI"/i.test(key)&&key.indexOf('set "KS=%%~fI"')<key.indexOf('le keystore ne doit jamais etre dans le depot'),'create-upload-key.cmd doit résoudre KS et REPO avant le test de confinement');
 let tracked=[];try{tracked=execFileSync('git',['-c','safe.directory='+ROOT.replace(/\\/g,'/'),'ls-files'],{cwd:ROOT,encoding:'utf8'}).split(/\r?\n/);}catch(e){}
 const keyFiles=tracked.filter(f=>/\.(jks|keystore|p12|pem|pfx)$|(^|\/)keystore\.properties$|(^|\/)google-services\.json$/i.test(f));
 T('Aucun keystore, clé privée ni google-services.json suivi par Git',tracked.length>100&&!keyFiles.length,keyFiles.join(', '));
 const scan=['tools/google-play-release.mjs','tools/build-google-play-release.cmd','tools/create-upload-key.cmd',...DOCS.map(d=>`docs/google-play/${d}.md`),'android/app/build.gradle','capacitor.config.json'];
 const leaks=scan.filter(f=>/-----BEGIN [A-Z ]*PRIVATE KEY-----|(store|key)Password\s*[:=]\s*['"][^'"$]{4,}['"]|sb_secret_|service_role/i.test(read(f)));
 T('Aucun secret dans les fichiers de préparation Google Play (clé privée, mot de passe littéral, clé Supabase secrète)',!leaks.length,leaks.join(', '));
 const gi=read('.gitignore');const wl=gi.indexOf('!/tools/'),prot=gi.lastIndexOf('*.jks');
 T('.gitignore : tools/ et docs/google-play/ versionnés explicitement, puis protection des clés placée APRÈS la liste blanche (*.jks, *.keystore, *.p12, *.pem, keystore.properties)',wl>0&&prot>wl&&['*.keystore','*.p12','*.pem','keystore.properties'].every(k=>gi.indexOf(k)>wl)&&/!\/docs\/google-play\//.test(gi),'');
 const man=read('android/app/src/main/AndroidManifest.xml');
 const perms=[...man.matchAll(/<uses-permission[^>]*android:name="([^"]+)"([^>]*)>/g)].filter(m=>!/tools:node="remove"/.test(m[2])).map(m=>m[1]);
 const ds=read('docs/google-play/data-safety-draft.md')+read('docs/google-play/families-compliance.md');
 T('Cohérence : INTERNET seule déclarée ; les documents affirment l’absence de micro, d’AD_ID et de publicité ; le manifeste les retire',JSON.stringify(perms)==='["android.permission.INTERNET"]'&&/RECORD_AUDIO.*absent|absent.*RECORD_AUDIO/s.test(ds)&&/AD_ID/.test(ds)&&/allowBackup="false"/.test(man),perms.join(','));
 const pa=read('docs/google-play/play-console-answers-draft.md');
 T('Réponses Play Console : V1 gratuite figée ; seules les décisions réellement dépendantes de la Console restent marquées',
  /Gratuite ou payante[^\n]*\*\*gratuite\*\*/i.test(pa)&&/Prix \| \*\*gratuit pour la V1 actuelle\*\*/.test(pa)&&
  /Pays \/ régions \| \*\*À DÉCIDER DANS PLAY CONSOLE\*\*/.test(pa)&&/Designed for Families[^\n]*À DÉCIDER DANS PLAY CONSOLE/.test(pa)&&
  !pa.includes('À DÉCIDER AVANT PUBLICATION'),'');
 const pp=read('docs/google-play/privacy-policy-draft.md'),pub=read('docs/google-play/privacy-policy-public.html'),sl=read('docs/google-play/store-listing-fr.md');
 const privacyUrl='https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html';
 T('Google Play : privacy publique finalisée, datée, sans placeholder juridique ; identité publique et contact présents',
  pp.includes('Finot Académie')&&pp.includes('UpFactory Apps')&&pp.includes('upfactory.apps@gmail.com')&&pp.includes('3 novembre 2026')&&
  pub.includes('Finot Académie')&&pub.includes('UpFactory Apps')&&pub.includes('upfactory.apps@gmail.com')&&pub.includes('3 novembre 2026')&&
  !/IDENTITÉ LÉGALE DU TITULAIRE|DATE DE PUBLICATION|\[À COMPLÉTER/.test(pp+pub)&&
  sl.includes('upfactory.apps@gmail.com')&&sl.includes(privacyUrl),'');
 T('Identifiant : le candidat de production fr.finot.academie est documenté (audit, checklist) et le suffixe .dev du debug aussi',/fr\.finot\.academie/.test(read('docs/google-play/release-audit.md'))&&/\.dev/.test(read('docs/google-play/release-audit.md'))&&/App ID/i.test(read('docs/google-play/release-checklist.md')),'');
 return R;}
if(require.main===module)main(run);
module.exports=run;
