/* Parcours du jour (js/app-path.js, js/path-report.js) — spec docs/superpowers/specs/2026-10-18-parcours-du-jour-design.md
   Génération, migration, changement de jour, écran du circuit, étapes leçon/exercices, bonus progressif,
   coffre, rapport parent (appli et parent.html), libre accès conservé hors parcours. */
const {serve,launch}=require('./lib');
async function newChild(p,url,stage,grade,name='Testeur'){await p.goto(url+'index.html',{waitUntil:'load'});
  await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm',name);await p.click(`[data-a="pickstage:${stage}"]`);await p.click(`[data-a="pickgrade:${grade}"]`);await p.click('[data-a="begin"]');await p.waitForTimeout(150);}
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d)});
  const {srv,url}=await serve();const b=await launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await newChild(p,url,'college','6e');

  // 1. Génération
  const gen=await p.evaluate(()=>{const a=makeDailyPath(S,'2026-10-19',ACTIVE),a2=makeDailyPath(S,'2026-10-19',ACTIVE),c=makeDailyPath(S,'2026-10-20',ACTIVE);
    const subj=a.steps.slice(0,4).map(s=>s.subj);
    return {n:a.steps.length,kinds:a.steps.map(s=>s.kind).join(','),subj,distinct:new Set(subj).size,
      grade:a.steps.slice(0,4).every(s=>WMAP[s.cid].lvl===S.grade),det:JSON.stringify(a)===JSON.stringify(a2),diff:JSON.stringify(a.steps)!==JSON.stringify(c.steps),
      excl:a.steps.slice(0,4).every(s=>!/(eps|evars?|orientation)$/.test(s.subj)),
      exoIds:a.steps[4].ids.join()===a.steps.slice(0,4).map(s=>s.cid).join()&&a.steps[5].ids.length===4,
      status:a.steps.map(s=>s.status).join(',')};});
  T('Génération : 4 leçons (maths, français, 2 autres matières distinctes) puis 2 exercices sur ces 4 chapitres',
    gen.n===6&&gen.kinds==='lesson,lesson,lesson,lesson,exo,exo'&&/maths$/.test(gen.subj[0])&&/francais$/.test(gen.subj[1])&&gen.distinct===4&&gen.grade&&gen.excl&&gen.exoIds&&gen.status==='next,locked,locked,locked,locked,locked',JSON.stringify(gen));
  T('Génération : même parcours toute la journée, différent le lendemain',gen.det&&gen.diff,JSON.stringify({det:gen.det,diff:gen.diff}));

  const allGrades=await p.evaluate(()=>['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'].map(g=>{const st={...S,grade:g,pathHist:[]};const x=makeDailyPath(st,'2026-10-19','k');
    return {g,ok:!!x&&x.steps.length===6&&x.steps.slice(0,4).every(s=>CHMAP[s.cid]&&COURS[s.cid]&&WMAP[s.cid].lvl===g)};}));
  T('Génération : fonctionne pour chaque classe du CP à la 3e',allGrades.every(x=>x.ok),JSON.stringify(allGrades));

  const avoid=await p.evaluate(()=>{const a=makeDailyPath(S,'2026-10-19',ACTIVE);const st={...S,pathHist:[pathCompact(a)]};
    const b2=makeDailyPath(st,'2026-10-19',ACTIVE);return a.steps.slice(0,4).filter((s,i)=>s.cid===b2.steps[i].cid).length;});
  T('Génération : évite les chapitres des derniers parcours',avoid===0,'chapitres répétés : '+avoid);

  // 2. Migration / sauvegardes anciennes ou abîmées
  const mig=await p.evaluate(()=>{const old=JSON.parse(JSON.stringify(S));delete old.path;delete old.pathHist;delete old.merit.rules.path;old.merit.rules.goal=12;
    const x=normalizeState(old);const bad=normalizeState({...old,path:{date:'x',steps:[1,2,3]},pathHist:'nope'});
    const t=dstr(Date.now()),base=makeDailyPath(S,t,ACTIVE);
    S.path={date:t,steps:base.steps.map(s=>({...s,cid:s.cid?'chapitre-disparu':s.cid,ids:s.ids?s.ids.map(()=>'chapitre-disparu'):s.ids})),chest:false};
    const re=ensurePath();
    return {path:x.path,hist:Array.isArray(x.pathHist),rule:x.merit.rules.path,xp:x.xp===old.xp,badPath:bad.path,badHist:Array.isArray(bad.pathHist),regen:!!re&&!!CHMAP[re.steps[0].cid]};});
  T('Migration : ancienne sauvegarde chargée sans perte, règle « path » reprise de « goal » personnalisée, données abîmées ignorées',
    mig.path===null&&mig.hist&&mig.rule===12&&mig.xp&&mig.badPath===null&&mig.badHist&&mig.regen,JSON.stringify(mig));

  // 3. Changement de jour : la veille non terminée est archivée
  const roll=await p.evaluate(()=>{S.path=makeDailyPath(S,'2026-10-01',ACTIVE);S.pathHist=[];const t=ensurePath();
    return {today:t.date===dstr(Date.now()),hist:S.pathHist.length,completed:S.pathHist[0]&&S.pathHist[0].completed};});
  T('Changement de jour : parcours de la veille archivé « non terminé », nouveau parcours créé',roll.today&&roll.hist===1&&roll.completed===false,JSON.stringify(roll));

  // 4. Écran du circuit, carte d'accueil, explication, libre accès
  const screen=await p.evaluate(()=>{S.path=null;S.pathHist=[];ACT.home();ACT.hometab('accueil');const card=!!document.querySelector('.pathcard [data-a="path"]')&&!!document.querySelector('.pathcard [data-a="pathinfo"]')&&!/Objectif du jour/.test(document.querySelector('#app').innerText);
    ACT.path();const nodes=document.querySelectorAll('.pstep').length,next=document.querySelectorAll('.pstep.next').length,locked=document.querySelectorAll('.pstep.locked').length;
    ACT.pathgo('2');const stillPath=CUR==='path';
    ACT.pathinfo();const chat=document.getElementById('finotchat');const info=!!chat&&chat.classList.contains('open')&&/4 leçons/.test(chat.innerText);finotClose();
    return {card,cur:CUR,nodes,next,locked,stillPath,info};});
  T('Écran du parcours : carte d’accueil avec ⓘ, 6 étapes dont 1 à faire et 5 verrouillées, étape verrouillée refusée, explication de Finot',
    screen.card&&screen.nodes===6&&screen.next===1&&screen.locked===5&&screen.stillPath&&screen.info,JSON.stringify(screen));
  const free=await p.evaluate(()=>{const c=S.path.steps[3].cid;openLesson(c);const a=!!L&&L.id===c&&!L.path;ACT.home();startMission([S.path.steps[2].cid]);const m=!!M&&!M.path;ACT.home();return a&&m;});
  T('Libre accès : les chapitres du parcours restent ouverts hors parcours (cours et missions)',free);
  await p.setViewportSize({width:360,height:740});await p.evaluate(()=>ACT.path());await p.waitForTimeout(100);
  const over=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await p.setViewportSize({width:1280,height:800});
  T('Écran du parcours : pas de débordement en 360 px',over<=1,'débordement '+over);

  // 5. Étapes Leçon (vrai endLesson)
  const finishLesson=async ok=>p.evaluate(ok=>{L.ok=ok?LESSON_QUIZ_N:0;endLesson();return document.querySelector('#app').innerText;},ok);
  await p.evaluate(()=>{S.path=null;S.pathHist=[];ensurePath();ACT.pathgo('0');});
  const t1=await finishLesson(true);
  const s1=await p.evaluate(()=>({st:S.path.steps.map(s=>s.status).join(','),ms:S.path.steps[0].ms,score:S.path.steps[0].score}));
  T('Leçon réussie : bulle verte, étape suivante ouverte, temps enregistré, bouton « Continuer mon parcours »',
    s1.st==='done,next,locked,locked,locked,locked'&&s1.score===100&&s1.ms>=0&&/Continuer mon parcours/.test(t1),JSON.stringify(s1));
  await p.evaluate(()=>{const c=S.path.steps[1].cid;if(S.review)delete S.review[c];ACT.pathgo('1');});await finishLesson(false);
  const s2=await p.evaluate(()=>({st:S.path.steps.map(s=>s.status).join(','),rev:!!(S.review&&S.review[S.path.steps[1].cid])}));
  T('Leçon ratée : bulle orange « à revoir », le parcours continue, la leçon part en révision intelligente',
    s2.st==='done,review,next,locked,locked,locked'&&s2.rev,JSON.stringify(s2));
  const hors=await p.evaluate(()=>{const c=S.path.steps[2].cid;openLesson(c);L.ok=LESSON_QUIZ_N;endLesson();return S.path.steps[2].status;});
  T('Refaire un chapitre du parcours hors parcours ne valide pas l’étape',hors==='next',hors);
  const veille=await p.evaluate(()=>{ACT.pathgo('2');L.path.date='2000-01-01';L.ok=LESSON_QUIZ_N;endLesson();return S.path.steps[2].status;});
  T('Résultat d’une leçon commencée la veille ignoré par le nouveau parcours',veille==='next',veille);
  await p.evaluate(()=>{for(const i of ['2','3']){ACT.pathgo(i);L.ok=LESSON_QUIZ_N;endLesson();}});
  const gate=await p.evaluate(()=>{ACT.path();return {st:S.path.steps.map(s=>s.status).join(','),open:!!document.querySelector('.pgate.open')};});
  T('Après les 4 leçons (même avec une « à revoir ») le chemin des exercices s’ouvre',gate.st==='done,review,done,done,next,locked'&&gate.open,JSON.stringify(gate));

  // 6. Étapes Exercices (vraie mission) : bonus progressif, coffre
  const answer=async ok=>p.evaluate(ok=>{result(!!ok);clearTimeout(M&&M.tid);advance();},ok);
  await p.evaluate(()=>ACT.pathgo('4'));
  const exo=await p.evaluate(()=>({n:M.n,ids:M.ids.join()===S.path.steps.slice(0,4).map(s=>s.cid).join(),path:!!M.path}));
  for(const ok of [true,true,true,true,true,true,false,true])await answer(ok);
  const e1=await p.evaluate(()=>{const s=S.path.steps[4];return {st:S.path.steps.map(x=>x.status).join(','),score:s.score,best:s.bestStreak,nAns:s.answers.length,inIds:s.answers.every(a=>s.ids.includes(a.cid)),timed:s.answers.every(a=>a.ms>=0),bonuses:s.bonuses,end:/Continuer mon parcours/.test(document.querySelector('#app').innerText)};});
  T('Exercices : 8 questions tirées dans les 4 chapitres du jour, réponses chronométrées',exo.n===8&&exo.ids&&exo.path&&e1.nAns===8&&e1.inIds&&e1.timed,JSON.stringify({exo,e1}));
  T('Bonus progressif : 1, 2, 3, 4, 5, 5 puis remise à zéro sur erreur, puis 1',JSON.stringify(e1.bonuses)==='[1,2,3,4,5,5,0,1]',JSON.stringify(e1.bonuses));
  T('Exercices : étape terminée, score et meilleure série enregistrés, étape suivante ouverte, bouton « Continuer mon parcours »',
    e1.st==='done,review,done,done,done,next'&&e1.score===7&&e1.best===6&&e1.end,JSON.stringify(e1));
  const before=await p.evaluate(()=>({c:S.coins,xp:S.xp,mp:S.merit.pts,g:S.goalsDone,rule:S.merit.rules.path}));
  await p.evaluate(()=>ACT.pathgo('5'));for(let k=0;k<8;k++)await answer(false);
  const after=await p.evaluate(()=>({c:S.coins,xp:S.xp,mp:S.merit.pts,g:S.goalsDone,chest:S.path.chest,exp:pathChestGains(S.path),st:S.path.steps.map(x=>x.status).join(',')}));
  // Règle du 20/10 (js/app-path.js) : série < 60 % → « à revoir » ; gains × (1 − 25 % par leçon à revoir) × facteur de réussite aux exercices (7/16 = 44 % → ×0,5).
  T('Coffre : ouvert à la fin, réduit pour 1 leçon à revoir et 44 % de réussite aux exercices (15 🪙, gains ×0,375), goalsDone +1',
    after.chest&&after.exp.coins===15&&after.exp.xp===19&&after.exp.merit===Math.round(before.rule*0.375)&&after.g===before.g+1&&after.xp-before.xp>=19&&after.mp-before.mp>=after.exp.merit&&after.st==='done,review,done,done,done,review',JSON.stringify({before,after}));
  const a0=await p.evaluate(()=>{const c=S.coins,g=S.goalsDone;pathChest(S.path);const same=S.coins===c&&S.goalsDone===g;ACT.pathgo('5');return {same,g,replay:!!M};});
  for(let k=0;k<8;k++)await answer(true);
  const again=await p.evaluate(a0=>a0.same&&a0.replay&&S.goalsDone===a0.g&&S.path.steps[5].status==='done'&&S.path.steps[5].score===8&&S.path.chest===true,a0);
  T('Coffre : jamais deux fois le même jour ; série « à revoir » rejouable et réévaluée (8/8 → réussie), sans second coffre ni objectif en plus',again);

  // 6 bis. Rapport et réglages parents (appli + parent.html)
  // Réponses d'exercices fixées (le tirage des chapitres par question est aléatoire) : chapitre 0 réussi à 100 %, chapitre 1 « à revoir ».
  const rep=await p.evaluate(()=>{const st=JSON.parse(JSON.stringify(S));const c0=st.path.steps[0].cid,c1=st.path.steps[1].cid;
    st.path.steps[4].answers=[{cid:c0,ok:true,ms:1000},{cid:c1,ok:false,ms:1000}];st.path.steps[5].answers=[{cid:c0,ok:true,ms:1000}];const h=pathParentBody(st);const d=document.createElement('div');d.innerHTML=h;const t=d.innerText||d.textContent;
    const c=byId(S.path.steps[0].cid).name;return {sec:/Parcours de révision/.test(t),today:/Aujourd’hui/.test(t),good:/Bien compris/.test(t),work:/À retravailler/.test(t),time:/min/.test(t),week:/7 derniers jours/.test(t),chap:t.includes(c)};});
  T('Rapport parent : étapes du jour avec noms de chapitres et temps, bien compris / à retravailler, résumé 7 jours',Object.values(rep).every(Boolean),JSON.stringify(rep));
  const why=await p.evaluate(()=>{const st=JSON.parse(JSON.stringify(S));const s1=st.path.steps[1];st.path.steps[4].answers=[{cid:s1.cid,ok:true}];st.path.steps[5].answers=[];
    const d=document.createElement('div');d.innerHTML=pathParentBody(st);const t=d.textContent;const line=(t.split('À retravailler')[1]||'');return {line:line.slice(0,160),quiz:/quiz \d+ %/.test(line),exo:/exercices 100 %/.test(line)};});
  T('Rapport parent : un chapitre « à retravailler » montre à la fois le score du quiz et celui des exercices',why.quiz&&why.exo,JSON.stringify(why));
  const settings=await p.evaluate(()=>{PARENT=true;parentScreen('reglages');const t=document.querySelector('#app').innerText;const ok={path:/Parcours du jour terminé/.test(t),noGoal:!document.getElementById('setgoal')};
    parentScreen('suivi');const s=document.querySelector('#app').innerText;ok.stats=/Parcours de révision/.test(s)&&/Objectif du jour/.test(s);PARENT=false;ACT.home();return ok;});
  T('Parents (appli) : bons points du parcours réglables, plus d’objectif « N bonnes réponses », rubrique parcours dans le suivi',settings.path&&settings.noGoal&&settings.stats,JSON.stringify(settings));
  const snap=await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(S));s.lastSeen=Date.now();return s;});
  const pp=await b.newPage();const perr=[];pp.on('pageerror',e=>perr.push(e.message));await pp.setViewportSize({width:360,height:740});
  await pp.route(/supabase\.co/,r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:snap,pending:[],updated_at:new Date().toISOString()})}));
  await pp.goto(url+'parent.html#'+'k'.repeat(32),{waitUntil:'load'});await pp.waitForSelector('.kpis',{timeout:8000}).catch(()=>{});
  const chapName=await p.evaluate(()=>byId(S.path.steps[0].cid).name);
  const rp=await pp.evaluate(c=>{const t=document.querySelector('#app').innerText;return {sec:/Parcours de révision/.test(t),chap:t.includes(c),over:document.documentElement.scrollWidth-document.documentElement.clientWidth};},chapName);
  const rules=await pp.evaluate(()=>{ACT.tab('reglages');return /Parcours du jour terminé/.test(document.querySelector('#app').innerText);});
  T('Suivi parent à distance : rubrique parcours avec noms de chapitres, règle de bons points, sans débordement en 360 px, sans erreur',rp.sec&&rp.chap&&rules&&rp.over<=1&&!perr.length,JSON.stringify({...rp,rules,perr}));await pp.close();

  const faq=await p.evaluate(()=>['c est quoi l objectif du jour','c est quoi le parcours du jour'].map(q=>{const m=finotMatch(q);return m?m.a:'';}));
  T('Finot : « objectif du jour » et « parcours du jour » renvoient vers le parcours (plus de « N bonnes réponses »)',faq.every(a=>/parcours/i.test(a)&&!/nombre de bonnes réponses/.test(a)),JSON.stringify(faq));

  // 7. Rouvrir l'appli avec un profil existant : l'accueil s'affiche au démarrage AVANT le chargement de
  //    app-path.js (home() est appelé à la fin d'app-actions.js) — aucune erreur, et la carte apparaît.
  await p.evaluate(()=>{save();ACT.home();ACT.hometab('accueil');});
  const errs2=[];const onCon=m=>{if(m.type()==='error')errs2.push(m.text());};const onErr=e=>errs2.push(e.message);p.on('console',onCon);p.on('pageerror',onErr);
  await p.reload({waitUntil:'load'});await p.waitForTimeout(300);
  const boot=await p.evaluate(()=>({card:!!document.querySelector('.pathcard'),name:S.name}));
  p.off('console',onCon);p.off('pageerror',onErr);
  T('Réouverture de l’appli : carte « Parcours du jour » sur l’accueil, sans erreur au démarrage',boot.card&&boot.name&&!errs2.length,JSON.stringify({...boot,errs2}));

  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
