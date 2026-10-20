/* Finot — moteur scolaire hors ligne : recherche de notions et compréhension d'intentions simples. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof finotAsk!=='function'||typeof CHMAP==='undefined')return;
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const esc3=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const STOP=new Set('je tu il elle on nous vous ils elles le la les un une des de du d au aux a et ou en pour sur dans avec sans ce cette ces mon ma mes ton ta tes son sa ses veux voudrais besoin travailler revise reviser revision apprendre comprendre explique expliquer aide cours lecon lecons exercice exercices faire fais moi peux peut pourrais dois controle interro interrogation demain aujourd hui stp s il te plait'.split(' '));
const SYN={maths:['math','mathematique','mathematiques','calcul'],francais:['français','grammaire','conjugaison','orthographe','lecture'],hg:['histoire','geographie','geo'],svt:['science','sciences','biologie'],pc:['physique','chimie'],anglais:['english'],italien:['italiano'],tech:['technologie'],musique:['music']};
function textOf(id){const ch=CHMAP[id],c=COURS[id]||{},s=(()=>{try{return sOf(WMAP[id].id)}catch{return null}})();return norm([ch?.name,ch?.domain,ch?.f?.t,...(ch?.f?.l||[]),c.domain,c.hook,...(c.retenir||[]),...(c.objectives||[]),s?.name,s?.id].join(' '));}
function queryTokens(raw){let t=norm(raw);for(const [canonical,alts] of Object.entries(SYN))for(const a of alts)if(t.includes(norm(a)))t+=' '+canonical;return [...new Set(t.split(' ').filter(x=>x.length>1&&!STOP.has(x)))];}
function search(raw,limit=4){const q=queryTokens(raw);if(!q.length)return[];const grade=String(S?.grade||'');const out=[],sig=q.filter(x=>x.length>=4);for(const id of Object.keys(CHMAP)){if(WMAP[id]?.lvl!==grade)continue;const ch=CHMAP[id],hay=textOf(id),name=norm(ch.name),sid=(()=>{try{return sOf(WMAP[id].id).id}catch{return''}})();let score=0,hits=0;for(const tok of q){if(name===tok)score+=20;else if(name.includes(tok))score+=10;if(hay.includes(tok)){score+=3;hits++;}if(tok===sid)score+=5;}if(hits===q.length)score+=8;if(score>0&&sig.every(t=>hay.includes(t)||name.includes(t)))out.push({id,score,name:ch.name,icon:ch.icon,subj:sid});}return out.sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'fr')).slice(0,limit);}
function facts(id){const ch=CHMAP[id],c=COURS[id]||{},a=[];const add=x=>{const d=document.createElement('div');d.innerHTML=String(x||'');const t=(d.textContent||'').replace(/\s+/g,' ').trim();if(t&&!a.includes(t))a.push(t)};(c.retenir||[]).forEach(add);(ch?.f?.l||[]).forEach(add);return a.slice(0,2);}
function resultHTML(items){return `<b>J’ai trouvé ${items.length>1?'plusieurs leçons':'une leçon'} pour ta classe.</b>`+items.map(x=>{const f=facts(x.id);return `<div class="finot-topic"><div><b>${esc3(x.icon||'📘')} ${esc3(x.name)}</b>${f[0]?`<small>${esc3(f[0])}</small>`:''}</div><div class="finot-topic-actions"><button class="fch-chip kid" data-a="finottopiccourse:${x.id}">🌱 Cours facile</button><button class="fch-chip kid" data-a="finottopicex:${x.id}">🎯 Exercices</button><button class="fch-chip" data-a="finottopicfiche:${x.id}">📘 Fiche</button></div></div>`;}).join('');}
function looksSchoolSearch(raw){const t=norm(raw);return /\b(travaill|revis|apprend|comprend|explique|cours|lecon|exercice|controle|interro|c est quoi|qu est ce|comment fonctionne)\b/.test(t)||queryTokens(raw).some(x=>x.length>=4&&Object.values(CHMAP).some(c=>norm(c.name).includes(x)));}
function simpleIntent(raw){const t=norm(raw);
 if(/\b(j ai pas compris|je n ai pas compris|je comprend pas|je ne comprend pas|comprends pas|aide moi|aide|explique moi|c est trop dur|je sais pas)\b/.test(t))return 'help';
 if(/\b(indice|donne moi un indice|aide sans donner la reponse|petit coup de pouce)\b/.test(t))return 'hint';
 if(/\b(lis moi|lire la question|lis la question|repete la question|repetes la question|ecouter la question)\b/.test(t))return 'read';
 return '';
}
MQHooks.on('finot:intent',ask=>{const raw=ask.raw,intent=simpleIntent(raw);
 if(intent){ask.echo();if(intent==='help'&&typeof ACT.finotsimple==='function'){ACT.finotsimple();return true;}if(intent==='hint'&&typeof ACT.finothint2==='function'){ACT.finothint2();return true;}if(intent==='read'&&typeof ACT.finotread2==='function'){ACT.finotread2();return true;}}
 // Question sur l'appli (XP, thèmes…) : la FAQ répond, sauf demande explicite de travail scolaire (« je veux réviser la dictée »).
 if(!/(travaill|revis|apprend|cours|lecon|exercice|controle|interro)/.test(norm(raw))&&typeof finotMatch==='function'&&finotMatch(raw))return false;
 if(looksSchoolSearch(raw)){const found=search(raw);if(found.length){ask.echo();finotPush('finot',resultHTML(found));finotChipsRender();return true;}}
 return false;
},{id:'finot-learning',order:40});
Object.assign(ACT,{
 finottopiccourse:id=>{finotClose();MQPedagogy.openLessonAtLevel(id,1);},
 finottopicex:id=>{finotClose();ACT.start(id);},
 finottopicfiche:id=>{finotClose();fiche(id);},
 finotsubj:id=>{if(SUBMAP[id]){S.subj=id;saveLocal();finotClose();home();}}
});
// Accès tactile supplémentaire pour les plus jeunes quand aucun exercice n’est ouvert.
MQHooks.on('finot:chips',({box})=>{if(!box||finotCurrentChapterId()||!['CP','CE1','CE2'].includes(String(S?.grade||'').toUpperCase()))return;for(const [id,label] of [['maths','➕ Maths'],['francais','📖 Français']])if(SUBMAP[id]&&!box.querySelector(`[data-a="finotsubj:${id}"]`))box.insertAdjacentHTML('beforeend',`<button class="fch-chip kid" data-a="finotsubj:${id}">${label}</button>`);},{id:'finot-learning-chips'});
window.MQFinotLearning={version:'1.1',search,queryTokens,simpleIntent};
})();
