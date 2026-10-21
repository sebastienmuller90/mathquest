/* Finot Académie — indices progressifs.
   Niveau 1 = petit coup de pouce gratuit. Niveaux 2/3 = aide guidée, pénalité XP existante.
   Ne donne jamais directement la réponse et ne modifie pas le moteur de validation. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined'||typeof ACT!=='object')return;
const escH=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function skillLabel(cid,q){try{const kind=q?._mq?.skillKind||MQCompetency.inferKind(cid,q),s=MQCompetency.skillsForChapter(cid).find(x=>x.kind===kind);return s?.short||s?.label||'';}catch(e){return'';}}
function lightHint(q,cid){const skill=skillLabel(cid,q);const prefix=skill?`Concentre-toi sur « ${skill} ». `:'';switch(q?.type){
 case'num':return prefix+'Repère d’abord l’opération demandée et estime l’ordre de grandeur du résultat.';
 case'frac':return prefix+'Regarde séparément le numérateur et le dénominateur avant de choisir ta règle.';
 case'choice':return prefix+'Élimine d’abord les réponses incompatibles avec la consigne, puis compare les restantes.';
 case'order':return prefix+'Cherche le début logique, puis les mots qui relient naturellement les éléments entre eux.';
 case'multi':return prefix+'Traite une ligne à la fois et vérifie-la avant de passer à la suivante.';
 case'text':return prefix+'Relis la consigne et souligne mentalement le mot qui indique exactement ce qu’on te demande.';
 default:return prefix+'Relis la consigne lentement et cherche une seule information utile pour commencer.';}}
function secondHint(q,cid){const own=String(q?.hint||'').trim();if(own)return own;const skill=skillLabel(cid,q);return skill?`Commence par appliquer la règle liée à « ${skill} » sur la première étape seulement.`:'Commence par écrire ou choisir la première étape de la méthode, sans chercher tout le résultat d’un coup.';}
function methodHint(q,cid){const skill=skillLabel(cid,q);const s=skill?` pour « ${skill} »`:'';switch(q?.type){
 case'num':return `Méthode${s} : 1) identifie les données utiles ; 2) choisis l’opération ; 3) calcule ; 4) contrôle le signe, l’unité et l’ordre de grandeur.`;
 case'frac':return `Méthode${s} : 1) identifie ce que représentent numérateur et dénominateur ; 2) mets les fractions sous une forme compatible si nécessaire ; 3) effectue l’opération ; 4) simplifie si possible.`;
 case'choice':return `Méthode${s} : 1) relis chaque choix avec la consigne ; 2) élimine ce qui est impossible ; 3) justifie mentalement le dernier choix avant de cliquer.`;
 case'order':return `Méthode${s} : 1) trouve l’élément qui peut commencer ; 2) repère les liens logiques ou grammaticaux ; 3) relis toute la suite avant de valider.`;
 case'multi':return `Méthode${s} : 1) résous la première ligne ; 2) vérifie-la ; 3) passe à la suivante ; 4) fais un contrôle global à la fin.`;
 case'text':return `Méthode${s} : 1) repère le mot-clé de la consigne ; 2) retrouve la règle ou l’information utile ; 3) formule une réponse courte ; 4) relis-la dans son contexte.`;
 default:return `Méthode${s} : découpe la tâche en petites étapes, réalise la première, contrôle-la, puis avance une étape à la fois.`;}}
function level(){return M&&Number.isFinite(+M.hintLevel)?+M.hintLevel:0;}
function panel(q,cid,lvl){const title=lvl===1?'Petit indice':lvl===2?'Étape suivante':'Méthode guidée',body=lvl===1?lightHint(q,cid):lvl===2?secondHint(q,cid):methodHint(q,cid),cost=lvl===1?'Ce petit coup de pouce ne réduit pas tes XP.':'Aide approfondie utilisée : XP divisés par 2 pour cette question.',next=lvl<3?`<button class="btn ghost ph-next" data-a="hint">${lvl===1?'💡 Encore un indice':'🧭 Voir la méthode'}</button>`:'';return `<div class="fb tip ph-card" data-hint-level="${lvl}"><div class="ph-head"><img src="${FINOT_IMG.indice}" alt="" aria-hidden="true" class="finot-live"><div><b>${title}</b><span class="ph-step">${lvl}/3</span></div></div><p>${escH(body)}</p><small>${cost}</small>${next}</div>`;}
function show(){if(!M||M.locked||!M.q)return false;const lvl=Math.min(3,level()+1);M.hintLevel=lvl;if(lvl>=2)M.hint=true;const fb=document.querySelector('#fb');if(fb)fb.innerHTML=panel(M.q,M.cid,lvl);try{window.MQFinotLive?.emit?.('finot.thinking',{text:lvl===1?'Je te donne juste un petit coup de pouce.':lvl===2?'On avance d’une étape ensemble.':'Je te montre la méthode, sans donner la réponse.'});}catch(e){}return true;}
function reset({M:m}={}){if(m){m.hintLevel=0;m.hint=false;}}
MQHooks.on('question:after-render',reset,{id:'progressive-hints-reset',order:4});
MQHooks.on('profile:changed',()=>{}, {id:'progressive-hints-profile',order:4});
ACT.hint=show;
root.MQProgressiveHints={version:'1.0',show,lightHint,secondHint,methodHint,get level(){return level();}};
})(typeof window!=='undefined'?window:globalThis);
