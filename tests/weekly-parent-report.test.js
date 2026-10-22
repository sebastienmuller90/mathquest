/* Bilan hebdomadaire parent — données simulées et jours civils Europe/Paris. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844},timezoneId:'Europe/Paris'});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQWeeklyReport,{timeout:5000});

  const dst=await p.evaluate(()=>{const now=new Date('2026-03-30T00:30:00+02:00').getTime(),r=MQWeeklyReport.range(now);const dates=[r.curStart,r.prevStart,r.prevEnd].map(t=>new Date(t).toLocaleString('sv-SE',{timeZone:'Europe/Paris'}));const prev=MQWeeklyReport.dayStart(now,-1);return {dates,prev:new Date(prev).toLocaleString('sv-SE',{timeZone:'Europe/Paris'}),hours:(now-prev)/3600000};});
  T('Calendrier : jours civils corrects au passage à l’heure d’été, sans hypothèse de 24 h',/^2026-03-24/.test(dst.dates[0])&&/^2026-03-17/.test(dst.dates[1])&&/^2026-03-24/.test(dst.dates[2])&&/^2026-03-29/.test(dst.prev)&&dst.hours!==24,JSON.stringify(dst));

  const seed=await p.evaluate(()=>{const now=Date.now(),r=MQWeeklyReport.range(now);const grade=S.grade,chs=ALLCH.filter(c=>WMAP[c.id]?.lvl===grade),pick=[];for(const c of chs){const sid=sOf(WMAP[c.id].id).id;if(!pick.some(x=>x.sid===sid))pick.push({cid:c.id,sid,name:sOf(WMAP[c.id].id).name});if(pick.length>=2)break;}if(pick.length<2)return {error:'pas assez de matières'};const [a,b]=pick;S.answerLog=[];S.activityLog=[];S.lessons={};S.mistakes={};S.review={};
   const curTimes=[r.curStart+3600000,r.curStart+86400000+3600000,r.curStart+3*86400000+3600000,r.curStart+5*86400000+3600000];let n=0;
   for(let i=0;i<12;i++){const cid=i<7?a.cid:b.cid,ok=i<7?i!==6:i<9,SAT=curTimes[i%curTimes.length];S.answerLog.push({t:SAT,cid,ok,source:'practice',ms:25000});n+=ok?1:0;}
   for(let i=0;i<8;i++){const t=r.prevStart+(i%3)*86400000+3600000;S.answerLog.push({t,cid:i<4?a.cid:b.cid,ok:i<3,source:'practice',ms:20000});}
   for(let i=0;i<4;i++)S.activityLog.push({id:'c'+i,t0:curTimes[i],t1:curTimes[i]+900000,ms:900000,kind:i===0?'lesson':'exercise',ids:[i<2?a.cid:b.cid],grade:S.grade,subj:S.subj,reason:i===0?'lesson-end':'exercise-end',ok:6,total:8});
   for(let i=0;i<2;i++){const t=r.prevStart+i*86400000+3600000;S.activityLog.push({id:'p'+i,t0:t,t1:t+600000,ms:600000,kind:'exercise',ids:[a.cid],grade:S.grade,subj:S.subj,reason:'exercise-end',ok:3,total:8});}
   S.lessons[a.cid]=curTimes[0];MQAdaptive.recordMistake(S,b.cid,{q:'Erreur hebdomadaire 1',answer:'x',expl:'e'});S.mistakes[b.cid][0].at=curTimes[2];MQAdaptive.recordMistake(S,b.cid,{q:'Erreur hebdomadaire 2',answer:'y',expl:'e'});S.mistakes[b.cid][0].at=curTimes[3];S.recent[a.cid]=[1,1,1,1,1,1,0,1];S.recent[b.cid]=[0,0,1,0,0];MQAdaptive.refreshMastery(S,a.cid);MQAdaptive.refreshMastery(S,b.cid);S.review[b.cid]={last:curTimes[3],next:Date.now()-1000,days:1,mastery:35};saveLocal();const x=MQWeeklyReport.report(S,now);return {a,b,cur:{q:x.cur.questions,acc:x.cur.acc,ms:x.cur.totalMs,ex:x.cur.exercises,lessons:x.cur.lessons.length,days:x.cur.days},prev:{q:x.prev.questions,acc:x.prev.acc,ms:x.prev.totalMs,days:x.prev.days},strong:x.strong.map(s=>({name:s.name,acc:s.acc})),weak:x.weakSub.map(s=>({name:s.name,acc:s.acc})),errs:x.errs.map(e=>({name:e.c.name,n:e.n})),advice:x.advice,deltas:x.deltas,text:MQWeeklyReport.shareText(x)};});
  T('Calcul semaine : activité, réussite, exercices, cours et jours actifs issus des journaux réels',!seed.error&&seed.cur.q===12&&seed.cur.ex===3&&seed.cur.lessons===1&&seed.cur.days===4&&seed.prev.q===8&&seed.prev.days===3,JSON.stringify(seed));
  T('Analyse : matière forte/faible, erreurs récurrentes et exactement deux conseils concrets',seed.strong.length>=1&&seed.strong[0].acc>=80&&seed.weak.length>=1&&seed.weak[0].acc<75&&seed.errs.some(e=>e.n>=2)&&seed.advice.length===2,JSON.stringify({strong:seed.strong,weak:seed.weak,errs:seed.errs,advice:seed.advice}));
  T('Comparaison : deltas calculés par rapport aux 7 jours précédents et texte partageable factuel',seed.deltas.questions===4&&Number.isFinite(seed.deltas.acc)&&/Finot Académie — bilan de Lina/.test(seed.text)&&/Conseil 1/.test(seed.text)&&!/[+−]\d+ % de maîtrise/i.test(seed.text),JSON.stringify({deltas:seed.deltas,text:seed.text}));

  await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector('.mq-weekly');
  const ui=await p.evaluate(()=>({title:document.querySelector('.mq-weekly h2')?.textContent,kpis:document.querySelectorAll('.mq-weekly-kpi').length,tips:document.querySelectorAll('.mq-weekly-advice li').length,copy:!!document.querySelector('[data-a="weeklycopy"]'),print:!!document.querySelector('[data-a="weeklyprint"]'),duplicate:document.querySelectorAll('.mq-weekly').length,overflow:document.documentElement.scrollWidth-innerWidth}));
  T('UI parent : un seul bilan, 4 KPI, 2 conseils et actions de partage/impression',/Bilan de la semaine/.test(ui.title||'')&&ui.kpis===4&&ui.tips===2&&ui.copy&&ui.print&&ui.duplicate===1&&ui.overflow<=1,JSON.stringify(ui));
  await p.evaluate(()=>parentScreen('suivi'));await p.waitForTimeout(50);const idem=await p.locator('.mq-weekly').count();T('Rendu idempotent : jamais deux bilans après rafraîchissement de l’onglet',idem===1,String(idem));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>parentScreen('suivi'));await p.waitForSelector('.mq-weekly');const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-weekly').getBoundingClientRect().right,vw:innerWidth,buttons:[...document.querySelectorAll('.mq-weekly-actions .btn')].map(x=>x.getBoundingClientRect().width)}));
  T('Mobile 320 px : bilan et actions sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+1&&mobile.buttons.every(x=>x>0),JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant le bilan hebdomadaire',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
