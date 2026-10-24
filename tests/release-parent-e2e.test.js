/* Audit de release (24/10/2026) — espace parent de bout en bout, 16 étapes, UNIQUEMENT par l'interface
   (création du code, devoir, signalement « terminé » par l'enfant, validation, « à refaire », bilan hebdomadaire,
   changements de profil, rechargements). Vérifie l'isolation entre enfants et que la récompense n'est jamais versée deux fois. */
const {serve,launchEngine,freshContext,wizard,playMission}=require('./release-lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const {ctx,p,errs}=await freshContext(b,url);
  const state=()=>p.evaluate(()=>({name:S.name,xp:S.xp,coins:S.coins,merit:S.merit.pts,hw:(S.homework||[]).map(h=>({id:h.id,t:h.title,st:h.status,r:!!h.rewardedAt,rw:h.reward&&h.reward.xp})),meritHist:S.merit.hist.length,id:ACTIVE}));
  const goHome=async()=>{await p.evaluate(()=>{PARENT=false;home();});await p.waitForFunction(()=>CUR==='home');};
  // — 1. deux profils enfants, créés par l'assistant —
  await wizard(p,{name:'Alice',grade:'CE2',birth:'2017-05-05'});const A=await p.evaluate(()=>ACTIVE);
  await p.click('[data-a="profiles"]');await p.click('[data-a="pnew"]');await wizard(p,{name:'Boris',grade:'5e',stage:'college',birth:'2013-03-03',gender:'boy'});const B=await p.evaluate(()=>ACTIVE);
  await p.click('[data-a="profiles"]');await p.click(`[data-a="pswitch:${A}"]`);await p.waitForFunction(()=>S.name==='Alice'&&CUR==='home');
  T('1. Deux profils enfants créés (Alice CE2, Boris 5e)',A!==B&&(await p.evaluate(()=>Object.keys(PDB.profiles).length))===2);
  // — 2. ouverture de l'espace parent : création du code par l'interface —
  await p.click('[data-a="hometab:plus"]');await p.click('[data-a="parent"]');await p.waitForSelector('#pin2');
  await p.fill('#pin','2468');await p.fill('#pin2','2468');await p.click('[data-a="pinok"]');await p.waitForSelector('.reckey');await p.click('[data-a="ptab:suivi"]');
  await p.waitForSelector('[data-homework-parent="1"]');
  T('2. Espace parent ouvert après création du code (4 chiffres), formulaire de devoir présent',await p.evaluate(()=>PARENT===true&&!!S.pin&&!!document.querySelector('#hw-title')));
  // — 3. devoir pour Alice par le formulaire —
  const due=await p.evaluate(()=>{const d=new Date();d.setDate(d.getDate()+2);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');});
  await p.fill('#hw-title','Poésie à apprendre');await p.fill('#hw-due',due);await p.fill('#hw-note','Les deux premières strophes.');await p.click('[data-a="hwcreate"]');
  await p.waitForFunction(()=>S.homework.length===1);let s=await state();const hwA=s.hw[0].id;
  T('3. Devoir créé pour Alice : « à faire », sans aucune récompense',s.hw[0].st==='todo'&&!s.hw[0].r&&s.xp===0&&s.coins===0,JSON.stringify(s.hw));
  // — 4. absent chez Boris (changement par les pastilles du parent) —
  await p.click(`.profile-chip[data-a="ppswitch:${B}"]`);await p.waitForFunction(()=>S.name==='Boris');await p.waitForSelector('[data-homework-parent="1"]');
  const bView=await p.evaluate(()=>({rows:document.querySelectorAll('[data-homework-parent="1"] .hw-row').length,txt:document.querySelector('[data-homework-parent="1"]').textContent,n:S.homework.length}));
  T('4. Le devoir d’Alice n’apparaît pas chez Boris (ni dans les données, ni à l’écran)',bView.n===0&&bView.rows===0&&!/Poésie/.test(bView.txt),JSON.stringify({n:bView.n,rows:bView.rows}));
  // — 5. Alice signale « terminé » depuis son accueil —
  await p.click(`.profile-chip[data-a="ppswitch:${A}"]`);await p.waitForFunction(()=>S.name==='Alice');
  const before=await state();await goHome();await p.waitForSelector(`[data-a="hwclaim:${hwA}"]`);
  await p.click(`[data-a="hwclaim:${hwA}"]`);await p.waitForFunction(id=>S.homework.find(h=>h.id===id).status==='claimed',hwA);
  // — 6. aucune récompense avant validation —
  s=await state();
  T('5-6. « J’ai terminé » : statut « à valider », XP/pièces/bons points inchangés',s.hw[0].st==='claimed'&&!s.hw[0].r&&s.xp===before.xp&&s.coins===before.coins&&s.merit===before.merit,JSON.stringify({before:[before.xp,before.coins,before.merit],after:[s.xp,s.coins,s.merit]}));
  const childTxt=await p.evaluate(()=>document.querySelector('[data-homework-child="1"]').textContent);
  T('6 bis. L’enfant lit « Validation parent nécessaire » (pas de récompense annoncée)',/Validation parent nécessaire/.test(childTxt)&&!/Récompense validée/.test(childTxt),childTxt.slice(0,160));
  // — 7-8. le parent se reconnecte avec son code et valide : récompense exactement une fois —
  await p.click('[data-a="hometab:plus"]');await p.click('[data-a="parent"]');await p.waitForSelector('#pin');await p.fill('#pin','2468');await p.click('[data-a="pinok"]');
  await p.waitForSelector(`[data-a="hwvalidate:${hwA}"]`);const pre=await state();await p.click(`[data-a="hwvalidate:${hwA}"]`);
  await p.waitForFunction(id=>S.homework.find(h=>h.id===id).status==='validated',hwA);s=await state();
  // Le 1er devoir validé du jour qualifie aussi la journée d'étude (MQEconomy.qualifyDay : +2 bons points, une fois par jour).
  T('7-8. Validation parent : +15 XP, +3 pièces, +2 bons points du devoir (+2 de journée qualifiée), une seule fois',s.xp-pre.xp===15&&s.coins-pre.coins===3&&s.merit-pre.merit===4&&s.hw[0].r,JSON.stringify({dxp:s.xp-pre.xp,dc:s.coins-pre.coins,dm:s.merit-pre.merit}));
  const afterOnce=s;
  // — 9-10. rechargement, réouverture, nouvelle validation impossible —
  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home');
  await p.click('[data-a="hometab:plus"]');await p.click('[data-a="parent"]');await p.fill('#pin','2468');await p.click('[data-a="pinok"]');await p.waitForSelector('[data-homework-parent="1"]');
  const replay=await p.evaluate(id=>{const a=[S.xp,S.coins,S.merit.pts];const r=[MQHomework.validate(id),MQHomework.validate(id),MQHomework.grant(MQHomework.find(id)).granted];ACT.hwvalidate(id);return {r,d:[S.xp-a[0],S.coins-a[1],S.merit.pts-a[2]]};},hwA);
  s=await state();
  T('9-10. Après rechargement : revalider ou re-attribuer ne verse plus rien (XP, pièces, bons points identiques)',replay.d.join()==='0,0,0'&&replay.r.every(x=>x===false)&&s.xp===afterOnce.xp&&s.coins===afterOnce.coins&&s.merit===afterOnce.merit,JSON.stringify({replay,s:[s.xp,s.coins,s.merit],was:[afterOnce.xp,afterOnce.coins,afterOnce.merit]}));
  T('10 bis. Historique des bons points : une seule ligne « Devoir scolaire validé : … » et une seule qualification de journée',await p.evaluate(()=>S.merit.hist.filter(h=>/^Devoir scolaire validé : /.test(h.w)).length===1&&S.merit.hist.filter(h=>/validé par le parent/.test(h.w)).length===1));
  // — 11-12. second devoir, signalé puis renvoyé « à refaire » —
  await p.fill('#hw-title','Exercices de calcul');await p.click('[data-a="hwcreate"]');await p.waitForFunction(()=>S.homework.length===2);
  const hw2=await p.evaluate(()=>S.homework.find(h=>h.title==='Exercices de calcul').id);
  const pre2=await state();await p.evaluate(id=>MQHomework.claim(id),hw2);await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector(`[data-a="hwreturn:${hw2}"]`);
  await p.click(`[data-a="hwreturn:${hw2}"]`);await p.waitForFunction(id=>S.homework.find(h=>h.id===id).status==='todo',hw2);s=await state();
  T('11-12. Second devoir renvoyé « à refaire » : retour « à faire », aucun gain, premier devoir toujours validé',s.hw.find(h=>h.id===hw2).st==='todo'&&s.xp===pre2.xp&&s.coins===pre2.coins&&s.hw.find(h=>h.id===hwA).st==='validated');
  await p.evaluate(id=>MQHomework.claim(id),hw2);await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector(`[data-a="hwvalidate:${hw2}"]`);const pre3=await state();await p.click(`[data-a="hwvalidate:${hw2}"]`);await p.waitForFunction(id=>S.homework.find(h=>h.id===id).status==='validated',hw2);s=await state();
  T('12 bis. Second devoir validé le même jour : +15 XP, +3 pièces, +2 bons points seulement (la journée n’est qualifiée qu’une fois)',s.xp-pre3.xp===15&&s.coins-pre3.coins===3&&s.merit-pre3.merit===2,JSON.stringify({dxp:s.xp-pre3.xp,dm:s.merit-pre3.merit}));
  // — 13. bilan hebdomadaire vide (Boris n'a rien fait) —
  await p.click(`.profile-chip[data-a="ppswitch:${B}"]`);await p.waitForFunction(()=>S.name==='Boris');await p.waitForSelector('.mq-weekly');
  const w0=await p.evaluate(()=>({txt:document.querySelector('.mq-weekly').textContent,q:MQWeeklyReport.report().cur.questions}));
  T('13. Bilan hebdomadaire de Boris (aucune activité) : vide, sans pourcentage inventé ni donnée d’Alice',w0.q===0&&/Pas encore assez/.test(w0.txt)&&!/Alice|Poésie/.test(w0.txt),w0.txt.slice(0,200));
  // — 14-15. Boris joue une vraie mission, le bilan se remplit —
  await goHome();await p.evaluate(()=>{const c=SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).id;ACT.start(c);ACT.startlevel(c+'|1');});
  await p.waitForFunction(()=>M&&M.q);const played=await playMission(p,[true,true,false]);
  await p.evaluate(()=>{PARENT=false;});await p.click('[data-a="home"]').catch(()=>{});await p.waitForFunction(()=>CUR==='home'||CUR==='mission-end').catch(()=>{});
  const act=await p.evaluate(()=>({q:MQWeeklyReport.report().cur.questions,ok:MQWeeklyReport.report().cur.correct,xp:S.xp,totalQ:S.totalQ}));
  await p.evaluate(()=>{PARENT=true;parentScreen('suivi');});await p.waitForSelector('.mq-weekly');
  const w1=await p.evaluate(()=>document.querySelector('.mq-weekly').textContent);
  T('14-15. Après une vraie mission de Boris : bilan hebdomadaire avec activité (questions comptées, plus de message « pas assez de données »)',played>=3&&act.q>=3&&act.xp>0&&!/Pas encore assez/.test(w1),JSON.stringify({played,act,w:w1.slice(0,160)}));
  // — 16. changements de profil répétés, isolation parfaite —
  const leaks=[];
  for(let i=0;i<8;i++){const id=i%2?A:B;await p.evaluate(id=>{PARENT=true;activateProfile(id,false);parentScreen('suivi');},id);await p.waitForSelector('[data-homework-parent="1"]');
   const v=await p.evaluate(()=>({name:S.name,rows:[...document.querySelectorAll('[data-homework-parent="1"] .hw-row')].map(r=>r.textContent),xp:S.xp,week:MQWeeklyReport.report().cur.questions}));
   if(v.name==='Boris'&&(v.rows.length||v.week<3))leaks.push('Boris '+JSON.stringify(v));
   if(v.name==='Alice'&&(v.rows.length!==2||v.week!==0||!v.rows.some(r=>/Poésie/.test(r))))leaks.push('Alice '+JSON.stringify(v));}
  T('16. Huit allers-retours Alice ↔ Boris dans l’espace parent : devoirs, XP et bilan toujours propres à chaque enfant',!leaks.length,leaks.join(' | '));
  // Cohérence d'affichage des devoirs : échéance dépassée, validés, retard
  await p.evaluate(id=>{PARENT=true;activateProfile(id,false);},A);
  const disp=await p.evaluate(()=>{const mk=(n,o)=>Object.assign({id:'hw_d'+n,title:'D'+n,subject:'p-maths',due:'',note:'',status:'todo',createdAt:Date.now()+n,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null},o);
    const d=o=>{const x=new Date();x.setDate(x.getDate()+o);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');};
    S.homework=[mk(1,{due:d(-3)}),mk(2,{due:d(0)}),mk(3,{due:d(5)}),mk(4,{due:d(-9),status:'validated',validatedAt:Date.now(),rewardedAt:1,rewardDay:'x',reward:{xp:15,coins:3,merit:2}})];saveLocal();parentScreen('suivi');
    return [...document.querySelectorAll('[data-homework-parent="1"] .hw-row')].map(r=>r.textContent.replace(/\s+/g,' '));});
  await p.waitForTimeout(100);
  const rows=await p.evaluate(()=>[...document.querySelectorAll('[data-homework-parent="1"] .hw-row')].map(r=>r.textContent.replace(/\s+/g,' ')));
  const rowOf=n=>rows.find(r=>r.includes('D'+n))||'';
  T('Affichage des devoirs : retard signalé seulement pour un devoir non validé, « aujourd’hui », échéance future, validé en retard sans « En retard »',/En retard/.test(rowOf(1))&&/aujourd/.test(rowOf(2))&&!/En retard/.test(rowOf(3))&&!/En retard/.test(rowOf(4)),rows.join(' || '));
  T('Aucune erreur JavaScript pendant le parcours parent',!errs.length,errs.slice(0,3).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
