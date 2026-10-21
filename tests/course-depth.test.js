/* Cours approfondis (21/10/2026) : data/pedagogy/course-depth-*.js + js/course-depth.js.
   Vérifie : chaque chapitre enrichi existe ; un lot couvre TOUS les chapitres de sa classe et de sa matière ; contenu
   complet (explications détaillées, défi avec réponse, conseil adulte, culture) ; rien n'est retiré du cours existant
   (toutes les étapes d'origine, dans le même ordre) ; placement (après les parties, culture après « Je retiens ») ;
   réponse du défi cachée par défaut ; HTML bien formé ; typographie française ; parcours réel du cours sans erreur. */
const {serve,launch}=require('./lib');
// Lots livrés : [classe, motif du monde (matière), nombre minimal de mots ajoutés par chapitre — au CP, le cours d’origine compte 148 à 234 mots : le cours fait environ deux fois plus long].
const LOTS=[['CP',/^Maths CP$/,200]];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
 await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CP"]');await p.click('[data-a="begin"]');await p.waitForTimeout(150);
 const r=await p.evaluate(lots=>{const C=MQCourseDepth.chapters,ids=Object.keys(C),known=new Set(ALLCH.map(c=>c.id));
  const words=h=>{const d=document.createElement('div');d.innerHTML=h||'';return d.textContent.split(/\s+/).filter(Boolean).length;};
  const orphans=ids.filter(id=>!known.has(id));
  const lots2=lots.map(([g,re,min])=>{const want=ALLCH.filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===g&&new RegExp(re).test(WMAP[c.id].name)).map(c=>c.id);
   const missing=want.filter(id=>!C[id]);const thin=want.filter(id=>C[id]).map(id=>{const d=C[id];const n=(d.deep||[]).reduce((s,x)=>s+words(x.h),0)+words(d.culture&&d.culture.h)+String(d.adult||'').split(/\s+/).length;return [id,n];}).filter(x=>x[1]<min);
   const incomplete=want.filter(id=>{const d=C[id];return d&&!((d.deep||[]).length>=1&&d.try&&d.try.q&&d.try.a&&d.adult&&d.culture&&d.culture.h&&d.culture.t);});
   return {g,n:want.length,missing,thin,incomplete};});
  // Rien n'est retiré, ordre conservé, placement.
  const order=[],place=[],bad=[];for(const id of ids){if(!known.has(id))continue;
   const all=lessonSteps(id),orig=all.filter(s=>s.k!=='deep'&&s.k!=='culture');
   const without=[];{const H=window.MQCourseDepth;window.MQCourseDepth={chapters:{}};without.push(...lessonSteps(id));window.MQCourseDepth=H;}
   if(JSON.stringify(orig.map(s=>[s.k,s.t]))!==JSON.stringify(without.map(s=>[s.k,s.t])))order.push(id);
   const iDeep=all.findIndex(s=>s.k==='deep'),lastPart=all.map(s=>s.k).lastIndexOf('part'),iEx=all.findIndex(s=>s.k==='ex'),iCul=all.findIndex(s=>s.k==='culture'),iRet=all.findIndex(s=>s.k==='ret');
   if(!(iDeep===lastPart+1&&(iEx<0||iEx>iDeep)&&iCul===iRet+1))place.push(id+':'+[iDeep,lastPart,iEx,iRet,iCul].join('/'));
   for(const s of all.filter(s=>s.k==='deep'||s.k==='culture')){const d=document.createElement('div');d.innerHTML=s.h;const html=d.innerHTML.replace(/&amp;/g,'&');
    const txt=d.textContent;if(/\bTODO\b|undefined|null|NaN|00a0/.test(txt))bad.push(id+' : texte suspect');if(/« | »| [:;!?]/.test(txt))bad.push(id+' : espace sécable autour de la ponctuation « '+txt.match(/.{0,12}(« | »| [:;!?]).{0,8}/)[0]+' »');if(/[a-zà-ÿ]'[a-zà-ÿ]/i.test(txt))bad.push(id+' : apostrophe droite « '+txt.match(/.{0,12}[a-zà-ÿ]'[a-zà-ÿ].{0,12}/i)[0]+' »');
    const open=(s.h.match(/<(p|ol|ul|li|table|tr|td|th|b|i|details|summary|div|h3)\b/g)||[]).length,close=(s.h.match(/<\/(p|ol|ul|li|table|tr|td|th|b|i|details|summary|div|h3)>/g)||[]).length;if(open!==close)bad.push(id+' : balises '+open+'/'+close+' dans '+s.t);
    const det=d.querySelectorAll('.mq-try details[open],.mq-adult[open]').length;if(det)bad.push(id+' : réponse ouverte par défaut');}}
  return {count:ids.length,orphans,lots:lots2,order,place,bad};},LOTS.map(([g,re,m])=>[g,re.source,m]));
 T('Chaque chapitre enrichi existe dans le programme (aucun identifiant orphelin)',r.count>0&&!r.orphans.length,r.orphans.join(', '));
 for(const l of r.lots){T(`Lot ${l.g} : tous les chapitres couverts (${l.n})`,l.n>0&&!l.missing.length,l.missing.join(', '));
  T(`Lot ${l.g} : chaque chapitre complet (explications, défi + réponse, conseil adulte, culture)`,!l.incomplete.length,l.incomplete.join(', '));
  T(`Lot ${l.g} : contenu réellement plus détaillé (mots ajoutés par chapitre)`,!l.thin.length,JSON.stringify(l.thin));}
 T('Rien n’est retiré du cours : toutes les étapes d’origine, dans le même ordre',!r.order.length,r.order.join(', '));
 T('Placement : explications juste après les parties (avant les exemples), culture juste après « Je retiens »',!r.place.length,r.place.slice(0,6).join(' | '));
 T('HTML bien formé, typographie française, réponses cachées par défaut',!r.bad.length,r.bad.slice(0,8).join(' | '));
 // Parcours réel d'un cours enrichi : toutes les étapes jusqu'à l'entraînement, sans erreur ; réponse révélée au clic.
 const walk=await p.evaluate(async()=>{openLesson('cp-ma-nombres100');const seen=[];let guard=0;
  while(L&&L.steps[L.i]&&L.steps[L.i].k!=='practice'&&guard++<40){const s=L.steps[L.i];seen.push(s.k);
   if(s.k==='deep'&&document.querySelector('.mq-try details')){const d=document.querySelector('.mq-try details');const before=d.open;d.querySelector('summary').click();await new Promise(r=>setTimeout(r,50));seen.push('reveal:'+before+'>'+d.open);}
   if(s.k==='ex'){while(L.exn<s.ex.s.length&&guard++<80)ACT.lnext();}
   ACT.lnext();await new Promise(r=>setTimeout(r,30));}
  return {seen,cur:L&&L.steps[L.i]&&L.steps[L.i].k,deepTitle:[...document.querySelectorAll('h2,h1')].map(x=>x.textContent).join('|')};});
 T('Cours réel « Nombres jusqu’à 100 » : explications, défi (réponse révélée au clic), culture, puis entraînement',walk.cur==='practice'&&walk.seen.filter(k=>k==='deep').length===2&&walk.seen.includes('culture')&&walk.seen.includes('reveal:false>true'),JSON.stringify(walk.seen));
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
