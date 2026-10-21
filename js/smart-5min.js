/* Finot Académie — séance « 5 minutes intelligentes ».
   Compose une courte mission à partir des preuves déjà présentes : erreurs, révisions dues,
   maîtrise, réponses récentes et rythme réel de l'enfant. Aucun second moteur de progression. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined'||typeof ACT!=='object')return;
let ACTIVE_SESSION=null;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const profileId=()=>{try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}};
const esc5=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function ensure(){if(!S.smart5||typeof S.smart5!=='object'||Array.isArray(S.smart5))S.smart5={history:[]};if(!Array.isArray(S.smart5.history))S.smart5.history=[];return S.smart5;}
function subjectId(cid){try{return sOf(WMAP[cid].id).id;}catch(e){return'';}}
function recentRows(){return (Array.isArray(S.answerLog)?S.answerLog:[]).slice(-60);}
function medianMs(){const a=recentRows().map(x=>+x.ms||0).filter(x=>x>=3000&&x<=180000).slice(-40).sort((a,b)=>a-b);if(a.length<4)return 34000;const m=Math.floor(a.length/2);return a.length%2?a[m]:Math.round((a[m-1]+a[m])/2);}
function questionCount(){const per=Math.max(18000,medianMs()+8000);return clamp(Math.round(285000/per),4,8);}
function unresolved(cid){const a=S.mistakes?.[cid];return Array.isArray(a)?a.filter(x=>!x.seen).length:0;}
function recentAcc(cid){const a=recentRows().filter(x=>x.cid===cid).slice(-8);return a.length?a.filter(x=>x.ok).length/a.length:null;}
function recentCount(cid){return recentRows().slice(-12).filter(x=>x.cid===cid).length;}
function evidence(c){const id=c.id;return !!(S.lessons?.[id]||S.chap?.[id]?.tot||S.lessonScores?.[id]!=null||S.review?.[id]||unresolved(id)||MQAdaptive.mastery(S,id)>0);}
function factors(c){const id=c.id,m=MQAdaptive.mastery(S,id),err=unresolved(id),due=MQAdaptive.isDue(S,id),acc=recentAcc(id),recent=recentCount(id);let score=0;const why=[];
 if(err){score+=Math.min(160,85+35*(err-1));why.push({k:'error',v:err,t:err>1?`${err} erreurs à réparer`:'une erreur à réparer'});}
 if(due){score+=75;why.push({k:'due',v:1,t:'révision espacée due'});}
 if(m>0&&m<65){score+=(65-m)*1.1+35;why.push({k:'weak',v:65-m,t:`maîtrise fragile (${m} %)`});}
 else if(m>=65&&m<85){score+=25+(85-m)*.45;why.push({k:'consolidate',v:85-m,t:`à consolider (${m} %)`});}
 if(acc!=null&&acc<.75){score+=(1-acc)*45;why.push({k:'recent',v:1-acc,t:`réussite récente ${Math.round(acc*100)} %`});}
 if(!evidence(c))score-=90;
 if(m>=85&&!due&&!err)score-=35;
 score-=recent*11;
 return {c,score,m,err,due,acc,recent,why:why.sort((a,b)=>b.v-a.v)};
}
function eligible(){return (typeof ALLCH!=='undefined'?ALLCH:[]).filter(c=>WMAP?.[c.id]?.lvl===S.grade);}
function pickPlan(){const pool=eligible().map(factors).sort((a,b)=>b.score-a.score),picked=[],bySub={};
 // Trois priorités réelles maximum, avec diversité de matière.
 for(const x of pool){const sid=subjectId(x.c.id)||'other';if((bySub[sid]||0)>=2)continue;if(!evidence(x.c)&&picked.length>=2)continue;picked.push(x);bySub[sid]=(bySub[sid]||0)+1;if(picked.length>=4)break;}
 // Si le profil est neuf, utiliser les recommandations adaptatives de la classe plutôt que rester vide.
 if(picked.length<2){for(const c of eligible()){if(picked.some(x=>x.c.id===c.id))continue;picked.push(factors(c));if(picked.length>=3)break;}}
 // Finir si possible par une notion plutôt solide : sentiment de compétence sans donner une question triviale.
 const confidence=pool.find(x=>x.m>=65&&x.m<90&&!picked.some(p=>p.c.id===x.c.id));if(confidence&&picked.length<4)picked.push(confidence);
 const n=questionCount(),ids=picked.map(x=>x.c.id);return {at:Date.now(),n,medianMs:medianMs(),items:picked.map(x=>({id:x.c.id,name:x.c.name,icon:x.c.icon||'📘',subj:subjectId(x.c.id),mastery:x.m,reason:x.why[0]?.t||(x.m>=65?'consolidation':'entraînement adapté')})),ids};}
function reasonIcon(t){return /erreur/.test(t)?'🩹':/due/.test(t)?'🧠':/fragile/.test(t)?'🌱':/consolider/.test(t)?'🎯':'✨';}
function renderPlan(p){const sec=Math.round(p.medianMs/1000);return `<section class="card smart5-card" data-smart5="1"><div class="smart5-head"><div><div class="smart5-kicker">🦊 Séance personnalisée</div><h2>5 minutes intelligentes</h2><p class="muted small">Finot choisit ce qui est le plus utile maintenant — pas ce qui est simplement le plus facile.</p></div><span class="smart5-time">≈ 5 min</span></div><div class="smart5-plan">${p.items.map(x=>`<div class="smart5-item"><span class="smart5-icon">${x.icon}</span><div class="grow"><b>${esc5(x.name)}</b><small>${reasonIcon(x.reason)} ${esc5(x.reason)}</small></div><span class="smart5-mastery">${x.mastery||0}%</span></div>`).join('')}</div><div class="smart5-foot"><span class="muted small">${p.n} questions · rythme récent ≈ ${sec}s/réponse</span><div class="smart5-actions"><button class="btn ghost" data-a="smart5refresh">↻ Recalculer</button><button class="btn primary" data-a="smart5start">▶ Commencer</button></div></div></section>`;}
function inject(){try{if(typeof HOMETAB!=='undefined'&&HOMETAB!=='accueil')return false;const host=document.querySelector('.finot-card');if(!host||document.querySelector('[data-smart5="1"]'))return false;host.insertAdjacentHTML('afterend',renderPlan(pickPlan()));return true;}catch(e){return false;}}
function refresh(){const old=document.querySelector('[data-smart5="1"]');if(old)old.outerHTML=renderPlan(pickPlan());else inject();}
function start(){const p=pickPlan();if(!p.ids.length){try{toast('Finot prépare encore ton programme. Fais d’abord une activité.');}catch(e){}return false;}ensure();S.smart5.last={at:p.at,ids:p.ids,n:p.n};try{saveLocal();}catch(e){}ACTIVE_SESSION={profile:profileId(),at:p.at,ids:p.ids,n:p.n};startMission(p.ids,{n:p.n});return true;}
function finish({m}={}){if(!ACTIVE_SESSION||ACTIVE_SESSION.profile!==profileId()||!m)return;const h=ensure().history;h.push({at:ACTIVE_SESSION.at,ids:ACTIVE_SESSION.ids,n:ACTIVE_SESSION.n,ok:+m.ok||0,total:+m.n||ACTIVE_SESSION.n});if(h.length>20)h.splice(0,h.length-20);ACTIVE_SESSION=null;try{saveLocal();}catch(e){}}
MQHooks.on('home:rendered',()=>setTimeout(inject,0),{id:'smart5-home',order:96});
MQHooks.on('mission:end',finish,{id:'smart5-end',order:96});
MQHooks.on('profile:changed',()=>{ACTIVE_SESSION=null;setTimeout(inject,0);},{id:'smart5-profile',order:96});
ACT.smart5start=start;ACT.smart5refresh=refresh;
root.MQSmart5={version:'1.0',plan:pickPlan,questionCount,medianMs,start,inject,refresh};
ensure();
})(typeof window!=='undefined'?window:globalThis);
