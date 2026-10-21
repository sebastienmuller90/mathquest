/* Finot Académie — entraînement NON OFFICIEL aux compétences évaluées nationalement.
   - questions originales issues des générateurs Finot Académie ; aucune copie de cahier ministériel ;
   - diagnostic isolé : aucun XP, pièce, étoile, maîtrise, série ou carnet d'erreurs n'est modifié ;
   - début d'année : on interroge les acquis de la classe précédente (sauf CP : fondamentaux CP, difficulté 1).
   Sources de cadrage fonctionnel : pages Ministère/Éduscol 2026. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;

const LEVELS=['CP','CE1','CE2','CM1','CM2','6e','5e','4e'];
const SOURCE_GRADE={CP:'CP',CE1:'CP',CE2:'CE1',CM1:'CE2',CM2:'CM1','6e':'CM2','5e':'6e','4e':'5e'};
const QUESTION_N=16,HISTORY_N=10;
const DIFFICULTY={CP:1,CE1:1,CE2:1,CM1:2,CM2:2,'6e':2,'5e':2,'4e':2};

/* Les regex servent uniquement à sélectionner des chapitres originaux de l'app correspondant aux domaines officiels.
   Si un domaine n'a pas de chapitre explicitement nommé, le moteur prend un chapitre de la bonne matière/classe et
   conserve le domaine du rapport : aucune question externe n'est injectée. */
