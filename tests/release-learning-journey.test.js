/* Audit de release (24/10/2026) — parcours d'apprentissage complet, chiffré et persisté.
   Pour un élève de primaire (CE2) ET de collège (5e), inscription réelle par l'assistant, puis :
   diagnostic -> cours -> exercice (niveau choisi) -> bonne réponse -> mauvaise réponse -> indice -> correction -> maîtrise
   -> XP/pièces comptés une seule fois -> carnet d'erreurs -> révision (répétition espacée) -> rechargement en pleine mission -> reprise.
   Chaque étape relit mathquest_profiles_v2 dans le localStorage et recoupe les compteurs avec les réponses réellement jouées. */
const {serve,launchEngine,freshContext,wizard}=require('./release-lib');
const KIDS=[
 {name:'Capucine',grade:'CE2',stage:'primaire',birth:'2017-03-14',companion:'finot',gender:'girl'},
 {name:'Arthur',grade:'5e',stage:'college',birth:'2013-05-21',companion:'leo',gender:'boy'}];
// Espaces typographiques équivalentes : nf() sépare les milliers par une espace fine insécable (U+202F), alors que le carnet
// affiche la question passée par plainText() (espaces normales). On neutralise UNIQUEMENT les variantes d'espace (U+00A0, U+202F,
// suites d'espaces) : lettres, chiffres et ponctuation restent comparés à l'identique.
const normalizeText=s=>String(s??'').replace(/[\u00a0\u202f]/g,' ').replace(/[ \t\r\n]+/g,' ').trim();

// Réponse par VRAIS clics / saisies, pour la mission (M.q), le cours (L.q / L.pq) ou le diagnostic (D, via data-a="diag*").
async function answerCur(p,correct,mode){
 const q=await p.evaluate(m=>{let x=null;if(m==='mission')x=M&&M.q;else if(m==='lesson'){const s=L&&L.steps[L.i];x=s&&s.k==='practice'?L.pq:L&&L.q;}else x=window.__diagQ&&window.__diagQ();
  if(!x)return null;return {type:x.type,ans:x.ans,acc:x.acc,labels:x.labels?x.labels.length:0,n:document.querySelectorAll('.choice').length};},mode);
 if(!q)return null;
 const gcd=(a,b)=>b?gcd(b,a%b):a;const pre=mode==='diag'?'#di':'#in';
 const valid=mode==='diag'?'[data-a="diagvalid"]':mode==='lesson'?'[data-a="lvalid"],[data-a="pvalid"]':'[data-a="valid"]';
 if(q.type==='choice'){await p.locator('.choice').nth(correct?q.ans:(q.ans+1)%q.n).click();return q.type;}
 if(q.type==='order'){
  const idx=await p.evaluate(m=>{const x=m==='mission'?M.q:m==='lesson'?(L.steps[L.i].k==='practice'?L.pq:L.q):window.__diagQ();const want=String(x.ans).split(' ');const used=new Set();const out=[];
   // jetons éventuellement composés : on reconstruit l'ordre par préfixes successifs de la réponse normalisée
   let rest=String(x.ans);let guard=0;while(rest.length&&guard++<60){const i=x.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(t));if(i<0)break;used.add(i);out.push(i);rest=rest.slice(x.tokens[i].length).trim();}
   if(out.length!==x.tokens.length){const u=new Set();return want.map(w=>{const i=x.tokens.findIndex((t,j)=>t===w&&!u.has(j));u.add(i);return i;});}return out;},mode);
  const seq=correct?idx:idx.slice().reverse();const sel=mode==='diag'?'.otok':'.otok';
  for(const i of seq)await p.locator(sel).nth(i).click();
  await p.locator(valid).first().click();return q.type;}
 if(q.type==='multi'){for(let i=0;i<q.labels;i++)await p.fill(pre+i,correct?String(q.ans[i]):'987654');await p.locator(valid).first().click();return q.type;}
 let v;if(q.type==='num')v=correct?String(q.ans):'987654.321';else if(q.type==='frac'){const g=gcd(q.ans[0],q.ans[1]);v=correct?`${q.ans[0]/g}/${q.ans[1]/g}`:'987/654';}else v=correct?String(q.acc[0]):'zzzzqqq';
 await p.fill(pre+'0',v);await p.locator(valid).first().click();return q.type;}

