/* Finot Académie — couche pédagogique 3 niveaux + Finot accessible aux jeunes élèves. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
const LEVELS={
 1:{name:'Facile',emoji:'🌱',desc:'Explications courtes, guidage renforcé et exercices accessibles.'},
 2:{name:'Moyen',emoji:'🎯',desc:'Cours complet, méthode et exercices de difficulté normale.'},
 3:{name:'Difficile',emoji:'🚀',desc:'Approfondissement, justification, transfert et exercices exigeants.'}
};
const clean=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ').trim();
const hesc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function chapterFacts(id,n=4){
 const ch=typeof byId==='function'?byId(id):null,c=typeof COURS!=='undefined'?COURS[id]:null,out=[];
 const add=x=>{const t=clean(x);if(t&&t.length>2&&!out.some(y=>y.toLowerCase()===t.toLowerCase()))out.push(t);};
 (c?.retenir||[]).forEach(add);(ch?.f?.l||[]).forEach(add);(c?.objectives||[]).forEach(add);
 if(!out.length&&ch?.f?.ex)add(ch.f.ex);return out.slice(0,n);
}
function chapterMethod(id){const c=COURS[id]||{},m=c.method||[];if(Array.isArray(m)&&m.length)return clean(m[0]);const ch=byId(id);return clean(c.tip||ch?.tip||'Lis la consigne, avance étape par étape, puis vérifie ta réponse.');}
function subjectId(id){try{return sOf(WMAP[id].id).id;}catch(e){return '';}}
function easyScaffold(id){const facts=chapterFacts(id,3),method=chapterMethod(id);return {k:'mqeasy',t:'🌱 La version simple',h:`<div class="mq-level-note easy"><b>On commence par l’essentiel</b><p>Tu n’as pas besoin de tout retenir d’un coup. Comprends ces quelques idées, puis entraîne-toi.</p>${facts.length?`<ul>${facts.map(x=>`<li>${hesc(x)}</li>`).join('')}</ul>`:''}<div class="mq-mini-method"><b>Mon premier réflexe</b><br>${hesc(method)}</div></div>`};}
function hardChallenge(id){const sid=subjectId(id),name=hesc(byId(id)?.name||'ce chapitre');let prompts;
 if(/math/.test(sid))prompts=['Explique pourquoi la méthode fonctionne, sans réciter la règle.','Trouve une autre façon de vérifier ton résultat.','Invente un exemple plus difficile qui utilise la même idée.'];
 else if(/francais/.test(sid))prompts=['Justifie ta réponse avec un indice précis du texte ou de la phrase.','Invente un exemple correct puis un contre-exemple.','Explique à quoi sert la notion, pas seulement son nom.'];
 else if(/anglais|italien/.test(sid))prompts=['Produis une phrase nouvelle sans copier le modèle.','Explique la règle avec tes mots, puis transforme la phrase.','Réutilise le vocabulaire dans une situation différente.'];
 else if(/svt|pc|tech|ia|pix/.test(sid))prompts=['Formule une hypothèse avant de regarder la réponse.','Explique le mécanisme ou la cause avec un vocabulaire précis.','Applique l’idée à une situation que le cours ne donne pas directement.'];
 else if(/hg|emc|emi|orientation/.test(sid))prompts=['Relie une cause à une conséquence.','Justifie avec un fait, un repère, une règle ou un document précis.','Compare deux points de vue ou deux situations.'];
 else prompts=['Explique la notion comme si tu l’enseignais à quelqu’un.','Donne un exemple personnel ou nouveau.','Trouve une erreur fréquente et explique comment l’éviter.'];
 return {k:'mqhard',t:'🚀 Défi approfondissement',h:`<div class="mq-level-note hard"><b>Pour aller plus loin : ${name}</b><ol>${prompts.map(x=>`<li>${hesc(x)}</li>`).join('')}</ol><p class="muted small">Tu n’as pas besoin d’écrire toutes les réponses : les expliquer à voix haute suffit déjà à vérifier si tu maîtrises vraiment.</p></div>`};}
function adaptSteps(id,steps,level){
 const src=steps.slice();if(level===2)return src;
 if(level===1){let part=0,ex=0;const out=[];for(const s of src){
   if(s.k==='profile'||s.k==='why'||s.k==='check')continue;
   if(s.k==='part'&&++part>1)continue;if(s.k==='ex'&&++ex>1)continue;
   out.push(s);if(out.length===1)out.push(easyScaffold(id));
  }
  if(!out.some(x=>x.k==='mqeasy'))out.unshift(easyScaffold(id));return out;
 }
 const out=src.slice(),i=out.findIndex(x=>x.k==='practice'||x.k==='confidence'||x.k==='quiz');out.splice(i<0?Math.max(0,out.length-1):i,0,hardChallenge(id));return out;
}
function levelPicker(id,kind){
 const ch=byId(id);if(!ch)return;const adaptive=kind==='lesson'?MQAdaptive.lessonDifficulty(S,id):MQAdaptive.difficulty(S,id),title=kind==='lesson'?'Choisis ton niveau de cours':'Choisis ton niveau d’exercice';
 CUR='level';app.innerHTML=`${bar(ch.icon+' '+ch.name)}<div class="card mq-level-picker"><h2>${title}</h2><p class="muted">Tu peux changer de niveau à chaque fois. Finot te conseille <b>${LEVELS[adaptive].emoji} ${LEVELS[adaptive].name}</b> d’après ta progression.</p><div class="mq-level-grid">${[1,2,3].map(d=>`<button class="mq-level-card l${d}" data-a="${kind==='lesson'?'lessonlevel':'startlevel'}:${id}|${d}"><span class="mq-level-emoji">${LEVELS[d].emoji}</span><b>${LEVELS[d].name}</b><span>${LEVELS[d].desc}</span>${adaptive===d?'<small>⭐ Conseillé pour toi</small>':''}</button>`).join('')}</div>${kind==='lesson'?'':seriesLenPicker()}<p class="muted small center">Le parcours du jour reste adaptatif automatiquement : ici, c’est toi qui choisis.</p></div><button class="btn ghost wide" data-a="chap:${id}">← Retour au chapitre</button>`;
}
function openLessonAtLevel(id,level){level=Math.max(1,Math.min(3,+level||2));openLesson(id,'full');if(!L)return;L.lessonLevel=level;L.quizDifficulty=level;L.quizStreak=0;L.i=0;L.q=null;L.pq=null;L.qn=0;L.pn=0;L.locked=false;L.steps=adaptSteps(id,L.steps,level);renderLesson();}
// Niveau imposé : passe par startMission (suivi d'activité, « étudié aujourd'hui », abonnés mission:start), niveau fixe toute la série.
function startMissionAtLevel(id,level){if(!byId(id))return;startMission([id],{level:Math.max(1,Math.min(3,+level||2)),n:seriesLen()});}
// Longueur de la série choisie par l'enfant (22/10/2026) : 8 par défaut, 12 ou 20 pour s'entraîner plus longtemps. Mémorisée par profil.
const SERIES_LENS=[[8,'Courte','⚡'],[12,'Normale','🎯'],[20,'Longue','🏋️']];
function seriesLen(){const n=+S.seriesLen;return SERIES_LENS.some(x=>x[0]===n)?n:8;}
function seriesLenPicker(){const cur=seriesLen();return `<div class="mq-series-len" role="group" aria-label="Longueur de la série"><span>Longueur de la série</span><div>${SERIES_LENS.map(([n,l,e])=>`<button type="button" class="mq-len-opt${n===cur?' on':''}" data-a="serieslen:${n}" aria-pressed="${n===cur}"><span aria-hidden="true">${e}</span> ${l} <b>${n}</b></button>`).join('')}</div></div>`;}
function levelBadge(){if(!L||!L.lessonLevel)return;const card=document.querySelector('.lcard .lhead');if(!card||card.querySelector('.mq-level-badge'))return;const d=L.lessonLevel,x=document.createElement('span');x.className='mq-level-badge l'+d;x.textContent=LEVELS[d].emoji+' '+LEVELS[d].name;card.appendChild(x);}
MQHooks.on('lesson:rendered',()=>levelBadge(),{id:'pedagogy-level-badge'});

// ---------- Finot : interaction sans clavier, pensée pour CP/CE1 ----------
let FINOT_REC=null;
function currentQ(){try{if(M?.q)return M.q;if(L){const k=L.steps?.[L.i]?.k;if(k==='practice')return L.pq;if(k==='quiz')return L.q;if(k==='readq')return L.rq;} }catch(e){}return null;}
function finotSay(html){finotChatEnsure();finotPush('finot',html);finotChipsRender();}
function finotSimpleHelp(){const id=finotCurrentChapterId();if(!id)return finotSay('Choisis d’abord une leçon ou un exercice. Ensuite je pourrai t’aider pas à pas.');const f=chapterFacts(id,3),m=chapterMethod(id);finotSay(`<b>On fait simple.</b>${f.length?`<br>À retenir :<ul>${f.map(x=>`<li>${hesc(x)}</li>`).join('')}</ul>`:''}<b>Premier réflexe :</b> ${hesc(m)}`);}
function finotHint(){const q=currentQ();if(!q)return finotSimpleHelp();let h=clean(q.hint||q.explanation||q.expl||'');if(!h&&L?.rq&&window.MQReading)try{h=clean(MQReading.hintText(L.rq,L.rhints||0));}catch(e){}finotSay(h?`💡 <b>Indice :</b> ${hesc(h)}`:'💡 Regarde d’abord ce que la question demande, puis cherche une seule information utile dans le cours.');}
function finotRead(){try{const q=currentQ();if(q&&typeof ttsSay==='function'){ttsSay({t:clean(q.q||q.prompt||''),l:'fr-FR'});return finotSay('🔊 Je viens de lire la question. Tu peux l’écouter autant de fois que tu veux.');}if(L&&typeof ACT.ttsplay==='function'){ACT.ttsplay();return finotSay('🔊 Je te lis cette partie du cours.');}}catch(e){}finotSay('Le lecteur vocal n’est pas disponible ici pour le moment.');}
function finotVoice(){const R=window.MQSpeechCapability?MQSpeechCapability.Recognition():(window.SpeechRecognition||window.webkitSpeechRecognition);if(!R)return finotSay('🎤 Le micro n’est pas disponible dans ce navigateur. Tu peux toucher un des gros boutons à la place.');try{if(FINOT_REC)FINOT_REC.abort();const r=new R();FINOT_REC=r;r.lang='fr-FR';r.interimResults=false;r.maxAlternatives=1;finotSay('🎤 Je t’écoute. Dis ta question simplement.');r.onresult=e=>{const t=e.results?.[0]?.[0]?.transcript||'';FINOT_REC=null;if(t){const input=document.getElementById('finotin');if(input)input.value=t;finotAsk(t);}};r.onerror=()=>{FINOT_REC=null;finotSay('Je n’ai pas bien entendu. Tu peux réessayer ou toucher un bouton.');};r.onend=()=>{if(FINOT_REC===r)FINOT_REC=null;};r.start();}catch(e){FINOT_REC=null;finotSay('Je n’arrive pas à démarrer le micro. Utilise les boutons juste au-dessus.');}}
function finotOpenEasyCourse(){const id=finotCurrentChapterId();if(!id)return finotSimpleHelp();finotClose();openLessonAtLevel(id,1);}
function finotOpenEasyEx(){const id=finotCurrentChapterId();if(!id)return finotSimpleHelp();finotClose();startMissionAtLevel(id,1);}
function finotYoung(){return ['CP','CE1','CE2'].includes(String(S?.grade||'').toUpperCase());}
MQHooks.on('finot:chip-list',(_,{inChapter})=>{const chips=[];
 if(inChapter){chips.push('<button class="fch-chip kid" data-a="finotsimple">🧩 Explique-moi simplement</button>','<button class="fch-chip kid" data-a="finothint2">💡 Donne-moi un indice</button>','<button class="fch-chip kid" data-a="finotread2">🔊 Lis-moi</button>','<button class="fch-chip kid" data-a="finoteasycourse">🌱 Cours facile</button>','<button class="fch-chip kid" data-a="finoteasyex">🎯 Exercice facile</button>');}
 else chips.push('<button class="fch-chip kid" data-a="path">🗺️ Mon parcours</button>','<button class="fch-chip kid" data-a="library">📚 Lire une histoire</button>','<button class="fch-chip kid" data-a="mistakes">🧠 Revoir mes erreurs</button>');
 if(!finotYoung())FINOT_SUGGEST.slice(0,3).forEach((q,i)=>chips.push(`<button class="fch-chip" data-a="finotsug:${i}">${hesc(q)}</button>`));return chips;},{id:'pedagogy-chips',order:10});
function enhanceFinot(){const box=document.getElementById('finotchat');if(!box)return;box.classList.toggle('young',finotYoung());const row=box.querySelector('.fch-row');// App Android V1 : pas de bouton micro inopérant (les gros boutons d'aide restent).
 const noMic=!!(window.MQSpeechCapability&&MQSpeechCapability.status().mode==='native-unavailable');
 if(row&&!noMic&&!row.querySelector('[data-a="finotvoice"]')){const b=document.createElement('button');b.className='btn finot-mic';b.dataset.a='finotvoice';b.type='button';b.textContent='🎤';b.setAttribute('aria-label','Parler à Finot avec le micro');row.insertBefore(b,row.querySelector('[data-a="finotsend"]'));}const inp=document.getElementById('finotin');if(inp&&finotYoung())inp.placeholder='Tu peux parler ou toucher un bouton';}
MQHooks.on('finot:open',()=>{enhanceFinot();finotChipsRender();if(finotYoung()&&FCHAT&&FCHAT.msgs.length===1){finotPush('finot','Tu n’as pas besoin d’écrire 🙂 Touche un gros bouton ou le micro 🎤, et je t’aide.');finotChipsRender();}},{id:'pedagogy-finot-open'});

Object.assign(ACT,{
 lesson:id=>levelPicker(id,'lesson'),start:id=>levelPicker(id,'exercise'),
 lessonlevel:x=>{const [id,d]=String(x).split('|');openLessonAtLevel(id,+d);},
 startlevel:x=>{const [id,d]=String(x).split('|');startMissionAtLevel(id,+d);},
 serieslen:x=>{const n=+x;if(!SERIES_LENS.some(v=>v[0]===n))return;S.seriesLen=n;save();document.querySelectorAll('[data-a^="serieslen:"]').forEach(b=>{const on=b.dataset.a==='serieslen:'+n;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});},
 finotsimple:()=>finotSimpleHelp(),finothint2:()=>finotHint(),finotread2:()=>finotRead(),finotvoice:()=>finotVoice(),
 finoteasycourse:()=>finotOpenEasyCourse(),finoteasyex:()=>finotOpenEasyEx()
});
window.MQPedagogy={version:'1.0',levels:LEVELS,adaptSteps,chapterFacts,openLessonAtLevel,startMissionAtLevel,seriesLen};
setTimeout(()=>{try{enhanceFinot();}catch(e){}},0);
})();
