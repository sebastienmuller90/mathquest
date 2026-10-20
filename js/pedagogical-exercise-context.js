/* MathQuest — contexte concret visible dans les exercices, sans modifier la réponse attendue. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function decorate(cid,q){if(!q||typeof q!=='object')return q;const b=window.MQPedagogyBanks||{},s=subject(cid),arr=b.realLife?.[s]||b.realLife?.autre||[];if(!arr.length)return q;const sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):String(q.q||'');const item=arr[hash(cid+'|'+sig)%arr.length];q._mq=q._mq||{};q._mq.application=`Imagine que cette notion apparaisse dans ${item}. Après avoir répondu, explique en une phrase comment tu as choisi ta méthode.`;return q;}
MQHooks.on('question:generated',(q,{cid})=>decorate(cid,q),{id:'pedagogical-context',order:30});

function flashActive(){try{return typeof M!=='undefined'&&!!M?.flash;}catch(e){return false;}}
function inject(q){if(flashActive()||!q?._mq?.application)return;const card=document.querySelector('.qcard,.lcard');if(!card||card.querySelector('.mq-application'))return;const qt=card.querySelector('.qtext');if(!qt)return;qt.insertAdjacentHTML('beforebegin',`<div class="mq-application" style="margin:7px 0 10px;padding:9px 11px;border-radius:12px;background:var(--surface2);border-left:4px solid var(--accent);font-size:14px"><b>🌍 Dans une situation réelle</b><br>${esc(q._mq.application)}</div>`);}
function current(){try{if(typeof M!=='undefined'&&M?.q)return M.q;if(typeof L!=='undefined'&&L){const k=L.steps?.[L.i]?.k;return k==='practice'?L.pq:k==='quiz'?L.q:null;}}catch(e){}return null;}
MQHooks.on('question:after-render',({q})=>inject(q),{id:'pedagogical-context',order:20});
MQHooks.on('lesson:rendered',({q})=>inject(q),{id:'pedagogical-context',order:20});
window.MQPedagogicalExercise={version:'1.1',subject,decorate,inject,flashActive};
})();
