/* Finot Académie — garde « espace parents » (31/10/2026).
   L'indicateur PARENT seul ne suffit pas : il peut rester vrai si l'on quitte l'espace parents par un chemin qui ne le
   remet pas à faux. Les actions réservées aux parents (accord aux statistiques, achats, liens externes) exigent donc que
   l'espace parents soit RÉELLEMENT affiché (onglets data-a="ptab:…" présents dans #app).

   P3-F : le formulaire de code parent est affiché alors que CUR peut encore valoir "home". Dans ce cas hometabsSync()
   peut remettre la navigation élève en position fixed au bas de l'écran, et Android la remonte au-dessus du clavier.
   On force donc cette navigation persistante à rester masquée tant que #pin est présent. */
(function(){
'use strict';
function active(){try{return typeof PARENT!=='undefined'&&PARENT===true&&typeof document!=='undefined'&&!!document.querySelector('#app [data-a^="ptab:"]');}catch(e){return false;}}
function syncPinGateChrome(){
 try{
  const nav=document.getElementById('hometabs');
  if(nav&&document.querySelector('#app #pin')&&nav.classList.contains('show'))nav.classList.remove('show');
 }catch(e){}
}
if(typeof MutationObserver==='function'&&typeof document!=='undefined'&&document.body){
 const observer=new MutationObserver(()=>syncPinGateChrome());
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
 syncPinGateChrome();
}
window.MQParentGate=Object.freeze({active});
})();
