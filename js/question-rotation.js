/* MathQuest — rotation anti-mémorisation des exercices.
   Les générateurs existants restent la source de vérité ; ce moteur change leur graine toutes les 12 h,
   maintient un historique court et réserve un espace de tirage séparé aux interrogations parent.
   V1.2 : mémoire bornée, écritures groupées et tirages reproductibles pour reprendre un contrôle après rechargement. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof CHMAP==='undefined')return;
const KEY='mathquest_question_rotation_v1',WINDOW_MS=12*60*60*1000,RECENT_MAX=16,CARRY=6,KEEP_WINDOWS=3;
let mode='practice',mem=null,saveTimer=null,dirty=0,lastPrune=0;
const nowWindow=()=>Math.floor(Date.now()/WINDOW_MS);
function loadMem(){if(mem)return mem;try{mem=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){mem=null;}if(!mem||typeof mem!=='object'||!mem.b)mem={v:1,b:{}};return mem;}
function persist(){if(!mem||!dirty)return;try{localStorage.setItem(KEY,JSON.stringify(mem));dirty=0;}catch(e){}clearTimeout(saveTimer);saveTimer=null;}
function scheduleSave(){dirty++;if(dirty>=24)return persist();if(!saveTimer)saveTimer=setTimeout(persist,700);}
function prune(){const M=loadMem(),w=nowWindow();if(lastPrune===w)return;lastPrune=w;for(const [k,b] of Object.entries(M.b))if(!b||!Number.isFinite(+b.w)||+b.w<w-KEEP_WINDOWS)delete M.b[k];scheduleSave();}
function activeProfile(){try{return typeof ACTIVE==='string'&&ACTIVE?ACTIVE:(PDB&&PDB.active)||'default';}catch(e){return 'default';}}
function hash32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function plain(s){return String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
function signature(q){if(!q)return 'null';let a='';if(q.type==='choice')a=plain(q.choices?.[q.ans]);else if(q.type==='frac')a=(q.ans||[]).join('/');else if(q.type==='multi')a=(q.ans||[]).join('|');else if(q.type==='text')a=(q.acc||[])[0]||'';else a=String(q.ans??'');return hash32([q.type,plain(q.q),plain(a)].join('|')).toString(36);}
function original(cid){const ch=CHMAP[cid],orig=ch&&ch.__mqOriginalGenerator;if(!orig)throw new Error('Générateur absent : '+cid);return [ch,orig];}
function generateSeeded(cid,d,m,seedKey){const [ch,orig]=original(cid),old=Math.random,seed=hash32([cid,d,m||'practice',String(seedKey)].join('|'));try{Math.random=rng(seed);return orig.call(ch,d);}finally{Math.random=old;}}
function bucket(cid,d,m){prune();const M=loadMem(),w=nowWindow(),k=[activeProfile(),cid,d,m].join('|');let b=M.b[k];if(!b||b.w!==w)b=M.b[k]={w,c:0,recent:Array.isArray(b?.recent)?b.recent.slice(-CARRY):[]};return b;}
function generate(cid,d,m=mode){const [ch,orig]=original(cid),b=bucket(cid,d,m),w=nowWindow();let q=null,sig='';
 for(let attempt=0;attempt<12;attempt++){
  const n=b.c++,seed=hash32([cid,d,m,w,n,attempt].join('|')),old=Math.random;try{Math.random=rng(seed);q=orig.call(ch,d);}finally{Math.random=old;}
  sig=signature(q);if(!b.recent.includes(sig)||attempt===11)break;
 }
 b.recent.push(sig);if(b.recent.length>RECENT_MAX)b.recent.splice(0,b.recent.length-RECENT_MAX);scheduleSave();return q;}
for(const ch of Object.values(CHMAP))if(ch&&typeof ch.g==='function'&&!ch.__mqRotationWrapped){ch.__mqOriginalGenerator=ch.g;ch.g=function(d){return generate(ch.id,d,mode);};ch.__mqRotationWrapped=true;}
function withMode(next,fn){const prev=mode;mode=next||'practice';try{return fn();}finally{mode=prev;}}
function resetForTests(){mem={v:1,b:{}};dirty=1;persist();}
window.addEventListener('pagehide',persist);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persist();});
window.MQQuestionRotation={version:'1.2',windowHours:12,recentMax:RECENT_MAX,generate,generateSeeded,withMode,signature,resetForTests,flush:persist,get mode(){return mode;}};
})();