const SKILLS={
 CP:{
  fr:[['cp-fr-sons','Lettres, sons et syllabes',/lettre|voyelle|conson|son|syllab|alphabet|phon/],['cp-fr-oral','Compréhension orale',/oral|compreh|phrase|texte|consigne/],['cp-fr-vocab','Vocabulaire',/vocab|mot|lexique|sens|famille/]],
  ma:[['cp-ma-nombres','Nombres entiers',/nombre|compter|quantit|entier|suite|comparer|ranger/],['cp-ma-calcul','Premiers calculs',/addition|soustraction|calcul|complement|double|moitie/],['cp-ma-prob','Résolution de problèmes',/proble|situation/]]},
 CE1:{
  fr:[['ce1-fr-lecture','Lecture et compréhension',/lecture|lire|compreh|texte|phrase/],['ce1-fr-ecriture','Écriture et orthographe',/ecri|orthograph|dictee|mot/],['ce1-fr-vocab','Vocabulaire',/vocab|lexique|synonym|famille|sens/],['ce1-fr-oral','Compréhension orale',/oral|ecoute|compreh/]],
  ma:[['ce1-ma-nombres','Nombres entiers',/nombre|entier|numeration|comparer|ranger|suite/],['ce1-ma-calcul','Calcul mental',/calcul|addition|soustraction|double|moitie|complement/],['ce1-ma-prob','Résolution de problèmes',/proble|situation/]]},
 CE2:{
  fr:[['ce2-fr-lecture','Lecture et compréhension',/lecture|lire|compreh|texte|phrase/],['ce2-fr-oral','Compréhension orale',/oral|ecoute|compreh/],['ce2-fr-vocab','Vocabulaire',/vocab|lexique|synonym|famille|sens/],['ce2-fr-orth','Orthographe',/orthograph|dictee|accord|ecri/],['ce2-fr-gram','Grammaire et conjugaison',/gramma|sujet|verbe|nature|classe|conjug|temps/]],
  ma:[['ce2-ma-nombres','Nombres',/nombre|entier|numeration|comparer|ranger/],['ce2-ma-fractions','Fractions',/fraction/],['ce2-ma-mental','Calcul mental',/mental|calcul|table|double|moitie|complement/],['ce2-ma-pose','Calcul posé',/pose|addition|soustraction|multiplication|operation/],['ce2-ma-prob','Résolution de problèmes',/proble|situation/]]},
 CM1:{
  fr:[['cm1-fr-lecture','Lecture et compréhension',/lecture|lire|compreh|texte/],['cm1-fr-oral','Compréhension orale',/oral|ecoute|compreh/],['cm1-fr-vocab','Vocabulaire',/vocab|lexique|synonym|famille|sens/],['cm1-fr-orth','Orthographe',/orthograph|dictee|accord/],['cm1-fr-gram','Grammaire et conjugaison',/gramma|sujet|verbe|nature|fonction|conjug|temps/]],
  ma:[['cm1-ma-nombres','Nombres',/nombre|entier|decimal|fraction|numeration/],['cm1-ma-mental','Calcul mental',/mental|calcul|table|automat/],['cm1-ma-pose','Opérations',/pose|addition|soustraction|multiplication|division|operation/],['cm1-ma-prob','Résolution de problèmes',/proble|proportion|situation/]]},
 CM2:{
  fr:[['cm2-fr-lecture','Lecture et compréhension',/lecture|lire|compreh|texte/],['cm2-fr-oral','Compréhension orale',/oral|ecoute|compreh/],['cm2-fr-vocab','Vocabulaire',/vocab|lexique|synonym|famille|sens/],['cm2-fr-orth','Orthographe',/orthograph|dictee|accord/],['cm2-fr-gram','Grammaire et conjugaison',/gramma|sujet|verbe|nature|fonction|conjug|temps/]],
  ma:[['cm2-ma-nombres','Nombres et représentations',/nombre|entier|decimal|fraction|numeration/],['cm2-ma-mental','Calcul mental',/mental|calcul|table|automat/],['cm2-ma-pose','Calcul posé',/pose|addition|soustraction|multiplication|division|operation/],['cm2-ma-prob','Résolution de problèmes',/proble|proportion|situation/]]},
 '6e':{
  fr:[['6e-fr-comp','Compréhension écrite et orale',/lecture|compreh|texte|oral|recit|document/],['6e-fr-langue','Étude de la langue',/gramma|orthograph|conjug|verbe|sujet|nature|fonction|accord/],['6e-fr-vocab','Vocabulaire',/vocab|lexique|sens|synonym|famille/]],
  ma:[['6e-ma-auto','Automatismes et nombres',/nombre|decimal|fraction|calcul|operation|multiple|diviseur/],['6e-ma-prob','Résolution de problèmes',/proble|proportion|grandeur|mesure|situation/],['6e-ma-geo','Espace et géométrie',/geometr|angle|figure|symetr|solide|repere/]]},
 '5e':{
  fr:[['5e-fr-comp','Compréhension',/lecture|compreh|texte|oral|recit|document/],['5e-fr-langue','Compétences langagières et linguistiques',/gramma|orthograph|conjug|verbe|phrase|nature|fonction|accord/],['5e-fr-vocab','Vocabulaire et sens',/vocab|lexique|sens|synonym|figure/]],
  ma:[['5e-ma-auto','Automatismes',/calcul|nombre|fraction|decimal|relatif|operation|automat/],['5e-ma-prob','Résolution de problèmes',/proble|proportion|grandeur|mesure|situation/],['5e-ma-geo','Espace et géométrie',/geometr|angle|figure|symetr|solide|repere/]]},
 '4e':{
  fr:[['4e-fr-comp','Compréhension',/lecture|compreh|texte|oral|recit|document/],['4e-fr-langue','Compétences langagières et linguistiques',/gramma|orthograph|conjug|verbe|phrase|nature|fonction|accord/],['4e-fr-vocab','Vocabulaire et interprétation',/vocab|lexique|sens|synonym|figure|interpret/]],
  ma:[['4e-ma-auto','Automatismes',/calcul|nombre|fraction|decimal|relatif|puissance|operation|automat/],['4e-ma-prob','Résolution de problèmes',/proble|proportion|grandeur|mesure|situation/],['4e-ma-geo','Espace et géométrie',/geometr|angle|figure|symetr|solide|repere|pythag/]]}
};

