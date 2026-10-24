/* Audit de release (24/10/2026) — responsive, par ASSERTIONS GÉOMÉTRIQUES (aucune capture).
   Profils CP, CM2, 3e × viewports 320→1920 × écrans (onboarding, accueil + 4 onglets, matières, monde, chapitre, cours,
   exercice, correction, progrès, erreurs, devoirs, parent, récompenses, boutique, paramètres), puis variantes :
   mode sombre, texte agrandi (html 130 %), paysage téléphone.
   Détecte : débordement horizontal du document, texte coupé (overflow hidden sans ellipse voulue), contrôle hors écran,
   contrôle recouvert (elementFromPoint), champ de saisie minuscule, fenêtre modale hors écran. */
const {serve,launchEngine,seedProfile}=require('./lib');
const {answerQuestion}=require('./release-lib');
const VPS=[[320,568],[375,667],[390,844],[430,932],[768,1024],[900,700],[1024,768],[1366,768],[1440,900],[1920,1080]];
const LAND=[[844,390],[667,375],[568,320]];
const PROFS=['CP','CM2','3e'];
const SCREENS=['home:accueil','home:matieres','home:progres','home:plus','world','chap','lesson','picker','exo','correction','mistakes','devoirs','parent:suivi','parent:programme','parent:recomp','parent:reglages','rewards','shop','badges','profiles'];
const LITE=['home:accueil','home:matieres','home:progres','home:plus','world','exo','correction','parent:suivi','rewards'];
const FULLVP=new Set(['320×568','390×844','768×1024']);
const BUDGET_MS=Number(process.env.MQ_BUDGET_MS||300000);

