/* Finot Académie — garde « espace parents » (31/10/2026).
   L'indicateur PARENT seul ne suffit pas : il peut rester vrai si l'on quitte l'espace parents par un chemin qui ne le
   remet pas à faux. Les actions réservées aux parents (accord aux statistiques, achats, liens externes) exigent donc que
   l'espace parents soit RÉELLEMENT affiché (onglets data-a="ptab:…" présents dans #app). */
(function(){
'use strict';
function active(){try{return typeof PARENT!=='undefined'&&PARENT===true&&typeof document!=='undefined'&&!!document.querySelector('#app [data-a^="ptab:"]');}catch(e){return false;}}
window.MQParentGate=Object.freeze({active});
})();
