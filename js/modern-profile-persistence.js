/* Finot Académie — conservation du profil premium lors des opérations historiques. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object'||typeof S==='undefined')return;
const validSubjects=grade=>new Set((typeof SUBJECTS!=='undefined'?SUBJECTS:[]).filter(s=>s.worlds?.some(w=>w.lvl===grade)).map(s=>s.id));
function normalizeExtras(){if(!S.companion)S.companion=S.avatar==='🦉'?'momo':S.avatar==='🐰'?'leo':'finot';if(!S.learnerProfile||typeof S.learnerProfile!=='object'||Array.isArray(S.learnerProfile))return;const ok=validSubjects(S.grade),lp=S.learnerProfile;lp.favoriteSubjects=(lp.favoriteSubjects||[]).filter(x=>ok.has(x));lp.difficultSubjects=(lp.difficultSubjects||[]).filter(x=>ok.has(x));if(lp.initialPlan){lp.initialPlan.prioritySubjects=(lp.initialPlan.prioritySubjects||[]).filter(x=>ok.has(x));lp.initialPlan.comfortSubjects=(lp.initialPlan.comfortSubjects||[]).filter(x=>ok.has(x));}}
const oldReset=ACT.reset;
if(typeof oldReset==='function')ACT.reset=function(arg,el){const confirmed=!!el?.dataset?.armed,keep={gender:S.gender||'',companion:S.companion||'finot',learnerProfile:S.learnerProfile?clone(S.learnerProfile):null};oldReset(arg,el);if(confirmed){S.gender=keep.gender;S.companion=keep.companion;if(keep.learnerProfile)S.learnerProfile=keep.learnerProfile;normalizeExtras();save();}};
const oldLearn=ACT.learnsave;
if(typeof oldLearn==='function')ACT.learnsave=function(...args){const before=S.grade;oldLearn(...args);normalizeExtras();if(before!==S.grade&&S.learnerProfile){S.learnerProfile.diagnosticRecommended=true;S.learnerProfile.gradeChangedAt=Date.now();S.path=null;save();}return;};
MQHooks.on('profile:changed',()=>normalizeExtras(),{id:'modern-profile-persistence',order:5});
normalizeExtras();
window.MQProfilePersistence={version:'1.1',normalizeExtras};
})();
