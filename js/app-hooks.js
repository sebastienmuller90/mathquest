/* Finot Académie — points d'extension explicites (20/10/2026, stabilisation).
   Les fonctions cœur (startMission, nextQ, result, lvalidate, renderQ, renderLesson, endMission, ensurePath,
   activateProfile, finotAsk…) restent définies une seule fois dans leur module propriétaire et émettent des
   événements ; les fonctionnalités additionnelles s'y abonnent au lieu de remplacer la fonction globale.
   Chargé avant tous les modules qui s'abonnent. Aucune dépendance.

   MQHooks.on(evt, fn, {id, order})  abonnement idempotent : un même id remplace l'abonnement précédent
                                     (recharger un module ne double jamais un traitement). order croissant.
   MQHooks.emit(evt, payload)        notification : chaque abonné est appelé, une erreur n'arrête pas les autres.
   MQHooks.filter(evt, value, ctx)   transformation en chaîne : un abonné qui renvoie autre chose qu'undefined
                                     remplace la valeur transmise aux suivants.
   MQHooks.first(evt, payload)       premier abonné qui renvoie true « prend » l'événement (intentions de Finot).

   Événements : question:generated (filter), mission:question (filter), question:after-render, lesson:rendered,
   answer:after, mission:start, mission:end, flash:start, flash:end, lesson:open, lesson:end, profile:changed,
   path:built (filter), path:ensure (filter), path:rendered, finot:intent (first), finot:message, finot:chips,
   sync:action (first), home:rendered. */
(function(root){
'use strict';
const H=Object.create(null),ERR=[],ERR_MAX=30;
function report(evt,id,e){const m=String(e&&e.message||e).slice(0,200);ERR.push({t:Date.now(),evt,id,m});if(ERR.length>ERR_MAX)ERR.shift();try{console.error('[MQHooks] '+evt+' / '+id,e);}catch(_){}}
function on(evt,fn,opts){if(typeof fn!=='function')throw new TypeError('MQHooks.on : fonction attendue');
 const o=typeof opts==='string'?{id:opts}:(opts||{}),id=String(o.id||fn.name||('anon'+Math.random().toString(36).slice(2))),order=Number.isFinite(+o.order)?+o.order:100;
 const list=H[evt]||(H[evt]=[]),i=list.findIndex(x=>x.id===id),e={id,fn,order,seq:i>=0?list[i].seq:on.seq++};
 if(i>=0)list[i]=e;else list.push(e);list.sort((a,b)=>a.order-b.order||a.seq-b.seq);return ()=>off(evt,id);}
on.seq=0;
function off(evt,id){const list=H[evt];if(!list)return false;const i=list.findIndex(x=>x.id===id);if(i<0)return false;list.splice(i,1);return true;}
function emit(evt,payload){const list=H[evt];if(!list)return;for(const x of list.slice()){try{x.fn(payload);}catch(e){report(evt,x.id,e);}}}
function filter(evt,value,ctx){const list=H[evt];if(!list)return value;for(const x of list.slice()){try{const r=x.fn(value,ctx);if(r!==undefined)value=r;}catch(e){report(evt,x.id,e);}}return value;}
function first(evt,payload){const list=H[evt];if(!list)return false;for(const x of list.slice()){try{if(x.fn(payload)===true)return true;}catch(e){report(evt,x.id,e);}}return false;}
function list(){const o={};for(const k of Object.keys(H))o[k]=H[k].map(x=>x.id);return o;}
function has(evt,id){return !!(H[evt]&&H[evt].some(x=>x.id===id));}
root.MQHooks={version:'1.0',on,off,emit,filter,first,list,has,errors:()=>ERR.slice()};
})(typeof window!=='undefined'?window:globalThis);
