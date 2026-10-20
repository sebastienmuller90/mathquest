/* MathQuest — applique une densité d'interface selon la classe. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function grade(){try{return typeof S!=='undefined'&&S?String(S.grade||''):'';}catch(e){return'';}}
function group(){const g=grade();if(['CP','CE1','CE2'].includes(g))return'young';if(['CM1','CM2','6e'].includes(g))return'bridge';if(['5e','4e','3e'].includes(g))return'teen';return'bridge';}
function apply(){const g=group();document.body.dataset.mqAge=g;document.documentElement.dataset.mqGrade=grade();return g;}
for(const name of ['home','worldScreen','coursesScreen','parentScreen'])if(typeof window[name]==='function'&&!window[name].__mqAge){const base=window[name];const wrap=function(){apply();return base.apply(this,arguments);};wrap.__mqAge=true;window[name]=wrap;}
if(typeof activateProfile==='function'&&!activateProfile.__mqAge){const base=activateProfile;activateProfile=function(){const r=base.apply(this,arguments);apply();return r;};activateProfile.__mqAge=true;}
new MutationObserver(apply).observe(document.body,{childList:true,subtree:false});apply();
window.MQAgeUI={version:'1.1',grade,group,apply};
})();