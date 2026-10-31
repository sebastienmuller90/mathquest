/* Confidentialité enfant (P0, 31/10/2026) : ce qui quitte l'appareil lors du suivi parent à distance (Supabase).
   Le snapshot envoyé par mq_push ne doit contenir QUE ce que la page parent distante (parent.html + parent-*.js) affiche :
   jamais la date de naissance, le genre, le profil d'apprentissage, le mode DYS, le diagnostic, le texte libre tapé par
   l'enfant (aide aux devoirs, réponses d'interrogation, erreurs), les réglages, l'économie, ni les codes (pin, sync).
   Vérifie au niveau RÉSEAU (requêtes interceptées, aucune donnée envoyée au vrai serveur), que la page parent affiche
   exactement la même chose avec le snapshot réduit qu'avec l'ancien snapshot complet, et que le profil local est intact. */
const {serve,launchEngine}=require('./lib');
const {freshContext,wizard,playMission}=require('./release-lib');
const SUPA=/https:\/\/[a-z0-9]+\.supabase\.co\/rest\/v1\/rpc\/([a-z_]+)/;
const ALLOWED=['name','avatar','grade','xp','totalQ','totalOk','time','streak','daily','dailyGoal','chap','lessons','merit','readingMastery','readingProgress','competencies','activityLog','answerLog','studyLog','interrogations','path','pathHist','lastSeen','syncSchema'];
const FORBIDDEN=['birthdate','lastBirthdayYear','gender','companion','learnerProfile','diagnostic','dys','mistakes','homework','homeworkHelp','exerciseResume','economy','pin','rec','sync','tts','finotLiving','errorPatterns','errorRepair','sessionCheckpoints','smart5','nationalAssessments','recent','vocab','review','confidence','adaptive','own','theme','badgeDates'];

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{
  const {ctx,p,errs}=await freshContext(b,url);
  const sent=[];
  await ctx.route(SUPA,async route=>{const fn=route.request().url().match(SUPA)[1];let body=null;try{body=JSON.parse(route.request().postData()||'null');}catch(e){}
   sent.push({fn,body,headers:route.request().headers()});
   return route.fulfill({status:200,contentType:'application/json',body:fn==='mq_push'?'[]':'null'});});
  await wizard(p,{name:'Léa',gender:'girl',birth:'2016-04-12',stage:'primaire',grade:'CE2',companion:'finot'});
  const cid=await p.evaluate(()=>ALLCH.find(c=>/^ce2-/.test(c.id)).id);
  await p.evaluate(id=>startMission([id]),cid);await p.waitForFunction(()=>M&&M.q);
  await playMission(p,[true,false,true,false,true]).catch(()=>{});
  await p.evaluate(()=>ACT.home());
  // Données sensibles typiques, telles que les modules les enregistrent.
  await p.evaluate(()=>{S.dys={...(S.dys||{}),enabled:true};S.homeworkHelp={...(S.homeworkHelp||{}),last:{text:'SECRET-DEVOIR tapé par l’enfant'}};
   S.interrogations={active:{id:'iqA',status:'in_progress',i:1,createdAt:Date.now(),studyDate:'31/10/2026',questions:[{cid:'ce2-x',q:'SECRET-QUESTION-ACTIVE',ans:'4'}]},
    history:[{id:'iqH',status:'done',createdAt:1,startedAt:2,finishedAt:3,studyDate:'30/10/2026',grade:'CE2',score:50,ok:1,total:2,subjects:[{id:'maths',name:'Maths',score:50}],answers:[{cid:'ce2-x',subject:'maths',d:1,ok:false,q:'SECRET-Q',your:'SECRET-REPONSE-ENFANT'}]}]};
   S.merit.notes=(S.merit.notes||[]).concat('SECRET-NOTE-ENFANT');S.pin='4321';saveLocal();});
  const local0=await p.evaluate(()=>JSON.parse(JSON.stringify(S)));
  const full=await p.evaluate(()=>{const o=JSON.parse(JSON.stringify(S));delete o.pin;delete o.rec;delete o.sync;o.lastSeen=Date.now();return o;}); // ancien snapshot (référence d'affichage)

  // Activation du suivi : mq_register puis mq_push, interceptés.
  await p.evaluate(async()=>{S.sync={child:'C'.repeat(28),parent:'P'.repeat(32)};saveLocal();await syncNow();});
  const push=sent.filter(x=>x.fn==='mq_push').pop();const data=push&&push.body&&push.body.p_data||{};
  const keys=Object.keys(data);
  T('mq_push intercepté (rien n’est parti vers le vrai serveur pendant le test)',!!push,JSON.stringify(sent.map(x=>x.fn)));
  T('Snapshot : uniquement des champs affichés par la page parent (liste blanche)',keys.length>0&&keys.every(k=>ALLOWED.includes(k)),keys.filter(k=>!ALLOWED.includes(k)).join(', '));
  const leak=FORBIDDEN.filter(k=>k in data);
  T('Snapshot : ni date de naissance, ni genre, ni profil d’apprentissage, ni DYS, ni diagnostic, ni erreurs, ni devoirs, ni codes',!leak.length,leak.join(', '));
  const raw=JSON.stringify(push&&push.body||{});
  T('Aucune trace de la date de naissance dans la requête (ni AAAA-MM-JJ, ni JJ/MM/AAAA)',!/2016-04-12|12\/04\/2016/.test(raw),'');
  T('Aucun texte libre de l’enfant dans la requête (devoirs, réponses d’interrogation, notes, questions)',!/SECRET-/.test(raw),(raw.match(/SECRET-[A-Z-]+/g)||[]).join(', '));
  T('Le code parent et le code PIN ne sont jamais dans les données envoyées',!raw.includes('P'.repeat(32))&&!/"pin"/.test(raw)&&!raw.includes('4321"'),'');
  const ilog=(data.answerLog||[]).every(a=>Object.keys(a).every(k=>['t','cid','ok','source','ms'].includes(k)));
  T('Journal des réponses : seulement date, chapitre, juste/faux, source, durée',ilog&&(data.answerLog||[]).length>0,JSON.stringify((data.answerLog||[])[0]));
  const it=data.interrogations||{};
  T('Interrogations : scores et avancement conservés, sans questions ni réponses tapées',it.active&&it.active.i===1&&it.active.status==='in_progress'&&it.active.questions.length===1&&Object.keys(it.active.questions[0]).join()==='cid'&&it.history&&it.history[0].score===50&&!('answers' in it.history[0]),JSON.stringify(it).slice(0,300));
  T('Bons points : solde, demandes, récompenses, règles et historique conservés ; messages destinés à l’enfant retirés',data.merit&&'pts' in data.merit&&Array.isArray(data.merit.hist)&&Array.isArray(data.merit.rewards)&&data.merit.rules&&!('notes' in data.merit),JSON.stringify(Object.keys(data.merit||{})));
  T('Prénom conservé (affiché au parent) et borné à 40 caractères',data.name==='Léa',data.name);
  T('Taille réduite par rapport à l’ancien snapshot complet',JSON.stringify(data).length<JSON.stringify(full).length*0.7,`${JSON.stringify(data).length} octets au lieu de ${JSON.stringify(full).length}`);
  const reg=sent.find(x=>x.fn==='mq_register');
  T('Requêtes : seulement la clé publique Supabase en en-tête, pas d’en-tête d’identification de l’enfant',push&&push.headers.apikey&&!push.headers.authorization&&!Object.keys(push.headers).some(h=>/x-child|x-user|cookie/i.test(h)),JSON.stringify(Object.keys(push?push.headers:{})));

  // Profil local intact (aucune donnée supprimée sur l'appareil)
  const local1=await p.evaluate(()=>{const db=JSON.parse(localStorage.getItem('mathquest_profiles_v2'));return db.profiles[db.active];});
  T('Profil local intact : date de naissance, erreurs, DYS, interrogations complètes conservés sur l’appareil',local1.birthdate==='2016-04-12'&&local1.dys&&local1.dys.enabled===true&&local1.interrogations.history[0].answers.length===1&&Object.keys(local1.mistakes||{}).length===Object.keys(local0.mistakes||{}).length,'');

  // Page parent : même affichage avec le snapshot réduit qu'avec l'ancien snapshot complet.
  const render=async snap=>{const pc=await b.newContext({viewport:{width:1100,height:900}});const pp=await pc.newPage();const e=[];pp.on('pageerror',x=>e.push(x.message));
   await pc.route(SUPA,r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({data:snap,pending:[],updated_at:'2026-10-31T10:00:00Z'})}));
   await pp.goto(url+'parent.html#'+'K'.repeat(32));await pp.waitForFunction(()=>document.querySelector('.tabs'),null,{timeout:8000});
   const out={};for(const t of ['suivi','recomp','reglages']){await pp.evaluate(t=>ACT.tab(t),t);await pp.waitForTimeout(250);out[t]=(await pp.evaluate(()=>document.getElementById('app').innerText)).replace(/En train de jouer|Vue il y a[^\n]*/g,'');}
   await pc.close();return {out,e};};
  const fixedNow=Date.now();full.lastSeen=fixedNow;data.lastSeen=fixedNow;
  const A=await render(full),B=await render(data);
  for(const t of ['suivi','recomp','reglages'])T(`Page parent (onglet ${t}) : affichage identique avec le snapshot réduit`,A.out[t]&&A.out[t]===B.out[t],A.out[t]===B.out[t]?'':'diff : '+JSON.stringify([A.out[t].slice(0,200),B.out[t].slice(0,200)]));
  T('Page parent : aucune erreur JavaScript avec le snapshot réduit',!B.e.length,B.e.join(' | '));
  T('App : aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
