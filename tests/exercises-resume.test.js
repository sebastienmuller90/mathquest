/* Onglet Exercices + reprise exacte — vrais parcours navigateur.
   Vérifie : 5e onglet, reprise avant/après réponse, zéro double comptage, abandon, historique 30, profils et 320 px. */
const {serve,launch}=require('./lib');
const answerJS=`(correct)=>{const q=M.q,sel=s=>document.querySelector(s);if(q.type==='choice'){const i=correct?q.ans:(q.ans+1)%q.choices.length;document.querySelectorAll('.choice')[i].click();return;}if(q.type==='order'){const idx=[];let rest=normLang(q.ans,q.lang);const used=new Set();let guard=0;while(rest.length&&guard++<50){const i=q.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(normLang(t,q.lang)));if(i<0)break;used.add(i);idx.push(i);rest=rest.slice(normLang(q.tokens[i],q.lang).length).trim();}if(!correct)idx.reverse();idx.forEach(i=>document.querySelector('[data-a="otok:'+i+'"]').click());}else if(q.type==='multi')q.labels.forEach((_,i)=>sel('#in'+i).value=correct?String(q.ans[i]):'987654');else if(q.type==='num')sel('#in0').value=correct?String(q.ans):'987654';else if(q.type==='frac')sel('#in0').value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';else sel('#in0').value=correct?q.acc[0]:'zzzzqqq';const v=sel('[data-a="valid"]');if(v)v.click();}`;
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 const ans=c=>p.evaluate(`(${answerJS})(${c})`);
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQExerciseResume,{timeout:5000});await p.waitForTimeout(60);

  const nav=await p.evaluate(()=>({n:document.querySelectorAll('#hometabs .htab').length,ex:!!document.querySelector('#hometabs .mq-exercises-tab'),labels:[...document.querySelectorAll('#hometabs .htl')].map(x=>x.textContent)}));
  T('Barre du bas : 5 onglets dont « Exercices »',nav.n===5&&nav.ex&&nav.labels.includes('Exercices'),JSON.stringify(nav));

  const cid=await p.evaluate(()=>reco().id);await p.evaluate(id=>startMission([id]),cid);await p.waitForSelector('.qcard');
  const q0=await p.evaluate(()=>({q:M.q.q,type:M.q.type,i:M.i,n:M.n,queue:[...M.queue],resume:!!S.exerciseResume,blob:S.exerciseResume?.blob?.length||0}));
  T('Dès la première question : instantané de reprise enregistré',q0.resume&&q0.blob>100&&q0.i===0,JSON.stringify(q0));

  // Saisie partielle quand le type le permet ; l’HTML et les valeurs doivent survivre au rechargement.
  const partial=await p.evaluate(()=>{const el=document.querySelector('#in0');if(!el)return null;el.value='12345';el.dispatchEvent(new Event('input',{bubbles:true}));return el.value;});await p.waitForTimeout(260);
  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQExerciseResume,{timeout:5000});await p.waitForTimeout(60);
  const afterReload=await p.evaluate(()=>({m:!!M,home:CUR,resume:!!S.exerciseResume,tab:!!document.querySelector('#hometabs .mq-exercises-tab .ex-tab-badge')}));
  T('Rechargement : aucune mission rejouée automatiquement, mais la reprise reste proposée',!afterReload.m&&afterReload.home==='home'&&afterReload.resume&&afterReload.tab,JSON.stringify(afterReload));

  await p.click('#hometabs .mq-exercises-tab');await p.waitForSelector('[data-a="exresume"]');
  const screen=await p.evaluate(()=>({hist:document.querySelectorAll('.ex-history-row').length,continue:!!document.querySelector('[data-a="exresume"]'),overflow:document.documentElement.scrollWidth-innerWidth}));
  T('Onglet Exercices : carte Continuer visible et écran sans débordement',screen.continue&&screen.overflow<=1,JSON.stringify(screen));
  await p.click('[data-a="exresume"]');await p.waitForSelector('.qcard');
  const resumed0=await p.evaluate(()=>({q:M.q.q,type:M.q.type,i:M.i,n:M.n,queue:[...M.queue],locked:M.locked,value:document.querySelector('#in0')?.value||null}));
  T('Reprise avant réponse : même question, même index, même file et saisie partielle conservée',resumed0.q===q0.q&&resumed0.i===q0.i&&JSON.stringify(resumed0.queue)===JSON.stringify(q0.queue)&&(!partial||resumed0.value===partial),JSON.stringify({q0,resumed0,partial}));

  // Réponse fausse : elle est comptée une fois et la correction doit être restaurée telle quelle.
  const before=await p.evaluate(()=>({tq:S.totalQ,xp:S.xp,coins:S.coins,log:(S.answerLog||[]).length,mist:Object.values(S.mistakes||{}).reduce((n,a)=>n+(a?.length||0),0),q:M.q.q,i:M.i}));
  await ans(false);await p.waitForSelector('#fb .fb.bad');await p.waitForTimeout(80);
  const counted=await p.evaluate(()=>({tq:S.totalQ,xp:S.xp,coins:S.coins,log:(S.answerLog||[]).length,mist:Object.values(S.mistakes||{}).reduce((n,a)=>n+(a?.length||0),0),locked:M.locked,q:M.q.q,i:M.i,fb:document.querySelector('#fb')?.innerText||''}));
  T('La mauvaise réponse est comptée exactement une fois avant le rechargement',counted.tq===before.tq+1&&counted.log===before.log+1&&counted.mist>=before.mist+1&&counted.locked,JSON.stringify({before,counted}));

  // Force la séance à dépasser 1 s pour qu'activityLog conserve l'interruption pagehide.
  await p.evaluate(()=>{const a=MQActivity.active();if(a)a.t0-=2500;});
  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQExerciseResume,{timeout:5000});await p.waitForTimeout(60);await p.click('#hometabs .mq-exercises-tab');await p.waitForSelector('[data-a="exresume"]');await p.click('[data-a="exresume"]');await p.waitForSelector('#fb .fb.bad');
  const restored=await p.evaluate(()=>({tq:S.totalQ,xp:S.xp,coins:S.coins,log:(S.answerLog||[]).length,mist:Object.values(S.mistakes||{}).reduce((n,a)=>n+(a?.length||0),0),locked:M.locked,q:M.q.q,i:M.i,next:!!document.querySelector('[data-a="next"]'),fb:document.querySelector('#fb')?.innerText||''}));
  T('Reprise après réponse : correction exacte restaurée sans recompter question, XP, pièces, journal ni erreur',restored.tq===counted.tq&&restored.xp===counted.xp&&restored.coins===counted.coins&&restored.log===counted.log&&restored.mist===counted.mist&&restored.locked&&restored.q===counted.q&&restored.i===counted.i&&restored.next&&/Bonne réponse|Presque|réponse/i.test(restored.fb),JSON.stringify({counted,restored}));

  await p.click('[data-a="next"]');await p.waitForSelector('.qcard');const advanced=await p.evaluate(()=>({i:M.i,tq:S.totalQ,log:(S.answerLog||[]).length,resume:!!S.exerciseResume}));
  T('Après reprise, « Suivant » avance une seule fois sans recompter la réponse restaurée',advanced.i===counted.i+1&&advanced.tq===counted.tq&&advanced.log===counted.log&&advanced.resume,JSON.stringify(advanced));

  // Abandon explicite : contrairement au rechargement, il efface la reprise.
  await p.click('[data-a="quit"]');await p.waitForTimeout(80);const quit=await p.evaluate(()=>({m:!!M,resume:!!S.exerciseResume,cur:CUR}));
  T('Abandon volontaire : la reprise est supprimée',!quit.m&&!quit.resume&&quit.cur==='home',JSON.stringify(quit));

  // Historique : 30 exercices maximum, sans second journal.
  await p.evaluate(id=>{S.activityLog=[];const now=Date.now();for(let i=0;i<35;i++)S.activityLog.push({id:'t'+i,t0:now-i*60000-40000,t1:now-i*60000,ms:40000,kind:'exercise',ids:[id],grade:S.grade,subj:S.subj,reason:i%6===0?'home':'exercise-end',...(i%6===0?{}:{ok:8-i%3,total:8})});S.activityLog.push({id:'lesson',t0:now,t1:now,ms:1000,kind:'lesson',ids:[id],grade:S.grade});saveLocal();MQExerciseResume.screen();},cid);await p.waitForSelector('.ex-history-row');
  const hist=await p.evaluate(()=>({rows:document.querySelectorAll('.ex-history-row').length,text:document.querySelector('.ex-history')?.innerText||'',stored:S.activityLog.length}));
  T('Historique : exactement les 30 derniers exercices, le journal de leçons n’est pas mélangé',hist.rows===30&&hist.stored===36&&/Interrompu/.test(hist.text)&&/\/8/.test(hist.text),JSON.stringify(hist));

  // Isolation des profils : un snapshot du premier enfant n'apparaît jamais chez le second.
  await p.evaluate(id=>{startMission([id]);MQExerciseResume.capture();},cid);await p.waitForSelector('.qcard');const firstHas=await p.evaluate(()=>!!S.exerciseResume);
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const iso=await p.evaluate(()=>({name:S.name,resume:!!S.exerciseResume,tabBadge:!!document.querySelector('#hometabs .mq-exercises-tab .ex-tab-badge')}));
  T('Multi-profils : la reprise du premier enfant n’apparaît pas chez le second',firstHas&&iso.name==='Noé'&&!iso.resume&&!iso.tabBadge,JSON.stringify(iso));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>home());await p.waitForTimeout(80);const mobile=await p.evaluate(()=>({tabs:document.querySelectorAll('#hometabs .htab').length,overflow:document.documentElement.scrollWidth-innerWidth,nav:document.getElementById('hometabs')?.getBoundingClientRect().width||0,vw:innerWidth}));
  T('Mobile 320 px : les 5 onglets restent dans la largeur sans débordement',mobile.tabs===5&&mobile.overflow<=1&&mobile.nav<=mobile.vw+1,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les parcours de reprise',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
