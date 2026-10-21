/* Finot Académie — journal détaillé d'activité pour le suivi parent.
   Enregistre les séances, sans modifier les récompenses ni la progression pédagogique. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof S==='undefined')return;
const MAX=3000,MAX_MS=4*60*60*1000;
let CURR=null;
function ensure(){if(!Array.isArray(S.activityLog))S.activityLog=[];return S.activityLog;}
function now(){return Date.now();}
function idsClean(ids){return [...new Set((ids||[]).map(String).filter(id=>typeof CHMAP!=='undefined'&&CHMAP[id]))].slice(0,20);}
function begin(kind,ids,meta={}){close('switch');const list=idsClean(ids);CURR={id:'a'+now().toString(36)+Math.random().toString(36).slice(2,6),t0:now(),kind:String(kind||'activity').slice(0,30),ids:list,grade:S.grade,subj:list[0]&&typeof WMAP!=='undefined'&&WMAP[list[0]]&&typeof sOf==='function'?sOf(WMAP[list[0]].id).id:'',meta:{...meta}};return CURR;}
function close(reason='done',extra={}){if(!CURR)return null;const t1=now(),ms=Math.max(0,Math.min(MAX_MS,t1-CURR.t0)),mustKeep=CURR.kind==='interrogation';if(ms>=1000||mustKeep){const x={id:CURR.id,t0:CURR.t0,t1,ms:mustKeep?Math.max(1,ms):ms,kind:CURR.kind,ids:CURR.ids,grade:CURR.grade,subj:CURR.subj,reason:String(reason).slice(0,24),...CURR.meta,...extra};const log=ensure();log.push(x);if(log.length>MAX)log.splice(0,log.length-MAX);try{saveLocal();}catch(e){}}const out=CURR;CURR=null;return out;}
function active(){return CURR;}

// Séances suivies par abonnement aux événements des fonctions cœur (js/app-hooks.js), sans les remplacer.
MQHooks.on('lesson:open',({id})=>begin('lesson',[id],{cid:String(id)}),{id:'activity'});
MQHooks.on('lesson:end',({l})=>close('lesson-end',l?{cid:l.id,ok:l.ok||0,total:typeof LESSON_QUIZ_N!=='undefined'?LESSON_QUIZ_N:0}:{}),{id:'activity'});
MQHooks.on('mission:start',({ids,opts})=>begin('exercise',ids,{mixed:(ids||[]).length>1,...(opts&&opts.level?{forcedDifficulty:+opts.level}:{})}),{id:'activity'});
MQHooks.on('mission:end',({m})=>close('exercise-end',{ok:m.ok||0,total:m.n||0,path:!!m.path,flash:false}),{id:'activity'});
MQHooks.on('flash:start',({w,ids})=>begin('flash',ids,{world:String(w)}),{id:'activity'});
MQHooks.on('flash:end',({m})=>close('flash-end',{ok:m.ok||0,total:m.i||0}),{id:'activity'});
// Retour à l'accueil : une séance abandonnée est close proprement, sans être perdue.
MQHooks.on('home:before',()=>{if(CURR&&CURR.kind!=='interrogation')close('home');},{id:'activity'});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&CURR)close('hidden');});
window.addEventListener('pagehide',()=>{if(CURR)close('pagehide');});
window.MQActivity={version:'1.1',ensure,begin,close,active};
ensure();
})();