let ACTIVE=null;
const escN=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function ensure(){if(!Array.isArray(S.nationalAssessments))S.nationalAssessments=[];return S.nationalAssessments;}
function subjectIdFor(level,subject){return /^[A-Z]/.test(level)?`p-${subject}`:subject;}
function subjId(cid){try{return sOf(WMAP[cid].id).id;}catch(e){return'';}}
function chapters(level,subject){const sid=subjectIdFor(level,subject);return ALLCH.filter(c=>WMAP[c.id]?.lvl===level&&subjId(c.id)===sid&&typeof c.g==='function');}
function skillDefs(level){return SKILLS[level]||{fr:[],ma:[]};}
function sourceGrade(level){return SOURCE_GRADE[level]||level;}
function chapterHay(c){return norm(`${c?.name||''} ${c?.domain||''} ${c?.f?.t||''}`);}
function candidates(level,subject,rx){const src=sourceGrade(level),all=chapters(src,subject),matched=all.filter(c=>rx.test(chapterHay(c)));return matched.length?matched:all;}
function difficulty(level){return DIFFICULTY[level]||2;}
function balancedSlots(level){const defs=skillDefs(level),slots=[];for(const [subject,key] of [['fr','francais'],['ma','maths']]){const arr=defs[subject]||[];for(let i=0;i<8;i++)slots.push({subject:key,skill:arr[i%Math.max(1,arr.length)]});}return slots;}
function buildQuestions(level){const slots=balancedSlots(level),out=[],seen=new Set(),d=difficulty(level);for(const slot of slots){const skill=slot.skill;if(!skill)continue;const [skillId,label,rx]=skill,pool=candidates(level,slot.subject,rx);if(!pool.length)continue;let q=null,c=null;for(let tries=0;tries<12&&!q;tries++){c=pool[Math.floor(Math.random()*pool.length)];try{const candidate=c.g(d);const sig=norm(String(candidate?.q||''));if(candidate&&candidate.type&&sig&&!seen.has(sig)){q=candidate;seen.add(sig);}}catch(e){}}
   if(q)out.push({cid:c.id,subject:slot.subject,skillId,label,q});}
 // Si un générateur très répétitif a empêché 16 questions uniques, on complète avec les chapitres de la bonne classe.
 const fallback=[...chapters(sourceGrade(level),'francais'),...chapters(sourceGrade(level),'maths')];let guard=0;while(out.length<QUESTION_N&&fallback.length&&guard++<100){const c=fallback[guard%fallback.length];try{const q=c.g(d),sig=norm(String(q?.q||''));if(!q?.type||!sig||seen.has(sig))continue;seen.add(sig);const subject=/maths$/.test(subjId(c.id))?'maths':'francais',defs=skillDefs(level)[subject==='maths'?'ma':'fr']||[],sk=defs[guard%Math.max(1,defs.length)]||['other',subject==='maths'?'Mathématiques':'Français',/.*/];out.push({cid:c.id,subject,skillId:sk[0],label:sk[1],q});}catch(e){}}
 return out.slice(0,QUESTION_N);}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function answerValue(q){if(q.type==='multi')return (q.labels||[]).map((_,i)=>document.querySelector(`#na-in${i}`)?.value||'');if(q.type==='order')return (ACTIVE?.orderSel||[]).map(i=>q.tokens[i]).join(' ');return document.querySelector('#na-in0')?.value||'';}
