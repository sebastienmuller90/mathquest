/* Suivi parent à distance : désactivé tant qu'aucun backend validé n'est configuré (31/10/2026).
   L'ancien backend (projet Supabase supprimé, NXDOMAIN) ne doit plus être appelé ; sans configuration, l'app ne propose
   pas une fonction qui semblerait marcher : pas de faux lien, pas de QR, pas d'erreur, aucune requête, aucune perte
   (les codes déjà enregistrés restent sur l'appareil), toutes les fonctions parent locales disponibles, rien de technique
   côté enfant. Avec une configuration valide (simulée, requêtes interceptées), le parcours complet fonctionne, y compris
   la suppression des données serveur demandée par le parent. */
const fs=require('fs'),path=require('path');
const {ROOT,serve,launchEngine,seedProfile}=require('./lib');
const SUPA=/https:\/\/[a-z0-9-]+\.supabase\.co\//;
const CFG={enabled:true,url:'https://finottest.supabase.co',key:'sb_publishable_TESTKEY123',schema:'api'};

async function page(b,url,{config=null,file='index.html',hash=''}={}){
 const ctx=await b.newContext({viewport:{width:412,height:915}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 if(config)await ctx.addInitScript(c=>{window.FINOT_REMOTE_SYNC=c;},config);
 const calls=[];await ctx.route(SUPA,async r=>{const fn=(r.request().url().match(/rpc\/([a-z_]+)/)||[])[1];let body=null;try{body=JSON.parse(r.request().postData()||'null');}catch(e){}
  calls.push({fn,body,headers:r.request().headers()});
  const resp=fn==='mq_push'?'[]':fn==='mq_get'?JSON.stringify({data:{name:'Inès',avatar:'🦊',grade:'CE2',xp:10,totalQ:2,totalOk:1,merit:{pts:0,req:[],rewards:[],hist:[],rules:{}},syncSchema:1,lastSeen:Date.now()},pending:[],updated_at:'2026-10-31T10:00:00Z'}):fn==='mq_register'||fn==='mq_delete'?'{"ok":true}':'null';
  return r.fulfill({status:200,contentType:'application/json',body:resp});});
 const p=await ctx.newPage();const errs=[],reqs=[];p.on('pageerror',e=>errs.push(e.message));p.on('request',r=>reqs.push(r.url()));
 await p.goto(url+file+hash,{waitUntil:'load'});return {ctx,p,errs,reqs,calls};}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 // Statique
 const code=['js/app-state.js','js/app-actions.js','parent.html','js/remote-sync-config.js'].map(f=>{try{return fs.readFileSync(path.join(ROOT,f),'utf8');}catch(e){return '';}}).join('\n');
 T('Plus aucune adresse de backend codée en dur (ancien projet supprimé, aucun nouveau domaine inventé)',!/https:\/\/[a-z0-9-]+\.supabase\.co/.test(code)&&!/sb_publishable_[A-Za-z0-9]/.test(code.replace(/sb_publishable_\[A-Za-z0-9_-\]/g,'')),'');
 T('js/remote-sync-config.js existe et désactive le suivi par défaut',/enabled\s*:\s*src\.enabled\s*===\s*true/.test(code),'');
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{
  // ===== Sans configuration (V1 Store par défaut)
  {const {ctx,p,errs,reqs,calls}=await page(b,url);
   await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Inès','CE2');
   // Profil existant qui avait activé l'ancien suivi : ses codes doivent rester intacts.
   await p.evaluate(()=>{S.sync={child:'C'.repeat(28),parent:'P'.repeat(32)};save();});await p.waitForTimeout(3200);
   await p.evaluate(async()=>{await syncNow();schedSync(10);});await p.waitForTimeout(300);
   const st=await p.evaluate(()=>({flag:MQRemoteSync.status(),sync:JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles[ACTIVE].sync}));
   T('Sans backend : statut « disabled »',st.flag==='disabled',JSON.stringify(st));
   T('Sans backend : aucune requête réseau (ni Supabase, ni autre), même avec un ancien suivi enregistré',!calls.length&&!reqs.some(u=>!u.startsWith(url)),JSON.stringify(calls.map(c=>c.fn)));
   T('Aucune perte : les codes de l’ancien suivi restent stockés sur l’appareil',st.sync&&st.sync.child==='C'.repeat(28)&&st.sync.parent==='P'.repeat(32),JSON.stringify(st.sync));
   await p.evaluate(()=>{PARENT=true;parentScreen('reglages');});await p.waitForTimeout(200);
   const ui=await p.evaluate(()=>({txt:document.getElementById('app').innerText,link:!!document.querySelector('#app input.wide2[readonly]'),qr:!!document.querySelector('#app .qr'),on:!!document.querySelector('[data-a="syncon"]'),now:!!document.querySelector('[data-a="snow"]'),exp:!!document.querySelector('[data-a="exp"]')}));
   T('Espace parents : « suivi à distance non activé » affiché clairement, sans lien, sans QR, sans bouton d’activation ni de synchro',/suivi à distance.{0,40}non activé/i.test(ui.txt)&&!ui.link&&!ui.qr&&!ui.on&&!ui.now,JSON.stringify({...ui,txt:undefined}));
   T('Espace parents : l’export / import local reste disponible',ui.exp,'');
   const tabs=await p.evaluate(()=>{const o={};for(const t of ['suivi','programme','recomp','reglages']){parentScreen(t);o[t]=document.getElementById('app').innerText.length>50;}return o;});
   T('Toutes les fonctions parent locales restent disponibles (suivi, programme, récompenses, réglages)',Object.values(tabs).every(Boolean),JSON.stringify(tabs));
   await p.evaluate(async()=>{try{await ACT.syncon(null,document.createElement('button'));}catch(e){}});await p.waitForTimeout(200);
   T('Activation forcée (ACT.syncon) sans backend : aucune requête, aucun faux lien, codes intacts',!calls.length&&await p.evaluate(()=>S.sync.child==='C'.repeat(28)),'');
   await p.evaluate(()=>{PARENT=false;ACT.home();});await p.waitForTimeout(150);
   const kid=await p.evaluate(()=>document.getElementById('app').innerText);
   T('Côté enfant : aucun message technique (serveur, Supabase, synchronisation, HTTP)',!/supabase|serveur|backend|http|synchronisation|rpc/i.test(kid),kid.slice(0,200));
   T('Sans backend : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}
  // Page parent distante sans configuration
  {const {ctx,p,errs,calls,reqs}=await page(b,url,{file:'parent.html',hash:'#'+'K'.repeat(32)});await p.waitForTimeout(800);
   const t=await p.evaluate(()=>document.getElementById('app').innerText);
   T('Page parent distante sans backend : message clair « pas activé », aucune requête',/pas activé|non activé/i.test(t)&&!calls.length&&!reqs.some(u=>!u.startsWith(url)),t.slice(0,200));
   T('Page parent distante : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}
  // Configuration invalide : traitée comme absente
  {const {ctx,p,calls}=await page(b,url,{config:{enabled:true,url:'http://evil.example.com',key:'x'}});await seedProfile(p,'Inès','CE2');
   T('Configuration invalide (http, autre domaine, clé non publique) : suivi désactivé, aucune requête',await p.evaluate(()=>MQRemoteSync.status())==='disabled'&&!calls.length,'');await ctx.close();}

  // ===== Avec une configuration valide (backend simulé, requêtes interceptées)
  {const {ctx,p,errs,calls}=await page(b,url,{config:CFG});await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Inès','CE2');
   await p.evaluate(()=>{PARENT=true;parentScreen('reglages');});await p.waitForTimeout(150);
   T('Backend configuré : le bouton d’activation est proposé',await p.evaluate(()=>!!document.querySelector('[data-a="syncon"]')),'');
   await p.click('[data-a="syncon"]');await p.waitForTimeout(600);
   const reg=calls.find(c=>c.fn==='mq_register'),push=calls.find(c=>c.fn==='mq_push');
   T('Activation : mq_register puis mq_push vers le schéma api (en-tête Content-Profile), clé publique seulement',reg&&push&&reg.headers['content-profile']==='api'&&reg.headers.apikey===CFG.key&&!reg.headers.authorization,JSON.stringify(calls.map(c=>c.fn)));
   const link=await p.evaluate(()=>(document.querySelector('#app input.wide2[readonly]')||{}).value);
   T('Activation : lien de suivi parent affiché (adresse de la page parent + code parent)',/parent\.html#[A-Za-z0-9]{32}$/.test(link||''),link);
   T('Activation : l’option de suppression des données serveur est proposée',await p.evaluate(()=>!!document.querySelector('[data-a="syncdelete"]')),'');
   const parentKey=await p.evaluate(()=>S.sync.parent);
   await p.click('[data-a="syncdelete"]');await p.waitForTimeout(100);
   T('Suppression : confirmation exigée (premier clic sans effet)',!calls.some(c=>c.fn==='mq_delete'),'');
   await p.click('[data-a="syncdelete"]');await p.waitForTimeout(500);
   const del=calls.find(c=>c.fn==='mq_delete');const after=await p.evaluate(()=>({sync:S.sync,name:S.name,stored:JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles[ACTIVE].name}));
   T('Suppression : mq_delete(lien parent, « SUPPRIMER »), codes effacés de l’appareil, progression locale intacte',del&&del.body.p_parent===parentKey&&del.body.p_confirm==='SUPPRIMER'&&!after.sync.child&&!after.sync.parent&&after.name==='Inès'&&after.stored==='Inès',JSON.stringify({del:del&&del.body&&{...del.body,p_parent:'…'},after}));
   T('Backend configuré : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}
  {const {ctx,p,errs,calls}=await page(b,url,{config:CFG,file:'parent.html',hash:'#'+'K'.repeat(32)});await p.waitForTimeout(1200);
   const t=await p.evaluate(()=>document.getElementById('app').innerText);
   T('Page parent distante avec backend : lecture mq_get et affichage du suivi',calls.some(c=>c.fn==='mq_get'&&c.headers['content-profile']==='api')&&/Inès/.test(t),t.slice(0,150));
   T('Page parent distante avec backend : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
