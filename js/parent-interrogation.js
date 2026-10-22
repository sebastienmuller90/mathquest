/* Extension de parent.html : commande d'interrogation sur le travail du jour uniquement. */
(function(){
'use strict';
function start(){
 if(typeof render!=='function'||typeof ACT!=='object'||typeof act!=='function'||typeof app==='undefined'){setTimeout(start,100);return;}

 const dayStart=()=>{const d=new Date();d.setHours(0,0,0,0);return d.getTime();};
 const localDay=()=>{const d=new Date(),p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;};
 function chapterMap(){const m={};try{for(const c of ALLCH||[])m[c.id]=c;}catch(e){}return m;}
 function todayIds(){const S=D&&D.data||{},st=dayStart(),ids=new Set(),cm=chapterMap();for(const x of (S.studyLog||[]))if(x&&+x.t>=st&&cm[x.cid])ids.add(x.cid);for(const x of (S.answerLog||[]))if(x&&+x.t>=st&&cm[x.cid])ids.add(x.cid);for(const [id,t] of Object.entries(S.lessons||{}))if(+t>=st&&cm[id])ids.add(id);const p=S.path;if(p&&p.date===localDay()&&Array.isArray(p.steps)){for(const s of p.steps){if(s.kind==='lesson'&&s.cid&&s.status!=='locked'&&cm[s.cid])ids.add(s.cid);if(s.kind==='exo'&&s.status!=='locked')for(const id of (s.ids||[]))if(cm[id])ids.add(id);}}return [...ids];}
 function panel(){
  var state=(D&&D.data&&D.data.interrogations)||{active:null,history:[]},active=state.active,history=Array.isArray(state.history)?state.history:[],latest=history.find(x=>x&&x.status!=='cancelled'),pending=Array.isArray(D&&D.pending)&&D.pending.some(x=>x.kind==='interrogation'),ids=todayIds(),cm=chapterMap();
  var html='<section class="pp-iq"><h2 class="sec parent-iq-title">📝 Interrogation parent</h2><div class="card parent-iq"><p class="muted">Le contrôle porte uniquement sur les notions travaillées aujourd’hui dans Finot Académie. Il ne donne ni XP, ni pièces, ni indice, ni correction immédiate.</p>';
  if(ids.length)html+='<div class="note"><b>'+ids.length+' notion'+(ids.length>1?'s':'')+' étudiée'+(ids.length>1?'s':'')+' aujourd’hui</b><br><span class="small">'+ids.slice(0,10).map(id=>esc((cm[id]&&cm[id].name)||id)).join(' · ')+(ids.length>10?'…':'')+'</span></div>';
  else html+='<div class="note">ℹ️ Rien n’a encore été étudié aujourd’hui. Le bouton d’interrogation sera disponible après une leçon ou des exercices.</div>';
  if(pending)html+='<div class="note">⏳ Ordre envoyé. Il sera reçu à la prochaine synchronisation de l’application enfant.</div>';
  else if(active&&(active.status==='pending'||active.status==='in_progress')){
   html+='<div class="note"><b>'+(active.status==='pending'?'⏳ Prête':'🟠 En cours')+'</b> · '+(active.questions?active.questions.length:0)+' questions';if(active.status==='in_progress')html+=' · '+(active.i||0)+'/'+(active.questions?active.questions.length:0)+' répondues';html+='</div>';if(active.status==='pending')html+='<button class="btn danger wide" data-a="iqremotecancel">Annuler</button>';
  }else if(ids.length){html+='<label class="frow"><span class="grow">Nombre de questions</span><select id="iqremoteN" class="fld"><option>10</option><option selected>20</option><option>30</option><option>40</option></select></label><button class="btn primary wide" data-a="iqremotecreate">Générer sur le travail du jour</button>';}
  html+='</div>';
  if(latest){html+='<div class="card"><b>Dernier résultat : '+latest.score+' % · '+latest.ok+'/'+latest.total+'</b>';if(latest.subjects)Object.keys(latest.subjects).forEach(k=>{var x=latest.subjects[k];html+='<div class="drow"><span>'+esc(x.name)+'</span><b>'+x.score+' %</b></div>';});html+='</div>';}
  return html+'</section>';
 }
 MQHooks.on('parent:remote-rendered',()=>{if(TAB==='suivi'&&D&&!document.querySelector('.parent-iq-title'))app.insertAdjacentHTML('beforeend',panel());},{id:'parent-interrogation'});
 ACT.iqremotecreate=function(){var ids=todayIds();if(!ids.length)return toast('Aucune notion étudiée aujourd’hui.');var n=parseInt(document.getElementById('iqremoteN')&&document.getElementById('iqremoteN').value)||20;act('interrogation',{n:n,scope:'today'},'📝 Interrogation du jour envoyée');};
 ACT.iqremotecancel=function(){act('interrogation_cancel',{},'Interrogation annulée');};
 render();
}
start();
})();
