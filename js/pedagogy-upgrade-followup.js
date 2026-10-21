/* Compléments pédagogiques : niveau choisi stable + compréhension naturelle de Finot. */
(function(){
'use strict';
if(typeof window==='undefined'||!window.MQPedagogy)return;
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();

// Le niveau choisi (Facile/Moyen/Difficile) reste fixe : géré dans lvalidate, result et ACT.conf (cœur).

function speakFinot(html){if(!['CP','CE1','CE2'].includes(String(S?.grade||'').toUpperCase()))return;try{if(typeof ttsSay==='function'){const d=document.createElement('div');d.innerHTML=String(html||'');const t=(d.textContent||'').replace(/\s+/g,' ').trim();if(t)ttsSay({t,l:'fr-FR'});}}catch(e){}}
function routeIntent(raw){const t=norm(raw);if(!t)return false;
 const w=' '+t+' ',has=(...xs)=>xs.some(x=>w.includes(' '+x+' '));
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
MQHooks.on('finot:intent',ask=>{ask.echo();return routeIntent(ask.raw);},{id:'pedagogy-route',order:50});

// Toute réponse déclenchée par les boutons peut être lue aux jeunes élèves.
MQHooks.on('finot:message',({who,html})=>{if(who==='finot')speakFinot(html);},{id:'finot-young-voice'});

window.MQPedagogy.intentVersion='1.2';
})();
