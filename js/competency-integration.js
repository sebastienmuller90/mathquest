/* Finot Académie — raccord micro-compétences aux évaluations parent et sauvegarde. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
// Les matières du primaire utilisent des identifiants préfixés. Elles héritent des mêmes modèles pédagogiques.
const ALIAS={'p-maths':'maths','p-francais':'francais','p-anglais':'anglais','p-hg':'hg','p-emc':'emc','p-sciences':'svt','p-qm':'svt','p-tech':'tech','p-arts':'arts','p-musique':'musique','p-eps':'eps','p-evars':'evars'};
if(window.MQCompetency)for(const [a,b] of Object.entries(ALIAS))if(MQCompetency.templates[b])MQCompetency.templates[a]=MQCompetency.templates[b];
if(window.MQQuestionBanks?.bySubject)for(const [a,b] of Object.entries(ALIAS))if(MQQuestionBanks.bySubject[b])MQQuestionBanks.bySubject[a]=MQQuestionBanks.bySubject[b];
function ensureSeen(){if(!Array.isArray(S.competencyEvalSeen))S.competencyEvalSeen=[];return S.competencyEvalSeen;}
function beforeIQ(){const a=S.interrogations?.active;if(!a||!Array.isArray(a.questions))return null;const i=a.i||0,it=a.questions[i];return it?{id:a.id,i,it}:{id:a.id,i,it:null};}
function outcome(ref){if(!ref)return null;let a=S.interrogations?.active;if(a?.id===ref.id&&Array.isArray(a.answers)&&a.answers[ref.i])return a.answers[ref.i];const h=(S.interrogations?.history||[]).find(x=>x?.id===ref.id);return h?.answers?.[ref.i]||null;}
function recordIQ(ref){if(!ref?.it||!window.MQCompetency)return;const key=ref.id+':'+ref.i,seen=ensureSeen();if(seen.includes(key))return;const out=outcome(ref);if(!out||typeof out.ok!=='boolean')return;const it=ref.it,q=it.q||{},r=MQCompetency.record(S,it.cid,!!out.ok,{source:'interrogation',d:it.d||2,q,hint:false,kind:q?._mq?.skillKind});seen.push(key);if(seen.length>300)seen.splice(0,seen.length-300);try{MQAdaptive.refreshMastery(S,it.cid);}catch(e){}try{saveLocal();if(typeof schedSync==='function')schedSync(400);}catch(e){}return r;}
// Chaque réponse d'interrogation alimente la maîtrise par compétence (une seule fois par question : competencyEvalSeen).
MQHooks.on('interrogation:answer',({id,i,it})=>{try{recordIQ({id,i,it});}catch(e){console.warn('[Finot Académie competency] interrogation',e);}},{id:'competency-interrogation'});
window.MQCompetencyIntegration={version:'1.1',aliases:ALIAS,recordIQ};
})();
