/* Sauvegarde Android des données d'enfant (31/10/2026) — test statique dédié.
   Décision : AUCUNE sauvegarde automatique ni transfert d'appareil à appareil des données de l'app (profils, progression,
   historique, erreurs, préférences, code parent, codes de suivi), pour éviter tout transfert involontaire de données d'enfant
   vers un autre compte ou appareil. Le parent garde un moyen volontaire : l'export / import manuel de l'espace parents.
   Android ≤ 11 : allowBackup="false" + fullBackupContent="false".
   Android 12+ (cible 31+) : allowBackup="false" n'empêche PAS le transfert d'appareil à appareil → dataExtractionRules
   excluant tous les domaines, pour cloud-backup ET device-transfer. */
const fs=require('fs'),path=require('path');
const {ROOT}=require('./lib');
const read=p=>{try{return fs.readFileSync(path.join(ROOT,'android',p),'utf8');}catch(e){return '';}};
const DOMAINS=['root','file','database','sharedpref','external','device_root','device_file','device_database','device_sharedpref'];

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const man=read('app/src/main/AndroidManifest.xml'),app=(man.match(/<application[\s\S]*?>/)||[''])[0];
 T('allowBackup="false" (aucune sauvegarde Google Drive des données d’enfant)',/android:allowBackup="false"/.test(app),app.replace(/\s+/g,' ').slice(0,300));
 T('fullBackupContent="false" (Android 6 à 11)',/android:fullBackupContent="false"/.test(app),'');
 T('dataExtractionRules déclarées (Android 12+ : sinon le transfert d’appareil à appareil reste actif)',/android:dataExtractionRules="@xml\/data_extraction_rules"/.test(app),'');
 const x=read('app/src/main/res/xml/data_extraction_rules.xml');
 const sec=tag=>(x.match(new RegExp('<'+tag+'[^>]*>([\\s\\S]*?)</'+tag+'>'))||[])[1]||'';
 for(const tag of ['cloud-backup','device-transfer']){const body=sec(tag);
  const missing=DOMAINS.filter(d=>!new RegExp('<exclude\\s+domain="'+d+'"\\s+path="\\."\\s*/>').test(body));
  T(`${tag} : tous les domaines exclus (aucun <include>)`,body&&!/<include/.test(body)&&!missing.length,missing.join(', ')||(body?'':'section absente'));}
 T('Aucune autre règle de sauvegarde (backup_rules / BackupAgent) qui réintroduirait des données',!/backupAgent|backup_rules/.test(man)&&!fs.existsSync(path.join(ROOT,'android/app/src/main/res/xml/backup_rules.xml')),'');
 return R;}
require('./lib').main(run);
