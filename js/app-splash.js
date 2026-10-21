/* Finot Académie — écran d'ouverture (21/10/2026), façon générique d'application : Finot apparaît dans un halo, le nom
   s'écrit lettre par lettre, puis l'écran s'efface en zoomant vers l'appli. Affiché une fois par ouverture de l'appli
   (sessionStorage : pas à chaque rechargement), au moins 2,3 s et au plus 6 s, 0,7 s si « réduire les animations ».
   Il ne capte aucun clic (pointer-events:none) : il ne bloque et ne masque jamais une action réelle de l'enfant.
   Chargé juste après son balisage dans index.html, avant les gros scripts, pour s'afficher immédiatement. */
(function(){
'use strict';
if(typeof window.addEventListener!=='function')return;var s=document.getElementById('splash');if(!s||!s.querySelector)return;
var seen=false;try{seen=sessionStorage.getItem('fa_splash_shown')==='1';sessionStorage.setItem('fa_splash_shown','1');}catch(e){}
if(seen){s.parentNode.removeChild(s);return;}
var t=s.querySelector('.spl-title');
if(t){var i=0;t.innerHTML=t.textContent.split('').map(function(c){return c===' '?'<span class="spl-space"> </span>':'<span style="animation-delay:'+(0.62+0.045*(i++)).toFixed(3)+'s">'+c+'</span>';}).join('');}
var t0=Date.now(),reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var MIN=reduce?700:2300,done=false;
function leave(){if(done)return;done=true;s.classList.add('out');setTimeout(function(){if(s.parentNode)s.parentNode.removeChild(s);},700);}
function whenReady(){setTimeout(leave,Math.max(0,MIN-(Date.now()-t0)));}
if(document.readyState==='complete')whenReady();else window.addEventListener('load',whenReady,{once:true});
setTimeout(leave,6000);
})();
