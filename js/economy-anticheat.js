/* Finot Académie — économie anti-triche / anti-farm.
   Objectif : laisser l'enfant refaire librement pour apprendre, mais ne rémunérer qu'un travail réellement nouveau.
   Cette couche réutilise les hooks existants et ne touche pas au calcul de maîtrise / carnet d'erreurs. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof MQHooks==='undefined'||typeof S==='undefined')return;

const CFG={
 version:1,
 chapterFull:8, chapterHalf:12,
 dailyQuestionCoins:20,
 xpByDifficulty:{1:4,2:6,3:9},
 studyMerit:2, dueReviewMerit:2, dueReviewDailyCap:4,
 missionMeritCap:1, perfectMeritCap:1, missionBonusesPerDay:3,
 // Le coffre du devoir reste volontairement fort : il est unique chaque jour et récompense l'assiduité.
 chest:{coins:40,xp:50,merit:5},
 rewardedLimit:5000,
 // Récompenses ponctuelles accordées par d'autres modules (une seule fois par clé, plafonnées par jour et par source).
 awardDailyCap:{'error-repair':5,homework:2},awardsLimit:3000
};
const oldAddMerit=typeof addMerit==='function'?addMerit:null;
const oldRewardsScreen=typeof rewardsScreen==='function'?rewardsScreen:null;
const oldShop=typeof shop==='function'?shop:null;
const oldPathAnswer=typeof pathAnswer==='function'?pathAnswer:null;
const oldPathInfo=typeof pathInfo==='function'?pathInfo:null;
let QBASE=null,SESSION=null;

const today=()=>typeof localISODate==='function'?localISODate(Date.now()):(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;})();
function canonDate(v){const m=String(v||'').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);return m?`${m[1]}-${String(+m[2]).padStart(2,'0')}-${String(+m[3]).padStart(2,'0')}`:'';}
function prevDateKey(k){const m=String(k).match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!m)return'';const d=new Date(+m[1],+m[2]-1,+m[3],12);d.setDate(d.getDate()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function hash(s){let h=2166136261>>>0;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return (h>>>0).toString(36);}
function text(v){try{return typeof plainText==='function'?plainText(String(v??'')):String(v??'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();}catch(e){return String(v??'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();}}
function answerOf(q){try{return typeof answerText==='function'?text(answerText(q)):text(Array.isArray(q?.ans)?q.ans.join('|'):q?.ans??q?.acc??'');}catch(e){return text(q?.ans??'');}}
function fingerprint(cid,q){return hash([cid,q?.type||'',text(q?.q||''),answerOf(q)].join('|').toLocaleLowerCase('fr'));}
function freshDay(){return {date:today(),studySeen:{},studyUnique:0,studyMs:0,chapters:{},chapterRewarded:{},questionCoins:0,missionKeys:{},missionBonusCount:0,missionMeritCount:0,dueMerit:0,lessonNew:false,dueReview:false,pathDone:false,qualified:false,studyMerit:false};}
function ensure(){
 if(!S.economy||typeof S.economy!=='object'||Array.isArray(S.economy))S.economy={};const e=S.economy;
 if(!e.rewarded||typeof e.rewarded!=='object'||Array.isArray(e.rewarded))e.rewarded={};if(!Array.isArray(e.rewardOrder))e.rewardOrder=[];
 if(!e.reviewRewarded||typeof e.reviewRewarded!=='object'||Array.isArray(e.reviewRewarded))e.reviewRewarded={};
 if(!e.missionRewarded||typeof e.missionRewarded!=='object'||Array.isArray(e.missionRewarded))e.missionRewarded={};
 if(!e.daily||e.daily.date!==today())e.daily=freshDay();
 if(!Number.isFinite(+e.uniqueCorrectBaseline))e.uniqueCorrectBaseline=Math.max(0,+S.totalOk||0);
 if(!Number.isFinite(+e.uniqueCorrect))e.uniqueCorrect=0;
 if((+e.version||0)<CFG.version){
  if(S.merit?.rules){
   // Une réponse isolée ne doit jamais débloquer une récompense réelle.
   S.merit.rules.ok=0;
   if(S.merit.rules.mission===5)S.merit.rules.mission=1;
   if(S.merit.rules.perfect===10)S.merit.rules.perfect=1;
   if(S.merit.rules.path===15)S.merit.rules.path=5;
   if(S.merit.rules.streak===5)S.merit.rules.streak=1;
   if(S.merit.rules.lesson===5)S.merit.rules.lesson=2;
  }
  // Ne modifie que les coûts par défaut historiques ; un barème parent personnalisé est conservé.
  const costs={r1:[50,60],r2:[80,100],r3:[200,250],r4:[400,500]};
  for(const w of S.merit?.rewards||[]){const c=costs[w.id];if(c&&+w.c===c[0])w.c=c[1];}
  e.version=CFG.version;
 }
 // Même après migration/import, la bonne réponse brute n'est jamais une source de bons points physiques.
 if(S.merit?.rules)S.merit.rules.ok=0;
 return e;
}
function saveEconomy(){try{if(typeof saveLocal==='function')saveLocal();else if(typeof save==='function')save();}catch(e){}}
function pruneRewarded(e){while(e.rewardOrder.length>CFG.rewardedLimit){const k=e.rewardOrder.shift();delete e.rewarded[k];}}
function comboPct(streak){return streak>=8?0.25:streak>=5?0.15:streak>=3?0.10:0;}
function quoteQuestion({cid,q,d=1,hint=false,streak=1,mode='mission',ms=0,commit=false}={}){
 const e=ensure(),day=e.daily,fp=fingerprint(cid,q),repeat=!!e.rewarded[fp];
 let factor=0,xp=0,coins=0,combo=0,studyNew=false;
 if(!repeat&&mode!=='flash'){
  const n=+day.chapterRewarded[cid]||0;factor=n<CFG.chapterFull?1:n<CFG.chapterHalf?0.5:0;
  if(factor>0){combo=comboPct(streak);xp=Math.max(1,Math.round((CFG.xpByDifficulty[Math.max(1,Math.min(3,+d||1))]||4)*(1+combo)*(hint?0.5:1)*factor));
   if(mode==='mission'&&!hint&&factor===1&&day.questionCoins<CFG.dailyQuestionCoins)coins=1;}
 }
 if(commit){
  // L'assiduité ne compte qu'une question exacte une fois par jour, même si son rendement économique est déjà nul.
  if(mode!=='flash'&&!day.studySeen[fp]){day.studySeen[fp]=1;day.studyUnique++;day.studyMs+=Math.max(0,Math.min(120000,+ms||0));day.chapters[cid]=1;studyNew=true;}
  if(!repeat&&factor>0&&mode!=='flash'){
   e.rewarded[fp]=Date.now();e.rewardOrder.push(fp);pruneRewarded(e);day.chapterRewarded[cid]=(+day.chapterRewarded[cid]||0)+1;day.questionCoins+=coins;e.uniqueCorrect++;
  }
 }
 return {fp,repeat,factor,xp,coins,combo,mode,studyNew};
}
/* Seul point d'entrée des gains ponctuels des autres modules (carnet d'erreurs, devoirs validés…) : MQEconomy reste
   l'unique propriétaire des XP, pièces et bons points. Idempotent par (source, clé) ; plafond quotidien par source.
   Renvoie {granted, reason:'already'|'cap'|'invalid', xp, coins, merit}. */
