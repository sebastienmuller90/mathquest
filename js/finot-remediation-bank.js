/* MathQuest — complète le diagnostic d'erreur de Finot avec une erreur typique et une remédiation de la matière.
   MQFinotError.explain est le chemin partagé clic/texte/voix. L'intention « pourquoi » est un abonné 'finot:intent'. */
(function(){
'use strict';
if(typeof window==='undefined')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,' ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
function asksWhy(s){const t=norm(s);return /\b(pourquoi|comment|ou)\b.*\b(tromp|trompe|trompee|rate|ratee|fauss\w*|incorrect\w*|erreur\w*)\b/.test(t)||/\b(erreur\w*|fauss\w*|incorrect\w*)\b.*\b(ou|pourquoi|comment|reponse|repondu)\b/.test(t)||/\b(?:ou est|quelle est|explique)\b.*\b(?:mon|ma|l)\s*erreur\b/.test(t);}
function subject(cid){try{let s=sOf(WMAP[cid].id).id.replace(/^p-/,'');if(s==='sciences'||s==='qlm')s='svt';if(s==='evar')s='evars';return s;}catch(e){return'autre';}}
function tipFor(last){if(!last?.cid)return null;const b=window.MQPedagogyBanks||{},arr=b.misconceptions?.[subject(last.cid)]||b.misconceptions?.autre||[];if(!arr.length)return null;const sig=String(last.q?.q||last.cid);return arr[hash(last.cid+'|'+sig)%arr.length];}
function pushTip(){const last=window.MQFinotError?.last,tip=tipFor(last);if(!tip)return false;try{finotPush?.('finot',`<div class="whybox"><b>⚠️ Un piège fréquent dans cette matière</b><p>${esc(tip[0])}</p><p><b>Pour le corriger :</b> ${esc(tip[1])}</p></div>`);return true;}catch(e){return false;}}
// « Pourquoi je me suis trompé ? » est pris en charge en premier dès qu'une erreur récente existe pour ce profil.
function installAskHook(){MQHooks.on('finot:intent',ask=>{if(asksWhy(ask.raw)&&window.MQFinotError?.last){ask.echo();window.MQFinotError.explain();return true;}return false;},{id:'finot-remediation',order:10});return true;}
installAskHook();
window.MQFinotRemediation={version:'1.4',subject,tipFor,pushTip,asksWhy,installAskHook,get hookActive(){return MQHooks.has('finot:intent','finot-remediation');}};
})();
