/* MathQuest — cible la micro-compétence la plus fragile dans les exercices du parcours quotidien. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
const escP=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let startingPathExercise=false;
function focusFor(cid){try{const rows=MQCompetency.chapterSkills(S,cid).filter(x=>x.attempts>0).sort((a,b)=>a.value-b.value||b.attempts-a.attempts);const x=rows[0];return x?{kind:x.kind||x.skill?.kind,label:x.short||x.skill?.short||x.label||x.skill?.label,value:x.value}:null;}catch(e){return null;}}
function ensureFocus(p){if(!p||!Array.isArray(p.steps))return p;p.skillFocus=p.skillFocus||{};for(const s of p.steps)if(s.kind==='lesson'&&s.cid){const f=focusFor(s.cid);if(f)p.skillFocus[s.cid]=f;}return p;}
if(typeof ensurePath==='function'&&!ensurePath.__mqSkillFocus){const base=ensurePath;const wrap=function(){const p=base.apply(this,arguments);return ensureFocus(p);};wrap.__mqSkillFocus=true;ensurePath=wrap;}
function probe(cid,d,focus,i){try{if(window.MQQuestionRotation?.generateSeeded){let q=MQQuestionRotation.generateSeeded(cid,d,'path-focus',`${S.path?.date||''}|${focus.kind}|${M?.i||0}|${i}`);if(window.MQQuestionEnrichment)q=MQQuestionEnrichment.decorate(cid,q,d);if(window.MQQuestionTransfer)q=MQQuestionTransfer.enhance(cid,q,d);return q;}}catch(e){}return CHMAP[cid].g(d);}
function targetedQuestion(cid,d,focus,current){if(!focus?.kind||current?._mq?.skillKind===focus.kind)return current;let best=current;for(let i=0;i<10;i++){const q=probe(cid,d,focus,i);if(q?._mq?.skillKind===focus.kind)return q;if(!best)best=q;}return best;}
function isActivePathMission(){try{return !!startingPathExercise||!!M?.path;}catch(e){return !!startingPathExercise;}}
function installNextQHook(){
 if(typeof nextQ!=='function'||nextQ.__mqSkillFocus)return false;
 const base=nextQ;
 const wrap=function(){const r=base.apply(this,arguments);try{if(M&&!M.flash&&isActivePathMission()&&S.path?.skillFocus&&M.cid&&!M.locked){const f=S.path.skillFocus[M.cid];const q=targetedQuestion(M.cid,M.d,f,M.q);if(q&&q!==M.q){M.q=q;M.qt=Date.now();renderQ();}}}catch(e){console.warn('[MathQuest path focus]',e);}return r;};
 wrap.__mqSkillFocus=true;wrap.__mqSkillFocusBase=base;nextQ=wrap;return true;
}
// pathGo() affecte M.path seulement après startMission(), alors que startMission() génère immédiatement la première
// question. Ce drapeau très court couvre uniquement ce premier appel et ne s'applique jamais aux missions libres.
if(typeof ACT.pathgo==='function'&&!ACT.pathgo.__mqSkillFocus){const basePathGo=ACT.pathgo;const pathWrap=function(i){let isExo=false;try{const p=ensurePath(),s=p?.steps?.[+i];isExo=!!s&&s.kind==='exo'&&s.status!=='locked'&&s.status!=='done';}catch(e){}if(isExo)startingPathExercise=true;try{return basePathGo.apply(this,arguments);}finally{startingPathExercise=false;}};pathWrap.__mqSkillFocus=true;ACT.pathgo=pathWrap;}
// audit-fixes.js est injecté dynamiquement et peut remplacer nextQ pendant la fin du démarrage. On surveille
// uniquement cette courte phase ; lorsque les correctifs sont présents et le hook stable, le timer s'arrête.
let guardTimer=null;
function stabilizeHook(){if(guardTimer)return;let stable=0,ticks=0;guardTimer=setInterval(()=>{ticks++;installNextQHook();const auditReady=!!window.MQ_AUDIT_FIXES,hooked=typeof nextQ==='function'&&!!nextQ.__mqSkillFocus;if(auditReady&&hooked)stable++;else stable=0;if(stable>=8||ticks>=200){clearInterval(guardTimer);guardTimer=null;}},50);}
installNextQHook();stabilizeHook();
function inject(){const p=ensureFocus(S.path),head=document.querySelector('.path-head');if(!p||!head||document.querySelector('.path-focus-card'))return;const rows=(p.steps||[]).filter(x=>x.kind==='lesson'&&p.skillFocus?.[x.cid]).map(x=>({c:CHMAP[x.cid],f:p.skillFocus[x.cid]}));if(!rows.length)return;head.insertAdjacentHTML('afterend',`<div class="card path-focus-card"><b>🎯 Ce que Finot veut surtout renforcer aujourd’hui</b><div class="muted small">${rows.map(x=>`${escP(x.c?.icon||'📘')} ${escP(x.c?.name||'')} : <b>${escP(x.f.label)}</b> (${x.f.value} %)`).join('<br>')}</div></div>`);}
if(typeof pathScreen==='function'){const base=pathScreen;pathScreen=function(){const r=base.apply(this,arguments);setTimeout(inject,0);return r;};}
window.MQPathSkillFocus={version:'1.4',focusFor,ensureFocus,targetedQuestion,installNextQHook,stabilizeHook,isActivePathMission,get hookActive(){return typeof nextQ==='function'&&!!nextQ.__mqSkillFocus;}};
})();