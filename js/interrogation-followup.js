/* MathQuest — isolation interrogation + correctifs de reprise et de suivi des exercices nivelés. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function boot(){
 if(!window.MQInterrogation||!window.MQPedagogy||typeof ACT!=='object'||!window.MQActivity){setTimeout(boot,80);return;}
 if(window.MQInterrogation.uiIsolation)return;
 const st=document.createElement('style');st.textContent='body.iq-mode .finot-fab,body.iq-mode #finotchat,body.iq-mode #hometabs{display:none!important}';document.head.appendChild(st);

 // Les questions d'interrogation sont régénérées depuis une graine stable avant affichage. Ainsi le nettoyage
 // de sauvegarde peut altérer les chaînes HTML/SVG persistées sans jamais altérer la question reprise.
 function prepareQuestions(a){if(!a||!Array.isArray(a.questions)||!window.MQQuestionRotation?.generateSeeded)return false;for(let i=0;i<a.questions.length;i++){const it=a.questions[i];if(!it||!CHMAP[it.cid]||typeof CHMAP[it.cid].g!=='function')return false;it.d=Math.max(1,Math.min(3,+it.d||2));it.seed=String(it.seed||`${a.id||'iq'}|${i}`).replace(/[^\w|:.-]/g,'').slice(0,100);const oldSel=Array.isArray(it.q?._sel)?it.q._sel.slice():null;const q=MQQuestionRotation.generateSeeded(it.cid,it.d,'interrogation',it.seed),out=JSON.parse(JSON.stringify(q));delete out.expl;delete out.hint;if(oldSel&&out.type==='order')out._sel=oldSel.filter(x=>Number.isInteger(x)&&x>=0&&x<(out.tokens||[]).length);it.q=out;}return true;}
 const baseStart=window.MQInterrogation.start;
 function begin(){try{if(typeof M!=='undefined')M=null;if(typeof L!=='undefined')L=null;if(typeof padClose==='function')padClose();if(typeof finotClose==='function')finotClose();}catch(e){}const a=window.MQInterrogation.ensure().active;if(a&&!prepareQuestions(a)){a.status='cancelled';window.MQInterrogation.ensure().active=null;try{save();}catch(e){}return typeof home==='function'?home():null;}if(window.MQActivity&&a)MQActivity.begin('interrogation',a.studiedChapters||a.questions?.map(x=>x.cid)||[],{interrogationId:a.id});document.body.classList.add('iq-mode');return baseStart();}
 ACT.iqstart=begin;window.MQInterrogation.start=begin;window.MQInterrogation.prepareQuestions=prepareQuestions;

 // Un exercice choisi via Facile/Moyen/Difficile contournait startMission(). On branche explicitement les
 // mêmes traces « étudié aujourd'hui » et journal de séance avant de lancer le moteur nivelé.
 const baseLevel=MQPedagogy.startMissionAtLevel;
 function trackedLevel(id,d){if(window.MQInterrogation?.markStudy)MQInterrogation.markStudy(id,'exercise-open');if(window.MQActivity)MQActivity.begin('exercise',[id],{mixed:false,forcedDifficulty:+d||2});return baseLevel(id,d);}
 MQPedagogy.startMissionAtLevel=trackedLevel;
 ACT.startlevel=x=>{const [id,d]=String(x).split('|');trackedLevel(id,+d);};
 if(typeof ACT.finoteasyex==='function')ACT.finoteasyex=()=>{const id=typeof finotCurrentChapterId==='function'?finotCurrentChapterId():null;if(!id)return typeof ACT.finotsimple==='function'?ACT.finotsimple():null;if(typeof finotClose==='function')finotClose();trackedLevel(id,1);};

 let was=false;
 const sync=()=>{const on=typeof CUR!=='undefined'&&CUR==='interrogation';if(on){document.body.classList.add('iq-mode');was=true;}else if(was){document.body.classList.remove('iq-mode');if(window.MQActivity&&MQActivity.active()?.kind==='interrogation')MQActivity.close('interrogation-end');was=false;}};
 new MutationObserver(sync).observe(document.getElementById('app'),{childList:true,subtree:false});
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&document.body.classList.contains('iq-mode')&&window.MQActivity&&MQActivity.active()?.kind==='interrogation')MQActivity.close('hidden');});
 window.MQInterrogation.uiIsolation='1.1';sync();
}
boot();
})();
