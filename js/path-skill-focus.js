/* MathQuest — cible la micro-compétence la plus fragile dans les exercices du parcours quotidien. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
const escP=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function focusFor(cid){try{const rows=MQCompetency.chapterSkills(S,cid).filter(x=>x.attempts>0).sort((a,b)=>a.value-b.value||b.attempts-a.attempts);const x=rows[0];return x?{kind:x.kind||x.skill?.kind,label:x.short||x.skill?.short||x.label||x.skill?.label,value:x.value}:null;}catch(e){return null;}}
function ensureFocus(p){if(!p||!Array.isArray(p.steps))return p;p.skillFocus=p.skillFocus||{};for(const s of p.steps)if(s.kind==='lesson'&&s.cid){const f=focusFor(s.cid);if(f)p.skillFocus[s.cid]=f;}return p;}
MQHooks.on('path:ensure',p=>ensureFocus(p),{id:'path-skill-focus',order:20});
function probe(cid,d,focus,i){try{if(window.MQQuestionRotation?.generateSeeded)return MQQuestionRotation.generateSeeded(cid,d,'path-focus',`${S.path?.date||''}|${focus.kind}|${M?.i||0}|${i}`);}catch(e){}return CHMAP[cid].g(d);}
function targetedQuestion(cid,d,focus,current){if(!focus?.kind||current?._mq?.skillKind===focus.kind)return current;let best=current;for(let i=0;i<10;i++){const q=probe(cid,d,focus,i);if(q?._mq?.skillKind===focus.kind)return q;if(!best)best=q;}return best;}
function isActivePathMission(){try{return !!M?.path;}catch(e){return false;}}
// Dans une série du parcours, la question tirée vise la micro-compétence la plus fragile du chapitre. M.path est posé par
// startMission(ids,{path}) avant la première question : aucun drapeau temporaire n'est nécessaire.
function installNextQHook(){MQHooks.on('mission:question',(q,{cid,d,M:m})=>{if(!m||m.flash||!m.path||!S.path?.skillFocus)return;return targetedQuestion(cid,d,S.path.skillFocus[cid],q);},{id:'path-skill-focus'});return true;}
function stabilizeHook(){}
installNextQHook();
function inject(){const p=ensureFocus(S.path),head=document.querySelector('.path-head');if(!p||!head||document.querySelector('.path-focus-card'))return;const rows=(p.steps||[]).filter(x=>x.kind==='lesson'&&p.skillFocus?.[x.cid]).map(x=>({c:CHMAP[x.cid],f:p.skillFocus[x.cid]}));if(!rows.length)return;head.insertAdjacentHTML('afterend',`<div class="card path-focus-card"><b>🎯 Ce que Finot veut surtout renforcer aujourd’hui</b><div class="muted small">${rows.map(x=>`${escP(x.c?.icon||'📘')} ${escP(x.c?.name||'')} : <b>${escP(x.f.label)}</b> (${x.f.value} %)`).join('<br>')}</div></div>`);}
MQHooks.on('path:rendered',()=>inject(),{id:'path-skill-focus'});
window.MQPathSkillFocus={version:'1.4',focusFor,ensureFocus,targetedQuestion,installNextQHook,stabilizeHook,isActivePathMission,get hookActive(){return MQHooks.has('mission:question','path-skill-focus');}};
})();