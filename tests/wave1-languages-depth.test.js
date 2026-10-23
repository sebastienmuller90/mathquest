/* Vague 1 (23/10/2026) : cours approfondis de langues du collège (anglais 6e–3e, italien 5e–3e).
   Vérifie, pour chaque lot livré : aucun identifiant orphelin, couverture des chapitres attendus, complétude
   (explications, défi + réponse, conseil adulte, culture), seuil de mots ajoutés, HTML équilibré, typographie. */
const {serve,launch,seedProfile}=require('./lib');
const rng=(p,a,b)=>{const out=[];for(let i=a;i<=b;i++)out.push(p+String.fromCharCode(96+i));return out;};
const L2=(p,a,b,extra)=>[...rng(p,a,b),...extra];
const LOTS={
 'Anglais 6e':[...rng('en6',1,26),'en6aa','en6ab','en6ac','en6ad','en6ae','en6af','en6ag','en6ah','en6ai'],
 'Anglais 5e':[...rng('en5',1,16)],'Anglais 4e':[...rng('en4',1,14)],'Anglais 3e':[...rng('en3',1,14)],
 'Italien 5e':[...rng('it5',1,14)],'Italien 4e':[...rng('it4',1,12)],'Italien 3e':[...rng('it3',1,12)]};
const MIN=250;
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
 await seedProfile(p,'Noé','6e');
 const r=await p.evaluate(({lots,min})=>{const C=MQCourseDepth.chapters,known=new Set(ALLCH.map(c=>c.id));
  const words=h=>{const d=document.createElement('div');d.innerHTML=h||'';return d.textContent.split(/\s+/).filter(Boolean).length;};
  const langIds=Object.keys(C).filter(id=>/^(en|it)[3-6][a-z]+$/.test(id));
  const orphans=langIds.filter(id=>!known.has(id));
  const out={orphans,lots:[],bad:[]};
  for(const [name,ids] of Object.entries(lots)){const have=ids.filter(id=>C[id]);if(!have.length){out.lots.push({name,started:false});continue;}
   const missing=ids.filter(id=>!C[id]);
   const incomplete=have.filter(id=>{const d=C[id];return !((d.deep||[]).length>=2&&d.try&&d.try.q&&d.try.a&&d.adult&&d.culture&&d.culture.h&&d.culture.t);});
   const thin=have.map(id=>{const d=C[id];const n=(d.deep||[]).reduce((s,x)=>s+words(x.h),0)+words(d.culture&&d.culture.h)+String(d.adult||'').split(/\s+/).length;return [id,n];}).filter(x=>x[1]<min);
   const unknown=have.filter(id=>!known.has(id));
   out.lots.push({name,started:true,n:ids.length,missing,incomplete,thin,unknown});}
  for(const id of langIds){if(!known.has(id))continue;const all=lessonSteps(id);
   for(const s of all.filter(s=>s.k==='deep'||s.k==='culture')){const d=document.createElement('div');d.innerHTML=s.h;const txt=d.textContent;
    if(/\bTODO\b|\bundefined\b|\bnull\b|\bNaN\b/.test(txt))out.bad.push(id+' : texte suspect');
    if(/[a-zà-ÿ]'[a-zà-ÿ]/i.test(txt))out.bad.push(id+' : apostrophe droite');
    if(/« | »| [:;!?]/.test(txt))out.bad.push(id+' : espace sécable avant la ponctuation');
    const open=(s.h.match(/<(p|ol|ul|li|table|tr|td|th|b|i|details|summary|div|h3)\b/g)||[]).length,close=(s.h.match(/<\/(p|ol|ul|li|table|tr|td|th|b|i|details|summary|div|h3)>/g)||[]).length;
    if(open!==close)out.bad.push(id+' : balises '+open+'/'+close);
    if(d.querySelectorAll('details[open]').length)out.bad.push(id+' : réponse ouverte');}}
  return out;},{lots:LOTS,min:MIN});
 T('Langues collège : aucun identifiant orphelin',!r.orphans.length,r.orphans.join(', '));
 for(const l of r.lots){if(!l.started){T(`${l.name} : lot pas encore livré (ignoré)`,true);continue;}
  T(`${l.name} : tous les chapitres attendus couverts (${l.n})`,!l.missing.length&&!l.unknown.length,l.missing.concat(l.unknown).join(', '));
  T(`${l.name} : chapitres complets (2 explications, défi + réponse, adulte, culture)`,!l.incomplete.length,l.incomplete.join(', '));
  T(`${l.name} : au moins ${MIN} mots ajoutés par chapitre`,!l.thin.length,JSON.stringify(l.thin));}
 T('Langues collège : HTML équilibré, typographie, réponses cachées',!r.bad.length,r.bad.slice(0,8).join(' | '));
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
