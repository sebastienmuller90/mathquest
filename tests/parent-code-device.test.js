/* S-04 — le code parent est celui de l'APPAREIL : changement ou réinitialisation appliqués à TOUS les profils, et migration
   des appareils déjà installés (profils qui avaient des codes différents ou un code seulement sur certains profils),
   sans toucher aux clés de stockage ni à la progression. */
const {serve,launch}=require('./lib');
const legacy=s=>[...String(s)].reduce((a,c)=>(Math.imul(a,31)+c.charCodeAt(0))>>>0,7919).toString(36);

function oldState({activePin,bPin,cPin}){
 const mk=(name,pin,pts)=>({name,avatar:'🦊',grade:'6e',pin:pin?legacy(pin):'',rec:pin?legacy('REC'+pin):'',merit:{pts,total:pts,rules:{},rewards:[],req:[],hist:[],notes:[]}});
 return {version:2,active:'a',profiles:{a:mk('Alice',activePin,42),b:mk('Boris',bPin,7),c:mk('Clara',cPin,0)}};
}
async function load(b,url,state){
 const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();p.setDefaultTimeout(3000);
 const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.addInitScript(st=>{if(!sessionStorage.getItem('__seeded')){localStorage.setItem('mathquest_profiles_v2',JSON.stringify(st));sessionStorage.setItem('__seeded','1');}},state);
 await p.goto(url+'index.html',{waitUntil:'load'});
 await p.waitForFunction(()=>typeof S!=='undefined'&&typeof PDB==='object'&&PDB&&typeof ACT!=='undefined');
 return {p,ctx,errs};
}
const pins=p=>p.evaluate(()=>Object.fromEntries(Object.entries(PDB.profiles).map(([k,v])=>[k,v.pin])));
const recs=p=>p.evaluate(()=>Object.fromEntries(Object.entries(PDB.profiles).map(([k,v])=>[k,v.rec])));
const tryPin=async(p,v)=>{await p.evaluate(()=>{PARENT=false;L=null;localStorage.removeItem('mathquest_parentlock_v1');ACT.parent();});await p.fill('#pin',v);await p.click('[data-a="pinok"]');await p.waitForTimeout(50);return p.evaluate(()=>PARENT===true);};
const same=o=>new Set(Object.values(o)).size===1&&Object.values(o)[0]!=='';

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();
 try{
  // 1. Migration : trois profils, trois situations différentes.
  let {p,ctx,errs}=await load(b,url,oldState({activePin:'1111',bPin:'2222',cPin:''}));
  let o=await pins(p);
  T('Migration : tous les profils portent désormais le code du profil actif',same(o),JSON.stringify(o));
  T('Migration : l’ancien code d’un autre profil (2222) n’ouvre plus rien, le code de l’appareil (1111) ouvre',!(await tryPin(p,'2222'))&&await tryPin(p,'1111'));
  const keep=await p.evaluate(()=>({pts:{a:PDB.profiles.a.merit.pts,b:PDB.profiles.b.merit.pts},names:Object.values(PDB.profiles).map(v=>v.name).join(','),k1:localStorage.getItem('mathquest_profiles_v2')!==null,k2:localStorage.getItem('mathquest_v1')!==null,n:Object.keys(PDB.profiles).length}));
  T('Migration : aucune sauvegarde perdue (3 profils, noms et points intacts, clés de stockage inchangées)',keep.n===3&&keep.names==='Alice,Boris,Clara'&&keep.pts.a===42&&keep.pts.b===7&&keep.k1&&keep.k2,JSON.stringify(keep));
  const recs0=await recs(p);
  T('Migration : la clé de secours est elle aussi unifiée',same(recs0),JSON.stringify(recs0));
  T('Aucune erreur JavaScript (migration)',errs.length===0,errs.join(' | '));
  await ctx.close();

  // 2. Migration : le profil actif n'a pas de code mais un autre en a un.
  ({p,ctx,errs}=await load(b,url,oldState({activePin:'',bPin:'2222',cPin:''})));
  o=await pins(p);
  T('Migration : sans code sur le profil actif, le code existant d’un autre profil est étendu à tous (pas de porte ouverte)',same(o),JSON.stringify(o));
  T('Migration : ce code ouvre l’espace Parents depuis le profil actif',await tryPin(p,'2222'));
  await ctx.close();

  // 3. Aucun code nulle part : rien n'est inventé.
  ({p,ctx,errs}=await load(b,url,oldState({activePin:'',bPin:'',cPin:''})));
  o=await pins(p);
  T('Migration : aucun code nulle part, aucun code inventé',Object.values(o).every(v=>v===''),JSON.stringify(o));
  await ctx.close();

  // 4. Changement de code depuis les Réglages.
  ({p,ctx,errs}=await load(b,url,oldState({activePin:'1111',bPin:'1111',cPin:'1111'})));
  await p.evaluate(()=>{PARENT=true;parentScreen('reglages');});
  await p.fill('#np','9753');await p.click('[data-a="pinchange"]');await p.waitForTimeout(80);
  o=await pins(p);
  T('Changement de code : appliqué à tous les profils de l’appareil',same(o),JSON.stringify(o));
  await p.evaluate(()=>{activateProfile('b',false);});
  T('Changement de code : l’ancien code est refusé et le nouveau accepté depuis un AUTRE profil',!(await tryPin(p,'1111'))&&await tryPin(p,'9753'));
  // 5. Réinitialisation par la clé de secours.
  await p.evaluate(()=>{activateProfile('c',false);PARENT=false;ACT.forgot();});
  await p.fill('#rk','REC1111');await p.fill('#np2','2468');await p.click('[data-a="recov"]');await p.waitForTimeout(80);
  const afterRecov=await pins(p);
  T('Clé de secours (ancienne clé encore valide) : le nouveau code est appliqué à tous les profils',same(afterRecov)&&afterRecov.a!==o.a,JSON.stringify(afterRecov));
  // 6. Nouveau profil.
  await p.evaluate(()=>{createProfile();});
  const withNew=await p.evaluate(()=>Object.values(PDB.profiles).map(v=>v.pin));
  T('Nouveau profil : hérite du code de l’appareil',new Set(withNew).size===1&&withNew.length===4&&withNew[0]!=='',JSON.stringify(withNew));
  T('Aucune erreur JavaScript (changements de code)',errs.length===0,errs.join(' | '));
  await ctx.close();
 }catch(e){T('Déroulé interrompu : '+String(e.message).split(String.fromCharCode(10))[0],false);}finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
