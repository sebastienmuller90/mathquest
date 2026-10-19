/* ===== Parcours du jour (18/10/2026) — spec : docs/superpowers/specs/2026-10-18-parcours-du-jour-design.md
   4 leçons de matières différentes (maths, français, 2 tirées) puis 2 étapes de 8 exercices mélangés sur
   ces 4 chapitres. Réutilise le moteur des cours (L.path) et des missions (M.path). Le verrouillage
   n'existe QUE dans le parcours : tous les cours restent libres ailleurs. Constantes et fonctions pures
   (rapport parent) : js/path-report.js. */
const PATH_EXCLUDE=/(^|-)(eps|evar|evars|orientation)$/;
function pathRng(seed){let h=2166136261;for(let i=0;i<seed.length;i++){h^=seed.charCodeAt(i);h=Math.imul(h,16777619);}
 return ()=>{h=(h+0x6D2B79F5)|0;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function pathCandidates(grade){const by={};
 for(const w of WALL.filter(w=>w.lvl===grade)){const s=sOf(w.id).id;if(PATH_EXCLUDE.test(s))continue;
  for(const c of WCH[w.id])if(COURS[c.id]&&typeof c.g==='function')(by[s]=by[s]||[]).push(c.id);}
 return by;}
function makeDailyPath(state,date,seedKey){const by=pathCandidates(state.grade),subs=Object.keys(by).filter(s=>by[s].length);if(!subs.length)return null;
 const rnd=pathRng(String(seedKey)+'|'+date),hist=state.pathHist||[],last={};
 hist.forEach((h,i)=>(h.steps||[]).forEach(s=>{if(s&&s.cid)last[s.cid]=i;}));
 const recentFrom=Math.max(0,hist.length-7);
 const order=[],m=subs.find(s=>/(^|-)maths$/.test(s)),f=subs.find(s=>/(^|-)francais$/.test(s));if(m)order.push(m);if(f)order.push(f);
 const others=subs.filter(s=>!order.includes(s));
 while(order.length<PATH_LESSONS&&others.length)order.push(others.splice(Math.floor(rnd()*others.length),1)[0]);
 for(let k=0;order.length<PATH_LESSONS;k++)order.push(subs[k%subs.length]);
 const used=new Set();
 const lessons=order.map(s=>{const pool=by[s].filter(id=>!used.has(id)),base=pool.length?pool:by[s];
  const fresh=base.filter(id=>!(id in last)||last[id]<recentFrom);
  const cid=fresh.length?fresh[Math.floor(rnd()*fresh.length)]:base.slice().sort((a,b)=>last[a]-last[b])[0];
  used.add(cid);return {kind:'lesson',cid,subj:s,status:'locked',score:null,ms:0};});
 const ids=lessons.map(x=>x.cid);
 const exos=[0,1].map(()=>({kind:'exo',ids:ids.slice(),status:'locked',score:null,ms:0,answers:[],bestStreak:0}));
 const steps=[...lessons,...exos];steps[0].status='next';
 return {date,steps,chest:false};}
function pathValid(p){return !!p&&Array.isArray(p.steps)&&p.steps.length===PATH_LESSONS+PATH_EXOS&&p.steps.every(s=>s&&(s.kind==='lesson'?!!(CHMAP[s.cid]&&COURS[s.cid]):s.kind==='exo'&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.every(id=>CHMAP[id])));}
function pathArchive(p){S.pathHist=(S.pathHist||[]).concat([pathCompact(p)]).slice(-PATH_HIST_MAX);}
function ensurePath(){const d=dstr(Date.now());
 if(S.path&&S.path.date===d&&pathValid(S.path))return S.path;
 if(S.path&&S.path.date!==d&&pathValid(S.path))pathArchive(S.path);
 S.path=makeDailyPath(S,d,ACTIVE);saveLocal();return S.path;}
/* ----- Écran du circuit, carte d'accueil, explication par Finot ----- */
function pathSubjIcon(s){const x=SUBMAP[s];return (x&&x.emoji)||'📘';}
function pathStepLabel(s){if(s.kind==='lesson'){const x=SUBMAP[s.subj];return 'Leçon de '+(x?x.name.toLowerCase():'cours');}
 return 'Exercices ('+PATH_EXO_N+' questions)';}
function pathScreen(){if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}stopPron();L=null;padClose();ttsStop();CUR='path';
 const p=ensurePath();
 if(!p){app.innerHTML=`${bar('📝 Devoir du jour')}<p class="muted center">Aucun parcours disponible pour cette classe.</p>`;return;}
 const n=pathDoneCount(p),open=p.steps.slice(0,PATH_LESSONS).every(s=>s.status==='done'||s.status==='review');
 const node=(s,i)=>{const st=s.status;
  const icon=st==='done'?'✓':st==='review'?'!':st==='locked'?'🔒':s.kind==='lesson'?pathSubjIcon(s.subj):'🎯';
  const sub=s.kind==='lesson'?esc(byId(s.cid).name)+(s.score!=null?` · quiz ${s.score} %`:''):(s.score!=null?`${s.score}/${PATH_EXO_N} · meilleure série ${s.bestStreak||0}`:'Sur tes 4 leçons du jour');
  const tag=st==='review'?' <span class="ptag">À revoir</span>':'';
  return `<li class="pstep ${st} ${i%2?'pr':'pl'}"><button class="pbubble" data-a="pathgo:${i}" aria-label="Étape ${i+1} : ${esc(pathStepLabel(s))}${st==='locked'?' (verrouillée)':''}">${icon}</button><div class="plab"><b>${esc(pathStepLabel(s))}${tag}</b><small>${sub}</small></div></li>`;};
 app.innerHTML=`${bar('📝 Devoir du jour')}
 <div class="card path-head"><div class="grow"><b>${n}/6 étapes</b><div class="muted small">${p.chest?'Parcours terminé, bravo ! Un nouveau t’attend demain.':'4 leçons, puis 2 séries d’exercices. Un coffre t’attend au bout !'}</div></div><button class="btn ghost sm" data-a="pathinfo" aria-label="Comment marche le parcours du jour ?">ⓘ</button></div>
 <ol class="path"><li class="pend">🏁 Départ</li>${p.steps.slice(0,PATH_LESSONS).map(node).join('')}
 <li class="pgate ${open?'open':''}">${open?'🔓 Le chemin des exercices est ouvert !':'🔒 Termine les 4 leçons pour ouvrir le chemin des exercices'}</li>
 ${p.steps.slice(PATH_LESSONS).map((s,j)=>node(s,j+PATH_LESSONS)).join('')}
 <li class="pend ${p.chest?'won':''}">${p.chest?'🏆 Coffre ouvert !':'🎁 Coffre'}</li></ol>`;}
function pathHomeCard(){const p=ensurePath();if(!p)return '';const n=pathDoneCount(p),nx=p.steps.find(s=>s.status==='next'),g=n/6;
 const txt=p.chest?'Terminé ! Reviens demain pour un nouveau parcours 🔥':nx?'Prochaine étape : '+pathStepLabel(nx):'';
 // 19/10/2026 : présenté sur l'accueil comme le « Devoir du jour », avec ses 6 étapes visibles d'un coup d'œil
 const mini=p.steps.map((s,i)=>{const st=s.status,ic=st==='done'?'✓':st==='review'?'!':st==='locked'?'🔒':s.kind==='lesson'?pathSubjIcon(s.subj):'🎯',
  lab=s.kind==='lesson'?((SUBMAP[s.subj]||{}).name||'Leçon'):'Exos';
  return `<button class="pmini ${st}" data-a="pathgo:${i}" aria-label="Étape ${i+1} : ${esc(pathStepLabel(s))}${st==='locked'?' (verrouillée)':''}"><span class="pmi" aria-hidden="true">${ic}</span><small>${esc(lab)}</small></button>`;}).join('');
 return `<h2 class="sec daily-h">📝 Devoir du jour</h2><section class="goal card pathcard daily"><div class="pathrow"><button class="pathcard-go" data-a="path" aria-label="Ouvrir le devoir du jour"><svg viewBox="0 0 52 52" class="ring" aria-hidden="true"><circle cx="26" cy="26" r="22" class="rb"/><circle cx="26" cy="26" r="22" class="rf" style="stroke-dashoffset:${138.2*(1-g)}"/><text x="26" y="31" text-anchor="middle">${p.chest?'✓':n+'/6'}</text></svg><div><b>Leçons et exercices de plusieurs matières</b><div class="muted">${esc(txt)}</div></div></button><button class="btn ghost sm pinfo" data-a="pathinfo" aria-label="Comment marche le devoir du jour ?">ⓘ</button></div><div class="pathmini">${mini}</div></section>`;}
const PATH_INFO='<b>🗺️ Ton parcours du jour</b><br>Chaque jour, je te prépare un parcours : <b>4 leçons</b> de matières différentes, puis <b>2 séries d’exercices</b> sur ce que tu viens d’apprendre.<br>🔥 Plus tu enchaînes les bonnes réponses dans les exercices, plus tu gagnes de pièces : 1, puis 2, 3, 4… jusqu’à <b>×5</b> !<br>🎁 Au bout, un <b>coffre</b> t’attend (pièces, XP et bons points).<br>🟠 Si une leçon est difficile, pas de panique : tu continues, et on la reverra ensemble.';
function pathInfo(){finotOpen();finotPush('finot',PATH_INFO);}
function pathGo(i){const p=ensurePath();if(!p)return;const s=p.steps[+i];if(!s)return;
 if(s.status==='locked')return toast('Termine d’abord l’étape précédente 🙂');
 if(s.kind==='lesson'){openLesson(s.cid);if(L&&s.status==='next')L.path={i:+i,date:p.date,t0:Date.now()};return;}
 if(s.status==='done')return toast('Étape déjà réussie aujourd’hui ✅');
 startMission(s.ids.slice());if(M){M.n=PATH_EXO_N;M.path={i:+i,date:p.date,t0:Date.now(),streak:0,best:0,answers:[]};}}
/* ----- Fin d'une étape Leçon (appelé par endLesson si L.path) ----- */
function pathAdvance(p){if(!p.steps.some(s=>s.status==='next')){const nx=p.steps.find(s=>s.status==='locked');if(nx)nx.status='next';}}
function pathLessonDone(tag,score,passed){const p=S.path;if(!p||!tag||p.date!==tag.date)return;const s=p.steps[tag.i];
 if(!s||s.kind!=='lesson'||s.status!=='next')return;
 s.score=score;s.ms=Math.max(0,Math.min(PATH_STEP_MS_MAX,Date.now()-tag.t0));s.status=passed?'done':'review';pathAdvance(p);}
/* ----- Étapes Exercices (appelé par result() et endMission() si M.path) ----- */
// Une réponse d'exercice du parcours : chronométrée, et bonus de pièces 1,2,3,4,5,5… remis à zéro sur erreur.
function pathAnswer(ok){const t=M&&M.path;if(!t)return 0;
 t.answers.push({cid:M.cid,ok:!!ok,ms:Math.max(0,Math.min(600000,Date.now()-(M.qt||Date.now())))});
 let bonus=0;if(ok){t.streak++;t.best=Math.max(t.best,t.streak);bonus=Math.min(PATH_BONUS_MAX,t.streak);S.coins+=bonus;}else t.streak=0;
 (t.bonuses=t.bonuses||[]).push(bonus);return bonus;}
function pathExoDone(m){const p=S.path,t=m&&m.path;if(!p||!t||p.date!==t.date)return null;const s=p.steps[t.i];
 if(!s||s.kind!=='exo'||s.status!=='next')return null;
 s.answers=t.answers.map(a=>({cid:a.cid,ok:a.ok,ms:a.ms}));s.bonuses=(t.bonuses||[]).slice();s.score=t.answers.filter(a=>a.ok).length;
 s.ms=Math.max(0,Math.min(PATH_STEP_MS_MAX,Date.now()-t.t0));s.bestStreak=t.best;s.status='done';pathAdvance(p);
 return p.steps.every(x=>x.status==='done'||x.status==='review')?pathChest(p):null;}
// Coffre : +40 🪙 +50 XP + bons points « path », −25 % (pièces et bons points) par leçon à revoir, plancher 50 %.
function pathChestGains(p){const rv=p.steps.filter(s=>s.status==='review').length,f=Math.max(.5,1-.25*rv);
 return {coins:Math.round(40*f),xp:50,merit:Math.round((S.merit.rules.path||0)*f),review:rv};}
function pathChest(p){if(!p||p.chest)return null;const g=pathChestGains(p);p.chest=true;S.coins+=g.coins;S.xp+=g.xp;S.goalsDone++;
 if(g.merit)addMerit(g.merit,'Parcours du jour 🗺️',null);
 setTimeout(()=>finotCeleb(FINOT_IMG.cadeau,'Parcours terminé !',`+${g.coins} 🪙 · +${g.xp} XP${g.merit?` · +${g.merit} 🎖️`:''}${g.review?` · ${g.review} leçon${g.review>1?'s':''} à revoir 🟠`:''}`),900);
 return g;}
Object.assign(ACT,{path:()=>pathScreen(),pathgo:i=>pathGo(i),pathinfo:()=>pathInfo()});
// Au démarrage, home() est rendu par app-actions.js avant le chargement de ce fichier : on le réaffiche
// une fois pour faire apparaître la carte du parcours (sans rien changer d'autre à l'écran).
if(typeof CUR!=='undefined'&&CUR==='home'&&S&&S.name)home();
