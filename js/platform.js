/* Finot Académie — couche plateforme web / natif (31/10/2026).
   Une seule base applicative : la PWA web et l'app Android (Capacitor) chargent les mêmes fichiers. Ce module isole les
   seules différences ; en web il ne change RIEN au comportement existant.
   - Détection : app native quand le pont Capacitor est présent (window.Capacitor, injecté par la WebView avant tout script).
   - Service worker : uniquement en web. En natif, les fichiers sont déjà dans l'APK (hors ligne natif), et un service worker
     n'apporterait qu'un second cache à désynchroniser.
   - Liens à envoyer à un autre appareil (suivi parent) : en natif, l'origine https://localhost n'existe que sur ce téléphone,
     on utilise l'adresse du site public.
   - Android : bouton Retour (ferme la couche du dessus, puis revient à l'écran précédent, puis met l'app en arrière-plan sur
     l'accueil, sans jamais la tuer), sauvegarde immédiate au passage en arrière-plan, évènement de reprise.
   - Android 8+ / Capacitor 8 : les SystemBars suivent à chaud prefers-color-scheme afin de garder les icônes système lisibles.
   Les plugins natifs sont lus via Capacitor.Plugins (pas de bundler : architecture zéro build conservée).
   Évènements émis (MQHooks) : platform:pause, platform:resume, platform:network, platform:systembars ; filtre platform:back (MQHooks.first). */
(function(){
'use strict';
const cap=window.Capacitor||null;
const isNative=!!(cap&&typeof cap.isNativePlatform==='function'&&cap.isNativePlatform());
const kind=isNative?String((cap.getPlatform&&cap.getPlatform())||'native'):'web';
const PUBLIC_BASE='https://sebastienmuller90.github.io/mathquest/';
function plugin(name){try{return isNative&&cap.Plugins&&cap.Plugins[name]||null;}catch(e){return null;}}
function publicURL(rel){return new URL(rel,isNative?PUBLIC_BASE:location.href).href;}
function shouldRegisterServiceWorker(){return !isNative&&typeof navigator!=='undefined'&&'serviceWorker' in navigator&&typeof location!=='undefined'&&/^https?:$/.test(location.protocol);}
function isOnline(){return typeof navigator==='undefined'||navigator.onLine!==false;}
const emit=(ev,data)=>{try{if(window.MQHooks)MQHooks.emit(ev,data);}catch(e){}};
const visible=el=>!!(el&&!el.disabled&&el.offsetParent!==null);
const cur=()=>typeof CUR!=='undefined'?CUR:'';

function flush(reason){try{if(typeof saveLocal==='function')saveLocal();}catch(e){}emit('platform:pause',{reason});}
function minimize(){const App=plugin('App');if(App&&App.minimizeApp)return Promise.resolve(App.minimizeApp()).catch(()=>{});return Promise.resolve();}

function darkAppearance(){try{return typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: dark)').matches;}catch(e){return false;}}
function syncSystemBars(){
 const bars=plugin('SystemBars');if(!bars||typeof bars.setStyle!=='function')return Promise.resolve(false);
 const style=darkAppearance()?'DARK':'LIGHT';
 return Promise.resolve(bars.setStyle({style})).then(()=>{emit('platform:systembars',{style});return true;}).catch(()=>false);
}
function watchSystemBars(){
 if(!isNative||typeof matchMedia!=='function')return;
 let mq;try{mq=matchMedia('(prefers-color-scheme: dark)');}catch(e){return;}
 syncSystemBars();
 const changed=()=>{syncSystemBars();};
 if(mq&&typeof mq.addEventListener==='function')mq.addEventListener('change',changed);
 else if(mq&&typeof mq.addListener==='function')mq.addListener(changed);
}

// Bouton Retour : même effet que ce que l'enfant ferait à l'écran. Renvoie l'action réalisée (utile aux tests).
function back(){
 try{if(window.MQHooks&&MQHooks.first&&MQHooks.first('platform:back',{screen:cur()}))return 'hook';}catch(e){}
 try{if(typeof closeTopOverlay==='function'&&closeTopOverlay())return 'overlay';}catch(e){}
 const app=document.getElementById('app');
 const barBack=app&&app.querySelector('.bar > button[data-a]');if(visible(barBack)){barBack.click();return 'bar';}
 const wiz=app&&app.querySelector('[data-pob="back"]');if(visible(wiz)){wiz.click();return 'wizard';}
 if(cur()==='diagnostic'){const pause=app&&app.querySelector('[data-a="diagpause"]');if(visible(pause)){pause.click();return 'diagnostic-pause';}}
 if(cur()&&cur()!=='home'&&cur()!=='onboarding'){const h=app&&app.querySelector('[data-a="home"]');if(visible(h)){h.click();return 'home-button';}
  if(typeof ACT==='object'&&typeof ACT.home==='function'){ACT.home();return 'home';}}
 minimize();return 'minimize';}

if(isNative){const App=plugin('App');
 if(App&&App.addListener){
  App.addListener('backButton',()=>{back();});
  App.addListener('pause',()=>flush('pause'));
  App.addListener('appStateChange',s=>{if(s&&s.isActive===false)flush('background');});
  // Reprise : nouvelle journée possible (objectif du jour, série) → l'accueil est redessiné s'il est affiché.
  App.addListener('resume',()=>{syncSystemBars();emit('platform:resume',{});try{if(cur()==='home'&&typeof home==='function')home();}catch(e){}});
 }
 document.documentElement.classList.add('mq-native','mq-'+kind);watchSystemBars();}
// Bac à sable des audits (pas de DOM complet) : aucun écouteur, l'API reste disponible.
if(typeof window.addEventListener==='function'){
 window.addEventListener('online',()=>emit('platform:network',{online:true}));
 window.addEventListener('offline',()=>emit('platform:network',{online:false}));}

window.MQPlatform=Object.freeze({kind,isNative,PUBLIC_BASE,plugin,publicURL,shouldRegisterServiceWorker,isOnline,back,syncSystemBars});
})();
