/* Finot Académie — Carnet d'erreurs à réparer.
   Extension non destructive : S.mistakes reste la source de vérité ; answerLog fournit les tentatives ; review fournit l'échéance.
   Seul S.errorRepair.rewarded mémorise les petites récompenses déjà données. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;
let ACTIVE=null,REPAIR_STREAK=0,SEEN_BEFORE=0;
const escR=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
function state(){
 if(!S.errorRepair||typeof S.errorRepair!=='object'||Array.isArray(S.errorRepair))S.errorRepair={};
 if(!S.errorRepair.rewarded||typeof S.errorRepair.rewarded!=='object'||Array.isArray(S.errorRepair.rewarded))S.errorRepair.rewarded={};
 const ks=Object.keys(S.errorRepair.rewarded);if(ks.length>500)ks.sort((a,b)=>(+S.errorRepair.rewarded[b]||0)-(+S.errorRepair.rewarded[a]||0)).slice(500).forEach(k=>delete S.errorRepair.rewarded[k]);
 return S.errorRepair;
}
function hash(s){let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return(h>>>0).toString(36);}
function keyOf(cid,x){return'er-'+hash([cid,+x.at||0,x.q||'',x.answer||''].join('|'));}
function attempts(cid,at){return(S.answerLog||[]).filter(a=>a&&a.cid===cid&&(+a.t||0)>=(+at||0));}
function trailingGood(list){let n=0;for(let i=list.length-1;i>=0&&list[i].ok;i--)n++;return n;}
function items(){const out=[];for(const [cid,a] of Object.entries(S.mistakes||{})){if(!Array.isArray(a)||!CHMAP[cid])continue;for(const x of a){if(!x||typeof x!=='object')continue;const ans=attempts(cid,x.at),mastery=MQAdaptive.mastery(S,cid),next=+S.review?.[cid]?.next||0,seen=+x.seen||0,key=keyOf(cid,x),rewarded=+state().rewarded[key]||0;let status='due';if(seen)status=mastery>=85?'mastered':'repaired';else if(ans.length)status='progress';else if(next>Date.now())status='planned';out.push({key,cid,x,ans,tries:ans.length,streak:trailingGood(ans),mastery,next,seen,rewarded,status});}}
 return out.sort((a,b)=>{const done=(a.seen?1:0)-(b.seen?1:0);if(done)return done;const due=(a.next||0)-(b.next||0);if(due)return due;return(+b.x.at||0)-(+a.x.at||0);});}
function find(key){return items().find(x=>x.key===key)||null;}
function label(item){const w=WMAP[item.cid],c=CHMAP[item.cid],s=w&&typeof sOf==='function'?sOf(w.id):null;return `${c?.icon||'📘'} ${escR(c?.name||'Notion')}${s?` <span class="muted small">· ${escR(s.name)} ${escR(w.lvl)}</span>`:''}`;}
function dueText(item){if(item.seen)return item.status==='mastered'?'Maîtrisée':'Réparée';if(!item.next||item.next<=Date.now())return'À revoir maintenant';return typeof MQAdaptive.dueInText==='function'?MQAdaptive.dueInText(S,item.cid):new Date(item.next).toLocaleDateString('fr-FR');}
function statusTag(item){const x={due:['due','🔧 À réparer'],planned:['','📅 Planifiée'],progress:['progress','🟠 En cours'],repaired:['repaired','✅ Réparée'],mastered:['mastered','🏆 Maîtrisée']}[item.status]||['','À revoir'];return `<span class="er-status ${x[0]}">${x[1]}</span>`;}
function card(item){const pct=item.seen?100:Math.min(100,item.streak/3*100),reward=item.rewarded?'<span class="er-reward">+2 🪙 obtenues</span>':'';return `<article class="card er-card ${item.seen?'er-old':''}"><div class="er-top"><div class="er-grow"><div class="er-title">${label(item)}</div><div class="er-meta">${new Date(+item.x.at||Date.now()).toLocaleDateString('fr-FR')} · ${item.tries} réponse${item.tries>1?'s':''} depuis l’erreur · ${dueText(item)}</div></div>${statusTag(item)}</div><div class="er-q">${escR(item.x.q||'Erreur à revoir')}</div><div class="er-progressline" aria-label="Progression de réparation"><i style="width:${pct}%"></i></div><div class="muted small">${item.seen?'Réparation terminée':`${Math.min(3,item.streak)}/3 bonne${item.streak>1?'s':''} réponse${item.streak>1?'s':''} consécutive${item.streak>1?'s':''}`}</div><details class="er-correction"><summary>Voir la correction</summary><p>Réponse attendue : <b>${escR(item.x.answer||'')}</b></p>${item.x.expl?`<p class="muted">${escR(item.x.expl)}</p>`:''}</details><div class="er-actions">${item.seen?reward:`<button class="btn primary" data-a="repairerror:${item.key}">🎯 Réparer cette erreur</button><button class="btn" data-a="repairlesson:${item.cid}">📖 Revoir le cours</button>`}</div></article>`;}
function screen(){
 try{if(window.MQActivity?.active?.())MQActivity.close('error-repair-screen');}catch(e){}
 if(typeof M!=='undefined'&&M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}if(typeof stopPron==='function')stopPron();if(typeof L!=='undefined')L=null;if(typeof padClose==='function')padClose();
 CUR='mistakes';const all=items(),todo=all.filter(x=>!x.seen),done=all.filter(x=>x.seen),due=todo.filter(x=>!x.next||x.next<=Date.now()).length;
 app.innerHTML=`${bar('🔧 Répare tes erreurs')}<section class="card er-intro"><b>Une erreur n’est pas une punition.</b><p class="muted">Finot la transforme en petite mission. Trois bonnes réponses consécutives sur la notion suffisent pour la réparer.</p></section><div class="er-head"><div class="er-kpi"><b>${todo.length}</b><span>à réparer</span></div><div class="er-kpi"><b>${due}</b><span>à revoir maintenant</span></div><div class="er-kpi"><b>${done.length}</b><span>réparées</span></div></div>${todo.length?`<h2 class="sec">À réparer</h2><div class="er-list">${todo.map(card).join('')}</div>`:`<div class="card er-empty"><div class="bigicon">🏆</div><h2>Tout est réparé !</h2><p class="muted">Les prochaines erreurs utiles apparaîtront ici pour t’aider à progresser.</p></div>`}${done.length?`<details class="card det"><summary><span>✅ Erreurs déjà réparées</span><span>${done.length}</span></summary><div class="er-list">${done.slice(0,20).map(card).join('')}</div></details>`:''}`;
}
function promote(item){const a=S.mistakes?.[item.cid];if(!Array.isArray(a))return;const i=a.indexOf(item.x);if(i>0){a.splice(i,1);a.unshift(item.x);}}
function start(key){const item=find(key);if(!item||item.seen)return screen();promote(item);ACTIVE={key:item.key,cid:item.cid,at:+item.x.at||0};REPAIR_STREAK=0;SEEN_BEFORE=+item.x.seen||0;try{saveLocal();}catch(e){}startMission([item.cid],{n:3});if(M)M.errorRepair=true;}
function reward(item){const st=state();if(!item||!item.seen||st.rewarded[item.key])return false;S.coins=(+S.coins||0)+2;st.rewarded[item.key]=+item.seen||Date.now();try{saveLocal();}catch(e){}try{checkBadges();}catch(e){}try{toast('✅ Erreur réparée ! +2 🪙');}catch(e){}return true;}
function afterAnswer(x){if(!ACTIVE||!x||x.cid!==ACTIVE.cid||x.mode==='flash')return;const item=find(ACTIVE.key);if(!item){ACTIVE=null;return;}REPAIR_STREAK=x.ok?REPAIR_STREAK+1:0;
 // Le cœur peut considérer les réponses précédant la mini-mission ; on interdit donc une réparation prématurée.
 if(!SEEN_BEFORE&&item.x.seen&&REPAIR_STREAK<3)item.x.seen=0;
 if(REPAIR_STREAK>=3&&!item.x.seen)item.x.seen=Date.now();
 try{saveLocal();}catch(e){}
}
function missionEnd(){if(!ACTIVE)return;const item=find(ACTIVE.key);if(item){if(REPAIR_STREAK<3&&!SEEN_BEFORE)item.x.seen=0;if(REPAIR_STREAK>=3&&!item.x.seen)item.x.seen=Date.now();if(item.x.seen)reward({...item,seen:item.x.seen});else try{toast('🌱 Pas encore réparée : refais la mission quand tu veux.');}catch(e){}try{saveLocal();}catch(e){}}ACTIVE=null;REPAIR_STREAK=0;SEEN_BEFORE=0;}
const oldMistakes=ACT.mistakes;
ACT.mistakes=()=>screen();ACT.repairerror=key=>start(String(key||''));ACT.repairlesson=cid=>{if(COURS[cid])openLesson(cid);else if(typeof ACT.chap==='function')ACT.chap(cid);};
if(window.MQHooks){MQHooks.on('answer:after',afterAnswer,{id:'error-repair',order:80});MQHooks.on('mission:end',missionEnd,{id:'error-repair',order:80});MQHooks.on('profile:changed',()=>{ACTIVE=null;REPAIR_STREAK=0;SEEN_BEFORE=0;},{id:'error-repair-profile',order:20});}
state();window.MQErrorRepair={version:'1.0',items,find,keyOf,screen,start,get active(){return ACTIVE;},oldScreen:oldMistakes};
})();
