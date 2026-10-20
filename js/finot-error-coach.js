/* Finot Académie — Finot analyse une erreur sans IA générative.
   Diagnostic prudent basé sur la compétence, le type de question et les erreurs récentes. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object')return;
let LAST=null;
const escF=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function profileId(){try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}}
function currentLast(){if(LAST&&LAST.profile===profileId())return LAST;if(LAST)LAST=null;return null;}
function skillOf(cid,q){try{const kind=q?._mq?.skillKind||MQCompetency.inferKind(cid,q);return MQCompetency.skillsForChapter(cid).find(x=>x.kind===kind)||null;}catch(e){return null;}}
function likelyCause(x){const q=x.q||{},skill=x.skill?.short||x.skill?.label||'la méthode';const sid=(()=>{try{return sOf(WMAP[x.cid].id).id.replace(/^p-/,'')}catch(e){return''}})();
 if(q.type==='frac')return `Le point à vérifier d’abord est <b>${escF(skill)}</b>. Sur une fraction, regarde séparément le numérateur, le dénominateur et la simplification avant de valider.`;
 if(q.type==='num')return `Le point à vérifier d’abord est <b>${escF(skill)}</b>. Refais mentalement trois contrôles : opération choisie, signe/unité, puis ordre de grandeur.`;
 if(q.type==='multi')return `Cette question comporte plusieurs éléments. Tu sembles surtout devoir consolider <b>${escF(skill)}</b>. Vérifie chaque ligne séparément avant de regarder l’ensemble.`;
 if(q.type==='order')return `Ici, l’ordre est important. Le signal principal est <b>${escF(skill)}</b> : repère d’abord la structure, puis place les éléments un par un.`;
 if(q.type==='text'&&/francais/.test(sid))return `Le point à revoir semble être <b>${escF(skill)}</b>. Relis la phrase en cherchant d’abord le sens, puis la règle d’orthographe ou de grammaire qui s’applique.`;
 if(q.type==='text'&&/(anglais|italien)/.test(sid))return `Le point à revoir semble être <b>${escF(skill)}</b>. Vérifie d’abord le sens global, puis l’ordre des mots et enfin la forme grammaticale.`;
 if(q.type==='choice')return `Tu as probablement hésité entre deux idées proches. Le point à consolider est <b>${escF(skill)}</b>. Cherche dans la consigne l’indice qui élimine les mauvaises réponses avant de choisir.`;
 return `Le point le plus utile à retravailler ici est <b>${escF(skill)}</b>. Reprends la consigne, identifie une seule règle utile, puis applique-la étape par étape.`;}
function historyHint(cid){try{const weak=MQCompetency.explainWeak(S,cid);if(weak&&weak.attempts>=2)return `<p><b>Dans tes dernières réponses :</b> ${escF(weak.skill?.short||weak.skill?.label||'cette compétence')} reste à consolider (${weak.value} %).</p>`;}catch(e){}return '';}
function explain(){const x=currentLast();if(!x)return finotPush?.('finot','Je n’ai pas encore d’erreur récente à analyser pour ce profil. Fais un exercice, puis reviens me voir si quelque chose bloque.');const c=CHMAP[x.cid],cause=likelyCause(x);finotChatEnsure?.();finotPush?.('finot',`<b>${escF(c?.icon||'📘')} ${escF(c?.name||'Cette notion')}</b><p>${cause}</p>${historyHint(x.cid)}<p class="muted small">Je ne peux pas savoir exactement ce que tu pensais au moment de répondre. Je te montre donc le point le plus probable à vérifier d’abord.</p><div class="finot-topic-actions"><button class="fch-chip kid" data-a="finotremediate:${x.cid}">🌱 Revoir simplement</button><button class="fch-chip kid" data-a="finotretry:${x.cid}">🎯 Réessayer</button></div>`);finotChipsRender?.();setTimeout(()=>window.MQFinotRemediation?.pushTip?.(),0);}
function remember(){try{const profile=profileId();if(typeof M!=='undefined'&&M?.q&&M?.cid)LAST={profile,cid:M.cid,q:M.q,your:M.your||'',skill:skillOf(M.cid,M.q),at:Date.now()};else if(typeof L!=='undefined'&&L){const k=L.steps?.[L.i]?.k,q=k==='practice'?L.pq:L.q;if(q)LAST={profile,cid:L.id,q,skill:skillOf(L.id,q),at:Date.now()};}}catch(e){}}
function addButton(){const fb=document.querySelector('#fb .fb,.lfb,.lesson-feedback');if(!fb||fb.querySelector('[data-a="finotwhy"]'))return;fb.insertAdjacentHTML('beforeend','<button class="btn ghost wide" data-a="finotwhy">🦊 Finot, pourquoi je me suis trompé ?</button>');}
// Après une réponse fausse : mémoriser l'erreur (pour ce profil) et proposer « Finot, pourquoi je me suis trompé ? ».
MQHooks.on('answer:after',x=>{if(x.ok)return;LAST={profile:profileId(),cid:x.cid,q:x.q,your:(x.mode==='lesson'?x.L&&x.L.your:x.M&&x.M.your)||'',skill:skillOf(x.cid,x.q),at:Date.now()};if(x.mode!=='flash')addButton();},{id:'finot-error-coach',order:30});

MQHooks.on('profile:changed',()=>{LAST=null;},{id:'finot-error-coach'});
MQHooks.on('finot:intent',ask=>{const t=ask.raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(window.MQFinotRemediation?.asksWhy?.(ask.raw)||/pourquoi.*(tromp|faux|fauss|rate)|qu.*(rate|erreur)|comprend.*erreur/.test(t)){ask.echo();explain();return true;}return false;},{id:'finot-error-why',order:20});
Object.assign(ACT,{finotwhy:()=>{finotOpen?.();setTimeout(explain,20);},finotremediate:id=>{finotClose?.();window.MQPedagogy?.openLessonAtLevel(id,1);},finotretry:id=>{finotClose?.();if(window.MQPedagogy?.startMissionAtLevel)MQPedagogy.startMissionAtLevel(id,1);else startMission([id]);}});
window.MQFinotError={version:'1.2',explain,clear(){LAST=null;},get last(){return currentLast();}};
})();