function award({source,key,xp=0,coins=0,merit=0,why=''}={}){
 const src=String(source||''),k=String(key||'');if(!src||!k)return {granted:false,reason:'invalid',xp:0,coins:0,merit:0};
 const e=ensure();if(!e.awards||typeof e.awards!=='object'||Array.isArray(e.awards))e.awards={};if(!Array.isArray(e.awardOrder))e.awardOrder=[];
 const d=e.daily;if(!d.awards||typeof d.awards!=='object'||Array.isArray(d.awards))d.awards={};
 const id=src+'|'+k;if(e.awards[id])return {granted:false,reason:'already',xp:0,coins:0,merit:0};
 const cap=Number.isFinite(+CFG.awardDailyCap[src])?+CFG.awardDailyCap[src]:Infinity;if((+d.awards[src]||0)>=cap)return {granted:false,reason:'cap',xp:0,coins:0,merit:0};
 const gx=Math.max(0,Math.round(+xp||0)),gc=Math.max(0,Math.round(+coins||0)),gm=Math.max(0,Math.round(+merit||0));
 S.xp=(+S.xp||0)+gx;S.coins=(+S.coins||0)+gc;if(gm)addDirectMerit(gm,why||'Récompense',null);
 e.awards[id]=Date.now();e.awardOrder.push(id);while(e.awardOrder.length>CFG.awardsLimit)delete e.awards[e.awardOrder.shift()];
 d.awards[src]=(+d.awards[src]||0)+1;saveEconomy();return {granted:true,reason:'',xp:gx,coins:gc,merit:gm};
}
function stars(ok,n){const r=n?ok/n:0;return r>=.999?3:r>=.75?2:r>=.5?1:0;}
function missionBonus(m){const d=ensure().daily,r=m?.n?(+m.ok||0)/(+m.n||1):0,ids=[...(m?.ids||[])].sort(),key=`${d.date}|${ids.join(',')}`;
 if(m?.path||r<.75||d.missionKeys[key]||d.missionBonusCount>=CFG.missionBonusesPerDay)return {xp:0,coins:0,key,first:false};
 d.missionKeys[key]=1;d.missionBonusCount++;
 if(r>=.999)return {xp:10,coins:2,key,first:true};return {xp:6,coins:1,key,first:true};}
