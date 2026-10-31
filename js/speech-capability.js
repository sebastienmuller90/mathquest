/* Finot Académie — capacité de reconnaissance vocale, en un seul endroit (31/10/2026).
   Trois situations distinctes :
   - « web-supported »      : navigateur avec SpeechRecognition / webkitSpeechRecognition → comportement historique ;
   - « web-unsupported »    : navigateur sans reconnaissance → alternatives sans micro ;
   - « native-unavailable » : app Android (Capacitor). Volontairement indisponible en V1, même si la WebView expose un
     constructeur : il y échoue (pas de permission micro, service non garanti) et une voix d'enfant ne doit pas partir vers
     un service non caractérisé. Aucune reconnaissance n'est jamais simulée.
   Tous les modules (cours, Finot, moteur audio, POC lecture à voix haute) passent par MQSpeechCapability.Recognition(),
   qui renvoie le constructeur seulement si la reconnaissance est réellement utilisable, sinon null. */
(function(){
'use strict';
const ctor=()=>(typeof window!=='undefined'&&(window.SpeechRecognition||window.webkitSpeechRecognition))||null;
const native=()=>!!(typeof window!=='undefined'&&window.MQPlatform&&MQPlatform.isNative);
function status(){
 if(native())return {mode:'native-unavailable',available:false};
 return ctor()?{mode:'web-supported',available:true}:{mode:'web-unsupported',available:false};}
function available(){return status().available;}
function Recognition(){return available()?ctor():null;}
// Le micro (getUserMedia) n'est demandé que là où la reconnaissance est utilisable.
function microphoneAllowed(){return !native();}
window.MQSpeechCapability=Object.freeze({status,available,Recognition,microphoneAllowed});
})();
