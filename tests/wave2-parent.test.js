/* Audit de l'espace parent (vague 2) par parcours Playwright réels : devoirs (création, signalement, validation,
   « à refaire », récompense unique et plafonnée), libellés compréhensibles par un adulte, bilan hebdomadaire,
   changement de profil sans mélange de données, mobile/tablette/desktop, clair/sombre, noms accessibles,
   absence de mesure « médicale » ou de biais lié au sexe. */
const {serve,launch,seedProfile}=require('./lib');
const fs=require('fs');
const path=require('path');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQHomework&&!!window.MQEconomy&&!!window.MQWeeklyReport&&!!window.MQFamilyChallenge);

  // --- 1. Onglets du parent : pas de débordement, noms accessibles, tous viewports et thèmes ---
  await p.evaluate(()=>{const now=Date.now(),ch=Object.keys(CHMAP).filter(id=>WMAP[id]&&WMAP[id].lvl==='CE2').slice(0,3);
   S.answerLog=[];for(let i=0;i<12;i++)S.answerLog.push({t:now-i*3600e3,cid:ch[i%3],ok:i%3!==0,ms:8000});
   S.activityLog=[{t0:now-3600e3,ms:600000,kind:'exercise',ids:[ch[0]],subj:sOf(WMAP[ch[0]].id).id}];
   MQAdaptive.recordMistake(S,ch[0],{q:'q',answer:'a',expl:'e'});saveLocal();});
  const bad=[];
  for(const w of [320,390,768,1280])for(const th of ['light','dark'])for(const tab of ['suivi','programme','recomp','reglages']){
   await p.setViewportSize({width:w,height:800});
   await p.evaluate(({tab,th})=>{if(th==='dark')document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;parentScreen(tab);},{tab,th});await p.waitForTimeout(60);
   const x=await p.evaluate(()=>{
    const vis=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;};
    const name=e=>(e.getAttribute('aria-label')||e.getAttribute('title')||(e.id&&document.querySelector('label[for="'+e.id+'"]')?.textContent)||e.closest('label')?.textContent||e.textContent||e.getAttribute('placeholder')||'').trim();
    const unnamed=[...document.querySelectorAll('#app button,#app a,#app input,#app select,#app textarea')].filter(vis).filter(e=>e.type!=='hidden'&&!name(e)).map(e=>e.outerHTML.slice(0,80));
    return {ov:document.documentElement.scrollWidth-innerWidth,unnamed};});
   if(x.ov>1||x.unnamed.length)bad.push(`${w}/${th}/${tab}:${JSON.stringify(x)}`);
  }
  await p.evaluate(()=>{delete document.documentElement.dataset.theme;});
  T('Espace parent : 4 onglets × 4 largeurs × clair/sombre sans débordement horizontal et sans contrôle sans nom accessible',!bad.length,bad.slice(0,3).join(' ; '));

  // --- 2. Devoirs : parcours complet par l'interface ---
  await p.setViewportSize({width:390,height:844});
  await p.evaluate(()=>{S.homework=[];saveLocal();parentScreen('suivi');});await p.waitForSelector('#hw-title');
  await p.fill('#hw-title','Lire le chapitre 3');await p.selectOption('#hw-subj','p-francais');await p.click('[data-a="hwcreate"]');
  const id1=await p.evaluate(()=>S.homework[0]?.id);
  T('Parent : création d’un devoir par l’interface (statut « à faire », aucun gain)',!!id1&&await p.evaluate(()=>S.homework[0].status==='todo'&&!S.homework[0].rewardedAt));
  const x0=await p.evaluate(id=>{const o={xp:S.xp,coins:S.coins};MQHomework.claim(id);parentScreen('suivi');return o;},id1);
  await p.waitForSelector('[data-homework-parent="1"]');const btn=await p.locator('[data-a="hwreturn:'+id1+'"]').count();if(btn)await p.click('[data-a="hwreturn:'+id1+'"]');
  const refuse=await p.evaluate(o=>({btn:true,st:S.homework[0].status,gain:S.xp-o.xp+S.coins-o.coins}),x0);refuse.btn=btn>0;
  T('Parent : « À refaire » est proposé sur un devoir signalé, le remet à faire sans aucun gain',refuse.btn&&refuse.st==='todo'&&refuse.gain===0,JSON.stringify(refuse));

  // --- 3. Libellés pour un adulte ---
  await p.evaluate(()=>{
   const now=Date.now(),mk=(n,o)=>Object.assign({id:'hw_l'+n,title:'Devoir '+n,subject:'p-maths',due:'2020-01-05',note:'',status:'todo',createdAt:now+n,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null},o);
   S.homework=[mk(1,{status:'validated',validatedAt:now,rewardedAt:now,rewardDay:'x',reward:{xp:15,coins:3,merit:2}}),mk(2,{status:'validated',validatedAt:now,rewardDay:'x',reward:{xp:0,coins:0,merit:0,capped:true}})];
   parentScreen('suivi');});
  await p.waitForSelector('[data-homework-parent="1"]');
  const lab=await p.evaluate(()=>{const parentTxt=document.querySelector('[data-homework-parent="1"]').textContent;
   home();document.querySelector('[data-homework-child="1"]')?.remove();document.querySelector('#app').insertAdjacentHTML('beforeend',MQHomework.childHtml());
   const rows=[...document.querySelectorAll('[data-homework-child="1"] .hw-row')].map(r=>r.textContent);return {parentTxt,rows};});
  T('Devoir validé en retard : le parent ne lit plus « En retard » sur un devoir déjà validé',!/En retard/.test(lab.parentTxt),lab.parentTxt.slice(0,300));
  const cappedRow=lab.rows.find(r=>r.includes('Devoir 2'))||'',okRow=lab.rows.find(r=>r.includes('Devoir 1'))||'';
  T('Enfant : un devoir validé mais non récompensé (plafond du jour) n’affiche pas « Récompense validée »',/Récompense validée/.test(okRow)&&!/Récompense validée/.test(cappedRow),JSON.stringify({okRow,cappedRow}));

  // --- 4. Récompense unique et plafond (rejeu par l'interface) ---
  const eco=await p.evaluate(()=>{S.homework=[];const mk=n=>({id:'hw_e'+n,title:'E'+n,subject:'p-maths',due:'',note:'',status:'claimed',createdAt:Date.now()+n,claimedAt:Date.now(),validatedAt:0,rewardedAt:0,rewardDay:'',reward:null});
   S.homework.push(mk(1),mk(2),mk(3));const b0={xp:S.xp,coins:S.coins};ACT.hwvalidate('hw_e1');ACT.hwvalidate('hw_e1');ACT.hwvalidate('hw_e2');ACT.hwvalidate('hw_e3');
   return {dxp:S.xp-b0.xp,dcoins:S.coins-b0.coins,third:S.homework.find(x=>x.id==='hw_e3').reward};});
  T('Récompense unique : double clic sans second gain ; troisième devoir du jour validé sans gain',eco.dxp===30&&eco.dcoins===6&&eco.third?.capped===true,JSON.stringify(eco));

  // --- 5. Bilan hebdomadaire : comparaison sans donnée précédente ---
  await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector('.mq-weekly');
  const weekly=await p.evaluate(()=>{const h=document.querySelector('.mq-weekly');return {txt:h?.textContent||'',kpis:[...h.querySelectorAll('.mq-weekly-kpi')].map(k=>k.textContent)};});
  const reussite=weekly.kpis.find(k=>/Réussite/.test(k))||'';
  T('Bilan hebdomadaire : sans semaine précédente, la réussite n’est pas présentée comme « stable »',!/stable/.test(reussite),reussite);

  // --- 6. Changement de profil : aucune fuite entre enfants ---
  const a=await p.evaluate(()=>({id:ACTIVE,name:S.name,xp:S.xp,weekly:MQWeeklyReport.report().cur.questions}));
  await p.evaluate(()=>createProfile());await seedProfile(p,'Noé','CM1');await p.waitForTimeout(80);
  const bb=await p.evaluate(()=>({name:S.name,xp:S.xp,coins:S.coins,hw:(S.homework||[]).length,weekly:MQWeeklyReport.report().cur.questions,q:MQEconomy.day.qualified}));
  await p.evaluate(()=>parentScreen('suivi'));await p.waitForTimeout(100);
  const bview=await p.evaluate(()=>({weekly:document.querySelector('.mq-weekly')?.textContent||'',lpd:document.querySelector('.lpd')?.textContent||'',hw:document.querySelectorAll('[data-homework-parent="1"] .hw-row').length,strip:document.body.textContent.includes('Lina')&&!document.querySelector('.profile-strip')}));
  T('Profil neuf : devoirs, économie, bilan et vue rapide vides (rien de l’enfant précédent)',bb.name==='Noé'&&bb.xp===0&&bb.coins===0&&bb.hw===0&&bb.weekly===0&&!bb.q&&bview.hw===0&&/Pas encore assez/.test(bview.weekly)&&!/Lina/.test(bview.weekly)&&/0 min/.test(bview.lpd),JSON.stringify({bb,bview:{hw:bview.hw,w:bview.weekly.slice(0,80)}}));
  await p.evaluate(id=>activateProfile(id),a.id);await p.waitForTimeout(80);
  const back=await p.evaluate(()=>({name:S.name,xp:S.xp,weekly:MQWeeklyReport.report().cur.questions,hw:S.homework.length}));
  T('Retour sur le premier profil : données intactes',back.name===a.name&&back.xp===a.xp&&back.weekly===a.weekly&&back.hw===3,JSON.stringify({a,back}));
  const fam=await p.evaluate(()=>MQFamilyChallenge.participants().map(x=>x.p.name+':'+x.m.score));
  T('Défi famille : un score par profil, indépendant du niveau scolaire',fam.length===2&&fam.some(s=>s.startsWith('Noé:0')),fam.join(','));

  // --- 7. Pas de mesure médicale / pas de biais lié au sexe ---
  let allTxt='';
  for(const tab of ['suivi','programme','recomp','reglages']){allTxt+=await p.evaluate(t=>{parentScreen(t);return document.getElementById('app').textContent;},tab);}
  T('Espace parent : aucun vocabulaire médical ou diagnostique (dyslexie, trouble, pathologie, QI…)',!/dyslexi|dyscalcul|troubles?\b|pathologi|diagnostic m[ée]dical|\bQI\b|handicap/i.test(allTxt),(allTxt.match(/dyslexi|dyscalcul|troubles?\b|pathologi|diagnostic m[ée]dical|\bQI\b|handicap/i)||[''])[0]);
  const jsDir=path.join(__dirname,'..','js');const users=fs.readdirSync(jsDir).filter(f=>f.endsWith('.js')&&/\.gender\b|\bgender\s*[:=]/.test(fs.readFileSync(path.join(jsDir,f),'utf8')));
  const allowed=/^(modern-profile-|app-state|app-core|app-profile|app-actions|app-screens|finot-)/;
  const engines=users.filter(f=>/adaptive|difficulty|competency|mastery|session|recommend|path|reading-engine|exercise/i.test(f));
  T('Le sexe du profil n’intervient dans aucun moteur de niveau, de difficulté ou de recommandation',!engines.length,engines.join(',')+' | tous: '+users.join(','));

  T('Aucune erreur JavaScript pendant l’audit parent',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}return R;
}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
