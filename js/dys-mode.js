/* Finot Académie — Mode DYS / confort de lecture (par profil).
   Module isolé : ne remplace aucune fonction coeur. Les réglages sont stockés dans S.dys et appliqués par classes CSS. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;

const DEFAULTS={enabled:false,largeText:true,spacing:true,focus:true,calm:false,highlight:true,simpleFont:false};
const KEYS=Object.keys(DEFAULTS);

function ensure(){
 if(typeof S==='undefined'||!S)return {...DEFAULTS};
 const cur=S.dys&&typeof S.dys==='object'&&!Array.isArray(S.dys)?S.dys:{};
 S.dys={...DEFAULTS,...cur};
 for(const k of KEYS)S.dys[k]=!!S.dys[k];
 return S.dys;
}

function apply(){
 const d=ensure(),r=document.documentElement,on=!!d.enabled;
 r.classList.toggle('mq-dys-on',on);
 r.classList.toggle('mq-dys-large',on&&d.largeText);
 r.classList.toggle('mq-dys-spacing',on&&d.spacing);
 r.classList.toggle('mq-dys-focus',on&&d.focus);
 r.classList.toggle('mq-dys-calm',on&&d.calm);
 r.classList.toggle('mq-dys-highlight',on&&d.highlight);
 r.classList.toggle('mq-dys-simplefont',on&&d.simpleFont);
 return d;
}

function saveAndApply(){
 apply();
 try{if(typeof saveLocal==='function')saveLocal();else if(typeof save==='function')save();}catch(e){}
}

function toggle(key){
 const d=ensure();if(!KEYS.includes(key))return;
 d[key]=!d[key];saveAndApply();
 if(typeof parentScreen==='function'&&typeof PARENT!=='undefined'&&PARENT)parentScreen('reglages');
}

const row=(key,title,desc)=>{const d=ensure(),on=!!d[key];return `<div class="mq-dys-row mq-dys-sub" ${d.enabled?'':'hidden'}><div class="mq-dys-copy"><b>${title}</b><small>${desc}</small></div><button class="btn mq-dys-toggle" data-a="dystoggle:${key}" aria-pressed="${on}">${on?'Activé':'Désactivé'}</button></div>`;};

function card(){const d=ensure();return `<section class="card mq-dys-settings"><h2>♿ Lecture facilitée</h2><p class="muted small mq-dys-intro">Réglages propres à ${typeof esc==='function'?esc(S.name||'ce profil'):(S.name||'ce profil')}. Ils modifient uniquement l’affichage, jamais les réponses ni la progression.</p><div class="mq-dys-row"><div class="mq-dys-copy"><b>Mode lecture facilitée</b><small>Active ou coupe l’ensemble des adaptations ci-dessous.</small></div><button class="btn mq-dys-toggle" data-a="dystoggle:enabled" aria-pressed="${d.enabled}">${d.enabled?'Activé':'Désactivé'}</button></div>${row('largeText','Texte plus grand','Agrandit les consignes, le cours, les réponses et les corrections.')}${row('spacing','Espacement renforcé','Augmente légèrement l’espace entre lettres, mots et lignes.')}${row('focus','Affichage concentré','Présente les choix en une seule colonne et limite la largeur de lecture.')}${row('simpleFont','Police simple','Utilise une police système très lisible, sans ligatures décoratives.')}${row('highlight','Surlignage de lecture renforcé','Rend le mot lu par la voix plus visible lorsque le surlignage audio est disponible.')}${row('calm','Réduire les animations','Neutralise les animations et transitions supplémentaires pour limiter la distraction.')}</section>`;}

function inject({tab}={}){
 if(tab!=='reglages'||document.querySelector('.mq-dys-settings'))return;
 const headings=[...document.querySelectorAll('#app h2.sec')];
 const gain=headings.find(h=>/Gain de bons points/i.test(h.textContent||''));
 if(gain)gain.insertAdjacentHTML('beforebegin',card());
 else{const tabs=document.querySelector('#app .tabs');if(tabs)tabs.insertAdjacentHTML('afterend',card());}
}

if(typeof ACT==='object')ACT.dystoggle=key=>toggle(String(key||''));
if(window.MQHooks){
 MQHooks.on('profile:changed',()=>apply(),{id:'dys-mode',order:20});
 MQHooks.on('parent:rendered',inject,{id:'dys-mode',order:20});
 MQHooks.on('home:rendered',()=>apply(),{id:'dys-mode-home',order:20});
}
apply();
window.MQDys={version:'1.0',defaults:{...DEFAULTS},ensure,apply,toggle,card};
})();
