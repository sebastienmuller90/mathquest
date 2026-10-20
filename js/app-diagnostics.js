/* MathQuest — diagnostic de développement (20/10/2026). Chargé juste après js/app-hooks.js pour capter les premières erreurs.
   - Les erreurs JavaScript (window.error) et promesses rejetées non gérées (unhandledrejection) sont gardées dans un
     tampon local limité (30 entrées, localStorage 'mathquest_debug_v1') : message, fichier, ligne — jamais de nom, de
     réponse ni de contenu de profil.
   - MQDiag() (console du navigateur) résume : version, profil actif (identifiant technique), classe, écran, service
     worker, état du stockage, abonnements MQHooks et leurs erreurs, minuteries connues, dernières erreurs. */
(function(root){
'use strict';
const KEY='mathquest_debug_v1',MAX=30;let buf=[];
try{buf=JSON.parse(localStorage.getItem(KEY)||'[]');if(!Array.isArray(buf))buf=[];}catch(e){buf=[];}
// Chemins réduits au nom de fichier (pas d'URL complète), textes tronqués.
const short=s=>String(s==null?'':s).replace(/https?:\/\/\S*\/([^\/\s?#)]+)/g,'$1').slice(0,200);
function push(kind,msg,src,line){buf.push({t:Date.now(),kind,msg:short(msg),src:short(src),line:+line||0});if(buf.length>MAX)buf.splice(0,buf.length-MAX);try{localStorage.setItem(KEY,JSON.stringify(buf));}catch(e){}}
root.addEventListener('error',e=>{if(e&&e.message)push('error',e.message,e.filename,e.lineno);});
root.addEventListener('unhandledrejection',e=>{const r=e&&e.reason;push('rejection',r&&(r.message||r)||'promesse rejetée','',0);});
function val(f){try{return f();}catch(e){return null;}}
root.MQDiag=function(){return {
 version:root.MQ_APP_VERSION||'développement',
 profil:val(()=>ACTIVE),classe:val(()=>S.grade),ecran:val(()=>CUR),
 serviceWorker:!!(navigator.serviceWorker&&navigator.serviceWorker.controller),
 stockage:root.MQ_STORAGE_STATUS||null,registre:root.MQ_REGISTRY_AUDIT||null,
 hooks:root.MQHooks?MQHooks.list():{},erreursHooks:root.MQHooks?MQHooks.errors():[],
 minuteries:{defiEclair:!!val(()=>M&&M.tick),synchronisation:!!val(()=>S.sync&&S.sync.child)},
 erreurs:buf.slice(-10)};};
root.MQDiag.errors=()=>buf.slice();
root.MQDiag.clear=()=>{buf=[];try{localStorage.removeItem(KEY);}catch(e){}};
})(window);
