/* Audit de release (24/10/2026) — profils élèves de bout en bout.
   Inscription RÉELLE par l'assistant pour CP, CE1, CM2, 6e et 3e dans la même installation, puis changements de profil
   répétés par l'interface, redémarrage, et preuve qu'aucune donnée ne passe d'un enfant à l'autre (prénom, date de
   naissance, classe, compagnon, XP, pièces, maîtrise, erreurs, devoirs, historique, préférences). */
const {serve,launchEngine,freshContext,wizard}=require('./release-lib');
const KIDS=[
 {name:'Cléo',grade:'CP',stage:'primaire',birth:'2019-04-12',companion:'finot',gender:'girl'},
 {name:'Maxime',grade:'CE1',stage:'primaire',birth:'2018-09-03',companion:'leo',gender:'boy'},
 {name:'Zélie',grade:'CM2',stage:'primaire',birth:'2015-01-25',companion:'momo',gender:'girl'},
 {name:'Hugo',grade:'6e',stage:'college',birth:'2014-06-30',companion:'finot',gender:'boy'},
 {name:'Inès',grade:'3e',stage:'college',birth:'2011-11-11',companion:'leo',gender:'girl'}];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const {ctx,p,errs}=await freshContext(b,url);
  // 1. Inscription réelle des 5 profils, le premier à l'ouverture, les suivants par « Ajouter un enfant »
  const ids={};const bad=[];
  for(let i=0;i<KIDS.length;i++){const k=KIDS[i];
   if(i>0){await p.click('[data-a="profiles"]');await p.waitForSelector('[data-a="pnew"]');await p.click('[data-a="pnew"]');}
   await wizard(p,k);ids[k.name]=await p.evaluate(()=>ACTIVE);
   const s=await p.evaluate(()=>({name:S.name,grade:S.grade,birth:S.birthdate,comp:S.companion,av:S.avatar,gender:S.gender,xp:S.xp,coins:S.coins,young:document.body.classList.contains('young'),subjects:visibleSubjects().map(x=>x.stage)}));
   const wantStage=k.stage==='primaire'?'primaire':'college';
   if(s.name!==k.name||s.grade!==k.grade||s.birth!==k.birth||s.comp!==k.companion||s.gender!==k.gender||s.xp!==0||s.coins!==0||!s.subjects.length||s.subjects.some(x=>x!==wantStage))bad.push(k.name+':'+JSON.stringify(s));}
  T('Inscription réelle CP, CE1, CM2, 6e, 3e dans la même installation : prénom, date, classe, compagnon, sexe, matières du bon cycle',!bad.length,bad.join(' | '));
  T('Cinq identifiants distincts, cinq profils stockés',new Set(Object.values(ids)).size===5&&(await p.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles).length))===5);

  // 2. Données propres à chaque enfant, écrites par les API réelles du moteur
  const stamp=async(name,i)=>{await p.evaluate(({id,i,name})=>{activateProfile(id);
    const ch=SCH(S.subj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).map(c=>c.id);
    S.xp=1000*(i+1)+7;S.coins=100*(i+1)+3;S.sound=i%2===0;S.theme=['finot','ocean','corail','menthe','nuit'][i];S.tts.rate=[.8,.9,1,1.1,1.2][i];
    for(let k=0;k<=i;k++){MQAdaptive.recordAnswer(S,ch[k%ch.length],k%2===0,{});}
    MQAdaptive.recordMistake(S,ch[0],{q:'Question de '+name,answer:'faux '+i,expl:'e'});
    S.homework=[{id:'hw_'+i,title:'Devoir de '+name,subject:'p-maths',due:'',note:'',status:'todo',createdAt:1700000000000+i,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null}];
    S.activityLog=[{t0:Date.now()-3600e3*(i+1),ms:60000*(i+1),kind:'exercise',ids:[ch[0]],subj:S.subj}];
    S.merit.pts=11*(i+1);S.badges=['b_'+name];S.recent={};
    save();},{id:ids[name],i,name});};
  for(let i=0;i<KIDS.length;i++)await stamp(KIDS[i].name,i);
  const expect=k=>{const i=KIDS.findIndex(x=>x.name===k.name);return {name:k.name,grade:k.grade,birth:k.birth,comp:k.companion,xp:1000*(i+1)+7,coins:100*(i+1)+3,sound:i%2===0,theme:['finot','ocean','corail','menthe','nuit'][i],rate:[.8,.9,1,1.1,1.2][i],mist:'Question de '+k.name,hw:'Devoir de '+k.name,merit:11*(i+1),badge:'b_'+k.name,act:60000*(i+1)};};
  const read=()=>p.evaluate(()=>({name:S.name,grade:S.grade,birth:S.birthdate,comp:S.companion,xp:S.xp,coins:S.coins,sound:S.sound,theme:S.theme,rate:S.tts.rate,
    mist:Object.values(S.mistakes).flat().map(m=>m.q).join('|'),hw:(S.homework||[]).map(h=>h.title).join('|'),merit:S.merit.pts,badge:(S.badges||[]).join('|'),act:(S.activityLog||[]).reduce((a,x)=>a+x.ms,0),
    mastered:Object.keys(S.mastery).length,answers:S.adaptive.answers}));
  const same=(a,e)=>Object.keys(e).every(k=>a[k]===e[k]);
  const diff=(a,e)=>Object.keys(e).filter(k=>a[k]!==e[k]).map(k=>`${k}:${a[k]}≠${e[k]}`).join(',');

  // 3. Changements de profil répétés PAR L'INTERFACE (écran Profils → Ouvrir), ordre mélangé, 3 tours
  const order=[2,0,4,1,3,3,0,2,4,1,1,4,0,3,2];const sw=[];
  for(const i of order){const k=KIDS[i];await p.click('[data-a="profiles"]');await p.waitForSelector(`[data-a="pswitch:${ids[k.name]}"]`);await p.click(`[data-a="pswitch:${ids[k.name]}"]`);
   await p.waitForFunction(n=>S.name===n&&CUR==='home',k.name,{timeout:4000});
   const a=await read();if(!same(a,expect(k)))sw.push(k.name+' '+diff(a,expect(k)));
   // aucune trace d'un autre enfant dans l'écran affiché
   const leak=await p.evaluate(({self,names})=>names.filter(n=>n!==self&&document.getElementById('app').textContent.includes(n)),{self:k.name,names:KIDS.map(x=>x.name)});
   if(leak.length)sw.push(k.name+' affiche '+leak.join(','));}
  T('15 changements de profil par l’interface : XP, pièces, préférences, erreurs, devoirs, bons points, badges, historique toujours ceux du bon enfant',!sw.length,sw.slice(0,4).join(' | '));

  // 4. Une écriture chez un enfant ne touche aucun autre enfant
  await p.evaluate(id=>activateProfile(id),ids['Zélie']);
  await p.evaluate(()=>{S.xp+=500;S.coins+=50;S.homework.push({id:'hw_extra',title:'Extra Zélie',subject:'p-maths',due:'',note:'',status:'todo',createdAt:1,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null});save();});
  const others=[];for(const k of KIDS.filter(x=>x.name!=='Zélie')){await p.evaluate(id=>activateProfile(id),ids[k.name]);const a=await read();if(!same(a,expect(k)))others.push(k.name+' '+diff(a,expect(k)));}
  T('Écrire chez Zélie (XP, pièces, devoir) ne modifie aucun des 4 autres profils',!others.length,others.join(' | '));

  // 5. Redémarrages : rechargement, nouvelle page, profil actif conservé
  await p.evaluate(id=>activateProfile(id),ids['Hugo']);await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home');
  let a=await read();
  T('Rechargement : le profil actif (Hugo, 6e) est conservé avec toutes ses données',same(a,expect(KIDS[3])),diff(a,expect(KIDS[3])));
  const p2=await ctx.newPage();p2.on('pageerror',e=>errs.push(e.message));await p2.goto(url+'index.html',{waitUntil:'load'});await p2.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home');
  const r2=await p2.evaluate(()=>({name:S.name,n:Object.keys(PDB.profiles).length,active:ACTIVE}));
  T('Redémarrage dans un nouvel onglet : même profil actif, cinq profils présents',r2.name==='Hugo'&&r2.n===5&&r2.active===ids['Hugo'],JSON.stringify(r2));
  await p2.close();
  // 6. Ordre et contenu stockés : idempotence d'un cycle charger/sauver
  const before=await p.evaluate(()=>localStorage.getItem('mathquest_profiles_v2'));
  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home');
  const after=await p.evaluate(()=>localStorage.getItem('mathquest_profiles_v2'));
  const B=JSON.parse(before),A=JSON.parse(after);
  const strip=o=>{const c=JSON.parse(JSON.stringify(o));for(const pr of Object.values(c.profiles)){delete pr.lastSeen;}return c;};
  T('Un rechargement ne modifie aucune donnée de profil (aucun reset, aucun doublon d’XP/devoir)',JSON.stringify(strip(B))===JSON.stringify(strip(A)),'taille '+before.length+' → '+after.length);
  const hwCount=Object.values(A.profiles).map(x=>(x.homework||[]).length).join(',');
  T('Devoirs : aucun doublon après redémarrages (1 par enfant, 2 pour Zélie)',hwCount==='1,1,2,1,1',hwCount);
  T('Aucune erreur JavaScript pendant tout le parcours',!errs.length,errs.slice(0,3).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
