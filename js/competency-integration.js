/* MathQuest — raccord micro-compétences aux évaluations parent et sauvegarde. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
function ensureSeen(){if(!Array.isArray(S.competencyEvalSeen))S.competencyEvalSeen=[];return S.competencyEvalSeen;}
function beforeIQ(){const a=S.interrogations?.active;if(!a||!Array.isArray(a.questions))return null;const i=a.i||0,it=a.questions[i];return it?{id:a.id,i,it}:{id:a.id,i,it:null};}
function outcome(ref){if(!ref)return null;let a=S.interrogations?.active;if(a?.id===ref.id&&Array.isArray(a.answers)&&a.answers[ref.i])return a.answers[ref.i];const h=(S.interrogations?.history||[]).find(x=>x?.id===ref.id);return h?.answers?.[ref.i]||null;}
function recordIQ(ref){if(!ref?.it||!window.MQCompetency)return;const key=ref.id+':'+ref.i,seen=ensureSeen();if(seen.includes(key))return;const out=outcome(ref);if(!out||typeof out.ok!=='boolean')return;const it=ref.it,q=it.q||{},r=MQCompetency.record(S,it.cid,!!out.ok,{source:'interrogation',d:it.d||2,q,hint:false,kind:q?._mq?.skillKind});seen.push(key);if(seen.length>300)seen.splice(0,seen.length-300);try{MQAdaptive.refreshMastery(S,it.cid);}catch(e){}try{saveLocal();schedSync?.(400);}catch(e){}return r;}
for(const k of ['iqpick','iqvalid'])if(typeof ACT[k]==='function'&&!ACT[k].__mqComp){const base=ACT[k];const wrap=function(){const ref=beforeIQ(),r=base.apply(this,arguments);try{recordIQ(ref);}catch(e){console.warn('[MathQuest competency] interrogation',e);}return r;};wrap.__mqComp=true;ACT[k]=wrap;}
window.MQCompetencyIntegration={version:'1.0',recordIQ};
})();
