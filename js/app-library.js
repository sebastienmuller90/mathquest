/* ===== Bibliothèque de lecture (18/10/2026) : tous les supports de data/reading/resources.js, en accès
   libre (recherche, filtres classe et genre). Ouvrir un texte lance une mini-leçon de deux étapes
   (« Je lis », « Je réponds ») qui réutilise entièrement le moteur des cours : renderLesson, rvalidate,
   indices, Finot, audio. L.lib (id du support) marque ce mode ; L.id est le premier chapitre lié au texte,
   pour que les erreurs aillent dans le carnet du bon chapitre. Aucun nouveau champ de sauvegarde : la
   progression est celle de S.readingProgress / S.readingMastery, déjà utilisée par les cours. */
let LIB={pid:null,q:'',lvl:'',kind:''};
const LIB_LEVELS=['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'];
const LIB_KINDS=[['','Tout'],['recit','📖 Récits'],['poeme','🎵 Poèmes et fables'],['theatre','🎭 Théâtre'],['doc','📰 Documents']];
function libKind(r){const d=String(r.documentType||'').toLowerCase();
 if(r.verse||/po[eè]me|fable|sonnet|\bode\b/.test(d))return 'poeme';
 if(/com[eé]die|trag[eé]die|th[eé][aâ]tre/.test(d))return 'theatre';
 return r.type==='document'?'doc':'recit';}
const libNorm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function libAll(){return Object.values((window.MQ_READING&&MQ_READING.resources)||{});}
function libFiltered(){const nq=libNorm(LIB.q.trim());
 return libAll().filter(r=>(!LIB.lvl||r.level===LIB.lvl)&&(!LIB.kind||libKind(r)===LIB.kind)&&(!nq||libNorm([r.title,r.author,r.work,r.documentType].join(' ')).includes(nq)))
  .sort((a,b)=>LIB_LEVELS.indexOf(a.level)-LIB_LEVELS.indexOf(b.level)||a.title.localeCompare(b.title,'fr'));}
function libListHTML(){const list=libFiltered(),prog=S.readingProgress||{};
 if(!list.length)return '<p class="muted center">Aucun texte ne correspond. Essaie un autre mot, une autre classe ou un autre genre.</p>';
 const ic={recit:'📖',poeme:'🎵',theatre:'🎭',doc:'📰'};
 return `<p class="muted small">${list.length} texte${list.length>1?'s':''}</p>`+list.map(r=>{const p=prog[r.id],b=p?Math.round(+p.bestScore||0):0;
  return `<button class="libcard card" data-a="libopen:${r.id}"><span class="libmeta"><span class="pill">${esc(r.level)}</span><span>${ic[libKind(r)]} ${esc(r.documentType||'')}</span><span>⏱️ ${+r.estimatedReadingMinutes||2} min</span></span><b class="libtitle">${esc(r.title)}</b>${r.author?`<span class="muted">${esc(r.author)}</span>`:''}${p?`<span class="libdone ${b>=85?'okc':b>=50?'mid':'lo'}">✓ Lu · meilleur score ${b} %</span>`:''}</button>`;}).join('');}
function libraryScreen(){if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}if(typeof stopPron==='function')stopPron();L=null;if(typeof padClose==='function')padClose();ttsStop();CUR='library';
 if(LIB.pid!==ACTIVE)LIB={pid:ACTIVE,q:'',lvl:LIB_LEVELS.includes(S.grade)?S.grade:'',kind:''};
 const all=libAll(),prog=S.readingProgress||{},nread=all.filter(r=>prog[r.id]).length;
 app.innerHTML=`${bar('📚 Bibliothèque')}
 <p class="muted">${all.length} textes à lire, du CP à la 3e : récits, contes, poèmes, théâtre et documents. Tu en as lu <b>${nread}</b>.</p>
 <input id="libq" class="fld libsearch" type="search" placeholder="Chercher un titre, un auteur…" value="${esc(LIB.q)}" aria-label="Rechercher un texte" autocomplete="off">
 <div class="libchips" role="group" aria-label="Classe">${[['','Toutes les classes'],...LIB_LEVELS.map(l=>[l,l])].map(([k,l])=>`<button class="pillbtn ${k===LIB.lvl?'on':''}" data-a="liblvl:${k}" aria-pressed="${k===LIB.lvl}">${l}</button>`).join('')}</div>
 <div class="libchips" role="group" aria-label="Genre">${LIB_KINDS.map(([k,l])=>`<button class="pillbtn ${k===LIB.kind?'on':''}" data-a="libkind:${k}" aria-pressed="${k===LIB.kind}">${l}</button>`).join('')}</div>
 <div id="liblist" aria-live="polite">${libListHTML()}</div>`;}