function renderInput(q){
 if(q.type==='choice')return `<div class="mq-na-choices">${q.choices.map((x,i)=>`<button class="btn mq-na-choice" data-a="nationalchoice:${i}">${x}</button>`).join('')}</div>`;
 if(q.type==='order'){q._sel=[];ACTIVE.orderSel=[];return `<div id="na-order-line" class="mq-na-order-line"><span class="muted">Touche les éléments dans le bon ordre</span></div><div class="mq-na-order-pool">${q.tokens.map((x,i)=>`<button class="btn mq-na-token" data-a="nationaltoken:${i}">${x}</button>`).join('')}</div><div class="mq-na-actions"><button class="btn ghost" data-a="nationalundo">↶ Annuler</button><button class="btn primary" data-a="nationalvalid">Valider</button></div>`;}
 if(q.type==='multi')return `<div class="mq-na-answer">${q.labels.map((l,i)=>`<label class="lab">${escN(l)}<input id="na-in${i}" class="big" inputmode="decimal" autocomplete="off"></label>`).join('')}</div><div class="mq-na-actions"><button class="btn primary" data-a="nationalvalid">Valider</button></div>`;
 const mode=q.type==='num'||q.type==='frac'?'decimal':'text';return `<div class="mq-na-answer"><input id="na-in0" class="big" inputmode="${mode}" autocomplete="off" aria-label="Ta réponse"></div><div class="mq-na-actions"><button class="btn primary" data-a="nationalvalid">Valider</button></div>`;
}
function renderOrder(){if(!ACTIVE)return;const q=ACTIVE.items[ACTIVE.i]?.q,line=document.querySelector('#na-order-line');if(!q||!line)return;line.innerHTML=ACTIVE.orderSel.length?ACTIVE.orderSel.map(i=>`<span class="mq-na-token">${q.tokens[i]}</span>`).join(' '):'<span class="muted">Touche les éléments dans le bon ordre</span>';document.querySelectorAll('[data-a^="nationaltoken:"]').forEach(b=>{const i=+b.dataset.a.split(':')[1];b.disabled=ACTIVE.orderSel.includes(i);});}
function renderQuestion(){if(!ACTIVE)return;const item=ACTIVE.items[ACTIVE.i];if(!item)return finish();const q=item.q,c=CHMAP[item.cid]||{};CUR='national-session';document.documentElement.classList.add('mq-national-active');app.innerHTML=`<div class="mq-na-qwrap"><div class="mq-na-top"><button class="btn ghost sm" data-a="nationalquit" aria-label="Quitter">✕</button><div class="prog"><i style="width:${ACTIVE.i/ACTIVE.items.length*100}%"></i></div><span class="pill">${ACTIVE.i+1}/${ACTIVE.items.length}</span></div><section class="qcard card"><div class="mq-na-tag"><b>${escN(item.label)}</b><span>${escN(ACTIVE.level)} · ${escN(item.subject==='maths'?'Maths':'Français')}</span></div><div class="mq-na-question">${q.q}</div>${q.svg||''}${q.audio&&TTS?.ok?'<button class="btn ghost" data-a="nationalaudio">🔊 Écouter</button>':''}${renderInput(q)}</section><p class="muted small center">Aucun indice ni correction pendant la simulation. Le bilan apparaît à la fin.</p></div>`;if(q.type!=='choice')setTimeout(()=>document.querySelector('#na-in0')?.focus(),0);}
function record(value){if(!ACTIVE||ACTIVE.locked)return false;const item=ACTIVE.items[ACTIVE.i],q=item.q;let ok=false;try{ok=check(q,value);}catch(e){return false;}ACTIVE.locked=true;ACTIVE.answers.push({cid:item.cid,subject:item.subject,skillId:item.skillId,label:item.label,ok:!!ok,t:Date.now()});ACTIVE.i++;ACTIVE.locked=false;ACTIVE.orderSel=[];if(ACTIVE.i>=ACTIVE.items.length)finish();else renderQuestion();return true;}
function valid(){if(!ACTIVE)return false;const q=ACTIVE.items[ACTIVE.i]?.q;if(!q)return false;const v=answerValue(q);if(q.type==='multi'&&v.some(x=>!String(x).trim())){try{shake();}catch(e){}return false;}if(q.type==='order'&&ACTIVE.orderSel.length<(q.tokens||[]).length){try{shake();}catch(e){}return false;}if(q.type!=='multi'&&q.type!=='order'&&!String(v).trim()){try{shake();}catch(e){}return false;}return record(v);}
function choose(i){if(!ACTIVE)return false;return record(+i);}
function token(i){if(!ACTIVE)return;const q=ACTIVE.items[ACTIVE.i]?.q;i=+i;if(q?.type!=='order'||!Number.isInteger(i)||i<0||i>=q.tokens.length||ACTIVE.orderSel.includes(i))return;ACTIVE.orderSel.push(i);renderOrder();}
function undo(){if(!ACTIVE?.orderSel?.length)return;ACTIVE.orderSel.pop();renderOrder();}
function audio(){if(!ACTIVE)return;const q=ACTIVE.items[ACTIVE.i]?.q;if(q?.audio&&typeof ttsSay==='function')ttsSay(q.audio);}