function addDirectMerit(n,why,m=null){if(!oldAddMerit||!(+n>0))return;oldAddMerit(+n,why,m);}
function noteDueReviews(m){if(!SESSION||!m||m.path)return;const e=ensure(),d=e.daily,r=m.n?m.ok/m.n:0;if(r<.75)return;
 for(const x of SESSION.due||[]){if(!x.due)continue;const token=`${x.cid}|${x.token||0}`;if(e.reviewRewarded[token])continue;if(d.dueMerit>=CFG.dueReviewDailyCap)break;e.reviewRewarded[token]=Date.now();d.dueReview=true;const gain=Math.min(CFG.dueReviewMerit,CFG.dueReviewDailyCap-d.dueMerit);d.dueMerit+=gain;addDirectMerit(gain,`Révision due réussie : ${byId(x.cid)?.name||x.cid}`,m);}
}
function celebrateFinot(before){try{const after=finotNiveau(S).nom;if(after===before)return;const ami=FINOT_AMIS.find(a=>a.seuil===S.streak.best);setTimeout(()=>ami?finotCeleb(ami.img,'Nouvel ami !',`${ami.nom} rejoint votre bande 🎉`):finotCeleb('data/images/finot/ui-celeb-lien.png','Nouveau lien avec Finot !',after),100);}catch(e){}
}
function qualifyDay(reason='Journée d’étude qualifiée'){
 const e=ensure(),d=e.daily;if(d.qualified)return false;d.qualified=true;const before=typeof finotNiveau==='function'?finotNiveau(S).nom:'';
 if(!d.studyMerit){d.studyMerit=true;addDirectMerit(CFG.studyMerit,reason,null);}
 const t=d.date,last=canonDate(S.streak?.last),prev=prevDateKey(t);if(last!==t){S.streak.n=last===prev?(+S.streak.n||0)+1:1;S.streak.last=t;S.streak.best=Math.max(+S.streak.best||0,S.streak.n);if(S.streak.n>1)addDirectMerit(Math.min(1,+S.merit?.rules?.streak||0),`Série de ${S.streak.n} jours qualifiés 🔥`,null);}
 celebrateFinot(before);saveEconomy();return true;
}
function maybeQualify(){const d=ensure().daily,chapters=Object.keys(d.chapters||{}).length;const ok=d.pathDone||d.dueReview||d.lessonNew||(d.studyUnique>=6&&chapters>=2)||(d.studyUnique>=8&&d.studyMs>=240000);return ok?qualifyDay(d.pathDone?'Devoir du jour terminé':d.dueReview?'Révision programmée effectuée':d.lessonNew?'Nouveau cours validé':'Journée d’étude complète'):false;}
function restoreBadges(base,m){if(!base||typeof checkBadges!=='function')return;S.badges=base.badges.slice();S.badgeDates={...base.badgeDates};if(m&&Array.isArray(m.newB))m.newB=base.newB.slice();const real=S.totalOk,e=ensure();S.totalOk=Math.min(real,(+e.uniqueCorrectBaseline||0)+(+e.uniqueCorrect||0));
 // Une mission minimale (sans liste de nouveaux badges) ne doit jamais faire planter la fin de mission.
 if(m&&typeof m==='object'&&!Array.isArray(m.newB))m.newB=[];try{checkBadges(m);}finally{S.totalOk=real;}}
function updateAnswerFeedback(r){const fb=document.querySelector('#fb .fb.good');if(!fb)return;fb.innerHTML=fb.innerHTML.replace(/\+\d+ XP/,`+${r.xp} XP`);const hot=fb.querySelector('.hot');if(hot){if(r.xp<=0||!r.combo)hot.remove();else hot.textContent=`Série +${Math.round(r.combo*100)} % 🔥`;}
 const pb=fb.querySelector('.pathbonus');if(pb)pb.remove();
 const old=fb.querySelector('.eco-note');if(old)old.remove();const msg=r.repeat?'Déjà réussie : entraînement utile, sans nouvelle récompense.':r.factor===0?'Plafond atteint sur cette notion aujourd’hui : continue pour apprendre, ou change de chapitre pour regagner des récompenses.':r.factor<1?'Même chapitre : récompense réduite de moitié pour encourager la variété.':r.mode==='path'?'Le devoir récompense surtout le coffre final, pas la répétition des questions.':r.coins?`Nouvelle question : +${r.coins} 🪙.`:'Nouvelle question récompensée.';fb.insertAdjacentHTML('beforeend',`<small class="eco-note" style="display:block;margin-top:6px">🛡️ ${msg}</small>`);}
