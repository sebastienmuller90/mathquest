/* ===== Écrans ===== */
let ONBG='';
function onboarding(isNew=false){const st=ONBG?stageOf(ONBG):'';app.innerHTML=`<div class="onb card pop"><img src="${FINOT_IMG.bienvenue}" alt="" aria-hidden="true" class="finot-live" style="width:96px;height:96px;border-radius:50%;object-fit:cover;object-position:50% 35%;"><h1>${isNew?'Nouveau profil':'MathQuest'}</h1><p class="muted">${isNew?'Chaque enfant garde sa progression, ses étoiles et ses récompenses.':'Apprendre en s’amusant, du CP à la 3e.'}</p>
 <label class="lab">Ton prénom ou pseudo<input id="nm" class="big" maxlength="16" autocomplete="off"></label>
 <label class="lab">Date de naissance <span class="muted small">(facultatif)</span><input id="bd" type="date" class="big" max="${localISODate(Date.now())}"></label>
 <p class="lab" id="stl">Ton école</p><div class="stagepick" role="group" aria-labelledby="stl">${Object.entries(STAGE_INFO).filter(([k])=>k==='college'||PRIMARY_GRADES.length).map(([k,v])=>`<button class="stb ${st===k?'sel':''}" data-a="pickstage:${k}" aria-pressed="${st===k}"><span>${v.emoji}</span>${v.label}</button>`).join('')}</div>
 <div id="gradebox">${onbGrades(st)}</div>
 <p class="lab">Choisis ton compagnon</p><div class="avs">${AVATARS.filter(a=>!a[1]).map(([e])=>`<button class="avb ${e===ONB?'sel':''}" data-a="pickav:${e}" aria-label="Compagnon ${e}">${e}</button>`).join('')}</div>
 <button class="btn primary big" data-a="begin">Commencer l’aventure 🚀</button></div>`;$('#nm').focus();}
function onbGrades(st){if(!st)return '<p class="muted small">Choisis d’abord ton école, puis ta classe.</p>';const list=st==='primaire'?PRIMARY_GRADES:['6e','5e','4e','3e'];
 return `<p class="lab" id="grl">Ta classe</p><div class="gradepick" role="group" aria-labelledby="grl">${list.map(g=>`<button class="grb ${g===ONBG?'sel':''}" data-a="pickgrade:${g}" aria-pressed="${g===ONBG}">${g}</button>`).join('')}</div>`;}

/* V8.14 — Finot, le compagnon de MathQuest. Le « lien avec Finot » se déduit de S.streak.best (record de
   jours de suite, ne redescend jamais) : pas de nouveau champ de sauvegarde, rien à migrer. Le message
   contextuel se déduit de S.streak.n/.last (déjà existants). Compagnon distinct de S.avatar (choisi par
   l'enfant) : jamais affiché à sa place. */
const FINOT_IMG={neutre:'data/images/finot/01-expression-neutre.jpg',victoire:'data/images/finot/02-expression-victoire.jpg',encouragement:'data/images/finot/03-expression-encouragement.jpg',surprise:'data/images/finot/04-expression-surprise.jpg',fatigue:'data/images/finot/06-expression-fatigue.jpg',indice:'data/images/finot/07-expression-indice.jpg',bravo:'data/images/finot/08-expression-bravo.jpg',carnet:'data/images/finot/09-expression-carnet.jpg',revision:'data/images/finot/10-expression-revision.jpg',cadeau:'data/images/finot/11-expression-cadeau.jpg',bienvenue:'data/images/finot/12-expression-bienvenue.jpg'};
/* V8.14 — catégories de matières au collège (18 matières à plat étaient illisibles). Le primaire (10 matières)
   garde l'affichage à plat existant, inchangé. */
const FINOT_CATS={
 gen:{label:'Général',emoji:'📘',img:'data/images/finot/ui-cat-general.png',ids:['maths','francais','hg','emc']},
 langues:{label:'Langues',emoji:'🌍',img:'data/images/finot/ui-cat-langues.png',ids:['anglais','italien']},
 sciences:{label:'SVT',emoji:'🧬',img:'data/images/finot/ui-cat-svt.png',ids:['svt','pc']},
 techno:{label:'Techno',emoji:'💻',img:'data/images/finot/ui-cat-techno.png',ids:['tech','pix','ia','emi']},
 artsport:{label:'Arts & Sport',emoji:'🎨',img:'data/images/finot/ui-cat-artsport.png',ids:['arts','musique','eps','hda']},
 vie:{label:'Orientation',emoji:'🧭',img:'data/images/finot/ui-cat-orientation.png',ids:['evars','orientation']}
};
function finotCatOf(subjId){for(const [k,c] of Object.entries(FINOT_CATS))if(c.ids.includes(subjId))return k;return null;}
let OPENCAT=null;
/* V8.27 — accueil découpé en 4 onglets (au lieu d'un long scroll unique) : état d'onglet éphémère, jamais
   sauvegardé (comme OPENCAT), toujours valide (une des 4 clés fixes). */
let HOMETAB='accueil';
const HOMETABS=[['accueil','🏠','Accueil'],['matieres','🎮','Matières'],['progres','🏆','Progrès'],['plus','⚙️','Plus']];
/* Scènes illustrées des mondes maths (seuls mondes avec une image pour l'instant ; les autres gardent leur
   dégradé de couleur existant — pas d'image manquante à combler). */