function report(active){const rows=active.answers||[],by={};for(const a of rows){const k=a.skillId||a.label,x=by[k]||(by[k]={id:k,name:a.label,subject:a.subject,q:0,ok:0});x.q++;if(a.ok)x.ok++;}const domains=Object.values(by).map(x=>({...x,score:x.q?Math.round(x.ok/x.q*100):0})).sort((a,b)=>a.subject.localeCompare(b.subject)||a.name.localeCompare(b.name,'fr')),ok=rows.filter(x=>x.ok).length,score=rows.length?Math.round(ok/rows.length*100):0,strong=domains.filter(x=>x.q&&x.score>=80),weak=domains.filter(x=>x.q&&x.score<60).sort((a,b)=>a.score-b.score),advice=[];if(weak[0])advice.push(`Revoir en priorité « ${weak[0].name} » avec une courte séance guidée.`);if(weak[1])advice.push(`Faire quelques exercices ciblés sur « ${weak[1].name} » avant une nouvelle simulation.`);if(!advice.length)advice.push('Les bases sont solides : refaire une simulation dans quelques jours pour vérifier que les acquis restent stables.');if(advice.length<2)advice.push('Relire chaque consigne jusqu’au bout et vérifier la réponse avant de valider.');return {id:active.id,level:active.level,sourceGrade:sourceGrade(active.level),startedAt:active.startedAt,finishedAt:Date.now(),questions:rows.length,ok,score,domains,strong:strong.map(x=>x.name),weak:weak.map(x=>x.name),advice:advice.slice(0,2),version:2};}
function store(rep){const h=ensure();h.unshift(rep);S.nationalAssessments=h.slice(0,HISTORY_N);try{saveLocal();}catch(e){}return rep;}
function finish(){if(!ACTIVE)return null;const a=ACTIVE,rep=store(report(a));ACTIVE=null;document.documentElement.classList.remove('mq-national-active');reportScreen(rep);return rep;}
function cancel(){ACTIVE=null;document.documentElement.classList.remove('mq-national-active');screen();}
function start(level){level=String(level||'');if(!LEVELS.includes(level))return false;const items=shuffle(buildQuestions(level));if(items.length<12){try{toast('Pas assez de questions originales disponibles pour ce niveau.');}catch(e){}return false;}ACTIVE={id:'na-'+Date.now().toString(36),level,startedAt:Date.now(),items,answers:[],i:0,orderSel:[],locked:false,owner:typeof ACTIVE!=='undefined'?String(window.ACTIVE||''):''};renderQuestion();return true;}
function pctClass(v){return v>=80?'okc':v>=60?'mid':'lo';}
function reportScreen(rep){CUR='national-report';document.documentElement.classList.remove('mq-national-active');app.innerHTML=`${bar('📋 Bilan de l’entraînement')}<div class="mq-na mq-na-report"><section class="card mq-na-notice"><strong>ℹ️ Entraînement non officiel</strong><span>Questions originales de Finot Académie alignées sur les compétences travaillées dans les évaluations nationales. Aucune question ministérielle n’est reproduite.</span></section><div class="mq-na-kpis"><div class="mq-na-kpi"><b>${escN(rep.level)}</b><span>Niveau</span></div><div class="mq-na-kpi"><b class="${pctClass(rep.score)}">${rep.score}%</b><span>Réussite</span></div><div class="mq-na-kpi"><b>${rep.ok}/${rep.questions}</b><span>Réponses justes</span></div></div><section class="card"><h2>Résultats par compétence</h2><div class="mq-na-domains">${rep.domains.map(x=>`<div class="mq-na-domain"><span><b>${escN(x.name)}</b><small>${x.subject==='maths'?'Maths':'Français'} · ${x.ok}/${x.q} juste${x.ok>1?'s':''}</small></span><strong class="${pctClass(x.score)}">${x.score}%</strong><div class="mq-na-bar"><i style="width:${x.score}%"></i></div></div>`).join('')}</div></section><section class="mq-na-advice"><h3>🦊 Conseils pour la suite</h3><ul>${rep.advice.map(x=>`<li>${escN(x)}</li>`).join('')}</ul></section><p class="muted small">La lecture à voix haute (fluence), lorsqu’elle fait partie des repères nationaux du niveau, n’est pas notée ici : elle nécessite un test oral séparé et fiable.</p><div class="mq-na-actions"><button class="btn primary" data-a="nationalstart:${rep.level}">↺ Refaire une simulation</button><button class="btn" data-a="nationalscreen">📚 Autres niveaux</button><button class="btn" data-a="home">🏠 Accueil</button></div></div>`;}
function historyHtml(){const h=ensure();return h.length?`<h2 class="sec">Derniers bilans</h2><div class="mq-na-history">${h.slice(0,HISTORY_N).map(r=>`<button class="card mq-na-report-row" data-a="nationalreport:${encodeURIComponent(r.id)}"><span><b>${escN(r.level)} · ${new Date(r.finishedAt||r.startedAt).toLocaleDateString('fr-FR')}</b><small>${r.questions||0} questions · ${r.ok||0} justes</small></span><strong class="mq-na-report-score ${pctClass(+r.score||0)}">${+r.score||0}%</strong></button>`).join('')}</div>`:'';}
function screen(){CUR='national';document.documentElement.classList.remove('mq-national-active');const cur=String(S.grade||'');app.innerHTML=`${bar('📝 Entraînement aux évaluations nationales')}<div class="mq-na"><section class="card mq-na-notice"><strong>Entraînement non officiel</strong><span>16 questions originales de Finot Académie en français et mathématiques. Le bilan est diagnostique : <b>aucun XP, pièce, étoile ou niveau de maîtrise n’est modifié</b>.</span></section><h2 class="sec">Choisis un niveau</h2><div class="mq-na-levels">${LEVELS.map(l=>`<button class="card mq-na-level ${l===cur?'current':''}" data-a="nationalstart:${l}"><span class="mq-na-ico">${/^(CP|CE1|CE2)$/.test(l)?'🌱':/^(CM1|CM2)$/.test(l)?'📘':'🎓'}</span><span><b>${l}</b><small>16 questions · français + maths · acquis de ${l==='CP'?'début de CP':sourceGrade(l)}</small></span><span class="go">Commencer</span></button>`).join('')}</div><p class="muted small">Les adaptations d’accessibilité restent disponibles. Les indices, récompenses et l’assistant Finot sont volontairement absents pendant la simulation. Ce module ne reproduit aucun cahier officiel.</p>${historyHtml()}</div>`;}
function injectHome(){if((typeof HOMETAB!=='undefined'&&HOMETAB!=='progres')||document.querySelector('[data-a="nationalscreen"]'))return;const anchor=document.querySelector('[data-a="badges"]');if(!anchor)return;const b=document.createElement('button');b.className=anchor.className;b.dataset.a='nationalscreen';b.innerHTML='<span class="ri" aria-hidden="true" style="font-size:30px">📝</span><span><small>Évaluations nationales</small><b>CP → CM2 · 6e → 4e</b><span class="muted">Entraînement diagnostique, sans récompense</span></span><span class="go">Voir</span>';anchor.insertAdjacentElement('afterend',b);}