function updateEndScreen(m,bonus,st){const starEls=[...document.querySelectorAll('.bigstars span')];starEls.forEach((el,i)=>el.classList.toggle('on',i<st));const g=document.querySelector('.gains');if(g){const spans=g.querySelectorAll('span');if(spans[0])spans[0].textContent=`+${(+m.xp||0)+bonus.xp} XP`;if(spans[1])spans[1].textContent=`+${(+m.coins||0)+bonus.coins} 🪙`;let merit=g.querySelector('[data-eco-merit]');if(m.mg){if(!merit){merit=document.createElement('span');merit.dataset.ecoMerit='1';g.appendChild(merit);}merit.textContent=`+${m.mg} 🎖️`;}}
}
function patchEconomyScreens(){
 if(oldRewardsScreen)rewardsScreen=function(){oldRewardsScreen();const how=document.querySelector('.how');if(how)how.innerHTML=`<li><b>+${CFG.studyMerit}</b> journée d’étude qualifiée</li><li><b>+${CFG.dueReviewMerit}</b> révision programmée réussie <small>(plafonnée par jour)</small></li><li><b>+${Math.min(2,+S.merit.rules.lesson||0)}</b> nouveau cours validé</li><li><b>+${Math.min(CFG.chest.merit,+S.merit.rules.path||0)}</b> devoir du jour terminé <small>(selon qualité)</small></li><li><b>+1</b> première mission réussie du chapitre dans la journée</li><li><b>+1</b> sans-faute, une seule fois par mission éligible</li><li><b>+${Math.min(1,+S.merit.rules.streak||0)}</b> jour d’assiduité qualifié consécutif</li><li>Une bonne réponse seule ne donne plus de 🎖️.</li><li>Bonus manuels des parents 🎁</li>`;};
 if(oldShop)shop=function(){oldShop();const p=document.querySelector('.muted.center');if(p)p.textContent='Les pièces récompensent surtout les nouvelles questions et le devoir du jour. Répéter la même activité ne permet plus de les farmer.';};
 if(oldPathInfo)pathInfo=function(){finotOpen();finotPush('finot','<b>🗺️ Ton devoir du jour</b><br>4 leçons puis 2 séries d’exercices. Les répétitions restent utiles pour apprendre, mais ne redonnent pas de récompense.<br>🎁 Le coffre final est volontairement important parce qu’il ne peut être ouvert qu’une fois par jour : jusqu’à <b>40 🪙, 50 XP et 5 🎖️</b>, selon la qualité du parcours.<br>🔥 L’assiduité progresse quand une vraie journée d’étude est accomplie, pas après une seule réponse.');};
}
function installWrappers(){
 // Les bons points physiques ne sont jamais accordés à chaque réponse ; missions/sans-faute sont gérés au mission:end.
 if(oldAddMerit)addMerit=function(n,why,m=M){if(!why)return;if(/^Mission réussie|^Sans faute|^Série du parcours/.test(String(why)))return;let v=+n||0;if(/^Cours :/.test(why))v=Math.min(v,2);else if(/^Parcours du jour/.test(why))v=Math.min(v,CFG.chest.merit);else if(/^Série de /.test(why))v=Math.min(v,1);return oldAddMerit(v,why,m);};
 // L'ancien streak était déclenché par une seule bonne réponse. Désormais MQEconomy le qualifie explicitement.
 if(typeof touchStreak==='function')touchStreak=function(){};
 // Plus de bonus pièces 1,2,3,4,5… dans le parcours : le coffre récompense la qualité globale.
 if(oldPathAnswer)pathAnswer=function(ok){const t=M&&M.path;if(!t)return 0;t.answers.push({cid:M.cid,ok:!!ok,ms:Math.max(0,Math.min(600000,Date.now()-(M.qt||Date.now())))});if(ok){t.streak++;t.best=Math.max(t.best,t.streak);}else t.streak=0;(t.bonuses=t.bonuses||[]).push(0);return 0;};
 if(ACT?.rulesave){const oldRuleSave=ACT.rulesave;ACT.rulesave=(...a)=>{const ru=document.querySelector('#ru_ok');if(ru)ru.value='0';oldRuleSave(...a);S.merit.rules.ok=0;saveEconomy();};}
 patchEconomyScreens();
}

