/* Séries de jours — le jour précédent est un jour civil local, jamais « maintenant - 24 h ». */
const {serve,launch}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({timezoneId:'Europe/Paris'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  // Le bug historique : 30 mars 2026 00:30 CEST - 24 h = 28 mars 23:30 CET, donc pas le 29.
  const spring=await p.evaluate(()=>{const now=new Date('2026-03-30T00:30:00+02:00'),raw=new Date(+now-86400000),civil=new Date(now);civil.setDate(civil.getDate()-1);return {now:dstr(+now),raw:dstr(+raw),civil:dstr(+civil)};});
  T('Reproduction heure d’été : −24 h tombe sur avant-hier, setDate(-1) donne bien hier',spring.now==='2026-3-30'&&spring.raw==='2026-3-28'&&spring.civil==='2026-3-29',JSON.stringify(spring));

  const has=await p.evaluate(()=>typeof window.MQCalendar==='object'&&typeof MQCalendar.previousLocalDay==='function'&&typeof MQCalendar.civilDaysSince==='function');
  T('Architecture : helpers de jours civils disponibles',has,String(has));
  if(has){
   const days=await p.evaluate(()=>({spring:MQCalendar.previousLocalDay(new Date('2026-03-30T00:30:00+02:00').getTime()),autumn:MQCalendar.previousLocalDay(new Date('2026-10-26T00:30:00+01:00').getTime()),normal:MQCalendar.previousLocalDay(new Date('2026-10-21T12:00:00+02:00').getTime())}));
   T('Jour civil précédent : correct en heure d’été, heure d’hiver et journée normale',days.spring==='2026-3-29'&&days.autumn==='2026-10-25'&&days.normal==='2026-10-20',JSON.stringify(days));

   const streak=await p.evaluate(()=>{const real=Date.now;try{S.streak={n:4,best:4,last:'2026-3-29'};Date.now=()=>new Date('2026-03-30T00:30:00+02:00').getTime();touchStreak();const a={...S.streak};touchStreak();const b={...S.streak};return {a,b};}finally{Date.now=real;}});
   T('Série : le 30 mars prolonge le 29 une fois seulement',streak.a.n===5&&streak.a.last==='2026-3-30'&&streak.b.n===5,JSON.stringify(streak));

   const autumnStreak=await p.evaluate(()=>{const real=Date.now;try{S.streak={n:7,best:7,last:'2026-10-25'};Date.now=()=>new Date('2026-10-26T00:30:00+01:00').getTime();touchStreak();return {...S.streak};}finally{Date.now=real;}});
   T('Série : le passage à l’heure d’hiver prolonge aussi correctement la veille',autumnStreak.n===8&&autumnStreak.last==='2026-10-26',JSON.stringify(autumnStreak));

   const absence=await p.evaluate(()=>({
    spring1:MQCalendar.civilDaysSince('2026-3-29',new Date('2026-03-30T23:30:00+02:00')),
    spring2:MQCalendar.civilDaysSince('2026-3-28',new Date('2026-03-30T00:30:00+02:00')),
    autumn1:MQCalendar.civilDaysSince('2026-10-25',new Date('2026-10-26T00:30:00+01:00')),
    normal3:MQCalendar.civilDaysSince('2026-10-18',new Date('2026-10-21T22:00:00+02:00')),
    invalid:MQCalendar.civilDaysSince('2026-02-30',new Date('2026-03-02T12:00:00+01:00'))
   }));
   T('Absence Finot : 1/2/3 jours civils exacts malgré les changements d’heure',absence.spring1===1&&absence.spring2===2&&absence.autumn1===1&&absence.normal3===3&&absence.invalid===0,JSON.stringify(absence));

   const finot=await p.evaluate(()=>{const real=Date.now;try{Date.now=()=>new Date('2026-03-30T23:30:00+02:00').getTime();return {a:finotJoursAbsence({streak:{last:'2026-3-29'}}),b:finotJoursAbsence({streak:{last:'2026-3-27'}})};}finally{Date.now=real;}});
   T('Finot utilise le calcul civil : 1 jour puis 3 jours d’absence',finot.a===1&&finot.b===3,JSON.stringify(finot));
  }
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}return R;}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