const FINOT_WORLD_IMG={'6':'data/images/finot/35-scene-ile-nombres.jpg','5':'data/images/finot/36-scene-foret-relatifs.jpg','4':'data/images/finot/37-scene-volcan-puissances.jpg','3':'data/images/finot/38-scene-galaxie-fonctions.jpg',
 svt6:'data/images/finot/scene-svt-6e.jpg',svt5:'data/images/finot/scene-svt-5e.jpg',svt4:'data/images/finot/scene-svt-4e.jpg',svt3:'data/images/finot/scene-svt-3e.jpg',
 en6:'data/images/finot/scene-en-6e.jpg',en5:'data/images/finot/scene-en-5e.jpg',en4:'data/images/finot/scene-en-4e.jpg',en3:'data/images/finot/scene-en-3e.jpg',
 it5:'data/images/finot/scene-it-5e.jpg',it4:'data/images/finot/scene-it-4e.jpg',it3:'data/images/finot/scene-it-3e.jpg',
 fr6:'data/images/finot/scene-fr-6e.jpg',fr5:'data/images/finot/scene-fr-5e.jpg',fr4:'data/images/finot/scene-fr-4e.jpg',fr3:'data/images/finot/scene-fr-3e.jpg',
 hg6:'data/images/finot/scene-hg-6e.jpg',hg5:'data/images/finot/scene-hg-5e.jpg',hg4:'data/images/finot/scene-hg-4e.jpg',hg3:'data/images/finot/scene-hg-3e.jpg',
 emc6:'data/images/finot/scene-emc-6e.jpg',emc5:'data/images/finot/scene-emc-5e.jpg',emc4:'data/images/finot/scene-emc-4e.jpg',emc3:'data/images/finot/scene-emc-3e.jpg',
 'arts3':'data/images/finot/scene-arts3.jpg','arts4':'data/images/finot/scene-arts4.jpg','arts5':'data/images/finot/scene-arts5.jpg','arts6':'data/images/finot/scene-arts6.jpg','ce1-ap':'data/images/finot/scene-ce1-ap.jpg','ce1-emc':'data/images/finot/scene-ce1-emc.jpg','ce1-en':'data/images/finot/scene-ce1-en.jpg','ce1-eps':'data/images/finot/scene-ce1-eps.jpg','ce1-evar':'data/images/finot/scene-ce1-evar.jpg','ce1-fr':'data/images/finot/scene-ce1-fr.jpg','ce1-ma':'data/images/finot/scene-ce1-ma.jpg','ce1-mu':'data/images/finot/scene-ce1-mu.jpg','ce1-qm':'data/images/finot/scene-ce1-qm.jpg','ce2-ap':'data/images/finot/scene-ce2-ap.jpg','ce2-emc':'data/images/finot/scene-ce2-emc.jpg','ce2-en':'data/images/finot/scene-ce2-en.jpg','ce2-eps':'data/images/finot/scene-ce2-eps.jpg','ce2-evar':'data/images/finot/scene-ce2-evar.jpg','ce2-fr':'data/images/finot/scene-ce2-fr.jpg','ce2-ma':'data/images/finot/scene-ce2-ma.jpg','ce2-mu':'data/images/finot/scene-ce2-mu.jpg','ce2-qm':'data/images/finot/scene-ce2-qm.jpg','cm1-ap':'data/images/finot/scene-cm1-ap.jpg','cm1-emc':'data/images/finot/scene-cm1-emc.jpg','cm1-en':'data/images/finot/scene-cm1-en.jpg','cm1-eps':'data/images/finot/scene-cm1-eps.jpg','cm1-evar':'data/images/finot/scene-cm1-evar.jpg','cm1-fr':'data/images/finot/scene-cm1-fr.jpg','cm1-hg':'data/images/finot/scene-cm1-hg.jpg','cm1-ma':'data/images/finot/scene-cm1-ma.jpg','cm1-mu':'data/images/finot/scene-cm1-mu.jpg','cm1-sc':'data/images/finot/scene-cm1-sc.jpg','cm2-ap':'data/images/finot/scene-cm2-ap.jpg','cm2-emc':'data/images/finot/scene-cm2-emc.jpg','cm2-en':'data/images/finot/scene-cm2-en.jpg','cm2-eps':'data/images/finot/scene-cm2-eps.jpg','cm2-evar':'data/images/finot/scene-cm2-evar.jpg','cm2-fr':'data/images/finot/scene-cm2-fr.jpg','cm2-hg':'data/images/finot/scene-cm2-hg.jpg','cm2-ma':'data/images/finot/scene-cm2-ma.jpg','cm2-mu':'data/images/finot/scene-cm2-mu.jpg','cm2-sc':'data/images/finot/scene-cm2-sc.jpg','cp-ap':'data/images/finot/scene-cp-ap.jpg','cp-emc':'data/images/finot/scene-cp-emc.jpg','cp-en':'data/images/finot/scene-cp-en.jpg','cp-eps':'data/images/finot/scene-cp-eps.jpg','cp-evar':'data/images/finot/scene-cp-evar.jpg','cp-fr':'data/images/finot/scene-cp-fr.jpg','cp-hg':'data/images/finot/scene-cp-hg.jpg','cp-ma':'data/images/finot/scene-cp-ma.jpg','cp-mu':'data/images/finot/scene-cp-mu.jpg','cp-sc':'data/images/finot/scene-cp-sc.jpg','emi3':'data/images/finot/scene-emi3.jpg','emi4':'data/images/finot/scene-emi4.jpg','emi5':'data/images/finot/scene-emi5.jpg','emi6':'data/images/finot/scene-emi6.jpg','eps3':'data/images/finot/scene-eps3.jpg','eps4':'data/images/finot/scene-eps4.jpg','eps5':'data/images/finot/scene-eps5.jpg','eps6':'data/images/finot/scene-eps6.jpg','evars3':'data/images/finot/scene-evars3.jpg','evars4':'data/images/finot/scene-evars4.jpg','evars5':'data/images/finot/scene-evars5.jpg','evars6':'data/images/finot/scene-evars6.jpg','hda3':'data/images/finot/scene-hda3.jpg','hda4':'data/images/finot/scene-hda4.jpg','hda5':'data/images/finot/scene-hda5.jpg','hda6':'data/images/finot/scene-hda6.jpg','ia3':'data/images/finot/scene-ia3.jpg','ia4':'data/images/finot/scene-ia4.jpg','ia5':'data/images/finot/scene-ia5.jpg','ia6':'data/images/finot/scene-ia6.jpg','musique3':'data/images/finot/scene-musique3.jpg','musique4':'data/images/finot/scene-musique4.jpg','musique5':'data/images/finot/scene-musique5.jpg','musique6':'data/images/finot/scene-musique6.jpg','orientation3':'data/images/finot/scene-orientation3.jpg','orientation4':'data/images/finot/scene-orientation4.jpg','orientation5':'data/images/finot/scene-orientation5.jpg','orientation6':'data/images/finot/scene-orientation6.jpg','pc3':'data/images/finot/scene-pc3.jpg','pc4':'data/images/finot/scene-pc4.jpg','pc5':'data/images/finot/scene-pc5.jpg','pc6':'data/images/finot/scene-pc6.jpg','pix3':'data/images/finot/scene-pix3.jpg','pix4':'data/images/finot/scene-pix4.jpg','pix5':'data/images/finot/scene-pix5.jpg','pix6':'data/images/finot/scene-pix6.jpg','tech3':'data/images/finot/scene-tech3.jpg','tech4':'data/images/finot/scene-tech4.jpg','tech5':'data/images/finot/scene-tech5.jpg'};
const FINOT_NIVEAUX=[{seuil:0,nom:'Nouvel ami'},{seuil:3,nom:'Complice'},{seuil:7,nom:'Meilleur ami'},{seuil:14,nom:'Explorateur fidèle'},{seuil:30,nom:'Lié pour la vie'}];
function finotNiveau(S){const best=S.streak?.best||0;let cur=FINOT_NIVEAUX[0];for(const niv of FINOT_NIVEAUX)if(best>=niv.seuil)cur=niv;return cur;}
function finotJoursAbsence(S){const last=S.streak?.last;if(!last)return 0;const d=new Date(last);if(isNaN(d))return 0;return Math.max(0,Math.round((Date.now()-d.getTime())/864e5));}
function finotEtat(S){const best=S.streak?.best||0,n=S.streak?.n||0,absence=finotJoursAbsence(S);
 if(absence>=3)return{img:FINOT_IMG.surprise,texte:`Tu m’as manqué ! Ça fait ${absence} jours… prêt à repartir ensemble ?`};
 if(n>=2&&n===best)return{img:FINOT_IMG.victoire,texte:`${n} jours de suite, un nouveau record ! Je suis trop fier de toi.`};
 if(n>=1)return{img:FINOT_IMG.encouragement,texte:'On continue l’aventure ensemble aujourd’hui ?'};
 return{img:FINOT_IMG.neutre,texte:'Prêt pour une nouvelle mission ?'};}
/* V8.16 — Assistant Finot : demandé explicitement « script, 0 coût, 100% hors ligne, strictement l'aide
   scolaire et l'appli » (pas d'IA générative : zéro risque de réponse inventée). Deux sources de réponses :
   1) une FAQ sur le fonctionnement de l'appli (ci-dessous), trouvée par correspondance de mots-clés ;
   2) le contenu déjà écrit et vérifié du chapitre en cours (méthode/astuce/retenir), via le bouton dédié
   « Aide sur l'exercice en cours » — jamais par recherche libre, pour ne pas improviser une explication. */
