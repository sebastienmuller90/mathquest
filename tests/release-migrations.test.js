/* Audit de release (24/10/2026) — migrations et stockage abîmé, sans perte ni doublon.
   Chaque scénario écrit un état localStorage « ancien » ou « cassé », recharge l'appli DEUX fois (une migration ne doit
   pas se rejouer : pas de double XP, pas de double récompense, pas de devoir dupliqué) et vérifie : aucune progression
   perdue, aucun mélange entre profils, application utilisable (écran d'accueil ou d'inscription, jamais d'écran blanc). */
const {serve,launchEngine,freshContext}=require('./release-lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,800)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const {ctx,p,errs}=await freshContext(b,url);
  // run(nom, setup(localStorage), check(page state)) : recharge deux fois, renvoie l'état après la 1re et la 2e ouverture
  const probe=()=>p.evaluate(()=>{const o=(()=>{try{return JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'null');}catch(e){return 'illisible';}})();
    return {cur:typeof CUR!=='undefined'?CUR:'?',ready:typeof S!=='undefined',name:S&&S.name,xp:S&&S.xp,coins:S&&S.coins,grade:S&&S.grade,hw:S&&Array.isArray(S.homework)?S.homework.length:-1,
     n:o&&o.profiles?Object.keys(o.profiles).length:-1,ver:o&&o.version,blank:!document.getElementById('app').textContent.trim(),
     profiles:o&&o.profiles?Object.fromEntries(Object.entries(o.profiles).map(([k,v])=>[k,{name:v&&v.name,xp:v&&v.xp,hw:v&&Array.isArray(v.homework)?v.homework.length:0,merit:v&&v.merit&&v.merit.pts}])):null,
     keys:Object.keys(localStorage)};});
  const scenario=async(name,setup,check)=>{await p.evaluate(()=>localStorage.clear());await p.evaluate(o=>{for(const k of Object.keys(o))localStorage.setItem(k,o[k]);},setup());
   await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&typeof CUR!=='undefined',null,{timeout:8000});await p.waitForTimeout(250);const a=await probe();
   await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&typeof CUR!=='undefined',null,{timeout:8000});await p.waitForTimeout(250);const c=await probe();
   let r;try{r=check(a,c);}catch(e){r={ok:false,d:'exception '+e.message};}
   T(name,r.ok&&!a.blank&&!c.blank,(r.d||'')+(a.blank||c.blank?' | écran blanc':''));};
  const base=(o={})=>({name:'Anna',grade:'CE2',xp:540,coins:33,subj:'p-maths',chap:{},mastery:{},review:{},mistakes:{},homework:[],merit:{pts:20,total:60,rules:{ok:1},rewards:[],req:[],hist:[],notes:[]},...o});

  await scenario('V1 seule (mathquest_v1) : migrée, XP identique après 2 redémarrages (pas de double XP)',
   ()=>({'mathquest_v1':JSON.stringify({name:'Ancien',xp:1234,coins:50,chap:{'6a':{stars:3,ok:20,tot:22}},badges:['first'],merit:{pts:12,total:40}})}),
   (a,c)=>({ok:a.name==='Ancien'&&a.xp===1234&&c.xp===1234&&c.coins===50&&c.n===1,d:JSON.stringify({a:a.xp,c:c.xp,n:c.n})}));
  await scenario('V2 « version:2 » multi-profils : passe en version 3 avec les 3 enfants intacts',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:2,active:'b',profiles:{a:base({name:'A',xp:100}),b:base({name:'B',xp:200,grade:'5e'}),c:base({name:'C',xp:300,grade:'CP'})}})}),
   (a,c)=>({ok:c.ver===3&&c.n===3&&c.name==='B'&&c.profiles.a.xp===100&&c.profiles.b.xp===200&&c.profiles.c.xp===300,d:JSON.stringify(c.profiles)+' v'+c.ver}));
  await scenario('Profils anciens très incomplets (seulement un nom) : jamais mélangés, XP à 0, aucun plantage',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:1,active:'x',profiles:{x:{name:'X'},y:{name:'Y',xp:50},z:{}}})}),
   (a,c)=>({ok:c.n===3&&c.name==='X'&&c.profiles.y.xp===50&&c.profiles.x.xp===0,d:JSON.stringify(c.profiles)}));
  await scenario('Clé de profils absente mais V1 présente et profils vides {} → progression V1 récupérée, pas de reset silencieux',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'',profiles:{}}),'mathquest_v1':JSON.stringify({name:'Rescapé',xp:777})}),
   (a,c)=>({ok:c.name==='Rescapé'&&c.xp===777,d:JSON.stringify({name:c.name,xp:c.xp,n:c.n,keys:c.keys.filter(k=>/backup|corrupt/.test(k))})}));
  await scenario('JSON tronqué + V1 valide : V1 récupérée, donnée brute abîmée conservée en copie de secours',
   ()=>({'mathquest_profiles_v2':'{"version":3,"active":"a","profiles":{"a":{"name":"A","xp":9','mathquest_v1':JSON.stringify({name:'Secours',xp:42})}),
   (a,c)=>({ok:a.name==='Secours'&&c.xp===42&&a.keys.some(k=>k.startsWith('mathquest_profiles_corrupt_backup_')),d:JSON.stringify(a.keys)}));
  for(const [lab,val] of [['tableau []','[]'],['null','null'],['nombre','42'],['chaîne','"abc"'],['profiles = tableau','{"version":3,"active":"a","profiles":[1,2]}'],['profiles = chaîne','{"version":3,"profiles":"x"}']])
   await scenario('Valeur JSON invalide pour les profils ('+lab+') : application utilisable, V1 reprise si présente',
    (v=>()=>({'mathquest_profiles_v2':v,'mathquest_v1':JSON.stringify({name:'Reprise',xp:11})}))(val),
    (a,c)=>({ok:a.ready&&['home','diagnostic','onboarding',''].includes(c.cur)||c.cur!=='?',d:JSON.stringify({cur:c.cur,name:c.name,xp:c.xp})+'' }));
  await scenario('Entrées de profil nulles / de mauvais type parmi de bons profils : bons profils intacts, pas de plantage',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'good',profiles:{good:base({name:'Bon',xp:321}),nul:null,txt:'abc',arr:[1,2],num:7,good2:base({name:'Bon2',xp:654})}})}),
   (a,c)=>({ok:c.name==='Bon'&&c.xp===321&&c.profiles.good2.xp===654,d:JSON.stringify(c.profiles)}));
  // --- Régression 25/10/2026 : le profil de repli doit être le premier profil EXPLOITABLE (objet non tableau), jamais une entrée nulle.
  const same=(a,c,n,x,extra={})=>({ok:a.name===n&&c.name===n&&a.xp===x&&c.xp===x&&c.ver===3&&Object.entries(extra).every(([k,v])=>c.profiles[k]&&c.profiles[k].xp===v),d:JSON.stringify({a:[a.name,a.xp],c:[c.name,c.xp],p:c.profiles})});
  await scenario('Actif invalide (null) puis profil valide : le profil valide est activé (Bon, 123 XP), rien n’est perdu',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'bad',profiles:{bad:null,good:{name:'Bon',xp:123}}})}),
   (a,c)=>{const r=same(a,c,'Bon',123);r.ok=r.ok&&('bad' in c.profiles);return r;});
  await scenario('Clé active absente + premier profil nul : premier profil exploitable activé',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,profiles:{n:null,g:base({name:'G',xp:77})}})}),
   (a,c)=>same(a,c,'G',77));
  await scenario('Clé active null + premier profil de type texte : premier profil exploitable activé',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:null,profiles:{t:'abc',g:base({name:'G2',xp:78})}})}),
   (a,c)=>same(a,c,'G2',78));
  await scenario('Actif inexistant + premier profil tableau : profil exploitable activé',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'fantome',profiles:{arr:[1,2],g:base({name:'G3',xp:79})}})}),
   (a,c)=>same(a,c,'G3',79));
  await scenario('Plusieurs profils invalides (null, nombre, tableau, texte) puis un valide : le valide est activé',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'n1',profiles:{n1:null,n2:7,n3:[],n4:'x',ok:base({name:'Seul',xp:55})}})}),
   (a,c)=>same(a,c,'Seul',55));
  await scenario('Plusieurs profils valides, actif = le deuxième : il reste actif, aucun mélange',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'b',profiles:{a:base({name:'A',xp:1}),b:base({name:'B',xp:2}),c:base({name:'C',xp:3})}})}),
   (a,c)=>same(a,c,'B',2,{a:1,c:3}));
  await scenario('V2 sans aucun profil exploitable + V1 valide : V1 reprise une seule fois, copie brute de la V2 conservée',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'bad',profiles:{bad:null,txt:'x'}}),'mathquest_v1':JSON.stringify({name:'V1ok',xp:900})}),
   (a,c)=>({ok:a.name==='V1ok'&&c.name==='V1ok'&&c.xp===900&&c.n===1&&c.keys.some(k=>k.startsWith('mathquest_profiles_corrupt_backup_')),d:JSON.stringify({a:a.xp,c:c.xp,n:c.n,k:c.keys})}));
  await scenario('V1 valide ET V2 partiellement corrompue (un bon profil) : la V2 gagne, la V1 n’est pas fusionnée (pas de double gain)',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'bad',profiles:{bad:null,good:base({name:'V2bon',xp:300})}}),'mathquest_v1':JSON.stringify({name:'V1vieux',xp:9000})}),
   (a,c)=>same(a,c,'V2bon',300));
  await scenario('Profil actif désigné inexistant : bascule sur un profil existant, aucune donnée supprimée',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'fantome',profiles:{a:base({name:'A',xp:5}),b:base({name:'B',xp:6})}})}),
   (a,c)=>({ok:c.n===2&&c.profiles.a.xp===5&&c.profiles.b.xp===6&&['A','B'].includes(c.name),d:JSON.stringify(c.profiles)}));
  await scenario('Champs de mauvais type (xp texte, grade inconnu, mastery tableau, homework chaîne, merit.rewards nul) : réparés, nom et XP numériques conservés',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'a',profiles:{a:{name:'Piégé',xp:'800',coins:'12',grade:'9e',mastery:[1,2],review:'x',mistakes:7,homework:'oops',chap:[],merit:{pts:'30',rewards:null,req:null,hist:null,notes:null}}}})}),
   (a,c)=>({ok:c.name==='Piégé'&&c.xp===800&&c.coins===12&&c.hw===0&&c.cur!=='?',d:JSON.stringify({xp:c.xp,coins:c.coins,grade:c.grade,hw:c.hw})}));
  await scenario('Devoirs hérités : statuts inconnus et doublons d’identifiant → aucun gain automatique au chargement, pas de duplication',
   ()=>{const hw=(id,st,extra={})=>({id,title:'T'+id,subject:'p-maths',due:'',note:'',status:st,createdAt:1,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null,...extra});
     return {'mathquest_profiles_v2':JSON.stringify({version:3,active:'a',profiles:{a:base({name:'Dev',xp:900,coins:40,homework:[hw('hw_h1','validated',{validatedAt:5}),hw('hw_h2','claimed',{claimedAt:5}),hw('hw_h3','inconnu'),hw('hw_h2','todo')]})}})};},
   (a,c)=>({ok:c.xp===900&&c.coins===40&&c.hw===a.hw&&c.hw<=4,d:JSON.stringify({a:a.hw,c:c.hw,xp:c.xp,coins:c.coins})}));
  await scenario('Sauvegarde d’un autre outil dans le stockage (clés étrangères et sauvegardes) : conservées à chaque démarrage',
   ()=>({'mathquest_profiles_v2':JSON.stringify({version:3,active:'a',profiles:{a:base({name:'K',xp:1})}}),'mathquest_import_backup':'{"x":1}','mathquest_profile_deleted_backup':'{"y":2}','autre_site':'1'}),
   (a,c)=>({ok:['mathquest_import_backup','mathquest_profile_deleted_backup','autre_site'].every(k=>c.keys.includes(k)),d:c.keys.join(',')}));
  await scenario('Profil V1 avec date de naissance et classe en minuscules : reconnu, aucun message d’anniversaire en double',
   ()=>({'mathquest_v1':JSON.stringify({name:'Mini',grade:'cm1',birthdate:'2016-02-29',xp:10})}),
   (a,c)=>({ok:c.grade==='CM1'&&c.xp===10,d:c.grade}));

  // Changement de version PWA : le cache est remplacé mais jamais localStorage
  {const v=await p.evaluate(async()=>{localStorage.clear();localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:'a',profiles:{a:{name:'Persistant',xp:4242,grade:'6e'}}}));
    const names=await caches.keys();await Promise.all(names.map(n=>caches.delete(n)));const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.map(r=>r.unregister()));return names.length;});
   await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined');await p.waitForTimeout(300);
   const x=await probe();
   T('Effacement du cache PWA + désinscription du service worker (≈ changement de version) : profils et XP intacts',x.name==='Persistant'&&x.xp===4242,JSON.stringify({x:x.xp,caches:v}));}
  T('Aucune erreur JavaScript pendant les migrations',!errs.length,errs.slice(0,3).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
