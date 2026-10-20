/* MathQuest — tableau de bord synthétique dans l'espace parent local. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined')return;
function boot(){
 if(typeof parentScreen!=='function'||typeof ACT!=='object'||typeof S==='undefined'){setTimeout(boot,80);return;}

 let PERIOD='7';
 const startOf=p=>{const n=Date.now(),d=new Date(n);if(p==='today'){d.setHours(0,0,0,0);return d.getTime();}if(p==='7')return n-7*864e5;if(p==='30')return n-30*864e5;if(p==='365')return n-365*864e5;return 0;};
 const fmt=ms=>{const m=Math.round((+ms||0)/60000);return m<60?m+' min':Math.floor(m/60)+' h '+String(m%60).padStart(2,'0');};
 function subject(cid){try{return sOf(WMAP[cid].id);}catch(e){return null;}}
 function metrics(){const since=startOf(PERIOD),answers=(S.answerLog||[]).filter(x=>x&&(+x.t||0)>=since),acts=(S.activityLog||[]).filter(x=>x&&(+x.t0||0)>=since),subs={},chapters=new Set(),lessons=new Set();let ex=0;
  const get=s=>subs[s.id]||(subs[s.id]={id:s.id,name:s.name,emoji:s.emoji||'📘',ms:0,q:0,ok:0});
  for(const a of answers){const s=subject(a.cid);if(!s)continue;const x=get(s);x.q++;if(a.ok)x.ok++;chapters.add(a.cid);}
  for(const a of acts){if(a.kind==='exercise'||a.kind==='flash')ex++;for(const id of (a.ids||[])){chapters.add(id);if(a.kind==='lesson')lessons.add(id);const s=subject(id);if(s)get(s).ms+=Math.round((+a.ms||0)/Math.max(1,(a.ids||[]).length));}}
  for(const [id,t] of Object.entries(S.lessons||{}))if(+t>=since)lessons.add(id);
  if(!acts.length)for(const a of answers){const s=subject(a.cid);if(s)get(s).ms+=Math.min(600000,+a.ms||0);}
  const rows=Object.values(subs).sort((a,b)=>b.ms-a.ms||b.q-a.q),total=rows.reduce((n,x)=>n+x.ms,0),ok=answers.filter(x=>x.ok).length,totalGrade=ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).length,validated=Object.keys(S.lessons||{}).filter(id=>WMAP[id]?.lvl===S.grade).length;
  return {answers,rows,total,acc:answers.length?Math.round(ok/answers.length*100):0,ex,lessons:lessons.size,chapters:chapters.size,progress:totalGrade?Math.round(validated/totalGrade*100):0,validated,totalGrade};}
 function pie(rows,total){if(!total)return '<p class="muted center">Pas encore assez de temps mesuré sur cette période.</p>';let cur=0;const C=['#ff8a3d','#0284c7','#16a34a','#7c3aed','#e11d48','#0891b2','#f59e0b','#4f46e5'];const stops=rows.map((x,i)=>{const a=cur/total*360;cur+=x.ms;return `${C[i%C.length]} ${a}deg ${cur/total*360}deg`;}).join(',');return `<div class="lpd-piebox"><div class="lpd-pie" style="background:conic-gradient(${stops})"></div><div class="lpd-leg">${rows.map((x,i)=>`<div><i style="background:${C[i%C.length]}"></i><span>${esc(x.emoji+' '+x.name)}</span><b>${Math.round(x.ms/total*100)}%</b></div>`).join('')}</div></div>`;}
 function html(){const x=metrics(),labels={today:"Aujourd’hui",'7':'7 jours','30':'30 jours','365':'1 an',all:'Tout'};return `<section class="lpd card"><h2>📊 Vue rapide parent</h2><div class="lpd-period">${Object.entries(labels).map(([k,l])=>`<button class="btn sm2 ${PERIOD===k?'primary':''}" data-a="lpdperiod:${k}">${l}</button>`).join('')}</div><div class="lpd-kpis"><div><span>⏱️ Temps</span><b>${fmt(x.total)}</b></div><div><span>🎮 Exercices</span><b>${x.ex}</b></div><div><span>📖 Leçons</span><b>${x.lessons}</b></div><div><span>✅ Réussite</span><b>${x.answers.length?x.acc+' %':'–'}</b></div><div><span>🧩 Notions</span><b>${x.chapters}</b></div><div><span>📈 Programme</span><b>${x.progress}%</b><small>${x.validated}/${x.totalGrade}</small></div></div><h3>Temps par matière</h3>${pie(x.rows,x.total)}</section>`;}
 function css(){if(document.getElementById('lpdCss'))return;const s=document.createElement('style');s.id='lpdCss';s.textContent=`.lpd{margin-bottom:14px}.lpd-period{display:flex;gap:6px;flex-wrap:wrap}.lpd-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.lpd-kpis>div{background:var(--surface2);border-radius:14px;padding:10px;text-align:center}.lpd-kpis span,.lpd-kpis small{display:block;color:var(--muted);font-size:13px}.lpd-kpis b{font:600 22px 'Fredoka',sans-serif}.lpd-piebox{display:flex;align-items:center;gap:16px;flex-wrap:wrap}.lpd-pie{width:150px;height:150px;border-radius:50%;position:relative}.lpd-pie:after{content:'';position:absolute;inset:34px;background:var(--surface);border-radius:50%}.lpd-leg{flex:1;min-width:200px}.lpd-leg div{display:grid;grid-template-columns:12px 1fr auto;gap:7px;align-items:center;margin:5px 0}.lpd-leg i{width:11px;height:11px;border-radius:50%}@media(max-width:520px){.lpd-kpis{grid-template-columns:1fr 1fr}.lpd-piebox{justify-content:center}}`;document.head.appendChild(s);}
 MQHooks.on('parent:rendered',({tab})=>{css();if(tab==='suivi'&&!document.querySelector('.lpd')){const tabs=document.querySelector('.tabs');if(tabs)tabs.insertAdjacentHTML('afterend',html());else app.insertAdjacentHTML('afterbegin',html());}},{id:'local-parent-dashboard'});
 ACT.lpdperiod=k=>{PERIOD=['today','7','30','365','all'].includes(k)?k:'7';parentScreen('suivi');};css();
}
boot();
})();
