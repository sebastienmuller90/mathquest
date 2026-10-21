/* Scénarios utilisateur bout en bout (20/10/2026, stabilisation §7) — vrais parcours autant que possible :
   1. première ouverture sans stockage ; 2. migration d'un ancien profil (mathquest_v1) ; 3. stockage corrompu ;
   4. plusieurs profils et changement d'enfant en pleine mission ; 5. rechargement après une leçon et en pleine mission ;
   6. parcours du jour complet (leçons, séries done/review, coffre unique, reprise) ; 7. exercices (bonne/mauvaise réponse,
   indice, suivant, défi éclair, quitter) ; 8. Finot « Pourquoi ma réponse est fausse ? » isolé par profil ;
   9. espace parents local (périodes, après changement de classe). */
const {serve,launch}=require('./lib');
const answerJS=`(correct)=>{const q=M.q;const sel=s=>document.querySelector(s);
 if(q.type==='choice'){const i=correct?q.ans:(q.ans+1)%q.choices.length;document.querySelectorAll('.choice')[i].click();return;}
 if(q.type==='order'){const idx=[];let rest=normLang(q.ans,q.lang);const used=new Set();let guard=0;while(rest.length&&guard++<50){const i=q.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(normLang(t,q.lang)));if(i<0)break;used.add(i);idx.push(i);rest=rest.slice(normLang(q.tokens[i],q.lang).length).trim();}
  if(!correct)idx.reverse();idx.forEach(i=>document.querySelector('[data-a="otok:'+i+'"]').click());}
 else if(q.type==='multi')q.labels.forEach((_,i)=>sel('#in'+i).value=correct?String(q.ans[i]):'987654');
 else if(q.type==='num')sel('#in0').value=correct?String(q.ans):'987654';
 else if(q.type==='frac')sel('#in0').value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';
 else sel('#in0').value=correct?q.acc[0]:'zzzzqqq';
 const v=sel('[data-a="valid"]');if(v)v.click();}`;
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const ans=c=>p.evaluate(`(${answerJS})(${c})`);
 const fresh=async()=>{await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});};
 const onboard=async(name,stage,grade)=>{await p.fill('#nm',name);await p.click(`[data-a="pickstage:${stage}"]`);await p.click(`[data-a="pickgrade:${grade}"]`);await p.click('[data-a="begin"]');await p.waitForTimeout(150);};
 // Avance après une réponse : bouton « suivant » s'il existe, sinon l'enchaînement automatique est déclenché tout de suite.
 const next=()=>p.evaluate(()=>{if(!M)return;const b=document.querySelector('#fb [data-a="next"]');if(b)b.click();else if(M.locked)advance();});

 // 1. Première ouverture sans stockage → onboarding → accueil.
 await fresh();
 const s1a=await p.evaluate(()=>({onb:!!document.querySelector('#nm'),name:S.name}));
 await onboard('Lina','college','6e');
 const s1b=await p.evaluate(()=>({cur:CUR,name:S.name,grade:S.grade,stored:!!localStorage.getItem('mathquest_profiles_v2'),profiles:Object.keys(PDB.profiles).length}));
 T('1. Première ouverture sans stockage : accueil de création de profil, puis accueil enregistré',s1a.onb&&!s1a.name&&s1b.cur==='home'&&s1b.name==='Lina'&&s1b.grade==='6e'&&s1b.stored&&s1b.profiles===1,JSON.stringify({s1a,s1b}));

 // 2. Ancien profil historique : seule la clé mathquest_v1 existe.
 await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mathquest_v1',JSON.stringify({name:'Ancien',avatar:'🐼',grade:'5e',xp:777,coins:42,totalQ:12,totalOk:9,chap:{'5a':{stars:2,ok:5,tot:6}},lessons:{'5a':1700000000000}}));});
 await p.goto(url+'index.html',{waitUntil:'load'});
 const s2=await p.evaluate(()=>({name:S.name,grade:S.grade,xp:S.xp,coins:S.coins,chap:S.chap['5a'],lesson:!!S.lessons['5a'],pdb:!!JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'null')?.profiles,backup:!!localStorage.getItem('mathquest_v1_backup'),cur:CUR}));
 T('2. Ancien profil (mathquest_v1) migré sans perte : nom, classe, XP, pièces, étoiles, leçons ; sauvegarde de l’ancien format',s2.name==='Ancien'&&s2.grade==='5e'&&s2.xp===777&&s2.coins===42&&s2.chap&&s2.chap.ok===5&&s2.chap.tot===6&&s2.lesson&&s2.pdb&&s2.backup&&s2.cur==='home',JSON.stringify(s2));

 // 3. Stockage corrompu : l'appli démarre, la donnée illisible est conservée à part.
 await p.evaluate(()=>{localStorage.clear();localStorage.setItem('mathquest_profiles_v2','{oops pas du JSON');});
 const e3=errs.length;await p.goto(url+'index.html',{waitUntil:'load'});
 const s3=await p.evaluate(()=>{const k=Object.keys(localStorage).find(k=>k.startsWith('mathquest_profiles_corrupt_backup_'));return {backup:k?localStorage.getItem(k):null,onb:!!document.querySelector('#nm'),valid:!!JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'null')?.profiles};});
 T('3. Stockage corrompu : démarrage sans erreur, donnée illisible conservée en sauvegarde de secours, stockage reconstruit',s3.backup==='{oops pas du JSON'&&s3.onb&&s3.valid&&errs.length===e3,JSON.stringify({...s3,errs:errs.slice(e3)}));

 // 4. Deux enfants : aucune donnée mélangée ; changement d'enfant en pleine mission.
 await fresh();await onboard('Alice','college','6e');
 const A=await p.evaluate(()=>ACTIVE);
 await p.evaluate(()=>{startMission([reco().id]);});await ans(false);
 const a1=await p.evaluate(()=>({tq:S.totalQ,mist:Object.keys(S.mistakes).length,log:(S.answerLog||[]).length,cid:M&&M.cid}));
 await p.evaluate(()=>createProfile());await onboard('Bob','primaire','CM1');
 const B=await p.evaluate(()=>ACTIVE);
 // Bob commence une mission ; on revient à Alice pendant la mission de Bob.
 await p.evaluate(()=>{startMission([reco().id]);});
 const swap=await p.evaluate(a=>{const mBefore=!!M;activateProfile(a);const mAfter=M;let threw=null;try{result(true);validate(0);}catch(e){threw=e.message;}return {mBefore,mAfter:!!mAfter,threw,name:S.name,tq:S.totalQ};},A);
 const iso=await p.evaluate(([a,b])=>{const pa=normalizeState(PDB.profiles[a]),pb=normalizeState(PDB.profiles[b]);
  const pathB=(()=>{activateProfile(b,false);const p=ensurePath();const ok=p.steps.every(s=>s.kind==='lesson'?WMAP[s.cid].lvl==='CM1':(s.ids||[]).every(id=>WMAP[id].lvl==='CM1'));activateProfile(a,false);return ok;})();
  return {aTq:pa.totalQ,aMist:Object.keys(pa.mistakes).length,aLog:(pa.answerLog||[]).length,bTq:pb.totalQ,bMist:Object.keys(pb.mistakes).length,bLog:(pb.answerLog||[]).length,bGrade:pb.grade,pathB};},[A,B]);
 T('4a. Changement d’enfant en pleine mission : mission fermée, aucune réponse attribuée au nouvel enfant',swap.mBefore&&!swap.mAfter&&!swap.threw&&swap.name==='Alice'&&swap.tq===a1.tq,JSON.stringify(swap));
 T('4b. Deux enfants isolés : progression, carnet d’erreurs, journal et parcours propres à chacun',a1.tq===1&&a1.mist===1&&iso.aTq===1&&iso.aMist===1&&iso.aLog===1&&iso.bTq===0&&iso.bMist===0&&iso.bLog===0&&iso.bGrade==='CM1'&&iso.pathB,JSON.stringify({a1,iso}));

 // 5. Rechargement après une leçon validée, puis en pleine mission.
 const cidL=await p.evaluate(()=>{const id=reco().id;openLesson(id);L.ok=LESSON_QUIZ_N;endLesson();return id;});
 await p.reload({waitUntil:'load'});
 const s5a=await p.evaluate(id=>({lesson:!!S.lessons[id],score:S.lessonScores[id],name:S.name}),cidL);
 await p.evaluate(()=>{startMission([reco().id]);});const tq0=await p.evaluate(()=>S.totalQ);
 for(let i=0;i<3;i++){await ans(i!==1);await p.waitForSelector('#fb .fb');await next();}
 const before=await p.evaluate(()=>({tq:S.totalQ,log:S.answerLog.length,xp:S.xp}));
 await p.reload({waitUntil:'load'});
 const s5b=await p.evaluate(()=>({tq:S.totalQ,log:S.answerLog.length,xp:S.xp,M:!!M,cur:CUR}));
 T('5a. Rechargement après une leçon validée : leçon et score conservés',s5a.lesson&&s5a.score===100&&s5a.name==='Alice',JSON.stringify(s5a));
 T('5b. Rechargement en pleine mission : les 3 réponses déjà données restent comptées, retour propre à l’accueil',before.tq===tq0+3&&s5b.tq===before.tq&&s5b.log===before.log&&s5b.xp===before.xp&&!s5b.M&&s5b.cur==='home',JSON.stringify({tq0,before,s5b}));

 // 6. Parcours du jour complet.
 const pth=await p.evaluate(()=>{S.path=null;const p=ensurePath();return {n:p.steps.length,date:p.date};});
 for(let i=0;i<4;i++){await p.evaluate(i=>{pathGo(i);L.ok=LESSON_QUIZ_N;endLesson();},i);}
 const afterLessons=await p.evaluate(()=>({st:S.path.steps.map(s=>s.status).join(','),cur:CUR}));
 // Série 1 : tout juste → done. Série 2 : tout faux → review.
 const coins0=await p.evaluate(()=>{pathScreen();return {coins:S.coins,goals:S.goalsDone};});
 for(const [step,ok] of [[4,true],[5,false]]){await p.evaluate(i=>pathGo(i),step);for(let k=0;k<8;k++){const live=await p.evaluate(()=>!!M&&!!M.path);if(!live)break;await ans(ok);await p.waitForSelector('#fb .fb');await next();await p.waitForTimeout(30);}}
 const s6=await p.evaluate(()=>({st:S.path.steps.map(s=>s.status).join(','),scores:S.path.steps.slice(4).map(s=>s.score),chest:S.path.chest,goals:S.goalsDone,coins:S.coins}));
 // Rejouer la série « à revoir » ne redonne pas de coffre.
 await p.evaluate(()=>pathGo(5));for(let k=0;k<8;k++){const live=await p.evaluate(()=>!!M&&!!M.path);if(!live)break;await ans(true);await p.waitForSelector('#fb .fb');await next();await p.waitForTimeout(30);}
 const s6b=await p.evaluate(()=>({goals:S.goalsDone,chest:S.path.chest,st:S.path.steps.map(s=>s.status).join(',')}));
 await p.reload({waitUntil:'load'});
 const s6c=await p.evaluate(()=>({st:S.path.steps.map(s=>s.status).join(','),chest:S.path.chest,date:S.path.date}));
 T('6a. Parcours : 4 leçons validées ouvrent les exercices',pth.n===6&&afterLessons.st==='done,done,done,done,next,locked',JSON.stringify(afterLessons));
 T('6b. Parcours : série réussie « done », série ratée « à revoir » puis réévaluée au rejeu (8/8 → réussie), coffre ouvert une seule fois',s6.st==='done,done,done,done,done,review'&&s6.scores[0]===8&&s6.scores[1]===0&&s6.chest&&s6.goals===coins0.goals+1&&s6b.goals===s6.goals&&s6b.st==='done,done,done,done,done,done',JSON.stringify({coins0,s6,s6b}));
 T('6c. Parcours : reprise après rechargement (mêmes étapes, coffre conservé)',s6c.st===s6b.st&&s6c.chest&&s6c.date===pth.date,JSON.stringify(s6c));

 // 7. Exercices : bonne / mauvaise réponse, indice, suivant, défi éclair, quitter.
 await p.evaluate(()=>{home();startMission([reco().id]);});
 const g1=await p.evaluate(()=>({xp:M.xp,d:M.d,mult:Math.min(4,1+Math.floor(M.streak/3))}));await ans(true);await p.waitForSelector('#fb .fb');
 const r1=await p.evaluate(()=>({good:!!document.querySelector('#fb .fb.good'),xp:M.xp}));await next();
 await p.evaluate(()=>{const b=document.querySelector('[data-a="hint"]');if(b)b.click();});
 const g2=await p.evaluate(()=>({xp:M.xp,d:M.d,mult:Math.min(4,1+Math.floor(M.streak/3)),hint:!!document.querySelector('#fb .fb.tip'),flag:M.hint}));await ans(true);await p.waitForSelector('#fb .fb');
 const r2=await p.evaluate(()=>({xp:M.xp}));await next();
 const i3=await p.evaluate(()=>M.i);await ans(false);await p.waitForSelector('#fb .fb.bad');
 const r3=await p.evaluate(()=>({bad:!!document.querySelector('#fb .fb.bad'),correction:/Bonne réponse/.test(document.querySelector('#fb').innerText)||!!document.querySelector('.dict-fb'),next:!!document.querySelector('#fb [data-a="next"]'),locked:M.locked}));
 await p.click('#fb [data-a="next"]');const i4=await p.evaluate(()=>M.i);
 T('7a. Bonne réponse reconnue et récompensée ; l’indice divise le gain par deux',r1.good&&r1.xp-g1.xp===10*g1.d*g1.mult&&g2.hint&&g2.flag&&r2.xp-g2.xp===Math.round(10*g2.d*g2.mult*.5),JSON.stringify({g1,r1,g2,r2}));
 T('7b. Mauvaise réponse : correction affichée, question verrouillée, « Exercice suivant » fait avancer',r3.bad&&r3.correction&&r3.next&&r3.locked&&i4===i3+1,JSON.stringify({r3,i3,i4}));
 await p.click('[data-a="quit"]');
 const r4=await p.evaluate(()=>({M:!!M,cur:CUR}));
 T('7c. Quitter en cours de mission : retour à l’accueil, mission fermée',!r4.M&&r4.cur==='home',JSON.stringify(r4));
 await p.evaluate(()=>startFlash('all'));
 const f1=await p.evaluate(()=>({flash:M.flash,finot:!!document.querySelector('.qbtns [data-a="finotopen"]'),hint:!!document.querySelector('[data-a="hint"]')}));
 await ans(false);await p.waitForSelector('#fb .fb');
 const f2=await p.evaluate(()=>({transfer:!!document.querySelector('.mq-transfer'),why:!!document.querySelector('[data-a="finotwhy"]'),context:!!document.querySelector('.mq-application')}));
 await p.evaluate(()=>endFlash());
 T('7d. Défi éclair : ni indice, ni bouton Finot, ni transfert, ni « pourquoi », ni contexte',f1.flash&&!f1.finot&&!f1.hint&&!f2.transfer&&!f2.why&&!f2.context,JSON.stringify({f1,f2}));

 // 8. Finot : « Pourquoi ma réponse est fausse ? » après une erreur, isolé par profil.
 await p.evaluate(()=>{home();startMission([reco().id]);});const cid8=await p.evaluate(()=>M.cid);await ans(false);await p.waitForSelector('#fb .fb.bad');
 await p.evaluate(()=>{finotOpen();});await p.fill('#finotin','Pourquoi ma réponse est fausse ?');await p.press('#finotin','Enter');await p.waitForTimeout(150);
 const fA=await p.evaluate(id=>{const t=document.getElementById('finotchat').innerText;return {name:t.includes(CHMAP[id].name),noErr:/pas encore d’erreur récente/.test(t)};},cid8);
 await p.evaluate(b=>{finotClose();activateProfile(b);finotOpen();},B);await p.fill('#finotin','Pourquoi ma réponse est fausse ?');await p.press('#finotin','Enter');await p.waitForTimeout(150);
 const fB=await p.evaluate(()=>{const last=FCHAT.msgs.filter(m=>m.who==='finot').pop();return {noErr:/pas encore d’erreur récente/.test(last.html),name:S.name};});
 T('8. Finot explique l’erreur de l’enfant, et ne s’en souvient pas pour un autre enfant',fA.name&&!fA.noErr&&fB.noErr&&fB.name==='Bob',JSON.stringify({fA,fB}));
 await p.evaluate(a=>{finotClose();activateProfile(a);},A);

 // 9. Espace parents local : périodes après changement de classe (6e → 5e) par les réglages.
 await p.evaluate(()=>parentScreen('reglages'));await p.selectOption('#setgrade','5e');await p.click('[data-a="learnsave"]');await p.waitForTimeout(150);
 const g9=await p.evaluate(()=>S.grade);
 await p.evaluate(()=>parentScreen('suivi'));const kpi=[];const e9=errs.length;
 for(const per of ['7','30','all']){const sel=await p.$('select[data-pf="period"]');if(sel){await p.selectOption('select[data-pf="period"]',per);await p.waitForTimeout(80);}
  kpi.push(await p.evaluate(()=>({period:PF.period,kpi:[...document.querySelectorAll('.kpi span')].map(s=>s.textContent).find(t=>/Réussite/.test(t))||'',lpd:!!document.querySelector('.lpd')})));}
 for(const k of ['today','365']){await p.evaluate(k=>ACT.lpdperiod(k),k);await p.waitForTimeout(60);}
 const lpd=await p.evaluate(()=>!!document.querySelector('.lpd'));
 T('9. Espace parents après changement de classe : périodes 7 j / 30 j / tout et vue rapide (aujourd’hui, 1 an) sans erreur',g9==='5e'&&kpi.length===3&&kpi[0].period==='7'&&/période \(7 jours\)/.test(kpi[0].kpi)&&/période \(30 jours\)/.test(kpi[1].kpi)&&/sélection/.test(kpi[2].kpi)&&lpd&&errs.length===e9,JSON.stringify({g9,kpi,errs:errs.slice(e9)}));

 T('Aucune erreur JavaScript sur l’ensemble des scénarios',!errs.length,errs.slice(0,5).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
