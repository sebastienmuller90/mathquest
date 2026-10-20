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
 // Abonnés 'path:built' : choix adaptatif des leçons (maîtrise, micro-compétences, révisions dues).
 return MQHooks.filter('path:built',{date,steps,chest:false},{state,date,seedKey});}
function pathValid(p){return !!p&&Array.isArray(p.steps)&&p.steps.length===PATH_LESSONS+PATH_EXOS&&p.steps.every(s=>s&&(s.kind==='lesson'?!!(CHMAP[s.cid]&&COURS[s.cid]):s.kind==='exo'&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.every(id=>CHMAP[id])))&&pathOfGrade(p);}
// Un parcours qui n'appartient plus à la classe active (changement de classe) est invalide et sera refait.
function pathOfGrade(p){const g=typeof S!=='undefined'&&S?S.grade:null;if(!g)return true;const gr=id=>WMAP[id]?WMAP[id].lvl:null;return p.steps.every(s=>s.kind==='lesson'?gr(s.cid)===g:(s.ids||[]).every(id=>gr(id)===g));}
function pathArchive(p){S.pathHist=(S.pathHist||[]).concat([pathCompact(p)]).slice(-PATH_HIST_MAX);}
// Abonnés 'path:ensure' : mise à niveau d'un parcours du jour encore vierge, micro-compétence à renforcer par leçon.
function ensurePath(){const d=dstr(Date.now());
 if(!(S.path&&S.path.date===d&&pathValid(S.path))){if(S.path&&S.path.date!==d&&pathValid(S.path))pathArchive(S.path);S.path=makeDailyPath(S,d,ACTIVE);saveLocal();}
 return MQHooks.filter('path:ensure',S.path,{date:d});}
/* ----- Écran du circuit, carte d'accueil, explication par Finot ----- */
function pathSubjIcon(s){const x=SUBMAP[s];return (x&&x.emoji)||'📘';}
function pathStepLabel(s){if(s.kind==='lesson'){const x=SUBMAP[s.subj];return 'Leçon de '+(x?x.name.toLowerCase():'cours');}
 return 'Exercices ('+PATH_EXO_N+' questions)';}
/* 19/10/2026 : le parcours devient une carte d'aventure — une prairie dessinée en SVG (aucune image externe), un sentier
   qui serpente du départ (en bas) jusqu'au château et son coffre (en haut), un lieu par étape et Finot posté à l'étape
   en cours. Même logique qu'avant : mêmes étapes, mêmes verrous, mêmes actions (pathgo:i). */
const PATH_PLACES=[['🌼','Le pré fleuri'],['🌉','Le pont de bois'],['🌲','La forêt'],['⛰️','La colline'],['⛺','Le campement'],['🏔️','Le sommet']];
// Repère 100 × 300 : départ, 4 leçons, rivière (passage vers les exercices), 2 exercices, château. Le décor, dessiné en
// 100 × 260, est étiré à la même hauteur.
const PATH_PTS=[[72,290],[28,258],[70,228],[30,198],[68,168],[46,141],[26,104],[70,74],[47,42]];
const PATH_MINI_X=[17,30,43,56,76,89];
const pathPt=i=>PATH_PTS[i<PATH_LESSONS?i+1:i+2];
function pathCurve(pts){let d=`M${pts[0][0]} ${pts[0][1]}`;const f=v=>v.toFixed(1);
 for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
  d+=` C${f(p1[0]+(p2[0]-p0[0])/6)} ${f(p1[1]+(p2[1]-p0[1])/6)} ${f(p2[0]-(p3[0]-p1[0])/6)} ${f(p2[1]-(p3[1]-p1[1])/6)} ${p2[0]} ${p2[1]}`;}
 return d;}
