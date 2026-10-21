/* Finot Académie — applique une densité d'interface selon la classe. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function grade(){try{return typeof S!=='undefined'&&S?String(S.grade||''):'';}catch(e){return'';}}
function group(){const g=grade();if(['CP','CE1','CE2'].includes(g))return'young';if(['CM1','CM2','6e'].includes(g))return'bridge';if(['5e','4e','3e'].includes(g))return'teen';return'bridge';}
function apply(){const g=group();document.body.dataset.mqAge=g;document.documentElement.dataset.mqGrade=grade();return g;}
for(const evt of ['home:before','parent:rendered','profile:changed'])MQHooks.on(evt,()=>{apply();},{id:'age-ui'});

new MutationObserver(apply).observe(document.body,{childList:true,subtree:false});apply();
window.MQAgeUI={version:'1.2',grade,group,apply};

/* Le module DYS reste isolé et est chargé en dernier, une fois ACT/S disponibles.
   Les chemins littéraux sont volontairement conservés ici : le service worker les découvre et les pré-cache hors ligne. */
function loadDys(){
 if(!document.getElementById('mq-dys-css')){const l=document.createElement('link');l.id='mq-dys-css';l.rel='stylesheet';l.href='js/dys-mode.css';document.head.appendChild(l);}
 if(!document.getElementById('mq-dys-js')){const s=document.createElement('script');s.id='mq-dys-js';s.src='js/dys-mode.js';s.async=false;document.body.appendChild(s);}
}
loadDys();
})();
