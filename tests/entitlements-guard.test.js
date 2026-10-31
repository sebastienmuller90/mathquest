/* Droits d'accès / futurs achats : invariants durcis (31/10/2026).
   Aucun faux achat, aucune dépendance de paiement, aucun contenu verrouillé, aucun achat depuis l'espace enfant (même si
   l'indicateur PARENT est resté vrai), produits sur liste fermée, un fournisseur ne peut accorder que ce qui a été demandé,
   état local corrompu ou falsifié sans effet sur le contenu gratuit. Compatible avec un futur fournisseur Google Play,
   Samsung ou Amazon (interface PurchaseProvider), sans en charger aucun. */
const fs=require('fs'),path=require('path');
const {ROOT,serve,launchEngine,seedProfile}=require('./lib');

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const files=[];(function walk(d){for(const e of fs.readdirSync(path.join(ROOT,d),{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(js|html)$/.test(e.name))files.push(p.split(path.sep).join('/'));}})('js');files.push('index.html');
 const gating=files.filter(f=>f!=='js/entitlements.js'&&/MQEntitlements\.(hasPremium|has)\(/.test(fs.readFileSync(path.join(ROOT,f),'utf8')));
 T('Aucun contenu verrouillé : aucun module ne conditionne l’accès à hasPremium()/has()',!gating.length,gating.join(', '));
 const pkg=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));const deps=Object.keys({...pkg.dependencies,...pkg.devDependencies});
 const gradle=['android/app/build.gradle','android/build.gradle','android/variables.gradle'].map(f=>fs.readFileSync(path.join(ROOT,f),'utf8')).join('\n');
 const man=fs.readFileSync(path.join(ROOT,'android/app/src/main/AndroidManifest.xml'),'utf8');
 T('Aucune bibliothèque de paiement (npm, Gradle) ni permission BILLING',!deps.some(d=>/purchase|billing|revenuecat|iap|payment|stripe/i.test(d))&&!/billingclient|billing|revenuecat/i.test(gradle)&&!/com\.android\.vending\.BILLING/.test(man),deps.join(', '));
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{const ctx=await b.newContext({viewport:{width:412,height:915}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[],out=[];p.on('pageerror',e=>errs.push(e.message));p.on('request',r=>{if(!r.url().startsWith(url))out.push(r.url());});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Lou','CM2');
  const fake=()=>{window.__buy=[];MQEntitlements.setProvider({id:'fake',available:async()=>true,purchase:async id=>{window.__buy.push(id);return {products:[id]};},restore:async()=>({products:[]})});};
  await p.evaluate(fake);
  const stuck=await p.evaluate(async()=>{ACT.home();PARENT=true;try{await MQEntitlements.purchase('finot.premium');return 'achat';}catch(e){return e.code;}finally{PARENT=false;}});
  T('Achat refusé sur un écran enfant même si PARENT est resté vrai (espace parents non affiché)',stuck==='parent-gate'&&await p.evaluate(()=>window.__buy.length===0),stuck);
  const unknown=await p.evaluate(async()=>{parentScreen('reglages');try{await MQEntitlements.purchase('finot.vip-illimite');return 'achat';}catch(e){return e.code;}finally{ACT.home();}});
  T('Produit hors liste fermée : refusé avant tout appel au fournisseur',unknown==='unknown-product'&&await p.evaluate(()=>window.__buy.length===0),unknown);
  const greedy=await p.evaluate(async()=>{MQEntitlements.setProvider({id:'greedy',available:async()=>true,purchase:async()=>({products:['finot.premium','finot.autre','<script>']}),restore:async()=>({products:['finot.premium','pirate']})});
   parentScreen('reglages');await MQEntitlements.purchase('finot.premium');ACT.home();const st=JSON.parse(localStorage.getItem('finot_entitlements_v1'));const rs=await MQEntitlements.restorePurchases();
   return {after:st.products,restore:JSON.parse(localStorage.getItem('finot_entitlements_v1')).products,rs};});
  T('Un fournisseur ne peut accorder que le produit acheté, et la restauration que des produits connus',JSON.stringify(greedy.after)==='["finot.premium"]'&&JSON.stringify(greedy.restore)==='["finot.premium"]',JSON.stringify(greedy));
  const failing=await p.evaluate(async()=>{localStorage.removeItem('finot_entitlements_v1');MQEntitlements.setProvider({id:'ko',available:async()=>true,purchase:async()=>{throw new Error('annulé par le parent');},restore:async()=>{throw new Error('réseau');}});
   parentScreen('reglages');let c='';try{await MQEntitlements.purchase('finot.premium');}catch(e){c=e.message;}ACT.home();let r='';try{await MQEntitlements.restorePurchases();}catch(e){r=e.message;}return {c,r,prem:MQEntitlements.hasPremium()};});
  T('Achat annulé ou restauration en échec : aucun droit accordé, aucun crash',failing.prem===false&&/annulé/.test(failing.c),JSON.stringify(failing));
  const nofake=await p.evaluate(async()=>{MQEntitlements.setProvider({id:'nopurchase'});return MQEntitlements.providerId();});
  T('Fournisseur incomplet (sans purchase) : ignoré, aucun faux achat possible',nofake==='none','');
  const tamper=await p.evaluate(async()=>{localStorage.setItem('finot_entitlements_v1',JSON.stringify({schema:1,products:['finot.premium'],updatedAt:1}));const prem=MQEntitlements.hasPremium();
   const ids=ALLCH.filter(c=>/^cm2-/.test(c.id)).slice(0,2).map(c=>c.id);const ok=[];for(const id of ids){startMission([id]);await new Promise(r=>setTimeout(r,120));ok.push(!!(M&&M.q));ACT.home();}
   localStorage.removeItem('finot_entitlements_v1');const ok2=[];for(const id of ids){startMission([id]);await new Promise(r=>setTimeout(r,120));ok2.push(!!(M&&M.q));ACT.home();}return {prem,ok,ok2};});
  T('Contenu identique avec ou sans droit (falsifié ou absent) : rien n’est réservé',tamper.ok.every(Boolean)&&tamper.ok2.every(Boolean),JSON.stringify(tamper));
  T('Aucune requête réseau sortante',!out.length,out.slice(0,3).join(' | '));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