/* Contrôle exécuté DANS la page : renvoie la liste des anomalies géométriques de l'écran courant. */
function CHECK(opts){
  try{document.getAnimations().forEach(a=>{try{a.finish();}catch(e){}});}catch(e){}
  const W=document.documentElement.clientWidth,H=innerHeight,out=[];
  const name=e=>{let s=e.tagName.toLowerCase();if(e.id)s+='#'+e.id;else if(e.dataset&&e.dataset.a)s+='[a='+e.dataset.a.slice(0,18)+']';else if(e.className&&typeof e.className==='string')s+='.'+e.className.trim().split(/\s+/).slice(0,2).join('.');const t=(e.textContent||'').trim().replace(/\s+/g,' ').slice(0,22);return s+(t?'"'+t+'"':'');};
  const vis=e=>{const dt=e.closest('details:not([open])');if(dt&&!e.closest('summary'))return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;const r=e.getBoundingClientRect();if(r.width<1||r.height<1)return false;
    for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return false;}return true;};
  const hScroller=e=>{for(let a=e.parentElement;a&&a!==document.documentElement;a=a.parentElement){const o=getComputedStyle(a).overflowX;if((o==='auto'||o==='scroll'||o==='hidden'||o==='clip')&&a.scrollWidth>a.clientWidth+1&&a!==document.body)return true;}return false;};
  const ov=document.documentElement.scrollWidth-W;if(ov>1)out.push('overflow-doc +'+ov+'px');
  const app=document.getElementById('app');if(app&&app.scrollWidth>W+1&&ov<=1)out.push('overflow-app +'+(app.scrollWidth-W)+'px');
  const root=document.body;
  // texte coupé
  let nClip=0;
  for(const e of root.querySelectorAll('*')){if(nClip>=4)break;if(e.scrollWidth<=e.clientWidth+2||e.clientWidth<=0)continue;if(e.closest('svg,canvas,#fa-splash,.splash'))continue;const cs=getComputedStyle(e);
    if(cs.overflowX!=='hidden'&&cs.overflowX!=='clip')continue;if(cs.textOverflow==='ellipsis')continue;if(!vis(e))continue;
    if(e.scrollWidth>e.clientWidth+2&&e.clientWidth>0){
      const hasText=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||e.querySelector('button,span,b,p');
      if(hasText&&!e.matches('.sr-only,.visually-hidden,[aria-hidden="true"]')){nClip++;out.push('texte-coupé '+name(e)+' '+e.scrollWidth+'>'+e.clientWidth);}}}
  // contrôles interactifs
  const sel='button,a[href],input:not([type=hidden]),select,textarea,[data-a],[role=button],[tabindex="0"]';
  const ctr=[...root.querySelectorAll(sel)].filter(e=>vis(e)&&!e.closest('.sr-only,[hidden],[aria-hidden="true"]'));
  let nOff=0,nCov=0,nIn=0;
  for(const e of ctr){const r=e.getBoundingClientRect();
    if(nOff<4&&(r.left<-1||r.right>W+1)&&!hScroller(e)){nOff++;out.push('hors-écran '+name(e)+' '+Math.round(r.left)+'→'+Math.round(r.right)+' / '+W);}
    if(nIn<3&&e.matches('input,textarea')&&!/^(checkbox|radio|range|file|color|submit|button)$/.test(e.type)&&!e.closest('.dys-hide')){if(r.height<28||r.width<60){nIn++;out.push('champ-minuscule '+name(e)+' '+Math.round(r.width)+'×'+Math.round(r.height));}}}
  // recouvrement : on amène le contrôle au centre de l'écran puis on regarde ce qui est au-dessus
  const sy=scrollY;
  for(const e of ctr.slice(0,45)){if(nCov>=3)break;const cs=getComputedStyle(e);if(cs.pointerEvents==='none'||e.disabled)continue;
    if(cs.position!=='fixed'&&!e.closest('.fa-nav,#hometabs,.finot-fab'))e.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
    const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;
    const cx=Math.min(Math.max(r.left+r.width/2,1),W-1),cy=Math.min(Math.max(r.top+r.height/2,1),H-1);
    if(r.bottom<0||r.top>H||r.right<0||r.left>W)continue;
    const t=document.elementFromPoint(cx,cy);
    if(t&&t!==e&&!e.contains(t)&&!t.contains(e)&&!t.closest('.toast,#toast,.confetti,.fx')&&!(e.tagName==='INPUT'&&e.closest('label')&&e.closest('label').contains(t))){
      if(e.closest('label')&&e.closest('label').contains(t))continue;nCov++;out.push('recouvert '+name(e)+' par '+name(t));}}
  window.scrollTo({top:sy,behavior:'instant'});
  // fenêtres modales
  for(const m of root.querySelectorAll('[role=dialog],.modal,.overlay,.modal-bg,.sheet,.pad,.pob-modal')){if(!vis(m))continue;const cs=getComputedStyle(m);if(cs.position!=='fixed'&&cs.position!=='absolute')continue;const r=m.getBoundingClientRect();
    if(r.width>=W-1&&r.height>=H-1)continue;if(r.left<-1||r.right>W+1||r.top<-1||r.bottom>H+1)out.push('modale-hors-écran '+name(m)+' '+[r.left,r.top,r.right,r.bottom].map(Math.round));}
  return out;
}

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1400)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 const errs=[];const t0=Date.now();let checks=0,skipped=0;
 const BAD={};const addBad=(grp,tag,list)=>{if(!list.length)return;(BAD[grp]=BAD[grp]||[]).push(tag+' → '+list.slice(0,3).join('; '));};
 async function open(w,h,grade,o={}){
  const ctx=await b.newContext({viewport:{width:w,height:h},colorScheme:o.scheme||'light',hasTouch:w<1000});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lou',grade);
  await p.evaluate(()=>{const ch=SCH(S.subj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).map(c=>c.id);
    try{MQAdaptive.recordMistake(S,ch[0],{q:'Combien font 7 × 8 quand on additionne aussi 12 et qu’on retire 5 ?',answer:'faux',expl:'Explication assez longue pour vérifier le retour à la ligne dans la carte.'});MQAdaptive.recordAnswer(S,ch[0],false,{});}catch(e){}
    S.homework=[{id:'hw_1',title:'Apprendre la leçon sur les fractions décimales pour jeudi',subject:S.subj,due:'',note:'Penser à relire',status:'todo',createdAt:1700000000000,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null},{id:'hw_2',title:'Exercice 4',subject:S.subj,due:'',note:'',status:'claimed',createdAt:1700000000001,claimedAt:1,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null}];
    S.xp=1234;S.coins=345;try{save();}catch(e){}home();});
  if(o.big)await p.addStyleTag({content:'html{font-size:130% !important}'});
  return {ctx,p};}
 // Atteint un écran donné ; renvoie false si indisponible
 async function go(p,sc){
  const [k,arg]=sc.split(':');
  await p.evaluate(()=>{try{if(PARENT){PARENT=false;}padClose&&padClose();}catch(e){}});
  if(k==='home'){await p.evaluate(a=>ACT.hometab(a),arg);}
  else if(k==='world'){await p.evaluate(()=>{const id=WALL.find(w=>w.lvl===S.grade&&sOf(w.id).id===S.subj)?.id||WALL.find(w=>w.lvl===S.grade).id;ACT.world(id);});}
  else if(k==='chap'||k==='lesson'||k==='picker'||k==='exo'||k==='correction'){
    const cid=await p.evaluate(()=>SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).id);
    if(k==='chap')await p.evaluate(id=>ACT.chap(id),cid);
    else if(k==='lesson')await p.evaluate(id=>ACT.lesson(id)||openLesson(id),cid);
    else if(k==='picker')await p.evaluate(id=>ACT.start(id),cid);
    else{await p.evaluate(id=>{ACT.start(id);ACT.startlevel(id+'|2');},cid);
      if(k==='correction'){await p.waitForTimeout(60);const ok=await p.evaluate(()=>!!(M&&M.q));if(!ok)return false;await answerQuestion(p,false).catch(()=>{});}}}
  else if(k==='mistakes')await p.evaluate(()=>ACT.mistakes());
  else if(k==='devoirs')await p.evaluate(()=>{ACT.hometab('accueil');});
  else if(k==='parent')await p.evaluate(a=>{PARENT=true;parentScreen(a);},arg);
  else if(k==='rewards')await p.evaluate(()=>rewardsScreen());
  else if(k==='shop')await p.evaluate(()=>ACT.shop());
  else if(k==='badges')await p.evaluate(()=>ACT.badges());
  else if(k==='profiles')await p.evaluate(()=>profilesScreen());
  await p.waitForTimeout(40);return true;}
 async function sweep(grp,w,h,grade,o={},screens=SCREENS){
  if(grp==='onb')return onboard(w,h);
  if(Date.now()-t0>BUDGET_MS){skipped++;return;}
  const {ctx,p}=await open(w,h,grade,o);const tag=`${grp} ${grade} ${w}×${h}`;
  try{for(const sc of screens){const tg=Date.now();let ok=true;try{ok=await go(p,sc);}catch(e){errs.push(tag+' '+sc+' go: '+e.message.slice(0,100));continue;}
    if(process.env.MQ_DEBUG2)console.log(sc,'go',Date.now()-tg);
    if(ok===false)continue;checks++;
    const tt=Date.now();const iss=await p.evaluate(CHECK,{}).catch(e=>['erreur-check '+e.message.slice(0,80)]);
    if(process.env.MQ_DEBUG2)console.log(sc,'check',Date.now()-tt);
    addBad(grp,`${grade} ${w}×${h} ${sc}`,iss);}}
  finally{await ctx.close();}if(process.env.MQ_DEBUG)console.log(tag,Math.round((Date.now()-t0)/1000)+'s');}

 // 1. Onboarding réel : chaque étape de l'assistant à chaque viewport (jobs du pool)
 const obBad=[];
 async function onboard(w,h){
   const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:w<1000});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
   try{await p.waitForSelector('.pob-shell',{timeout:8000});
    const chk=async(s)=>{checks++;const iss=await p.evaluate(CHECK,{});if(iss.length)obBad.push(`${w}×${h} étape ${s}: ${iss.slice(0,3).join('; ')}`);};
    await chk(0);await p.fill('#pob-name','Camille-Marie');await p.click('[data-pob="gender"][data-value="girl"]');await p.click('[data-pob="next"]');await chk(1);
    await p.click('[data-pob="next"]');await chk(2);await p.click('[data-pob="stage"][data-value="college"]');await p.click('[data-pob="grade"][data-value="3e"]');await chk('2b');await p.click('[data-pob="next"]');await chk(3);
    await p.click('[data-pob="companion"][data-value="finot"]');await p.click('[data-pob="next"]');await chk(4);
    await p.click('[data-pob="level"][data-value="ok"]');await p.click('[data-pob="confidence"][data-value="medium"]');await p.click('[data-pob="help"][data-value="try"]');await p.click('[data-pob="next"]');await chk(5);
    await p.click('[data-pob="goal"][data-value="understand"]');await p.click('[data-pob="pace"][data-value="balanced"]');await p.click('[data-pob="next"]');await chk(6);
   }catch(e){obBad.push(`${w}×${h} parcours interrompu: ${e.message.slice(0,120)}`);}
   await ctx.close();}
 if(process.env.MQ_DEBUG)console.log('onboarding fini à',Math.round((Date.now()-t0)/1000),'s');
 // 2-5. Balayages en parallèle (4 pages à la fois) : clair, sombre, texte 130 %, paysage
 const jobs=[];
 for(const [w,h] of VPS.concat(LAND))jobs.push(['onb',w,h]);
 VPS.forEach(([w,h],i)=>{const full=FULLVP.has(w+'×'+h);(full?PROFS:[PROFS[i%3]]).forEach(g=>jobs.push(['clair',w,h,g,{},full?SCREENS:LITE]));});
 [[320,568],[390,844],[1024,768]].forEach(([w,h],i)=>['CP','3e'].forEach((g,j)=>{if((i+j)%2===0||w===320)jobs.push(['sombre',w,h,g,{scheme:'dark'},LITE.concat(['mistakes','chap','parent:reglages'])]);}));
 [[320,568,PROFS],[768,1024,['CM2']]].forEach(([w,h,gs])=>gs.forEach(g=>jobs.push(['texte130',w,h,g,{big:true},LITE.concat(['mistakes','chap','parent:reglages'])])));
 LAND.forEach(([w,h],i)=>jobs.push(['paysage',w,h,['CM2','3e','CP'][i],{},LITE.concat(['mistakes','chap'])]));
 const POOL=Number(process.env.MQ_POOL||8);
 await Promise.all(Array.from({length:POOL},async()=>{while(jobs.length)await sweep(...jobs.shift());}));
 T('Onboarding : 7 étapes de l’assistant sans débordement, texte coupé, contrôle hors écran ni recouvert (13 viewports)',!obBad.length,obBad.slice(0,6).join(' | '));
 T('Écrans (accueil + 4 onglets, monde, chapitre, cours, exercice, correction, erreurs, devoirs, parent ×4, récompenses, boutique, badges, profils) — 10 viewports (3 profils aux 3 viewports de référence, 1 profil tournant ailleurs), mode clair : aucune anomalie géométrique',!BAD.clair,(BAD.clair||[]).slice(0,10).join(' | '));
 T('Mode sombre (320, 390, 1024 × CP/3e) : aucune anomalie géométrique',!BAD.sombre,(BAD.sombre||[]).slice(0,8).join(' | '));
 T('Texte agrandi (html 130 %) à 320 px (CP/CM2/3e) et 768 px (CM2) : aucune anomalie géométrique',!BAD.texte130,(BAD.texte130||[]).slice(0,8).join(' | '));
 T('Paysage téléphone (844×390, 667×375, 568×320) (CM2, 3e, CP) : aucune anomalie géométrique',!BAD.paysage,(BAD.paysage||[]).slice(0,8).join(' | '));

 T('Couverture : tous les balayages exécutés (aucun sauté faute de temps), au moins 450 contrôles d’écran',skipped===0&&checks>=450,`${checks} contrôles, ${skipped} balayages sautés, ${Math.round((Date.now()-t0)/1000)} s`);
 T('Aucune erreur JavaScript pendant tous les parcours',!errs.length,errs.slice(0,3).join(' | '));
 await b.close();srv.close();return R;}
require('./lib').main(run);
