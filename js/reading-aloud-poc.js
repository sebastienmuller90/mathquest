/* Finot Académie — POC lecture à voix haute.
   Ce module NE NOTE PAS l'enfant. Il vérifie seulement les capacités techniques du navigateur.
   Aucun accès micro au chargement, aucun audio enregistré dans la sauvegarde, aucune reconnaissance lancée sans appel explicite. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof navigator==='undefined')return;
function installed(){try{return !!navigator.standalone||!!matchMedia('(display-mode: standalone)').matches;}catch(e){return false;}}
function capabilities(){const SR=root.SpeechRecognition||root.webkitSpeechRecognition;return {
 secure:!!root.isSecureContext,
 mediaDevices:!!navigator.mediaDevices,
 getUserMedia:typeof navigator.mediaDevices?.getUserMedia==='function',
 mediaRecorder:typeof root.MediaRecorder==='function',
 speechRecognition:typeof SR==='function',
 speechRecognitionCtor:SR||null,
 localAvailability:typeof SR?.available==='function',
 localInstall:typeof SR?.install==='function',
 installed:installed(),
 online:navigator.onLine!==false,
 language:String(navigator.language||''),
 platform:String(navigator.platform||''),
 ua:String(navigator.userAgent||'')
 };}
async function probeMicrophone(){const c=capabilities();if(!c.secure)return {ok:false,reason:'insecure-context'};if(!c.getUserMedia)return {ok:false,reason:'getusermedia-unavailable'};let stream=null;try{stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});const tracks=stream?.getAudioTracks?.()||stream?.getTracks?.()||[];const live=tracks.some(t=>!t.readyState||t.readyState==='live');return {ok:!!tracks.length&&live,reason:tracks.length?'ok':'no-audio-track',tracks:tracks.length};}catch(e){return {ok:false,reason:String(e?.name||'microphone-error'),message:String(e?.message||'')};}finally{try{stream?.getTracks?.().forEach(t=>t.stop());}catch(e){}}}
async function probeRecognition(opts={}){const c=capabilities(),Ctor=c.speechRecognitionCtor;if(!c.secure)return {supported:false,started:false,reason:'insecure-context'};if(!Ctor)return {supported:false,started:false,reason:'speech-recognition-unavailable'};const timeout=Math.max(300,Math.min(5000,+opts.timeout||1800));return new Promise(resolve=>{let done=false,timer=null,rec=null;const end=x=>{if(done)return;done=true;clearTimeout(timer);try{rec?.abort?.();}catch(e){}resolve(x);};try{rec=new Ctor();rec.lang=opts.lang||'fr-FR';rec.continuous=false;rec.interimResults=false;rec.maxAlternatives=1;rec.onstart=()=>end({supported:true,started:true,reason:'started'});rec.onerror=e=>end({supported:true,started:false,reason:String(e?.error||'recognition-error'),message:String(e?.message||'')});rec.onnomatch=()=>end({supported:true,started:true,reason:'no-match'});timer=setTimeout(()=>end({supported:true,started:false,reason:'start-timeout'}),timeout);rec.start();}catch(e){end({supported:true,started:false,reason:String(e?.name||'start-error'),message:String(e?.message||'')});}});}
async function localFrenchAvailability(){const Ctor=(root.SpeechRecognition||root.webkitSpeechRecognition);if(typeof Ctor?.available!=='function')return {supported:false,status:'unknown'};try{const status=await Ctor.available({langs:['fr-FR'],processLocally:true});return {supported:true,status:String(status)};}catch(e){return {supported:true,status:'error',reason:String(e?.name||e)};}}
function verdict({caps=capabilities(),micro=null,recognition=null,local=null}={}){if(!caps.secure)return {mode:'unsupported',reason:'secure-context-required'};if(!caps.getUserMedia)return {mode:'unsupported',reason:'microphone-api-unavailable'};if(micro&&micro.ok===false)return {mode:'unsupported',reason:'microphone-'+micro.reason};if(!caps.speechRecognition)return {mode:'record-only',reason:'speech-recognition-unavailable'};if(recognition&&recognition.started===false)return {mode:'record-only',reason:'speech-recognition-'+recognition.reason};if(recognition?.started)return {mode:'experimental',reason:local?.status==='available'?'recognition-started-local-available':'recognition-started-needs-real-voice-validation'};return {mode:'experimental',reason:'recognition-present-not-probed'};}
function normalizeText(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘`´]/g,"'").replace(/[^a-z0-9à-ÿ' -]/gi,' ').replace(/\s+/g,' ').trim();}
function wordStats(reference,transcript){const a=normalizeText(reference).split(' ').filter(Boolean),b=normalizeText(transcript).split(' ').filter(Boolean);const dp=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)dp[i][0]=i;for(let j=0;j<=b.length;j++)dp[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);const edits=dp[a.length][b.length],wer=a.length?edits/a.length:0;return {referenceWords:a.length,recognizedWords:b.length,edits,wer,similarity:a.length?Math.max(0,Math.round((1-wer)*100)):0};}
root.MQReadingAloudPOC={version:'0.1-poc',capabilities,probeMicrophone,probeRecognition,localFrenchAvailability,verdict,normalizeText,wordStats,privacy:{automaticMicrophone:false,storesAudio:false,uploadsAudio:false,gradesChild:false}};
})(typeof window!=='undefined'?window:globalThis);
