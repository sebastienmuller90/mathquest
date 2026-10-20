/* MathQuest — ajoute une situation de transfert après chaque exercice enrichi. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function subj(cid){try{return sOf(WMAP[cid].id).id.replace(/^p-/,'')}catch(e){return'autre';}}
function choose(cid,q,d){const b=window.MQTransferScenarios||{},young=['CP','CE1','CE2'].includes(WMAP[cid]?.lvl),arr=[...(b.bySubject?.[subj(cid)]||[]),...(young?(b.young||[]):[]),...(b.common||[])];if(!arr.length)return'';const sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):String(q?.q||'');return arr[hash(cid+'|'+d+'|'+sig)%arr.length];}
function enhance(cid,q,d){if(!q||typeof q!=='object')return q;q._mq=q._mq||{};if(!q._mq.transfer)q._mq.transfer=choose(cid,q,d);return q;}
for(const ch of Object.values(CHMAP)){if(!ch||typeof ch.g!=='function'||ch.__mqTransferWrapped)continue;const base=ch.g;ch.g=function(d){return enhance(ch.id,base.call(ch,d),d);};ch.__mqTransferWrapped=true;}
if(window.MQQuestionEnrichment?.decorate&&!MQQuestionEnrichment.decorate.__mqTransfer){const base=MQQuestionEnrichment.decorate;const wrap=function(cid,q,d){return enhance(cid,base.call(this,cid,q,d),d);};wrap.__mqTransfer=true;MQQuestionEnrichment.decorate=wrap;}
function inject(q,standard=false){if(!q?._mq?.transfer)return false;const fb=document.querySelector('#fb .fb,.lfb,.lesson-feedback');if(!fb)return false;const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));if(!fb.querySelector('.mq-transfer'))fb.insertAdjacentHTML('beforeend',`<details class="mq-reflect mq-transfer"><summary>🌍 Je réutilise dans une autre situation</summary><p>${e(q._mq.transfer)}</p></details>`);if(standard&&!fb.querySelector('[data-a="next"]'))fb.insertAdjacentHTML('beforeend','<button class="btn primary wide" data-a="next">Exercice suivant →</button>');return true;}
function installFeedbackHooks(){
 if(typeof result==='function'&&!result.__mqTransfer){const base=result;const wrap=function(ok){const q=typeof M!=='undefined'?M?.q:null,r=base.apply(this,arguments),standard=!!q?._mq?.transfer&&typeof M!=='undefined'&&M&&!M.flash;if(ok&&standard&&M.tid){clearTimeout(M.tid);M.tid=null;}setTimeout(()=>inject(q,standard),0);return r;};wrap.__mqTransfer=true;wrap.__mqTransferBase=base;result=wrap;}
 if(typeof lvalidate==='function'&&!lvalidate.__mqTransfer){const base=lvalidate;const wrap=function(){let q=null;try{const k=L?.steps?.[L.i]?.k;q=k==='practice'?L?.pq:L?.q;}catch(e){}const r=base.apply(this,arguments);setTimeout(()=>inject(q,false),0);return r;};wrap.__mqTransfer=true;wrap.__mqTransferBase=base;lvalidate=wrap;}
 return {result:typeof result==='function'&&!!result.__mqTransfer,lesson:typeof lvalidate==='function'&&!!lvalidate.__mqTransfer};
}
let guardTimer=null;
function stabilizeHooks(){if(guardTimer)return;let stable=0,ticks=0;guardTimer=setInterval(()=>{ticks++;const x=installFeedbackHooks(),ready=!!window.MQ_AUDIT_FIXES;if(ready&&x.result&&x.lesson)stable++;else stable=0;if(stable>=8||ticks>=200){clearInterval(guardTimer);guardTimer=null;}},50);}
installFeedbackHooks();stabilizeHooks();
window.MQQuestionTransfer={version:'1.2',choose,enhance,inject,installFeedbackHooks,stabilizeHooks,get hooksActive(){return typeof result==='function'&&!!result.__mqTransfer&&typeof lvalidate==='function'&&!!lvalidate.__mqTransfer;}};
})();