/* Interfaces abstraites (31/10/2026) : statistiques d'usage (MQAnalytics) et droits d'accès (MQEntitlements).
   Statistiques : désactivées par défaut, aucun fournisseur, aucun identifiant (ni publicitaire, ni appareil, ni installation),
   aucune empreinte, aucune donnée nominative ; seuls des noms d'évènements connus et des propriétés simples passent.
   Droits : aucun achat branché ; l'expérience gratuite actuelle reste intégralement accessible ; tout achat passe par le
   mode parent ; état séparé et versionné, jamais synchronisé. */
const {serve,launchEngine}=require('./lib');
const {freshContext,wizard}=require('./release-lib');

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{const {ctx,p,errs}=await freshContext(b,url);const out=[];
  p.on('request',r=>{if(!r.url().startsWith(url))out.push(r.url());});
  await wizard(p,{name:'Tom',gender:'boy',birth:'2015-02-03',stage:'primaire',grade:'CM1',companion:'finot'});
  const api=await p.evaluate(()=>({a:typeof MQAnalytics,e:typeof MQEntitlements,track:typeof (window.MQAnalytics&&MQAnalytics.track),has:typeof (window.MQEntitlements&&MQEntitlements.hasPremium)}));
  T('MQAnalytics.track et MQEntitlements.hasPremium sont disponibles',api.a==='object'&&api.e==='object'&&api.track==='function'&&api.has==='function',JSON.stringify(api));
  if(api.a!=='object'||api.e!=='object')return R;

  // ===== Statistiques
  const def=await p.evaluate(()=>{const got=[];const r1=MQAnalytics.track('lesson_completed',{subject:'maths'});return {r1,enabled:MQAnalytics.enabled(),provider:MQAnalytics.providerId()};});
  T('Statistiques désactivées par défaut : track() ne transmet rien (aucun fournisseur, aucun consentement)',def.enabled===false&&def.r1===false&&def.provider==='none',JSON.stringify(def));
  const noConsent=await p.evaluate(()=>{const got=[];MQAnalytics.setProvider({id:'test',send:e=>got.push(e)});MQAnalytics.track('lesson_completed',{subject:'maths'});return got.length;});
  T('Avec un fournisseur mais SANS accord parental : rien n’est transmis',noConsent===0,String(noConsent));
  const refused=await p.evaluate(()=>{PARENT=false;try{MQAnalytics.setConsent(true);}catch(e){return 'refus:'+e.message;}return MQAnalytics.enabled();});
  T('L’accord ne peut être donné que depuis l’espace parents',/^refus:/.test(String(refused)),String(refused));
  const ev=await p.evaluate(()=>{PARENT=true;MQAnalytics.setConsent(true);PARENT=false;const got=[];MQAnalytics.setProvider({id:'test',send:e=>got.push(e)});
   MQAnalytics.track('lesson_completed',{subject:'maths',grade:'CM1',stars:3,name:'Tom',prenom:'Tom',birthdate:'2015-02-03',email:'a@b.fr',text:'phrase libre tapée par l’enfant',nested:{a:1},deviceId:'X'});
   MQAnalytics.track('evenement_inconnu',{x:1});MQAnalytics.track('screen_view',{screen:'home'});return got;});
  const e0=ev[0]||{};const keys=Object.keys(e0.props||{});
  T('Avec accord parental et fournisseur : l’évènement connu est transmis',ev.length===2&&e0.event==='lesson_completed',JSON.stringify(ev));
  T('Propriétés : seules celles de la liste blanche passent (matière, classe, étoiles) ; nom, naissance, e-mail, texte libre, objets, identifiants retirés',JSON.stringify(keys.sort())===JSON.stringify(['grade','stars','subject']),JSON.stringify(e0.props));
  T('Aucun évènement inconnu, aucun identifiant ni empreinte (pas d’id, d’agent, d’écran, de langue)',!ev.some(x=>x.event==='evenement_inconnu')&&ev.every(x=>Object.keys(x).sort().join()==='event,props,t'),JSON.stringify(ev.map(x=>Object.keys(x))));
  T('Horodatage arrondi à l’heure (pas de trace fine de l’activité de l’enfant)',ev.every(x=>x.t%3600000===0),JSON.stringify(ev.map(x=>x.t)));
  const off=await p.evaluate(()=>{PARENT=true;MQAnalytics.setConsent(false);PARENT=false;const got=[];MQAnalytics.setProvider({id:'test',send:e=>got.push(e)});MQAnalytics.track('screen_view',{screen:'home'});return got.length;});
  T('Retrait de l’accord : plus rien n’est transmis',off===0,String(off));
  const crash=await p.evaluate(()=>{PARENT=true;MQAnalytics.setConsent(true);PARENT=false;MQAnalytics.setProvider({id:'boom',send:()=>{throw new Error('panne fournisseur');}});try{MQAnalytics.track('screen_view',{screen:'home'});return 'ok';}catch(e){return 'throw';}});
  T('Une panne du fournisseur n’interrompt jamais l’app',crash==='ok',crash);
  const synced=await p.evaluate(()=>JSON.stringify(snapshot()));
  T('Ni l’accord ni les droits ne partent dans le snapshot de synchronisation',!/analytics|entitlement|premium/i.test(synced),'');

  // ===== Droits d'accès
  const ent=await p.evaluate(async()=>({prem:MQEntitlements.hasPremium(),prov:MQEntitlements.providerId(),restore:await MQEntitlements.restorePurchases()}));
  T('Droits : aucun fournisseur d’achat branché, premium faux, restauration sans effet',ent.prem===false&&ent.prov==='none'&&ent.restore&&ent.restore.restored===0,JSON.stringify(ent));
  const gate=await p.evaluate(async()=>{PARENT=false;try{await MQEntitlements.purchase('finot.premium');return 'achat';}catch(e){return e.code||e.message;}});
  T('Achat impossible hors de l’espace parents (aucun paywall face à l’enfant)',gate==='parent-gate',gate);
  const noProv=await p.evaluate(async()=>{PARENT=true;try{await MQEntitlements.purchase('finot.premium');return 'achat';}catch(e){return e.code||e.message;}finally{PARENT=false;}});
  T('En espace parents sans fournisseur : refus explicite « indisponible », rien n’est débité',noProv==='unavailable',noProv);
  const prov=await p.evaluate(async()=>{const calls=[];MQEntitlements.setProvider({id:'fake',available:async()=>true,purchase:async id=>{calls.push(id);return {products:[id]};},restore:async()=>({products:['finot.premium']})});
   PARENT=true;const r=await MQEntitlements.purchase('finot.premium');PARENT=false;const st=JSON.parse(localStorage.getItem('finot_entitlements_v1')||'null');
   const rs=await MQEntitlements.restorePurchases();return {calls,prem:MQEntitlements.hasPremium(),st,rs};});
  T('Avec un fournisseur (simulé) : achat en espace parents, droit enregistré dans finot_entitlements_v1 (schéma versionné), restauration',prov.calls.join()==='finot.premium'&&prov.prem===true&&prov.st&&prov.st.schema===1&&prov.st.products.includes('finot.premium')&&prov.rs.restored===1,JSON.stringify(prov));
  const profiles=await p.evaluate(()=>{const db=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));return JSON.stringify(db);});
  T('Les droits sont séparés des profils (aucune donnée ajoutée dans mathquest_profiles_v2)',!/premium|entitlement/i.test(profiles),'');
  // Expérience gratuite : rien n'est verrouillé, premium ou non.
  const free=await p.evaluate(async()=>{localStorage.removeItem('finot_entitlements_v1');MQEntitlements.setProvider(null);const ids=ALLCH.filter(c=>/^cm1-/.test(c.id)).slice(0,3).map(c=>c.id);const ok=[];
   for(const id of ids){startMission([id]);await new Promise(r=>setTimeout(r,150));ok.push(!!(M&&M.q));ACT.home();}return {prem:MQEntitlements.hasPremium(),ok};});
  T('Expérience gratuite intacte : sans aucun droit, les exercices démarrent normalement',free.prem===false&&free.ok.length===3&&free.ok.every(Boolean),JSON.stringify(free));
  const corrupt=await p.evaluate(()=>{localStorage.setItem('finot_entitlements_v1','{pas du json');return {prem:MQEntitlements.hasPremium()};});
  T('Stockage des droits corrompu : aucun crash, premium faux',corrupt.prem===false,JSON.stringify(corrupt));
  T('Aucune requête réseau sortante pendant ces opérations',!out.length,out.slice(0,5).join(' | '));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
