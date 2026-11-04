/* Projet iOS (Capacitor 8, Swift Package Manager) — vérifications STATIQUES, 04/11/2026.
   Ne nécessite ni Mac, ni Xcode, ni CocoaPods, ni navigateur : lit uniquement les fichiers versionnés sous ios/ et la configuration
   racine. Ce test NE VALIDE PAS un build iOS (cela exige Xcode) : il garantit seulement que la configuration versionnée respecte les
   engagements de confidentialité et d'identité de Finot Académie, et qu'aucun secret Apple n'entre dans le dépôt public. */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const {execFileSync}=require('child_process');
const {ROOT,main}=require('./lib');
const I=p=>path.join(ROOT,'ios',p);
const read=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8'):'';
const json=p=>{try{return JSON.parse(read(p));}catch(e){return {};}};

/* Décodeur PNG minimal (8 bits, non entrelacé, types 0/2/3/4/6) : suffit pour contrôler canal alpha et pixels. */
function decodePng(file){
 const b=fs.readFileSync(file);if(b.readUInt32BE(0)!==0x89504e47)return null;
 let off=8,ihdr=null,idat=[],trns=false,plte=null;
 while(off<b.length){const len=b.readUInt32BE(off),type=b.toString('ascii',off+4,off+8),data=b.subarray(off+8,off+8+len);
  if(type==='IHDR')ihdr={w:data.readUInt32BE(0),h:data.readUInt32BE(4),depth:data[8],ct:data[9],interlace:data[12]};
  else if(type==='IDAT')idat.push(data);else if(type==='tRNS')trns=true;else if(type==='PLTE')plte=data;
  off+=12+len;}
 const out={...ihdr,trns,hasAlpha:ihdr.ct===4||ihdr.ct===6||trns,pixel:null};
 if(ihdr.depth!==8||ihdr.interlace||![0,2,4,6].includes(ihdr.ct))return out;
 const ch={0:1,2:3,4:2,6:4}[ihdr.ct],stride=ihdr.w*ch,raw=zlib.inflateSync(Buffer.concat(idat)),px=Buffer.alloc(stride*ihdr.h);
 for(let y=0;y<ihdr.h;y++){const f=raw[y*(stride+1)];
  for(let x=0;x<stride;x++){const v=raw[y*(stride+1)+1+x],a=x>=ch?px[y*stride+x-ch]:0,u=y?px[(y-1)*stride+x]:0,c=(x>=ch&&y)?px[(y-1)*stride+x-ch]:0;
   let r=v;if(f===1)r=v+a;else if(f===2)r=v+u;else if(f===3)r=v+((a+u)>>1);else if(f===4){const p=a+u-c,pa=Math.abs(p-a),pb=Math.abs(p-u),pc=Math.abs(p-c);r=v+(pa<=pb&&pa<=pc?a:pb<=pc?u:c);}
   px[y*stride+x]=r&255;}}
 out.at=(x,y)=>{const o=y*stride+x*ch;return ch>=3?[px[o],px[o+1],px[o+2]]:[px[o],px[o],px[o]];};
 return out;}