const FINOT_FAQ=[
 {kw:['xp','niveau','experience'],a:'Les <b>XP</b> (points d’expérience) se gagnent à chaque bonne réponse. Plus tu en as, plus tu montes de niveau — et ça ne redescend jamais !'},
 {kw:['piece','pieces','monnaie'],a:'Les <b>pièces 🪙</b> se gagnent en jouant. Elles servent à acheter des avatars et des thèmes dans la <b>Boutique</b> 🛍️.'},
 {kw:['serie','jours de suite','flamme','record'],a:'La <b>série 🔥</b> compte tes jours de suite où tu as joué au moins une fois. Ton <b>record</b> ne redescend jamais, même si tu rates un jour : je m’en souviens toujours.'},
 {kw:['objectif du jour','objectif quotidien'],a:'L’<b>objectif du jour</b> est un nombre de bonnes réponses à atteindre. Une fois fait, tu gagnes +30 🪙 et ça compte pour ta série du jour.'},
 {kw:['boutique','theme','themes','avatar'],a:'Dans la <b>Boutique 🛍️</b>, tu peux débloquer de nouveaux avatars et de nouveaux thèmes de couleurs avec tes pièces 🪙.'},
 {kw:['badge','badges','trophee'],a:'Les <b>badges 🏆</b> récompensent des exploits (première mission, série de bonnes réponses…). Tu les retrouves dans l’écran <b>Badges</b>.'},
 {kw:['bon point','bons points','recompense','recompenses'],a:'Les <b>bons points 🎖️</b> sont donnés par tes parents. Tu peux les échanger contre des récompenses qu’ils ont préparées pour toi, dans l’écran <b>Récompenses</b>.'},
 {kw:['carnet d erreur','carnet derreurs','mes erreurs'],a:'Le <b>carnet d’erreurs</b> garde les questions que tu as ratées. Une erreur est effacée seulement après <b>3 bonnes réponses</b> d’affilée sur la même notion.'},
 {kw:['revision intelligente','reviser','revision'],a:'La <b>révision intelligente 🧠</b> te propose automatiquement ce qui te fera le plus progresser, en priorité ce qui est dû à être revu.'},
 {kw:['defi eclair','chrono','60 secondes'],a:'Le <b>défi éclair ⚡</b> dure 60 secondes : réponds à un maximum de questions pour battre ton record !'},
 {kw:['indice'],a:'Pendant une question, touche <b>💡 Indice</b> : il t’aide, mais tu gagnes deux fois moins de XP sur cette question-là.'},
 {kw:['brouillon','dessiner'],a:'Le bouton <b>✏️ Brouillon</b> ouvre un espace pour écrire ou dessiner tes calculs, comme sur une feuille.'},
 {kw:['ecouter','haut parleur'],a:'Le haut-parleur 🔊 fait lire la question à voix haute. Tu peux couper le son avec le bouton en haut de l’écran.'},
 {kw:['profil','plusieurs enfants','changer d enfant'],a:'Chaque enfant a son <b>propre profil</b> : progression, étoiles et récompenses sont toujours séparées. Change de profil depuis <b>Profils 👧👦</b>.'},
 {kw:['mode parent','espace parent','code parent'],a:'L’<b>Espace parents 🔒</b> est protégé par un code secret que tes parents choisissent. Il sert à suivre tes progrès et gérer les récompenses.'},
 {kw:['suivi a distance','lien parent'],a:'Le <b>suivi à distance</b> permet à un parent de voir tes progrès depuis son téléphone, grâce à un lien donné depuis l’Espace parents.'},
 {kw:['repaire','lien avec toi','lien avec finot','notre lien'],a:'Mon <b>repaire</b>, c’est notre endroit à nous deux ! Plus on joue régulièrement ensemble, plus notre lien grandit et plus je débloque des objets.'},
 {kw:['objet du repaire','objets du repaire','debloquer un objet'],a:'Les objets de mon repaire se débloquent en jouant <b>régulièrement</b> (ta série de jours de suite), pas en étant parfait — l’important, c’est de revenir souvent !'},
 {kw:['changer de classe','niveau scolaire'],a:'Tu peux changer de classe depuis l’Espace parents, onglet <b>Réglages</b>. Les matières proposées s’adaptent automatiquement.'},
 {kw:['dictee'],a:'Pour une <b>dictée</b>, écoute bien la phrase 🔊, puis écris-la. Je regarde chaque mot : accents, accords, ponctuation… tout compte un peu, mais rien n’est éliminatoire d’un coup !'},
 {kw:['comment marche le cours','etapes du cours'],a:'Un <b>cours</b> se déroule en plusieurs étapes : découverte, exemples, méthode, pièges à éviter, ce qu’il faut retenir, puis entraînement et petit quiz.'},
 {kw:['mission','8 questions'],a:'Une <b>mission</b>, c’est 8 questions sur un chapitre. Plus tu enchaînes les bonnes réponses, plus ton <b>combo</b> 🔥 multiplie tes XP !'},
 {kw:['hors ligne','sans internet','pas de wifi'],a:'MathQuest fonctionne <b>sans connexion Internet</b> une fois ouvert : tu peux jouer même hors ligne.'},
 {kw:['exporter','importer','changer d appareil'],a:'Dans l’Espace parents (Réglages), un <b>code d’export</b> permet de copier ta progression vers un autre appareil.'}
];
const FINOT_SUGGEST=['C’est quoi les XP ?','Comment débloquer un thème ?','Comment marche mon lien avec toi ?','Pourquoi mon erreur est encore dans mon carnet ?'];
const FINOT_FALLBACK='Je ne suis pas sûr de pouvoir t’aider là-dessus 🤔 Je sais répondre sur MathQuest (XP, boutique, mon repaire, les cours…) et te donner un coup de pouce sur l’exercice en cours. Essaie de reformuler, ou touche une suggestion ci-dessous !';
function finotMatch(text){const norm=' '+normLang(text,'fr')+' ';let best=null,score=0;
 for(const e of FINOT_FAQ){let s=0;for(const k of e.kw)if(norm.includes(' '+k+' '))s+=k.length;if(s>score){score=s;best=e;}}
 return best;}
function finotLessonHelp(id){const ch=CHMAP[id];if(!ch)return null;const c=COURS[id]||{};
 const tip=c.tip||ch.tip,method=(c.method&&c.method[0])||'',key=plainText((c.retenir||[])[0]||(ch.f&&ch.f.l&&ch.f.l[0])||'');
 const bits=[];if(method)bits.push(`<b>Méthode :</b> ${method}`);if(tip)bits.push(`<b>Astuce :</b> ${tip}`);if(!bits.length&&key)bits.push(`<b>À retenir :</b> ${key}`);
 return{name:ch.name||'',html:bits.length?bits.join('<br>'):'Relis bien le cours de ce chapitre : tu vas y arriver 💪'};}
function finotCurrentChapterId(){if(M&&M.cid)return M.cid;if(L&&L.id)return L.id;return null;}
let FCHAT=null;
function finotChatEnsure(){if(!FCHAT)FCHAT={msgs:[{who:'finot',html:'Salut, c’est Finot ! 🦊 Pose-moi une question sur MathQuest, ou demande un coup de pouce sur ton exercice en cours.'}]};}
function finotChatDOM(){if(document.getElementById('finotchat'))return;
 const fab=document.createElement('button');fab.className='finot-fab';fab.dataset.a='finotopen';fab.setAttribute('aria-label','Parler à Finot');
 fab.innerHTML=`<img src="${finotEtat(S).img}" alt="" aria-hidden="true" class="finot-live">`;document.body.appendChild(fab);
 const box=document.createElement('div');box.id='finotchat';box.setAttribute('role','dialog');box.setAttribute('aria-modal','false');box.setAttribute('aria-label','Discussion avec Finot');
 box.innerHTML=`<div class="fch-head"><img src="${FINOT_IMG.neutre}" alt="" aria-hidden="true"><b>Finot</b><button class="btn ghost sm" data-a="finotclose" aria-label="Fermer">✕</button></div><div class="fch-body" id="fchBody" aria-live="polite" role="log"></div><div class="fch-chips" id="fchChips"></div><div class="fch-row"><label class="sr-only" for="finotin">Pose ta question à Finot</label><input id="finotin" class="fld" maxlength="140" placeholder="Pose ta question…" autocomplete="off"><button class="btn primary" data-a="finotsend">Envoyer</button></div>`;
 document.body.appendChild(box);}
