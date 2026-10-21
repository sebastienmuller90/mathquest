/* Évaluations nationales — 8 niveaux, diagnostic isolé, historique, profils et mobile. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1300)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const answer=correct=>p.evaluate(correct=>{const A=MQNationalAssessment.active;if(!A)return false;const q=A.items[A.i].q;
   if(q.type==='choice'){let i=q.ans;if(!correct)i=q.choices.findIndex((_,k)=>k!==q.ans);ACT.nationalchoice(i);return true;}
   if(q.type==='order'){const solve=(rest,avail,path=[])=>{rest=String(rest).trim();if(!rest)return avail.length?null:path;for(const i of avail){const t=String(q.tokens[i]);if(rest===t||rest.startsWith(t+' ')){const r=solve(rest.slice(t.length).trim(),avail.filter(x=>x!==i),path.concat(i));if(r)return r;}}return null;};let idx=solve(q.ans,q.tokens.map((_,i)=>i))||q.tokens.map((_,i)=>i);if(!correct)idx=idx.slice().reverse();idx.forEach(i=>ACT.nationaltoken(i));ACT.nationalvalid();return true;}
   if(q.type==='multi'){q.labels.forEach((_,i)=>document.querySelector('#na-in'+i).value=correct?String(q.ans[i]):'987654');ACT.nationalvalid();return true;}
   const el=document.querySelector('#na-in0');if(!el)return false;if(q.type==='num')el.value=correct?String(q.ans):'987654';else if(q.type==='frac')el.value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';else el.value=correct?String(q.acc?.[0]??''):'zzzzqqq';ACT.nationalvalid();return true;
 },correct);
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQNationalAssessment,{timeout:5000});

  const registry=await p.evaluate(()=>MQNationalAssessment.levels.map(level=>{const items=MQNationalAssessment.buildQuestions(level),src=MQNationalAssessment.sourceGrades[level];return {level,src,n:items.length,fr:items.filter(x=>x.subject==='francais').length,ma:items.filter(x=>x.subject==='maths').length,skills:[...new Set(items.map(x=>x.skillId))],grades:[...new Set(items.map(x=>WMAP[x.cid]?.lvl))]};}));
  const expected={CP:'CP',CE1:'CP',CE2:'CE1',CM1:'CE2',CM2:'CM1','6e':'CM2','5e':'6e','4e':'5e'};
  T('Registre 2026-2027 : CP, CE1, CE2, CM1, CM2, 6e, 5e et 4e disposent de 16 questions françaises/mathématiques',registry.length===8&&registry.every(x=>x.n===16&&x.fr>=6&&x.ma>=6&&x.skills.length>=4),JSON.stringify(registry));
  T('Début d’année : chaque niveau travaille les acquis de la classe précédente (CP = fondamentaux CP)',registry.every(x=>x.grades.length===1&&x.grades[0]===expected[x.level]),JSON.stringify(registry));

  await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForSelector('.mq-na-levels');const landing=await p.evaluate(()=>({levels:document.querySelectorAll('.mq-na-level').length,notice:document.querySelector('.mq-na-notice')?.innerText||'',text:document.querySelector('.mq-na')?.innerText||'',overflow:document.documentElement.scrollWidth-innerWidth}));
  T('Écran : 8 niveaux, diagnostic non officiel et absence de promesse de récompense',landing.levels===8&&/non officiel/i.test(landing.notice)&&/aucun XP, pièce, étoile ou niveau de maîtrise/i.test(landing.notice)&&landing.overflow<=1,JSON.stringify(landing));

  const before=await p.evaluate(()=>JSON.stringify({xp:S.xp,coins:S.coins,totalOk:S.totalOk,totalQ:S.totalQ,time:S.time,chap:S.chap,mastery:S.mastery,review:S.review,mistakes:S.mistakes,streak:S.streak,daily:S.daily,merit:S.merit,badges:S.badges,lessons:S.lessons,lessonScores:S.lessonScores,adaptive:S.adaptive}));
  await p.evaluate(()=>MQNationalAssessment.start('CE2'));await p.waitForSelector('.mq-na-qwrap');
  const started=await p.evaluate(()=>({active:!!MQNationalAssessment.active,n:MQNationalAssessment.active?.items.length,i:MQNationalAssessment.active?.i,M:!!M,classOn:document.documentElement.classList.contains('mq-national-active'),finot:document.querySelector('.finot-fab')?getComputedStyle(document.querySelector('.finot-fab')).display:null}));
  T('Séance autonome : 16 questions, aucune mission M créée, Finot masqué',started.active&&started.n===16&&started.i===0&&!started.M&&started.classOn&&(!started.finot||started.finot==='none'),JSON.stringify(started));

  // Double validation volontaire : une question ne doit jamais compter deux fois.
  const double=await p.evaluate(()=>{const A=MQNationalAssessment.active,q=A.items[A.i].q;if(q.type!=='choice')return {skipped:true,type:q.type};const i=q.ans,n=A.answers.length;ACT.nationalchoice(i);ACT.nationalchoice(i);return {before:n,after:MQNationalAssessment.active?.answers.length??-1,index:MQNationalAssessment.active?.i??-1};});
  T('Anti double-validation : deux appels immédiats ne peuvent enregistrer qu’une réponse',double.skipped||double.after===double.before+1,JSON.stringify(double));

  // Termine la séance avec un mélange déterministe de bonnes/mauvaises réponses.
  let guard=0;while(await p.evaluate(()=>!!MQNationalAssessment.active)&&guard++<24){const i=await p.evaluate(()=>MQNationalAssessment.active?.i||0);await answer(i%4!==3);await p.waitForTimeout(8);}await p.waitForTimeout(80);
  const rep=await p.evaluate(()=>({active:!!MQNationalAssessment.active,hist:S.nationalAssessments||[],report:document.querySelector('.mq-na-report')?.innerText||'',classOn:document.documentElement.classList.contains('mq-national-active'),M:!!M}));
  const after=await p.evaluate(()=>JSON.stringify({xp:S.xp,coins:S.coins,totalOk:S.totalOk,totalQ:S.totalQ,time:S.time,chap:S.chap,mastery:S.mastery,review:S.review,mistakes:S.mistakes,streak:S.streak,daily:S.daily,merit:S.merit,badges:S.badges,lessons:S.lessons,lessonScores:S.lessonScores,adaptive:S.adaptive}));
  T('Fin de séance : bilan stocké, 16 réponses et résultats par compétence',!rep.active&&!rep.classOn&&!rep.M&&rep.hist.length===1&&rep.hist[0].questions===16&&rep.hist[0].domains.length>=4&&/Résultats par compétence/.test(rep.report),JSON.stringify(rep.hist[0]||{}));
  T('Isolation pédagogique : XP, pièces, statistiques, maîtrise, erreurs, séries et cours restent strictement inchangés',before===after,`before=${before.slice(0,500)} after=${after.slice(0,500)}`);
  T('Bilan honnête : exactement 2 conseils et la fluence est explicitement non notée',rep.hist[0].advice.length===2&&/lecture à voix haute.*n’est pas notée/i.test(rep.report),rep.report.slice(0,900));

  const oldId=rep.hist[0].id;await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForSelector('.mq-na-history');const histUi=await p.evaluate(id=>({rows:document.querySelectorAll('.mq-na-report-row').length,button:!!document.querySelector(`[data-a="nationalreport:${encodeURIComponent(id)}"]`)}),oldId);
  T('Historique : le bilan est rouvrable depuis le profil',histUi.rows===1&&histUi.button,JSON.stringify(histUi));

  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const iso=await p.evaluate(()=>({name:S.name,n:(S.nationalAssessments||[]).length}));
  T('Multi-profils : les bilans restent propres à chaque enfant',iso.name==='Noé'&&iso.n===0,JSON.stringify(iso));

  await p.evaluate(()=>{HOMETAB='progres';home();});await p.waitForTimeout(80);const nav=await p.evaluate(()=>({button:!!document.querySelector('[data-a="nationalscreen"]'),tabs:document.querySelectorAll('#hometabs .htab').length,text:document.querySelector('[data-a="nationalscreen"]')?.innerText||''}));
  T('Navigation : accès depuis Progrès, 8 niveaux indiqués, sans nouvel onglet principal',nav.button&&nav.tabs===4&&/CP.*CM2/i.test(nav.text)&&/6e.*4e/i.test(nav.text),JSON.stringify(nav));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-na')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : écran sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant la simulation nationale',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
