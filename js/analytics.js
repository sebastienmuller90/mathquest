/* Finot Académie — statistiques d'usage : interface abstraite, respectueuse de l'enfant (31/10/2026).
   MQAnalytics.track(event, properties) est l'unique point d'entrée. Par défaut il ne fait RIEN :
   - aucun fournisseur branché (provider « none ») ; un fournisseur s'ajoute par MQAnalytics.setProvider({id, send(e)}) ;
   - rien n'est transmis sans l'accord d'un parent, donné uniquement depuis l'espace parents (MQAnalytics.setConsent) ;
   - aucun identifiant (ni publicitaire, ni appareil, ni installation, ni session), aucune empreinte (ni agent, ni écran,
     ni langue), aucune donnée nominative ni texte libre : seuls des évènements connus et des propriétés de la liste
     blanche, de valeur simple et courte, passent ; l'horodatage est arrondi à l'heure.
   L'accord est stocké à part (finot_analytics_v1), jamais dans les profils ni dans la synchronisation.
   Une panne du fournisseur n'interrompt jamais l'app. */
(function(){
'use strict';
const KEY='finot_analytics_v1';
const EVENTS=new Set(['app_open','screen_view','lesson_completed','mission_completed','diagnostic_completed','dictation_completed','profile_created','parent_space_opened','sync_enabled','sync_disabled']);
const PROPS=new Set(['screen','subject','grade','stars','score','count','duration_s','platform','mode','level','result']);
let provider=null;
const read=()=>{try{const o=JSON.parse(localStorage.getItem(KEY)||'null');return o&&o.schema===1?o:{schema:1,consent:false};}catch(e){return {schema:1,consent:false};}};
const inParent=()=>{try{return typeof PARENT!=='undefined'&&PARENT===true;}catch(e){return false;}};
function enabled(){return !!(provider&&read().consent===true);}
function providerId(){return provider?provider.id:'none';}
function setProvider(p){provider=p&&typeof p.send==='function'?{id:String(p.id||'custom'),send:p.send}:null;}
function setConsent(v){if(!inParent()){const e=new Error('accord réservé à l’espace parents');e.code='parent-gate';throw e;}
 try{localStorage.setItem(KEY,JSON.stringify({schema:1,consent:!!v,at:Math.floor(Date.now()/3600000)*3600000}));}catch(e){}}
function sanitize(props){const out={};if(!props||typeof props!=='object')return out;
 for(const [k,v] of Object.entries(props)){if(!PROPS.has(k))continue;
  if(typeof v==='number'&&Number.isFinite(v))out[k]=Math.round(v*100)/100;
  else if(typeof v==='boolean')out[k]=v;
  else if(typeof v==='string'&&v.length<=24&&/^[\w.\- éèàùç]*$/i.test(v))out[k]=v;}
 return out;}
function track(event,props){
 if(!EVENTS.has(event)||!enabled())return false;
 const e={event,props:sanitize(props),t:Math.floor(Date.now()/3600000)*3600000};
 try{provider.send(e);}catch(err){return false;}
 return true;}
window.MQAnalytics=Object.freeze({track,enabled,providerId,setProvider,setConsent,EVENTS:Object.freeze([...EVENTS]),PROPS:Object.freeze([...PROPS])});
})();
