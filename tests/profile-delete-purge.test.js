/* Suppression d'un profil (02/11/2026) — « Supprimer le profil supprime les données locales associées » doit être vrai.
   Constat avant correctif : deleteProfile() ne retirait que le profil de mathquest_profiles_v2. Restaient :
   - mathquest_import_backup (profil remplacé par un import manuel), mathquest_v1_backup (migration depuis l'ancienne structure),
   - mathquest_profiles_corrupt_backup_* (copie brute de la base quand elle était illisible, tous profils confondus),
   - les mémoires de rotation des questions (mathquest_question_rotation_v1, clés « <idProfil>|… »).
   Les copies appartenant à un AUTRE profil doivent rester intactes ; import, export et migration ne changent pas. */
const {serve,launch,seedProfile,main}=require('./lib');
const SECRET='Zéphyrine',OTHER='Bastien';

async function scenario(b,url,deleteActive){
 const ctx=await b.newContext({viewport:{width:412,height:840}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,SECRET,'CM1');
 const r=await p.evaluate(async ({SECRET,OTHER,deleteActive})=>{const w=ms=>new Promise(r=>setTimeout(r,ms));
  const idA=ACTIVE,idB='p_bastien_test';
  PDB.profiles[idB]=normalizeState({name:OTHER,grade:'CM1'});saveLocal();
  const cid=Object.keys(CHMAP)[0];
  // mémoire de rotation réelle pour les deux profils (clé « <profil>|<chapitre>|<niveau>|<mode> »)
  ACTIVE=idA;MQQuestionRotation.generate(cid,1);ACTIVE=idB;MQQuestionRotation.generate(cid,1);MQQuestionRotation.flush();
  ACTIVE=deleteActive?idA:idB;S=normalizeState(PDB.profiles[ACTIVE]);
  // copies de sécurité : celles du profil supprimé (A) et celles d'un autre profil (B)
  localStorage.setItem('mathquest_import_backup',JSON.stringify({id:idA,data:{name:SECRET},t:1}));
  localStorage.setItem('mathquest_v1_backup',JSON.stringify({name:SECRET,grade:'CM1'}));
  localStorage.setItem('mathquest_profiles_corrupt_backup_111','{"version":3,"profiles":{"'+idA+'":{"name":"'+SECRET+'"},"'+idB+'":{"name":"'+OTHER+'"}');
  localStorage.setItem('mathquest_profiles_corrupt_backup_222','{"version":3,"profiles":{"'+idB+'":{"name":"'+OTHER+'"}');
  const ok=deleteProfile(idA);await w(1300);
  const all={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);all[k]=localStorage.getItem(k);}
  const leaks=Object.entries(all).filter(([k,v])=>v.includes(SECRET)||v.includes(idA)||k.includes(idA)).map(([k])=>k);
  const rot=JSON.parse(all.mathquest_question_rotation_v1||'{"b":{}}');
  const db=JSON.parse(all.mathquest_profiles_v2);
  return {ok,idA,idB,leaks,present:!!db.profiles[idA],bKept:!!db.profiles[idB]&&db.profiles[idB].name===OTHER,
   rotA:Object.keys(rot.b).filter(k=>k.startsWith(idA+'|')).length,rotB:Object.keys(rot.b).filter(k=>k.startsWith(idB+'|')).length,
   corrupt111:'mathquest_profiles_corrupt_backup_111' in all,corrupt222:'mathquest_profiles_corrupt_backup_222' in all,
   importBackup:'mathquest_import_backup' in all,v1Backup:'mathquest_v1_backup' in all,active:ACTIVE===idA};},{SECRET,OTHER,deleteActive});
 await ctx.close();return {r,errs};}

async function keepOthers(b,url){
 // les copies d'un AUTRE profil ne doivent pas être détruites par la suppression d'un profil étranger
 const ctx=await b.newContext({viewport:{width:412,height:840}});const p=await ctx.newPage();
 await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,SECRET,'CM1');
 const r=await p.evaluate(async({SECRET,OTHER})=>{const idA=ACTIVE,idB='p_bastien_test';PDB.profiles[idB]=normalizeState({name:OTHER,grade:'CM1'});saveLocal();
  localStorage.setItem('mathquest_import_backup',JSON.stringify({id:idB,data:{name:OTHER},t:1}));
  localStorage.setItem('mathquest_v1_backup',JSON.stringify({name:OTHER,grade:'CM1'}));
  deleteProfile(idA);return {imp:!!localStorage.getItem('mathquest_import_backup'),v1:!!localStorage.getItem('mathquest_v1_backup')};},{SECRET,OTHER});
 await ctx.close();return r;}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();
 try{
  for(const [deleteActive,lab] of [[true,'profil actif'],[false,'profil non actif']]){
   const {r,errs}=await scenario(b,url,deleteActive);
   T(`Suppression (${lab}) : profil retiré, autre profil intact`,r.ok&&!r.present&&r.bKept,JSON.stringify({ok:r.ok,present:r.present,bKept:r.bKept}));
   T(`Suppression (${lab}) : mathquest_import_backup du profil supprimé purgé`,!r.importBackup,JSON.stringify({importBackup:r.importBackup}));
   T(`Suppression (${lab}) : mathquest_v1_backup (migration) du profil supprimé purgé`,!r.v1Backup,JSON.stringify({v1Backup:r.v1Backup}));
   T(`Suppression (${lab}) : copie brute « corrupt_backup » contenant le profil purgée, celle d'un autre profil conservée`,!r.corrupt111&&r.corrupt222,JSON.stringify({c111:r.corrupt111,c222:r.corrupt222}));
   T(`Suppression (${lab}) : mémoire de rotation des questions du profil supprimé purgée, celle de l'autre conservée`,r.rotA===0&&r.rotB>0,JSON.stringify({rotA:r.rotA,rotB:r.rotB}));
   T(`Suppression (${lab}) : aucune clé ni valeur du stockage local ne contient plus le prénom ni l'identifiant supprimés`,!r.leaks.length,r.leaks.join(', '));
   T(`Suppression (${lab}) : aucune erreur JavaScript`,!errs.length,errs.join(' | '));}
  const k=await keepOthers(b,url);
  T('Les copies de sécurité d\'un autre profil (import, migration) ne sont pas détruites',k.imp&&k.v1,JSON.stringify(k));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
