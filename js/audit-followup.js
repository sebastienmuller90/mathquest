/* MathQuest — compléments de l'audit 20/10/2026 : adaptation par chapitre et compatibilité parent legacy. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function fixApp(){
 if(typeof S==='undefined'||typeof ACT==='undefined'||typeof MQAdaptive==='undefined')return;
 // Le combo visible reste global, mais la difficulté utilise un streak propre à chaque chapitre.
 if(typeof startMission==='function'&&!startMission.__perChapterStreak){const baseStart=startMission;const fixed=function(ids){baseStart(ids);if(M&&!M.flash){M.streakById=Object.fromEntries((M.ids||[]).map(id=>[id,0]));}};fixed.__perChapterStreak=true;startMission=fixed;}
 if(typeof result==='function'&&!result.__perChapterStreak){const baseResult=result;const fixed=function(ok){const cid=M&&M.cid,d0=M&&M.d,s0=M&&M.streakById?(M.streakById[cid]||0):0;baseResult(ok);if(cid&&M&&M.streakById&&M.dById){const s=ok?s0+1:0;M.streakById[cid]=s;M.dById[cid]=MQAdaptive.nextDifficulty(d0,ok,s);M.d=M.dById[cid];}};fixed.__perChapterStreak=true;result=fixed;}
}
function fixParent(){
 if(typeof D==='undefined'||typeof SUBJECTS==='undefined'||typeof WCH==='undefined'||typeof WALL==='undefined'||typeof WMAP==='undefined'||typeof ALLCH==='undefined')return;
 if(SUBJECTS.some(x=>x.id==='emc'))return;
 const grades=['6','5','4','3'],worlds=[];
 for(const l of grades){const hg='hg'+l,emc='emc'+l;let list=[];
  if(typeof CH_EMC!=='undefined'&&CH_EMC[emc])list=CH_EMC[emc].slice();
  else if(Array.isArray(WCH[hg])){list=WCH[hg].filter(c=>c&&c.tag==='E');if(list.length)WCH[hg]=WCH[hg].filter(c=>!list.includes(c));}
  if(!list.length)continue;
  const old=(typeof WORLDS_EMC!=='undefined'&&Array.isArray(WORLDS_EMC))?WORLDS_EMC.find(w=>w.id===emc):null;
  const w=old||{id:emc,lvl:l+'e',name:'EMC '+l+'e',emoji:'⚖️',col:'#7c3aed'};WCH[emc]=list;worlds.push(w);if(!WALL.some(x=>x.id===emc))WALL.push(w);list.forEach(c=>WMAP[c.id]=w);
 }
 if(worlds.length){SUBJECTS.push({id:'emc',name:'EMC',emoji:'⚖️',worlds});window.MQ_PARENT_EMC_SPLIT={ok:true,worlds:worlds.map(w=>w.id)};if(typeof render==='function'&&D)render();}
}
function run(){try{if(typeof S!=='undefined'&&typeof ACT!=='undefined')fixApp();else if(typeof D!=='undefined')fixParent();}catch(e){console.error('MathQuest audit follow-up',e);}}
if(document.readyState==='complete')setTimeout(run,0);else window.addEventListener('load',()=>setTimeout(run,1),{once:true});
})();
