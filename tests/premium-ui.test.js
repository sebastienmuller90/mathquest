/* Refonte premium (22/10/2026) : contrôles STRUCTURELS de l'interface, jamais de capture au pixel près.
   Pour 3 profils (CP, CM2, 4e) et 6 écrans (320 px, iPhone, grand téléphone, paysage, tablette, desktop) :
   1. aucun débordement horizontal sur l'accueil et ses 4 onglets, ni en question d'exercice ;
   2. barre de navigation : 5 onglets entièrement dans l'écran, icônes SVG (pas d'emoji), cibles ≥ 44 px ;
   3. en-tête : avatar, nom, pastilles et jauge ne se chevauchent pas ;
   4. bouton flottant de Finot entièrement visible et fixe ;
   5. bouton principal : contraste texte/fond ≥ 4,5 pour CHAQUE thème de la boutique, en clair et en sombre
      (régression 8.69 : le texte était forcé en blanc sur l'orange) ;
   6. réponse juste / fausse : symbole ✓ / ✕ en plus de la couleur ;
   7. jetons par âge : rayons plus doux en CP qu'au collège, titres en Nunito au collège ;
   8. thème sombre : fond réellement sombre, texte clair ;
   9. aucune erreur JavaScript. */
const {serve,launchEngine,seedProfile}=require('./lib');
const VPS=[['320',320,568],['iphone',390,844],['grand',430,932],['paysage',844,390],['tablette',768,1024],['desktop',1280,800]];
const PROFS=[['CP','CP'],['CM2','CM2'],['4e','4e']];
const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);const errs=[];
 async function open(w,h,grade,scheme='light'){const ctx=await b.newContext({viewport:{width:w,height:h},colorScheme:scheme,hasTouch:w<800});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lou',grade);return {ctx,p};}
 const overflow=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 const inter=(a,c)=>Math.min(a.right,c.right)-Math.max(a.left,c.left)>1&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>1;

 // 1-4 : géométrie sur tous les écrans et profils
 const bad={overflow:[],nav:[],header:[],fab:[]};
 for(const [pn,grade] of PROFS)for(const [vn,w,h] of VPS){const {ctx,p}=await open(w,h,grade);const tag=`${pn}/${vn}`;
  for(const tab of ['accueil','matieres','progres','plus']){await p.evaluate(k=>ACT.hometab(k),tab);await p.waitForTimeout(40);
   const o=await overflow(p);if(o>0)bad.overflow.push(`${tag}/${tab} +${o}px`);
   if(tab==='accueil'){
    const g=await p.evaluate(()=>{const r=e=>{const x=e&&e.getBoundingClientRect();return x&&{left:x.left,right:x.right,top:x.top,bottom:x.bottom,width:x.width,height:x.height};};
     const tabs=[...document.querySelectorAll('#hometabs .htab')].map(r);
     return {top:{av:r(document.querySelector('.top .av')),nm:r(document.querySelector('.top .profile-btn')),pills:r(document.querySelector('.top .pills')),xp:r(document.querySelector('.top .xpbar'))},
      tabs,nav:r(document.getElementById('hometabs')),svg:document.querySelectorAll('#hometabs .htab .hti svg').length,emoji:[...document.querySelectorAll('#hometabs .htab .hti')].filter(e=>/\p{Extended_Pictographic}/u.test(e.textContent)).length,
      fab:(()=>{const f=document.querySelector('.finot-fab.show');if(!f)return null;const x=f.getBoundingClientRect();return {l:x.left,r:x.right,t:x.top,b:x.bottom,pos:getComputedStyle(f).position};})(),W:innerWidth,H:innerHeight};});
    if(g.tabs.length!==5)bad.nav.push(`${tag} ${g.tabs.length} onglets`);
    g.tabs.forEach((t,i)=>{if(!t||t.left<-1||t.right>g.W+1||t.bottom>g.H+1)bad.nav.push(`${tag} onglet ${i} hors écran`);else if(t.height<44||t.width<44)bad.nav.push(`${tag} onglet ${i} ${Math.round(t.width)}×${Math.round(t.height)}`);});
    if(g.svg!==5||g.emoji)bad.nav.push(`${tag} icônes : ${g.svg} svg, ${g.emoji} emoji`);
    const t=g.top;if(inter(t.av,t.nm)||inter(t.nm,t.pills)||inter(t.av,t.pills))bad.header.push(`${tag} chevauchement`);
    if(g.fab&&(g.fab.pos!=='fixed'||g.fab.l<0||g.fab.r>g.W||g.fab.t<0||g.fab.b>g.H))bad.fab.push(`${tag} ${JSON.stringify(g.fab)}`);
   }}
  // question d'exercice
  const cid=await p.evaluate(()=>SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).id);
  await p.evaluate(id=>{ACT.start(id);ACT.startlevel(id+'|2');},cid);await p.waitForTimeout(80);
  const o2=await overflow(p);if(o2>0)bad.overflow.push(`${tag}/question +${o2}px`);
  await ctx.close();}
 T('Aucun débordement horizontal (accueil, 4 onglets, question) pour 3 profils × 6 écrans',!bad.overflow.length,bad.overflow.join(' | '));
 T('Navigation : 5 onglets dans l’écran, ≥ 44 px, icônes SVG sans emoji',!bad.nav.length,bad.nav.slice(0,5).join(' | '));
 T('En-tête de l’accueil : avatar, nom et pastilles sans chevauchement',!bad.header.length,bad.header.join(' | '));
 T('Bouton flottant de Finot : fixe et entièrement visible',!bad.fab.length,bad.fab.join(' | '));

 // 5 : contraste du bouton principal pour chaque thème de la boutique, clair et sombre
 for(const scheme of ['light','dark']){const {ctx,p}=await open(390,844,'CM2',scheme);
  const res=await p.evaluate(async()=>{const out=[];const rgb=s=>{const m=String(s).match(/rgba?\(([^)]+)\)/);const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return v.slice(0,3);};
   for(const t of THEMES){S.theme=t[0];applyTheme();home();await new Promise(r=>setTimeout(r,30));
    const btn=document.querySelector('.smart5-card .btn.primary,.reco .go');if(!btn){out.push([t[0],null]);continue;}
    const cs=getComputedStyle(btn);out.push([t[0],rgb(cs.color),rgb(cs.backgroundColor)]);}
   return out;});
  const low=res.filter(r=>r[1]&&ratio(r[1],r[2])<4.5).map(r=>`${r[0]} ${ratio(r[1],r[2]).toFixed(2)}`);
  const missing=res.filter(r=>!r[1]).map(r=>r[0]);
  T(`Bouton principal lisible (≥ 4,5) pour les ${res.length} thèmes de la boutique, thème ${scheme==='dark'?'sombre':'clair'}`,!low.length&&!missing.length,low.concat(missing.map(x=>x+' sans bouton')).join(' | '));
  if(scheme==='dark'){const bg=await p.evaluate(()=>{const c=getComputedStyle(document.body);return {bg:c.backgroundColor,fg:c.color};});
   const pr=s=>s.match(/\d+/g).slice(0,3).map(Number);T('Thème sombre : fond sombre et texte clair',lum(pr(bg.bg))<.05&&lum(pr(bg.fg))>.6,JSON.stringify(bg));}
  await ctx.close();}

 // 6 : symbole ✓ / ✕ sur les réponses
 {const {ctx,p}=await open(390,844,'CM2');
  const ids=await p.evaluate(()=>SCH(S.subj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).map(c=>c.id));
  let found=null;
  for(const id of ids){if(found)break;for(let tries=0;tries<4&&!found;tries++){await p.evaluate(id=>{ACT.start(id);ACT.startlevel(id+'|2');},id);await p.waitForTimeout(60);
   if(await p.locator('.choice').count()){await p.locator('.choice').first().click();await p.waitForTimeout(80);
    found=await p.evaluate(()=>{const g=document.querySelector('.choice.good'),x=document.querySelector('.choice.bad');const c=e=>e?getComputedStyle(e,'::after').content:null;return {good:c(g),bad:c(x),clickedWrong:!!x};});}}}
  T('Réponses : symbole ✓ sur la bonne réponse (et ✕ sur la fausse) en plus de la couleur',!!found&&/✓/.test(found.good||'')&&(!found.clickedWrong||/✕/.test(found.bad||'')),JSON.stringify(found));
  await ctx.close();}

 // 7 : jetons par âge
 {const get=async g=>{const {ctx,p}=await open(390,844,g);const r=await p.evaluate(()=>({lg:getComputedStyle(document.body).getPropertyValue('--r-lg').trim(),font:getComputedStyle(document.querySelector('.sec,h1,h2')||document.body).fontFamily}));await ctx.close();return r;};
  const cp=await get('CP'),c4=await get('4e');
  T('Jetons par âge : rayon de carte CP > 4e, titres en Nunito au collège',parseInt(cp.lg)>parseInt(c4.lg)&&/^"?Nunito/.test(c4.font),JSON.stringify({cp,c4}));}

 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,3).join(' | '));
 await b.close();srv.close();return R;}
require('./lib').main(run);
