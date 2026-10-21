/* Finot Académie — appli installée (PWA) : enregistrement du service worker, version visible, mise à jour (20/10/2026).
   - La version active est demandée au service worker (message 'version') et affichée dans « Plus » et l'espace parents
     (classe .mq-appver) ; sans service worker (fichier local, développement) : « Version de développement ».
   - Une nouvelle version installée pendant l'utilisation affiche un bandeau « Nouvelle version disponible » dans le flux
     de la page (jamais par-dessus une réponse). Le rechargement n'a lieu qu'au clic, une seule fois : pas de boucle.
   - Vérification d'une mise à jour au retour sur l'appli (au plus une fois par heure), utile quand l'appli installée reste
     ouverte plusieurs jours. */
(function(){
'use strict';
let REG=null,LAST_CHECK=0,shown=false;
window.MQ_APP_VERSION=null;
function label(){return window.MQ_APP_VERSION?'Version '+window.MQ_APP_VERSION:'Version de développement (sans mise en cache)';}
function paint(){document.querySelectorAll('.mq-appver').forEach(el=>{el.textContent=label();});}
function askVersion(){const c=navigator.serviceWorker&&navigator.serviceWorker.controller;if(!c)return Promise.resolve(null);
 return new Promise(res=>{const ch=new MessageChannel(),t=setTimeout(()=>res(null),2000);ch.port1.onmessage=e=>{clearTimeout(t);res(e.data&&e.data.version||null);};try{c.postMessage({type:'version'},[ch.port2]);}catch(e){clearTimeout(t);res(null);}});}
function refreshVersion(){return askVersion().then(v=>{if(v)window.MQ_APP_VERSION=v;paint();return window.MQ_APP_VERSION;});}
function banner(){if(shown||document.querySelector('.mq-update'))return;shown=true;const b=document.createElement('div');b.className='mq-update';b.setAttribute('role','status');
 b.innerHTML='<span>🆕 Une nouvelle version de Finot Académie est prête. Termine ton exercice, puis mets à jour.</span><span class="mq-update-btns"><button class="btn primary sm" data-a="appupdate">Mettre à jour</button><button class="btn ghost sm" data-a="appupdatelater">Plus tard</button></span>';
 document.body.insertBefore(b,document.getElementById('app'));}
function check(force){if(!REG)return;const now=Date.now();if(!force&&now-LAST_CHECK<3600e3)return;LAST_CHECK=now;REG.update().catch(()=>{});}
Object.assign(ACT,{appupdate:()=>{try{saveLocal();}catch(e){}location.reload();},appupdatelater:()=>{const b=document.querySelector('.mq-update');if(b)b.remove();}});
MQHooks.on('home:rendered',paint,{id:'app-version'});MQHooks.on('parent:rendered',paint,{id:'app-version'});
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)){
 let hadController=!!navigator.serviceWorker.controller;
 // Première prise de contrôle (toute première visite) : rien à signaler. Changement suivant, même sans avoir rechargé
 // l'onglet : une nouvelle version vient d'être activée → bandeau.
 navigator.serviceWorker.addEventListener('controllerchange',()=>{refreshVersion();if(hadController)banner();hadController=true;});
 const reg=()=>navigator.serviceWorker.register('./sw.js').then(r=>{REG=r;LAST_CHECK=Date.now();refreshVersion();}).catch(()=>{});
 if(document.readyState==='complete')reg();else window.addEventListener('load',reg,{once:true});
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check(false);});
 refreshVersion();
}else paint();
window.MQPWA={label,refreshVersion,check:()=>check(true),banner,get registration(){return REG;}};
})();
