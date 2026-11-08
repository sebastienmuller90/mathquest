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

/* ---------- Empreinte du code (S-01) : SHA-256 salé et itéré, JS pur et SYNCHRONE ---------- */
/* Pas de WebCrypto subtle (asynchrone, absent hors contexte sécurisé comme file://) : les gestionnaires existants restent synchrones.
   Format stocké : « s2$sel(hex)$itérations$empreinte(hex) ». L'ancien format (hachage polynomial 32 bits en base 36, sans sel) reste
   LU pour permettre la migration : il est remplacé par le nouveau format au prochain déverrouillage réussi.
   Rappel : sel et itérations ralentissent un calcul massif hors de l'appareil, mais 10 000 codes à 4 chiffres restent énumérables ;
   c'est le verrou de tentatives, pas l'empreinte, qui protège un enfant qui essaie des codes sur l'appareil. */
const ITER=10000,MAXITER=200000;
const K=new Uint32Array(64),H0=new Uint32Array(8);
(function(){const primes=[];for(let n=2;primes.length<64;n++){let ok=true;for(const q of primes){if(q*q>n)break;if(n%q===0){ok=false;break;}}if(ok)primes.push(n);}
 const frac=x=>Math.floor((x-Math.floor(x))*4294967296);
 for(let i=0;i<64;i++)K[i]=frac(Math.cbrt(primes[i]));for(let i=0;i<8;i++)H0[i]=frac(Math.sqrt(primes[i]));})();
const W=new Uint32Array(64);
function rotr(x,n){return (x>>>n)|(x<<(32-n));}
function sha256(bytes){const l=bytes.length,nb=((l+9+63)>>6),buf=new Uint8Array(nb*64);buf.set(bytes);buf[l]=0x80;
 const dv=new DataView(buf.buffer);dv.setUint32(nb*64-8,Math.floor(l/0x20000000));dv.setUint32(nb*64-4,(l<<3)>>>0);
 const h=new Uint32Array(H0);
 for(let o=0;o<nb*64;o+=64){for(let i=0;i<16;i++)W[i]=dv.getUint32(o+4*i);
  for(let i=16;i<64;i++){const a=W[i-15],b=W[i-2];W[i]=(W[i-16]+(rotr(a,7)^rotr(a,18)^(a>>>3))+W[i-7]+(rotr(b,17)^rotr(b,19)^(b>>>10)))>>>0;}
  let a=h[0],b=h[1],c=h[2],d=h[3],e=h[4],f=h[5],g=h[6],hh=h[7];
  for(let i=0;i<64;i++){const t1=(hh+(rotr(e,6)^rotr(e,11)^rotr(e,25))+((e&f)^(~e&g))+K[i]+W[i])>>>0,t2=((rotr(a,2)^rotr(a,13)^rotr(a,22))+((a&b)^(a&c)^(b&c)))>>>0;
   hh=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;}
  h[0]+=a;h[1]+=b;h[2]+=c;h[3]+=d;h[4]+=e;h[5]+=f;h[6]+=g;h[7]+=hh;}
 const out=new Uint8Array(32),ov=new DataView(out.buffer);for(let i=0;i<8;i++)ov.setUint32(4*i,h[i]);return out;}
const toHex=u=>Array.from(u,x=>x.toString(16).padStart(2,'0')).join('');
const fromHex=s=>{const u=new Uint8Array(s.length/2);for(let i=0;i<u.length;i++)u[i]=parseInt(s.substr(2*i,2),16);return u;};
const utf8=s=>new TextEncoder().encode(String(s));
function sha256hex(s){return toHex(sha256(utf8(s)));}
function derive(code,salt,iters){const c=utf8(code),buf=new Uint8Array(32+salt.length+c.length);buf.set(salt,32);buf.set(c,32+salt.length);
 let h=sha256(buf.subarray(32));for(let i=1;i<iters;i++){buf.set(h,0);h=sha256(buf);}return toHex(h);}
