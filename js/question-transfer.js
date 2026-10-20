/* MathQuest — ajoute une situation de transfert après chaque exercice enrichi. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function subj(cid){try{return sOf(WMAP[cid].id).id.replace(/^p-/,'')}catch(e){return'autre';}}
function choose(cid,q,d){const b=window.MQTransferScenarios||{},young=['CP','CE1','CE2'].includes(WMAP[cid]?.lvl),arr=[...(b.bySubject?.[subj(cid)]||[]),...(young?(b.young||[]):[]),...(b.common||[])];if(!arr.length)return'';const sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):String(q?.q||'');return arr[hash(cid+'|'+d+'|'+sig)%arr.length];}
function enhance(cid,q,d){if(!q||typeof q!=='object')return q;q._mq=q._mq||{};if(!q._mq.transfer)q._mq.transfer=choose(cid,q,d);return q;}
MQHooks.on('question:generated',(q,{cid,d})=>enhance(cid,q,d),{id:'question-transfer',order:20});

function inject(q,standard=false){if(!q?._mq?.transfer)return false;const fb=document.querySelector('#fb .fb,.lfb,.lesson-feedback');if(!fb)return false;const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));if(!fb.querySelector('.mq-transfer'))fb.insertAdjacentHTML('beforeend',`<details class="mq-reflect mq-transfer"><summary>🌍 Je réutilise dans une autre situation</summary><p>${e(q._mq.transfer)}</p></details>`);if(standard&&!fb.querySelector('[data-a="next"]'))fb.insertAdjacentHTML('beforeend','<button class="btn primary wide" data-a="next">Exercice suivant →</button>');return true;}
// Après la correction : la situation de transfert. En mission, une bonne réponse attend alors le bouton « Exercice suivant »
// (l'enchaînement automatique ne laisserait pas le temps de lire). Jamais en défi éclair.
function installFeedbackHooks(){MQHooks.on('answer:after',x=>{if(x.mode==='flash')return;const standard=x.mode!=='lesson'&&!!x.q?._mq?.transfer;if(x.ok&&standard&&x.M&&x.M.tid){clearTimeout(x.M.tid);x.M.tid=null;}inject(x.q,standard);},{id:'question-transfer',order:20});return {result:true,lesson:true};}
function stabilizeHooks(){}
installFeedbackHooks();
window.MQQuestionTransfer={version:'1.2',choose,enhance,inject,installFeedbackHooks,stabilizeHooks,get hooksActive(){return MQHooks.has('answer:after','question-transfer');}};
})();