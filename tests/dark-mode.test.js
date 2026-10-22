/* Mode sombre lisible (21/10/2026) : sur un vrai téléphone en thème sombre, les cartes « Facile / Moyen / Difficile » du
   choix de niveau gardaient un fond blanc avec le texte clair du thème (var(--card) inexistante), et plusieurs encadrés
   (Facile, Difficile, stratégie, auto-vérification) avaient des fonds clairs codés en dur.
   Vérifie le CONTRASTE RÉEL texte / fond (couleurs calculées par le navigateur, fond effectif en remontant les parents)
   sur le choix du niveau (exercice et cours) et sur toutes les étapes d'un cours aux niveaux 1, 2 et 3,
   téléphone en thème sombre, plus un contrôle en thème clair.
   Variable d'environnement MQ_DARK_OLD_CSS=<fichier> : sert l'ancien pedagogy-upgrade.css pour prouver que le test attrape le défaut. */
const fs=require('fs');const {serve,launch}=require('./lib');
const MIN=3; // contraste minimal accepté (WCAG : 3 pour les gros textes ; on vise bien plus haut, mais 3 évite tout faux échec)
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const errs=[];
 async function session(scheme,forced){const ctx=await b.newContext({viewport:{width:390,height:844},colorScheme:scheme});
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  if(process.env.MQ_DARK_OLD_CSS)await ctx.route('**/pedagogy-upgrade.css',r=>r.fulfill({contentType:'text/css',body:fs.readFileSync(process.env.MQ_DARK_OLD_CSS,'utf8')}));
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForTimeout(150);
  if(forced)await p.evaluate(t=>document.documentElement.setAttribute('data-theme',t),forced);
  return {ctx,p};}
 // Contraste de chaque texte visible de l'écran courant.
 const audit=p=>p.evaluate(min=>{const rgb=s=>{const m=String(s).match(/rgba?\(([^)]+)\)/);if(!m)return null;const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return {r:v[0],g:v[1],b:v[2],a:v.length>3?v[3]:1};};
  const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);};
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
  const bgOf=el=>{for(let e=el;e&&e.nodeType===1;e=e.parentElement){const cs=getComputedStyle(e);const img=cs.backgroundImage;if(img&&img!=='none'){const c=rgb(img);if(c&&c.a>.5)return c;}const c=rgb(cs.backgroundColor);if(c&&c.a>.5)return c;}return rgb(getComputedStyle(document.body).backgroundColor)||{r:255,g:255,b:255};};
  const out=[];const app=document.getElementById('app')||document.body;
  for(const el of app.querySelectorAll('*')){if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')continue;
   const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();if(own.length<2)continue;
   const cs=getComputedStyle(el);if(cs.visibility==='hidden'||+cs.opacity<.4)continue;const fg=rgb(cs.color);if(!fg)continue;
   const r=ratio(fg,bgOf(el));if(r<min)out.push(`${el.tagName.toLowerCase()}.${String(el.className||'').split(' ')[0]} « ${own.slice(0,28)} » ${r.toFixed(2)}`);}
  return out;},MIN);
 async function screens(p,label){const bad=[];
  await p.evaluate(()=>ACT.start('ce2-ma-tables'));await p.waitForTimeout(80);bad.push(...(await audit(p)).map(x=>'choix exercice : '+x));
  const cards=await p.locator('.mq-level-card').count();
  await p.evaluate(()=>ACT.lesson('ce2-ma-tables'));await p.waitForTimeout(80);bad.push(...(await audit(p)).map(x=>'choix cours : '+x));
  const kinds=new Set();
  for(const lv of [1,2,3]){await p.evaluate(lv=>MQPedagogy.openLessonAtLevel('ce2-ma-tables',lv),lv);await p.waitForTimeout(60);let g=0;
   while(g++<40){const k=await p.evaluate(async()=>{document.querySelectorAll('details').forEach(d=>d.open=true);await new Promise(r=>setTimeout(r,20));return L&&L.steps[L.i]&&L.steps[L.i].k;});
    if(!k||k==='practice'||k==='quiz')break;kinds.add(k);bad.push(...(await audit(p)).map(x=>`cours niveau ${lv}, étape ${k} : `+x));
    await p.evaluate(()=>{const s=L.steps[L.i];if(s.k==='ex'){while(L.exn<s.ex.s.length)ACT.lnext();}ACT.lnext();});await p.waitForTimeout(25);}}
  return {bad,cards,kinds:[...kinds]};}
 // L'appli suit le thème du téléphone (prefers-color-scheme) ; elle ne pose jamais data-theme elle-même.
 for(const [scheme,forced,label] of [['dark',null,'thème sombre du téléphone'],['light',null,'thème clair']]){
  const {ctx,p}=await session(scheme,forced);const r=await screens(p,label);
  T(`${label} : texte lisible sur le choix du niveau et dans tout le cours (contraste ≥ ${MIN})`,r.cards===3&&!r.bad.length,`${r.cards} cartes · ${r.bad.length} problème(s) : `+r.bad.slice(0,6).join(' | '));
  if(label!=='thème clair')T(`${label} : étapes contrôlées (dont encadrés Facile/Difficile, stratégie, auto-vérification, cours approfondi)`,['mqeasy','mqhard','mqstrategy','mqselfcheck','deep','culture'].filter(k=>!r.kinds.includes(k)).length===0,r.kinds.join(','));
  await ctx.close();}
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
run().then(R=>{let f=0;for(const r of R){console.log((r.ok?'✅ PASS  ':'❌ FAIL  ')+r.name+(r.detail?'  — '+r.detail:''));if(!r.ok)f++;}
 console.log(`\n${R.length-f}/${R.length} tests réussis`);console.log(`BILAN PASS=${R.length-f} FAIL=${f}`);process.exit(f?1:0);}).catch(e=>{console.error(e);console.log('BILAN PASS=0 FAIL=1');process.exit(1);});
