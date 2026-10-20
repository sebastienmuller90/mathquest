/* Finot — conseils basés sur les micro-compétences réelles du profil. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof finotAsk!=='function'||!window.MQCompetency)return;
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const escF=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function gradeIds(){return Object.keys(CHMAP).filter(id=>WMAP[id]?.lvl===S.grade);}
function weak(limit=4){return MQCompetency.weakSkills(S,gradeIds(),limit);}
function strong(limit=4){return MQCompetency.strongSkills(S,gradeIds(),limit);}
function row(x){const ch=CHMAP[x.cid],lab=MQCompetency.label(x.value,x.attempts);return `<div class="finot-topic"><div><b>${lab.e} ${escF(x.skill?.short||x.label||'Compétence')}</b><small>${escF(ch?.name||x.cid)} · ${x.value}% · ${x.attempts} essai${x.attempts>1?'s':''}</small></div><div class="finot-topic-actions"><button class="fch-chip kid" data-a="finottopiccourse:${x.cid}">📖 Revoir</button><button class="fch-chip kid" data-a="finottopicex:${x.cid}">🎯 S’entraîner</button></div></div>`;}
function weakHTML(){const a=weak();if(!a.length)return 'Je n’ai pas encore assez de réponses pour savoir précisément ce qu’il faut retravailler. Fais quelques exercices et je pourrai mieux te guider.';return `<b>Voici ce que je te conseille de travailler en priorité :</b>${a.map(row).join('')}<p class="muted small">Je regarde les réponses récentes, la difficulté et les interrogations parent. Une interrogation compte davantage qu’un exercice avec aide.</p>`;}
function strongHTML(){const a=strong();if(!a.length)return 'Je n’ai pas encore assez de réponses pour confirmer tes points forts.';return `<b>Tes points les plus solides :</b>${a.map(x=>{const ch=CHMAP[x.cid];return `<div class="finot-topic"><div><b>🏆 ${escF(x.skill?.short||x.label||'Compétence')} · ${x.value}%</b><small>${escF(ch?.name||x.cid)}</small></div></div>`;}).join('')}`;}
const base=finotAsk;finotAsk=function(text){const raw=String(text||'').trim(),t=norm(raw);if(/\b(quoi reviser|que reviser|dois reviser|dois travailler|mes points faibles|ou j ai du mal|ou je suis faible|qu est ce que je dois travailler)\b/.test(t)){finotChatEnsure();finotPush('you',escF(raw));finotPush('finot',weakHTML());finotChipsRender();return;}if(/\b(mes points forts|je suis fort|je suis forte|qu est ce que je maitrise|ce que je maitrise)\b/.test(t)){finotChatEnsure();finotPush('you',escF(raw));finotPush('finot',strongHTML());finotChipsRender();return;}return base(raw);};
if(typeof finotChipsRender==='function'){const old=finotChipsRender;finotChipsRender=function(){old();const box=document.getElementById('fchChips');if(!box)return;if(!box.querySelector('[data-a="finotweak"]'))box.insertAdjacentHTML('beforeend','<button class="fch-chip kid" data-a="finotweak">🎯 Ce que je dois revoir</button>');};}
Object.assign(ACT,{finotweak:()=>{finotChatEnsure();finotPush('finot',weakHTML());finotChipsRender();}});
window.MQFinotCompetency={version:'1.1',weak,strong};
})();