MQHooks.on('mission:start',({ids,M:m})=>{ensure();SESSION={ids:[...(ids||[])],xp:S.xp,coins:S.coins,qxp:0,qcoins:0,due:(ids||[]).map(cid=>({cid,due:MQAdaptive.isDue(S,cid),token:S.review?.[cid]?.next||0})),lastBadges:{badges:S.badges.slice(),badgeDates:{...S.badgeDates},newB:Array.isArray(m?.newB)?m.newB.slice():[]}};},{id:'economy-mission-start',order:-90});
MQHooks.on('question:after-render',({M:m,mode})=>{if(!m)return;QBASE={xp:S.xp,coins:S.coins,mxp:+m.xp||0,mcoins:+m.coins||0,d:+m.d||1,mode:mode==='flash'?'flash':m.path?'path':'mission',dailyOk:canonDate(S.daily?.date)===today()?(+S.daily.ok||0):0,badges:S.badges.slice(),badgeDates:{...S.badgeDates},newB:Array.isArray(m.newB)?m.newB.slice():[]};},{id:'economy-question-base',order:99});
MQHooks.on('answer:after',({ok,q,cid,M:m,mode})=>{if(!m||!QBASE)return;const ms=Math.max(0,Date.now()-(m.qt||Date.now()));if(ok){const r=quoteQuestion({cid,q,d:QBASE.d,hint:!!m.hint,streak:+m.streak||1,mode:mode==='flash'?'flash':mode==='path'?'path':'mission',ms,commit:true});S.xp=QBASE.xp+r.xp;S.coins=QBASE.coins+r.coins;m.xp=QBASE.mxp+r.xp;m.coins=QBASE.mcoins+r.coins;if(mode!=='flash')S.daily.ok=QBASE.dailyOk+(r.studyNew?1:0);if(SESSION){SESSION.qxp+=r.xp;SESSION.qcoins+=r.coins;}restoreBadges({badges:QBASE.badges,badgeDates:QBASE.badgeDates,newB:QBASE.newB},m);if(SESSION)SESSION.lastBadges={badges:S.badges.slice(),badgeDates:{...S.badgeDates},newB:Array.isArray(m.newB)?m.newB.slice():[]};updateAnswerFeedback(r);maybeQualify();}
 else if(mode!=='flash'){ensure();}
 QBASE=null;saveEconomy();},{id:'economy-answer',order:200});
MQHooks.on('mission:end',({m})=>{if(!m)return;const e=ensure(),legacySt=stars(m.ok,m.n);S.xp=Math.max(0,S.xp-legacySt*20);S.coins=Math.max(0,S.coins-legacySt*5);const b=missionBonus(m);S.xp+=b.xp;S.coins+=b.coins;const st=stars(m.ok,m.n),r=m.n?m.ok/m.n:0;
 for(const cid of m.ids||[]){const cs=S.chap?.[cid];if(cs)cs.stars=Math.max(cs.stars||0,st);}
 if(!m.path&&r>=.75&&b.first&&e.daily.missionMeritCount<CFG.missionBonusesPerDay){const mg=Math.min(CFG.missionMeritCap,+S.merit.rules.mission||0);if(mg){addDirectMerit(mg,'Mission réussie (première récompense du jour)',m);e.daily.missionMeritCount++;}if(r>=.999){const pg=Math.min(CFG.perfectMeritCap,+S.merit.rules.perfect||0);if(pg)addDirectMerit(pg,'Sans faute (première récompense de la mission)',m);}}
 noteDueReviews(m);if(m.path&&S.path?.chest)e.daily.pathDone=true;maybeQualify();
 if(SESSION?.lastBadges)restoreBadges(SESSION.lastBadges,m);updateEndScreen(m,b,st);SESSION=null;saveEconomy();},{id:'economy-mission-end',order:200});
MQHooks.on('lesson:end',({l,passed})=>{if(!passed||!l)return;const e=ensure(),t=+S.lessons?.[l.id]||0;if(t&&Date.now()-t<15000)e.daily.lessonNew=true;maybeQualify();saveEconomy();},{id:'economy-lesson-end',order:200});
MQHooks.on('profile:changed',()=>{QBASE=null;SESSION=null;ensure();},{id:'economy-profile',order:200});

installWrappers();ensure();saveEconomy();
root.MQEconomy={version:CFG.version,config:CFG,ensure,fingerprint,quoteQuestion,award,stars,missionBonus,qualifyDay,maybeQualify,get day(){return ensure().daily;}};
})(typeof window!=='undefined'?window:globalThis);
