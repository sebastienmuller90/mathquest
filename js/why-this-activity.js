/* Finot Académie — transparence adaptative « Pourquoi maintenant ? ».
   Explique uniquement des signaux réellement présents dans le profil. Aucun score ni choix n'est modifié. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined'||typeof ACT!=='object')return;
const escW=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function unresolved(cid){const a=S.mistakes?.[cid];return Array.isArray(a)?a.filter(x=>!x.seen).length:0;}
function recentAccuracy(cid){try{return MQAdaptive.recentAccuracy(S,cid);}catch(e){return null;}}
function weakness(cid){try{return window.MQCompetency?.explainWeak?.(S,cid)||null;}catch(e){return null;}}
function evidence(cid){const m=MQAdaptive.mastery(S,cid),err=unresolved(cid),due=MQAdaptive.isDue(S,cid),acc=recentAccuracy(cid),weak=weakness(cid),items=[];
 if(err)items.push({id:'error',priority:100,icon:'🩹',title:err>1?`${err} erreurs à réparer`:'Une erreur à réparer',text:'Cette notion contient encore une erreur non réparée dans ton carnet. La retravailler maintenant aide à ne pas la laisser s’installer.'});
 if(due)items.push({id:'due',priority:90,icon:'🧠',title:'Révision arrivée à échéance',text:'La répétition espacée indique que c’est un bon moment pour revoir cette notion avant de l’oublier.'});
 if(acc!=null&&acc<.75)items.push({id:'recent',priority:80,icon:'📉',title:`Réussite récente : ${Math.round(acc*100)} %`,text:'Tes dernières réponses montrent qu’un peu d’entraînement supplémentaire peut être utile ici.'});
 if(weak?.skill&&Number.isFinite(+weak.value)&&+weak.value<65)items.push({id:'skill',priority:75,icon:'🔎',title:`Point fragile : ${weak.skill.short||weak.skill.label||'une étape de la compétence'}`,text:'Finot a repéré une micro-compétence moins solide dans ce chapitre. Cette activité peut la renforcer.'});
 if(m>0&&m<40)items.push({id:'mastery',priority:70,icon:'🌱',title:`Maîtrise fragile : ${m} %`,text:'Tu as déjà commencé cette notion, mais elle n’est pas encore assez stable pour être considérée comme acquise.'});
 else if(m>=40&&m<65)items.push({id:'mastery',priority:65,icon:'🟠',title:`Maîtrise en cours : ${m} %`,text:'Tu progresses sur cette notion. Quelques bonnes répétitions peuvent maintenant faire une vraie différence.'});
 else if(m>=65&&m<85)items.push({id:'consolidate',priority:50,icon:'🎯',title:`Presque maîtrisé : ${m} %`,text:'La notion est déjà bien avancée. Cette activité sert surtout à la consolider jusqu’à une maîtrise durable.'});
 if(typeof M!=='undefined'&&M?.path&&M.cid===cid)items.push({id:'path',priority:85,icon:'🗺️',title:'Étape de ton parcours du jour',text:'Cette notion fait partie du parcours personnalisé préparé pour ta séance d’aujourd’hui.'});
 items.sort((a,b)=>b.priority-a.priority);
 if(!items.length)items.push({id:'level',priority:1,icon:'📘',title:'Entraînement de ton niveau',text:'Aucun signal d’urgence particulier : cette activité fait partie des notions adaptées à ta classe et sert à construire de nouvelles preuves de maîtrise.'});
 return {cid,mastery:m,label:MQAdaptive.masteryLabel(m),items,primary:items[0]};}
function html(data){const d=data;return `<aside class="mq-why-card" aria-live="polite"><div class="mq-why-head"><img src="${FINOT_IMG.revision||FINOT_IMG.indice}" alt="" aria-hidden="true"><div><b>Pourquoi maintenant ?</b><span>${d.label.e} ${escW(d.label.t)} · ${d.mastery}%</span></div></div><div class="mq-why-list">${d.items.slice(0,3).map(x=>`<div class="mq-why-item"><span>${x.icon}</span><div><b>${escW(x.title)}</b><p>${escW(x.text)}</p></div></div>`).join('')}</div><p class="mq-why-note">Finot se base seulement sur ta progression enregistrée sur cet appareil. Ce n’est pas un jugement sur ton niveau.</p></aside>`;}
function inject({M:m}={}){try{if(!m||m.flash||!m.q)return false;const qb=document.querySelector('.qbtns');if(!qb||qb.querySelector('[data-a="whyactivity"]'))return false;const b=document.createElement('button');b.className='btn ghost mq-why-btn';b.dataset.a='whyactivity';b.type='button';b.setAttribute('aria-expanded','false');b.textContent='🦊 Pourquoi ?';qb.insertBefore(b,qb.lastElementChild||null);return true;}catch(e){return false;}}
function toggle(){if(!M||M.flash||!M.cid)return false;const card=document.querySelector('.qcard');if(!card)return false;let p=card.querySelector('.mq-why-card');const b=card.querySelector('[data-a="whyactivity"]');if(p){p.remove();if(b)b.setAttribute('aria-expanded','false');return true;}const qb=card.querySelector('.qbtns');if(!qb)return false;qb.insertAdjacentHTML('beforebegin',html(evidence(M.cid)));if(b)b.setAttribute('aria-expanded','true');try{window.MQFinotLive?.emit?.('finot.explaining',{text:'Je t’explique pourquoi cette notion est utile maintenant.'});}catch(e){}return true;}
MQHooks.on('question:after-render',inject,{id:'why-this-activity',order:95});
ACT.whyactivity=toggle;
root.MQWhyActivity={version:'1.0',evidence,html,inject,toggle};
})(typeof window!=='undefined'?window:globalThis);