ACT.nationalscreen=()=>screen();
ACT.nationalstart=l=>start(l);
ACT.nationalreport=id=>{id=decodeURIComponent(String(id||''));const r=ensure().find(x=>x.id===id);if(r)reportScreen(r);else screen();};
ACT.nationalchoice=i=>choose(i);
ACT.nationalvalid=()=>valid();
ACT.nationaltoken=i=>token(i);
ACT.nationalundo=()=>undo();
ACT.nationalaudio=()=>audio();
ACT.nationalquit=()=>cancel();

if(window.MQHooks){
 MQHooks.on('profile:changed',()=>{ACTIVE=null;document.documentElement.classList.remove('mq-national-active');},{id:'national-assessment-profile',order:850});
 MQHooks.on('home:rendered',()=>{if(ACTIVE){ACTIVE=null;document.documentElement.classList.remove('mq-national-active');}setTimeout(injectHome,0);},{id:'national-assessment-home',order:850});
}
document.addEventListener('keydown',e=>{if(!ACTIVE)return;if((e.key==='h'||e.key==='H'||e.key==='?')){e.preventDefault();e.stopImmediatePropagation();}} ,{capture:true});
ensure();
root.MQNationalAssessment={version:'2.0',levels:LEVELS,sourceGrades:SOURCE_GRADE,questionCount:QUESTION_N,skills:SKILLS,chapters,candidates,buildQuestions,start,finish,cancel,report,screen,get active(){return ACTIVE;}};
})(typeof window!=='undefined'?window:globalThis);
