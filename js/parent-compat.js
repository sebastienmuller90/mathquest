/* parent.html — compatibilité du suivi distant (anciennement appliquée par audit-fixes.js / audit-followup.js, injectés
   dynamiquement). Chargé statiquement après le script principal de parent.html, avant ses extensions :
   EMC redevient une matière distincte de l'histoire-géographie (chapitres marqués tag 'E' dans WCH.hgN). */
(function(){
'use strict';
if(typeof window==='undefined'||typeof D==='undefined'||typeof SUBJECTS==='undefined'||typeof WCH==='undefined')return;
try{if(!SUBJECTS.some(x=>x.id==='emc')&&typeof WALL!=='undefined'&&typeof WMAP!=='undefined'){const worlds=[];
 for(const l of ['6','5','4','3']){const hg='hg'+l,emc='emc'+l;if(!Array.isArray(WCH[hg]))continue;const list=WCH[hg].filter(c=>c&&c.tag==='E');if(!list.length)continue;
  WCH[hg]=WCH[hg].filter(c=>!list.includes(c));const w={id:emc,lvl:l+'e',name:'EMC '+l+'e',emoji:'⚖️',col:'#7c3aed'};WCH[emc]=list;worlds.push(w);if(!WALL.some(x=>x.id===emc))WALL.push(w);list.forEach(c=>WMAP[c.id]=w);}
 if(worlds.length){SUBJECTS.push({id:'emc',name:'EMC',emoji:'⚖️',worlds});window.MQ_PARENT_EMC_SPLIT={ok:true,worlds:worlds.map(w=>w.id)};}}}catch(e){console.error('Compatibilité EMC (parent)',e);}
window.MQ_PARENT_COMPAT='1.0';
if(typeof render==='function'&&D)render();
})();
