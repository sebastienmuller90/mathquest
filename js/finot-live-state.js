/* Finot Académie — Finot vivant.
   Machine d'états transitoire au-dessus de finotEtat(S). Aucun état émotionnel négatif n'est persisté.
   Les réactions expirent automatiquement puis l'état naturel (assiduité / retour) reprend. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof MQHooks==='undefined')return;
const STATES={
 happy:{img:'victoire',text:'Bien joué ! On continue ensemble ?',ttl:4500,priority:30},
 proud:{img:'bravo',text:'Je suis fier de toi. Regarde tout ce que tu viens de réussir !',ttl:7000,priority:65},
 thinking:{img:'indice',text:'Je réfléchis avec toi…',ttl:5000,priority:25},
 encouraging:{img:'encouragement',text:'Continue, tu es en train de progresser.',ttl:6500,priority:45},
 surprised:{img:'surprise',text:'Oh ! Il se passe quelque chose de nouveau !',ttl:5500,priority:50},
 celebrating:{img:'victoire',text:'Bravo ! Ça mérite une vraie célébration !',ttl:9000,priority:80},
 sleeping:{img:'fatigue',text:'Une petite pause peut aussi aider ton cerveau à apprendre.',ttl:6000,priority:20},
 'sad-but-supportive':{img:'encouragement',text:'Cette erreur va t’aider à apprendre. On la répare ensemble ?',ttl:6500,priority:45},
 reading:{img:'carnet',text:'Je lis avec toi. Prends le temps de bien comprendre.',ttl:6500,priority:35},
 explaining:{img:'revision',text:'Je t’explique ça pas à pas.',ttl:6000,priority:40}
};
const EVENT_MAP={
 'exercise.correct':['happy',30],
 'exercise.failed':['sad-but-supportive',45],
 'exercise.perfect':['celebrating',80],
 'chapter.mastered':['proud',90],
 'streak.new_record':['celebrating',95],
 'error.repaired':['proud',85],
 'daily.return':['happy',55],
 'quiz.completed':['proud',65],
 'mission.completed':['proud',65],
 'lesson.reading':['reading',35],
 'finot.thinking':['thinking',25],
 'finot.explaining':['explaining',40]
};
let CURRENT=null,TIMER=null,SEQ=0;
const now=()=>Date.now();
const activeProfile=()=>{try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}};
function spec(name){return STATES[name]||null;}
function current(){if(!CURRENT)return null;if(CURRENT.profile!==activeProfile()||CURRENT.until<=now()){clear(false);return null;}return CURRENT;}
function base(){try{return typeof finotEtat==='function'&&typeof S==='object'&&S?finotEtat(S):null;}catch(e){return null;}}
function srcFor(name){const s=spec(name);try{return s&&typeof FINOT_IMG==='object'?(FINOT_IMG[s.img]||FINOT_IMG.neutre||''):'';}catch(e){return'';}}
function paint(){
 const c=current(),b=base(),img=c?srcFor(c.state):(b?.img||''),text=c?(c.text||spec(c.state)?.text||''):(b?.texte||'');
 const card=document.querySelector('.finot-card');if(card){const im=card.querySelector('img.finot-live');if(im&&img)im.src=img;const inner=card.children&&card.children[1],msg=inner&&inner.querySelector('div');if(msg&&text)msg.textContent=text;card.classList.toggle('mq-finot-reacting',!!c);if(c)card.dataset.finotState=c.state;else delete card.dataset.finotState;}
 const fab=document.querySelector('.finot-fab');if(fab){const im=fab.querySelector('img.finot-live');if(im&&img)im.src=img;fab.classList.toggle('mq-finot-reacting',!!c);if(c)fab.dataset.finotState=c.state;else delete fab.dataset.finotState;}
 const head=document.querySelector('#finotchat .fch-head img');if(head&&img)head.src=img;
 return c||b;
}
function clear(repaint=true){clearTimeout(TIMER);TIMER=null;CURRENT=null;if(repaint)paint();}
function setState(name,opts={}){const s=spec(name);if(!s||!activeProfile())return false;const old=current(),priority=Number.isFinite(+opts.priority)?+opts.priority:s.priority,force=!!opts.force;if(old&&!force&&old.priority>priority&&old.until>now())return false;const ttl=Math.max(500,Math.min(30000,Number.isFinite(+opts.ttl)?+opts.ttl:s.ttl));CURRENT={id:++SEQ,state:name,text:String(opts.text||s.text||''),priority,profile:activeProfile(),at:now(),until:now()+ttl,event:String(opts.event||'')};clearTimeout(TIMER);TIMER=setTimeout(()=>{if(CURRENT&&CURRENT.id===SEQ)clear(true);},ttl+20);paint();return true;}
function emit(event,payload={}){const m=EVENT_MAP[event];if(!m)return false;const [state,priority]=m;return setState(state,{priority,event,text:payload.text,ttl:payload.ttl,force:payload.force});}
function missionState(m){if(!m||!m.n)return'encouraging';const ratio=(+m.ok||0)/Math.max(1,+m.n||1);return ratio>=.999?'celebrating':ratio>=.75?'proud':ratio>=.5?'happy':'encouraging';}
function missionPriority(m){const st=missionState(m);return st==='celebrating'?82:st==='proud'?68:st==='happy'?52:46;}
function answer(x){if(!x)return;if(x.ok)emit('exercise.correct');else emit('exercise.failed');}
function mission({m}={}){if(!m)return;setState(missionState(m),{priority:missionPriority(m),event:'mission.completed'});}
function flash({m,rec}={}){if(rec)emit('streak.new_record',{text:'Nouveau record ! Tu peux être fier de toi.'});else if(m)setState((+m.ok||0)>=8?'proud':'happy',{priority:60,event:'flash.completed'});}
function lessonOpen(){emit('lesson.reading');}
function lessonEnd(){emit('quiz.completed');}
function finotMessage({who}={}){if(who==='finot')emit('finot.explaining');}
function finotOpenState(){emit('finot.thinking');}
MQHooks.on('answer:after',answer,{id:'finot-live-answer',order:92});
MQHooks.on('mission:end',mission,{id:'finot-live-mission',order:92});
MQHooks.on('flash:end',flash,{id:'finot-live-flash',order:92});
MQHooks.on('lesson:open',lessonOpen,{id:'finot-live-lesson-open',order:92});
MQHooks.on('lesson:end',lessonEnd,{id:'finot-live-lesson-end',order:92});
MQHooks.on('finot:open',finotOpenState,{id:'finot-live-chat-open',order:92});
MQHooks.on('finot:message',finotMessage,{id:'finot-live-chat-message',order:92});
MQHooks.on('home:rendered',()=>setTimeout(paint,0),{id:'finot-live-home',order:92});
MQHooks.on('profile:changed',()=>clear(true),{id:'finot-live-profile',order:2});
root.MQFinotLive={version:'1.0',states:STATES,eventMap:EVENT_MAP,setState,emit,paint,clear,missionState,get current(){return current();}};
})(typeof window!=='undefined'?window:globalThis);
