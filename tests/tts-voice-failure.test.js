/* P2-2 (01/11/2026) : synthèse vocale qui échoue (voix présente mais indisponible, ex. hors connexion sans voix locale).
   Constat Android : le moteur renvoie une erreur (TextToSpeech.ERROR → « synthesis-failed »), l'enfant n'a aucun retour.
   Attendu : aucun message si la lecture réussit ou est simplement interrompue ; un message enfant clair si la voix échoue ;
   une question purement orale (dictée) affiche alors son texte, pour que l'enfant ne soit jamais bloqué ; aucune erreur JS.
   Le moteur vocal du navigateur est remplacé par un faux moteur piloté par le test (réussite / échec / interruption). */
const {serve,launch,seedProfile,main}=require('./lib');
// Faux speechSynthesis : une voix fr-FR, en-GB, it-IT ; issue de chaque énoncé fixée par window.__ttsMode.
const FAKE=()=>{const voices=[{name:'FR',lang:'fr-FR',voiceURI:'fr',localService:true,default:true},{name:'EN',lang:'en-GB',voiceURI:'en',localService:true},{name:'IT',lang:'it-IT',voiceURI:'it',localService:true}];
 window.__ttsMode='ok';window.__ttsLog=[];
 function U(t){this.text=String(t);this.lang='';this.voice=null;this.onend=null;this.onerror=null;this.onstart=null;}
 const q=[];let cur=null;
 const run=()=>{const u=q.shift();if(!u){cur=null;return;}cur=u;window.__ttsLog.push({lang:u.lang,text:u.text,mode:window.__ttsMode});
  setTimeout(()=>{if(cur!==u)return;cur=null;if(u.onstart)u.onstart({});const m=window.__ttsMode;
   if(m==='ok'){if(u.onend)u.onend({});}else if(u.onerror)u.onerror({error:m});run();},5);};
 const s={get speaking(){return !!cur;},get pending(){return q.length>0;},getVoices:()=>voices.slice(),onvoiceschanged:null,
  speak(u){q.push(u);if(!cur)run();},cancel(){const c=cur;cur=null;q.splice(0).forEach(x=>{if(x.onerror)x.onerror({error:'canceled'});});if(c&&c.onerror)c.onerror({error:'interrupted'});},
  pause(){},resume(){},addEventListener(){},removeEventListener(){}};
 Object.defineProperty(window,'speechSynthesis',{value:s,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:U,configurable:true});};
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:390,height:844}});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});await ctx.addInitScript(FAKE);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE1');
  const toastText=()=>p.evaluate(()=>{const t=document.getElementById('toast');return t&&t.classList.contains('show')?t.textContent:'';});
  const FAILRE=/voix .*(n.est pas disponible|indisponible)/i;
  // Ouvre un cours et lance « Écouter cette étape » avec le mode du faux moteur.
  const listenLesson=async mode=>p.evaluate(async mode=>{const t=document.getElementById('toast');if(t){t.classList.remove('show');t.textContent='';}
   window.__ttsMode=mode;ACT.home();ACT.lessonlevel(ALLCH.find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='CE1'&&sOf(WMAP[c.id].id).id==='p-francais').id+'|1');
   await new Promise(r=>setTimeout(r,40));document.querySelector('[data-a="ttsplay"]').click();await new Promise(r=>setTimeout(r,400));
   const btn=document.querySelector('[data-a="ttsplay"]');return {spoke:window.__ttsLog.length,playing:TTS.playing,btn:btn?btn.textContent.trim():''};},mode);

  const ok=await listenLesson('ok');const okToast=await toastText();
  T('Lecture réussie : aucun message d’erreur de voix',ok.spoke>0&&!FAILRE.test(okToast),JSON.stringify(ok)+' toast='+okToast);
  const intr=await listenLesson('interrupted');const intrToast=await toastText();
  T('Lecture simplement interrompue : aucun message d’erreur de voix',!FAILRE.test(intrToast),'toast='+intrToast);
  const fail=await listenLesson('synthesis-failed');const failToast=await toastText();
  T('Voix qui échoue (synthesis-failed) : message enfant « voix pas disponible », sans prétendre qu’Internet manque',FAILRE.test(failToast)&&!/internet|connexion requise/i.test(failToast),'toast='+failToast);
  T('Voix qui échoue : la lecture se termine (bouton revenu à « Écouter », aucune boucle)',!fail.playing&&/Écouter/.test(fail.btn),JSON.stringify(fail));
  // Question purement orale (dictée) : le texte devient lisible et l'enfant peut répondre.
  const dict=await p.evaluate(async()=>{window.__ttsMode='synthesis-failed';ACT.home();
   const id=ALLCH.map(c=>c.id).find(id=>{const c=byId(id);if(!c||WMAP[id].lvl!=='CE1')return false;for(let k=0;k<6;k++){const q=c.g(1);if(q&&q.audio&&q.type==='text')return true;}return false;});
   if(!id)return {err:'aucun chapitre à question orale en CE1'};
   for(let k=0;k<20;k++){startMission([id],{level:1,n:8});if(M&&M.q&&M.q.audio)break;}
   if(!M||!M.q||!M.q.audio)return {err:'pas de question orale tirée',id};
   const before=!!document.querySelector('.qcard .qtext[lang]');const q=M.q;
   const lb=document.querySelector('[data-a="qlisten"]');if(lb)lb.click();await new Promise(r=>setTimeout(r,400));
   const shown=[...document.querySelectorAll('.qcard .qtext[lang]')].some(e=>e.textContent.trim()===String(q.audio.t).trim());
   const inp=document.querySelector('#in0');if(inp){inp.value=String(q.acc[0]);inp.dispatchEvent(new Event('input',{bubbles:true}));}
   document.querySelector('[data-a="valid"]')?.click();await new Promise(r=>setTimeout(r,50));
   return {id,hadListen:!!lb,before,shown,locked:!!(M&&M.locked),cur:CUR};});
  T('Dictée avec voix en échec : le texte à écrire devient lisible',!dict.err&&dict.hadListen&&!dict.before&&dict.shown,JSON.stringify(dict));
  T('Dictée avec voix en échec : l’enfant peut répondre et valider (progression non bloquée)',!dict.err&&dict.locked,JSON.stringify(dict));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
