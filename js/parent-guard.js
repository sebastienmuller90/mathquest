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

/* ---------- Limitation PERSISTANTE des tentatives (S-02) ---------- */
/* État au niveau de l'APPAREIL (clé propre, jamais dans un profil) : il survit au rechargement et au redémarrage.
   5 échecs consécutifs sont tolérés ; ensuite verrou croissant : 30 s, 1 min, 5 min, 15 min, puis 1 h. Un succès remet tout à zéro.
   Horloge : un retour en arrière ne prolonge jamais le verrou au-delà de sa durée initiale (il est recalé sur « maintenant + durée »),
   et ne le lève pas. Limite assumée : avancer l'horloge de l'appareil lève le verrou — ce garde-fou arrête l'essai en rafale par un
   enfant, pas un adulte qui manipule les réglages du système. */
const LOCK_KEY='mathquest_parentlock_v1',FREE=5,STEPS=[30e3,60e3,300e3,900e3,3600e3];
const nn=v=>Number.isFinite(+v)&&+v>0?+v:0;
function readLock(){try{const o=JSON.parse(localStorage.getItem(LOCK_KEY)||'null');if(o&&typeof o==='object')return {fails:Math.min(1e6,Math.floor(nn(o.fails))),until:nn(o.until),wait:Math.min(STEPS[STEPS.length-1],nn(o.wait))};}catch(e){}return {fails:0,until:0,wait:0};}
function writeLock(o){try{localStorage.setItem(LOCK_KEY,JSON.stringify(o));}catch(e){}}
function lockState(){const o=readLock(),now=Date.now();let remain=o.until-now;
 if(remain>o.wait){remain=o.wait;o.until=now+o.wait;writeLock(o);}  // horloge reculée : recalage, jamais d'enfermement prolongé
 return {locked:remain>0,remainMs:Math.max(0,remain),fails:o.fails};}
function failure(){const o=readLock(),now=Date.now();o.fails+=1;if(o.fails>=FREE){o.wait=STEPS[Math.min(o.fails-FREE,STEPS.length-1)];o.until=now+o.wait;}writeLock(o);return lockState();}
function success(){try{localStorage.removeItem(LOCK_KEY);}catch(e){}}
function fmtDuration(ms){const s=Math.max(1,Math.ceil(ms/1000));if(s<60)return s+(s>1?' secondes':' seconde');const m=Math.ceil(s/60);if(m<60)return m+(m>1?' minutes':' minute');const h=Math.ceil(m/60);return h+(h>1?' heures':' heure');}
function lockMessage(st){return 'Trop d’essais pour l’instant. Réessaie dans '+fmtDuration(st.remainMs)+'.';}

window.MQParentGuard=Object.freeze({randBytes,randInt,challenge,newChallenge,answer,adultOk,adultConsume,lockState,failure,success,lockMessage});
})();
