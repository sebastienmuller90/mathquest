/* ===== Parcours du jour — partie « données pures » (18/10/2026)
   Spec : docs/superpowers/specs/2026-10-18-parcours-du-jour-design.md
   Constantes, archivage compact, décompte des étapes, bilan par chapitre et rapport parent. Aucun accès à
   ACT ni à l'écran : ce fichier est aussi chargé par parent.html (suivi à distance), qui n'a pas le moteur
   de l'appli. Le reste du parcours (génération, écran, hooks) est dans js/app-path.js. */
const PATH_LESSONS=4,PATH_EXOS=2,PATH_EXO_N=8,PATH_HIST_MAX=30,PATH_BONUS_MAX=5,PATH_STEP_MS_MAX=3600000;
function pathDoneCount(p){return p&&Array.isArray(p.steps)?p.steps.filter(s=>s&&(s.status==='done'||s.status==='review')).length:0;}
// Noms lisibles : l'appli a CHMAP/byId/SUBMAP, parent.html a ALLCH/SUBJECTS — on prend ce qui existe.
function pathChName(id){try{if(typeof byId==='function'&&typeof CHMAP!=='undefined'&&CHMAP[id])return byId(id).name;if(typeof ALLCH!=='undefined'){const c=ALLCH.find(x=>x.id===id);if(c)return c.name;}}catch(e){}return String(id||'');}
function pathSubjName(s){try{if(typeof SUBMAP!=='undefined'&&SUBMAP[s])return SUBMAP[s].name;if(typeof SUBJECTS!=='undefined'){const x=SUBJECTS.find(y=>y.id===s);if(x)return x.name;}}catch(e){}return '';}
function pathFmtMs(ms){const m=Math.round((+ms||0)/60000);return m<1?'< 1 min':m+' min';}
// Bilan par chapitre d'un parcours : quiz validé ET ≥ 80 % aux exercices (s'il y en a eu ce jour-là) → bien compris.
function pathVerdicts(p){const exoAns=[].concat(...(p.steps||[]).filter(x=>x.kind==='exo').map(x=>x.answers||[]));
 return (p.steps||[]).filter(s=>s.kind==='lesson'&&(s.status==='done'||s.status==='review')).map(s=>{
  const ans=exoAns.filter(a=>a.cid===s.cid),rate=ans.length?ans.filter(a=>a.ok).length/ans.length:null;
  return {cid:s.cid,good:s.status==='done'&&(rate===null||rate>=.8),rate,quiz:s.score};});}
// Rubrique « Parcours de révision » du suivi parent (appli et parent.html). Lecture seule.
function pathParentBody(state){const hist=Array.isArray(state&&state.pathHist)?state.pathHist:[],cur=state&&state.path&&Array.isArray(state.path.steps)?state.path:null;
 if(!cur&&!hist.length)return '';
 const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const name=id=>e(pathChName(id)),stTxt={done:'✅',review:'🟠 à revoir',next:'⏳ à faire',locked:'🔒 à venir'};
 let today='';
 if(cur){today=cur.steps.map((s,i)=>{const t=`${stTxt[s.status]||''}${s.ms?' · '+pathFmtMs(s.ms):''}`;
   return s.kind==='lesson'
   ?`<div class="drow pdrow"><span><small class="muted">${e(pathSubjName(s.subj))}</small><br>${name(s.cid)}${s.score!=null?` · quiz ${+s.score} %`:''}</span><b>${t}</b></div>`
   :`<div class="drow pdrow"><span><small class="muted">Exercices ${i-PATH_LESSONS+1}</small><br>${s.score!=null?`${+s.score}/${PATH_EXO_N} · meilleure série ${+s.bestStreak||0}`:'—'}</span><b>${t}</b></div>`;}).join('');
  const v=pathVerdicts(cur),good=v.filter(x=>x.good),bad=v.filter(x=>!x.good);
  today+=`${good.length?`<p><b>✅ Bien compris :</b> ${good.map(x=>name(x.cid)).join(', ')}</p>`:''}${bad.length?`<p><b>🟠 À retravailler :</b> ${bad.map(x=>`${name(x.cid)} (quiz ${+x.quiz||0} %${x.rate!=null?`, exercices ${Math.round(x.rate*100)} %`:''})`).join(', ')}</p>`:''}`;}
 const week=hist.slice(cur?-6:-7).concat(cur?[pathCompact(cur)]:[]),done=week.filter(h=>h.completed).length;
 const ms=week.reduce((a,h)=>a+(h.steps||[]).reduce((b,s)=>b+(+s.ms||0),0),0);
 const subj=new Set(),work=new Set();
 week.forEach(h=>{(h.steps||[]).forEach(s=>{if(s.subj){const n=pathSubjName(s.subj);if(n)subj.add(n);}});pathVerdicts(h).filter(x=>!x.good).forEach(x=>work.add(pathChName(x.cid)));});
 return `<h2 class="sec">🗺️ Parcours de révision</h2>
 ${cur?`<div class="card"><b>Aujourd’hui</b> <span class="muted small">(${pathDoneCount(cur)}/6 étapes${cur.chest?', coffre ouvert':''})</span>${today}</div>`:''}
 <div class="card"><b>7 derniers jours</b><p>${done} parcours terminé${done>1?'s':''} sur ${week.length} · ${pathFmtMs(ms)} de travail</p>${subj.size?`<p class="muted small">Matières revues : ${[...subj].map(e).join(', ')}</p>`:''}${work.size?`<p class="muted small">Encore à retravailler : ${[...work].map(e).join(', ')}</p>`:''}</div>`;}
function pathCompact(p){return {date:p.date,completed:!!p.chest,chest:!!p.chest,steps:(p.steps||[]).map(s=>s.kind==='lesson'
 ?{kind:'lesson',cid:s.cid,subj:s.subj,status:s.status,score:s.score,ms:s.ms}
 :{kind:'exo',ids:(s.ids||[]).slice(),status:s.status,score:s.score,ms:s.ms,bestStreak:s.bestStreak||0,answers:(s.answers||[]).map(a=>({cid:a.cid,ok:!!a.ok}))})};}

/* Correctifs d'audit partagés par l'application et parent.html. */
if(typeof document!=='undefined'&&!document.querySelector('script[data-mq-audit-fixes]')){
 const s=document.createElement('script');s.src='js/audit-fixes.js';s.dataset.mqAuditFixes='1';s.async=false;document.head.appendChild(s);
}
