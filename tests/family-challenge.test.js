/* Défi famille — équité entre niveaux, objectifs personnels, classement et mobile. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844},timezoneId:'Europe/Paris'});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CP"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQFamilyChallenge,{timeout:5000});

  const data=await p.evaluate(()=>{const now=Date.now(),start=MQFamilyChallenge.startOfWeek(now),mk=(name,grade,goal,correctPerDay,wrongExtra=0,days=5,lessons=3,repairs=3)=>{const s=normalizeState({...S,name,grade,dailyGoal:goal,answerLog:[],activityLog:[],lessons:{},mistakes:{},review:{}});for(let d=0;d<days;d++){const t=start+d*86400000+12*3600000;for(let i=0;i<correctPerDay;i++)s.answerLog.push({t:t+i*1000,cid:'x',ok:true,source:'practice',ms:1000});for(let i=0;i<wrongExtra;i++)s.answerLog.push({t:t+(correctPerDay+i)*1000,cid:'x',ok:false,source:'practice',ms:1000});s.activityLog.push({id:name+d,t0:t,t1:t+600000,ms:600000,kind:'exercise',ids:['x'],grade});}for(let i=0;i<lessons;i++)s.lessons['l'+i]=start+(i+1)*86400000+13*3600000;s.mistakes={x:Array.from({length:repairs},(_,i)=>({q:'e'+i,answer:'a',at:start-1000,seen:start+(i+1)*86400000+14*3600000}))};return s;};
   const cp=mk('Lina','CP',10,10,8),college=mk('Max','3e',20,20,0),low=mk('Noé','CM1',20,5,0,2,0,0);const a=MQFamilyChallenge.metrics(cp,now),bb=MQFamilyChallenge.metrics(college,now),c=MQFamilyChallenge.metrics(low,now);return {now,start,cp:a,college:bb,low:c,cpState:cp,collegeState:college,lowState:low};});
  T('Équité niveau : CP et 3e avec le même effort relatif obtiennent exactement le même score',data.cp.score===data.college.score&&data.cp.score===100&&data.cp.regularityPts===40&&data.cp.goalPts===30&&data.cp.lessonPts===20&&data.cp.repairPts===10,JSON.stringify({cp:data.cp,college:data.college}));
  T('La réussite brute n’entre pas dans le classement : 40 erreurs supplémentaires ne pénalisent pas si les mêmes objectifs sont atteints',data.cp.score===data.college.score&&data.cp.goalProgressPct===100&&data.college.goalProgressPct===100,JSON.stringify({cp:data.cp,college:data.college}));
  T('Effort moindre : score inférieur sans utiliser la classe ni une note scolaire',data.low.score<data.cp.score&&data.low.days===2&&data.low.lessons===0&&data.low.repairs===0,JSON.stringify(data.low));

  const ranks=await p.evaluate(({cpState,collegeState,lowState,now})=>{PDB.profiles={p1:cpState,p2:collegeState,p3:lowState};PDB.active='p1';ACTIVE='p1';S=PDB.profiles.p1;const rows=MQFamilyChallenge.participants(now),group=MQFamilyChallenge.collective(rows);saveLocal();return {rows:rows.map(x=>({name:x.p.name,grade:x.p.grade,score:x.m.score,rank:x.rank})),group};},{cpState:data.cpState,collegeState:data.collegeState,lowState:data.lowState,now:data.now});
  T('Classement bienveillant : égalités partagent le même rang et le profil moins actif suit',ranks.rows.length===3&&ranks.rows[0].score===100&&ranks.rows[1].score===100&&ranks.rows[0].rank===1&&ranks.rows[1].rank===1&&ranks.rows[2].rank===3,JSON.stringify(ranks));
  T('Objectif collectif : moyenne familiale calculée sur les scores relatifs',ranks.group.avg===Math.round(ranks.rows.reduce((n,x)=>n+x.score,0)/3)&&ranks.group.pct>=0&&ranks.group.pct<=100,JSON.stringify(ranks.group));

  await p.evaluate(()=>MQFamilyChallenge.screen());await p.waitForSelector('.mq-family-row');const ui=await p.evaluate(()=>({rows:document.querySelectorAll('.mq-family-row').length,stats:document.querySelectorAll('.mq-family-stat').length,goal:document.querySelector('.mq-family-goal')?.innerText||'',rules:document.querySelector('.mq-family-rules')?.textContent||'',text:document.querySelector('.mq-family-intro')?.innerText||'',overflow:document.documentElement.scrollWidth-innerWidth}));
  T('UI : trois participants, 4 critères chacun, objectif collectif et explication d’équité',ui.rows===3&&ui.stats===12&&/Objectif collectif/.test(ui.goal)&&/40 pts/.test(ui.rules)&&/ne compare jamais les notes ni le niveau scolaire/i.test(ui.text)&&ui.overflow<=1,JSON.stringify(ui));

  // Accès depuis Progrès.
  await p.evaluate(()=>{HOMETAB='progres';home();});await p.waitForTimeout(80);const access=await p.evaluate(()=>({n:document.querySelectorAll('.mq-family-access').length,button:!!document.querySelector('[data-a="familychallenge"]'),text:document.querySelector('.mq-family-access')?.innerText||''}));
  T('Onglet Progrès : accès unique au Défi famille',access.n===1&&access.button&&/Défi famille/.test(access.text),JSON.stringify(access));

  // Un seul profil : pas de faux classement, CTA profils.
  const one=await p.evaluate(()=>{const only=PDB.profiles.p1;PDB.profiles={p1:only};PDB.active='p1';ACTIVE='p1';S=only;MQFamilyChallenge.screen();return {rows:document.querySelectorAll('.mq-family-row').length,cta:!!document.querySelector('[data-a="profiles"]'),text:app.innerText};});
  T('Un seul participant : invitation claire à ajouter un profil, aucun faux classement',one.rows===0&&one.cta&&/deuxième participant/i.test(one.text),JSON.stringify(one));

  // DST : semaine glissante basée sur les jours civils locaux.
  const dst=await p.evaluate(()=>{const now=new Date('2026-03-30T00:30:00+02:00').getTime(),s=MQFamilyChallenge.startOfWeek(now);return {start:new Date(s).toLocaleString('sv-SE',{timeZone:'Europe/Paris'}),hours:(now-s)/3600000};});
  T('Calendrier : semaine calculée en jours civils Europe/Paris, pas en 6×24 h fixes',/^2026-03-24/.test(dst.start)&&dst.hours!==144,JSON.stringify(dst));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{PDB.profiles.p2=normalizeState({...PDB.profiles.p1,name:'Max',grade:'3e'});MQFamilyChallenge.screen();});await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-family')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : défi sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant le défi famille',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
