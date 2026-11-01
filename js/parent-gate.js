/* Finot Académie — garde « espace parents » (31/10/2026).
   L'indicateur PARENT seul ne suffit pas : il peut rester vrai si l'on quitte l'espace parents par un chemin qui ne le
   remet pas à faux. Les actions réservées aux parents (accord aux statistiques, achats, liens externes) exigent donc que
   l'espace parents soit RÉELLEMENT affiché (onglets data-a="ptab:…" présents dans #app).
   Stabilisation P3 :
   - Entrée sur le premier champ d'un nouveau code valide place le focus sur sa confirmation vide, sans déclencher la
     comparaison prématurée du gestionnaire clavier global chargé plus tard ;
   - quand un toast aria-live finit de se masquer, son ancien texte est retiré afin qu'un message d'erreur ne persiste pas
     silencieusement sur les écrans suivants. */
(function(){
'use strict';
function active(){try{return typeof PARENT!=='undefined'&&PARENT===true&&typeof document!=='undefined'&&!!document.querySelector('#app [data-a^="ptab:"]');}catch(e){return false;}}

function pinConfirmationHandoff(e){
 try{
  if(!e||e.key!=='Enter'||!e.target||e.target.id!=='pin')return;
  const confirm=document.getElementById('pin2');
  if(!confirm||confirm.value.trim()||!/^\d{4,8}$/.test(e.target.value.trim()))return;
  e.preventDefault();e.stopImmediatePropagation();confirm.focus();
 }catch(_e){}
}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('keydown',pinConfirmationHandoff);

function clearHiddenToast(t){
 if(t&&t.id==='toast'&&t.classList&&!t.classList.contains('show')&&(t.textContent||''))t.textContent='';// replaceChildren absent des WebView Android < 86
}
if(typeof MutationObserver==='function'&&typeof document!=='undefined'&&document.body){
 const observer=new MutationObserver(records=>{
  for(const r of records){
   if(r.type==='attributes'){clearHiddenToast(r.target);continue;}
   for(const n of r.addedNodes||[]){if(n&&n.nodeType===1){clearHiddenToast(n);if(n.querySelector)clearHiddenToast(n.querySelector('#toast'));}}
  }
 });
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
}

window.MQParentGate=Object.freeze({active});
})();