/* Égalité de deux chaînes sans sortie anticipée (le temps ne dépend pas de la position de la première différence). */
function ctEqual(a,b){a=String(a);b=String(b);let d=a.length^b.length;const n=Math.max(a.length,b.length);for(let i=0;i<n;i++)d|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return d===0;}
function hash(code){const salt=randBytes(16);return 's2$'+toHex(salt)+'$'+ITER+'$'+derive(code,salt,ITER);}
/* Ancien hachage (32 bits, sans sel) : conservé UNIQUEMENT pour reconnaître les codes déjà enregistrés avant la migration. */
const legacyHash=s=>Array.from(String(s)).reduce((a,c)=>(Math.imul(a,31)+c.charCodeAt(0))>>>0,7919).toString(36);
const isLegacy=stored=>typeof stored==='string'&&stored!==''&&stored.indexOf('s2$')!==0;
function verify(code,stored){if(typeof code!=='string'||!code||typeof stored!=='string'||!stored)return false;
 if(stored.indexOf('s2$')===0){const p=stored.split('$');if(p.length!==4||!/^[0-9a-f]{32}$/.test(p[1])||!/^[0-9a-f]{64}$/.test(p[3]))return false;const it=+p[2];if(!(it>=1&&it<=MAXITER&&Math.floor(it)===it))return false;return ctEqual(derive(code,fromHex(p[1]),it),p[3]);}
 return ctEqual(legacyHash(code),stored);}
/* Clé de secours : 8 caractères sans ambiguïté (ni I, O, 0, 1, L), tirés de crypto.getRandomValues, jamais de Math.random. */
function newRecKey(){const A='ABCDEFGHJKMNPQRSTUVWXYZ23456789';let k='';for(let i=0;i<8;i++)k+=A[randInt(0,A.length-1)];return k;}

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

/* ---------- Code parent = code de l'APPAREIL (S-04) ---------- */
/* Le code reste stocké dans chaque profil (clés de stockage et format inchangés : aucune sauvegarde n'est cassée), mais il est
   toujours écrit dans TOUS les profils à la fois : un changement ou une réinitialisation vaut donc pour l'appareil entier. */
const prof=()=>Object.values((typeof PDB!=='undefined'&&PDB&&PDB.profiles)||{}).filter(v=>v&&typeof v==='object'&&!Array.isArray(v));
function setCode(pin,rec){for(const p of prof()){p.pin=pin;if(rec!==undefined)p.rec=rec;}S.pin=pin;if(rec!==undefined)S.rec=rec;}
/* Migration au démarrage : un appareil installé avant ce correctif peut avoir des codes différents d'un profil à l'autre, ou un
   code sur certains profils seulement. Le code du profil actif l'emporte ; à défaut, le premier code existant parmi les autres
   profils. Rien n'est inventé : sans aucun code, rien ne change. Seuls les champs pin/rec sont touchés. */
function unify(){try{const act=(typeof PDB!=='undefined'&&PDB&&PDB.profiles&&PDB.profiles[ACTIVE])||S;
 const src=(act&&act.pin)?act:prof().find(p=>p.pin);if(!src)return false;
 const pin=src.pin,rec=src.rec||'';let changed=false;
 for(const p of prof()){if(p.pin!==pin||(p.rec||'')!==rec){p.pin=pin;p.rec=rec;changed=true;}}
 if(S&&(S.pin!==pin||(S.rec||'')!==rec)){S.pin=pin;S.rec=rec;changed=true;}
 if(changed&&typeof saveLocal==='function')saveLocal();return changed;}catch(e){return false;}}

window.MQParentGuard=Object.freeze({sha256hex,hash,verify,isLegacy,ctEqual,newRecKey,setCode,unify,randBytes,randInt,challenge,newChallenge,answer,adultOk,adultConsume,lockState,failure,success,lockMessage});
})();
