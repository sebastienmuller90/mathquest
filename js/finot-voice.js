/* Voix de Finot (carnet d'idées, 21/10/2026) : à la fin d'un exercice ou d'un défi éclair, Finot apparaît dans une bulle et
   dit un mot d'encouragement avec SA voix — masculine, douce, un peu aiguë, façon dessin animé (MQAudio.finotVoice) —
   distincte de la voix féminine des leçons. Le texte est toujours affiché (enfant sans son, appareil sans synthèse) ; la
   voix ne part que si le son de l'appli est activé (S.sound) et que le parent ne l'a pas coupée (S.finotVoice===false ;
   champ absent = activé, aucune migration de sauvegarde). Abonné à mission:end et flash:end (écran de fin déjà rendu). */
(function(root){'use strict';
if(typeof MQHooks==='undefined')return;
const P={
 top:['Hey {n}, félicitations ! Sans faute, c’est génial !','Waouh, tout juste ! Tu es en pleine forme, {n} !','Incroyable, {n} ! Pas une seule erreur. Bravo !'],
 good:['Hey {n}, félicitations ! Continue comme ça !','Bien joué, {n} ! Tu progresses vraiment.','Super travail ! Je suis fier de toi, {n}.'],
 ok:['Pas mal du tout, {n} ! Encore un petit effort et ce sera parfait.','C’est bien parti ! On continue ensemble, {n} ?','Tu avances bien, {n}. Continue comme ça !'],
 low:['Pas grave, {n}. Chaque erreur t’apprend quelque chose. On réessaie ?','Courage, {n} ! Même les plus forts s’entraînent beaucoup.','Ne lâche rien, {n}, je suis avec toi !'],
 record:['Nouveau record, {n} ! Tu es rapide comme l’éclair !','Hey, record battu ! Bravo {n} !'],
 flash:['Bien joué, {n} ! La prochaine fois, on bat ton record ?','Belle série, {n} ! Continue comme ça !']};
const IMG={top:'bravo',good:'bravo',ok:'encouragement',low:'encouragement',record:'victoire',flash:'bravo'};
const LEVEL_UP=' Et en plus, tu passes au niveau supérieur !';
const last={};let current='';
const firstName=()=>String((typeof S==='object'&&S&&S.name)||'').trim().split(/\s+/)[0].slice(0,20);
// Sans prénom, « Hey {n}, » devient « Hey, » et « Bravo {n} ! » devient « Bravo ! ».
function fill(tpl,n){return n?tpl.replace(/\{n\}/g,n):tpl.replace(/,?\s?\{n\}/g,'');}
function line(mood){const a=P[mood]||P.good;let i=Math.floor(Math.random()*a.length);if(a.length>1&&i===last[mood])i=(i+1)%a.length;last[mood]=i;return fill(a[i],firstName());}
// Même barème que les étoiles des écrans de fin (endChapterMission / endPathMission).
function missionMood(m){const ok=m.ok||0,st=ok>=8?3:ok>=6?2:ok>=4?1:0;return ['low','ok','good','top'][st];}
const leveledUp=m=>typeof lvl==='function'&&m&&m.L0!=null&&lvl(S.xp)>m.L0;
const enabled=()=>!!(typeof S==='object'&&S&&S.sound&&S.finotVoice!==false);
const canSpeak=()=>!!(root.MQAudio&&MQAudio.supported());
function say(text){if(!text||!enabled()||!canSpeak())return null;return MQAudio.speak([{t:text,l:'fr',type:'phrase'}],{character:'finot'});}
function bubble(mood,text){const card=document.querySelector('#app .end.card');if(!card)return null;
 card.querySelectorAll('.finot-live').forEach(e=>e.remove()); // Finot qui parle remplace son image muette
 const d=document.createElement('div');d.className='finot-say';d.setAttribute('role','status');
 const src=(typeof FINOT_IMG==='object'&&(FINOT_IMG[IMG[mood]]||FINOT_IMG.bravo))||'';
 d.innerHTML=`${src?`<img src="${src}" alt="" aria-hidden="true" class="finot-say-img">`:''}<p class="finot-say-txt"><span class="sr-only">Finot dit : </span>${esc(text)}</p>${canSpeak()?'<button type="button" class="finot-say-play" data-a="finotsay" aria-label="Réécouter Finot">🔊</button>':''}`;
 const anchor=card.querySelector('.bigstars,.bigicon');if(anchor)card.insertBefore(d,anchor);else card.prepend(d);return d;}
function react(mood,m){current=line(mood)+(leveledUp(m)?LEVEL_UP:'');bubble(mood,current);say(current);}
MQHooks.on('mission:end',({m})=>react(missionMood(m),m),{id:'finot-voice'});
MQHooks.on('flash:end',({m,rec})=>react(rec?'record':'flash',m),{id:'finot-voice'});
if(typeof ACT==='object'){
 ACT.finotsay=()=>{if(current&&canSpeak())MQAudio.speak([{t:current,l:'fr',type:'phrase'}],{character:'finot'});};
 ACT.finotvoice=(_,el)=>{S.finotVoice=S.finotVoice===false;saveLocal();if(el){el.setAttribute('aria-pressed',String(S.finotVoice));el.textContent=S.finotVoice?'Activée':'Coupée';}if(S.finotVoice&&canSpeak())MQAudio.speak([{t:fill('Salut {n}, c’est moi, Finot !',firstName()),l:'fr'}],{character:'finot'});};}
root.MQFinotVoice={phrases:P,line,missionMood,fill,enabled,say};
})(typeof window!=='undefined'?window:globalThis);
