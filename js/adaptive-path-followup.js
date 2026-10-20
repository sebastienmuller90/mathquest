/* MathQuest — parcours quotidien orienté par maîtrise et micro-compétences. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof makeDailyPath!=='function'||typeof pathCandidates!=='function')return;
const base=makeDailyPath,baseEnsure=typeof ensurePath==='function'?ensurePath:null;
function score(state,cid,date){let s=0;try{s+=(100-MQAdaptive.mastery(state,cid))*.7;}catch(e){}try{if(window.MQCompetency)s+=MQCompetency.chapterNeed(state,cid)*.55;}catch(e){}try{if(MQAdaptive.isDue(state,cid))s+=28;}catch(e){}if(!state.lessons?.[cid])s+=12;for(const h of (state.pathHist||[]).slice(-7)){if((h.steps||[]).some(x=>x.cid===cid))s-=18;}let h=2166136261;for(const c of String(date)+'|'+cid){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}s+=(h>>>0)%11/10;return s;}
function adapt(state,p,date){if(!p||!Array.isArray(p.steps))return p;const by=pathCandidates(state.grade),used=new Set();for(const step of p.steps.filter(x=>x.kind==='lesson')){const pool=(by[step.subj]||[]).filter(id=>!used.has(id));if(!pool.length)continue;pool.sort((a,b)=>score(state,b,date)-score(state,a,date));step.cid=pool[0];used.add(step.cid);}
 const ids=p.steps.filter(x=>x.kind==='lesson').map(x=>x.cid);for(const step of p.steps.filter(x=>x.kind==='exo'))step.ids=ids.slice();p.adaptive=true;p.adaptiveReason='maîtrise + micro-compétences + révisions dues';return p;}
makeDailyPath=function(state,date,seedKey){return adapt(state,base(state,date,seedKey),date);};
function untouched(p){return !!p&&Array.isArray(p.steps)&&p.steps.every(s=>s&&(+s.ms||0)===0&&s.score==null&&(!Array.isArray(s.answers)||s.answers.length===0)&&(s.status==='next'||s.status==='locked'));}
function upgradeCurrentPath(p,redraw=false){try{if(typeof S==='undefined'||typeof dstr!=='function')return p;const d=dstr(Date.now());if(!p||p.date!==d||p.adaptive||!untouched(p))return p;S.path=makeDailyPath(S,d,typeof ACTIVE!=='undefined'?ACTIVE:'default');if(typeof saveLocal==='function')saveLocal();if(redraw&&typeof home==='function')setTimeout(()=>{try{if(typeof CUR==='undefined'||!CUR||CUR==='home')home();}catch(e){}},0);return S.path;}catch(e){console.warn('[MathQuest adaptive path] reprise',e);return p;}}
// Tout appel futur à ensurePath (notamment après activateProfile) met à niveau un ancien parcours vierge du jour.
if(baseEnsure)ensurePath=function(){const p=baseEnsure.apply(this,arguments);return upgradeCurrentPath(p,false);};
function upgradeInitialPath(){const before=typeof S!=='undefined'?S.path:null,after=upgradeCurrentPath(before,true);return !!after&&after!==before;}
window.MQAdaptivePath={version:'1.2',score,adapt,untouched,upgradeCurrentPath,upgradeInitialPath};
upgradeInitialPath();
})();
