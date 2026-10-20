/* MathQuest — complète le diagnostic d'erreur de Finot avec une erreur typique et une remédiation de la matière.
   L'appel est centralisé dans MQFinotError.explain afin que clic, texte et voix suivent exactement le même chemin. */
(function(){
'use strict';
if(typeof window==='undefined')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function tipFor(last){if(!last?.cid)return null;const b=window.MQPedagogyBanks||{},arr=b.misconceptions?.[subject(last.cid)]||b.misconceptions?.autre||[];if(!arr.length)return null;const sig=String(last.q?.q||last.cid);return arr[hash(last.cid+'|'+sig)%arr.length];}
function pushTip(){const last=window.MQFinotError?.last,tip=tipFor(last);if(!tip)return false;try{finotPush?.('finot',`<div class="whybox"><b>⚠️ Un piège fréquent dans cette matière</b><p>${esc(tip[0])}</p><p><b>Pour le corriger :</b> ${esc(tip[1])}</p></div>`);return true;}catch(e){return false;}}
window.MQFinotRemediation={version:'1.2',subject,tipFor,pushTip};
})();
