/* Audit de release (25/10/2026) — contamination entre profils : CP+CM2, CE1+6e, 3 profils, changements rapides, rechargement,
   suppression (code parent) d'un profil non actif puis ACTIF. Chaque profil porte des marqueurs dans TOUS ses domaines
   (XP, pièces, bons points, devoirs, maîtrise, erreurs, révisions, lecture, vocabulaire, diagnostic, parcours, activité) ;
   rien ne doit passer d'un enfant à l'autre, y compris dans les statistiques de l'espace parent. */
const {serve,launchEngine,freshContext}=require('./release-lib');
const KIDS=[{id:'k1',name:'Cléo',grade:'CP'},{id:'k2',name:'Zélie',grade:'CM2'},{id:'k3',name:'Hugo',grade:'6e'},{id:'k4',name:'Maxime',grade:'CE1'}];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const {ctx,p,errs}=await freshContext(b,url);
  const mk=(k,i)=>({name:k.name,grade:k.grade,avatar:'🦊',xp:1000*(i+1)+7,coins:100*(i+1)+3,subj:'p-maths',
   merit:{pts:11*(i+1),total:50+i,rules:{ok:1},rewards:[],req:[],hist:[{t:Date.now(),w:'Bonus '+k.name,d:1}],notes:['note '+k.name]},
   homework:[{id:'hw_'+k.id,title:'Devoir '+k.name,subject:'p-maths',due:'',note:'',status:'todo',createdAt:1700000000000+i,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null}],
   mastery:{['m_'+k.id]:{n:i+1}},mistakes:{['e_'+k.id]:[{q:'Erreur '+k.name,answer:'x',expl:'e',t:1}]},review:{['r_'+k.id]:{due:'2099-01-01',box:i+1}},
   readingMastery:{['lec_'+k.id]:{ok:i+1,n:i+2}},readingProgress:{['lecp_'+k.id]:{done:true,n:i}},vocab:{['voc_'+k.id]:{ok:i+1}},
   diagnostic:{marker:'diag_'+k.name,done:true},path:{date:'2026-01-0'+(i+1),marker:'path_'+k.name,steps:[1,2,3,4,5,6].map(n=>({n}))},pathHist:[{date:'2026-01-01',marker:'ph_'+k.name}],
   activityLog:[{t0:Date.now()-3600e3,ms:60000*(i+1),kind:'exercise',ids:['c'+i],subj:'p-maths'}],badges:['b_'+k.name],totalQ:10*(i+1),totalOk:5*(i+1)});
  const setStore=(profiles,active)=>p.evaluate(o=>{localStorage.clear();localStorage.setItem('mathquest_profiles_v2',JSON.stringify(o));},{version:3,active,profiles});
  const boot=async()=>{await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home',null,{timeout:8000});};
  const seed=async(list,active)=>{await setStore(Object.fromEntries(list.map(k=>[k.id,mk(k,KIDS.indexOf(k))])),active);await boot();
   await p.evaluate(()=>{const h=hsh('1234');for(const id of Object.keys(PDB.profiles))if(PDB.profiles[id]&&typeof PDB.profiles[id]==='object')PDB.profiles[id].pin=h;S.pin=h;saveLocal();});};
  const read=()=>p.evaluate(()=>({name:S.name,xp:S.xp,coins:S.coins,merit:S.merit.pts,hw:S.homework.map(h=>h.title).join('|'),mastery:Object.keys(S.mastery).join('|'),
   mist:Object.values(S.mistakes).flat().map(m=>m.q).join('|'),review:Object.keys(S.review).join('|'),rm:Object.keys(S.readingMastery).join('|'),rp:Object.keys(S.readingProgress).join('|'),
   vocab:Object.keys(S.vocab).join('|'),diag:S.diagnostic&&S.diagnostic.marker,path:S.path&&S.path.marker,ph:(S.pathHist||[]).map(h=>h.marker).join('|'),act:(S.activityLog||[]).reduce((a,x)=>a+x.ms,0),
   hist:S.merit.hist.map(h=>h.w).join('|'),badge:S.badges.join('|'),q:S.totalQ}));
  const exp=k=>{const i=KIDS.indexOf(k);return {name:k.name,xp:1000*(i+1)+7,coins:100*(i+1)+3,merit:11*(i+1),hw:'Devoir '+k.name,mastery:'m_'+k.id,mist:'Erreur '+k.name,review:'r_'+k.id,rm:'lec_'+k.id,rp:'lecp_'+k.id,vocab:'voc_'+k.id,diag:'diag_'+k.name,path:'path_'+k.name,ph:'ph_'+k.name,act:60000*(i+1),hist:'Bonus '+k.name,badge:'b_'+k.name,q:10*(i+1)};};
  /* Le parcours du jour (CP/CE1) est régénéré à l’activation : il peut disparaître/être recréé, mais ne doit jamais porter le marqueur d’un autre enfant. */
  const diff=(a,e)=>Object.keys(e).filter(k=>a[k]!==e[k]&&!(k==='path'&&(a.path===undefined||a.path===null))).map(k=>`${k}:${a[k]}≠${e[k]}`).join(',');
  const checkAll=async(list,order)=>{const bad=[];for(const id of order){const k=KIDS.find(x=>x.id===id);await p.evaluate(id=>activateProfile(id,true),id);await p.waitForFunction(n=>S.name===n&&CUR==='home',k.name);
    const a=await read();const d=diff(a,exp(k));if(d)bad.push(k.name+' '+d);
    const leak=await p.evaluate(({self,names})=>names.filter(n=>n!==self&&document.getElementById('app').textContent.includes(n)),{self:k.name,names:list.map(x=>x.name)});if(leak.length)bad.push(k.name+' affiche '+leak);}return bad;};
  const parentView=()=>p.evaluate(()=>new Promise(r=>{PARENT=true;parentScreen('suivi');setTimeout(()=>r({txt:document.getElementById('app').textContent,wk:MQWeeklyReport.report().cur.questions}),200);}));
  const fp=id=>p.evaluate(id=>{const o=JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles[id];delete o.lastSeen;delete o.path;delete o.pathHist;/* métadonnées de migration des erreurs (at/seen) ajoutées plus tard à tous les profils : on compare le contenu */o.mistakes=Object.fromEntries(Object.entries(o.mistakes||{}).map(([c,l])=>[c,l.map(m=>m.q)]));return JSON.stringify(o);},id);

  // 1. CP + CM2 puis CE1 + 6e
  for(const [lab,list] of [['CP + CM2',[KIDS[0],KIDS[1]]],['CE1 + 6e',[KIDS[3],KIDS[2]]]]){
   await seed(list,list[0].id);
   const order=[];for(let i=0;i<24;i++)order.push(list[(i*7+i%3)%2].id);
   const bad=await checkAll(list,order);
   T(lab+' : 24 changements rapides, tous les domaines (XP, pièces, bons points, devoirs, maîtrise, erreurs, révisions, lecture, vocabulaire, diagnostic, parcours, activité, badges) propres à chaque enfant',!bad.length,bad.slice(0,3).join(' | '));
   const pv=[];for(const k of list){await p.evaluate(id=>{PARENT=false;activateProfile(id,false);},k.id);const v=await parentView();const other=list.find(x=>x!==k);
    if(v.txt.includes('Devoir '+other.name)||v.txt.includes('Erreur '+other.name))pv.push(k.name+' voit les données de '+other.name);if(!v.txt.includes('Devoir '+k.name))pv.push(k.name+' : son devoir est absent de sa vue parent');
    if(v.wk>10*(KIDS.indexOf(k)+1))pv.push(k.name+' semaine='+v.wk);}
   T(lab+' : l’espace parent (suivi, devoirs, bilan hebdomadaire) ne montre que les données de l’enfant actif',!pv.length,pv.join(' | '));
   await p.evaluate(()=>{PARENT=false;});
   const before=await fp(list[1].id);
   await p.evaluate(id=>{activateProfile(id,false);S.xp+=500;S.coins+=50;S.merit.pts+=5;S.homework.push({id:'hw_new',title:'Nouveau',subject:'p-maths',due:'',note:'',status:'todo',createdAt:1,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null});S.mistakes.z=[{q:'Zz',answer:'a',expl:'e',t:1}];S.vocab.nouveau={ok:1};S.readingMastery.neuf={ok:1,n:1};S.review.neuf={due:'2099-01-01',box:1};save();},list[0].id);
   const after=await fp(list[1].id);
   T(lab+' : écrire dans tous les domaines du 1er profil laisse le 2e identique octet pour octet (stockage)',before===after);
   await boot();const af=await fp(list[1].id);const rl=await read();
   T(lab+' : après rechargement le profil actif garde ses écritures et l’autre reste intact',af===before&&rl.name===list[0].name&&rl.xp===exp(list[0]).xp+500&&rl.hw.includes('Nouveau'),JSON.stringify({n:rl.name,xp:rl.xp}));}

  // 2. Trois profils : suppression d'un profil NON actif avec code parent
  const three=[KIDS[0],KIDS[1],KIDS[2]];await seed(three,'k1');
  const snap3={k1:await fp('k1'),k3:await fp('k3')};
  await p.click('[data-a="profiles"]');await p.waitForSelector('[data-a="pdel:k2"]');await p.click('[data-a="pdel:k2"]');await p.waitForSelector('#pdelpin');
  await p.fill('#pdelpin','0000');await p.click('[data-a="pdelok:k2"]');await p.waitForTimeout(150);
  T('Suppression avec un MAUVAIS code parent : refusée, profil toujours présent',await p.evaluate(()=>!!PDB.profiles.k2));
  await p.fill('#pdelpin','1234');await p.click('[data-a="pdelok:k2"]');await p.waitForFunction(()=>!PDB.profiles.k2);
  const st=await p.evaluate(()=>{const o=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));const bk=JSON.parse(localStorage.getItem('mathquest_profile_deleted_backup')||'null');return {ids:Object.keys(o.profiles),active:o.active,bk:bk&&bk.data&&bk.data.name};});
  T('Suppression d’un profil non actif (code parent correct) : les deux autres intacts, sauvegarde de secours du supprimé conservée',st.ids.join()==='k1,k3'&&st.active==='k1'&&st.bk==='Zélie'&&(await fp('k1'))===snap3.k1&&(await fp('k3'))===snap3.k3,JSON.stringify(st));
  // 3. Suppression du profil ACTIF
  await p.evaluate(()=>{activateProfile('k3',false);});await p.evaluate(()=>profilesScreen());await p.waitForSelector('[data-a="pdel:k3"]');
  const k1b=await fp('k1');await p.click('[data-a="pdel:k3"]');await p.waitForSelector('#pdelpin');await p.fill('#pdelpin','1234');await p.click('[data-a="pdelok:k3"]');
  await p.waitForFunction(()=>!PDB.profiles.k3&&CUR==='home');const a=await read();
  T('Suppression du profil ACTIF : bascule sur le profil restant, ses données exactes (aucune fuite du supprimé), retour à l’accueil',!diff(a,exp(KIDS[0]))&&(await p.evaluate(()=>ACTIVE==='k1'&&PDB.active==='k1'))&&(await fp('k1'))===k1b,diff(a,exp(KIDS[0])));
  await boot();const rl=await read();
  T('Rechargement après suppression : un seul profil, celui de Cléo, le supprimé ne ressuscite pas',!diff(rl,exp(KIDS[0]))&&(await p.evaluate(()=>Object.keys(PDB.profiles).join()))==='k1');
  T('Dernier profil : suppression impossible',await p.evaluate(()=>deleteProfile('k1')===false&&!!PDB.profiles.k1));

  // 4. Entrées invalides résiduelles : jamais activées, jamais purgées
  await setStore({nul:null,k1:mk(KIDS[0],0),txt:'abc',k2:mk(KIDS[1],1)},'k1');await boot();
  const ok1=await p.evaluate(()=>{const names=profileList().map(x=>x[0]).join();const r=deleteProfile('k1');return {names,r,name:S.name,active:ACTIVE,stored:Object.keys(JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles).join()};});
  T('Entrées invalides résiduelles : absentes de la liste des profils, jamais activées à la suppression du profil actif, conservées dans le stockage',ok1.names==='k1,k2'&&ok1.r===true&&ok1.name==='Zélie'&&ok1.active==='k2'&&ok1.stored==='nul,txt,k2',JSON.stringify(ok1));
  const last=await p.evaluate(()=>({r:deleteProfile('k2'),name:S.name,xp:S.xp}));
  T('Un seul profil exploitable restant (plus des entrées invalides) : suppression refusée, données intactes',last.r===false&&last.name==='Zélie'&&last.xp===2007,JSON.stringify(last));
  T('Aucune erreur JavaScript pendant l’audit d’isolation',!errs.length,errs.slice(0,3).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
