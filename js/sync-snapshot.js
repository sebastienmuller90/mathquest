/* Finot Académie — données envoyées au suivi parent à distance (Supabase, mq_push), 31/10/2026.
   Minimisation (enfants) : le snapshot ne contient QUE ce que la page parent distante affiche (parent.html, parent-*.js,
   path-report.js, reading-engine.js), liste vérifiée par tests/sync-privacy.test.js (affichage identique avant/après).
   Ne quittent jamais l'appareil : date de naissance, genre, compagnon, profil d'apprentissage, diagnostic, mode DYS,
   erreurs (énoncés), aide aux devoirs, réponses tapées aux interrogations, messages destinés à l'enfant, économie,
   réglages, codes (PIN, synchronisation). Le profil LOCAL n'est pas modifié : seule la copie envoyée est réduite.
   Toute nouvelle rubrique de la page parent distante doit ajouter ici le champ dont elle a besoin (et son test). */
(function(){
'use strict';
const FIELDS=['name','avatar','grade','xp','totalQ','totalOk','time','streak','daily','dailyGoal','chap','lessons','merit',
 'readingMastery','readingProgress','competencies','activityLog','answerLog','studyLog','interrogations','path','pathHist'];
const MERIT=['pts','total','req','rewards','rules','hist'];
const INTERRO_HIST=['id','status','createdAt','startedAt','finishedAt','studyDate','grade','score','ok','total','subjects'];
const clone=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v));
const pick=(o,keys)=>{const r={};if(o&&typeof o==='object')for(const k of keys)if(k in o)r[k]=clone(o[k]);return r;};

function interrogations(st){if(!st||typeof st!=='object')return st;
 const a=st.active&&typeof st.active==='object'?st.active:null;
 return {
  // La page parent n'affiche que l'état et le nombre de questions de l'interrogation en cours.
  active:a?{...pick(a,['id','status','i','createdAt','studyDate']),questions:(Array.isArray(a.questions)?a.questions:[]).map(q=>({cid:String(q&&q.cid||'')}))}:null,
  // Historique : scores par matière, sans énoncés ni réponses tapées par l'enfant.
  history:(Array.isArray(st.history)?st.history:[]).map(h=>pick(h,INTERRO_HIST))};}

function build(S,now){
 const s=S||{},o={};
 for(const k of FIELDS)if(k in s)o[k]=clone(s[k]);
 o.name=String(s.name||'').slice(0,40);
 if(o.merit)o.merit=pick(s.merit,MERIT);
 if(Array.isArray(o.answerLog))o.answerLog=o.answerLog.map(a=>({t:+a.t||0,cid:String(a.cid||''),ok:!!a.ok,source:String(a.source||'').slice(0,24),ms:Math.max(0,+a.ms||0)}));
 if('interrogations' in o)o.interrogations=interrogations(s.interrogations);
 o.lastSeen=now||Date.now();
 o.syncSchema=1;
 return o;}

window.MQSyncSnapshot=Object.freeze({FIELDS:Object.freeze(FIELDS.slice()),build});
})();
