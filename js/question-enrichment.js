/* Finot Académie — enrichissement non destructif des questions.
   N'altère jamais la réponse attendue : ajoute contexte, compétence cible et question de réflexion. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function subject(cid){try{return sOf(WMAP[cid].id).id}catch(e){return 'autre';}}
function decorate(cid,q,d){if(!q||typeof q!=='object')return q;const bank=window.MQQuestionBanks||{},sub=subject(cid),b=bank.bySubject?.[sub]||bank.common||{},common=bank.common||{},skill=window.MQCompetency?MQCompetency.skillsForChapter(cid).find(x=>x.kind===MQCompetency.inferKind(cid,q)):null,sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):JSON.stringify([q.type,q.q,q.ans]);const n=hash(cid+'|'+d+'|'+sig),contexts=(b.context?.length?b.context:common.context)||[],reflect=(b.reflect?.length?b.reflect:common.reflect)||[];
 q._mq={...(q._mq||{}),cid,d:+d||2,subject:sub,skillId:skill?.id||'',skillKind:skill?.kind||'',skillLabel:skill?.short||skill?.label||'',context:contexts.length?contexts[n%contexts.length]:'',reflect:reflect.length?reflect[(n>>>5)%reflect.length]:'',enriched:true};return q;}
MQHooks.on('question:generated',(q,{cid,d})=>decorate(cid,q,d),{id:'question-enrichment',order:10});
// Les tirages à graine (reprise d'interrogation) passent par le même abonnement : même compétence et même contexte.
window.MQQuestionEnrichment={version:'1.1',decorate};
})();
