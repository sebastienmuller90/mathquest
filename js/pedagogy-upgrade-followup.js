/* Compléments pédagogiques : niveau choisi stable + compréhension naturelle de Finot. */
(function(){
'use strict';
if(typeof window==='undefined'||!window.MQPedagogy)return;
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();

// Un niveau choisi manuellement reste fixe pendant le quiz/la mission.
if(typeof lvalidate==='function'&&!lvalidate.__manualLevelFixed){const base=lvalidate;lvalidate=function(...args){const chosen=L&&L.lessonLevel;const r=base(...args);if(chosen&&L){L.quizDifficulty=chosen;L.quizStreak=0;}return r;};lvalidate.__manualLevelFixed=true;}
if(typeof result==='function'&&!result.__manualLevelFixed){const base=result;result=function(ok){const chosen=M&&M.forcedDifficulty,cid=M&&M.cid,r=base(ok);if(chosen&&M){M.d=chosen;if(M.dById&&cid)M.dById[cid]=chosen;}return r;};result.__manualLevelFixed=true;}
if(typeof ACT==='object'&&typeof ACT.conf==='function'&&!ACT.conf.__manualLevelFixed){const base=ACT.conf;const fixed=function(v,el){const chosen=L&&L.lessonLevel;const r=base(v,el);if(chosen&&L)L.quizDifficulty=chosen;return r;};fixed.__manualLevelFixed=true;ACT.conf=fixed;}

function speakFinot(html){if(!['CP','CE1','CE2'].includes(String(S?.grade||'').toUpperCase()))return;try{if(typeof ttsSay==='function'){const d=document.createElement('div');d.innerHTML=String(html||'');const t=(d.textContent||'').replace(/\s+/g,' ').trim();if(t)ttsSay({t,l:'fr-FR'});}}catch(e){}}
function routeIntent(raw){const t=norm(raw);if(!t)return false;
 const has=(...xs)=>xs.some(x=>t.includes(x));
 if(has('j ai pas compris','je comprends pas','je ne comprends pas','explique moi','explique simplement','aide moi','aide-moi')){ACT.finotsimple();return true;}
 if(has('indice','un coup de pouce','aide pour la question','bloque','bloquee','je suis bloque')){ACT.finothint2();return true;}
 if(has('lis moi','lire la question','lis la question','lis le cours','ecoute la question')){ACT.finotread2();return true;}
 if(has('cours facile','lecon facile','plus facile pour le cours')){ACT.finoteasycourse();return true;}
 if(has('exercice facile','exercices faciles','plus facile','trop dur','trop difficile')){ACT.finoteasyex();return true;}
 if(has('parcours','quoi faire aujourd hui','je fais quoi','que faire')){if(typeof ACT.path==='function'){finotClose();ACT.path();return true;}}
 if(has('lire une histoire','une histoire','bibliotheque','je veux lire')){if(typeof ACT.library==='function'){finotClose();ACT.library();return true;}}
 if(has('mes erreurs','revoir mes erreurs','erreurs')){if(typeof ACT.mistakes==='function'){finotClose();ACT.mistakes();return true;}}
 return false;
}
if(typeof finotAsk==='function'&&!finotAsk.__intentUpgrade){const base=finotAsk;finotAsk=function(text){const t=String(text||'').trim();if(!t)return;finotChatEnsure();finotPush('you',typeof esc==='function'?esc(t):t);if(routeIntent(t))return;const m=typeof finotMatch==='function'?finotMatch(t):null;const html=m?m.a:FINOT_FALLBACK;finotPush('finot',html);finotChipsRender();};finotAsk.__intentUpgrade=true;}

// Toute réponse déclenchée par les boutons peut être lue aux jeunes élèves.
if(typeof finotPush==='function'&&!finotPush.__youngVoice){const base=finotPush;finotPush=function(who,html){const r=base(who,html);if(who==='finot')speakFinot(html);return r;};finotPush.__youngVoice=true;}

window.MQPedagogy.intentVersion='1.2';
})();
