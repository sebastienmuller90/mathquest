/* P3-D (01/11/2026) : élision dans les libellés générés (« Leçon d’anglais », « Voir le cours d’Anglais »),
   constatée sur l'émulateur : « Voir le cours de Anglais », « Leçon de anglais », « Leçon de éducation musicale ». */
const {serve,launch,seedProfile,main}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,400)});
 const {srv,url}=await serve();const b=await launch();
 try{const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CM1');
  const lab=await p.evaluate(()=>{const subj=n=>Object.keys(SUBMAP).find(k=>SUBMAP[k].name.toLowerCase()===n);
   return {en:pathStepLabel({kind:'lesson',subj:subj('anglais')}),mus:pathStepLabel({kind:'lesson',subj:subj('éducation musicale')}),ma:pathStepLabel({kind:'lesson',subj:subj('maths')}),hg:pathStepLabel({kind:'lesson',subj:subj('histoire-géographie')})};});
  T('Parcours : « Leçon d’anglais »',lab.en==='Leçon d’anglais',lab.en);
  T('Parcours : « Leçon d’éducation musicale »',lab.mus==='Leçon d’éducation musicale',lab.mus);
  T('Parcours : « Leçon d’histoire-géographie » (h muet)',lab.hg==='Leçon d’histoire-géographie',lab.hg);
  T('Parcours : « Leçon de maths » inchangé',lab.ma==='Leçon de maths',lab.ma);
  const btn=async n=>p.evaluate(async n=>{ACT.home();document.querySelector('[data-a="hometab:matieres"]').click();await new Promise(r=>setTimeout(r,60));
   const s=[...document.querySelectorAll('[data-a^="subj:"]')].find(b=>b.textContent.trim()===n);if(s){s.click();await new Promise(r=>setTimeout(r,60));}
   return (document.querySelector('[data-a^="courses:"]')||{}).textContent?.trim()||'';},n);
  const be=await btn('Anglais'),bm=await btn('Maths');
  T('Matières : « Voir le cours d’Anglais »',/Voir le cours d’Anglais$/.test(be),be);
  T('Matières : « Voir le cours de Maths » inchangé',/Voir le cours de Maths$/.test(bm),bm);
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