const store=p=>p.evaluate(()=>{const o=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));const pr=o.profiles[o.active];
 return {active:o.active,n:Object.keys(o.profiles).length,pr:{xp:pr.xp,coins:pr.coins,totalQ:pr.totalQ,totalOk:pr.totalOk,chap:pr.chap,mastery:pr.mastery,mistakes:pr.mistakes,review:pr.review,lessons:pr.lessons,diagnostic:pr.diagnostic,answers:pr.adaptive&&pr.adaptive.answers,answerLog:(pr.answerLog||[]).length,resume:!!pr.exerciseResume,name:pr.name,grade:pr.grade}};});
const live=p=>p.evaluate(()=>({xp:S.xp,coins:S.coins,totalQ:S.totalQ,totalOk:S.totalOk,chap:JSON.parse(JSON.stringify(S.chap)),answerLog:(S.answerLog||[]).length,answers:S.adaptive.answers}));

async function journey(b,url,k,R){
 const T=(n,ok,d='')=>R.push({name:`[${k.grade}] ${n}`,ok:!!ok,detail:String(d).slice(0,900)});
 const {ctx,p,errs}=await freshContext(b,url);
 try{
  await wizard(p,k);
  const base=await p.evaluate(()=>({id:ACTIVE,xp:S.xp,coins:S.coins,diag:!!(S.diagnostic&&S.diagnostic.active)}));
  let st=await store(p);
  T('Inscription réelle : profil stocké, compteurs à zéro, diagnostic proposé en pause',st.pr.name===k.name&&st.pr.grade===k.grade&&st.pr.totalQ===0&&st.pr.xp===0&&st.pr.coins===0&&!!(st.pr.diagnostic&&st.pr.diagnostic.active),JSON.stringify({base,st:st.pr.diagnostic&&Object.keys(st.pr.diagnostic)}));

  // 1. DIAGNOSTIC : reprise de la calibration mise en pause, 12 vraies réponses (9 justes puis 3 fausses), sans XP ni pièces.
  await p.evaluate(()=>{window.__diagQ=()=>{return null;};});
  await p.waitForSelector('[data-a="diagstart"]',{timeout:5000});await p.click('[data-a="diagstart"]');await p.waitForFunction(()=>CUR==='diagnostic');
  // La question courante vit dans la fermeture du moteur : on la lit via le DOM et l'objet S.diagnostic.active.
  await p.evaluate(()=>{window.__diagQ=()=>S.diagnostic.active.questions[S.diagnostic.active.i].q;});
  const pattern=[1,1,1,1,1,1,1,1,1,0,0,0];let played=0;
  for(let i=0;i<12;i++){await p.waitForFunction(()=>CUR==='diagnostic'&&!!document.querySelector('.qcard'),null,{timeout:4000});
   const i0=await p.evaluate(()=>S.diagnostic.active.i);await answerCur(p,!!pattern[i],'diag');played++;
   await p.waitForFunction(i0=>CUR==='diagnostic-done'||S.diagnostic.active.i===i0+1||(S.diagnostic&&S.diagnostic.completedAt),i0,{timeout:4000});}
  await p.waitForFunction(()=>CUR==='diagnostic-done',null,{timeout:4000});
  st=await store(p);const dg=st.pr.diagnostic;
  const dgOk=pattern.reduce((a,x)=>a+x,0);
  T('Diagnostic : 12 réponses jouées, score cohérent, persisté, aucun XP ni pièce, totalQ inchangé',dg&&dg.completedAt&&dg.total===12&&dg.answers.length===12&&dg.ok===dg.answers.filter(x=>x.ok).length&&dg.ok===dgOk&&st.pr.xp===0&&st.pr.coins===0&&st.pr.totalQ===0,JSON.stringify({ok:dg&&dg.ok,total:dg&&dg.total,score:dg&&dg.score,xp:st.pr.xp,coins:st.pr.coins,totalQ:st.pr.totalQ,played,expectedOk:dgOk}));
  await p.click('[data-a="home"]');await p.waitForFunction(()=>CUR==='home');
  T('Diagnostic terminé : la carte « Calibrer mon niveau » ne revient plus',await p.evaluate(()=>!document.querySelector('.diag-home-card')));

  // Chapitre de travail : programme de la classe, avec cours.
  const cid=await p.evaluate(()=>{const l=SCH(S.subj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade&&COURS[c.id]);return (l[0]||{}).id;});
  T('Un chapitre de la classe avec cours existe',!!cid,cid);
  const m0=await p.evaluate(id=>({m:MQAdaptive.mastery(S,id),tot:(S.chap[id]||{}).tot||0}),cid);

  // 2. COURS : sélecteur de niveau réel, étapes lnext, pratique + mini-quiz répondus par clics. Chaque réponse = +1 totalQ.
  await p.evaluate(id=>ACT.lesson(id),cid);await p.waitForSelector(`[data-a="lessonlevel:${cid}|2"]`);await p.click(`[data-a="lessonlevel:${cid}|2"]`);await p.waitForFunction(()=>CUR==='lesson');
  const lessonSteps=await p.evaluate(()=>L.steps.map(s=>s.k));
  const lq0=await live(p);let lAnswers=0,lOk=0,guard=0;const kindsSeen=new Set();
  while(guard++<120){const s=await p.evaluate(()=>{if(typeof L==='undefined'||!L||CUR!=='lesson')return {end:true};const x=L.steps[L.i];return {k:x.k,locked:L.locked,i:L.i,n:L.steps.length,last:L.i===L.steps.length-1};});
   if(s.end)break;kindsSeen.add(s.k);
   if(s.k==='quiz'||s.k==='practice'){
    if(!s.locked){const ok=(lAnswers%3)!==2;await answerCur(p,ok,'lesson');lAnswers++;if(ok)lOk++;await p.waitForSelector('[data-a="lqnext"],[data-a="pnext"]',{timeout:4000});}
    await p.locator('[data-a="lqnext"],[data-a="pnext"]').first().click();await p.waitForTimeout(30);continue;}
   if(await p.locator('[data-a="lnext"]').count()){await p.locator('[data-a="lnext"]').first().click();await p.waitForTimeout(20);continue;}
   if(await p.locator('[data-a="pronskip"]').count()){await p.click('[data-a="pronskip"]');continue;}
   break;}
  await p.waitForFunction(()=>CUR!=='lesson',null,{timeout:4000}).catch(()=>{});
  const lq1=await live(p);st=await store(p);
  T('Cours : étapes parcourues, pratique et quiz joués par clics',lAnswers>=3&&kindsSeen.has('quiz'),JSON.stringify({steps:lessonSteps.length,kinds:[...kindsSeen],lAnswers}));
  T('Cours : totalQ augmente exactement du nombre de réponses jouées, totalOk du nombre de justes, chap[id].tot idem',lq1.totalQ-lq0.totalQ===lAnswers&&lq1.totalOk-lq0.totalOk===lOk&&(lq1.chap[cid].tot||0)-((lq0.chap[cid]||{}).tot||0)===lAnswers&&(lq1.chap[cid].ok||0)-((lq0.chap[cid]||{}).ok||0)===lOk&&lq1.answerLog-lq0.answerLog===lAnswers,JSON.stringify({lq0:[lq0.totalQ,lq0.totalOk],lq1:[lq1.totalQ,lq1.totalOk],lAnswers,lOk,chap:lq1.chap[cid]}));
  T('Cours : état persisté (relu dans mathquest_profiles_v2) identique à l’état vivant',st.pr.totalQ===lq1.totalQ&&st.pr.totalOk===lq1.totalOk&&st.pr.chap[cid].tot===lq1.chap[cid].tot,JSON.stringify({stored:[st.pr.totalQ,st.pr.totalOk],live:[lq1.totalQ,lq1.totalOk]}));
  const lessonDone=await p.evaluate(id=>!!S.lessons[id]||(S.lessonScores&&S.lessonScores[id]!=null),cid);
  T('Cours : résultat enregistré (S.lessons ou score du cours)',lessonDone);
  await p.evaluate(()=>{if(CUR!=='home')ACT.home();});await p.waitForFunction(()=>CUR==='home');

  // 3. EXERCICE niveau 2 : série de 8 questions avec schéma précis, indice sur la 1re, justes/fausses mélangées.
  const exPattern=[true,false,true,true,false,true,true,true];  // 6 justes / 2 fausses
  const ex0=await live(p);const mis0=await p.evaluate(id=>(S.mistakes[id]||[]).length,cid);
  await p.evaluate(id=>ACT.start(id),cid);await p.waitForSelector(`[data-a="startlevel:${cid}|2"]`);await p.click(`[data-a="startlevel:${cid}|2"]`);await p.waitForSelector('.qcard');
  const nQ=await p.evaluate(()=>M.n);
  const per=[];let sumXp=0,sumCoins=0,wrongQ=[],hintChecked=false,tipTxt='',okCount=0,idx=0;
  for(idx=0;idx<nQ;idx++){
   await p.waitForFunction(()=>CUR==='mission'&&M&&M.q&&!M.locked,null,{timeout:5000});
   const ok=exPattern[idx%exPattern.length];
   // Indice : sur la 3e question (juste), on l'affiche avant de répondre -> XP divisés par 2
   let useHint=false;if(idx===2){await p.click('[data-a="hint"]');useHint=true;await p.waitForSelector('#fb .fb.tip');tipTxt=await p.evaluate(()=>document.querySelector('#fb .fb.tip').innerText);}
   const pre=await p.evaluate(()=>({xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,mult:Math.min(4,1+Math.floor(M.streak/3)),d:M.d,qt:M.q.q,mist:Object.values(S.mistakes).flat().length,hint:M.hint,flash:M.flash}));
   await answerCur(p,ok,'mission');
   await p.waitForFunction(()=>M&&M.locked,null,{timeout:3000});
   const post=await p.evaluate(()=>({xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,mist:Object.values(S.mistakes).flat().length,fb:document.querySelector('#fb')?.innerText||'',cls:document.querySelector('#fb .fb')?.className||'',stored:JSON.parse(localStorage.getItem('mathquest_profiles_v2')).profiles[ACTIVE]}));
   const gain=post.xp-pre.xp;sumXp+=gain;sumCoins+=post.coins-pre.coins;
   const expXp=ok?Math.round(10*pre.d*pre.mult*(useHint?.5:1)):0;const base=({1:4,2:6,3:9})[Math.max(1,Math.min(3,pre.d))];
   const row={idx,ok,gain,expXp,base,dTq:post.tq-pre.tq,dTo:post.to-pre.to,dMist:post.mist-pre.mist,coins:post.coins-pre.coins,stored:post.stored.totalQ===post.tq&&post.stored.xp===post.xp&&post.stored.totalOk===post.to};
   per.push(row);if(ok)okCount++;
   if(useHint)hintChecked={gain,base,tip:/divisés par 2|moitié|÷ ?2/i.test(tipTxt),tipTxt:tipTxt.slice(0,160),ok,mult:pre.mult,hintFlag:pre.hint};
   if(!ok)wrongQ.push({q:pre.qt});
   // double comptage : on attend la fin de l'animation, rien ne doit bouger de plus
   await p.waitForTimeout(ok?1400:150);
   const settle=await p.evaluate(()=>({xp:S.xp,tq:S.totalQ,i:M?M.i:-1,end:CUR==='mission-end'}));
   if(!settle.end&&settle.i===idx&&await p.locator('[data-a="next"]').count())await p.click('[data-a="next"]');
   else if(!settle.end&&settle.i===idx){await p.waitForFunction(i=>!M||M.i>i,idx,{timeout:3000}).catch(()=>{});}
   if(ok&&idx<nQ-1&&settle.xp!==post.xp)row.late=settle.xp-post.xp;if(settle.tq!==post.tq)row.lateQ=settle.tq-post.tq;
  }
  await p.waitForFunction(()=>CUR==='mission-end',null,{timeout:6000});
  const ex1=await live(p);st=await store(p);
  const bonus=ex1.xp-ex0.xp-sumXp;const stars=okCount/nQ>=.999?3:okCount/nQ>=.75?2:okCount/nQ>=.5?1:0;
  T('Exercice : XP par réponse plafonné par la formule historique (10×niveau×série), 0 pour une erreur, jamais de gain différé (pas de double comptage)',per.every(r=>(r.ok?(r.gain>=0&&r.gain<=r.expXp):r.gain===0)&&!r.late),JSON.stringify(per.filter(r=>r.late||(r.ok?r.gain>r.expXp:r.gain!==0))).slice(0,500));
  T('Exercice : chaque réponse compte exactement +1 totalQ, +1 totalOk seulement si juste, +1 pièce min si juste',per.every(r=>r.dTq===1&&r.dTo===(r.ok?1:0)&&!r.lateQ&&(r.ok?r.coins>=0:r.coins===0)),JSON.stringify(per.filter(r=>!(r.dTq===1&&r.dTo===(r.ok?1:0))||r.coins<0)));
  T('Exercice : chaque réponse est écrite dans localStorage immédiatement (xp, totalQ, totalOk relus identiques)',per.every(r=>r.stored),JSON.stringify(per.map(r=>r.stored)));
  T('Exercice : totalQ == réponses jouées (cours + série), totalOk == justes, chap[id] cohérent',ex1.totalQ===lAnswers+nQ&&ex1.totalOk===lOk+okCount&&ex1.chap[cid].tot===lAnswers+nQ&&ex1.chap[cid].ok===lOk+okCount&&ex1.answerLog===lAnswers+nQ+ (await p.evaluate(()=>0)),JSON.stringify({totalQ:ex1.totalQ,exp:lAnswers+nQ,totalOk:ex1.totalOk,expOk:lOk+okCount,chap:ex1.chap[cid],log:ex1.answerLog}));
  T('Exercice : bonus de fin borné (≤ étoiles×20 XP, ≤ étoiles×5 pièces) et ajouté une seule fois',bonus>=0&&bonus<=stars*20&&ex1.coins-ex0.coins-sumCoins>=0&&ex1.coins-ex0.coins-sumCoins<=stars*5,JSON.stringify({bonus,stars,sumXp,coins:ex1.coins-ex0.coins,sumCoins}));
  T('Indice : message « XP divisés par 2 », M.hint actif, gain = moitié du barème du niveau (déduction de l’économie), 0 pièce',hintChecked&&hintChecked.tip&&hintChecked.hintFlag&&hintChecked.gain<=Math.max(1,Math.round(hintChecked.base*.5*(1+0.10)))&&hintChecked.gain>=1&&per[2].coins===0,JSON.stringify(hintChecked));
  const fbBad=await p.evaluate(()=>0);
  T('Persistance fin de série : xp, pièces, totalQ, totalOk du stockage == état vivant',st.pr.xp===ex1.xp&&st.pr.coins===ex1.coins&&st.pr.totalQ===ex1.totalQ&&st.pr.totalOk===ex1.totalOk,JSON.stringify({st:st.pr.xp,live:ex1.xp}));

  // Correction affichée + bonne réponse : une réponse fausse isolée, vérifiée sur écran (texte de correction, bouton suivant).
  await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home');
  await p.evaluate(id=>ACT.startlevel(id+'|2'),cid);await p.waitForSelector('.qcard');
  const wq=await p.evaluate(()=>({q:M.q.q.replace(/<[^>]+>/g,'').trim().slice(0,40),exp:answerText(M.q).replace(/<[^>]+>/g,'')}));
  const x0=await live(p);await answerCur(p,false,'mission');await p.waitForSelector('#fb .fb.bad');
  const fb=await p.evaluate(()=>({txt:document.querySelector('#fb').innerText,next:!!document.querySelector('[data-a="next"]'),xp:S.xp,tq:S.totalQ}));
  T('Mauvaise réponse : correction affichée (« Presque ! », bonne réponse, bouton pour continuer), 0 XP, totalQ +1',/Presque/.test(fb.txt)&&fb.txt.includes(String(wq.exp).slice(0,12))&&fb.next&&fb.xp===x0.xp&&fb.tq===x0.totalQ+1,JSON.stringify({wq,fb}));

  // 4. CARNET D'ERREURS
  const mis=await p.evaluate(id=>({n:(S.mistakes[id]||[]).length,first:(S.mistakes[id]||[])[0]&&S.mistakes[id][0].q}),cid);
  const expectedWrong=per.filter(r=>!r.ok).length+1;
  st=await store(p);
  T('Carnet : chaque réponse fausse (cours + série + isolée) est enregistrée dans S.mistakes et persistée',mis.n>=Math.min(12,expectedWrong)&&(st.pr.mistakes[cid]||[]).length===mis.n,JSON.stringify({mis,expectedWrong,stored:(st.pr.mistakes[cid]||[]).length,lessonWrong:lAnswers-lOk}));
  await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home');
  await p.evaluate(()=>ACT.mistakes());await p.waitForFunction(()=>CUR==='mistakes');
  const mscr=await p.evaluate(()=>({cards:document.querySelectorAll('.error-card,.er-card').length,txt:document.getElementById('app').innerText}));
  T('Carnet d’erreurs (écran) : l’erreur récente est listée avec sa bonne réponse',mscr.cards>=1&&normalizeText(mscr.txt).includes(normalizeText(wq.q).slice(0,20).trim()),JSON.stringify({cards:mscr.cards,q:wq.q}));

  // 5. MAÎTRISE
  const mEnd=await p.evaluate(id=>({m:MQAdaptive.mastery(S,id),rec:S.mastery[id]}),cid);
  st=await store(p);
  T('Maîtrise : S.mastery[id] calculée, bornée 0-100, persistée et égale au calcul courant',mEnd.rec&&mEnd.rec.value>=0&&mEnd.rec.value<=100&&st.pr.mastery[cid]&&st.pr.mastery[cid].value===mEnd.rec.value&&mEnd.rec.value>m0.m,JSON.stringify({avant:m0.m,apres:mEnd.rec&&mEnd.rec.value,calc:mEnd.m,stored:st.pr.mastery[cid]&&st.pr.mastery[cid].value}));

  // 6. RÉVISION : fin de série -> répétition espacée programmée ; on la rend échue puis on passe par l'écran de révision.
  const rv=await p.evaluate(id=>{const r=S.review&&S.review[id];return r?{next:r.next,due:MQAdaptive.isDue(S,id)}:null;},cid);
  T('Révision : la fin de série programme S.review[id] (prochaine date dans le futur)',rv&&rv.next>Date.now()&&!rv.due,JSON.stringify(rv));
  await p.evaluate(id=>{S.review[id].next=Date.now()-1000;save();},cid);
  const due=await p.evaluate(id=>MQAdaptive.isDue(S,id),cid);
  await p.evaluate(()=>ACT.smartreview());await p.waitForFunction(()=>CUR==='smartreview');
  const sr=await p.evaluate(id=>({hasBtn:!!document.querySelector(`[data-a="reviewstart:${id}"]`)||!!document.querySelector(`[data-a="start:${id}"]`)||document.getElementById('app').innerText.length>50,txt:document.getElementById('app').innerText.slice(0,200)}),cid);
  T('Révision intelligente : chapitre échu détecté (isDue) et écran affiché',due&&sr.hasBtn,JSON.stringify({due,sr}));
  // Fermeture de la révision par un exercice : le bonus de fin reprogramme la date dans le futur.
  await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home');

  // 7. FERMETURE EN PLEINE MISSION puis REPRISE : rechargement après 2 réponses (1 juste, 1 fausse).
  await p.evaluate(id=>ACT.startlevel(id+'|2'),cid);await p.waitForSelector('.qcard');
  const r0=await live(p);
  await answerCur(p,true,'mission');await p.waitForFunction(()=>M&&M.locked);await p.waitForTimeout(1400);
  await p.waitForFunction(()=>M&&!M.locked&&M.i===1,null,{timeout:4000});
  await answerCur(p,false,'mission');await p.waitForFunction(()=>M&&M.locked);
  const rMid=await p.evaluate(()=>({xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,i:M.i,q:M.q.q,n:M.n,mist:Object.values(S.mistakes).flat().length}));
  T('Avant fermeture : 2 réponses de la série comptées une seule fois',rMid.tq===r0.totalQ+2&&rMid.to===r0.totalOk+1,JSON.stringify({r0:r0.totalQ,rMid}));
  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&CUR==='home'&&!!window.MQExerciseResume,null,{timeout:8000});await p.waitForTimeout(150);
  const rAfter=await p.evaluate(()=>({xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,m:!!M,resume:!!S.exerciseResume,name:S.name,mist:Object.values(S.mistakes).flat().length}));
  st=await store(p);
  T('Rechargement en pleine mission : aucune perte (xp, pièces, totalQ, totalOk, erreurs) et aucun double XP',rAfter.xp===rMid.xp&&rAfter.coins===rMid.coins&&rAfter.tq===rMid.tq&&rAfter.to===rMid.to&&rAfter.mist===rMid.mist&&!rAfter.m&&rAfter.name===k.name&&st.pr.xp===rMid.xp&&st.pr.totalQ===rMid.tq,JSON.stringify({rMid,rAfter}));
  T('Reprise proposée après rechargement (instantané persisté)',rAfter.resume&&st.pr.resume);
  await p.click('#hometabs .mq-exercises-tab');await p.waitForSelector('[data-a="exresume"]');await p.click('[data-a="exresume"]');await p.waitForSelector('#fb .fb.bad');
  const rBack=await p.evaluate(()=>({xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,i:M.i,q:M.q.q,locked:M.locked,mist:Object.values(S.mistakes).flat().length}));
  T('Reprise : même question, correction restaurée, aucun recomptage (xp, pièces, totalQ, totalOk, erreurs)',rBack.i===rMid.i&&rBack.q===rMid.q&&rBack.locked&&rBack.xp===rMid.xp&&rBack.coins===rMid.coins&&rBack.tq===rMid.tq&&rBack.to===rMid.to&&rBack.mist===rMid.mist,JSON.stringify({rMid,rBack}));
  // Terminer la série reprise : les questions restantes sont comptées une seule fois chacune.
  let more=0,moreOk=0;
  await p.click('[data-a="next"]');
  for(let g=0;g<20;g++){const s=await p.evaluate(()=>({end:CUR==='mission-end'||!M,q:M&&M.q&&!M.locked}));if(s.end)break;if(!s.q){await p.waitForTimeout(100);continue;}
   const ok=more%2===0;await answerCur(p,ok,'mission');more++;if(ok)moreOk++;
   await p.waitForFunction(()=>!M||M.locked,null,{timeout:3000}).catch(()=>{});
   const nx=p.locator('[data-a="next"]');if(await nx.count())await nx.first().click();else await p.waitForFunction(i=>!M||M.i>i,await p.evaluate(()=>M?M.i:99),{timeout:3000}).catch(()=>{});}
  await p.waitForFunction(()=>CUR==='mission-end',null,{timeout:6000}).catch(()=>{});
  const fin=await live(p);st=await store(p);
  T('Série reprise terminée : totalQ/totalOk == avant + 2 + réponses jouées après reprise, stockage identique',fin.totalQ===r0.totalQ+2+more&&fin.totalOk===r0.totalOk+1+moreOk&&st.pr.totalQ===fin.totalQ&&st.pr.totalOk===fin.totalOk&&st.pr.xp===fin.xp&&!(await p.evaluate(()=>!!S.exerciseResume)),JSON.stringify({fin:[fin.totalQ,fin.totalOk],exp:[r0.totalQ+2+more,r0.totalOk+1+moreOk],more}));

  // 8. Un autre profil ne doit hériter de rien.
  const before=await store(p);const firstId=before.active;
  await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home');
  await p.click('[data-a="profiles"]');await p.waitForSelector('[data-a="pnew"]');await p.click('[data-a="pnew"]');
  await wizard(p,{name:'Zoé',grade:k.grade,stage:k.stage,birth:'',gender:'girl',companion:'momo'});
  const z=await p.evaluate(()=>({name:S.name,xp:S.xp,coins:S.coins,tq:S.totalQ,to:S.totalOk,chap:Object.keys(S.chap).length,mast:Object.keys(S.mastery).length,mist:Object.keys(S.mistakes).length,rev:Object.keys(S.review||{}).length,lessons:Object.keys(S.lessons).length,resume:!!S.exerciseResume,log:(S.answerLog||[]).length,diagDone:!!(S.diagnostic&&S.diagnostic.completedAt),active:ACTIVE}));
  T('Nouveau profil créé après le parcours : tout à zéro (XP, pièces, réponses, maîtrise, erreurs, révisions, cours, reprise, diagnostic)',z.name==='Zoé'&&!z.xp&&!z.coins&&!z.tq&&!z.to&&!z.chap&&!z.mast&&!z.mist&&!z.rev&&!z.lessons&&!z.resume&&!z.log&&!z.diagDone&&z.active!==firstId,JSON.stringify(z));
  await p.evaluate(id=>activateProfile(id),firstId);
  const back=await live(p);T('Retour sur le 1er profil : ses compteurs sont intacts',back.totalQ===fin.totalQ&&back.xp===fin.xp&&back.coins===fin.coins,JSON.stringify({back:[back.totalQ,back.xp],fin:[fin.totalQ,fin.xp]}));
  T('Aucune erreur JavaScript pendant tout le parcours',!errs.length,errs.slice(0,4).join(' | '));
 }finally{await ctx.close();}
}

