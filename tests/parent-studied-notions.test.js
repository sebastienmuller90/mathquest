/* P2-4 (01/11/2026) : « notions étudiées aujourd'hui » (espace parents, interrogation parent).
   Constat émulateur : « Aujourd'hui : 1 notion étudiée (Symétrie centrale) » pour un élève qui n'avait rien fait.
   Cause : l'étape du parcours du jour simplement déverrouillée (status 'next') comptait comme étudiée.
   Règle : une notion est étudiée aujourd'hui si l'enfant a ouvert un cours ou une série (studyLog), répondu (answerLog),
   validé un cours, ou terminé une étape du parcours (done / review). Le diagnostic (calibration, « pas une note »)
   ne compte pas, qu'on y réponde ou non. Vérifié dans l'app (MQInterrogation) et dans le tableau de bord parent affiché. */
const {serve,launch,seedProfile,main}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:390,height:844}});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','5e');
  // Notions « étudiées aujourd'hui » vues par l'app et par le tableau de bord parent réellement affiché.
  const state=()=>p.evaluate(async()=>{const today=MQInterrogation.todayIds();PARENT=true;parentScreen('suivi');await new Promise(r=>setTimeout(r,80));
   const t=document.getElementById('app').innerText;const m=t.match(/(\d+) notions? étudiées?/i);const out={today,parentCount:m?+m[1]:0,iqNone:/Rien n.a encore été étudié aujourd.hui/.test(t),path:(S.path&&S.path.steps||[]).map(s=>(s.cid||'exo')+':'+s.status).join(' ')};PARENT=false;ACT.home();return out;});
  const s0=await state();
  T('Élève qui n’a rien fait (parcours du jour juste créé) : aucune notion étudiée',s0.today.length===0,JSON.stringify(s0));
  T('Tableau de bord parent : n’affiche aucune notion étudiée et l’interrogation indique qu’il n’y a rien à contrôler',s0.parentCount===0&&s0.iqNone,JSON.stringify(s0));
  // Diagnostic : première question affichée puis « Quitter et reprendre plus tard » sans répondre
  await p.evaluate(async()=>{ACT.home();ACT.diagstart();await new Promise(r=>setTimeout(r,100));document.querySelector('[data-a="diagpause"]').click();});
  const s1=await state();
  T('Diagnostic ouvert puis quitté sans répondre : aucune notion étudiée',s1.today.length===0&&s1.parentCount===0,JSON.stringify(s1));
  // Diagnostic : une question répondue (calibration) → toujours pas « étudiée »
  await p.evaluate(async()=>{ACT.home();ACT.diagstart();await new Promise(r=>setTimeout(r,100));const c=document.querySelector('[data-a^="diagpick:"]');
   if(c)c.click();else{const i=document.querySelector('#app input');if(i){i.value='1';i.dispatchEvent(new Event('input',{bubbles:true}));}document.querySelector('[data-a="diagvalid"]')?.click();}
   await new Promise(r=>setTimeout(r,100));document.querySelector('[data-a="diagpause"]')?.click();});
  const s2=await state();
  T('Diagnostic avec une réponse (calibration, pas une note) : aucune notion étudiée',s2.today.length===0,JSON.stringify(s2));
  // Cours réellement commencé (niveau choisi) → la notion est étudiée
  const cid=await p.evaluate(()=>ALLCH.find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='5e'&&sOf(WMAP[c.id].id).id==='maths'&&c.id!==(S.path&&S.path.steps[0]&&S.path.steps[0].cid)).id);
  await p.evaluate(id=>{ACT.home();ACT.lessonlevel(id+'|1');ACT.lnext();ACT.home();},cid);
  const s3=await state();
  T('Cours réellement commencé : la notion devient étudiée (et elle seule)',s3.today.length===1&&s3.today[0]===cid&&s3.parentCount===1,JSON.stringify(s3)+' attendu '+cid);
  // Exercice effectué (une réponse) → la notion de l'exercice est étudiée
  const cid2=await p.evaluate(()=>ALLCH.find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='5e'&&sOf(WMAP[c.id].id).id==='francais').id);
  await p.evaluate(async id=>{ACT.home();startMission([id],{level:1,n:8});const q=M.q;if(q.type==='choice')document.querySelector('[data-a="pick:'+q.ans+'"]').click();else{const i=document.querySelector('#in0');if(i){i.value=String(Array.isArray(q.acc)?q.acc[0]:q.ans);}document.querySelector('[data-a="valid"]').click();}await new Promise(r=>setTimeout(r,50));ACT.home();},cid2);
  const s4=await state();
  T('Exercice effectué : sa notion devient étudiée',s4.today.includes(cid2)&&s4.parentCount===s4.today.length,JSON.stringify(s4));
  // Étape du parcours terminée → sa notion est étudiée (règle existante conservée)
  const s5=await p.evaluate(()=>{const st=S.path.steps.find(x=>x.kind==='lesson');st.status='done';saveLocal();return {cid:st.cid,today:MQInterrogation.todayIds()};});
  T('Étape du parcours terminée (done) : sa notion compte comme étudiée',s5.today.includes(s5.cid),JSON.stringify(s5));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
