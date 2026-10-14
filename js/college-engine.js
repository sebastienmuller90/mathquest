/* MathQuest — Registre des chapitres collège reconstruits (V8.13).
   Les chapitres sont déclarés dans data/college/*.js au même format que le primaire :
     MQCollege.add('svt','6',[{id,name,icon,domain,refs:[…],tip,c:C(découverte,parties,exemples,méthode,pièges,je retiens),g:d=>question}, …]);
   Les identifiants sont ceux des chapitres existants (svt6a, fr5k, 6p…) : la progression déjà enregistrée est conservée.
   Dépend de js/primary-engine.js (aides de génération communes MQPrimary.H). */
(function(){
'use strict';
const LEVELS=['6','5','4','3'];
const REG={byId:{},list:[]};
function add(subject,level,chapters){
  level=String(level).replace(/e$/,'');
  if(!LEVELS.includes(level))throw new Error('Niveau collège inconnu : '+level);
  for(const c of chapters){
    if(!c||!c.id)throw new Error('Chapitre sans identifiant ('+subject+' '+level+'e)');
    if(REG.byId[c.id])throw new Error('Identifiant de chapitre collège en double : '+c.id);
    if(typeof c.g!=='function')throw new Error('Chapitre sans générateur : '+c.id);
    const full={...c,subject,level,grade:level+'e'};REG.byId[c.id]=full;REG.list.push(full);
  }
}
/* Cours au format « structuré » (même parcours que le primaire : découverte → je comprends → exemples → méthode → attention → je retiens → entraînement → quiz). */
function course(c){const C=c.c||{};const u=(C.u||[]).map((x,i)=>typeof x==='string'?{t:i===0?'Je comprends':'Je comprends (suite)',h:x}:x);
  const ex=(C.ex||[]).map(e=>({q:e.q,s:e.s}));
  return {structured:true,college:true,grade:c.grade,subject:c.subject,domain:c.domain||'',official:true,refs:c.refs||[],
    hook:C.d||'',discover:C.d||'',parts:u,ex:ex[0]||{q:'Exemple',s:['Observe bien.']},examples:ex,
    method:C.m||[],traps:C.a||[],piege:(C.a||[]).map(x=>`<p>${x}</p>`).join(''),retenir:C.r||[],objectives:C.obj||C.r||[],
    tip:c.tip||''};}
function chapter(c){const C=c.c||{};return {id:c.id,name:c.name,icon:c.icon||'📘',domain:c.domain||'',official:true,rebuilt:true,grade:c.grade,subject:c.subject,tip:c.tip||'',
  f:{t:c.name,l:(C.r||[]).slice(0,4),ex:(C.ex&&C.ex[0]&&C.ex[0].q)||''},g:c.g};}
/* Enrichissement d'un chapitre collège historique (défini dans index.html ou data/*.js) : banque de questions supplémentaires
   mêlée au générateur d'origine. Les demandes sont mémorisées puis appliquées par index.html une fois les chapitres construits. */
const ENRICH=[];
function enrich(id,o){ENRICH.push([id,o]);}
function applyEnrich(chmap){let n=0;for(const [id,o] of ENRICH){const c=chmap[id];if(!c||!o.items||!o.items.length)continue;const H=window.MQPrimary.H;const g0=c.g,gb=H.bank(o.items),w=o.w??.5;c.g=d=>Math.random()<w?gb(d):g0(d);c.enriched=true;n++;}return n;}
window.MQCollege={version:'2026-2027.1',LEVELS,add,enrich,applyEnrich,course,chapter,byId:REG.byId,list:REG.list,
  get H(){return window.MQPrimary&&window.MQPrimary.H;}};
})();