function libOpen(id){const r=window.MQReading&&MQReading.get(id);if(!r)return;
 const cid=(r.chapterLinks||[]).find(c=>COURS[c]&&WMAP[c]&&byId(c));if(!cid)return toast('Ce texte n’est pas disponible pour le moment.');
 if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}stopPron();
 L={id:cid,lib:r.id,i:0,steps:[{k:'read',t:'📖 Je lis',h:MQReading.textHTML(r,{listen:true}),resourceId:r.id},{k:'readq',t:'✍️ Je réponds aux questions',resourceId:r.id}],
  exn:1,qn:0,ok:0,q:null,locked:false,pronTargets:[],pronIndex:0,pronPassed:true,pronPassedCount:0,confidence:0,quizDifficulty:1,quizStreak:0,wrong:0,mode:'lib',pq:null,pn:0,tl:Date.now()};
 renderLesson();window.scrollTo(0,0);}
// Fin de lecture : récompense modeste la première fois qu'un texte est terminé (comme un cours validé,
// les gains ne sont donnés qu'une fois), puis écran de résultat.
function libEnd(res){const r=MQReading.get(L.lib);const l=L;L=null;padClose();ttsStop();CUR='libend';
 S.time+=Math.min(180,Math.max(0,(Date.now()-(l.tl||Date.now()))/1000));
 const p=(S.readingProgress||{})[r.id]||{},first=(p.attempts||0)===1,good=res.score>=70;
 if(first){S.xp+=15;S.coins+=2;}save();checkBadges();if(good)confetti(first?24:14);
 app.innerHTML=`<div class="end card pop">${good?`<img src="${FINOT_IMG.bravo}" alt="" aria-hidden="true" class="finot-live" style="width:72px;height:72px;border-radius:50%;object-fit:cover;object-position:50% 35%;display:block;margin:0 auto 4px;">`:'<div class="bigicon">📖</div>'}<h1>${good?'Bien lu !':'Continue, tu progresses'}</h1><p class="lead">${esc(r.title)}</p>
 <p>Questions réussies : <b>${res.ok}/${res.total}</b> · <b>${res.score} %</b></p><p class="muted">Meilleur score sur ce texte : <b>${Math.round(+p.bestScore||0)} %</b></p>
 ${first?'<div class="gains"><span>+15 XP</span><span>+2 🪙</span></div>':'<p class="muted small">Texte relu : les récompenses ne sont données que la première fois.</p>'}
 ${res.ok<res.total?'<p class="muted small">Les questions manquées sont dans ton carnet d’erreurs.</p>':''}
 <div class="col"><button class="btn primary big" data-a="libopen:${r.id}">🔁 Relire et refaire</button><button class="btn big" data-a="library">📚 Choisir un autre texte</button><button class="btn ghost wide" data-a="home">🏠 Accueil</button></div></div>`;}
function libRefresh(){const el=document.getElementById('liblist');if(el)el.innerHTML=libListHTML();}
Object.assign(ACT,{
 library:()=>libraryScreen(),
 libopen:id=>libOpen(id),
 liblvl:k=>{LIB.lvl=k||'';libraryScreen();},
 libkind:k=>{LIB.kind=k||'';libraryScreen();}
});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='libq'){LIB.q=e.target.value;libRefresh();}});
