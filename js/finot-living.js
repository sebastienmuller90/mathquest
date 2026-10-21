/* Finot Académie — Finot vivant : états contextuels et accessoires sélectionnés.
   Les émotions sont éphémères et ne modifient jamais la progression. Seul l'accessoire choisi est sauvegardé par profil. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object'||!window.MQHooks)return;
const STATES={
 happy:{img:'data/images/finot/08-expression-bravo.jpg',emoji:'😊',label:'Content'},
 proud:{img:'data/images/finot/02-expression-victoire.jpg',emoji:'⭐',label:'Fier'},
 thinking:{img:'data/images/finot/07-expression-indice.jpg',emoji:'🤔',label:'Réfléchit'},
 encouraging:{img:'data/images/finot/03-expression-encouragement.jpg',emoji:'💪',label:'Encourage'},
 surprised:{img:'data/images/finot/04-expression-surprise.jpg',emoji:'😮',label:'Surpris'},
 celebrating:{img:'data/images/finot/11-expression-cadeau.jpg',emoji:'🎉',label:'Fête ta réussite'},
 sleeping:{img:'data/images/finot/06-expression-fatigue.jpg',emoji:'💤',label:'Se repose'},
 'sad-but-supportive':{img:'data/images/finot/05-expression-tristesse.jpg',emoji:'💛',label:'Reste avec toi'},
 reading:{img:'data/images/finot/09-expression-carnet.jpg',emoji:'📖',label:'Lit avec toi'},
 explaining:{img:'data/images/finot/10-expression-revision.jpg',emoji:'💡',label:'Explique'}
};
const ACCESSORIES={
 none:{id:'none',name:'Sans accessoire',emoji:'🦊',img:'',threshold:0},
 scarf:{id:'scarf',name:'Foulard bleu',emoji:'🧣',img:'data/images/finot/ui-objet-foulard.png',threshold:0},
 hat:{id:'hat',name:'Chapeau d’explorateur',emoji:'🎩',img:'data/images/finot/ui-objet-chapeau.png',threshold:7},
 cape:{id:'cape',name:'Cape d’aventurier',emoji:'🧥',img:'data/images/finot/ui-objet-cape.png',threshold:14},
 crown:{id:'crown',name:'Couronne dorée',emoji:'👑',img:'data/images/finot/ui-objet-couronne.png',threshold:30}
};
const EVENT_STATE={
 'exercise.correct':['happy',2200],
 'exercise.failed':['sad-but-supportive',3600],
 'exercise.perfect':['celebrating',6500],
 'chapter.mastered':['proud',6500],
 'streak.new_record':['surprised',5000],
 'error.repaired':['celebrating',6000],
 'daily.return':['happy',3500],
 'quiz.completed':['proud',5000],
 'mission.completed':['proud',5000],
 'lesson.open':['reading',0],
 'finot.explaining':['explaining',5000],
 'hint.open':['thinking',4000]
};
let CURRENT={name:'happy',reason:'boot',until:0},TIMER=null,LAST_STREAK=null,OBS=null;
const escL=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function prefs(){if(!S.finotLiving||typeof S.finotLiving!=='object'||Array.isArray(S.finotLiving))S.finotLiving={accessory:'none'};let id=String(S.finotLiving.accessory||'none');const a=ACCESSORIES[id]||ACCESSORIES.none,best=+S.streak?.best||0;if(a.threshold>best)id='none';S.finotLiving.accessory=id;return S.finotLiving;}
function accessory(){const p=prefs();return ACCESSORIES[p.accessory]||ACCESSORIES.none;}
function naturalState(){const h=new Date().getHours();if(h>=21||h<6)return'sleeping';try{if(typeof L!=='undefined'&&L)return'reading';}catch(e){}return'encouraging';}
function state(){if(CURRENT.until&&Date.now()>CURRENT.until){CURRENT={name:naturalState(),reason:'context',until:0};}return STATES[CURRENT.name]?CURRENT:{name:'encouraging',reason:'fallback',until:0};}
function cleanWrappers(){document.querySelectorAll('.finot-live-wrap').forEach(w=>{if(!w.querySelector('img.finot-live'))w.remove();});}
function expressionTargets(){return [...document.querySelectorAll('img.finot-live')].filter(img=>/\/finot\/\d{2}-expression-[^/]+\.jpg(?:$|[?#])/i.test(img.getAttribute('src')||img.src||''));}
function decorate(img){
 if(!img||!img.isConnected)return;const st=state(),def=STATES[st.name],a=accessory();if(!def)return;
 if(img.getAttribute('src')!==def.img)img.setAttribute('src',def.img);img.dataset.finotState=st.name;img.alt=img.alt||'';
 let wrap=img.closest('.finot-live-wrap');if(!wrap){wrap=document.createElement('span');wrap.className='finot-live-wrap';img.parentNode?.insertBefore(wrap,img);wrap.appendChild(img);}
 const wantedLabel=`Finot : ${def.label||st.name}${a.id!=='none'?`, ${a.name}`:''}`,same=wrap.dataset.finotState===st.name&&wrap.dataset.finotAccessory===a.id;
 if(same&&wrap.getAttribute('aria-label')===wantedLabel)return;
 wrap.dataset.finotState=st.name;wrap.dataset.finotAccessory=a.id;wrap.setAttribute('aria-label',wantedLabel);
 let mood=wrap.querySelector(':scope > .finot-mood-badge');if(!mood){mood=document.createElement('span');mood.className='finot-mood-badge';mood.setAttribute('aria-hidden','true');wrap.appendChild(mood);}if(mood.textContent!==(def.emoji||'🦊'))mood.textContent=def.emoji||'🦊';
 let badge=wrap.querySelector(':scope > .finot-accessory-badge');if(a.id==='none'){if(badge)badge.remove();}else{if(!badge){badge=document.createElement('span');badge.className='finot-accessory-badge';badge.setAttribute('aria-hidden','true');wrap.appendChild(badge);}const key=a.img?`img:${a.img}`:`emoji:${a.emoji}`;if(badge.dataset.visual!==key){badge.dataset.visual=key;badge.innerHTML=a.img?`<img src="${a.img}" alt="">`:`<span>${a.emoji}</span>`;}}
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){img.classList.remove('finot-state-pop');void img.offsetWidth;img.classList.add('finot-state-pop');}
}
function paint(){cleanWrappers();for(const img of expressionTargets())decorate(img);injectWardrobe();}
function setState(name,{ttl=0,reason='manual'}={}){if(!STATES[name])return false;clearTimeout(TIMER);CURRENT={name,reason,until:ttl>0?Date.now()+ttl:0};paint();if(ttl>0)TIMER=setTimeout(()=>{CURRENT={name:naturalState(),reason:'context',until:0};paint();},ttl+20);return true;}
function emit(event,payload={}){const spec=EVENT_STATE[event];if(!spec)return false;const [name,ttl]=spec;return setState(name,{ttl,reason:event,payload});}
function unlocked(id){const a=ACCESSORIES[id];return !!a&&(+S.streak?.best||0)>=a.threshold;}
function selectAccessory(id){id=String(id||'none');if(!ACCESSORIES[id]||!unlocked(id)){try{toast('🔒 Cet accessoire n’est pas encore débloqué.');}catch(e){}return false;}prefs().accessory=id;try{saveLocal();}catch(e){}paint();try{toast(id==='none'?'Finot enlève son accessoire.':`${ACCESSORIES[id].emoji} ${ACCESSORIES[id].name} équipé !`);}catch(e){}return true;}
function wardrobeHtml(){const best=+S.streak?.best||0,selected=accessory().id;return `<section class="finot-wardrobe card"><h2>👗 Le vestiaire de Finot</h2><p class="muted small finot-wardrobe-intro">Choisis un accessoire déjà débloqué grâce à votre assiduité. Cela ne dépense aucune pièce.</p><div class="finot-wardrobe-grid">${Object.values(ACCESSORIES).map(a=>{const on=best>=a.threshold,sel=selected===a.id,visual=a.img?`<img src="${a.img}" alt="">`:`<span>${a.emoji}</span>`;return `<button class="finot-wear ${a.id==='none'?'none':''} ${sel?'on':''} ${on?'':'lock'}" data-a="finotwear:${a.id}" ${on?'':`aria-disabled="true"`} aria-pressed="${sel}">${visual}<div><b>${escL(a.name)}</b><small>${sel?'Porté actuellement':on?'Débloqué':`${a.threshold} jours de suite`}</small></div></button>`;}).join('')}</div></section>`;}
function injectWardrobe(){if(document.querySelector('.finot-wardrobe'))return;const scene=document.querySelector('img[src*="39-scene-repaire"]');if(!scene)return;const heads=[...document.querySelectorAll('#app h2.sec')],h=heads.find(x=>/Ce que vous avez débloqué ensemble/i.test(x.textContent||'')),grid=h?.nextElementSibling;if(grid&&grid.classList.contains('grid'))grid.insertAdjacentHTML('afterend',wardrobeHtml());else scene.closest('.card')?.insertAdjacentHTML('afterend',wardrobeHtml());}
function missionReaction(m){const n=Math.max(1,+m?.n||8),ok=Math.max(0,+m?.ok||0);if(ok>=n)return emit('exercise.perfect',{m});if(ok/n>=.75)return setState('proud',{ttl:5200,reason:'mission.good'});return setState('encouraging',{ttl:4200,reason:'mission.keep-going'});}
MQHooks.on('answer:after',x=>emit(x?.ok?'exercise.correct':'exercise.failed',x||{}),{id:'finot-living-answer',order:110});
MQHooks.on('mission:end',({m}={})=>{missionReaction(m);},{id:'finot-living-mission',order:110});
MQHooks.on('flash:end',({rec}={})=>emit(rec?'streak.new_record':'mission.completed'),{id:'finot-living-flash',order:110});
MQHooks.on('lesson:open',()=>emit('lesson.open'),{id:'finot-living-lesson-open',order:110});
MQHooks.on('lesson:end',({passed}={})=>setState(passed?'proud':'encouraging',{ttl:4500,reason:'lesson.end'}),{id:'finot-living-lesson-end',order:110});
MQHooks.on('finot:intent',()=>{emit('finot.explaining');return false;},{id:'finot-living-explain',order:200});
MQHooks.on('home:rendered',()=>{const best=+S.streak?.best||0;if(LAST_STREAK!=null&&best>LAST_STREAK)emit('streak.new_record');else if(!CURRENT.until)setState(naturalState(),{reason:'home'});LAST_STREAK=best;setTimeout(paint,0);},{id:'finot-living-home',order:200});
MQHooks.on('profile:changed',()=>{clearTimeout(TIMER);CURRENT={name:naturalState(),reason:'profile',until:0};LAST_STREAK=+S.streak?.best||0;prefs();setTimeout(paint,0);},{id:'finot-living-profile',order:200});
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]')?.dataset?.a||'';if(a==='hint')emit('hint.open');if(a==='finot')setTimeout(injectWardrobe,320);});
ACT.finotwear=id=>selectAccessory(String(id||'none'));
if(window.MutationObserver){const root=document.getElementById('app');if(root){OBS=new MutationObserver(()=>{clearTimeout(OBS._t);OBS._t=setTimeout(paint,30);});OBS.observe(root,{childList:true,subtree:true});}}
prefs();LAST_STREAK=+S.streak?.best||0;setTimeout(paint,0);
window.MQFinotLiving={version:'1.1',states:STATES,accessories:ACCESSORIES,eventMap:EVENT_STATE,state,setState,emit,paint,unlocked,selectAccessory,wardrobeHtml,get current(){return {...state()};},get selectedAccessory(){return accessory().id;}};
})();