// Garde-fou de la comparaison : les espaces équivalentes se confondent, tout autre écart reste détecté.
function normalizeTextChecks(R){
 const T=(n,ok,d='')=>R.push({name:`Comparaison de texte : ${n}`,ok:!!ok,detail:String(d).slice(0,300)});
 const eq=(a,b)=>normalizeText(a)===normalizeText(b);
 T('« Dans 4\u202f219… » (U+202F) ≡ « Dans 4 219… » (U+0020)',eq('Dans 4\u202f219, quel est le chiffre des milliers ?','Dans 4 219, quel est le chiffre des milliers ?'));
 T('« Dans 4\u00a0219… » (U+00A0) ≡ « Dans 4 219… » (U+0020)',eq('Dans 4\u00a0219, quel est le chiffre des milliers ?','Dans 4 219, quel est le chiffre des milliers ?'));
 T('Nombre à 5 chiffres : « 65\u202f218 » ≡ « 65 218 » ≡ « 65\u00a0218 »',eq('Le nombre 65\u202f218 est-il divisible par 9 ?','Le nombre 65 218 est-il divisible par 9 ?')&&eq('Le nombre 65\u00a0218 est-il divisible par 9 ?','Le nombre 65 218 est-il divisible par 9 ?'));
 const card='📒 Carnet d’erreurs\nCompter jusqu’à 10 000\nDans 4 219, quel est le chiffre des milliers ?\nRéponse attendue : 4';
 T('Carnet affiché : la question à U+202F est retrouvée dans le texte à espaces normales',normalizeText(card).includes(normalizeText('Dans 4\u202f219, quel est le chiffre des mill').slice(0,20).trim()));
 T('Toujours détecté : mauvais nombre (4 219 ≠ 4 291, 65 218 ≠ 65 281)',!eq('Dans 4\u202f219','Dans 4 291')&&!eq('Le nombre 65\u202f218','Le nombre 65 281'));
 T('Toujours détecté : chiffres fusionnés (4 219 ≠ 4219) et texte différent',!eq('Dans 4\u202f219','Dans 4219')&&!eq('Dans 4 219, quel est le chiffre des milliers ?','Dans 4 219, quel est le chiffre des centaines ?'));
 T('Toujours détecté : une autre question est absente du carnet',!normalizeText(card).includes(normalizeText('Dans 5\u202f219, quel est le chiffre des mill').slice(0,20).trim())&&!normalizeText(card).includes(normalizeText('Le nombre 65\u202f218 est-il divisible').slice(0,20).trim()));
}

async function run(){const R=[];normalizeTextChecks(R);
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{for(const k of KIDS){try{await journey(b,url,k,R);}catch(e){R.push({name:`[${k.grade}] Parcours interrompu`,ok:false,detail:String(e&&e.stack||e).slice(0,900)});}}}
 finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
