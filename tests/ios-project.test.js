/* Port iOS Finot Académie — contrat statique du projet natif Capacitor. */
const fs=require('fs'),path=require('path');
const {main}=require('./lib');
const ROOT=path.join(__dirname,'..');
const read=p=>{try{return fs.readFileSync(path.join(ROOT,p),'utf8');}catch(e){return '';}};
const exists=p=>fs.existsSync(path.join(ROOT,p));

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 let pkg={};try{pkg=JSON.parse(read('package.json'));}catch(e){}
 const deps={...(pkg.dependencies||{}),...(pkg.devDependencies||{})};
 T('@capacitor/ios est épinglé sur la même version 8.6.0 que Capacitor Core/CLI',deps['@capacitor/ios']==='8.6.0'&&deps['@capacitor/core']==='8.6.0'&&deps['@capacitor/cli']==='8.6.0',JSON.stringify({ios:deps['@capacitor/ios'],core:deps['@capacitor/core'],cli:deps['@capacitor/cli']}));
 T('Script ios:sync présent et reconstruit www avant cap sync ios',/package:www/.test(String(pkg.scripts?.['ios:sync']))&&/cap sync ios/.test(String(pkg.scripts?.['ios:sync'])),String(pkg.scripts?.['ios:sync']));
 const pbx=read('ios/App/App.xcodeproj/project.pbxproj');
 T('Projet Xcode iOS versionné',exists('ios/App/App.xcodeproj/project.pbxproj')&&pbx.length>1000,pbx.length);
 T('Bundle ID de production = fr.finot.academie',/PRODUCT_BUNDLE_IDENTIFIER = fr\.finot\.academie;/.test(pbx),'');
 const targets=[...pbx.matchAll(/IPHONEOS_DEPLOYMENT_TARGET = ([0-9.]+);/g)].map(m=>m[1]);
 T('Deployment target iOS >= 15.0 partout',targets.length>0&&targets.every(v=>Number(v)>=15),JSON.stringify(targets));
 T('Capacitor 8 utilise le projet SPM natif',exists('ios/App/CapApp-SPM/Package.swift')||exists('ios/CapApp-SPM/Package.swift'),'Package.swift SPM absent');
 const info=read('ios/App/App/Info.plist');
 T('Info.plist présent sans usage micro/caméra/localisation',info.length>100&&!/NSMicrophoneUsageDescription|NSCameraUsageDescription|NSLocation(?:WhenInUse|Always)UsageDescription/.test(info),'');
 T('AppDelegate Swift présent',exists('ios/App/App/AppDelegate.swift'),'');
 const cap=JSON.parse(read('capacitor.config.json')||'{}');
 T('Capacitor conserve appId fr.finot.academie et webDir www',cap.appId==='fr.finot.academie'&&cap.webDir==='www',JSON.stringify({appId:cap.appId,webDir:cap.webDir}));
 return R;
}
if(require.main===module)main(run);
module.exports=run;
