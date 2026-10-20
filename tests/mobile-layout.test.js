/* Mise en page mobile réelle (20/10/2026) : géométrie, pas seulement des captures.
   Pour 5 tailles d'écran (320×568 → 430×932), en Chromium et, si disponible, en WebKit (moteur de Safari iOS) :
   chaque élément interactif d'un exercice (réponses de chaque type, Valider, Indice, Suivant, puces), d'une question de
   cours et des écrans principaux doit, une fois amené à l'écran par défilement, être réellement cliquable :
   document.elementFromPoint() en son centre renvoie l'élément (ou un descendant) — aucune barre fixe, bouton de Finot,
   toast ou carte ne le recouvre. Aucun débordement horizontal. Vérifié aussi avec un zoom de 125 % sur le plus petit écran.
   Engines : variable MQ_ENGINES (« chromium,webkit » par défaut). */
const {serve,launch,launchEngine}=require('./lib');
const SIZES=[[320,568],[360,640],[375,667],[390,844],[430,932]];
// strict : écrans de question et de cours, où aucun élément fixe ne doit chevaucher un élément interactif visible.
// Ailleurs (accueil, parcours, parent), le contenu défile normalement sous la barre d'onglets : seul compte qu'il soit atteignable.
const CHECK=`(()=>{const STRICT=!!document.querySelector('#app .qcard,#app .lcard,#app .qtop');
 const sel='#app button:not([disabled]),#app input:not([disabled]),#app [data-a]:not(details [data-a]):not([disabled]),#app summary';
 const vis=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>2&&r.height>2&&s.visibility!=='hidden'&&s.display!=='none'&&+s.opacity>0.05;};
 const hiddenByDetails=e=>{let d=e.parentElement&&e.parentElement.closest('details');if(d&&e.tagName==='SUMMARY'&&e.parentElement===d)d=d.parentElement&&d.parentElement.closest('details');for(;d;d=d.parentElement&&d.parentElement.closest('details'))if(!d.open)return true;return false;};
 const els=[...document.querySelectorAll(sel)].filter(vis).filter(e=>!hiddenByDetails(e)).filter(e=>!e.closest('.pmap')||e.matches('.pbubble'));
 const bad=[];const H=innerHeight,W=innerWidth;
 // 1. Position réelle, sans défilement : aucun élément interactif visible ne chevauche une barre/un bouton fixe
 //    (barre d'onglets, bouton de Finot, bandeau…). Le toast, transitoire et traversable, est exclu.
 scrollTo(0,0);const fixed=[...document.querySelectorAll('body *')].filter(e=>e.id!=='toast'&&!e.closest('#toast')&&getComputedStyle(e).position==='fixed'&&vis(e)&&getComputedStyle(e).pointerEvents!=='none');
 if(STRICT)for(const e of els){const r=e.getBoundingClientRect();if(r.bottom<=0||r.top>=H)continue;for(const f of fixed){if(f.contains(e)||e.contains(f))continue;const q=f.getBoundingClientRect(),ix=Math.min(r.right,q.right)-Math.max(r.left,q.left),iy=Math.min(r.bottom,Math.min(q.bottom,H))-Math.max(r.top,q.top);if(ix>2&&iy>2){bad.push('chevauche '+desc(e)+' / fixe '+desc(f));break;}}}
 // 2. Chaque élément, amené au centre par défilement, est réellement cliquable en son centre et sur ses bords.
 for(const e of els){e.scrollIntoView({block:'center',inline:'nearest'});const r=e.getBoundingClientRect();
  if(r.left<-1||r.right>W+1){bad.push('hors écran (x) '+desc(e));continue;}
  const pts=[[r.left+r.width/2,r.top+r.height/2],[r.left+Math.min(r.width-2,8),r.top+r.height/2],[r.right-Math.min(r.width-2,8),r.top+r.height/2]];
  for(const [x,y] of pts){if(y<0||y>=H)continue;const t=document.elementFromPoint(Math.max(0,Math.min(W-1,x)),Math.max(0,Math.min(H-1,y)));
   if(!t||!(t===e||e.contains(t)||t.contains(e)&&t.tagName==='LABEL')){bad.push('recouvert '+desc(e)+' par '+(t?desc(t):'rien'));break;}}}
 function desc(e){return e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'')+(e.dataset&&e.dataset.a?'['+e.dataset.a+']':'');}
 const over=document.documentElement.scrollWidth-document.documentElement.clientWidth;
 // Bas de page : le dernier élément interactif reste au-dessus des barres fixes une fois tout en bas.
 scrollTo(0,document.documentElement.scrollHeight);const last=els[els.length-1];let lastOk=true;
 if(last){const r=last.getBoundingClientRect();if(r.bottom<=H&&r.top>=0){const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);lastOk=!!t&&(t===last||last.contains(t));if(!lastOk)bad.push('bas de page : '+desc(last)+' recouvert par '+(t?desc(t):'rien'));}}
 scrollTo(0,0);return {n:els.length,bad:[...new Set(bad)].slice(0,8),over};})()`;
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const engines=(process.env.MQ_ENGINES||'chromium,webkit').split(',').map(s=>s.trim()).filter(Boolean);
 const {srv,url}=await serve();
 for(const eng of engines){let b;try{b=eng==='chromium'?await launch():await launchEngine(eng);}catch(e){T(`${eng} : moteur indisponible sur cette machine (ignoré)`,true,String(e.message).split('\n')[0]);continue;}
  const errs=[];
  for(const [w,h] of SIZES){const ctx=await b.newContext({viewport:{width:w,height:h},isMobile:eng==='chromium',hasTouch:true,deviceScaleFactor:2});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
   await p.fill('#nm','Mobile');await p.click('[data-a="pickstage:college"]');await p.click('[data-a="pickgrade:6e"]');await p.click('[data-a="begin"]');await p.waitForTimeout(120);
   const fails=[];const check=async label=>{await p.waitForTimeout(60);const r=await p.evaluate(CHECK);if(r.bad.length||r.over>1)fails.push(`${label} (${r.n} él.) : ${r.bad.join(' ; ')}${r.over>1?' ; débordement '+r.over+' px':''}`);return r;};
   await check('accueil');
   // Un chapitre par type de question (choix, nombre, fraction, texte, ordre, multi), en mission lancée depuis l'accueil.
   const plan=await p.evaluate(()=>{const want=['choice','num','frac','text','order','multi'],got={};for(const c of ALLCH){if(Object.keys(got).length===want.length)break;if(!WMAP[c.id]||typeof c.g!=='function')continue;for(let k=0;k<3;k++){let q;try{q=c.g(2);}catch(e){break;}if(q&&want.includes(q.type)&&!got[q.type]){got[q.type]=c.id;break;}}}return got;});
   for(const [type,cid] of Object.entries(plan)){
    await p.evaluate(([cid,type])=>{home();startMission([cid]);for(let k=0;k<30&&M.q.type!==type;k++){M.q=CHMAP[cid].g(M.d);}renderQ();},[cid,type]);
    await check(`exercice ${type} (${cid})`);
    // Après une mauvaise réponse : correction, « Exercice suivant », « Pourquoi je me suis trompé ? ».
    await p.evaluate(()=>{const q=M.q;if(q.type==='choice')validate((q.ans+1)%q.choices.length);else{M.your='?';result(false);}});
    await check(`correction ${type}`);}
   // Question de cours (quiz) et écran du parcours.
   await p.evaluate(()=>{const id=reco().id;openLesson(id);L.i=L.steps.findIndex(s=>s.k==='quiz');renderLesson();});await check('quiz de cours');
   await p.evaluate(()=>{const id=reco().id;openLesson(id);L.i=Math.min(3,L.steps.length-1);renderLesson();});await check('étape de cours');
   await p.evaluate(()=>{ACT.path();});await check('parcours du jour');
   await p.evaluate(()=>{parentScreen('suivi');});await check('espace parents');
   if(w===320){await p.evaluate(()=>{document.documentElement.style.zoom='1.25';const id=reco().id;home();startMission([id]);});await check('exercice, zoom 125 %');await p.evaluate(()=>{document.documentElement.style.zoom='';});}
   T(`${eng} ${w}×${h} : réponses, boutons et actions réellement cliquables (rien sous une barre fixe), sans débordement`,!fails.length,fails.join(' || '));
   await ctx.close();}
  T(`${eng} : aucune erreur JavaScript`,!errs.length,errs.slice(0,5).join(' | '));
  await b.close();}
 srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;module.exports.CHECK=CHECK;
