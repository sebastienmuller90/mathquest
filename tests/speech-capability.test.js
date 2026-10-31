/* Reconnaissance vocale : capacité centralisée et alternative pédagogique (31/10/2026).
   Trois situations : navigateur compatible (inchangé), navigateur sans reconnaissance, app Android native.
   Dans l'app Android V1, la reconnaissance est volontairement indisponible (pas de permission micro, pas de voix d'enfant
   envoyée à un service) MÊME si la WebView expose un constructeur webkitSpeechRecognition : on ne s'y fie jamais.
   Aucun exercice ne doit devenir impossible, aucun bouton inopérant ne doit être affiché, aucune reconnaissance n'est simulée. */
const {serve,launchEngine,seedProfile}=require('./lib');

const FAKE_NATIVE=()=>{window.__calls=[];window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'android',Plugins:{App:{addListener(){return Promise.resolve({remove(){}});},minimizeApp(){return Promise.resolve();}}}};};
// Constructeur présent mais inopérant (cas WebView) : compte les instanciations et getUserMedia.
const SPY=()=>{window.__srNew=0;window.__gum=0;const R=function(){window.__srNew++;this.start=()=>{setTimeout(()=>this.onerror&&this.onerror({error:'service-not-allowed'}),10);};this.abort=()=>{};};
 window.webkitSpeechRecognition=R;window.SpeechRecognition=R;
 try{if(navigator.mediaDevices){navigator.mediaDevices.getUserMedia=()=>{window.__gum++;return Promise.reject(new Error('denied'));};}}catch(e){}};
const NO_SR=()=>{try{Object.defineProperty(window,'webkitSpeechRecognition',{value:undefined,configurable:true,writable:true});Object.defineProperty(window,'SpeechRecognition',{value:undefined,configurable:true,writable:true});}catch(e){}};

