/* P2-3 (01/11/2026) : bouton Retour Android (MQPlatform.back) — même effet que le retour pertinent affiché à l'écran.
   Constat émulateur : depuis le choix du niveau d'un cours, Retour ramenait à l'Accueil alors que l'écran propose
   « ← Retour au chapitre ». Vérifie la hiérarchie complète : overlay, retour contextuel (niveau, cours, chapitre),
   assistant d'inscription, diagnostic, accueil. MQPlatform.back() est exporté aussi en web (même code que l'APK). */
const {serve,launch,seedProfile,main}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,400)});
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:390,height:844}});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  // Assistant d'inscription : Retour = étape précédente
  const wiz=await p.evaluate(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));if(!document.querySelector('.pob-shell'))return {err:'pas d’assistant'};
   const f=document.querySelector('#pob-name');f.value='Lina';f.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-pob="gender"][data-value="girl"]').click();document.querySelector('[data-pob="next"]').click();await s(60);
   const before=document.querySelector('.pob-shell')?.textContent.match(/Étape \d/)?.[0];const how=MQPlatform.back();await s(60);
   return {how,before,after:document.querySelector('.pob-shell')?.textContent.match(/Étape \d/)?.[0]};});
  T('Assistant d’inscription : Retour revient à l’étape précédente',wiz.how==='wizard'&&wiz.before==='Étape 2'&&wiz.after==='Étape 1',JSON.stringify(wiz));
  await seedProfile(p,'Lina','CM1');
  const back=()=>p.evaluate(async()=>{const how=MQPlatform.back();await new Promise(r=>setTimeout(r,80));return {how,cur:CUR,start:!!document.querySelector('[data-a^="start:"]'),world:!!document.querySelector('[data-a^="lesson:"]')&&!document.querySelector('[data-a^="start:"]'),home:!!document.querySelector('[data-a="hometab:accueil"]')&&CUR==='home'};});
  const ID='cm1-ma-grands-nombres';
  const cid=await p.evaluate(id=>byId(id)?id:ALLCH.find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='CM1'&&sOf(WMAP[c.id].id).id==='p-maths').id,ID);
  // Overlay : panneau de Finot ouvert
  const ov=await p.evaluate(async()=>{ACT.home();await new Promise(r=>setTimeout(r,40));ACT.finotopen&&ACT.finotopen();await new Promise(r=>setTimeout(r,80));const how=MQPlatform.back();await new Promise(r=>setTimeout(r,60));return {how,cur:CUR};});
  T('Panneau ouvert (overlay) : Retour le ferme sans changer d’écran',ov.how==='overlay'&&ov.cur==='home',JSON.stringify(ov));
  // Choix du niveau d'un cours → chapitre
  await p.evaluate(id=>{ACT.home();ACT.lesson(id);},cid);
  const lv=await back();
  T('Choix du niveau d’un cours : Retour = « ← Retour au chapitre » (écran du chapitre)',lv.how==='contextual'&&lv.start,JSON.stringify(lv));
  // Choix du niveau d'exercice → chapitre
  await p.evaluate(id=>{ACT.home();ACT.start(id);},cid);
  const ex=await back();
  T('Choix du niveau d’exercice : Retour = écran du chapitre',ex.how==='contextual'&&ex.start,JSON.stringify(ex));
  // Dans un cours commencé → chapitre
  await p.evaluate(id=>{ACT.home();ACT.lessonlevel(id+'|1');ACT.lnext();},cid);
  const ls=await back();
  T('Dans un cours : Retour = écran du chapitre (pas l’accueil)',ls.how==='contextual'&&ls.start&&ls.cur!=='lesson',JSON.stringify(ls));
  // Écran du chapitre → monde de la matière (« Retour au monde »)
  await p.evaluate(id=>{ACT.home();ACT.chap(id);},cid);
  const ch=await back();
  T('Écran du chapitre : Retour = « Retour au monde »',ch.how==='contextual'&&ch.world,JSON.stringify(ch));
  // Diagnostic → pause
  const dg=await p.evaluate(async()=>{ACT.home();await new Promise(r=>setTimeout(r,30));if(ACT.diagstart)ACT.diagstart();await new Promise(r=>setTimeout(r,80));const was=CUR;const how=MQPlatform.back();await new Promise(r=>setTimeout(r,80));return {was,how,cur:CUR};});
  T('Diagnostic : Retour met en pause (et ne perd rien)',dg.was==='diagnostic'&&dg.how==='diagnostic-pause',JSON.stringify(dg));
  // Accueil → arrière-plan
  const hm=await p.evaluate(async()=>{ACT.home();await new Promise(r=>setTimeout(r,40));return {how:MQPlatform.back(),cur:CUR};});
  T('Accueil : Retour met l’app en arrière-plan (minimize)',hm.how==='minimize'&&hm.cur==='home',JSON.stringify(hm));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
