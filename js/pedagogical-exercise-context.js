/* MathQuest — contexte concret visible dans les exercices, sans modifier la réponse attendue. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function matchingPack(cid,q){const pack=window.MQChapterPacks?.packs?.[cid]||null;if(!pack)return null;const match=window.MQChapterPacks?.matchesQuestion;return typeof match==='function'&&!match(pack,q)?null:pack;}
function decorate(cid,q){
 if(!q||typeof q!=='object')return q;
 const pack=matchingPack(cid,q),specific=pack?.exerciseContext;
 q._mq=q._mq||{};
 if(specific){q._mq.application=String(specific);q._mq.applicationSource='chapter-pack';return q;}
 const b=window.MQPedagogyBanks||{},s=subject(cid),arr=b.realLife?.[s]||b.realLife?.autre||[];if(!arr.length)return q;
 const sig=window.MQQuestionRotation?MQQuestionRotation.signature(q):String(q.q||''),item=arr[hash(cid+'|'+sig)%arr.length];
 q._mq.application=`Imagine que cette notion apparaisse dans ${item}. Après avoir répondu, explique en une phrase comment tu as choisi ta méthode.`;q._mq.applicationSource='generic';return q;
}
for(const ch of Object.values(CHMAP)){if(!ch||typeof ch.g!=='function'||ch.__mqPedContext)continue;const base=ch.g;ch.g=function(d){return decorate(ch.id,base.call(ch,d));};ch.__mqPedContext=true;}
if(window.MQQuestionRotation?.generateSeeded&&!MQQuestionRotation.generateSeeded.__mqPedContext){const base=MQQuestionRotation.generateSeeded;const wrap=function(cid,d,m,k){return decorate(cid,base.call(MQQuestionRotation,cid,d,m,k));};wrap.__mqPedContext=true;MQQuestionRotation.generateSeeded=wrap;}
function flashActive(){try{return typeof M!=='undefined'&&!!M?.flash;}catch(e){return false;}}
function inject(q){if(flashActive()||!q?._mq?.application)return;const card=document.querySelector('.qcard,.lcard');if(!card||card.querySelector('.mq-application'))return;const qt=card.querySelector('.qtext');if(!qt)return;qt.insertAdjacentHTML('beforebegin',`<div class="mq-application" data-source="${esc(q._mq.applicationSource||'generic')}" style="margin:7px 0 10px;padding:9px 11px;border-radius:12px;background:var(--surface2);border-left:4px solid var(--accent);font-size:14px"><b>🌍 Dans une situation réelle</b><br>${esc(q._mq.application)}</div>`);}
function current(){try{if(typeof M!=='undefined'&&M?.q)return M.q;if(typeof L!=='undefined'&&L){const k=L.steps?.[L.i]?.k;return k==='practice'?L.pq:k==='quiz'?L.q:null;}}catch(e){}return null;}
if(typeof renderQ==='function'&&!renderQ.__mqPedContext){const base=renderQ;const wrap=function(){const r=base.apply(this,arguments);try{inject(M?.q);}catch(e){}return r;};wrap.__mqPedContext=true;renderQ=wrap;}
if(typeof renderLesson==='function'&&!renderLesson.__mqPedContext){const base=renderLesson;const wrap=function(){const r=base.apply(this,arguments);try{inject(current());}catch(e){}return r;};wrap.__mqPedContext=true;renderLesson=wrap;}
window.MQPedagogicalExercise={version:'1.3',subject,matchingPack,decorate,inject,flashActive};
})();