async function ctxFor(b,url,inits){const ctx=await b.newContext({viewport:{width:412,height:915}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 for(const f of inits)await ctx.addInitScript(f);const p=await ctx.newPage();const errs=[],miss=[];p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{if(r.status()===404)miss.push(r.url());});
 // Dépôt servi tel quel : seul www/ contient finot-package.json (lu par l'app native) ; ce 404-là est attendu ici.
 p.on('console',m=>{if(m.type()==='error'&&!(/Failed to load resource/.test(m.text())&&miss.length&&miss.every(u=>/finot-package\.json$/.test(u))))errs.push('console: '+m.text());});
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'load'});await seedProfile(p,'Sami','5e');return {ctx,p,errs};}
// Ouvre un cours d'anglais du collège (prononciation obligatoire sur le web) et va à l'étape « pron ».
const toPron=p=>p.evaluate(()=>{const id=ALLCH.find(c=>/anglais/.test(sOf(WMAP[c.id].id).id)&&!isPrimaryCh(c.id)&&COURS[c.id]&&pronTargets(c.id).length>=2).id;openLesson(id);L.i=L.steps.findIndex(s=>s.k==='pron');renderLesson();
 const nx=document.querySelector('[data-a="lnext"]');return {id,targets:L.pronTargets.length,say:!!document.querySelector('[data-a="pronsay"]'),self:!!document.querySelector('[data-a="pronself"]'),listen:!!document.querySelector('[data-a="pronlisten"]'),blocked:!!(nx&&nx.disabled),text:document.querySelector('.pronbox').innerText};});

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launchEngine('chromium');
 try{
  // 1. Navigateur compatible : comportement actuel conservé
  {const {ctx,p,errs}=await ctxFor(b,url,[]);
   const st=await p.evaluate(()=>window.MQSpeechCapability?MQSpeechCapability.status():null);
   T('Web compatible : capacité « web-supported »',st&&st.mode==='web-supported'&&st.available===true,JSON.stringify(st));
   const pr=await toPron(p);
   T('Web compatible : l’étape prononciation garde le micro (🎤 Dire la phrase) et reste exigée au collège',pr.say&&!pr.self&&pr.blocked,JSON.stringify(pr).slice(0,300));
   await p.evaluate(()=>{ACT.home();finotOpen&&finotOpen();});await p.waitForTimeout(200);
   T('Web compatible : le bouton micro de Finot est présent',await p.evaluate(()=>!!document.querySelector('[data-a="finotvoice"]')));
   T('Web compatible : aucune erreur',!errs.length,errs.join(' | '));await ctx.close();}

  // 2. Navigateur sans reconnaissance
  {const {ctx,p,errs}=await ctxFor(b,url,[NO_SR]);
   const st=await p.evaluate(()=>MQSpeechCapability.status());
   T('Web incompatible : capacité « web-unsupported »',st.mode==='web-unsupported'&&st.available===false,JSON.stringify(st));
   const pr=await toPron(p);
   T('Web incompatible : alternative « écoute et répète » proposée, rien de bloqué, pas de bouton micro',!pr.say&&pr.self&&pr.listen&&!pr.blocked,JSON.stringify(pr).slice(0,300));
   T('Web incompatible : aucune erreur',!errs.length,errs.join(' | '));await ctx.close();}

  // 3. App Android native (constructeur exposé mais inopérant)
  {const {ctx,p,errs}=await ctxFor(b,url,[FAKE_NATIVE,SPY]);
   const st=await p.evaluate(()=>MQSpeechCapability.status());
   T('Android natif : capacité « native-unavailable » même si webkitSpeechRecognition existe',st.mode==='native-unavailable'&&st.available===false,JSON.stringify(st));
   const pr=await toPron(p);
   T('Android natif : pas de bouton micro inopérant ; écoute du modèle + « je répète » proposés',!pr.say&&pr.self&&pr.listen,JSON.stringify(pr).slice(0,300));
   T('Android natif : l’étape obligatoire du collège n’est jamais bloquée',!pr.blocked,JSON.stringify(pr).slice(0,200));
   T('Android natif : aucun texte ne prétend à une reconnaissance (pas de « reconnaissance », pas de pourcentage exigé)',!/74 %|reconnaissance|reconnu/i.test(pr.text),pr.text.slice(0,300));
   // Parcours de l'alternative : une validation par phrase, puis étape terminée sans mention « reconnues ».
   const done=await p.evaluate(async n=>{for(let i=0;i<n;i++){const bt=document.querySelector('[data-a="pronself"]');if(!bt)return {stuck:i};bt.click();await new Promise(r=>setTimeout(r,60));}
    return {passed:L.pronPassed,self:L.pronSelf,text:document.querySelector('.pronbox').innerText,next:!document.querySelector('[data-a="lnext"]').disabled};},pr.targets);
   T('Android natif : chaque phrase est écoutée et répétée puis l’étape se termine (« entraînement oral »), sans prétendre l’avoir reconnue',done.passed===true&&done.self===true&&done.next&&!/reconnu/i.test(done.text)&&/sans micro|à voix haute/i.test(done.text),JSON.stringify(done).slice(0,300));
   const ok=await p.evaluate(()=>{const before=L.i;ACT.lnext();return L.i>before;});
   T('Android natif : on passe à l’étape suivante du cours',ok);
   await p.evaluate(()=>{ACT.home();finotOpen&&finotOpen();});await p.waitForTimeout(200);
   const fin=await p.evaluate(()=>({mic:!!document.querySelector('[data-a="finotvoice"]')}));
   T('Android natif : pas de bouton micro dans la discussion avec Finot (les gros boutons restent)',!fin.mic,JSON.stringify(fin));
   if(!await p.evaluate(()=>!!window.MQReadingAloudPOC))await p.addScriptTag({url:url+'js/reading-aloud-poc.js'}); // POC non chargé par index.html
   const calls=await p.evaluate(async()=>{try{if(typeof ACT.finotvoice==='function')ACT.finotvoice();}catch(e){}
    const rec=MQAudio.createRecognizer('fr');const probe=await MQReadingAloudPOC.probeMicrophone();const caps=MQReadingAloudPOC.capabilities();
    return {srNew:window.__srNew,gum:window.__gum,rec:rec===null,probe,capsSR:caps.speechRecognition};});
   T('Android natif : aucun objet de reconnaissance créé, aucune demande de micro (getUserMedia), MQAudio et POC le savent',calls.srNew===0&&calls.gum===0&&calls.rec&&calls.probe&&calls.probe.ok===false&&calls.capsSR===false,JSON.stringify(calls));
   T('Android natif : aucune erreur JavaScript',!errs.length,errs.join(' | '));await ctx.close();}
 }finally{await b.close();srv.close();}
 return R;}
require('./lib').main(run);
