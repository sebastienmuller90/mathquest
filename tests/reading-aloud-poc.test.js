/* POC lecture à voix haute — aucune permission automatique, détection progressive et confidentialité. */
const {serve,launch}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});const {srv,url}=await serve();const b=await launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{window.__gumCalls=0;window.__stops=0;Object.defineProperty(navigator,'mediaDevices',{configurable:true,value:{getUserMedia:async()=>{window.__gumCalls++;return {getAudioTracks:()=>[{readyState:'live',stop:()=>window.__stops++}],getTracks:()=>[{readyState:'live',stop:()=>window.__stops++}]};}}});delete window.SpeechRecognition;delete window.webkitSpeechRecognition;});await p.addScriptTag({url:url+'js/reading-aloud-poc.js'});
  const passive=await p.evaluate(()=>({api:!!MQReadingAloudPOC,calls:__gumCalls,privacy:MQReadingAloudPOC.privacy,caps:MQReadingAloudPOC.capabilities()}));
  T('Chargement passif : aucune demande micro et aucune note/audio stocké',passive.api&&passive.calls===0&&!passive.privacy.automaticMicrophone&&!passive.privacy.storesAudio&&!passive.privacy.uploadsAudio&&!passive.privacy.gradesChild,JSON.stringify(passive));

  const mic=await p.evaluate(()=>MQReadingAloudPOC.probeMicrophone().then(r=>({r,calls:__gumCalls,stops:__stops})));
  T('Sonde micro explicite : piste détectée puis toujours arrêtée',mic.r.ok&&mic.calls===1&&mic.stops===1,JSON.stringify(mic));

  const noSpeech=await p.evaluate(()=>({rec:MQReadingAloudPOC.capabilities().speechRecognition,verdict:MQReadingAloudPOC.verdict({caps:MQReadingAloudPOC.capabilities(),micro:{ok:true}})}));
  T('Reconnaissance absente : mode record-only, jamais une fausse note',!noSpeech.rec&&noSpeech.verdict.mode==='record-only',JSON.stringify(noSpeech));

  await p.evaluate(()=>{window.SpeechRecognition=class{start(){setTimeout(()=>this.onstart?.(),5)}abort(){}};});await p.addScriptTag({url:url+'js/reading-aloud-poc.js'});const started=await p.evaluate(async()=>{const recognition=await MQReadingAloudPOC.probeRecognition({timeout:500});return {recognition,verdict:MQReadingAloudPOC.verdict({caps:MQReadingAloudPOC.capabilities(),micro:{ok:true},recognition})};});
  T('Reconnaissance démarrable : statut experimental, pas production-ready',started.recognition.started&&started.verdict.mode==='experimental',JSON.stringify(started));

  await p.evaluate(()=>{window.SpeechRecognition=class{start(){setTimeout(()=>this.onerror?.({error:'service-not-allowed',message:'no service'}),5)}abort(){}};});await p.addScriptTag({url:url+'js/reading-aloud-poc.js'});const refused=await p.evaluate(async()=>{const recognition=await MQReadingAloudPOC.probeRecognition({timeout:500});return {recognition,verdict:MQReadingAloudPOC.verdict({caps:MQReadingAloudPOC.capabilities(),micro:{ok:true},recognition})};});
  T('API exposée mais service refusé : repli record-only',!refused.recognition.started&&refused.recognition.reason==='service-not-allowed'&&refused.verdict.mode==='record-only',JSON.stringify(refused));

  const words=await p.evaluate(()=>({same:MQReadingAloudPOC.wordStats('Le petit chat dort.','Le petit chat dort'),one:MQReadingAloudPOC.wordStats('Le petit chat dort','Le petit chat') }));
  T('Mesure expérimentale : normalisation ponctuation/accents et distance de mots cohérentes',words.same.similarity===100&&words.same.edits===0&&words.one.edits===1&&words.one.similarity<100,JSON.stringify(words));
  T('Aucune erreur JavaScript dans le POC vocal',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}return R;}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
