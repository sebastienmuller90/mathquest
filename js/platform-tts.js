/* Finot Académie — synthèse vocale native dans l'app Android (31/10/2026).
   La WebView Android n'implémente pas window.speechSynthesis : sans ce module, dictées, consignes lues et langues vivantes
   seraient muettes dans l'app native. On fournit donc speechSynthesis / SpeechSynthesisUtterance (même interface que le web)
   au-dessus du moteur TTS d'Android (plugin Capacitor « TextToSpeech »). Le moteur audio existant (js/audio-engine.js) n'est
   pas modifié : il choisit ses voix et découpe ses phrases exactement comme en web.
   Ne fait rien en web, ni si le navigateur fournit déjà speechSynthesis. Chargé avant js/audio-engine.js. */
(function(){
'use strict';
const P=window.MQPlatform;
if(!P||!P.isNative||window.speechSynthesis)return;
const TTS=P.plugin('TextToSpeech');
if(!TTS||typeof TTS.speak!=='function')return;

let voices=[];
const synthListeners={};
function Utterance(text){this.text=String(text==null?'':text);this.lang='';this.voice=null;this.rate=1;this.pitch=1;this.volume=1;
 this.onstart=null;this.onend=null;this.onerror=null;this.onboundary=null;this.onpause=null;this.onresume=null;this.onmark=null;this._l={};}
Utterance.prototype.addEventListener=function(t,f){(this._l[t]=this._l[t]||[]).push(f);};
Utterance.prototype.removeEventListener=function(t,f){const a=this._l[t]||[];const i=a.indexOf(f);if(i>=0)a.splice(i,1);};
function fire(u,type,extra){const ev=Object.assign({type,utterance:u,charIndex:0,elapsedTime:0},extra||{});
 try{if(typeof u['on'+type]==='function')u['on'+type](ev);}catch(e){console.error(e);}
 (u._l&&u._l[type]||[]).slice().forEach(f=>{try{f(ev);}catch(e){console.error(e);}});}
function fireSynth(type){const ev={type};try{if(typeof synth['on'+type]==='function')synth['on'+type](ev);}catch(e){}(synthListeners[type]||[]).slice().forEach(f=>{try{f(ev);}catch(e){}});}

const queue=[];let current=null,gen=0;
const num=(v,d,lo,hi)=>{v=Number(v);return Number.isFinite(v)?Math.max(lo,Math.min(hi,v)):d;};
function next(){
 const u=queue.shift();if(!u){current=null;return;}
 current=u;const tok=++gen;
 const opts={text:u.text,lang:u.lang||(u.voice&&u.voice.lang)||'fr-FR',rate:num(u.rate,1,.1,10),pitch:num(u.pitch,1,0,2),volume:num(u.volume,1,0,1)};
 if(u.voice){const i=voices.findIndex(v=>v.voiceURI===u.voice.voiceURI||v.name===u.voice.name);if(i>=0)opts.voice=i;}
 fire(u,'start');
 Promise.resolve().then(()=>{if(tok!==gen)return null;return TTS.speak(opts);})
  .then(()=>{if(tok!==gen)return;current=null;fire(u,'end');next();},
        err=>{if(tok!==gen)return;current=null;fire(u,'error',{error:'synthesis-failed',message:String(err&&err.message||err)});next();});}

const synth={
 get speaking(){return !!current;},get pending(){return queue.length>0;},paused:false,onvoiceschanged:null,
 getVoices(){return voices.slice();},
 speak(u){if(!u||typeof u.text!=='string')return;queue.push(u);if(!current)next();},
 cancel(){gen++;const pending=queue.splice(0),c=current;current=null;
  try{Promise.resolve(TTS.stop()).catch(()=>{});}catch(e){}
  if(c)fire(c,'error',{error:'interrupted'});pending.forEach(x=>fire(x,'error',{error:'canceled'}));},
 pause(){},resume(){},
 addEventListener(t,f){(synthListeners[t]=synthListeners[t]||[]).push(f);},
 removeEventListener(t,f){const a=synthListeners[t]||[];const i=a.indexOf(f);if(i>=0)a.splice(i,1);}};

function loadVoices(){if(typeof TTS.getSupportedVoices!=='function')return;
 Promise.resolve(TTS.getSupportedVoices()).then(r=>{const list=(r&&r.voices)||[];
  voices=list.map(v=>Object.freeze({name:String(v.name||v.voiceURI||''),lang:String(v.lang||'').replace('_','-'),voiceURI:String(v.voiceURI||v.name||''),localService:v.localService!==false,default:!!v.default}));
  fireSynth('voiceschanged');}).catch(()=>{});}

try{Object.defineProperty(window,'SpeechSynthesisUtterance',{value:Utterance,configurable:true,writable:true});}catch(e){window.SpeechSynthesisUtterance=Utterance;}
try{Object.defineProperty(window,'speechSynthesis',{value:synth,configurable:true,writable:true});}catch(e){window.speechSynthesis=synth;}
loadVoices();
// Une voix installée pendant que l'app était en arrière-plan apparaît à la reprise.
if(window.MQHooks)MQHooks.on('platform:resume',loadVoices,{id:'platform-tts-voices'});
})();