/* Plist XML plat : renvoie la valeur de la clé de premier niveau (string/true/false/array de strings) ; undefined si absente. */
function plistTop(xml,key){
 const m=new RegExp('<key>'+key.replace(/[~]/g,'\\$&')+'</key>\\s*([\\s\\S]*?)(?=<key>|</dict>\\s*</plist>)').exec(xml);if(!m)return undefined;
 const v=m[1].trim();if(/^<true\/>/.test(v))return true;if(/^<false\/>/.test(v))return false;
 let s=/^<string>([\s\S]*?)<\/string>/.exec(v);if(s)return s[1];
 if(/^<array\/>/.test(v))return [];
 const a=/^<array>([\s\S]*?)<\/array>/.exec(v);if(a)return [...a[1].matchAll(/<string>([\s\S]*?)<\/string>/g)].map(x=>x[1]);
 return v;}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const pkg=json(path.join(ROOT,'package.json')),lock=json(path.join(ROOT,'package-lock.json'));
 const cfg=json(path.join(ROOT,'capacitor.config.json'));
 const plist=read(I('App/App/Info.plist')),pbx=read(I('App/App.xcodeproj/project.pbxproj')),spm=read(I('App/CapApp-SPM/Package.swift'));

 // 1. Dépendances et scripts
 const dep=(pkg.devDependencies||{})['@capacitor/ios'],core=(pkg.devDependencies||{})['@capacitor/core'];
 T('Dépendance @capacitor/ios épinglée, identique à @capacitor/core (versions Capacitor alignées)',/^\d+\.\d+\.\d+$/.test(dep||'')&&dep===core,JSON.stringify({ios:dep,core}));
 const lk=(lock.packages||{})['node_modules/@capacitor/ios'];
 T('package-lock.json cohérent : @capacitor/ios présent à la même version que package.json',lk&&lk.version===dep&&(lock.packages[''].devDependencies||{})['@capacitor/ios']===dep,JSON.stringify(lk&&lk.version));
 T('Script npm ios:sync = même packaging www/ qu’Android puis « cap sync ios »',pkg.scripts&&/^node scripts\/package-www\.mjs && cap sync ios$/.test(pkg.scripts['ios:sync']||''),(pkg.scripts||{})['ios:sync']);
 T('Script npm test:ios déclaré',pkg.scripts&&/tests\/ios-config\.test\.js/.test(pkg.scripts['test:ios']||''),(pkg.scripts||{})['test:ios']);
 const extra=Object.keys(pkg.devDependencies||{}).filter(k=>!['@capacitor-community/text-to-speech','@capacitor/android','@capacitor/app','@capacitor/cli','@capacitor/core','@capacitor/ios','playwright'].includes(k));
 T('Aucune autre dépendance ajoutée que @capacitor/ios',!extra.length,extra.join(', '));

 // 2. Identité et plateformes
 T('Bundle id fr.finot.academie (Debug et Release), aucun suffixe imprévu',(pbx.match(/PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g)||[]).length>=2&&(pbx.match(/PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);/g)||[]).every(x=>/= fr\.finot\.academie;/.test(x)),(pbx.match(/PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g)||[]).join(' '));
 T('Nom affiché « Finot Académie » (CFBundleDisplayName) et cohérent avec capacitor.config.json',plistTop(plist,'CFBundleDisplayName')==='Finot Académie'&&cfg.appName==='Finot Académie'&&cfg.appId==='fr.finot.academie',String(plistTop(plist,'CFBundleDisplayName')));
 T('iPhone + iPad (TARGETED_DEVICE_FAMILY = "1,2")',(pbx.match(/TARGETED_DEVICE_FAMILY = "1,2";/g)||[]).length===2,'');
 const targets=[...pbx.matchAll(/IPHONEOS_DEPLOYMENT_TARGET = ([\d.]+);/g)].map(m=>+m[1]);
 const spmMin=+((spm.match(/\.iOS\(\.v(\d+)\)/)||[])[1]||0);
 T('iOS minimal 15.0 : minimum de Capacitor 8 (projet = paquet SPM, aucune valeur plus basse ni divergente)',targets.length>=4&&targets.every(t=>t===15)&&spmMin===15,JSON.stringify({targets,spmMin}));
 const spmVer=(spm.match(/capacitor-swift-pm\.git",\s*exact:\s*"([^"]+)"/)||[])[1];
 T('Paquet SPM : capacitor-swift-pm épinglé à la version de @capacitor/core ; plugins App et TextToSpeech seulement (mêmes qu’Android)',spmVer===(pkg.devDependencies||{})['@capacitor/core']&&/CapacitorCommunityTextToSpeech/.test(spm)&&/CapacitorApp/.test(spm)&&(spm.match(/\.package\(name:/g)||[]).length===2,String(spmVer));
 const ph=plistTop(plist,'UISupportedInterfaceOrientations'),pad=plistTop(plist,'UISupportedInterfaceOrientations~ipad');
 T('Orientations libres comme Android : iPhone portrait + paysages, iPad les quatre',Array.isArray(ph)&&['Portrait','LandscapeLeft','LandscapeRight'].every(o=>ph.includes('UIInterfaceOrientation'+o))&&Array.isArray(pad)&&['Portrait','PortraitUpsideDown','LandscapeLeft','LandscapeRight'].every(o=>pad.includes('UIInterfaceOrientation'+o)),JSON.stringify({ph,pad}));
 const caps=plistTop(plist,'UIRequiredDeviceCapabilities');
 T('Capacités requises : arm64 (et non l’ancien armv7 du modèle)',Array.isArray(caps)&&caps.includes('arm64')&&!caps.includes('armv7'),JSON.stringify(caps));
 T('Interface sombre non forcée (aucun UIUserInterfaceStyle : le thème suit le système)',plistTop(plist,'UIUserInterfaceStyle')===undefined,'');
 T('Langue de développement française (les boîtes de dialogue système suivent la langue de l’app)',plistTop(plist,'CFBundleDevelopmentRegion')==='fr'&&/developmentRegion = fr;/.test(pbx),String(plistTop(plist,'CFBundleDevelopmentRegion')));

 // 3. Info.plist minimal : aucune permission ni schéma d'URL
 const forbidden=/<key>(NS[A-Za-z]*UsageDescription|NSUserTrackingUsageDescription|NSAppTransportSecurity|NSAllowsArbitraryLoads|CFBundleURLTypes|LSApplicationQueriesSchemes|UIBackgroundModes|NSUbiquitousContainers|com\.apple\.developer\.associated-domains)<\/key>/g;
 const hits=[...plist.matchAll(forbidden)].map(m=>m[1]);
 T('Info.plist : aucune usage description (micro, reconnaissance vocale, caméra, localisation, photos, contacts, suivi), aucun schéma d’URL, aucune exception ATS, aucun mode d’arrière-plan',!hits.length,hits.join(', '));
 const entFiles=fs.existsSync(I('App'))?(function w(d,o=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='public'||e.name==='build'||e.name==='Pods')continue;const p=path.join(d,e.name);if(e.isDirectory())w(p,o);else o.push(p);}return o;})(I('App')):[];
 const ents=entFiles.filter(f=>/\.entitlements$/i.test(f));
 T('Aucun fichier .entitlements (ni liens universels, ni associated-domains, ni push, ni App Groups, ni iCloud)',!ents.length&&!/CODE_SIGN_ENTITLEMENTS/.test(pbx),ents.join(', '));
 T('ITSAppUsesNonExemptEncryption = false (seul le chiffrement fourni par iOS : HTTPS du système)',plistTop(plist,'ITSAppUsesNonExemptEncryption')===false,String(plistTop(plist,'ITSAppUsesNonExemptEncryption')));
 const ver=json(path.join(ROOT,'android','store-version.json')).versionName;
 const mv=[...pbx.matchAll(/MARKETING_VERSION = ([^;]+);/g)].map(m=>m[1].replace(/"/g,'')),cv=[...pbx.matchAll(/CURRENT_PROJECT_VERSION = ([^;]+);/g)].map(m=>m[1]);
 T('Version commerciale iOS (MARKETING_VERSION) = android/store-version.json ; numéro de build entier ≥ 1 (CURRENT_PROJECT_VERSION)',/^\d+\.\d+\.\d+$/.test(String(ver))&&mv.length===2&&mv.every(v=>v===ver)&&cv.length===2&&cv.every(v=>/^[1-9]\d*$/.test(v)),JSON.stringify({ver,mv,cv}));
 T('Info.plist lit la version via les réglages du projet (CFBundleShortVersionString / CFBundleVersion)',plistTop(plist,'CFBundleShortVersionString')==='$(MARKETING_VERSION)'&&plistTop(plist,'CFBundleVersion')==='$(CURRENT_PROJECT_VERSION)','');

 // 4. Origine WebView / liens
 T('Configuration iOS : aucune URL distante (server.url), aucun cleartext ; schéma iOS par défaut (capacitor://localhost) non modifié',cfg.server&&!cfg.server.url&&!cfg.server.cleartext&&cfg.server.iosScheme===undefined,JSON.stringify(cfg.server));
 T('Configuration iOS : aperçu de lien désactivé, zones sûres gérées par le CSS (contentInset « never »), pas de limitation de domaines',cfg.ios&&cfg.ios.allowsLinkPreview===false&&cfg.ios.contentInset==='never'&&cfg.ios.limitsNavigationsToAppBoundDomains===undefined,JSON.stringify(cfg.ios));
 T('Info.plist : pas de WKAppBoundDomains (aucun domaine déclaré, aucun lien sortant côté enfant)',!/WKAppBoundDomains/.test(plist),'');

 // 5. Manifeste de confidentialité
 const pm=read(I('App/App/PrivacyInfo.xcprivacy'));
 T('PrivacyInfo.xcprivacy présent dans l’app',pm.includes('<plist')&&pm.includes('NSPrivacyTracking'),String(pm.length));
 T('Confidentialité : NSPrivacyTracking = false, aucun domaine de suivi, aucune donnée collectée',/<key>NSPrivacyTracking<\/key>\s*<false\/>/.test(pm)&&/<key>NSPrivacyTrackingDomains<\/key>\s*<array\/>/.test(pm)&&/<key>NSPrivacyCollectedDataTypes<\/key>\s*<array\/>/.test(pm),'');
 const apiTypes=[...pm.matchAll(/<key>NSPrivacyAccessedAPIType<\/key>\s*<string>([^<]+)<\/string>/g)].map(m=>m[1]);
 // Les sources de @capacitor/ios 8.6.0, @capacitor/app et text-to-speech (iOS) n'appellent aucune API « required reason » (voir docs/ios/README.md) :
 // le manifeste ne doit donc pas en déclarer sans raison (une déclaration injustifiée est refusée à la soumission).
 const reasonApis=/NSUserDefaults|UserDefaults|systemUptime|mach_absolute_time|NSFileCreationDate|NSFileModificationDate|NSURLContentModificationDateKey|NSURLCreationDateKey|getattrlist|fstat\(|NSURLVolumeAvailableCapacity|NSFileSystemFreeSize|activeInputModes/;
 const nm=path.join(ROOT,'node_modules');let sdkHits=[];
 for(const d of ['@capacitor/ios/Capacitor/Capacitor','@capacitor/ios/CapacitorCordova/CapacitorCordova','@capacitor/app/ios/Sources','@capacitor-community/text-to-speech/ios/Sources']){const base=path.join(nm,d);if(!fs.existsSync(base))continue;
  (function w(x){for(const e of fs.readdirSync(x,{withFileTypes:true})){const p=path.join(x,e.name);if(e.isDirectory())w(p);else if(/\.(swift|m|h|mm)$/.test(e.name)&&reasonApis.test(read(p)))sdkHits.push(path.relative(nm,p));}})(base);}
 const appSrc=['AppDelegate.swift','SceneDelegate.swift'].filter(f=>reasonApis.test(read(I('App/App/'+f))));
 T('API « required reason » : déclarations du manifeste = usages réels (aucun dans Capacitor 8.6, App, TextToSpeech ni le code de l’app) ; manifeste vide d’API',!sdkHits.length&&!appSrc.length&&!apiTypes.length&&/<key>NSPrivacyAccessedAPITypes<\/key>\s*<array\/>/.test(pm),JSON.stringify({apiTypes,sdkHits,appSrc}));
 T('Le manifeste est référencé dans les ressources du projet Xcode (PBXBuildFile + phase Resources)',/PrivacyInfo\.xcprivacy in Resources/.test(pbx)&&/path = PrivacyInfo\.xcprivacy;/.test(pbx)&&(pbx.match(/PrivacyInfo\.xcprivacy in Resources/g)||[]).length>=2,'');

 // 6. Icône 1024 sans alpha + AppIcon.appiconset
 const iconDir=I('App/App/Assets.xcassets/AppIcon.appiconset'),ic=json(path.join(iconDir,'Contents.json'));
 const entry=(ic.images||[]).find(i=>i.size==='1024x1024');
 T('AppIcon.appiconset : une icône 1024×1024 « universal » iOS, fichier existant',!!entry&&entry.idiom==='universal'&&entry.platform==='ios'&&fs.existsSync(path.join(iconDir,entry.filename||'∅')),JSON.stringify(entry));
 const png=entry&&fs.existsSync(path.join(iconDir,entry.filename))?decodePng(path.join(iconDir,entry.filename)):null;
 T('Icône 1024×1024 SANS canal alpha (ni type RGBA/gris+alpha, ni tRNS), requis par l’App Store',png&&png.w===1024&&png.h===1024&&png.hasAlpha===false,JSON.stringify(png&&{w:png.w,h:png.h,ct:png.ct,trns:png.trns}));
 let share='n/a',cornerOk=false;
 if(png&&png.at){let orange=0,n=0;for(let y=8;y<1024;y+=16)for(let x=8;x<1024;x+=16){const [r,g,b]=png.at(x,y);n++;if(r>200&&g>70&&g<190&&b<110)orange++;}share=+(orange/n).toFixed(3);
  cornerOk=[[0,0],[1023,0],[0,1023],[1023,1023]].every(([x,y])=>png.at(x,y).every(v=>v>=250));}
 T('Icône Finot : fond blanc opaque aux quatre coins (iOS applique lui-même le masque) et part orange marquée (renard Finot)',cornerOk&&share>=0.1,'part orange '+share);
 const fx=(ic.images||[]).filter(i=>!/^1024x1024$/.test(i.size||''));
 T('AppIcon.appiconset : aucune autre entrée obsolète sans fichier',fx.every(i=>i.filename&&fs.existsSync(path.join(iconDir,i.filename))),JSON.stringify(fx));

 // 7. Écran de démarrage crème Finot (#FFF6E8, comme le splash Android)
 const sb=read(I('App/App/Base.lproj/LaunchScreen.storyboard')),imgset=I('App/App/Assets.xcassets/Splash.imageset'),sc=json(path.join(imgset,'Contents.json'));
 T('LaunchScreen : fond crème #FFF6E8 explicite (rouge 1, vert 0.9647, bleu 0.9098), pas le blanc système',/<color key="backgroundColor" red="1" green="0\.96\d*" blue="0\.9[01]\d*" alpha="1" colorSpace="(?:custom" customColorSpace="sRGB|sRGB)"/.test(sb)&&!/systemBackgroundColor"\/>\s*<\/imageView>/.test(sb),'');
 const sFiles=(sc.images||[]).map(i=>i.filename).filter(Boolean);
 const sp=sFiles.length&&fs.existsSync(path.join(imgset,sFiles[0]))?decodePng(path.join(imgset,sFiles[0])):null;
 T('Image de démarrage : fond #FFF6E8 sur les bords, renard Finot au centre (orange), carrée, fichiers tous présents, sans doublon inutile',!!sp&&sp.at&&sFiles.every(f=>fs.existsSync(path.join(imgset,f)))&&sFiles.length===1&&sp.w===sp.h&&String(sp.at(3,3))==='255,246,232'&&String(sp.at(sp.w-4,sp.h-4))==='255,246,232'&&(()=>{let o=0;for(let y=sp.h/2-250;y<sp.h/2+250;y+=8)for(let x=sp.w/2-250;x<sp.w/2+250;x+=8){const [r,g,b]=sp.at(x,y);if(r>200&&g>70&&g<190&&b<110)o++;}return o>40;})(),JSON.stringify(sp&&{w:sp.w,h:sp.h,files:sFiles}));

 // 8. Aucun secret Apple, aucun artefact de build versionné
 let tracked=[];try{tracked=execFileSync('git',['-c','safe.directory=*','ls-files','-z','--','ios'],{cwd:ROOT,encoding:'utf8'}).split('\0').filter(Boolean);}catch(e){}
 const onDisk=[];(function w(d){if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='public'||e.name==='Pods'||e.name==='build'||e.name==='DerivedData')continue;const p=path.join(d,e.name);if(e.isDirectory())w(p);else onDisk.push(path.relative(ROOT,p).split(path.sep).join('/'));}})(I(''));
 const secret=/\.(?:p12|p8|cer|certSigningRequest|mobileprovision|provisionprofile|pem|pfx|key|keychain|ipa|xcarchive)$|(^|\/)GoogleService-Info\.plist$|(^|\/)ExportOptions\.plist$|\.entitlements$|(^|\/)(?:AuthKey_[^/]*|\.env[^/]*|fastlane\/Appfile)$/i;
 T('Aucun certificat, profil, clé API App Store Connect, GoogleService-Info.plist ni ExportOptions dans ios/ (versionné ou sur le disque)',![...tracked,...onDisk].some(f=>secret.test(f)),[...tracked,...onDisk].filter(f=>secret.test(f)).join(', '));
 const bad=[...tracked,...onDisk].filter(f=>/(^|\/)(?:Pods|build|DerivedData|xcuserdata|output)\//.test(f)||/App\/App\/public\//.test(f)||/\.xcuserstate$/.test(f));
 T('Aucun Pods/, build/, DerivedData, xcuserdata, ni copie générée de www (ios/App/App/public) versionnés',!bad.length,bad.slice(0,5).join(', '));
 const pbxSecrets=/DEVELOPMENT_TEAM = [^;]*[A-Za-z0-9]{3}[^;]*;|PROVISIONING_PROFILE(?:_SPECIFIER)? = "?[^";\s]+|CODE_SIGN_IDENTITY\[[^\]]*\] = "?(?!iPhone Developer|Apple Development|-)/;
 T('Projet Xcode : DEVELOPMENT_TEAM vide ou absent (jamais d’identifiant d’équipe), aucun profil de provisionnement figé',!pbxSecrets.test(pbx),(pbx.match(/DEVELOPMENT_TEAM = [^;]*;/g)||[]).join(' '));
 const gi=read(I('.gitignore'));
 T('ios/.gitignore exclut Pods, build, DerivedData, xcuserdata et la copie générée de www',['App/Pods','App/build','DerivedData','xcuserdata','App/App/public'].every(x=>gi.split(/\r?\n/).includes(x)),'');

 // 9. Liste blanche racine et CI
 const rgi=read(path.join(ROOT,'.gitignore')).split(/\r?\n/);
 T('.gitignore racine : ios/ et ce test autorisés nommément (liste blanche) ; certificats Apple bloqués',['!/ios/','!/ios/**','!/tests/ios-config.test.js','!/tools/ios-static-check.mjs'].every(l=>rgi.includes(l))&&['*.p12','*.mobileprovision','*.cer','GoogleService-Info.plist'].every(l=>rgi.includes(l)),'');
 const ci=read(path.join(ROOT,'.github','workflows','mathquest-ci.yml'));
 T('Workflow CI : ce test et le vérificateur statique sont exécutés par l’étape iOS nommée',/node tests\/ios-config\.test\.js/.test(ci)&&/node tools\/ios-static-check\.mjs/.test(ci)&&/- name: "Projet iOS/.test(ci),'');
 const rd=read(path.join(ROOT,'docs','ios','README.md'));
 T('docs/ios/README.md : procédure Mac (npm ci, ios:sync, ouvrir ios/App, équipe de signature, archive, TestFlight) et recette, sans prétendre à un build validé',['npm ci','npm run ios:sync','ios/App/App.xcodeproj','TestFlight','Dynamic Type','non exécuté'].every(k=>rd.includes(k))&&!/build iOS (?:est )?valid[ée]\b(?!.*non)/i.test(rd.replace(/non (?:valid|exécut)[^\n]*/gi,'')),'');
 // 10. Vérificateur statique tools/ios-static-check.mjs (project.pbxproj, plists, storyboards, assets, SPM) : projet réel + cas cassés
 const os=require('os');
 const {pathToFileURL}=require('url');
 const checker=await import(pathToFileURL(path.join(ROOT,'tools','ios-static-check.mjs')).href);
 const live=checker.checkIosProject(ROOT);
 T('Vérificateur statique : le projet réel passe toutes ses vérifications (pbxproj, plists, storyboards, assets, SPM, config)',live.length>=80&&live.every(r=>r.ok),live.length+' vérifications ; échecs : '+live.filter(r=>!r.ok).map(r=>r.id).join(' | '));
 const cp=(s,d)=>{fs.mkdirSync(path.dirname(d),{recursive:true});fs.cpSync(s,d,{recursive:true,filter:f=>!/[\\/](public|Pods|build)$/.test(f)});};
 const fixture=(edit)=>{const d=fs.mkdtempSync(path.join(os.tmpdir(),'ios-fixture-'));
  cp(path.join(ROOT,'ios'),path.join(d,'ios'));
  for(const f of ['package.json','package-lock.json','capacitor.config.json','.gitignore','scripts/package-www.mjs','android/store-version.json'])if(fs.existsSync(path.join(ROOT,f)))cp(path.join(ROOT,f),path.join(d,f));
  const pbxp=path.join(d,'ios/App/App.xcodeproj/project.pbxproj');
  edit({d,file:(rel,fn)=>{const p=path.join(d,rel);fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n')));},pbx:fn=>{fs.writeFileSync(pbxp,fn(fs.readFileSync(pbxp,'utf8').replace(/\r\n/g,'\n')));}});
  try{return checker.checkIosProject(d,{nodeModules:path.join(ROOT,'node_modules')});}finally{fs.rmSync(d,{recursive:true,force:true});}};
 // Témoin : la copie intacte doit passer (sinon les cas cassés ci-dessous ne prouveraient rien).
 const ctl=fixture(()=>{});
 T('Vérificateur statique : copie intacte du projet = aucun échec (témoin des cas cassés)',ctl.every(r=>r.ok),ctl.filter(r=>!r.ok).map(r=>r.id).join(' | '));
 const broken=[
  ['pbxproj : « ; » manquant après une valeur',e=>e.pbx(s=>s.replace('productType = "com.apple.product-type.application";','productType = "com.apple.product-type.application"')),/pbxproj : syntaxe/],
  ['pbxproj : accolade fermante manquante',e=>e.pbx(s=>s.replace(/\n\t\};\n\trootObject/,'\n\trootObject')),/pbxproj : syntaxe/],
  ['pbxproj : PBXBuildFile pointe vers un fileRef inexistant',e=>e.pbx(s=>s.replace('fileRef = 504EC3071FED79650016851F /* AppDelegate.swift */','fileRef = 504EC3071FED7965FFFFFFFF /* AppDelegate.swift */')),/aucune référence d’identifiant vers un objet inexistant|PBXBuildFile pointe/],
  ['pbxproj : identifiant d’objet de 23 caractères',e=>e.pbx(s=>s.replace(/\n\t\t504EC3041FED79650016851F \/\* App.app \*\/ = \{isa = PBXFileReference/,'\n\t\t504EC3041FED7965001685F /* App.app */ = {isa = PBXFileReference')),/24 hexadécimaux/],
  ['pbxproj : fichier Swift référencé mais supprimé du disque',e=>fs.rmSync(path.join(e.d,'ios/App/App/SceneDelegate.swift')),/chaque fichier référencé existe|tout fichier \.swift/],
  ['pbxproj : cible de déploiement divergente (14.0)',e=>e.pbx(s=>s.replace('IPHONEOS_DEPLOYMENT_TARGET = 15.0;','IPHONEOS_DEPLOYMENT_TARGET = 14.0;')),/IPHONEOS_DEPLOYMENT_TARGET/],
  ['pbxproj : DEVELOPMENT_TEAM renseigné',e=>e.pbx(s=>s.replace('CODE_SIGN_STYLE = Automatic;','CODE_SIGN_STYLE = Automatic;\n\t\t\t\tDEVELOPMENT_TEAM = ABCDE12345;')),/DEVELOPMENT_TEAM/],
  ['pbxproj : famille d’appareils iPhone seul',e=>e.pbx(s=>s.replace('TARGETED_DEVICE_FAMILY = "1,2";','TARGETED_DEVICE_FAMILY = 1;')),/TARGETED_DEVICE_FAMILY/],
  ['Info.plist : balise non fermée',e=>e.file('ios/App/App/Info.plist',s=>s.replace('<string>fr</string>','<string>fr</strin>')),/Info\.plist/],
  ['Info.plist : permission micro ajoutée',e=>e.file('ios/App/App/Info.plist',s=>s.replace('<key>CFBundleName</key>','<key>NSMicrophoneUsageDescription</key>\n\t<string>x</string>\n\t<key>CFBundleName</key>')),/aucune clé de permission/],
  ['Info.plist : orientations iPad incomplètes',e=>e.file('ios/App/App/Info.plist',s=>s.replace('\t\t<string>UIInterfaceOrientationPortraitUpsideDown</string>\n','')),/Orientations/],
  ['Info.plist : classe de scène inexistante',e=>e.file('ios/App/App/Info.plist',s=>s.replace('.SceneDelegate</string>','.SceneDelegat</string>')),/UISceneDelegateClassName/],
  ['PrivacyInfo : clé NSPrivacyTracking manquante',e=>e.file('ios/App/App/PrivacyInfo.xcprivacy',s=>s.replace('<key>NSPrivacyTracking</key>\n\t<false/>\n','')),/PrivacyInfo/],
  ['Storyboard : classe du contrôleur modifiée',e=>e.file('ios/App/App/Base.lproj/Main.storyboard',s=>s.replace('customClass="CAPBridgeViewController"','customClass="UIViewController"')),/contrôleur initial/],
  ['Storyboard : initialViewController inexistant',e=>e.file('ios/App/App/Base.lproj/LaunchScreen.storyboard',s=>s.replace('initialViewController="01J-lp-oVM"','initialViewController="zzz-zz-zzz"')),/initialViewController existant/],
  ['Icône : PNG tronqué',e=>{const p=path.join(e.d,'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');fs.writeFileSync(p,fs.readFileSync(p).subarray(0,5000));},/PNG intact/],
  ['Assets : fichier d’icône absent du disque',e=>fs.rmSync(path.join(e.d,'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png')),/AppIcon\.appiconset : Contents\.json valide/],
  ['Assets : Contents.json invalide',e=>e.file('ios/App/App/Assets.xcassets/Splash.imageset/Contents.json',s=>s.replace('"info" :','"info"')),/Splash\.imageset|assets/],
  ['SPM : capacitor-swift-pm épinglé à une autre version',e=>e.file('ios/App/CapApp-SPM/Package.swift',s=>s.replace('exact: "8.6.0"','exact: "8.5.3"')),/capacitor-swift-pm épinglé/],
  ['SPM : plateforme iOS 14',e=>e.file('ios/App/CapApp-SPM/Package.swift',s=>s.replace('.iOS(.v15)','.iOS(.v14)')),/swift-tools-version|IPHONEOS_DEPLOYMENT_TARGET/],
  ['SPM : plugin déclaré dans package.json mais absent de Package.swift',e=>e.file('ios/App/CapApp-SPM/Package.swift',s=>s.replace(',\n        .package(name: "CapacitorApp", path: "../../../node_modules/@capacitor/app")','')),/un \.package\(path:\) local par plugin/],
  ['Configuration : appId divergent',e=>e.file('capacitor.config.json',s=>s.replace('fr.finot.academie','fr.finot.autre')),/appId/]
 ];
 for(const [name,edit,re] of broken){let res;try{res=fixture(edit);}catch(err){res=[{id:'fixture (exception)',ok:false,detail:String(err)}];}
  const failed=res.filter(r=>!r.ok);
  T('Cas cassé détecté : '+name,failed.some(r=>re.test(r.id)),failed.length?failed.map(r=>r.id).join(' | '):'AUCUN échec signalé');}
 return R;}
main(run);
