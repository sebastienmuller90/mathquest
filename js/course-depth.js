/* Finot Académie — cours approfondis (21/10/2026). Ajoute aux cours les contenus des fichiers
   data/pedagogy/course-depth-*.js (registre window.MQCourseDepth), SANS rien retirer du cours existant :
   - après la dernière partie du cours : une étape « 🔍 » par explication détaillée ; la dernière se termine par le défi
     « À toi » (réponse cachée) et le conseil pour l'adulte qui accompagne ;
   - juste après « Je retiens » (avant la lecture et l'entraînement) : l'encadré facultatif « 🌍 Pour aller plus loin ».
   Abonné à 'lesson:steps' (voir js/app-lesson.js). */
(function(root){
'use strict';
if(typeof MQHooks==='undefined')return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Typographie française : espace insécable après « et avant » : ; ! ? = (pas de guillemet ni de deux-points seul en
// début de ligne sur téléphone). Contenus des lots uniquement (aucun attribut HTML ne contient ces signes).
const nb=s=>String(s??'').replace(/« /g,'« ').replace(/ (»|[:;!?=])/g,' $1');
const get=id=>(root.MQCourseDepth&&root.MQCourseDepth.chapters&&root.MQCourseDepth.chapters[id])||null;
function tryBox(t){return t&&t.q?`<div class="mq-try"><b>✏️ À toi !</b><p>${nb(esc(t.q))}</p>${t.a?`<details><summary>Voir la réponse</summary><p>${nb(esc(t.a))}</p></details>`:''}</div>`:'';}
function adultBox(a){return a?`<details class="mq-adult"><summary>👪 Pour l’adulte qui accompagne</summary><p>${nb(esc(a))}</p></details>`:'';}
function steps(id){const d=get(id);if(!d)return null;const deep=(Array.isArray(d.deep)?d.deep:[]).filter(x=>x&&x.h);
 const out={deep:deep.map((x,i)=>({k:'deep',t:'🔍 '+(x.t||'Je comprends en détail'),h:`<div class="mq-deep">${nb(x.h)}</div>`+(i===deep.length-1?tryBox(d.try)+adultBox(d.adult):''),meta:{kind:'depth',lot:d.lot||''}})),culture:null};
 if(!deep.length&&(d.try||d.adult))out.deep.push({k:'deep',t:'✏️ À toi !',h:tryBox(d.try)+adultBox(d.adult),meta:{kind:'depth',lot:d.lot||''}});
 if(d.culture&&d.culture.h)out.culture={k:'culture',t:'🌍 Pour aller plus loin',h:`<div class="mq-culture"><p class="muted small">Facultatif : pour les curieux qui veulent en savoir plus.</p>${d.culture.t?`<h3>${nb(esc(d.culture.t))}</h3>`:''}${nb(d.culture.h)}</div>`,meta:{kind:'culture',lot:d.lot||''}};
 return out;}
MQHooks.on('lesson:steps',(st,{id})=>{const x=steps(id);if(!x||!Array.isArray(st))return st;const out=st.slice();
 // Explications détaillées : après la dernière partie du cours (à défaut, après la découverte).
 let at=-1;out.forEach((s,i)=>{if(s&&(s.k==='part'||s.k==='disc'))at=i;});out.splice(at+1,0,...x.deep);
 if(x.culture){let c=out.findIndex(s=>s&&s.k==='ret');if(c>=0)c++;else{c=out.findIndex(s=>s&&['read','practice','confidence','quiz'].includes(s.k));if(c<0)c=out.length;}out.splice(c,0,x.culture);}
 return out;},{id:'course-depth',order:150});
root.MQCourseDepthUI={version:'1',get,steps};
})(typeof window!=='undefined'?window:globalThis);
