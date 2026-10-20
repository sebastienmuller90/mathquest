/* MathQuest — rotation anti-mémorisation des exercices.
   Les générateurs existants restent la source de vérité ; ce moteur change leur graine toutes les 12 h,
   maintient un historique court et réserve un espace de tirage séparé aux interrogations parent. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const KEY='mathquest_question_rotation_v1',WINDOW_MS=12*60*60*1000,RECENT_MAX=48;
let mode='practice',mem=null;
const nowWindow=()=>Math.floor(Date.now()/WINDOW_MS);
function loadMem(){if(mem)return mem;try{mem=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){mem=null;}if(!mem||typeof mem!=='object')mem={v:1,b:{}};return mem;}
function saveMem(){try{localStorage.setItem(KEY,JSON.stringify(mem));}catch(e){}}
function activeProfile(){try{return typeof ACTIVE==='string'&&ACTIVE?ACTIVE:(PDB&&PDB.active)||'default';}catch(e){return 'default';}}
function hash32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function plain(s){return String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
function signature(q){if(!q)return 'null';let a='';if(q.type==='choice')a=plain(q.choices?.[q.ans]);else if(q.type==='frac')a=(q.ans||[]).join('/');else if(q.type==='multi')a=(q.ans||[]).join('|');else if(q.type==='text')a=(q.acc||[])[0]||'';else a=String(q.ans??'');return hash32([q.type,plain(q.q),plain(a)].join('|')).toString(36);}
function bucket(cid,d,m){const M=loadMem(),w=nowWindow(),k=[activeProfile(),cid,d,m].join('|');let b=M.b[k];if(!b||b.w!==w)b=M.b[k]={w,c:0,recent:Array.isArray(b?.recent)?b.recent.slice(-12):[]};return b;}
function generate(cid,d,m=mode){const ch=CHMAP[cid],orig=ch&&ch.__mqOriginalGenerator;if(!orig)throw new Error('Générateur absent : '+cid);const b=bucket(cid,d,m),w=nowWindow();let q=null,sig='';
 for(let attempt=0;attempt<12;attempt++){
  const n=b.c++,seed=hash32([cid,d,m,w,n,attempt].join('|')),old=Math.random;try{Math.random=rng(seed);q=orig.call(ch,d);}finally{Math.random=old;}
  sig=signature(q);if(!b.recent.includes(sig)||attempt===11)break;
 }
 b.recent.push(sig);if(b.recent.length>RECENT_MAX)b.recent.splice(0,b.recent.length-RECENT_MAX);saveMem();return q;}
for(const ch of Object.values(CHMAP))if(ch&&typeof ch.g==='function'&&!ch.__mqRotationWrapped){ch.__mqOriginalGenerator=ch.g;ch.g=function(d){return generate(ch.id,d,mode);};ch.__mqRotationWrapped=true;}
function withMode(next,fn){const prev=mode;mode=next||'practice';try{return fn();}finally{mode=prev;}}
function resetForTests(){mem={v:1,b:{}};saveMem();}
window.MQQuestionRotation={version:'1.0',windowHours:12,generate,withMode,signature,resetForTests,get mode(){return mode;}};
})();
