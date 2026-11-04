/* Finot Académie — garde de l'espace Parents (04/11/2026, audit de sécurité S-01 à S-04).
   Fichier classique (pas de module) : tout passe par l'objet global MQParentGuard.
   HONNÊTETÉ : un code parent à 4 chiffres reste une barrière d'USAGE (10 000 combinaisons), pas un secret fort.
   Le gain réel de sécurité vient (1) de la porte adulte avant la création du premier code et (2) du verrou de tentatives. */
(function(){
'use strict';

/* ---------- Aléa cryptographique (jamais Math.random pour la porte adulte ni la clé de secours) ---------- */
function randBytes(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return a;}
/* Entier uniforme dans [min,max] par rejet (pas de biais de modulo). */
function randInt(min,max){const span=max-min+1,lim=Math.floor(0x100000000/span)*span;let x;do{x=crypto.getRandomValues(new Uint32Array(1))[0];}while(x>=lim);return min+x%span;}

/* ---------- Porte adulte (S-03) ---------- */
/* Défi : « a × b + c − d », avec a de 14 à 29 et b de 13 à 19 (produit à deux chiffres par deux chiffres, hors programme
   avant la 6e), c de 100 à 299 et d de 40 à 99. Résultat toujours supérieur à 150. Une calculatrice ou du papier sont permis :
   il s'agit d'écarter un jeune enfant, pas d'éprouver un adulte. Le résultat attendu reste dans cette fermeture. */
let CH=null,adultUntil=0;
function newChallenge(){const a=randInt(14,29),b=randInt(13,19),c=randInt(100,299),d=randInt(40,99);CH={ans:a*b+c-d,a,b,c,d};return {a,b,c,d};}
function challenge(){return CH?{a:CH.a,b:CH.b,c:CH.c,d:CH.d}:newChallenge();}
/* Vrai si la réponse est exacte. Une réponse fausse ou illisible invalide le défi courant (il faudra en tirer un autre). */
function answer(v){const t=String(v==null?'':v).replace(/\s+/g,'');const ok=!!CH&&/^\d{1,6}$/.test(t)&&+t===CH.ans;CH=null;if(ok)adultUntil=Date.now()+5*60*1000;return ok;}
/* Vrai pendant 5 minutes après un défi réussi ; consommé par la création du code. */
function adultOk(){return Date.now()<adultUntil;}
function adultConsume(){adultUntil=0;CH=null;}

window.MQParentGuard=Object.freeze({randBytes,randInt,challenge,newChallenge,answer,adultOk,adultConsume});
})();
