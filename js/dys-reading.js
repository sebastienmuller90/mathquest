/* Finot Académie — aides de lecture DYS avancées.
   Complément non destructif de dys-mode.js :
   - syllabes colorées uniquement lorsque le mot entier est segmentable avec le lexique pédagogique connu ;
   - consignes longues découpées visuellement sans reformulation ;
   - lecture guidée mot par mot via MQAudio.speak + onsegment, sans remplacer le lecteur TTS normal. */
(function(root){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;
let SEQ=0,TIMER=0,OBSERVER=null;
const escD=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const active=()=>{try{return window.MQDys?MQDys.ensure():null;}catch(e){return null;}};
const isOn=k=>{const d=active();return !!(d&&d.enabled&&d[k]);};
const langOf=el=>String(el?.closest?.('[lang]')?.getAttribute('lang')||document.documentElement.lang||'fr').toLowerCase().slice(0,2);
const WORD=/\p{L}{2,}/gu;
const SPOKEN_TOKEN=/\s+|[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?|[^\s]/gu;
const SPEAKABLE=/^[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?$/u;

function syllableKeys(){const s=window.MQ_PRONUNCIATION?.syllables||{};return Object.keys(s).map(x=>x.toLocaleLowerCase('fr-FR')).sort((a,b)=>b.length-a.length||a.localeCompare(b));}
function splitKnownWord(word){
 const raw=String(word||''),low=raw.toLocaleLowerCase('fr-FR'),keys=syllableKeys();if(low.length<4||!keys.length)return null;
 const memo=new Map();
 function solve(i){if(i===low.length)return [];if(memo.has(i))return memo.get(i);for(const s of keys){if(!low.startsWith(s,i))continue;const tail=solve(i+s.length);if(tail){const out=[raw.slice(i,i+s.length),...tail];memo.set(i,out);return out;}}memo.set(i,null);return null;}
 const out=solve(0);return out&&out.length>=2?out:null;
}
function excluded(node){const p=node.parentElement;if(!p)return true;return !!p.closest('button,input,textarea,select,option,script,style,pre,code,kbd,svg,.mq-dys-settings,.mq-dys-guide,.mq-dys-steps,.mq-dys-word-syllables,[contenteditable="true"]');}
function syllabifyTextNode(node){
 if(!node?.nodeValue||excluded(node))return false;const text=node.nodeValue;if(!WORD.test(text)){WORD.lastIndex=0;return false;}WORD.lastIndex=0;
 const frag=document.createDocumentFragment();let last=0,changed=false,m;
 while((m=WORD.exec(text))){const w=m[0],parts=splitKnownWord(w);frag.append(document.createTextNode(text.slice(last,m.index)));if(parts){const wrap=document.createElement('span');wrap.className='mq-dys-word-syllables';wrap.dataset.original=w;parts.forEach((s,i)=>{const sp=document.createElement('span');sp.className='mq-dys-syl '+(i%2?'mq-dys-syl-b':'mq-dys-syl-a');sp.textContent=s;wrap.appendChild(sp);});frag.append(wrap);changed=true;}else frag.append(document.createTextNode(w));last=m.index+w.length;}frag.append(document.createTextNode(text.slice(last)));
 if(changed)node.replaceWith(frag);return changed;
}
function decorateSyllables(rootNode=document){
 if(!isOn('syllables'))return clearSyllables(rootNode);
 const selectors='.qtext,.reading-text p,.lesson-reading,.fiche p,.fiche li,.whybox';
 rootNode.querySelectorAll?.(selectors).forEach(el=>{if(langOf(el)!=='fr'||el.closest('.mq-dys-guide,.mq-dys-steps'))return;const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>excluded(n)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(syllabifyTextNode);});
}
function clearSyllables(rootNode=document){rootNode.querySelectorAll?.('.mq-dys-word-syllables').forEach(w=>{const p=w.parentNode;if(!p)return;w.replaceWith(document.createTextNode(w.dataset.original||w.textContent||''));p.normalize();});}

function instructionParts(text){
 const t=String(text||'').replace(/\s+/g,' ').trim();if(t.length<55)return [];
 let parts=(t.match(/[^.!?;:]+[.!?;:]?/g)||[]).map(x=>x.trim()).filter(Boolean);
 if(parts.length<2)parts=t.split(/\s+(?=(?:puis|ensuite|enfin|après cela)\b)/i).map(x=>x.trim()).filter(Boolean);
 return parts.length>=2&&parts.length<=6?parts:[];
}
function clearInstructionSteps(rootNode=document){rootNode.querySelectorAll?.('.mq-dys-steps').forEach(x=>x.remove());}
function decorateInstructions(rootNode=document){
 if(!isOn('simpleInstructions'))return clearInstructionSteps(rootNode);
 rootNode.querySelectorAll?.('.qtext').forEach((el,idx)=>{if(el.nextElementSibling?.classList?.contains('mq-dys-steps'))return;const parts=instructionParts(el.textContent);if(!parts.length)return;const box=document.createElement('div');box.className='mq-dys-steps';box.setAttribute('aria-label','Consigne découpée en étapes');box.innerHTML=`<b>🧩 Consigne en étapes</b><ol>${parts.map(p=>`<li>${escD(p)}</li>`).join('')}</ol>`;el.insertAdjacentElement('afterend',box);});
}

function sourceId(el){if(!el.dataset.dysSource)el.dataset.dysSource='dys'+(++SEQ).toString(36);return el.dataset.dysSource;}
function clearGuideButtons(rootNode=document){rootNode.querySelectorAll?.('.mq-dys-guide-btn,.mq-dys-guide').forEach(x=>x.remove());}
function injectGuideButtons(rootNode=document){
 if(!isOn('wordGuide'))return clearGuideButtons(rootNode);
 rootNode.querySelectorAll?.('.qtext,.reading-text').forEach(el=>{if(el.parentElement?.querySelector(`.mq-dys-guide-btn[data-source="${sourceId(el)}"]`))return;const id=sourceId(el),b=document.createElement('button');b.type='button';b.className='btn mq-dys-guide-btn';b.dataset.a='dysguide:'+id;b.dataset.source=id;b.textContent='🔊 Lecture guidée mot par mot';b.setAttribute('aria-label','Lire ce texte lentement, mot par mot');el.insertAdjacentElement('afterend',b);});
}
function guideTokens(text){return String(text||'').match(SPOKEN_TOKEN)||[];}
function panelFor(el){
 const id=sourceId(el);let panel=document.querySelector(`.mq-dys-guide[data-source="${id}"]`);if(panel)return panel;
 const tokens=guideTokens(el.textContent);panel=document.createElement('div');panel.className='mq-dys-guide';panel.dataset.source=id;panel.setAttribute('aria-label','Lecture guidée');let wi=0;
 const body=tokens.map(t=>{if(/^\s+$/.test(t))return t;if(SPEAKABLE.test(t)){const n=wi++;return `<span class="mq-dys-guide-word" data-word="${n}">${escD(t)}</span>`;}return escD(t);}).join('');
 panel.innerHTML=`<div class="mq-dys-guide-head"><b>🔊 Lecture guidée</b><button type="button" class="btn" data-a="dysguidestop:${id}">Stop</button></div><div class="mq-dys-guide-text">${body}</div>`;
 const btn=document.querySelector(`.mq-dys-guide-btn[data-source="${id}"]`);(btn||el).insertAdjacentElement('afterend',panel);return panel;
}
function stopGuide(id){try{window.MQAudio?.stop?.();}catch(e){}const sel=id?`.mq-dys-guide[data-source="${String(id).replace(/[^a-z0-9_-]/gi,'')}"] .reading`:'.mq-dys-guide .reading';document.querySelectorAll(sel).forEach(x=>x.classList.remove('reading'));}
function guideRead(id){
 const safe=String(id||'').replace(/[^a-z0-9_-]/gi,''),el=document.querySelector(`[data-dys-source="${safe}"]`);if(!el||!isOn('wordGuide')||!window.MQAudio)return false;const panel=panelFor(el),words=[...panel.querySelectorAll('.mq-dys-guide-word')],lang=langOf(el),segs=words.map(w=>({t:w.textContent,l:lang,type:'mot'}));if(!segs.length)return false;
 try{MQAudio.setPrefs?.((S.tts&&S.tts.voices)||{});}catch(e){}
 stopGuide();MQAudio.speak(segs,{slow:true,young:true,onsegment:i=>{words.forEach((w,j)=>w.classList.toggle('reading',j===i));const w=words[i];if(w)try{w.scrollIntoView({block:'nearest',inline:'nearest'});}catch(e){}},onend:()=>words.forEach(w=>w.classList.remove('reading'))});return true;
}

function refresh(rootNode=document){
 const d=active();if(!d||!d.enabled){clearSyllables(rootNode);clearInstructionSteps(rootNode);clearGuideButtons(rootNode);return;}
 if(d.syllables)decorateSyllables(rootNode);else clearSyllables(rootNode);
 if(d.simpleInstructions)decorateInstructions(rootNode);else clearInstructionSteps(rootNode);
 if(d.wordGuide)injectGuideButtons(rootNode);else clearGuideButtons(rootNode);
}
function schedule(){clearTimeout(TIMER);TIMER=setTimeout(()=>refresh(document),20);}
ACT.dysguide=id=>guideRead(id);ACT.dysguidestop=id=>stopGuide(id);
window.addEventListener('mq:dys-change',()=>{stopGuide();schedule();});
if(window.MQHooks){
 ['home:rendered','question:after-render','lesson:open','profile:changed','parent:rendered'].forEach((ev,i)=>MQHooks.on(ev,schedule,{id:'dys-reading-'+i,order:95}));
}
const app=document.getElementById('app');if(app&&window.MutationObserver){OBSERVER=new MutationObserver(schedule);OBSERVER.observe(app,{childList:true,subtree:true});}
schedule();
root.MQDysReading={version:'1.0',splitKnownWord,instructionParts,guideTokens,decorateSyllables,decorateInstructions,injectGuideButtons,guideRead,stopGuide,refresh};
})(typeof window!=='undefined'?window:globalThis);
