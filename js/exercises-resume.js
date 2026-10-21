/* Finot Académie — onglet Exercices + reprise exacte.
   La mission et son rendu sont encodés dans le profil : restaurer une correction n'appelle jamais result(),
   donc aucune réponse, XP, pièce ou erreur n'est comptée deux fois. L'historique réutilise activityLog. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;
const MAX_BLOB=250000,HISTORY_N=30;
let RESTORING=false,SAVE_TIMER=null,NAV_OBS=null;
const enc=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o))));
const dec=s=>JSON.parse(decodeURIComponent(escape(atob(String(s||'')))));
const escX=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function cleanM(){if(typeof M==='undefined'||!M||M.flash)return null;try{return JSON.parse(JSON.stringify(M,(k,v)=>k==='tid'?undefined:v));}catch(e){return null;}}
function fields(){return [...document.querySelectorAll('#app input,#app textarea')].map((el,i)=>({i,v:el.value,c:!!el.checked,s:Number.isFinite(el.selectionStart)?el.selectionStart:null,e:Number.isFinite(el.selectionEnd)?el.selectionEnd:null}));}
function validPayload(p){return !!(p&&p.m&&!p.m.flash&&Array.isArray(p.m.ids)&&p.m.ids.length&&p.m.ids.every(id=>CHMAP[id])&&p.m.q&&typeof p.html==='string');}
function payload(){try{const r=S.exerciseResume;if(!r||r.v!==1||typeof r.blob!=='string')return null;const p=dec(r.blob);return validPayload(p)?p:null;}catch(e){return null;}}
function clearResume(saveIt=true){if(S&&S.exerciseResume){S.exerciseResume=null;if(saveIt)try{saveLocal();}catch(e){}}}
function captureNow(){
 if(RESTORING||typeof M==='undefined'||!M||M.flash||!M.q)return false;const m=cleanM();if(!m)return false;
 const p={m,html:document.getElementById('app')?.innerHTML||'',fields:fields(),scroll:Math.max(0,Math.round(scrollY||0)),phase:M.locked?'feedback':'question'};
 try{const blob=enc(p);if(blob.length>MAX_BLOB)return false;S.exerciseResume={v:1,at:Date.now(),blob};saveLocal();refreshTab();return true;}catch(e){return false;}
}
function scheduleCapture(delay=80){clearTimeout(SAVE_TIMER);SAVE_TIMER=setTimeout(captureNow,delay);}
function resumeInfo(){const p=payload();if(!p)return null;const m=p.m,cid=m.cid||m.ids[0],c=CHMAP[cid],w=WMAP[cid],sub=w&&typeof sOf==='function'?sOf(w.id):null;return {p,m,cid,c,w,sub,phase:p.phase||'question',at:+S.exerciseResume.at||0};}
function chapterLabel(info){if(!info)return'Exercice';if((info.m.ids||[]).length>1)return `${info.sub?.emoji||'📘'} ${info.sub?.name||'Série mixte'}`;return `${info.c?.icon||'📘'} ${info.c?.name||'Exercice'}`;}
function restoreFields(p){const els=[...document.querySelectorAll('#app input,#app textarea')];for(const f of p.fields||[]){const el=els[f.i];if(!el)continue;el.value=String(f.v??'');if('checked'in el)el.checked=!!f.c;try{if(f.s!=null)el.setSelectionRange(f.s,f.e==null?f.s:f.e);}catch(e){}}}
function restore(){const p=payload();if(!p){clearResume();return screen();}
 RESTORING=true;try{
  if(typeof stopPron==='function')stopPron();if(typeof ttsStop==='function')ttsStop();if(typeof padClose==='function')padClose();if(typeof L!=='undefined')L=null;PARENT=false;M=p.m;delete M.tid;CUR='mission';
  const appEl=document.getElementById('app');appEl.innerHTML=p.html;restoreFields(p);
  if(!M.locked)M.qt=Date.now();
  if(M.locked&&!M.flash&&!document.querySelector('[data-a="next"]')){const fb=document.getElementById('fb');if(fb)fb.insertAdjacentHTML('beforeend','<button class="btn primary wide" data-a="next">Exercice suivant</button>');}
  const in0=document.getElementById('in0');if(typeof lastIn!=='undefined')lastIn=in0||null;
  try{if(window.MQActivity&&!MQActivity.active())MQActivity.begin('exercise',M.ids,{resumed:true,mixed:M.ids.length>1});}catch(e){}
  setTimeout(()=>{scrollTo(0,Math.max(0,+p.scroll||0));const b=M&&M.locked?document.querySelector('[data-a="next"]'):document.getElementById('in0');b?.focus?.();},0);
 }finally{RESTORING=false;}return true;}
function history(){return(S.activityLog||[]).filter(x=>x&&x.kind==='exercise').sort((a,b)=>(+b.t1||+b.t0||0)-(+a.t1||+a.t0||0)).slice(0,HISTORY_N);}
function fmtDuration(ms){const m=Math.max(0,Math.round((+ms||0)/60000));return m<1?'< 1 min':m<60?`${m} min`:`${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`;}
function histRow(x){const cid=(x.ids||[])[0],c=CHMAP[cid],w=WMAP[cid],sub=w&&typeof sOf==='function'?sOf(w.id):null,mixed=(x.ids||[]).length>1,title=mixed?`${sub?.emoji||'📘'} ${sub?.name||'Série mixte'} · série mixte`:`${c?.icon||'📘'} ${c?.name||'Exercice'}`,d=new Date(+x.t1||+x.t0||Date.now()),date=d.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})+' · '+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),done=x.reason==='exercise-end'&&Number.isFinite(+x.total)&&+x.total>0,score=done?`${+x.ok||0}/${+x.total}`:'Interrompu',cls=done?((+x.ok||0)/(+x.total||1)>=.8?'ok':'mid'):'off';return `<div class="card ex-history-row"><span class="ex-history-date">${escX(date)}</span><span class="ex-history-main"><b>${escX(title)}</b><small>${fmtDuration(x.ms)}${x.forcedDifficulty?` · niveau ${+x.forcedDifficulty}/3`:''}</small></span><span class="ex-history-score ${cls}">${score}</span></div>`;}
function resumeCard(info){if(!info)return `<div class="card ex-empty"><div class="bigicon">📝</div><h2>Aucun exercice en pause</h2><p class="muted">Commence une mission : si tu quittes l’app ou recharges la page, tu pourras la reprendre ici.</p></div>`;const m=info.m,q=Math.min(m.n||1,(m.i||0)+1),pct=Math.max(0,Math.min(100,Math.round(((m.i||0)+(m.locked?1:0))/(m.n||1)*100))),when=info.at?new Date(info.at).toLocaleString('fr-FR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'';return `<section class="card ex-resume"><div class="ex-resume-head"><span class="ex-resume-icon">▶️</span><div class="ex-resume-copy"><div class="ex-resume-title">${chapterLabel(info)}</div><div class="ex-resume-meta">Question ${q}/${m.n||'?'} · ${info.phase==='feedback'?'correction affichée':'question en cours'}${when?` · ${escX(when)}`:''}</div></div></div><div class="ex-resume-progress"><i style="width:${pct}%"></i></div><div class="muted small">Progression ${pct} % · tes réponses déjà comptées ne seront jamais comptées une seconde fois.</div><div class="ex-resume-actions"><button class="btn primary" data-a="exresume">Continuer exactement ici</button><button class="btn" data-a="exdiscard">Abandonner</button></div></section>`;}
function screen(){if(typeof M!=='undefined'&&M&&!M.flash)captureNow();PARENT=false;CUR='home';if(typeof HOMETAB!=='undefined')HOMETAB='exercises';const h=history(),info=resumeInfo();document.getElementById('app').innerHTML=`<div class="ex-tabscreen"><h1>📝 Exercices</h1><p class="muted">Reprends une mission interrompue ou retrouve tes dernières séances.</p><h2 class="sec">Continuer</h2>${resumeCard(info)}<h2 class="sec">Historique <small class="muted">(${h.length}/${HISTORY_N} derniers)</small></h2>${h.length?`<div class="ex-history">${h.map(histRow).join('')}</div>`:'<p class="muted">Aucun exercice enregistré pour le moment.</p>'}</div>`;setTimeout(addTab,0);}
function addTab(){const nav=document.getElementById('hometabs');if(!nav||!nav.classList.contains('show')||!S?.name)return;let b=nav.querySelector('.mq-exercises-tab');if(!b){b=document.createElement('button');b.className='htab mq-exercises-tab';b.dataset.a='exercises';b.innerHTML='<span class="hti" aria-hidden="true">📝</span><span class="htl">Exercices</span>';const before=nav.children[2]||null;nav.insertBefore(b,before);}const active=typeof HOMETAB!=='undefined'&&HOMETAB==='exercises';b.classList.toggle('on',active);b.setAttribute('aria-current',active?'page':'false');const has=!!resumeInfo();let badge=b.querySelector('.ex-tab-badge');if(has&&!badge){badge=document.createElement('span');badge.className='ex-tab-badge';badge.textContent='1';badge.setAttribute('aria-label','Exercice à reprendre');b.appendChild(badge);}else if(!has&&badge)badge.remove();}
function refreshTab(){setTimeout(addTab,0);}
ACT.exercises=()=>screen();ACT.exresume=()=>restore();ACT.exdiscard=()=>{clearResume();screen();};
if(window.MQHooks){MQHooks.on('question:after-render',({M:m})=>{if(m&&!m.flash)setTimeout(captureNow,0);},{id:'exercise-resume',order:900});MQHooks.on('answer:after',x=>{if(x?.M&&!x.M.flash)setTimeout(captureNow,0);},{id:'exercise-resume-answer',order:900});MQHooks.on('mission:end',()=>clearResume(),{id:'exercise-resume-end',order:900});MQHooks.on('home:rendered',()=>setTimeout(addTab,0),{id:'exercise-tab',order:900});MQHooks.on('profile:changed',()=>setTimeout(addTab,0),{id:'exercise-tab-profile',order:900});}
document.addEventListener('input',e=>{if(M&&!M.flash&&e.target.closest('#app'))scheduleCapture(180);});
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]')?.dataset?.a||'';if(a==='quit'){clearResume();return;}if(M&&!M.flash&&/^(hint|chip:|otok:|oundo|padtoggle)/.test(a))scheduleCapture(30);});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')captureNow();else if(M&&!M.flash&&window.MQActivity&&!MQActivity.active())MQActivity.begin('exercise',M.ids,{resumed:true,mixed:M.ids.length>1});});
window.addEventListener('pagehide',()=>captureNow());
const nav=document.getElementById('hometabs');if(nav){NAV_OBS=new MutationObserver(()=>addTab());NAV_OBS.observe(nav,{childList:true});}setTimeout(addTab,0);
window.MQExerciseResume={version:'1.0',capture:captureNow,restore,payload,resumeInfo,history,screen,clear:clearResume};
})();
