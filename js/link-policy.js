/* Finot Académie — politique des liens externes, protection des enfants (31/10/2026).
   - Espace enfant (PARENT faux) : aucun lien ne sort de l'app. Crédits et sources sont rendus en TEXTE (libellé + domaine),
     ce qui conserve l'attribution exigée par les licences (CC BY-SA, domaine public…) sans ouvrir de navigateur.
   - Espace parents : liens externes cliquables, nouvel onglet, rel="noopener noreferrer" (en natif, Android ouvre le
     navigateur du système, l'app reste intacte).
   - Garde globale (capture) : tout lien ou window.open externe ajouté plus tard est bloqué hors espace parents.
   MQLinks.html(url, label) est l'unique façon de produire un lien externe dans l'app (vérifié par tests/external-links). */
(function(){
'use strict';
const escH=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inParent=()=>!!(window.MQParentGate&&MQParentGate.active()); // espace parents réellement affiché (js/parent-gate.js)
function parse(u){try{return new URL(String(u),location.href);}catch(e){return null;}}
function isExternal(u){const x=parse(u);return !!(x&&/^https?:$/.test(x.protocol)&&x.origin!==location.origin);}
function host(u){const x=parse(u);return x?x.hostname.replace(/^www\./,''):'';}
function html(url,label,opts){const l=escH(label||host(url));
 if(!isExternal(url))return `<a href="${escH(url)}">${l}</a>`;
 if(inParent()||(opts&&opts.zone==='parent'))return `<a class="${escH(opts&&opts.cls||'')}" href="${escH(url)}" target="_blank" rel="noopener noreferrer">${l}</a>`.replace(' class=""','');
 return `<span class="ext-src">${l} <small class="muted">(${escH(host(url))})</small></span>`;}
function blocked(){window.__mqLinkBlocked=(window.__mqLinkBlocked||0)+1;try{if(typeof toast==='function')toast('🔒 Ce lien s’ouvre seulement depuis l’espace parents.');}catch(e){}}
if(typeof document!=='undefined'&&typeof document.addEventListener==='function'){
 document.addEventListener('click',e=>{const a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a||!isExternal(a.getAttribute('href'))||inParent())return;
  e.preventDefault();e.stopImmediatePropagation();blocked();},true);}
if(typeof window!=='undefined'&&typeof window.open==='function'){const open=window.open.bind(window);
 window.open=function(u,...rest){if(u!=null&&isExternal(u)&&!inParent()){blocked();return null;}return open(u,...rest);};}
window.MQLinks=Object.freeze({html,isExternal,host});
})();
