/* Finot Académie — checkpoint pédagogique de fin de séance.
   Compare la maîtrise avant/après une mission et formule un bilan honnête sans modifier score, XP ou progression. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined')return;
let SNAP=null;
const profileId=()=>{try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}};
const escC=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function unresolved(cid){const a=S.mistakes?.[cid];return Array.isArray(a)?a.filter(x=>!x.seen).length:0;}
function ensure(){if(!S.sessionCheckpoints||typeof S.sessionCheckpoints!=='object'||Array.isArray(S.sessionCheckpoints))S.sessionCheckpoints={history:[]};if(!Array.isArray(S.sessionCheckpoints.history))S.sessionCheckpoints.history=[];return S.sessionCheckpoints;}
function start({ids,M:m}={}){if(!Array.isArray(ids)||!ids.length||m?.flash)return;SNAP={profile:profileId(),at:Date.now(),ids:[...ids],before:Object.fromEntries(ids.map(id=>[id,{mastery:MQAdaptive.mastery(S,id),errors:unresolved(id)}]))};}
function chapterName(cid){try{const c=byId(cid);return {name:c?.name||cid,icon:c?.icon||'📘'};}catch(e){return {name:cid,icon:'📘'};}}
function summarize(m){if(!m||!SNAP||SNAP.profile!==profileId())return null;const ids=(Array.isArray(m.ids)?m.ids:SNAP.ids).filter(Boolean),rows=ids.map(cid=>{const pre=SNAP.before[cid]||{mastery:0,errors:0},after=MQAdaptive.mastery(S,cid),errAfter=unresolved(cid),n=chapterName(cid);return {cid,...n,before:pre.mastery,after,delta:after-pre.mastery,errorsBefore:pre.errors,errorsAfter:errAfter,repaired:Math.max(0,pre.errors-errAfter)};});const best=[...rows].sort((a,b)=>b.delta-a.delta||b.after-a.after)[0]||null,weak=[...rows].sort((a,b)=>a.after-b.after)[0]||null,score=Math.round((+m.ok||0)/Math.max(1,+m.n||1)*100);let headline,detail;
 if(best&&best.delta>=8){headline='Progression nette';detail=`${best.name} a progressé de ${best.delta} points de maîtrise pendant cette séance.`;}
 else if(score>=90){headline='Séance très solide';detail='Les réponses sont très régulières. Le prochain enjeu est surtout de consolider dans le temps.';}
 else if(score>=70){headline='Bonne consolidation';detail='La séance apporte de nouvelles preuves utiles. Encore quelques répétitions aideront à stabiliser les notions.';}
 else{headline='Séance utile';detail='Les erreurs de cette séance donnent à Finot des informations précises pour mieux choisir la suite.';}
 let next;if(rows.some(x=>x.errorsAfter>0)){const x=rows.filter(x=>x.errorsAfter>0).sort((a,b)=>b.errorsAfter-a.errorsAfter)[0];next={icon:'🩹',title:'Prochaine priorité',text:`Réparer ${x.errorsAfter>1?`${x.errorsAfter} erreurs`:'l’erreur restante'} dans « ${x.name} ».`};}
 else if(weak&&weak.after<65)next={icon:'🌱',title:'Prochaine priorité',text:`Consolider « ${weak.name} », encore fragile à ${weak.after} %.`};
 else if(weak)next={icon:'🧠',title:'Prochaine priorité',text:`Laisser reposer puis revoir « ${weak.name} » au moment prévu par la répétition espacée.`};
 const repaired=rows.reduce((s,x)=>s+x.repaired,0),summary={at:Date.now(),startedAt:SNAP.at,score,ok:+m.ok||0,total:+m.n||0,headline,detail,next,rows,repaired};return summary;}
function html(s){return `<section class="session-checkpoint"><div class="scp-head"><img src="${FINOT_IMG.carnet||FINOT_IMG.bravo}" alt="" aria-hidden="true"><div><span>🦊 Checkpoint Finot</span><h2>${escC(s.headline)}</h2></div></div><p class="scp-lead">${escC(s.detail)}</p><div class="scp-rows">${s.rows.map(x=>`<div class="scp-row"><span>${x.icon} ${escC(x.name)}</span><b>${x.before}% → ${x.after}% ${x.delta>0?`<em>+${x.delta}</em>`:''}</b></div>`).join('')}</div>${s.repaired?`<div class="scp-win">🩹 ${s.repaired} erreur${s.repaired>1?'s':''} réparée${s.repaired>1?'s':''} pendant la séance</div>`:''}<div class="scp-next"><span>${s.next.icon}</span><div><b>${escC(s.next.title)}</b><p>${escC(s.next.text)}</p></div></div><small>La progression est calculée à partir de la maîtrise enregistrée avant et après cette séance — pas à partir du score seul.</small></section>`;}
function inject(s){const end=document.querySelector('.end.card');if(!end||end.querySelector('.session-checkpoint'))return false;const gains=end.querySelector('.gains');if(gains)gains.insertAdjacentHTML('beforebegin',html(s));else end.insertAdjacentHTML('beforeend',html(s));return true;}
function finish({m}={}){const s=summarize(m);SNAP=null;if(!s)return;const st=ensure();st.history.push({at:s.at,score:s.score,rows:s.rows.map(x=>({cid:x.cid,before:x.before,after:x.after,delta:x.delta,repaired:x.repaired})),next:s.next.text});if(st.history.length>20)st.history.splice(0,st.history.length-20);try{saveLocal();}catch(e){}inject(s);}
MQHooks.on('mission:start',start,{id:'session-checkpoint-start',order:3});
MQHooks.on('mission:end',finish,{id:'session-checkpoint-end',order:94});
MQHooks.on('profile:changed',()=>{SNAP=null;ensure();},{id:'session-checkpoint-profile',order:3});
ensure();
root.MQSessionCheckpoint={version:'1.0',summarize,inject,start,finish,get snapshot(){return SNAP;}};
})(typeof window!=='undefined'?window:globalThis);
