/* S-02 — limitation PERSISTANTE des tentatives de code parent (ouverture de l'espace Parents, clé de secours, suppression de profil).
   Avant correction : aucune limite, on pouvait essayer les 10 000 codes à 4 chiffres sans pause.
   Attendu : au-delà de 5 échecs consécutifs, verrou croissant (30 s, 1 min, 5 min, 15 min, 1 h), au niveau de l'appareil,
   qui survit au rechargement, remis à zéro après un succès, tolérant à un retour en arrière de l'horloge. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();
 const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();p.setDefaultTimeout(3000);
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 // Horloge pilotable : Date.now() + décalage stocké dans sessionStorage (le décalage survit au rechargement de la page).
 await p.addInitScript(()=>{const rn=Date.now.bind(Date);Date.now=()=>rn()+(+(sessionStorage.getItem('__off')||0));});
 const off=ms=>p.evaluate(v=>sessionStorage.setItem('__off',String(v)),ms);
 const toastTxt=()=>p.evaluate(()=>(document.getElementById('toast')||{}).textContent||'');
 const open=async()=>{await p.evaluate(()=>{PARENT=false;L=null;ACT.parent();});await p.waitForSelector('#pin');};
 const tryPin=async v=>{await open();await p.fill('#pin',v);await p.click('[data-a="pinok"]');await p.waitForTimeout(60);return p.evaluate(()=>({parent:PARENT===true,toast:(document.getElementById('toast')||{}).textContent||''}));};
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Parent Lock','6e');
  await p.evaluate(()=>{S.pin=hsh('2468');S.rec=hsh('ABCD2345');save();PARENT=false;});

  let r;for(let i=1;i<=4;i++){r=await tryPin('1111');}
  T('4 premiers échecs : simple « Code incorrect », pas encore de verrou',/incorrect/i.test(r.toast)&&!/Réessaie/.test(r.toast)&&!r.parent,r.toast);
  r=await tryPin('1111');
  T('5e échec : verrou de 30 s annoncé clairement (« Réessaie dans … »)',/Réessaie dans 30 secondes/.test(r.toast),r.toast);
  r=await tryPin('2468');
  T('Pendant le verrou, même le BON code est refusé',!r.parent&&/Réessaie dans (\d+) seconde/.test(r.toast),JSON.stringify(r));
  const inline=await p.evaluate(()=>{const e=document.getElementById('pinlock');return e?e.textContent+'|'+e.getAttribute('role'):'';});
  T('L’écran du code affiche aussi le message de verrou (role=status), pas seulement un toast',/Réessaie dans/.test(inline)&&/status/.test(inline),inline);

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&typeof ACT!=='undefined');
  r=await tryPin('2468');
  T('Le verrou survit au rechargement de la page',!r.parent&&/Réessaie dans/.test(r.toast),JSON.stringify(r));

  const sepKey=await p.evaluate(()=>{const k=localStorage.getItem('mathquest_parentlock_v1');return {has:!!k,inProfiles:(localStorage.getItem('mathquest_profiles_v2')||'').includes('lockUntil')};});
  T('Le verrou est stocké au niveau de l’appareil (clé propre), pas dans un profil',sepKey.has&&!sepKey.inProfiles,JSON.stringify(sepKey));

  // Autre profil + suppression : même verrou.
  await p.evaluate(()=>{PDB.profiles.k2=Object.assign(clone(DEF),{name:'Boris',pin:S.pin,rec:S.rec});saveLocal();DELPEND='k2';profilesScreen();});
  await p.fill('#pdelpin','2468');await p.click('[data-a="pdelok:k2"]');await p.waitForTimeout(80);
  T('Suppression de profil : refusée pendant le verrou (même avec le bon code), le profil est conservé',await p.evaluate(()=>!!PDB.profiles.k2)&&/Réessaie dans/.test(await toastTxt()),await toastTxt());
  await p.evaluate(()=>{PARENT=false;ACT.forgot();});await p.fill('#rk','ABCD-2345');await p.fill('#np2','1357');await p.click('[data-a="recov"]');await p.waitForTimeout(80);
  T('Clé de secours : refusée pendant le verrou (même avec la bonne clé), code inchangé',await p.evaluate(()=>PARENT!==true&&S.pin===hsh('2468'))&&/Réessaie dans/.test(await toastTxt()),await toastTxt());

  // Horloge : retour en arrière.
  await off(-5000);
  T('Petit retour de l’horloge (5 s) : ne déverrouille pas',(await p.evaluate(()=>MQParentGuard.lockState())).locked);
  const st0=await p.evaluate(()=>MQParentGuard.lockState());
  await off(-10*60*1000);
  const st1=await p.evaluate(()=>MQParentGuard.lockState());
  T('Retour de l’horloge de 10 min : toujours verrouillé, mais jamais plus longtemps que la durée initiale (pas d’enfermement indéfini)',st1.locked&&st1.remainMs<=30000,JSON.stringify([st0,st1]));
  await off(31000);
  r=await tryPin('2468');
  T('Après 30 s, le bon code ouvre l’espace Parents',r.parent,JSON.stringify(r));
  const reset=await p.evaluate(()=>MQParentGuard.lockState());
  T('Succès : compteur d’échecs remis à zéro',reset.fails===0&&!reset.locked,JSON.stringify(reset));

  // Escalade.
  await off(0);
  for(let i=0;i<5;i++)r=await tryPin('1111');
  const first=await p.evaluate(()=>MQParentGuard.lockState().remainMs);
  await off(31000);
  r=await tryPin('1111');
  const second=await p.evaluate(()=>MQParentGuard.lockState());
  T('Échec après un verrou expiré : verrou plus long (1 min)',second.locked&&second.remainMs>first&&/minute/.test(r.toast),first+' → '+JSON.stringify(second)+' '+r.toast);
  await off(31000+61000);
  r=await tryPin('1111');
  const third=await p.evaluate(()=>MQParentGuard.lockState());
  T('Le verrou continue de croître (5 min au 3e palier)',third.locked&&third.remainMs>second.remainMs&&/5 minutes/.test(r.toast),JSON.stringify(third)+' '+r.toast);

  // Stockage corrompu : pas de plantage.
  await p.evaluate(()=>localStorage.setItem('mathquest_parentlock_v1','{pas du json'));
  const ok=await p.evaluate(()=>{try{const s=MQParentGuard.lockState();return typeof s.locked==='boolean';}catch(e){return false;}});
  T('Stockage du verrou corrompu : aucun plantage (repart de zéro)',ok);
  T('Aucune erreur JavaScript',errs.length===0,errs.join(' | '));
 }catch(e){T('Déroulé interrompu : '+String(e.message).split(String.fromCharCode(10))[0],false);}finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