function finotChatRender(){const body=document.getElementById('fchBody');if(!body)return;body.innerHTML=FCHAT.msgs.map(m=>`<div class="fch-msg ${m.who}">${m.html}</div>`).join('');body.scrollTop=body.scrollHeight;}
function finotChipsRender(){const box=document.getElementById('fchChips');if(!box)return;const chips=[];
 if(finotCurrentChapterId())chips.push('<button class="fch-chip" data-a="finotcoach">📖 Aide sur l’exercice en cours</button>');
 FINOT_SUGGEST.forEach((q,i)=>chips.push(`<button class="fch-chip" data-a="finotsug:${i}">${esc(q)}</button>`));
 box.innerHTML=chips.join('');}
function finotOpen(){finotChatEnsure();finotChatDOM();finotChipsRender();finotChatRender();document.getElementById('finotchat').classList.add('open');document.getElementById('finotin')?.focus();}
function finotClose(){document.getElementById('finotchat')?.classList.remove('open');}
function finotPush(who,html){FCHAT.msgs.push({who,html});if(FCHAT.msgs.length>40)FCHAT.msgs.shift();finotChatRender();}
function finotAsk(text){const t=String(text||'').trim();if(!t)return;finotChatEnsure();finotPush('you',esc(t));const m=finotMatch(t);finotPush('finot',m?m.a:FINOT_FALLBACK);finotChipsRender();}
function finotFabSync(){const fab=document.querySelector('.finot-fab');if(!fab)return;const show=!!S.name&&!PARENT;fab.classList.toggle('show',show);fab.classList.toggle('raised',CUR==='home');const img=fab.querySelector('img');if(img)img.src=finotEtat(S).img;if(!show)finotClose();}
/* V8.27 — barre d'onglets de l'accueil : élément persistant hors de #app (comme .finot-fab), jamais recréé à
   chaque écran. Nécessaire : #app.view-pop a une animation avec transform, ce qui en ferait le référentiel
   de positionnement de tout élément fixed placé DANS #app pendant l'animation (~320ms) — un élément fixed
   hors de #app n'a pas ce problème, exactement comme .finot-fab. */
function hometabsDOM(){if(document.getElementById('hometabs'))return;
 const nav=document.createElement('nav');nav.id='hometabs';nav.className='hometabs';nav.setAttribute('aria-label','Navigation principale');
 document.body.appendChild(nav);}
function hometabsSync(){const nav=document.getElementById('hometabs');if(!nav)return;const show=CUR==='home';nav.classList.toggle('show',show);if(!show)return;
 nav.innerHTML=HOMETABS.map(([k,emoji,label])=>`<button class="htab ${HOMETAB===k?'on':''}" data-a="hometab:${k}" aria-current="${HOMETAB===k?'page':'false'}"><span class="hti" aria-hidden="true">${emoji}</span><span class="htl">${label}</span></button>`).join('');}
function reco(){const list=SCH(S.subj);return MQAdaptive.recommendation(S,list,WMAP,S.grade)||list[0]||ALLCH[0];}
function home(){PARENT=false;CUR='home';if(!S.name)return onboarding();ensureSubj();applyStage();touchDaily();checkBirthday();if(S.merit.notes.length){toast(S.merit.notes.map(esc).join('<br>'));S.merit.notes=[];save();}const av=availPts(),rdy=S.merit.rewards.some(w=>av>=w.c&&!isPend(w.id)),nx=S.merit.rewards.filter(w=>!isPend(w.id)&&w.c>av).sort((a,b)=>a.c-b.c)[0];const L=lvl(S.xp),b=150*(L-1)**2,n=150*L**2,pct=Math.round((S.xp-b)/(n-b)*100),goal=S.dailyGoal||DEFAULT_GOAL,g=Math.min(1,S.daily.ok/goal),r=reco(),vs=visibleSubjects(),fe=finotEtat(S),
 isCollege=stageOf(S.grade)==='college',curCat=isCollege?(FINOT_CATS[OPENCAT]?OPENCAT:(finotCatOf(S.subj)||Object.keys(FINOT_CATS)[0])):null;
 const header=`<header class="top">
  <button class="av" data-a="shop" aria-label="Changer d’avatar">${S.avatar}</button>
  <div class="who"><button class="profile-btn" data-a="profiles" title="Changer d’enfant"><span class="miniav">${S.avatar}</span><span class="pname">${esc(S.name)}</span><span aria-hidden="true">⌄</span></button><div class="tt"><span class="grade-badge">${gradeLabel(S.grade)}</span> · Niveau ${L} : ${title(L)}</div><div class="xpbar" title="${S.xp-b}/${n-b} XP"><i style="width:${pct}%"></i></div></div>
  <div class="pills"><span class="pill" title="Pièces"><img src="data/images/icons/icon-coins.png" alt="" aria-hidden="true" style="width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:2px;"> ${S.coins}</span><span class="pill ${S.streak.n?'fire':''}" title="Jours d’affilée"><img src="data/images/icons/icon-streak.png" alt="" aria-hidden="true" style="width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:2px;"> ${S.streak.n}</span><button class="pill" data-a="snd" aria-label="${S.sound?'Couper le son':'Activer le son'}"><img src="data/images/icons/${S.sound?'icon-son-on':'icon-son-off'}.png" alt="" aria-hidden="true" style="width:18px;height:18px;object-fit:contain;"></button></div></header>
 <h1 class="sr-only">Accueil de ${esc(S.name)}</h1>`;
 const tabs={
  accueil:()=>`<button class="card finot-card" data-a="finot" style="display:flex;align-items:center;gap:12px;width:100%;border:none;text-align:left;cursor:pointer;font:inherit;color:inherit;" aria-label="Message de Finot — visiter son repaire">
   <img src="${fe.img}" alt="" aria-hidden="true" class="finot-live" style="width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:50% 35%;flex:0 0 auto;">
   <div style="flex:1;"><b style="color:var(--accent-text)">Finot</b> <span class="muted small">· ${finotNiveau(S).nom}</span><div>${esc(fe.texte)}</div></div>
   <span class="muted" aria-hidden="true">→</span>
  </button>
  <button class="reco card hero" data-a="chap:${r.id}"><span class="ri">${r.icon}</span><span><small>Mission conseillée</small><b>${r.name}</b><span class="muted">${curS().name} ${WMAP[r.id].lvl} ${starStr(S.chap[r.id]?.stars||0)}</span></span><span class="go">Jouer</span></button>
  <section class="goal card"><svg viewBox="0 0 52 52" class="ring" aria-hidden="true"><circle cx="26" cy="26" r="22" class="rb"/><circle cx="26" cy="26" r="22" class="rf" style="stroke-dashoffset:${138.2*(1-g)}"/><text x="26" y="31" text-anchor="middle">${S.daily.done?'✓':S.daily.ok}</text></svg>
   <div><b>Objectif du jour</b><div class="muted">${S.daily.done?'Réussi ! Reviens demain pour garder ta série 🔥':`${S.daily.ok}/${goal} bonnes réponses, +30 🪙 à la clé`}</div></div></section>`,
  matieres:()=>`<h2 class="sec">Mes matières</h2>
  ${isCollege?`<nav class="subj" aria-label="Catégorie de matières">${Object.entries(FINOT_CATS).map(([k,c])=>`<button class="sbtn ${k===curCat?'on':''}" data-a="opencat:${k}" aria-pressed="${k===curCat}">${c.img?`<img src="${c.img}" alt="" aria-hidden="true" style="width:20px;height:20px;object-fit:contain;vertical-align:-4px;margin-right:4px;">`:`<span aria-hidden="true">${c.emoji}</span>`}${c.label}</button>`).join('')}</nav>
  <nav class="subj" aria-label="Matière" style="margin-top:8px;">${vs.filter(x=>FINOT_CATS[curCat].ids.includes(x.id)).map(x=>`<button class="sbtn ${x.id===S.subj?'on':''}" data-a="subj:${x.id}" aria-pressed="${x.id===S.subj}">${x.img?`<img src="${x.img}" alt="" aria-hidden="true" style="width:20px;height:20px;object-fit:contain;vertical-align:-4px;margin-right:4px;">`:`<span aria-hidden="true">${x.emoji}</span>`}${x.name}</button>`).join('')}</nav>`
  :`<nav class="subj ${vs.length>8?'many':''}" aria-label="Matière">${vs.map(x=>`<button class="sbtn ${x.id===S.subj?'on':''}" data-a="subj:${x.id}" aria-pressed="${x.id===S.subj}">${x.img?`<img src="${x.img}" alt="" aria-hidden="true" style="width:20px;height:20px;object-fit:contain;vertical-align:-4px;margin-right:4px;">`:`<span aria-hidden="true">${x.emoji}</span>`}${x.name}</button>`).join('')}</nav>`}
  <button class="btn wide" data-a="courses:${WMAP[r.id].id}"><img src="data/images/icons/icon-cours.png" alt="" aria-hidden="true" style="width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:4px;"> Voir le cours de ${esc(curS().name)}</button>
  <h2 class="sec">${curS().img?`<img src="${curS().img}" alt="" aria-hidden="true" style="width:22px;height:22px;object-fit:contain;vertical-align:-5px;margin-right:4px;">`:curS().emoji+' '} ${curS().name} : choisis ton monde</h2>
  <div class="worlds">${[...WS()].sort((a,b)=>(a.lvl===S.grade?-1:0)-(b.lvl===S.grade?-1:0)).map(w=>{const wimg=FINOT_WORLD_IMG[w.id];return `<button class="world" data-a="world:${w.id}" style="--wc:${w.col}">${wimg?`<img src="${wimg}" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;"><span aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 30%,rgba(0,0,0,.65) 100%);z-index:0;"></span>`:''}<span class="we" aria-hidden="true" style="position:relative;z-index:1;">${w.emoji}</span><span class="wl" style="position:relative;z-index:1;">${w.lvl} ${w.lvl===S.grade?'<small class="grade-badge">Ta classe</small>':''}</span><span class="wn" style="position:relative;z-index:1;">${w.name}</span><span class="ws" style="position:relative;z-index:1;">★ ${worldStars(w.id)}/${WCH[w.id].length*3}</span></button>`;}).join('')}</div>`,
  progres:()=>`<h2 class="sec">Ma progression</h2>
  <button class="reco merit card ${rdy?'ready':''}" data-a="rewards"><span class="ri"><img src="data/images/icons/icon-medaille.png" alt="" aria-hidden="true" style="width:34px;height:34px;object-fit:contain;"></span><span><small>Mes bons points</small><b>${S.merit.pts}</b>${rdy?'<span class="rdy">Une récompense est disponible !</span>':nx?`<span class="muted">Prochaine : ${esc(nx.e)} ${esc(nx.n)} (${av}/${nx.c})</span>`:''}</span><span class="go">Voir</span></button>
  <button class="reco card" data-a="smartreview"><span class="ri"><img src="data/images/icons/icon-cerveau.png" alt="" aria-hidden="true" style="width:34px;height:34px;object-fit:contain;"></span><span><small>Révision intelligente</small><b>Travaille ce qui te fera le plus progresser</b><span class="muted">Basé sur tes erreurs récentes et ta classe ${S.grade}</span></span><span class="go">Réviser</span></button>
  <button class="reco card" data-a="badges"><span class="ri"><img src="data/images/icons/icon-trophee.png" alt="" aria-hidden="true" style="width:34px;height:34px;object-fit:contain;"></span><span><small>Mes badges</small><b>${S.badges.length}/${BADGES.length} débloqués</b><span class="muted">Continue à jouer pour tous les débloquer</span></span><span class="go">Voir</span></button>`,
  plus:()=>`<h2 class="sec">Plus</h2>
  <div class="tools"><button class="tool" data-a="flashmenu"><img src="data/images/icons/icon-eclair.png" alt="" aria-hidden="true" style="width:28px;height:28px;object-fit:contain;">Défi éclair</button><button class="tool" data-a="shop"><img src="data/images/icons/icon-boutique.png" alt="" aria-hidden="true" style="width:28px;height:28px;object-fit:contain;">Boutique</button><button class="tool" data-a="profiles"><img src="data/images/icons/icon-profils.png" alt="" aria-hidden="true" style="width:28px;height:28px;object-fit:contain;">Profils</button><button class="tool" data-a="parent"><img src="data/images/icons/icon-parents.png" alt="" aria-hidden="true" style="width:28px;height:28px;object-fit:contain;">Parents</button></div>`
 };
 app.innerHTML=header+`<div class="hometab-body">${(tabs[HOMETAB]||tabs.accueil)()}</div>`;}

