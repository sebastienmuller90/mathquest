/* P2-1 (01/11/2026) : langue de lecture des cours approfondis d'anglais et d'italien.
   « Écouter cette étape » et le clic sur une phrase étrangère doivent envoyer au moteur vocal les phrases anglaises en anglais,
   les phrases italiennes en italien, et garder le français (explications, termes de grammaire) en français.
   Le moteur vocal est intercepté (MQAudio.speak) : on vérifie ce qui lui est réellement demandé. */
const {serve,launch,seedProfile,main}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,600)});
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:390,height:844}});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CM1');
  // Interception du moteur vocal : on garde la langue et le texte de chaque segment demandé.
  await p.evaluate(()=>{window.__spoken=[];TTS.ok=true;MQAudio.speak=(flat,o)=>{for(const x of flat)window.__spoken.push({l:x.l,t:String(x.t)});if(o&&o.onend)setTimeout(o.onend,0);return Promise.resolve();};MQAudio.stop=()=>{};});
  // Ouvre un cours au niveau donné et se place sur l'étape dont le titre ou le contenu contient « needle ».
  const speakStep=async(id,needle)=>p.evaluate(async([id,needle])=>{ACT.lessonlevel(id+'|1');await new Promise(r=>setTimeout(r,30));
   const i=L.steps.findIndex(s=>(s.t||'').includes(needle)||(s.h||'').includes(needle));if(i<0)return {missing:true};
   L.i=i;renderLesson();window.__spoken=[];document.querySelector('[data-a="ttsplay"]').click();await new Promise(r=>setTimeout(r,60));
   return {spoken:window.__spoken.slice()};},[id,needle]);
  const has=(sp,l,re)=>sp.some(x=>x.l===l&&re.test(x.t));
  const fmt=sp=>sp.map(x=>x.l+':'+x.t.slice(0,40)).join(' | ');

  // 1. Anglais CM1 : tableau phrase anglaise / traduction française
  const en=await speakStep('cm1-en-introduce','Cinq phrases pour se présenter');
  T('Anglais CM1 : « My name is Léa. » est lu en anglais',!en.missing&&has(en.spoken,'en',/My name is Léa/),en.missing?'étape introuvable':fmt(en.spoken));
  T('Anglais CM1 : la traduction « Je m’appelle Léa. » reste lue en français',!en.missing&&has(en.spoken,'fr',/Je m.appelle Léa/),en.missing?'':fmt(en.spoken));
  T('Anglais CM1 : aucune phrase anglaise du tableau n’est lue en français',!en.missing&&!has(en.spoken,'fr',/My name is|I live in|My birthday/),en.missing?'':fmt(en.spoken));
  // 2. Étape mixte FR + EN : explication française, exemple anglais en gras
  const mix=await speakStep('cm1-en-introduce','Trois pièges à éviter');
  T('Anglais CM1 (étape mixte) : « I’m nine » en anglais et l’explication en français',!mix.missing&&has(mix.spoken,'en',/I.m nine/)&&has(mix.spoken,'fr',/Pour l.âge, on dit/),mix.missing?'étape introuvable':fmt(mix.spoken));
  // 3. Italien 5e
  await p.evaluate(()=>{S.grade='5e';saveLocal();});
  const it=await speakStep('it5a','Mi chiamo Marta');
  T('Italien 5e : « Mi chiamo Marta. » est lu en italien',!it.missing&&has(it.spoken,'it',/Mi chiamo Marta/),it.missing?'étape introuvable':fmt(it.spoken));
  T('Italien 5e (étape mixte) : l’explication française reste en français',!it.missing&&it.spoken.some(x=>x.l==='fr'&&/[a-zà-ÿ]{4,}/i.test(x.t)),it.missing?'':fmt(it.spoken));
  // 4. Terme de grammaire français en gras dans un cours d'anglais : reste en français
  const gram=await p.evaluate(()=>{const C=MQCourseDepth.chapters;for(const [id,d] of Object.entries(C)){if(!/^en/.test(id))continue;for(const x of d.deep||[])if(/<b[^>]*>prétérit<\/b>/.test(x.h||''))return {id,t:x.t};}return null;});
  if(gram){await p.evaluate(()=>{S.grade='5e';saveLocal();});const g=await speakStep(gram.id,gram.t);
   T('Anglais collège : le terme de grammaire « prétérit » (en gras) reste lu en français',!g.missing&&has(g.spoken,'fr',/prétérit/)&&!has(g.spoken,'en',/prétérit/),g.missing?'étape introuvable':fmt(g.spoken));}
  else T('Anglais collège : un cours contenant « prétérit » en gras existe pour le contrôle',false,'introuvable');
  // 5. Cours de français : tout en français
  await p.evaluate(()=>{S.grade='CM1';saveLocal();});
  const frId=await p.evaluate(()=>Object.keys(MQCourseDepth.chapters).find(id=>/^cm1-fr-/.test(id)&&(MQCourseDepth.chapters[id].deep||[]).length));
  const fr=await speakStep(frId,'🔍');
  T('Français CM1 : tout est lu en français (aucun segment anglais ou italien)',!fr.missing&&fr.spoken.length&&fr.spoken.every(x=>x.l==='fr'),fr.missing?'étape introuvable':fmt(fr.spoken));
  // 6. Clic sur une phrase anglaise : lecture en anglais
  const click=await p.evaluate(async()=>{ACT.lessonlevel('cm1-en-introduce|1');await new Promise(r=>setTimeout(r,30));const i=L.steps.findIndex(s=>(s.t||'').includes('Cinq phrases'));L.i=i;renderLesson();window.__spoken=[];
   const el=[...document.querySelectorAll('.lcard [lang="en"]')].find(e=>/My name is Léa/.test(e.textContent));if(!el)return null;el.click();await new Promise(r=>setTimeout(r,40));return window.__spoken.slice();});
  T('Clic sur « My name is Léa. » : lu en anglais',!!click&&has(click,'en',/My name is Léa/),click?fmt(click):'phrase anglaise sans attribut lang dans la page');
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
