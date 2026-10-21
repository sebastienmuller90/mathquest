/* Finot Académie — contexte concret visible dans les exercices, sans modifier la réponse attendue. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
// Règle (stabilisation 20/10/2026) : un contexte est spécifique au chapitre et à la question, ou absent. Les « situations
// réelles » génériques tirées au hasard (« Imagine que cette notion apparaisse dans un emploi du temps ») sont retirées.
function matchingPack(cid,q){const pack=window.MQChapterPacks?.packs?.[cid]||null;if(!pack)return null;const match=window.MQChapterPacks?.matchesQuestion;return typeof match==='function'&&!match(pack,q)?null:pack;}
function decorate(cid,q){if(!q||typeof q!=='object')return q;const specific=matchingPack(cid,q)?.exerciseContext;if(!specific){if(q._mq){delete q._mq.application;delete q._mq.applicationSource;}return q;}q._mq=q._mq||{};q._mq.application=String(specific);q._mq.applicationSource='chapter-pack';return q;}
MQHooks.on('question:generated',(q,{cid})=>decorate(cid,q),{id:'pedagogical-context',order:30});

function flashActive(){try{return typeof M!=='undefined'&&!!M?.flash;}catch(e){return false;}}
function inject(q){if(flashActive()||!q?._mq?.application)return;const card=document.querySelector('.qcard,.lcard');if(!card||card.querySelector('.mq-application'))return;const qt=card.querySelector('.qtext');if(!qt)return;qt.insertAdjacentHTML('beforebegin',`<div class="mq-application" style="margin:7px 0 10px;padding:9px 11px;border-radius:12px;background:var(--surface2);border-left:4px solid var(--accent);font-size:14px"><b>🎯 Pour ce chapitre</b><br>${esc(q._mq.application)}</div>`);}
function current(){try{if(typeof M!=='undefined'&&M?.q)return M.q;if(typeof L!=='undefined'&&L){const k=L.steps?.[L.i]?.k;return k==='practice'?L.pq:k==='quiz'?L.q:null;}}catch(e){}return null;}
MQHooks.on('question:after-render',({q})=>inject(q),{id:'pedagogical-context',order:20});
MQHooks.on('lesson:rendered',({q})=>inject(q),{id:'pedagogical-context',order:20});
window.MQPedagogicalExercise={version:'2.0',subject,matchingPack,decorate,inject,flashActive};
})();