let DELPEND=null;
function profilesScreen(){CUR='profiles';PARENT=false;const ps=profileList();app.innerHTML=`${bar('👧👦 Profils enfants')}<div class="card"><b>Un espace séparé pour chaque enfant</b><p class="muted small">Progression, étoiles, cours terminés, bons points, boutique et suivi sont indépendants. Le code parent et la liste des récompenses sont repris lors de la création d’un nouveau profil.</p></div><h2 class="sec">Choisir un profil</h2><div class="profiles-grid">${ps.map(([id,p])=>`<div class="pcard ${id===ACTIVE?'on':''}"><div class="pav">${p.avatar}</div><div><div class="pn">${esc(p.name||'Profil sans nom')}</div><div class="pm">${profileSummary(p)}</div><select class="fld profile-grade" data-profile-grade="${id}" aria-label="Classe de ${esc(p.name||'ce profil')}">${gradeOptions(p.grade)}</select></div>${DELPEND===id?`<div class="pactions pdel-confirm"><label class="sr-only" for="pdelpin">Code parent pour confirmer la suppression de ${esc(p.name||'ce profil')}</label><input id="pdelpin" class="fld" inputmode="numeric" maxlength="8" placeholder="Code parent" autocomplete="off"><button class="btn primary sm2" data-a="pdelok:${id}">Confirmer</button><button class="btn ghost sm2" data-a="pdelcancel">Annuler</button></div>`:`<div class="pactions"><button class="btn ${id===ACTIVE?'primary':''} sm2" data-a="pswitch:${id}">${id===ACTIVE?'✓ Actif':'Ouvrir'}</button>${ps.length>1?`<button class="btn ghost sm2" data-a="pdel:${id}" aria-label="Supprimer le profil ${esc(p.name||'')}">🗑️</button>`:''}</div>`}</div>`).join('')}<button class="pnew" data-a="pnew"><span style="font-size:36px">➕</span><b>Ajouter un enfant</b><span class="muted small">Nouveau profil vierge</span></button></div><p class="perf-note">Les données restent sur cet appareil et sont enregistrées séparément pour chaque profil.</p>`;if(DELPEND)$('#pdelpin')?.focus();}
function profileStrip(){return `<div class="profile-strip" aria-label="Profils enfants">${profileList().map(([id,p])=>`<button class="profile-chip ${id===ACTIVE?'on':''}" data-a="ppswitch:${id}">${p.avatar} ${esc(p.name||'Profil')}</button>`).join('')}</div>`;} 

