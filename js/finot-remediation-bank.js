/* MathQuest — complète le diagnostic d'erreur de Finot avec une erreur typique et une remédiation de la matière. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const asksWhy=s=>/pourquoi.*(tromp|faux|rate)|qu.*(rate|erreur)|comprend.*erreur/.test(norm(s));
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function tipFor(last){if(!last?.cid)return null;const b=window.MQPedagogyBanks||{},arr=b.misconceptions?.[subject(last.cid)]||b.misconceptions?.autre||[];if(!arr.length)return null;const sig=String(last.q?.q||last.cid);return arr[hash(last.cid+'|'+sig)%arr.length];}
function pushTip(){const last=window.MQFinotError?.last,tip=tipFor(last);if(!tip)return;try{finotPush?.('finot',`<div class="whybox"><b>⚠️ Un piège fréquent dans cette matière</b><p>${esc(tip[0])}</p><p><b>Pour le corriger :</b> ${esc(tip[1])}</p></div>`);}catch(e){}}
if(typeof ACT.finotwhy==='function'&&!ACT.finotwhy.__mqRemediation){const base=ACT.finotwhy;const wrap=function(){const r=base.apply(this,arguments);setTimeout(pushTip,45);return r;};wrap.__mqRemediation=true;ACT.finotwhy=wrap;}
if(typeof finotAsk==='function'&&!finotAsk.__mqRemediation){const base=finotAsk;const wrap=function(text){const why=asksWhy(text),r=base.apply(this,arguments);if(why)setTimeout(pushTip,55);return r;};wrap.__mqRemediation=true;finotAsk=wrap;}
window.MQFinotRemediation={version:'1.1',subject,tipFor,pushTip,asksWhy};
})();
