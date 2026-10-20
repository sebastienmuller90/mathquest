/* Extension de parent.html : commande d'interrogation. */
(function(){
'use strict';
function start(){
 if(typeof render!=='function'||typeof ACT!=='object'||typeof act!=='function'||typeof app==='undefined'){setTimeout(start,100);return;}
 if(render.__parentInterrogation)return;
 function panel(){
  var state=(D&&D.data&&D.data.interrogations)||{active:null,history:[]};
  var active=state.active;
  var history=Array.isArray(state.history)?state.history:[];
  var latest=history.find(function(x){return x&&x.status!=='cancelled';});
  var pending=Array.isArray(D&&D.pending)&&D.pending.some(function(x){return x.kind==='interrogation';});
  var html='<h2 class="sec parent-iq-title">📝 Interrogation parent</h2><div class="card parent-iq"><p class="muted">Interrogation surprise sans XP, sans pièces, sans indice et sans correction immédiate.</p>';
  if(pending)html+='<div class="note">⏳ Ordre envoyé. Il sera reçu à la prochaine synchronisation de l’application enfant.</div>';
  else if(active&&(active.status==='pending'||active.status==='in_progress')){
   html+='<div class="note"><b>'+(active.status==='pending'?'⏳ Prête':'🟠 En cours')+'</b> · '+(active.questions?active.questions.length:0)+' questions';
   if(active.status==='in_progress')html+=' · '+(active.i||0)+'/'+(active.questions?active.questions.length:0)+' répondues';
   html+='</div>';
   if(active.status==='pending')html+='<button class="btn danger wide" data-a="iqremotecancel">Annuler</button>';
  }else{
   html+='<label class="frow"><span class="grow">Nombre de questions</span><select id="iqremoteN" class="fld"><option>10</option><option selected>20</option><option>30</option><option>40</option></select></label><button class="btn primary wide" data-a="iqremotecreate">Envoyer l’interrogation</button>';
  }
  html+='</div>';
  if(latest){html+='<div class="card"><b>Dernier résultat : '+latest.score+' % · '+latest.ok+'/'+latest.total+'</b>';
   if(latest.subjects)Object.keys(latest.subjects).forEach(function(k){var x=latest.subjects[k];html+='<div class="drow"><span>'+esc(x.name)+'</span><b>'+x.score+' %</b></div>';});
   html+='</div>';
  }
  return html;
 }
 var original=render;
 render=function(){var r=original.apply(this,arguments);if(TAB==='suivi'&&D&&!document.querySelector('.parent-iq-title'))app.insertAdjacentHTML('beforeend',panel());return r;};
 render.__parentInterrogation=true;
 ACT.iqremotecreate=function(){var n=parseInt(document.getElementById('iqremoteN')&&document.getElementById('iqremoteN').value)||20;act('interrogation',{n:n},'📝 Interrogation envoyée');};
 ACT.iqremotecancel=function(){act('interrogation_cancel',{},'Interrogation annulée');};
 render();
}
start();
})();
