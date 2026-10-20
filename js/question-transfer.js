/* MathQuest — ajoute une situation de transfert après chaque exercice enrichi. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function subj(cid){try{return sOf(WMAP[cid].id).id.replace(/^p-/,'')}catch(e){return'autre';}}
function choose(cid,q,d){const b=window.MQTransferScenarios||{},young=['CP','CE1','CE2'].includes(WMAP[cid]?.lvl),arr=[...(b.bySubject?.[subj(cid)]||[]),...(young?(b.young||[]):[]),...(b.common||[])];if(!arr.length)return'';const sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):String(q?.q||'');return arr[hash(cid+'|'+d+'|'+sig)%arr.length];}
function enhance(cid,q,d){if(!q||typeof q!=='object')return q;q._mq=q._mq||{};if(!q._mq.transfer)q._mq.transfer=choose(cid,q,d);return q;}
for(const ch of Object.values(CHMAP)){if(!ch||typeof ch.g!=='function'||ch.__mqTransferWrapped)continue;const base=ch.g;ch.g=function(d){return enhance(ch.id,base.call(ch,d),d);};ch.__mqTransferWrapped=true;}
if(window.MQQuestionEnrichment?.decorate){const base=MQQuestionEnrichment.decorate;MQQuestionEnrichment.decorate=function(cid,q,d){return enhance(cid,base.call(this,cid,q,d),d);};}
function inject(q){if(!q?._mq?.transfer)return;const fb=document.querySelector('#fb .fb,.lfb,.lesson-feedback');if(!fb||fb.querySelector('.mq-transfer'))return;const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));fb.insertAdjacentHTML('beforeend',`<details class="mq-reflect mq-transfer"><summary>🌍 Je réutilise dans une autre situation</summary><p>${e(q._mq.transfer)}</p></details>`);}
if(typeof result==='function'){const base=result;result=function(){const q=typeof M!=='undefined'?M?.q:null,r=base.apply(this,arguments);setTimeout(()=>inject(q),0);return r;};}
if(typeof lvalidate==='function'){const base=lvalidate;lvalidate=function(){let q=null;try{const k=L?.steps?.[L.i]?.k;q=k==='practice'?L?.pq:L?.q;}catch(e){}const r=base.apply(this,arguments);setTimeout(()=>inject(q),0);return r;};}
window.MQQuestionTransfer={version:'1.0',choose,enhance};
})();