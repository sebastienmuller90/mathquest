/* Finot Académie — profil déclaré -> parcours du jour.
   Le questionnaire choisit légèrement les matières des créneaux variables ;
   le chapitre précis reste choisi par le moteur adaptatif réel (maîtrise, compétences, révisions). */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined')return;
function chooseCid(state,sid,date){try{const ids=(pathCandidates(state.grade)[sid]||[]).slice();if(!ids.length)return null;ids.sort((a,b)=>{const sa=window.MQAdaptivePath?.score?MQAdaptivePath.score(state,a,date):(100-MQAdaptive.mastery(state,a)),sb=window.MQAdaptivePath?.score?MQAdaptivePath.score(state,b,date):(100-MQAdaptive.mastery(state,b));return sb-sa;});return ids[0]||null;}catch(e){return null;}}
function adapt(p,{state,date}={}){const lp=state?.learnerProfile;if(!p||!Array.isArray(p.steps)||!lp?.initialPlan)return p;const lessons=p.steps.filter(x=>x.kind==='lesson'),exos=p.steps.filter(x=>x.kind==='exo');if(!lessons.length)return p;
 const priorities=(lp.difficultSubjects||[]).filter(s=>pathCandidates(state.grade)[s]?.length),comfort=(lp.favoriteSubjects||[]).filter(s=>pathCandidates(state.grade)[s]?.length&&!priorities.includes(s));
 const present=()=>new Set(lessons.map(x=>x.subj));
 function replaceWith(sid,tag){if(present().has(sid))return false;let target=lessons.find(x=>!priorities.includes(x.subj)&&!/(^|-)maths$|(^|-)francais$/.test(x.subj));if(!target)return false;const cid=chooseCid(state,sid,date);if(!cid)return false;target.subj=sid;target.cid=cid;target.learnerDeclared=tag;return true;}
 // Un créneau variable maximum pour une difficulté déclarée, puis éventuellement un pour une matière plaisir.
 if(priorities[0])replaceWith(priorities[0],'priority');
 if(comfort[0])replaceWith(comfort[0],'comfort');
 const pri=new Set(priorities),fav=new Set(comfort);for(const s of lessons)if(!s.learnerDeclared)s.learnerDeclared=pri.has(s.subj)?'priority':fav.has(s.subj)?'comfort':'';
 lessons.sort((a,b)=>{const w=x=>x.learnerDeclared==='priority'?-1:x.learnerDeclared==='comfort'?1:0;return w(a)-w(b);});
 const ids=lessons.map(x=>x.cid);for(const e of exos)e.ids=ids.slice();p.steps=[...lessons,...exos];p.learnerProfileApplied=true;p.learnerProfileReason='questionnaire léger + choix précis par maîtrise/compétences/révisions';return p;}
MQHooks.on('path:built',(p,ctx)=>adapt(p,ctx),{id:'learner-profile-path',order:160});
root.MQLearnerProfilePath={version:'1.0',adapt,chooseCid};
})(typeof window!=='undefined'?window:globalThis);
