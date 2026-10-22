/* Finot Académie — Défi famille hebdomadaire.
   Le score compare l'effort relatif, jamais le niveau scolaire ni le pourcentage brut de réussite.
   40 régularité + 30 objectif personnel + 20 cours validés + 10 erreurs réparées = 100. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;
const COLLECTIVE_TARGET=60;
const escF=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const startOfWeek=now=>{const d=new Date(now);d.setHours(0,0,0,0);d.setDate(d.getDate()-6);return d.getTime();};
const dayKey=t=>{const d=new Date(+t||0);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const fmt=t=>new Date(t).toLocaleDateString('fr-FR',{day:'numeric',month:'short'});
function normalized(v){try{return typeof normalizeState==='function'?normalizeState(v):v;}catch(e){return v||{};}}
function metrics(v,now=Date.now()){
 const s=normalized(v),start=startOfWeek(now),end=now+1,days=new Set(),correctByDay=new Map();
 for(const a of s.answerLog||[]){const t=+a?.t||0;if(t<start||t>=end)continue;const k=dayKey(t);days.add(k);if(a.ok)correctByDay.set(k,(correctByDay.get(k)||0)+1);}
 for(const a of s.activityLog||[]){const t=+a?.t0||0;if(t>=start&&t<end&&(+a.ms||0)>0)days.add(dayKey(t));}
 let lessons=0;for(const t of Object.values(s.lessons||{})){const n=+t||0;if(n>=start&&n<end){lessons++;days.add(dayKey(n));}}
 let repairs=0;for(const arr of Object.values(s.mistakes||{}))if(Array.isArray(arr))for(const m of arr){const seen=+m?.seen||0;if(seen>=start&&seen<end){repairs++;days.add(dayKey(seen));}}
 const goal=Math.max(5,Math.min(100,parseInt(s.dailyGoal)||20));let goalEquiv=0;for(const n of correctByDay.values())goalEquiv+=Math.min(1,n/goal);
 const regularityPts=Math.round(40*Math.min(5,days.size)/5),goalPts=Math.round(30*Math.min(5,goalEquiv)/5),lessonPts=Math.round(20*Math.min(3,lessons)/3),repairPts=Math.round(10*Math.min(3,repairs)/3),score=regularityPts+goalPts+lessonPts+repairPts,goalProgressPct=Math.round(Math.min(1,goalEquiv/5)*100);
 return {score,days:days.size,goal,goalEquiv:+goalEquiv.toFixed(2),goalProgressPct,lessons,repairs,regularityPts,goalPts,lessonPts,repairPts,start,end};
}
function participants(now=Date.now()){
 const rows=(typeof profileList==='function'?profileList():Object.entries(PDB?.profiles||{})).map(([id,p])=>({id,p:normalized(p),m:metrics(p,now)}));
 rows.sort((a,b)=>b.m.score-a.m.score||b.m.days-a.m.days||(b.m.lessons+b.m.repairs)-(a.m.lessons+a.m.repairs)||String(a.p.name||'').localeCompare(String(b.p.name||''),'fr'));
 let prev=null,rank=0;rows.forEach((x,i)=>{if(x.m.score!==prev){rank=i+1;prev=x.m.score;}x.rank=rank;});return rows;
}
function collective(rows){if(!rows.length)return {avg:0,pct:0,reached:false};const avg=Math.round(rows.reduce((n,x)=>n+x.m.score,0)/rows.length),pct=Math.min(100,Math.round(avg/COLLECTIVE_TARGET*100));return {avg,pct,reached:avg>=COLLECTIVE_TARGET};}
function stat(label,value,pts,max){return `<div class="mq-family-stat"><b>${escF(value)} · ${pts}/${max} pts</b><span>${escF(label)}</span></div>`;}
function row(x){const top=x.rank===1&&x.m.score>0;return `<article class="card mq-family-row"><span class="mq-family-rank ${top?'top':''}">${top?'🏅':x.rank}</span><span class="mq-family-avatar">${escF(x.p.avatar||'🦊')}</span><span class="mq-family-main"><b>${escF(x.p.name||'Profil')}</b><small>${escF(x.p.grade||'')} · score basé sur ses propres objectifs</small></span><span class="mq-family-score">${x.m.score}<small>/100</small></span><div class="mq-family-breakdown">${stat('Régularité',`${x.m.days}/7 jours`,x.m.regularityPts,40)}${stat('Objectif personnel',`${x.m.goalProgressPct} % de 5 journées-objectif`,x.m.goalPts,30)}${stat('Cours validés',String(x.m.lessons),x.m.lessonPts,20)}${stat('Erreurs réparées',String(x.m.repairs),x.m.repairPts,10)}</div></article>`;}
function screen(){const now=Date.now(),rows=participants(now),group=collective(rows),start=startOfWeek(now);PARENT=false;CUR='family';app.innerHTML=`${bar('👨‍👩‍👧‍👦 Défi famille')}<section class="card mq-family-intro"><strong>Chacun avance à son rythme.</strong><p>Le défi ne compare jamais les notes ni le niveau scolaire. Il récompense la régularité, l’objectif personnel, les cours validés et les erreurs réparées.</p><div class="mq-family-note">Semaine glissante : ${fmt(start)} → ${fmt(now)}. Un adulte peut participer avec un profil et choisir librement le niveau auquel il souhaite jouer.</div></section>${rows.length>=2?`<section class="card mq-family-goal"><div class="mq-family-goal-head"><div><b>🤝 Objectif collectif</b><div class="muted small">Moyenne familiale : ${group.avg}/100 · objectif ${COLLECTIVE_TARGET}/100</div></div><strong>${group.reached?'Atteint ✅':group.pct+' %'}</strong></div><div class="mq-family-bar"><i style="width:${group.pct}%"></i></div></section><h2 class="sec">Progression de la famille</h2><div class="mq-family-list">${rows.map(row).join('')}</div><details class="card mq-family-rules"><summary>Comment sont calculés les points ?</summary><ul><li><b>40 pts</b> : jusqu’à 5 jours actifs dans la semaine.</li><li><b>30 pts</b> : progression vers l’objectif quotidien personnel, plafonnée à 5 journées complètes.</li><li><b>20 pts</b> : jusqu’à 3 nouveaux cours validés.</li><li><b>10 pts</b> : jusqu’à 3 erreurs réellement réparées.</li></ul><p class="muted small">La réussite brute aux questions n’est volontairement pas utilisée : un CP, un collégien et un adulte peuvent donc participer équitablement.</p></details>`:`<div class="card mq-family-empty"><div class="bigicon">👨‍👩‍👧‍👦</div><h2>Ajoute un deuxième participant</h2><p class="muted">Chaque membre de la famille utilise son propre profil. Pour un adulte, choisis simplement le niveau auquel il veut jouer : le score du défi ne dépend pas de ce niveau.</p><button class="btn primary wide" data-a="profiles">Gérer les profils</button></div>`}<div class="mq-family-actions"><button class="btn" data-a="profiles">👤 Gérer les participants</button><button class="btn" data-a="home">🏠 Retour à l’accueil</button></div>`;}
function access(){if((typeof HOMETAB!=='undefined'&&HOMETAB!=='progres')||document.querySelector('.mq-family-access'))return;const target=document.querySelector('#app .tools')||document.querySelector('#app .smart-grid')||document.querySelector('#app .card:last-of-type');const html=`<section class="card mq-family-access"><div class="focusline"><div class="grow"><b>👨‍👩‍👧‍👦 Défi famille</b><div class="muted small">Qui a le mieux avancé par rapport à ses propres objectifs cette semaine ?</div></div><button class="btn primary" data-a="familychallenge">Voir</button></div></section>`;if(target)target.insertAdjacentHTML('afterend',html);else app.insertAdjacentHTML('beforeend',html);}
ACT.familychallenge=()=>screen();
if(window.MQHooks)MQHooks.on('home:rendered',()=>setTimeout(access,0),{id:'family-challenge-home',order:96});
window.MQFamilyChallenge={version:'1.1',target:COLLECTIVE_TARGET,startOfWeek,metrics,participants,collective,screen};
})();