function worldScreen(id){CUR='';const w=WALL.find(x=>x.id===id);S.subj=sOf(id).id;const isLang=/^(en|it)/.test(id)||!!sOf(id).lang;app.innerHTML=`${bar(w.emoji+' '+w.name)}<p class="muted center">${sOf(id).name}, programme de ${w.lvl} : ${WCH[id].length} chapitres, 3 étoiles à gagner dans chacun.</p>
 ${isLang?`<button class="reco card" data-a="lexicon:${id}"><span class="ri">📚</span><span><small>Vocabulaire</small><b>Lexique illustré</b><span class="muted">Images, traduction, écoute et mini-quiz</span></span><span class="go">Ouvrir</span></button>`:''}
 <div class="chaps" style="--wc:${w.col}">${WCH[id].map(c=>{const s=S.chap[c.id];const rd=S.lessons[c.id];return `<div class="chap"><span class="ci">${c.icon}</span><span class="cn">${c.tag?`<small class="ctag t${c.tag}">${TAGS[c.tag]}</small>`:''}${c.name}</span>${starStr(s?.stars||0)}<span class="cp muted">${s&&s.tot?Math.round(s.ok/s.tot*100)+' % réussi':'Nouveau'}<br>${masteryHTML(c.id)}${MQAdaptive.isDue(S,c.id)?'<br><span class="due">🔁 Révision due</span>':''}</span><div class="cbtn"><button class="btn sm2 ${rd?'':'hi'}" data-a="lesson:${c.id}">${rd?'✅':'📖'} Cours</button><button class="btn primary sm2" data-a="chap:${c.id}">🎮 Jouer</button></div></div>`;}).join('')}</div>`;}

function fiche(id){const c=byId(id),f=c.f,wimg=FINOT_WORLD_IMG[WMAP[id].id];app.innerHTML=`${bar(c.icon+' '+c.name)}${wimg?`<div class="lesson-banner"><img src="${wimg}" alt="" aria-hidden="true"></div>`:''}<div class="card fiche pop"><div class="fh">📘 Rappel express</div><h2>${f.t}</h2><ul>${f.l.map(x=>`<li>${x}</li>`).join('')}</ul><div class="ex"><b>Exemple</b><br>${f.ex}</div></div>
 ${!S.lessons[id]?`<button class="reco card" data-a="lesson:${id}"><span class="ri">📖</span><span><small>Nouveau chapitre ?</small><b>Commence par le cours</b><span class="muted">Explications, exemple, mini-quiz</span></span><span class="go">Lire</span></button>`:''}<button class="btn primary big" data-a="start:${id}">C’est parti ! 8 questions</button><button class="btn wide" data-a="lesson:${id}">📖 Revoir le cours complet</button><button class="btn ghost wide" data-a="world:${WMAP[id].id}">Retour au monde</button>`;}

/* ===== Mission ===== */
const mult=()=>Math.min(4,1+Math.floor(M.streak/3));
function startMission(ids){const cid=ids[0],d=MQAdaptive.difficulty(S,cid);M={ids,n:8,i:0,ok:0,xp:0,coins:0,streak:0,d,L0:lvl(S.xp),newB:[],flash:false,wrong:0,lastOk:null};nextQ();}
function startFlash(w){const ids=(w==='all'?SCH(S.subj):WCH[w]).map(c=>c.id);M={ids,n:1e9,i:0,ok:0,xp:0,coins:0,streak:0,d:1,L0:lvl(S.xp),newB:[],flash:true,w,end:Date.now()+60000};
 M.tick=setInterval(()=>{if(!M||!M.flash)return;const left=M.end-Date.now(),b=$('#tbar'),t=$('#tleft');if(b)b.style.width=Math.max(0,left/600)+'%';if(t)t.textContent=Math.ceil(Math.max(0,left)/1000)+' s';if(left<=0)endFlash();},100);nextQ();}
