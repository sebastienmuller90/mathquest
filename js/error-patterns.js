/* Finot Académie — détection prudente d'erreurs-types.
   Ne classe que des signatures mathématiques déterministes. Si la confiance est insuffisante : aucun diagnostic.
   Complète le carnet/coach existants sans modifier la correction ni la maîtrise. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined'||typeof ACT!=='object')return;
let LAST=null;
const EPS=1e-9;
const escP=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const profileId=()=>{try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}};
function ensure(){if(!S.errorPatterns||typeof S.errorPatterns!=='object'||Array.isArray(S.errorPatterns))S.errorPatterns={events:[],counts:{}};if(!Array.isArray(S.errorPatterns.events))S.errorPatterns.events=[];if(!S.errorPatterns.counts||typeof S.errorPatterns.counts!=='object'||Array.isArray(S.errorPatterns.counts))S.errorPatterns.counts={};return S.errorPatterns;}
function txt(q){return String(q?.q||q?.text||q?.prompt||'').replace(/[−–—]/g,'-').replace(/\s+/g,' ').trim();}
function scalar(v){if(Array.isArray(v))return v.length===1?v[0]:null;if(v&&typeof v==='object')return null;return v;}
function num(v){v=scalar(v);if(v==null)return null;const s=String(v).trim().replace(/\s/g,'').replace(',','.').replace(/[−–—]/g,'-');if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(s))return null;const n=Number(s);return Number.isFinite(n)?n:null;}
function frac(v){v=scalar(v);if(v==null)return null;const s=String(v).trim().replace(/\s/g,'').replace(/[−–—]/g,'-');const m=s.match(/^([+-]?\d+)\/([+-]?\d+)$/);if(!m||+m[2]===0)return null;return {n:+m[1],d:+m[2],v:+m[1]/+m[2]};}
function eq(a,b){return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<EPS;}
function correctNum(q){const f=frac(q?.ans);return f?f.v:num(q?.ans);}
function parseBinary(q){const s=txt(q).replace(/,/g,'.');const m=s.match(/([+-]?\d+(?:\.\d+)?)\s*([+×xX*÷:/])\s*([+-]?\d+(?:\.\d+)?)/);return m?{a:+m[1],op:m[2],b:+m[3]}:null;}
function parseFractionOp(q){const s=txt(q);const m=s.match(/([+-]?\d+)\s*\/\s*(\d+)\s*([+−-])\s*([+-]?\d+)\s*\/\s*(\d+)/);return m?{a:+m[1],b:+m[2],op:m[3],c:+m[4],d:+m[5]}:null;}
function noCarryAdd(a,b){if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0)return null;let p=1,out=0,x=a,y=b;while(x>0||y>0){out+=(((x%10)+(y%10))%10)*p;x=Math.floor(x/10);y=Math.floor(y/10);p*=10;}return out;}
const PATTERNS={
 sign:{label:'Confusion de signe',explain:'Le nombre semble correct en valeur, mais son signe a été inversé. Vérifie si la situation demande un nombre positif ou négatif.',tip:'Avant de calculer, entoure mentalement le signe attendu.'},
 decimal:{label:'Virgule décalée',explain:'Le résultat ressemble exactement à la bonne valeur avec la virgule déplacée d’un ou deux rangs.',tip:'Estime l’ordre de grandeur avant de placer la virgule.'},
 'mul-as-add':{label:'Multiplication remplacée par une addition',explain:'Le résultat donné correspond à la somme des deux nombres alors que la question demandait une multiplication.',tip:'Repère le symbole × avant de commencer le calcul.'},
 'add-as-mul':{label:'Addition remplacée par une multiplication',explain:'Le résultat donné correspond au produit des deux nombres alors que la question demandait une addition.',tip:'Nomme l’opération à voix basse avant de calculer.'},
 'carry-forgotten':{label:'Retenue oubliée',explain:'Le résultat correspond exactement à une addition colonne par colonne où les retenues ont été supprimées.',tip:'À chaque colonne qui dépasse 9, écris ou garde la retenue avant de passer à la suivante.'},
 'fraction-add-denominators':{label:'Dénominateurs additionnés',explain:'Le résultat correspond à l’erreur classique consistant à additionner les numérateurs ET les dénominateurs.',tip:'Pour additionner des fractions, commence par obtenir des dénominateurs compatibles ; on ne les additionne pas.'},
 'quotient-remainder-swap':{label:'Quotient et reste inversés',explain:'La valeur donnée correspond à l’autre information de la division euclidienne : quotient à la place du reste, ou inversement.',tip:'Relis le mot demandé : quotient = nombre de groupes complets ; reste = ce qui n’entre pas dans les groupes.'},
 'order-reversed':{label:'Ordre complètement inversé',explain:'Les bons éléments semblent avoir été utilisés, mais dans l’ordre exactement inverse.',tip:'Cherche d’abord ce qui doit obligatoirement être au début, puis construis la suite progressivement.'}
};
function hit(id,confidence,meta={}){const p=PATTERNS[id];return p?{id,label:p.label,explain:p.explain,tip:p.tip,confidence,...meta}:null;}
function detect(q,your){const y=num(your),c=correctNum(q),bin=parseBinary(q),fq=parseFractionOp(q),yf=frac(your);
 // Signe : même valeur absolue, signe opposé.
 if(y!=null&&c!=null&&c!==0&&eq(y,-c))return hit('sign',.99);
 // Virgule déplacée de 10 ou 100, mais pas simple erreur d'arrondi.
 if(y!=null&&c!=null&&c!==0&&!eq(y,c)&&[10,.1,100,.01].some(k=>eq(y,c*k)))return hit('decimal',.97,{factor:y/c});
 if(bin&&y!=null){const mul=bin.a*bin.b,add=bin.a+bin.b;
  if(/[×xX*]/.test(bin.op)&&eq(y,add)&&!eq(y,mul))return hit('mul-as-add',.99,{a:bin.a,b:bin.b});
  if(bin.op==='+'&&eq(y,mul)&&!eq(y,add))return hit('add-as-mul',.99,{a:bin.a,b:bin.b});
  if(bin.op==='+'&&Number.isInteger(bin.a)&&Number.isInteger(bin.b)){const nc=noCarryAdd(bin.a,bin.b);if(nc!=null&&eq(y,nc)&&!eq(y,bin.a+bin.b))return hit('carry-forgotten',.99,{a:bin.a,b:bin.b});}
  if(/[÷:]/.test(bin.op)&&Number.isInteger(bin.a)&&Number.isInteger(bin.b)&&bin.b>0){const qu=Math.floor(bin.a/bin.b),r=bin.a%bin.b,s=txt(q).toLowerCase();if(/quotient/.test(s)&&eq(y,r)&&!eq(qu,r))return hit('quotient-remainder-swap',.99,{wanted:'quotient',quotient:qu,remainder:r});if(/reste/.test(s)&&eq(y,qu)&&!eq(qu,r))return hit('quotient-remainder-swap',.99,{wanted:'reste',quotient:qu,remainder:r});}}
 if(fq&&fq.op==='+'&&yf){const naiveN=fq.a+fq.c,naiveD=fq.b+fq.d;if(naiveD&&eq(yf.v,naiveN/naiveD)){const real=fq.a/fq.b+fq.c/fq.d;if(!eq(yf.v,real))return hit('fraction-add-denominators',.995,{fractions:[`${fq.a}/${fq.b}`,`${fq.c}/${fq.d}`]});}}
 if(q?.type==='order'&&Array.isArray(q.tokens)){const good=String(q.ans??'').trim().replace(/\s+/g,' '),got=Array.isArray(your)?your.join(' '):String(your??'').trim().replace(/\s+/g,' '),rev=good.split(' ').reverse().join(' ');if(good&&got===rev&&got!==good)return hit('order-reversed',.99);}
 return null;}
function record(cid,q,your,pat){if(!pat||pat.confidence<.9)return null;const st=ensure(),e={t:Date.now(),cid:String(cid||''),id:pat.id,label:pat.label,confidence:pat.confidence,q:txt(q).slice(0,180),your:String(scalar(your)??'').slice(0,80)};st.events.push(e);if(st.events.length>120)st.events.splice(0,st.events.length-120);const c=st.counts[pat.id]||(st.counts[pat.id]={n:0,last:0,chapters:{}});c.n++;c.last=e.t;c.chapters[e.cid]=(c.chapters[e.cid]||0)+1;LAST={profile:profileId(),...e,pattern:pat};try{saveLocal();}catch(err){}return e;}
function top(limit=5){const st=ensure();return Object.entries(st.counts).map(([id,x])=>({id,label:PATTERNS[id]?.label||id,n:+x.n||0,last:+x.last||0,chapters:x.chapters||{}})).sort((a,b)=>b.n-a.n||b.last-a.last).slice(0,limit);}
function card(pat){return `<div class="mq-pattern-card"><div><b>🧩 Finot a repéré une piste</b><span>${Math.round(pat.confidence*100)} % de confiance</span></div><p>Ça ressemble à : <strong>${escP(pat.label)}</strong>.</p><small>${escP(pat.tip)}</small><button class="btn ghost" data-a="patternhelp">🦊 M’expliquer cette erreur</button></div>`;}
function showCard(pat){const fb=document.querySelector('#fb .fb,#fb .lfb,#fb .lesson-feedback');if(fb&&!fb.querySelector('.mq-pattern-card'))fb.insertAdjacentHTML('beforeend',card(pat));}
function onAnswer(x){if(x?.ok)return;const your=x?.M?.your??x?.your??'';const pat=detect(x?.q,your);if(!pat)return;record(x.cid,x.q,your,pat);showCard(pat);}
function explain(){if(!LAST||LAST.profile!==profileId())return false;const p=LAST.pattern;try{finotOpen?.();setTimeout(()=>{finotChatEnsure?.();finotPush?.('finot',`<b>🧩 ${escP(p.label)}</b><p>${escP(p.explain)}</p><p><b>Pour la prochaine fois :</b> ${escP(p.tip)}</p><p class="muted small">Je l’ai reconnu grâce à la forme exacte de ta réponse. Si le motif n’est pas assez sûr, je préfère ne rien étiqueter.</p>`);finotChipsRender?.();},20);}catch(e){}return true;}
MQHooks.on('answer:after',onAnswer,{id:'error-patterns-answer',order:24});
MQHooks.on('profile:changed',()=>{LAST=null;ensure();},{id:'error-patterns-profile',order:3});
ACT.patternhelp=explain;
ensure();
root.MQErrorPatterns={version:'1.0',patterns:PATTERNS,detect,record,top,explain,get last(){return LAST&&LAST.profile===profileId()?LAST:null;}};
})(typeof window!=='undefined'?window:globalThis);