const pathTree=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-.8" y="0" width="1.6" height="4" rx=".5" fill="#8a5a33"/><circle cy="-2" r="4.2" fill="#4fae4a"/><circle cx="-2" cy="-.5" r="3" fill="#5fc157"/><circle cx="2.2" cy="-1" r="2.8" fill="#46a242"/></g>`;
const pathPine=(x,y,k)=>`<g transform="translate(${x} ${y}) scale(${k})"><rect x="-.7" y="2" width="1.4" height="3" fill="#7a4d2a"/><path d="M0-7 4 0H2l3 3H-5l3-3h-2z" fill="#2f8f4e"/></g>`;
const pathFlower=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="1" fill="${c}"/><circle r=".45" fill="#fff6b0"/></g>`;
function pathScenery(){
 const fl=[[12,236,'#ff7eb6'],[86,230,'#ffd23f'],[40,232,'#fff'],[90,206,'#ff7eb6'],[8,200,'#ffd23f'],[52,212,'#b388ff'],[18,186,'#fff'],[84,180,'#ff7eb6'],[56,160,'#ffd23f'],[10,140,'#b388ff'],[88,132,'#fff'],[16,84,'#ff7eb6'],[90,88,'#ffd23f'],[52,84,'#fff'],[12,60,'#b388ff'],[86,56,'#ff7eb6'],[30,58,'#ffd23f']];
 const trees=[[8,62],[92,104],[94,150],[88,236],[90,186],[6,108],[93,64]],pines=[[6,172],[11,178],[16,170],[8,186],[48,186],[52,180],[56,186],[8,40],[94,40]];
 return `<svg class="pmap-bg" viewBox="0 0 100 260" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><linearGradient id="pmsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9dcff"/><stop offset="1" stop-color="#e3f5ff"/></linearGradient><linearGradient id="pmgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6e48f"/><stop offset="1" stop-color="#86cf62"/></linearGradient></defs>
 <rect width="100" height="40" fill="url(#pmsky)"/><circle cx="85" cy="11" r="6" fill="#ffd84d"/><g fill="#fff" opacity=".9"><ellipse cx="18" cy="12" rx="7" ry="3"/><ellipse cx="24" cy="10" rx="5" ry="3"/><ellipse cx="60" cy="18" rx="6" ry="2.4"/><ellipse cx="65" cy="16.5" rx="4" ry="2.4"/></g>
 <path d="M0 30Q16 18 34 28T70 25T100 24V44H0Z" fill="#9fd486"/><path d="M0 36Q24 27 48 35T100 33V260H0Z" fill="url(#pmgr)"/>
 <path d="M0 116C20 110 34 127 55 119S86 110 100 120V130C82 122 64 135 45 129S15 121 0 126Z" fill="#7cc7ef"/><path d="M6 119C18 116 28 124 40 122M62 118C72 115 82 117 94 122" stroke="#d7f1ff" stroke-width=".8" fill="none" stroke-linecap="round"/>
 <ellipse cx="86" cy="96" rx="11" ry="5" fill="#8fd3f4"/><ellipse cx="86" cy="95" rx="7" ry="2" fill="#bfe8fb"/>
 ${trees.map(([x,y])=>pathTree(x,y)).join('')}${pines.map(([x,y],i)=>pathPine(x,y,i>6?.8:1)).join('')}${fl.map(([x,y,c])=>pathFlower(x,y,c)).join('')}</svg>`;}
function pathNodeHTML(s,i,mini){const st=s.status,pl=PATH_PLACES[i],lab=pathStepLabel(s),
 icon=st==='done'?'✓':st==='review'?'!':st==='locked'?'🔒':s.kind==='lesson'?pathSubjIcon(s.subj):'🎯',
 aria=`Étape ${i+1}, ${pl[1]} : ${esc(lab)}${st==='locked'?' (verrouillée)':''}`;
 if(mini)return `<button class="pmini ${st}" data-a="pathgo:${i}" aria-label="${aria}" style="left:${PATH_MINI_X[i]}%;top:${i%2?50:78}%"><span class="pmi" aria-hidden="true">${icon}</span></button>`;
 const [x,y]=pathPt(i),sub=s.kind==='lesson'?esc(byId(s.cid).name)+(s.score!=null?` · quiz ${s.score} %`:''):(s.score!=null?`${s.score}/${PATH_EXO_N} · meilleure série ${s.bestStreak||0}`:'Sur tes 4 leçons du jour');
 return `<li class="pstep ${st}" style="left:${x}%;top:${(y/3).toFixed(2)}%"><button class="pbubble" data-a="pathgo:${i}" aria-label="${aria}">${icon}</button><div class="plab"><b>${pl[0]} ${pl[1]}</b><span>${esc(lab)}${st==='review'?' <span class="ptag">À revoir</span>':''}</span><small>${sub}</small></div></li>`;}
function pathScreen(){if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}stopPron();L=null;padClose();ttsStop();CUR='path';
 const p=ensurePath();
 if(!p){app.innerHTML=`${bar('📝 Devoir du jour')}<p class="muted center">Aucun parcours disponible pour cette classe.</p>`;return;}
 const n=pathDoneCount(p),open=p.steps.slice(0,PATH_LESSONS).every(s=>s.status==='done'||s.status==='review'),ni=p.steps.findIndex(s=>s.status==='next'),last=PATH_PTS.length-1;
 // Le sentier se colore jusqu'à l'étape en cours (indice dans PATH_PTS) ; Finot s'y tient
 const reach=p.chest?last:ni<0?0:(ni<PATH_LESSONS?ni+1:ni+2),fin=PATH_PTS[reach],[gx,gy]=PATH_PTS[PATH_LESSONS+1],[cx,cy]=PATH_PTS[last],top=y=>(y/3).toFixed(2);
 app.innerHTML=`${bar('📝 Devoir du jour')}
 <div class="card path-head"><div class="grow"><b>${n}/6 étapes</b><div class="muted small">${p.chest?'Aventure terminée, bravo ! Une nouvelle carte t’attend demain.':'Suis le sentier : 4 leçons, la rivière, puis 2 séries d’exercices. Le coffre t’attend au château !'}</div></div><button class="btn ghost sm" data-a="pathinfo" aria-label="Comment marche le parcours du jour ?">ⓘ</button></div>
 <div class="pmap">${pathScenery()}<svg class="pmap-trail" viewBox="0 0 100 300" aria-hidden="true" focusable="false"><path d="${pathCurve(PATH_PTS)}" class="ptrail"/><path d="${pathCurve(PATH_PTS)}" class="ptrail-dash"/>${reach>0?`<path d="${pathCurve(PATH_PTS.slice(0,reach+1))}" class="ptrail-done"/>`:''}</svg>
 <ol class="path">
 <li class="pend start" style="left:${PATH_PTS[0][0]}%;top:${top(PATH_PTS[0][1])}%">🏡 Départ</li>
 ${p.steps.slice(0,PATH_LESSONS).map((s,i)=>pathNodeHTML(s,i)).join('')}
 <li class="pgate ${open?'open':''}" style="left:${gx}%;top:${top(gy)}%">${open?'🔓 Rivière franchie !<small>Place aux exercices</small>':'🔒 La rivière<small>Termine les 4 leçons pour passer</small>'}</li>
 ${p.steps.slice(PATH_LESSONS).map((s,j)=>pathNodeHTML(s,j+PATH_LESSONS)).join('')}
 <li class="pend castle ${p.chest?'won':''}" style="left:${cx}%;top:${top(cy)}%"><span class="pcastle" aria-hidden="true">🏰</span>${p.chest?'🏆 Coffre ouvert !':'🎁 Le coffre du château'}</li></ol>
 <img class="pfinot" src="${FINOT_IMG.neutre}" alt="Finot t’attend ici" style="left:${fin[0]}%;top:${top(fin[1])}%"></div>`;
 MQHooks.emit('path:rendered',{p});
 const nx=document.querySelector('.pstep.next');if(nx&&nx.scrollIntoView)nx.scrollIntoView({block:'center'});}
function pathHomeCard(){const p=ensurePath();if(!p)return '';const n=pathDoneCount(p),nx=p.steps.find(s=>s.status==='next'),g=n/6,ni=p.steps.indexOf(nx);
 const txt=p.chest?'Terminé ! Reviens demain pour une nouvelle aventure 🔥':nx?'Prochaine étape : '+pathStepLabel(nx):'';
 // Mini-carte : le même sentier à plat, de la maison au château, avec Finot sur l'étape en cours
 const fx=p.chest?95:ni<0?5:PATH_MINI_X[ni];
 return `<h2 class="sec daily-h">📝 Devoir du jour</h2><section class="goal card pathcard daily"><div class="pathrow"><button class="pathcard-go" data-a="path" aria-label="Ouvrir le devoir du jour"><svg viewBox="0 0 52 52" class="ring" aria-hidden="true"><circle cx="26" cy="26" r="22" class="rb"/><circle cx="26" cy="26" r="22" class="rf" style="stroke-dashoffset:${138.2*(1-g)}"/><text x="26" y="31" text-anchor="middle">${p.chest?'✓':n+'/6'}</text></svg><div><b>L’aventure du jour : leçons et exercices</b><div class="muted">${esc(txt)}</div></div></button><button class="btn ghost sm pinfo" data-a="pathinfo" aria-label="Comment marche le devoir du jour ?">ⓘ</button></div>
 <div class="pathmini"><svg viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true" focusable="false"><rect width="100" height="34" fill="#a5dc7e"/><path d="M64 0C70 10 62 22 68 34" stroke="#7cc7ef" stroke-width="5" fill="none"/><path d="${pathCurve([[4,26.5],[17,26.5],[30,17],[43,26.5],[56,17],[76,26.5],[89,17],[96,17]])}" class="ptrail mini"/></svg>
 <span class="pmstart" aria-hidden="true">🏡</span><span class="pmchest" aria-hidden="true">${p.chest?'🏆':'🏰'}</span>
 ${p.steps.map((s,i)=>pathNodeHTML(s,i,true)).join('')}<img class="pmfinot" src="${FINOT_IMG.neutre}" alt="" aria-hidden="true" style="left:${fx}%;top:calc(${ni<0||p.chest?50:ni%2?50:78}% - 50px)"></div></section>`;}
const PATH_INFO='<b>🗺️ Ton parcours du jour</b><br>Chaque jour, je te prépare un parcours : <b>4 leçons</b> de matières différentes, puis <b>2 séries d’exercices</b> sur ce que tu viens d’apprendre.<br>🔥 Plus tu enchaînes les bonnes réponses dans les exercices, plus tu gagnes de pièces : 1, puis 2, 3, 4… jusqu’à <b>×5</b> !<br>🎁 Au bout, un <b>coffre</b> t’attend (pièces, XP et bons points).<br>🟠 Si une leçon est difficile, pas de panique : tu continues, et on la reverra ensemble.';
function pathInfo(){finotOpen();finotPush('finot',PATH_INFO);}
function pathGo(i){const p=ensurePath();if(!p)return;const s=p.steps[+i];if(!s)return;
 if(s.status==='locked')return toast('Termine d’abord l’étape précédente 🙂');
 if(s.kind==='lesson'){openLesson(s.cid);if(L&&s.status==='next')L.path={i:+i,date:p.date,t0:Date.now()};return;}
 if(s.status==='done')return toast('Étape déjà réussie aujourd’hui ✅');
 startMission(s.ids.slice(),{n:PATH_EXO_N,path:{i:+i,date:p.date,t0:Date.now(),streak:0,best:0,answers:[]}});}
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
 // Série « à revoir » rejouée : elle est réévaluée (réussie à partir de 60 %) ; le coffre, lui, n'est jamais redonné (pathChest).
 if(!s||s.kind!=='exo'||(s.status!=='next'&&s.status!=='review'))return null;
 s.answers=t.answers.map(a=>({cid:a.cid,ok:a.ok,ms:a.ms}));s.bonuses=(t.bonuses||[]).slice();s.score=t.answers.filter(a=>a.ok).length;
 s.ms=Math.max(0,Math.min(PATH_STEP_MS_MAX,Date.now()-t.t0));s.bestStreak=t.best;
 // Une série sous 60 % de réussite est « à revoir » (rejouable sans second coffre).
 s.status=(s.score/PATH_EXO_N)>=.6?'done':'review';pathAdvance(p);
 return p.steps.every(x=>x.status==='done'||x.status==='review')?pathChest(p):null;}
// Coffre : 40 🪙, 50 XP et les bons points « path », modulés par les leçons à revoir (−25 % chacune, plancher 50 %) et
// par la réussite aux exercices (≥ 80 % : 100 %, ≥ 60 % : 75 %, ≥ 40 % : 50 %, sinon 25 %).
function pathChestGains(p){const lr=p.steps.filter(s=>s.kind==='lesson'&&s.status==='review').length,ans=[].concat(...p.steps.filter(s=>s.kind==='exo').map(s=>s.answers||[])),acc=ans.length?ans.filter(a=>a.ok).length/ans.length:0,
 lf=Math.max(.5,1-.25*lr),ef=acc>=.8?1:acc>=.6?.75:acc>=.4?.5:.25,f=lf*ef;
 return {coins:Math.round(40*f),xp:Math.round(50*f),merit:Math.round((S.merit.rules.path||0)*f),review:lr,exerciseAccuracy:Math.round(acc*100)};}
function pathChest(p){if(!p||p.chest)return null;const g=pathChestGains(p);p.chest=true;S.coins+=g.coins;S.xp+=g.xp;S.goalsDone++;
 if(g.merit)addMerit(g.merit,'Parcours du jour 🗺️',null);
 setTimeout(()=>finotCeleb(FINOT_IMG.cadeau,'Parcours terminé !',`+${g.coins} 🪙 · +${g.xp} XP${g.merit?` · +${g.merit} 🎖️`:''}${g.review?` · ${g.review} leçon${g.review>1?'s':''} à revoir 🟠`:''}`),900);
 return g;}
Object.assign(ACT,{path:()=>pathScreen(),pathgo:i=>pathGo(i),pathinfo:()=>pathInfo()});
// Au démarrage, home() est rendu par app-actions.js avant le chargement de ce fichier : on le réaffiche
// une fois pour faire apparaître la carte du parcours (sans rien changer d'autre à l'écran).
if(typeof CUR!=='undefined'&&CUR==='home'&&S&&S.name)home();
