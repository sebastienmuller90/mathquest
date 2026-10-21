/* Finot Académie — Finot vivant.
   Machine d'états transitoire au-dessus de finotEtat(S) + vestiaire par profil.
   Les émotions ne sont jamais persistées. Seul l'accessoire choisi est sauvegardé et réutilise les seuils
   d'assiduité déjà présents dans le repaire : aucun achat, aucune nouvelle monnaie. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof MQHooks==='undefined'||typeof ACT!=='object')return;
const STATES={
 happy:{img:'bravo',src:'data/images/finot/08-expression-bravo.jpg',text:'Bien joué ! On continue ensemble ?',ttl:4500,priority:30},
 proud:{img:'victoire',src:'data/images/finot/02-expression-victoire.jpg',text:'Je suis fier de toi. Regarde tout ce que tu viens de réussir !',ttl:7000,priority:65},
 thinking:{img:'indice',src:'data/images/finot/07-expression-indice.jpg',text:'Je réfléchis avec toi…',ttl:5000,priority:25},
 encouraging:{img:'encouragement',src:'data/images/finot/03-expression-encouragement.jpg',text:'Continue, tu es en train de progresser.',ttl:6500,priority:45},
 surprised:{img:'surprise',src:'data/images/finot/04-expression-surprise.jpg',text:'Oh ! Il se passe quelque chose de nouveau !',ttl:5500,priority:50},
 celebrating:{img:'cadeau',src:'data/images/finot/11-expression-cadeau.jpg',text:'Bravo ! Ça mérite une vraie célébration !',ttl:9000,priority:80},
 sleeping:{img:'fatigue',src:'data/images/finot/06-expression-fatigue.jpg',text:'Une petite pause peut aussi aider ton cerveau à apprendre.',ttl:6000,priority:20},
 'sad-but-supportive':{img:'encouragement',src:'data/images/finot/03-expression-encouragement.jpg',text:'Cette erreur va t’aider à apprendre. On la répare ensemble ?',ttl:6500,priority:45},
 reading:{img:'carnet',src:'data/images/finot/09-expression-carnet.jpg',text:'Je lis avec toi. Prends le temps de bien comprendre.',ttl:6500,priority:35},
 explaining:{img:'revision',src:'data/images/finot/10-expression-revision.jpg',text:'Je t’explique ça pas à pas.',ttl:6000,priority:40}
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
const ACCESSORIES={
 none:{id:'none',name:'Sans accessoire',emoji:'🦊',img:'',threshold:0},
 scarf:{id:'scarf',name:'Foulard bleu',emoji:'🧣',img:'data/images/finot/ui-objet-foulard.png',threshold:0},
 hat:{id:'hat',name:'Chapeau d’explorateur',emoji:'🎩',img:'data/images/finot/ui-objet-chapeau.png',threshold:7},
 cape:{id:'cape',name:'Cape d’aventurier',emoji:'🧥',img:'data/images/finot/ui-objet-cape.png',threshold:14},
 crown:{id:'crown',name:'Couronne dorée',emoji:'👑',img:'data/images/finot/ui-objet-couronne.png',threshold:30}
};
let CURRENT=null,TIMER=null,SEQ=0,LAST_BEST=null;
const now=()=>Date.now();
const activeProfile=()=>{try{return typeof ACTIVE==='string'?ACTIVE:'';}catch(e){return'';}};
const escF=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function spec(name){return STATES[name]||null;}
function current(){if(!CURRENT)return null;if(CURRENT.profile!==activeProfile()||CURRENT.until<=now()){clear(false);return null;}return CURRENT;}
function base(){try{return typeof finotEtat==='function'&&typeof S==='object'&&S?finotEtat(S):null;}catch(e){return null;}}
function srcFor(name){const s=spec(name);if(!s)return'';try{return s.src||(typeof FINOT_IMG==='object'&&(FINOT_IMG[s.img]||FINOT_IMG.neutre))||'';}catch(e){return s.src||'';}}
function prefs(){if(!S.finotLiving||typeof S.finotLiving!=='object'||Array.isArray(S.finotLiving))S.finotLiving={accessory:'none'};let id=String(S.finotLiving.accessory||'none');const a=ACCESSORIES[id]||ACCESSORIES.none;if((+S.streak?.best||0)<a.threshold)id='none';S.finotLiving.accessory=id;return S.finotLiving;}
function selectedAccessory(){const id=prefs().accessory;return ACCESSORIES[id]||ACCESSORIES.none;}
function unlocked(id){const a=ACCESSORIES[String(id||'')];return !!a&&(+S.streak?.best||0)>=a.threshold;}
function accessoryBadge(host){if(!host)return;const a=selectedAccessory();let badge=host.querySelector(':scope > .mq-finot-worn');if(a.id==='none'){if(badge)badge.remove();return;}if(!badge){badge=document.createElement('span');badge.className='mq-finot-worn';badge.setAttribute('aria-hidden','true');host.appendChild(badge);}const visual=a.img?`<img src="${a.img}" alt="">`:`<span>${a.emoji}</span>`;if(badge.dataset.acc!==a.id){badge.dataset.acc=a.id;badge.innerHTML=visual;}}
function paint(){
 const c=current(),b=base(),img=c?srcFor(c.state):(b?.img||''),text=c?(c.text||spec(c.state)?.text||''):(b?.texte||'');
 const card=document.querySelector('.finot-card');if(card){const im=card.querySelector('img.finot-live');if(im&&img&&im.getAttribute('src')!==img)im.src=img;const inner=card.children&&card.children[1],msg=inner&&inner.querySelector('div');if(msg&&text&&msg.textContent!==text)msg.textContent=text;card.classList.toggle('mq-finot-reacting',!!c);if(c)card.dataset.finotState=c.state;else delete card.dataset.finotState;accessoryBadge(card);}
 const fab=document.querySelector('.finot-fab');if(fab){const im=fab.querySelector('img.finot-live');if(im&&img&&im.getAttribute('src')!==img)im.src=img;fab.classList.toggle('mq-finot-reacting',!!c);if(c)fab.dataset.finotState=c.state;else delete fab.dataset.finotState;accessoryBadge(fab);}
 const head=document.querySelector('#finotchat .fch-head img');if(head&&img&&head.getAttribute('src')!==img)head.src=img;
 injectWardrobe();return c||b;
}
function clear(repaint=true){clearTimeout(TIMER);TIMER=null;CURRENT=null;if(repaint)paint();}
function setState(name,opts={}){const s=spec(name);if(!s||!activeProfile())return false;const old=current(),priority=Number.isFinite(+opts.priority)?+opts.priority:s.priority,force=!!opts.force;if(old&&!force&&old.priority>priority&&old.until>now())return false;const ttl=Math.max(500,Math.min(30000,Number.isFinite(+opts.ttl)?+opts.ttl:s.ttl));CURRENT={id:++SEQ,state:name,text:String(opts.text||s.text||''),priority,profile:activeProfile(),at:now(),until:now()+ttl,event:String(opts.event||'')};clearTimeout(TIMER);TIMER=setTimeout(()=>{if(CURRENT&&CURRENT.id===SEQ)clear(true);},ttl+20);paint();return true;}
function emit(event,payload={}){const m=EVENT_MAP[event];if(!m)return false;const [state,priority]=m;return setState(state,{priority,event,text:payload.text,ttl:payload.ttl,force:payload.force});}
function selectAccessory(id){id=String(id||'none');if(!ACCESSORIES[id]||!unlocked(id)){try{toast('🔒 Cet accessoire n’est pas encore débloqué.');}catch(e){}return false;}prefs().accessory=id;try{saveLocal();}catch(e){}refreshWardrobe();paint();try{toast(id==='none'?'Finot enlève son accessoire.':`${ACCESSORIES[id].emoji} ${ACCESSORIES[id].name} équipé !`);}catch(e){}return true;}
function wardrobeHtml(){const best=+S.streak?.best||0,selected=selectedAccessory().id;return `<section class="finot-wardrobe card"><h2>👗 Le vestiaire de Finot</h2><p class="muted small finot-wardrobe-intro">Choisis un accessoire déjà débloqué grâce à votre assiduité. Cela ne dépense aucune pièce.</p><div class="finot-wardrobe-grid">${Object.values(ACCESSORIES).map(a=>{const on=best>=a.threshold,sel=selected===a.id,visual=a.img?`<img src="${a.img}" alt="">`:`<span>${a.emoji}</span>`;return `<button class="finot-wear ${a.id==='none'?'none':''} ${sel?'on':''} ${on?'':'lock'}" data-a="finotwear:${a.id}" ${on?'':`aria-disabled="true"`} aria-pressed="${sel}">${visual}<div><b>${escF(a.name)}</b><small>${sel?'Porté actuellement':on?'Débloqué':`${a.threshold} jours de suite`}</small></div></button>`;}).join('')}</div></section>`;}
function injectWardrobe(){if(document.querySelector('.finot-wardrobe'))return false;const scene=document.querySelector('img[src*="39-scene-repaire"]');if(!scene)return false;const heads=[...document.querySelectorAll('#app h2.sec')],h=heads.find(x=>/Ce que vous avez débloqué ensemble/i.test(x.textContent||'')),grid=h?.nextElementSibling;if(grid&&grid.classList.contains('grid'))grid.insertAdjacentHTML('afterend',wardrobeHtml());else scene.closest('.card')?.insertAdjacentHTML('afterend',wardrobeHtml());return true;}
function refreshWardrobe(){const old=document.querySelector('.finot-wardrobe');if(old)old.remove();injectWardrobe();}
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
MQHooks.on('home:rendered',()=>{const best=+S.streak?.best||0;if(LAST_BEST!=null&&best>LAST_BEST)emit('streak.new_record');else setTimeout(paint,0);LAST_BEST=best;},{id:'finot-live-home',order:92});
MQHooks.on('profile:changed',()=>{clear(false);LAST_BEST=+S.streak?.best||0;prefs();setTimeout(paint,0);},{id:'finot-live-profile',order:2});
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]')?.dataset?.a||'';if(a==='hint')emit('finot.thinking');if(a==='finot')setTimeout(()=>{paint();injectWardrobe();},320);});
ACT.finotwear=id=>selectAccessory(id);
prefs();LAST_BEST=+S.streak?.best||0;setTimeout(paint,0);
root.MQFinotLive={version:'1.2',states:STATES,eventMap:EVENT_MAP,accessories:ACCESSORIES,setState,emit,paint,clear,missionState,unlocked,selectAccessory,wardrobeHtml,get current(){return current();},get selectedAccessory(){return selectedAccessory().id;}};
})(typeof window!=='undefined'?window:globalThis);
