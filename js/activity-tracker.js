/* MathQuest — journal détaillé d'activité pour le suivi parent.
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
function close(reason='done',extra={}){if(!CURR)return null;const t1=now(),ms=Math.max(0,Math.min(MAX_MS,t1-CURR.t0));if(ms>=1000){const x={id:CURR.id,t0:CURR.t0,t1,ms,kind:CURR.kind,ids:CURR.ids,grade:CURR.grade,subj:CURR.subj,reason:String(reason).slice(0,24),...CURR.meta,...extra};const log=ensure();log.push(x);if(log.length>MAX)log.splice(0,log.length-MAX);try{saveLocal();}catch(e){}}const out=CURR;CURR=null;return out;}
function active(){return CURR;}

// Cours.
if(typeof openLesson==='function'&&!openLesson.__activity){const base=openLesson;openLesson=function(id){begin('lesson',[id],{cid:String(id)});return base.apply(this,arguments);};openLesson.__activity=true;}
if(typeof endLesson==='function'&&!endLesson.__activity){const base=endLesson;endLesson=function(){const l=typeof L!=='undefined'&&L?{cid:L.id,ok:L.ok||0,total:typeof LESSON_QUIZ_N!=='undefined'?LESSON_QUIZ_N:0}:null;const r=base.apply(this,arguments);close('lesson-end',l||{});return r;};endLesson.__activity=true;}

// Exercices standards et parcours.
if(typeof startMission==='function'&&!startMission.__activity){const base=startMission;startMission=function(ids){begin('exercise',ids,{mixed:(ids||[]).length>1});return base.apply(this,arguments);};startMission.__activity=true;}
if(typeof endMission==='function'&&!endMission.__activity){const base=endMission;endMission=function(){const m=typeof M!=='undefined'&&M?{ok:M.ok||0,total:M.n||0,path:!!M.path,flash:!!M.flash}:{};const r=base.apply(this,arguments);close('exercise-end',m);return r;};endMission.__activity=true;}
if(typeof startFlash==='function'&&!startFlash.__activity){const base=startFlash;startFlash=function(w){const ids=w==='all'&&typeof SCH==='function'?SCH(S.subj).map(c=>c.id):(typeof WCH!=='undefined'&&WCH[w]?WCH[w].map(c=>c.id):[]);begin('flash',ids,{world:String(w)});return base.apply(this,arguments);};startFlash.__activity=true;}
if(typeof endFlash==='function'&&!endFlash.__activity){const base=endFlash;endFlash=function(){const m=typeof M!=='undefined'&&M?{ok:M.ok||0,total:M.i||0}:{};const r=base.apply(this,arguments);close('flash-end',m);return r;};endFlash.__activity=true;}

// Lecture de bibliothèque / ressources si ces entrées existent.
if(typeof openLibraryResource==='function'&&!openLibraryResource.__activity){const base=openLibraryResource;openLibraryResource=function(id){begin('reading',[],{resource:String(id)});return base.apply(this,arguments);};openLibraryResource.__activity=true;}

// Les changements d'écran terminent une séance abandonnée proprement, sans la perdre.
if(typeof home==='function'&&!home.__activity){const base=home;home=function(){if(CURR&&CURR.kind!=='interrogation')close('home');return base.apply(this,arguments);};home.__activity=true;}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&CURR)close('hidden');});
window.addEventListener('pagehide',()=>{if(CURR)close('pagehide');});
window.MQActivity={version:'1.0',ensure,begin,close,active};
ensure();
})();
