/* MathQuest — intégration des packs pédagogiques spécifiques par chapterId.
   Remplace uniquement l'atelier transversal des chapitres disposant d'un pack explicite. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof lessonSteps!=='function'||!window.MQPedagogicalWorkshop)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={source:'Source réelle',reconstitution:'Reconstitution pédagogique',synthese:'Synthèse MathQuest',simulation:'Données simulées'};
const icons={source:'📚',reconstitution:'🧱',synthese:'📄',simulation:'🧪'};
function getPack(id){return window.MQChapterPacks?.packs?.[id]||null;}
function provenance(p){
 const x=p?.provenance||{},type=x.type||'synthese',refs=Array.isArray(x.refs)?x.refs:[];
 return `<div class="mq-pack-provenance" data-provenance="${esc(type)}" style="margin:8px 0;padding:8px 10px;border-radius:10px;background:var(--surface2)"><b>${icons[type]||'📄'} ${esc(labels[type]||type)}</b><br><span class="small">${esc(x.label||'Ressource pédagogique MathQuest')}</span>${refs.length?`<details class="small" style="margin-top:5px"><summary>Références du cours</summary><ul>${refs.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></details>`:''}</div>`;
}
function levelBlock(level,data){
 const em={1:'🌱',2:'🎯',3:'🚀'}[level]||'•',qs=Array.isArray(data?.questions)?data.questions:[];
 return `<details class="mq-pack-level l${level}" data-level="${level}" ${level===1?'open':''} style="margin:8px 0"><summary><b>${em} ${esc(data?.label||('Niveau '+level))}</b></summary><ol>${qs.map(x=>`<li style="margin:8px 0">${esc(x.q)}${x.hint?`<details class="small muted" style="margin-top:4px"><summary>💡 Voir un indice</summary>${esc(x.hint)}</details>`:''}</li>`).join('')}</ol></details>`;
}
function buildSpecific(id){
 const p=getPack(id);if(!p)return null;
 const levels=[1,2,3].map(n=>levelBlock(n,p.levels?.[n])).join('');
 const trap=Array.isArray(p.misconception)?p.misconception:null;
 const transfer=p.transfer?.prompt?`<div class="checkpoint mq-pack-transfer"><div class="q">🔁 ${esc(p.transfer.title||'Transfert')}</div><p>${esc(p.transfer.prompt)}</p></div>`:'';
 const correction=trap?`<div class="whybox mq-pack-misconception"><b>⚠️ Piège fréquent</b><p>${esc(trap[0])}</p><p><b>Pour le corriger :</b> ${esc(trap[1])}</p></div>`:'';
 const objectHtml=p.object?.html||'';
 return {k:'mqworkshop',t:'🔎 Atelier spécifique : observer, raisonner, justifier',h:`<div class="mq-workshop mq-specific-pack" data-chapter-pack="${esc(id)}"><div class="card" style="margin:10px 0"><b>🎓 ${esc(p.object?.title||'Activité spécifique')}</b><p class="muted small"><b>Compétence :</b> ${esc(p.competency||'Réutiliser la notion dans une situation précise.')}</p>${provenance(p)}${objectHtml}</div><div class="checkpoint"><div class="q">🧠 Questions progressives</div><p class="muted small">Commence par le niveau qui te convient. Les réponses ne sont pas affichées : explique ton raisonnement à voix haute ou sur ton cahier.</p>${levels}</div>${transfer}${correction}</div>`,meta:{kind:'specific',subject:p.subject||MQPedagogicalWorkshop.subject?.(id)||'autre',topic:'chapter-pack',packVersion:window.MQChapterPacks?.version||'1'}};
}
const genericBuild=MQPedagogicalWorkshop.build.bind(MQPedagogicalWorkshop);
MQPedagogicalWorkshop.genericBuild=genericBuild;
MQPedagogicalWorkshop.build=function(id){return buildSpecific(id)||genericBuild(id);};
const baseLessonSteps=lessonSteps;
lessonSteps=function(id){
 const st=baseLessonSteps(id);const specific=buildSpecific(id);if(!specific||!Array.isArray(st))return st;
 const out=st.slice();const i=out.findIndex(x=>x?.k==='mqworkshop');
 if(i>=0)out[i]=specific;else{let at=out.findIndex(x=>x?.k==='mqselfcheck'||x?.k==='practice'||x?.k==='confidence'||x?.k==='quiz');out.splice(at<0?out.length:at,0,specific);}
 return out;
};
window.MQChapterPackIntegration={version:'1.0',getPack,buildSpecific,provenance,levelBlock};
})();