function nextQ(){if(M.flash&&Date.now()>=M.end)return endFlash();if(!M.flash&&M.i>=M.n)return endMission();const c=byId(M.ids[Math.floor(Math.random()*M.ids.length)]);M.cid=c.id;M.q=c.g(M.d);M.hint=false;M.locked=false;M.qt=Date.now();renderQ();}
function ordLine(q){return q._sel.length?q._sel.map(i=>`<span class="otw">${q.tokens[i]}</span>`).join(' '):'<span class="muted">Touche les mots dans le bon ordre</span>';}
function refreshOrd(q){const l=$('#ordline');if(l)l.innerHTML=ordLine(q);document.querySelectorAll('.otok').forEach(b=>b.disabled=q._sel.includes(+b.dataset.a.split(':')[1]));}
const curQ=()=>(M&&M.q)||(L&&(L.steps[L.i]&&L.steps[L.i].k==='practice'?L.pq:L.q))||null,qLocked=()=>M?M.locked:L?L.locked:true;
function audioHTML(q){if(!q.audio)return '';const l=String(q.audio.l||'fr').slice(0,2);const av=TTS.ok&&window.MQAudio&&MQAudio.pickVoice(l).status!=='unavailable';return av?`<div class="listenrow"><button class="listen" data-a="qlisten">🎧 Écouter</button><button class="listen slow" data-a="qlistenslow" aria-label="Écouter lentement">🐢 Lentement</button></div>`:`<div class="qtext" lang="${l}">${esc(q.audio.t)}</div>${TTS.ok?`<p class="muted small">Aucune voix ${({fr:'française',en:'anglaise',it:'italienne'})[l]||''} n’est installée sur cet appareil : le texte est affiché à la place.</p>`:''}`;}
function inputHTML(q,pa='pick'){if(q.type==='order'){q._sel=q._sel||[];return `<div class="ans ord"><div class="ordline" id="ordline">${ordLine(q)}</div><div class="ordbank">${q.tokens.map((t,i)=>`<button class="otok" data-a="otok:${i}" ${q._sel.includes(i)?'disabled':''}>${t}</button>`).join('')}</div><div class="chips"><button class="chip" data-a="oundo" tabindex="-1">↶ Retirer le dernier choix</button></div></div>`;}
 if(q.type==='choice')return `<div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-a="${pa}:${i}"><kbd>${i+1}</kbd>${c}</button>`).join('')}</div>`;
 const chips=Array.isArray(q.chips)?q.chips:q.type==='text'&&q.lang==='fr'?[]:q.type==='text'&&q.lang==='it'?['à','è','é','ì','ò','ù',"'"]:q.type==='text'&&q.lang==='en'?["'"]:{num:['−',','],frac:['/','−'],text:['x','+','−'],multi:['−',',']}[q.type];
 const ins=q.type==='multi'?q.labels.map((l,i)=>`<label class="ml"><span>${l}</span><input id="in${i}" class="big" autocomplete="off" inputmode="decimal"></label>`).join(''):
  `<div class="inrow"><input id="in0" class="big" autocomplete="off" inputmode="${q.type==='num'?'decimal':'text'}" ${q.lang?'autocapitalize="off" spellcheck="false"':''} placeholder="${(q.lang&&q.type==='text'?'Écris ta réponse':{num:'Ta réponse',frac:'ex : 3/4',text:'ex : 5x+2'}[q.type])}">${q.unit?`<span class="unit">${q.unit}</span>`:''}</div>`;
 return `<div class="ans">${ins}<div class="chips">${chips.map(c=>`<button class="chip" data-a="chip:${c}" tabindex="-1">${c}</button>`).join('')}</div></div>`;}
function renderQ(){const q=M.q,c=byId(M.cid);
 const top=M.flash?`<div class="qtop"><button class="btn ghost sm" data-a="quit" aria-label="Quitter">✕</button><div class="prog t"><i id="tbar" style="width:${Math.max(0,(M.end-Date.now())/600)}%"></i></div><span class="pill" id="tleft">${Math.ceil((M.end-Date.now())/1000)} s</span><span class="pill">✅ ${M.ok}</span></div>`
  :`<div class="qtop"><button class="btn ghost sm" data-a="quit" aria-label="Quitter">✕</button><div class="prog"><i style="width:${M.i/M.n*100}%"></i></div><span class="combo ${M.streak>=3?'hot':''}">🔥 ×${mult()}</span></div>`;
 app.innerHTML=`${top}<div class="qcard card slide"><div class="qtag">${c.icon} ${c.name}<span>${TTS.ok&&!M.flash?'<button class="spk" data-a="ttsq" aria-label="Écouter la question">🔊</button>':''}<span title="Difficulté">${'⚡'.repeat(M.d)}</span></span></div><div class="qtext">${q.q}</div>${audioHTML(q)}${q.svg||''}${inputHTML(q)}<div id="fb" aria-live="polite" role="status"></div>
  <div class="qbtns">${M.flash?'':'<button class="btn ghost" data-a="hint">💡 Indice</button><button class="btn ghost" data-a="padtoggle">✏️ Brouillon</button>'}${q.type!=='choice'?'<button class="btn primary" data-a="valid">Valider</button>':''}</div></div>`;
 padReset(q.q);if(M.flash)padClose();if(q.audio&&TTS.ok)setTimeout(()=>{if(M&&M.q===q&&!M.locked)ttsSay(q.audio);},350);const f=$('#in0');if(f&&!PAD.open)f.focus();lastIn=f;}
function markOrd(ok){const l=$('#ordline');if(l)l.classList.add(ok?'good':'bad');document.querySelectorAll('.otok,[data-a="oundo"]').forEach(b=>b.disabled=true);}
function insertChip(ch){const el=lastIn||$('#in0');if(!el||el.disabled)return;const v=ch==='−'?'-':ch;const s=el.selectionStart??el.value.length,e=el.selectionEnd??el.value.length;el.setRangeText(v,s,e,'end');el.focus();}
function showHint(){if(!M||M.locked)return;M.hint=true;$('#fb').innerHTML=`<div class="fb tip"><img src="${FINOT_IMG.indice}" alt="" aria-hidden="true" class="finot-live" style="float:left;width:36px;height:36px;border-radius:50%;margin:0 8px 4px 0;object-fit:cover;object-position:50% 35%;">💡 ${M.q.hint||'Relis bien la question.'}<small>Indice utilisé : XP divisés par 2 pour cette question.</small></div>`;}
function validate(pick){if(!M||M.locked)return;const q=M.q;let v;
 if(q.type==='choice')v=pick;
 else if(q.type==='order'){if(q._sel.length<q.tokens.length)return shake();v=q._sel.map(i=>q.tokens[i]).join(' ');}
 else if(q.type==='multi'){v=q.labels.map((_,i)=>$('#in'+i).value);if(v.some(x=>!x.trim()))return shake();}
 else{v=$('#in0').value;if(!v.trim())return shake();}
 let ok=check(q,v);M.your=yourAnswer(q,v);M.dict=null;
 // V8.13 : dictée analysée mot à mot (score pédagogique) au lieu d'un simple juste/faux.
 if(isDictation(q)){M.dict=MQDictation.best(q.acc,v);ok=MQDictation.outcome(M.dict).ok;}
 if(q.type==='choice')document.querySelectorAll('.choice').forEach((b,i)=>{b.disabled=true;if(i===q.ans)b.classList.add('good');else if(i===pick)b.classList.add('bad');});
 else document.querySelectorAll('.ans input').forEach(x=>{x.disabled=true;x.classList.add(ok?'good':'bad');});
 markOrd(ok);result(ok);}
function result(ok){M.locked=true;const cs=S.chap[M.cid]||(S.chap[M.cid]={stars:0,ok:0,tot:0});S.time+=Math.min(120,(Date.now()-M.qt)/1000);S.totalQ++;cs.tot++;const rh=S.recent[M.cid]||(S.recent[M.cid]=[]);rh.push(ok?1:0);if(rh.length>20)rh.shift();touchDaily();if(ok)resolveIfConsolidated(M.cid);else{M.wrong=(M.wrong||0)+1;MQAdaptive.recordMistake(S,M.cid,{q:plainText(M.q.q),answer:plainText(answerText(M.q)),expl:plainText(M.q.expl||'')});}
 if(ok&&M.dict&&!M.dict.perfect)MQAdaptive.recordMistake(S,M.cid,dictMistake(M.q,M.dict));MQAdaptive.recordAnswer(S,M.cid,ok,{source:'practice'});M.lastOk=ok;
 const qb=$('.qbtns');if(qb)qb.remove();
 if(ok){M.ok++;M.streak++;S.totalOk++;cs.ok++;S.daily.ok++;{const nivAvant=finotNiveau(S).nom;touchStreak();const niv=finotNiveau(S);
  if(niv.nom!==nivAvant){const ami=FINOT_AMIS.find(a=>a.seuil===S.streak.best);
   setTimeout(()=>ami?finotCeleb(ami.img,'Nouvel ami !',`${ami.nom} rejoint votre bande 🎉`):finotCeleb('data/images/finot/ui-celeb-lien.png','Nouveau lien avec Finot !',niv.nom),700);}}
  addMerit(S.merit.rules.ok);S.bestCombo=Math.max(S.bestCombo,M.streak);
  const g=M.flash?5:Math.round(10*M.d*mult()*(M.hint?.5:1)),c=M.flash?1:1+(M.streak%3===0?1:0);M.xp+=g;S.xp+=g;M.coins+=c;S.coins+=c;
  {const od=M.d;M.d=M.flash?Math.min(2,MQAdaptive.nextDifficulty(M.d,true,M.streak)):MQAdaptive.nextDifficulty(M.d,true,M.streak);if(od!==M.d)S.adaptive.adaptations=(S.adaptive.adaptations||0)+1;}sfx('ok');confetti(M.flash?8:18);
  $('#fb').innerHTML=`<div class="fb good pop"><img src="${FINOT_IMG.victoire}" alt="" aria-hidden="true" class="finot-live" style="float:left;width:36px;height:36px;border-radius:50%;margin:0 8px 4px 0;object-fit:cover;object-position:50% 35%;"><b>${PRAISE[Math.floor(Math.random()*PRAISE.length)]}</b> +${g} XP${S.merit.rules.ok?` +${S.merit.rules.ok} 🎖️`:''}${M.streak>=3?` <span class="hot">Combo ×${mult()} 🔥</span>`:''}</div>`;
  if(!S.daily.done&&S.daily.ok>=(S.dailyGoal||DEFAULT_GOAL)){S.daily.done=true;S.coins+=30;S.goalsDone++;addMerit(S.merit.rules.goal,'Objectif du jour 🎁');sfx('coin');toast('🎁 Objectif du jour atteint ! +30 🪙');}
  if(M.dict&&!M.dict.perfect){$('#fb .fb').insertAdjacentHTML('beforeend',`${MQDictation.feedbackHTML(M.dict,{young:dictYoung()})}<button class="btn primary wide" data-a="next">Exercice suivant</button>`);const b=$('[data-a="next"]');if(b)b.focus();}
  else M.tid=setTimeout(advance,M.flash?400:1100);}
 else{M.streak=0;{const od=M.d;M.d=MQAdaptive.nextDifficulty(M.d,false,0);if(od!==M.d)S.adaptive.adaptations=(S.adaptive.adaptations||0)+1;}sfx('bad');
  $('#fb').innerHTML=`<div class="fb bad pop"><img src="${FINOT_IMG.encouragement}" alt="" aria-hidden="true" class="finot-live" style="float:left;width:36px;height:36px;border-radius:50%;margin:0 8px 4px 0;object-fit:cover;object-position:50% 35%;"><b>Presque !</b>${M.dict?MQDictation.feedbackHTML(M.dict,{young:dictYoung()}):`${M.flash?'':notThis(M.cid,M.your)} Bonne réponse : <b>${answerText(M.q)}</b>${M.q.expl&&!M.flash?`<div class="expl">${M.q.expl}</div>`:''}`}${M.flash?'':`<div class="coach-feedback"><b>👩‍🏫 Ton prof particulier</b><br>${coachFor(M.cid,false)}<br><small>La difficulté vient d’être recalée à ${M.d}/3.</small></div><button class="btn primary wide" data-a="next">J’ai compris · exercice suivant</button>`}</div>`;
  if(M.flash)M.tid=setTimeout(advance,1600);else{const b=$('[data-a="next"]');if(b)b.focus();}}
 save();checkBadges(M);}
/* Prof particulier : messages adaptés à l'âge au primaire, moteur historique au collège. */
function coachFor(id,ok){const c=COURS[id]||{},ch=CHMAP[id]||{},mist=(S.mistakes[id]||[]).filter(x=>!x.seen).length;
 // Primaire et chapitres collège reconstruits : prof adapté à l'âge, avec l'astuce et la méthode propres à la notion.
 if(isPrimaryCh(id)||c.structured){const g=stageOf(S.grade)==='primaire'?S.grade:(c.grade||S.grade);
  return MQPrimary.coach({grade:g,mastery:MQAdaptive.mastery(S,id),tip:c.tip||ch.tip,method:c.method,mistakes:mist,due:MQAdaptive.isDue(S,id)},ok);}
 // Collège historique : message adaptatif + rappel précis de la notion (jamais une explication purement générique).
 const base=MQAdaptive.coachTip(S,id,ok),key=plainText((c.retenir||[])[0]||(ch.f&&ch.f.l&&ch.f.l[0])||'');
 return ok?base:`${base}${key?` <br><b>Rappel — ${esc(ch.name||'')} :</b> ${esc(key)}`:''}${mist>2?' Tu as plusieurs erreurs sur ce chapitre : relis la carte mémoire du cours.':''}`;}
// Une erreur du carnet n'est marquée « retravaillée » qu'après 3 bonnes réponses d'affilée sur le chapitre.
function resolveIfConsolidated(id){const r=S.recent[id]||[];if(r.length>=3&&r.slice(-3).every(Boolean))MQAdaptive.resolveMistake(S,id);}
/* Dictée : question écrite en français avec audio, réponse = phrase (ou q.dictation explicite). */
function isDictation(q){return !!(window.MQDictation&&q&&q.type==='text'&&(q.dictation||(q.audio&&String(q.audio.l||'').startsWith('fr')&&Array.isArray(q.acc)&&q.acc.some(a=>/\s/.test(String(a).trim())))));}
const dictYoung=()=>!!(window.MQPrimary&&MQPrimary.young(S.grade));
function dictMistake(q,d){return {q:`Dictée (${d.score} %) : ${d.reference}`,answer:d.reference,expl:d.errors.slice(0,6).map(e=>e.type==='missing'?`mot oublié « ${e.ref} »`:e.type==='extra'?`mot en trop « ${e.got} »`:e.type==='ponctuation'?`ponctuation « ${e.ref||e.got} »`:`${MQDictation.LABEL[e.type]} : ${e.got} → ${e.ref}`).join(' ; ')};}
const yourAnswer=(q,v)=>q.type==='choice'?plainText(q.choices[v]):Array.isArray(v)?v.join(' ; '):String(v);
const notThis=(id,your)=>isPrimaryCh(id)&&your?`<div class="notthis">Ce n’est pas <b>${esc(your)}</b>.</div>`:'';
function advance(){if(!M||!M.locked)return;clearTimeout(M.tid);M.i++;nextQ();}
function pauseCard(){if(Date.now()-T0<20*60000)return '';T0=Date.now();return `<div class="pause">🧠 <b>Pause cerveau !</b> 20 minutes d’apprentissage, bravo. ${PAUSES[Math.floor(Math.random()*PAUSES.length)]}, puis reviens quand tu es prêt.</div>`;}
function nextChap(id){const a=SCH(sOf(WMAP[id].id).id),i=a.findIndex(c=>c.id===id);return a[i+1]||null;}
function endMission(){const m=M;M=null;padClose();const st=m.ok>=8?3:m.ok>=6?2:m.ok>=4?1:0,cid=m.ids[0],cs=S.chap[cid]||(S.chap[cid]={stars:0,ok:0,tot:0});cs.stars=Math.max(cs.stars,st);if(st>=2)addMerit(S.merit.rules.mission,'Mission réussie : '+byId(cid).name,m);if(st===3)addMerit(S.merit.rules.perfect,'Sans faute : '+byId(cid).name,m);
 const bx=st*20,bc=st*5;S.xp+=bx;S.coins+=bc;S.missions++;const ar=MQAdaptive.practiceResult(S,cid);save();checkBadges(m);const L=lvl(S.xp),up=L>m.L0,nx=nextChap(cid);
 if(up)sfx('lvl');if(st>=2)confetti(45);
 const msg=['On recommence ? Tu vas y arriver 💪','Pas mal, continue !','Très bien !','Sans faute !'][st];
 app.innerHTML=`<div class="end card pop">${up?`<div class="lvlup">🎉 Niveau ${L} ! <small>${title(L)}</small></div>`:''}
  ${st>=2?`<img src="${FINOT_IMG.bravo}" alt="" aria-hidden="true" class="finot-live" style="width:72px;height:72px;border-radius:50%;object-fit:cover;object-position:50% 35%;display:block;margin:0 auto 4px;">`:''}
  <div class="bigstars">${[1,2,3].map(i=>`<span class="${i<=st?'on':''}" style="animation-delay:${i*.18}s">★</span>`).join('')}</div>
  <h1>${m.ok}/${m.n}</h1><p class="lead">${msg}</p><div class="adaptive-card"><b>🧠 Maîtrise du chapitre : ${ar.mastery}%</b><p class="muted small">${MQAdaptive.masteryLabel(ar.mastery).e} ${MQAdaptive.masteryLabel(ar.mastery).t} · prochaine révision ${MQAdaptive.dueInText(S,cid)} · ${m.wrong||0} erreur${(m.wrong||0)>1?'s':''} analysée${(m.wrong||0)>1?'s':''}</p></div><div class="gains"><span>+${m.xp+bx} XP</span><span>+${m.coins+bc} 🪙</span>${m.mg?`<span>+${m.mg} 🎖️</span>`:''}</div>
  ${m.newB.length?`<div class="nb">🏆 ${m.newB.map(b=>b[1]+' '+b[2]).join(', ')}</div>`:''}${pauseCard()}
  <div class="col"><button class="btn primary big" data-a="start:${cid}">🔁 Rejouer</button>${nx?`<button class="btn big" data-a="chap:${nx.id}">${nx.icon} Suivant : ${nx.name}</button>`:''}<button class="btn ghost wide" data-a="world:${WMAP[cid].id}">🗺️ Retour au monde</button></div></div>`;}
function flashMenu(){app.innerHTML=`${bar('⚡ Défi éclair')}<div class="card center"><p class="lead">60 secondes. Un maximum de bonnes réponses.</p><p class="muted">Ton record : <b>${S.flashBest}</b></p></div>
 <div class="worlds">${WS().map(w=>`<button class="world" data-a="flash:${w.id}" style="--wc:${w.col}"><span class="we">${w.emoji}</span><span class="wl">${w.lvl}</span><span class="wn">${w.name}</span></button>`).join('')}</div>
 <button class="btn primary big" data-a="flash:all">🎲 Tout le programme</button>`;}
function endFlash(){if(!M)return;padClose();const m=M;clearInterval(m.tick);clearTimeout(m.tid);M=null;const rec=m.ok>S.flashBest;if(rec)S.flashBest=m.ok;S.missions++;save();checkBadges(m);
 const L=lvl(S.xp),up=L>m.L0;if(rec||up){sfx('lvl');confetti(45);}
 app.innerHTML=`<div class="end card pop">${up?`<div class="lvlup">🎉 Niveau ${L} ! <small>${title(L)}</small></div>`:''}<div class="bigicon">⚡</div><h1>${m.ok} bonne${m.ok>1?'s':''} réponse${m.ok>1?'s':''}</h1>
  <p class="lead">${rec?'🏆 Nouveau record !':`Record à battre : ${S.flashBest}`}</p><div class="gains"><span>+${m.xp} XP</span><span>+${m.coins} 🪙</span>${m.mg?`<span>+${m.mg} 🎖️</span>`:''}</div>${pauseCard()}
  <div class="col"><button class="btn primary big" data-a="flash:${m.w}">🔁 Rejouer</button><button class="btn ghost wide" data-a="home">🏠 Accueil</button></div></div>`;}


