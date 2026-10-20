/* MathQuest — isolation du mode interrogation : aucune aide visible, aucune session concurrente. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function boot(){
 if(!window.MQInterrogation||typeof ACT!=='object'){setTimeout(boot,80);return;}
 if(window.MQInterrogation.uiIsolation)return;
 const st=document.createElement('style');st.textContent='body.iq-mode .finot-fab,body.iq-mode #finotchat,body.iq-mode #hometabs{display:none!important}';document.head.appendChild(st);
 const baseStart=window.MQInterrogation.start;
 function begin(){try{if(typeof M!=='undefined')M=null;if(typeof L!=='undefined')L=null;if(typeof padClose==='function')padClose();if(typeof finotClose==='function')finotClose();}catch(e){}const a=window.MQInterrogation.ensure().active;if(window.MQActivity&&a)MQActivity.begin('interrogation',a.studiedChapters||a.questions?.map(x=>x.cid)||[],{interrogationId:a.id});document.body.classList.add('iq-mode');return baseStart();}
 ACT.iqstart=begin;window.MQInterrogation.start=begin;
 let was=false;
 const sync=()=>{const on=typeof CUR!=='undefined'&&CUR==='interrogation';if(on){document.body.classList.add('iq-mode');was=true;}else if(was){document.body.classList.remove('iq-mode');if(window.MQActivity&&MQActivity.active()?.kind==='interrogation')MQActivity.close('interrogation-end');was=false;}};
 new MutationObserver(sync).observe(document.getElementById('app'),{childList:true,subtree:false});
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&document.body.classList.contains('iq-mode')&&window.MQActivity&&MQActivity.active()?.kind==='interrogation')MQActivity.close('hidden');});
 window.MQInterrogation.uiIsolation='1.0';sync();
}
boot();
})();
