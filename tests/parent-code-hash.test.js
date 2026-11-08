/* S-01 — empreinte du code parent : hachage SALÉ et ITÉRÉ (SHA-256 en JS pur, synchrone, sans WebCrypto), clé de secours tirée
   de crypto.getRandomValues, comparaison à temps constant, migration transparente de l'ancien hachage 32 bits.
   HONNÊTETÉ : un code à 4 chiffres n'a que 10 000 combinaisons ; le sel et les itérations ne le rendent pas « fort ». Le gain réel
   vient du verrou de tentatives (parent-attempt-lock.test.js) ; ce test vérifie seulement que l'empreinte stockée n'est plus triviale. */
const {serve,launch,seedProfile,passAdultGate}=require('./lib');
const fs=require('fs'),path=require('path');
const stripComments=s=>s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/.*$/gm,'');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();
 const p=await b.newPage({viewport:{width:390,height:844}});p.setDefaultTimeout(3000);
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 // Exécute une fonction dans la page ; une exception devient {__err} au lieu d'interrompre tout le test.
 const ev=(fn,arg)=>p.evaluate(async([src,a])=>{try{return await (0,eval)('('+src+')')(a);}catch(e){return {__err:String(e&&e.message||e)};}},[fn.toString(),arg]);
 const guardSrc=stripComments(fs.readFileSync(path.join(__dirname,'..','js','parent-guard.js'),'utf8'));
 const actSrc=fs.readFileSync(path.join(__dirname,'..','js','app-actions.js'),'utf8');
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Hash Test','6e');

  // 1. SHA-256 conforme (WebCrypto du navigateur, utilisé ici seulement comme référence).
  const vec=await ev(async()=>{const ins=['','abc','a'.repeat(55),'a'.repeat(56),'a'.repeat(64),'a'.repeat(1000),'é€𝄞 code'];const out=[];
   for(const s of ins){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));const ref=[...new Uint8Array(buf)].map(x=>x.toString(16).padStart(2,'0')).join('');out.push([s.length,MQParentGuard.sha256hex(s)===ref]);}return out;});
  T('SHA-256 JS pur : identique à WebCrypto sur 7 entrées (vide, blocs limites 55/56/64 octets, 1000 octets, Unicode)',Array.isArray(vec)&&vec.every(x=>x[1]),JSON.stringify(vec));

  // 2. Format stocké.
  const mk=async()=>{await p.evaluate(()=>{S.pin='';S.rec='';save();PARENT=false;L=null;if(MQParentGuard.adultConsume)MQParentGuard.adultConsume();ACT.parent();});await passAdultGate(p);await p.fill('#pin','2468');await p.fill('#pin2','2468');await p.click('[data-a="pinok"]');await p.waitForSelector('.reckey');return p.evaluate(()=>({pin:S.pin,rec:S.rec,key:document.querySelector('.reckey').textContent}));};
  const c1=await mk(),c2=await mk();
  T('Code stocké : format salé et itéré « s2$sel$itérations$empreinte », empreinte SHA-256 de 64 caractères hexadécimaux',/^s2\$[0-9a-f]{32}\$\d{4,7}\$[0-9a-f]{64}$/.test(c1.pin),c1.pin);
  T('Deux créations du même code donnent des empreintes différentes (sel aléatoire)',c1.pin!==c2.pin);
  const legacyOf=await ev(()=>hsh('2468'));
  T('L’empreinte stockée n’est plus l’ancien hachage 32 bits',c1.pin!==legacyOf&&!c1.pin.includes(legacyOf),legacyOf);
  T('Clé de secours stockée avec le même format salé',/^s2\$/.test(c1.rec)&&c1.rec!==c2.rec,c1.rec);

  // 3. Clé de secours : indépendante de Math.random.
  await p.evaluate(()=>{window.__mr=Math.random;Math.random=()=>0.5;});
  const k1=await mk(),k2=await mk();
  await p.evaluate(()=>{Math.random=window.__mr;});
  T('Clé de secours tirée de crypto.getRandomValues : deux clés distinctes même avec Math.random figé',k1.key!==k2.key&&/^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(k1.key)&&!/[IO01L]/.test(k1.key.replace('-','')),k1.key+' / '+k2.key);

  // 4. Vérification.
  const ver=await ev(()=>{const h=MQParentGuard.hash('2468');return {ok:MQParentGuard.verify('2468',h),bad:MQParentGuard.verify('2469',h),empty:MQParentGuard.verify('',h),nopin:MQParentGuard.verify('2468',''),legacyOk:MQParentGuard.verify('2468',hsh('2468')),legacyBad:MQParentGuard.verify('1234',hsh('2468')),junk:MQParentGuard.verify('2468','s2$zz$5$00')};});
  T('verify : accepte le bon code, refuse les autres, le vide, un format cassé ; accepte encore l’ancien format',ver.ok===true&&ver.bad===false&&ver.empty===false&&ver.nopin===false&&ver.legacyOk===true&&ver.legacyBad===false&&ver.junk===false,JSON.stringify(ver));
  const ct=await ev(()=>({a:MQParentGuard.ctEqual('abcdef','abcdef'),b:MQParentGuard.ctEqual('abcdef','abcdeg'),c:MQParentGuard.ctEqual('abc','abcd'),d:MQParentGuard.ctEqual('','')}));
  T('Comparaison à temps constant : égalité correcte (mêmes, un caractère différent, longueurs différentes)',ct.a===true&&ct.b===false&&ct.c===false,JSON.stringify(ct));
  T('Aucune comparaison directe (===) entre code saisi et empreinte stockée dans app-actions.js',!/hsh\([^)]*\)\s*[!=]==\s*S\.(pin|rec)/.test(actSrc)&&!/S\.(pin|rec)\s*[!=]==\s*hsh/.test(actSrc));
  T('Aucune dépendance à crypto.subtle ni à Math.random dans parent-guard.js (synchrone, fonctionne sous file://)',!/crypto\.subtle/.test(guardSrc)&&!/Math\.random/.test(guardSrc));
  const sub=await ev(()=>{Object.defineProperty(crypto,'subtle',{value:undefined,configurable:true});const h=MQParentGuard.hash('1357');return MQParentGuard.verify('1357',h);});
  T('Le hachage fonctionne même sans crypto.subtle (contexte non sécurisé / file://)',sub===true,JSON.stringify(sub));
  const t=await ev(()=>{const a=performance.now();const h=MQParentGuard.hash('2468');MQParentGuard.verify('2468',h);return performance.now()-a;});
  T('Coût raisonnable : hachage + vérification en moins de 600 ms (poste de test)',typeof t==='number'&&t<600,t);

  // 5. Migration transparente de l'ancien hachage au déverrouillage réussi.
  await p.evaluate(()=>{PDB.profiles.k2=Object.assign(clone(DEF),{name:'Autre'});MQParentGuard.setCode(hsh('2468'),hsh('ABCD2345'));save();localStorage.removeItem('mathquest_parentlock_v1');PARENT=false;L=null;ACT.parent();});
  await p.fill('#pin','2469');await p.click('[data-a="pinok"]');await p.waitForTimeout(60);
  const wrong=await p.evaluate(()=>({parent:PARENT===true,pin:S.pin}));
  await p.evaluate(()=>{PARENT=false;L=null;ACT.parent();});await p.fill('#pin','2468');await p.click('[data-a="pinok"]');await p.waitForTimeout(60);
  const mig=await p.evaluate(()=>({parent:PARENT===true,all:Object.values(PDB.profiles).map(v=>v.pin)}));
  T('Ancien hachage : un mauvais code reste refusé et ne migre rien',!wrong.parent&&wrong.pin===legacyOf,JSON.stringify(wrong));
  T('Ancien hachage : le bon code déverrouille ET migre vers le nouveau format, sur tous les profils',mig.parent&&mig.all.length>=2&&mig.all.every(x=>/^s2\$/.test(x)),JSON.stringify(mig.all));
  await p.evaluate(()=>{PARENT=false;L=null;ACT.parent();});await p.fill('#pin','2468');await p.click('[data-a="pinok"]');await p.waitForTimeout(60);
  T('Après migration, le même code déverrouille toujours',await p.evaluate(()=>PARENT===true));
  // Ancienne clé de secours : migrée à son utilisation.
  await p.evaluate(()=>{PARENT=false;L=null;ACT.forgot();});await p.fill('#rk','ABCD-2345');await p.fill('#np2','8642');await p.click('[data-a="recov"]');await p.waitForTimeout(80);
  const rc=await p.evaluate(()=>({parent:PARENT===true,pins:Object.values(PDB.profiles).map(v=>v.pin),recs:Object.values(PDB.profiles).map(v=>v.rec)}));
  T('Ancienne clé de secours : acceptée une fois, puis code et clé migrés au nouveau format sur tous les profils',rc.parent&&rc.pins.every(x=>/^s2\$/.test(x))&&rc.recs.every(x=>/^s2\$/.test(x)),JSON.stringify(rc));
  T('Aucune erreur JavaScript',errs.length===0,errs.join(' | '));
 }catch(e){T('Déroulé interrompu : '+String(e.message).split(String.fromCharCode(10))[0],false);}finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
