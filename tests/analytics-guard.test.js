/* Statistiques : non-régression et durcissement (31/10/2026).
   Désactivées par défaut ; rien avant l'accord parental ; aucun fournisseur tiers ; refus et retrait effectifs ; aucune donnée
   d'enfant indirecte (un prénom glissé dans une propriété texte est rejeté) ; l'accord exige l'espace parents RÉELLEMENT
   affiché (pas seulement l'indicateur PARENT resté vrai) ; l'app fonctionne sans le module statistiques. */
const fs=require('fs'),path=require('path');
const {ROOT,serve,launchEngine,seedProfile}=require('./lib');
const {playMission}=require('./release-lib');
const THIRD=/google-analytics|googletagmanager|\bgtag\(|firebase|segment\.(io|com)|mixpanel|amplitude|sentry|posthog|facebook\.net|\bfbq\(|hotjar|plausible|matomo|clarity\.ms|appsflyer|adjust\.com|branch\.io|admob|doubleclick/i;

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const files=[];(function walk(d){for(const e of fs.readdirSync(path.join(ROOT,d),{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p);else if(/\.(js|html)$/.test(e.name))files.push(p);}})('js');files.push('index.html','parent.html');
 const third=files.filter(f=>THIRD.test(fs.readFileSync(path.join(ROOT,f),'utf8')));
 T('Aucun SDK ou script de statistiques / publicité tiers dans l’app',!third.length,third.join(', '));
 const setp=files.filter(f=>!/analytics\.js$/.test(f)&&/MQAnalytics\.setProvider\(/.test(fs.readFileSync(path.join(ROOT,f),'utf8')));
 T('Aucun fournisseur de statistiques branché dans le code',!setp.length,setp.join(', '));
 const deps=JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));const dn=Object.keys({...deps.dependencies,...deps.devDependencies});
 T('Aucune dépendance de statistiques / publicité / attribution',!dn.some(d=>THIRD.test(d)),dn.join(', '));
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{const ctx=await b.newContext({viewport:{width:412,height:915}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  // Fournisseur espion installé AVANT tout : il ne doit rien recevoir sans accord.
  await ctx.addInitScript(()=>{window.__sent=[];document.addEventListener('DOMContentLoaded',()=>{if(window.MQAnalytics)MQAnalytics.setProvider({id:'spy',send:e=>window.__sent.push(e)});});});
  const p=await ctx.newPage();const errs=[],out=[];p.on('pageerror',e=>errs.push(e.message));p.on('request',r=>{if(!r.url().startsWith(url))out.push(r.url());});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Léa','CE2');
  // Parcours réel : mission, cours, espace parents, sans accord.
  await p.evaluate(()=>startMission([ALLCH.find(c=>/^ce2-/.test(c.id)).id]));await p.waitForFunction(()=>M&&M.q);await playMission(p,[true,false,true]).catch(()=>{});
  await p.evaluate(()=>{ACT.home();PARENT=true;parentScreen('suivi');ACT.home();});
  await p.evaluate(()=>{for(const e of MQAnalytics.EVENTS)MQAnalytics.track(e,{screen:'home'});});
  T('Avant tout accord : aucun évènement transmis, même avec un fournisseur branché et des appels track()',await p.evaluate(()=>window.__sent.length===0&&!MQAnalytics.enabled()),'');
  // Indicateur PARENT resté vrai sur un écran enfant : pas d'accord possible.
  const stuck=await p.evaluate(()=>{ACT.home();PARENT=true;try{MQAnalytics.setConsent(true);return 'accepté';}catch(e){return e.code;}finally{PARENT=false;}});
  T('Accord refusé si l’espace parents n’est pas réellement affiché (PARENT resté vrai sur un écran enfant)',stuck==='parent-gate',stuck);
  const viaParent=await p.evaluate(()=>{parentScreen('reglages');MQAnalytics.setConsent(true);const on=MQAnalytics.enabled();ACT.home();return on;});
  T('Accord donné depuis l’espace parents affiché : statistiques actives',viaParent===true,'');
  const leak=await p.evaluate(()=>{window.__sent.length=0;
   MQAnalytics.track('screen_view',{screen:'Léa'});MQAnalytics.track('screen_view',{screen:'lea'});MQAnalytics.track('lesson_completed',{subject:'Léa Martin'});
   MQAnalytics.track('lesson_completed',{subject:'maths',grade:'CE2',stars:2,mode:'practice'});MQAnalytics.track('screen_view',{screen:'home'});
   return window.__sent.map(e=>e.props);});
  T('Aucune donnée d’enfant indirecte : un prénom (exact, sans accent ou en minuscules) dans une propriété texte est retiré',!JSON.stringify(leak).match(/l[ée]a|martin/i)&&leak.length===5&&leak.slice(0,3).every(x=>!Object.keys(x).length),JSON.stringify(leak));
  T('Les valeurs légitimes passent (identifiants techniques en minuscules, classe officielle)',leak.some(x=>x.subject==='maths'&&x.grade==='CE2'&&x.stars===2&&x.mode==='practice')&&leak.some(x=>x.screen==='home'),JSON.stringify(leak));
  const bad=await p.evaluate(()=>{window.__sent.length=0;MQAnalytics.track('lesson_completed',{grade:'Classe de Léa',platform:'iPhone de Léa',result:'x'.repeat(30)});return window.__sent.map(e=>e.props);});
  T('Valeurs hors liste refusées (classe inconnue, plateforme inconnue, texte long)',bad.length===1&&!Object.keys(bad[0]).length,JSON.stringify(bad));
  const refuse=await p.evaluate(()=>{parentScreen('reglages');MQAnalytics.setConsent(false);ACT.home();window.__sent.length=0;MQAnalytics.track('app_open',{});return {n:window.__sent.length,on:MQAnalytics.enabled()};});
  T('Retrait de l’accord : plus rien n’est transmis',refuse.n===0&&refuse.on===false,JSON.stringify(refuse));
  const stored=await p.evaluate(()=>({prof:localStorage.getItem('mathquest_profiles_v2').includes('consent'),snap:JSON.stringify(snapshot()).includes('consent'),own:localStorage.getItem('finot_analytics_v1')}));
  T('Accord stocké à part (finot_analytics_v1), jamais dans les profils ni dans la synchronisation',!stored.prof&&!stored.snap&&/"consent":false/.test(stored.own||''),JSON.stringify(stored));
  T('Aucune requête réseau sortante',!out.length,out.slice(0,3).join(' | '));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();
  // L'app fonctionne sans le module statistiques.
  const c2=await b.newContext();await c2.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await c2.route(/\/js\/analytics\.js/,r=>r.abort());
  const p2=await c2.newPage();const e2=[];p2.on('pageerror',e=>e2.push(e.message));await p2.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p2,'Tom','CM1');
  await p2.evaluate(()=>startMission([ALLCH.find(c=>/^cm1-/.test(c.id)).id]));const ok=await p2.waitForFunction(()=>M&&M.q,null,{timeout:4000}).then(()=>true).catch(()=>false);
  await p2.evaluate(()=>{ACT.home();PARENT=true;parentScreen('reglages');});
  T('Sans le module statistiques : l’app démarre, l’exercice et l’espace parents fonctionnent, sans erreur',ok&&await p2.evaluate(()=>typeof MQAnalytics==='undefined')&&!e2.length,e2.join(' | '));await c2.close();
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
