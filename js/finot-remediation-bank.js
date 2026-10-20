/* MathQuest — complète le diagnostic d'erreur de Finot avec une erreur typique et une remédiation.
   Les packs spécifiques de chapitre sont prioritaires lorsqu'ils correspondent à la question ; la banque de matière reste le repli général.
   MQFinotError.explain est le chemin partagé clic/texte/voix. */
(function(){
'use strict';
if(typeof window==='undefined')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
function asksWhy(s){const t=norm(s);return /\b(pourquoi|comment|ou)\b.*\b(tromp|trompe|trompee|rate|ratee|fauss\w*|incorrect\w*|erreur\w*)\b/.test(t)||/\b(erreur\w*|fauss\w*|incorrect\w*)\b.*\b(ou|pourquoi|comment|reponse|repondu)\b/.test(t)||/\b(?:ou est|quelle est|explique)\b.*\b(?:mon|ma|l)\s*erreur\b/.test(t);}
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function packFor(cid){return window.MQChapterPacks?.packs?.[cid]||null;}
function matchingPack(last){const pack=packFor(last?.cid);if(!pack)return null;const match=window.MQChapterPacks?.matchesQuestion;return typeof match==='function'&&!match(pack,last?.q)?null:pack;}
function tipFor(last){
 if(!last?.cid)return null;
 const pack=matchingPack(last);if(Array.isArray(pack?.misconception)&&pack.misconception.length>=2)return pack.misconception.slice(0,2);
 const b=window.MQPedagogyBanks||{},arr=b.misconceptions?.[subject(last.cid)]||b.misconceptions?.autre||[];if(!arr.length)return null;
 const sig=String(last.q?.q||last.cid);return arr[hash(last.cid+'|'+sig)%arr.length];
}
function pushTip(){
 const last=window.MQFinotError?.last,tip=tipFor(last);if(!tip)return false;
 const pack=matchingPack(last),specific=!!pack,steps=Array.isArray(pack?.finot?.steps)?pack.finot.steps:[];
 try{finotPush?.('finot',`<div class="whybox"><b>⚠️ Un piège fréquent ${specific?'dans ce chapitre':'dans cette matière'}</b><p>${esc(tip[0])}</p><p><b>Pour le corriger :</b> ${esc(tip[1])}</p>${steps.length?`<p><b>Plan pour repartir :</b></p><ol>${steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`:''}</div>`);return true;}catch(e){return false;}
}
function installAskHook(){try{if(typeof finotAsk!=='function')return false;if(finotAsk.__mqRemediationIntent)return true;const base=finotAsk;const wrap=function(text){if(asksWhy(text)&&window.MQFinotError?.last){try{finotChatEnsure?.();finotPush?.('you',esc(String(text||'').trim()));}catch(e){}return window.MQFinotError.explain();}return base.apply(this,arguments);};wrap.__mqRemediationIntent=true;wrap.__mqRemediationBase=base;finotAsk=wrap;return true;}catch(e){return false;}}
installAskHook();let tries=0;const stabilize=()=>{installAskHook();if(++tries>=40)clearInterval(timer);};const timer=setInterval(stabilize,50);if(document.readyState==='complete')setTimeout(stabilize,0);else window.addEventListener('load',()=>setTimeout(stabilize,0),{once:true});
window.MQFinotRemediation={version:'1.6',subject,packFor,matchingPack,tipFor,pushTip,asksWhy,installAskHook,get hookActive(){try{return typeof finotAsk==='function'&&!!finotAsk.__mqRemediationIntent;}catch(e){return false;}}};
})();