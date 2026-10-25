/* Audit physique PC (25/10/2026) — régressions des 5 défauts confirmés à l'usage réel :
   1. audio : une lettre d'unité suivie d'une apostrophe (« 10 000 s’écrivent ») n'est jamais lue comme une unité ;
   2. accords CE1 / CE2 : « 1 millier, 0 dizaine, 2 unités » (jamais « 1 milliers », « 0 dizaines », « 2 unité ») ;
   3. mini-parcours de l'accueil : le jalon « étape en cours » reste centré et entier pendant son animation ;
   4. diagnostic : Entrée valide comme le bouton, une seule fois, et le champ a un nom accessible ;
   5. défilement : un vrai changement d'étape (inscription, diagnostic) ramène en haut, un simple choix ne fait pas défiler. */
const fs=require('fs'),path=require('path');
const {serve,launchEngine,freshContext,wizard}=require('./release-lib');
const {seedProfile}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const {ctx,p,errs}=await freshContext(b,url,{w:1366,h:768});
  await seedProfile(p,'Léna','CE2');

  // ---------- 1. Audio : apostrophe après une lettre d'unité ----------
  const UNITWORD=/secondes|litres|mètres|tonnes|grammes|ampères|volts|watts|joules|newtons/;
  const elisions=['10 000 s’écrivent','10 000 s\'écrivent','2 s’écrit','3 s’il','5 s\'il','8 l’enfant','8 l\'enfant','12 l’Étude','4 m’appelle','4 m\'appelle','6 t’explique','6 t\'explique','1 s’éteint'];
  const a1=await p.evaluate(({xs})=>xs.map(x=>[x,MQAudio.prepareFR(x)]),{xs:elisions});
  const bad1=a1.filter(([,y])=>/secondes|litres|mètres|tonnes/.test(y));
  T('Audio : « s’ », « l’ », « m’ », « t’ » (apostrophe droite ou typographique) après un nombre ne sont jamais lus comme une unité',!bad1.length,bad1.map(x=>x.join(' → ')).join(' | '));
  const units=[['10 s','secondes'],['10 s.','secondes'],['4 m','mètres'],['4 m de long','mètres'],['2 L','litres'],['3 t','tonnes'],['5 kg','kilogrammes'],['7 g','grammes'],['9 cm','centimètres'],['20 min','minutes'],['12 V','volts'],['60 km/h','kilomètres heure'],['3 m²','mètres carrés']];
  const a2=await p.evaluate(({xs})=>xs.map(([x,w])=>[x,w,MQAudio.prepareFR(x)]),{xs:units});
  const bad2=a2.filter(([,w,y])=>!y.includes(w));
  T('Audio : les vraies unités restent lues en toutes lettres (10 s, 4 m, 2 L, 3 t, kg, g, cm, min, V, km/h, m²)',!bad2.length,bad2.map(x=>x[0]+' → '+x[2]).join(' | '));
  // Les phrases réelles du contenu (cours, questions) qui contiennent « nombre + lettre d'unité + apostrophe »
  const rx=/\d[   ]?(s|l|m|t|g|L|A|V|W|J|N)['’][\p{L}]+/gu;const found=[];
  const files=[...fs.readdirSync(path.join(__dirname,'..','js')).map(f=>path.join('js',f)),...(function walk(d){return fs.readdirSync(path.join(__dirname,'..',d),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):e.name.endsWith('.js')?[path.join(d,e.name)]:[]);})('data')].filter(f=>f.endsWith('.js')&&!/audio-engine\.js$/.test(f));
  for(const f of files){const t=fs.readFileSync(path.join(__dirname,'..',f),'utf8');for(const m of t.matchAll(rx)){const s=t.slice(Math.max(0,m.index-50),m.index+m[0].length+30).replace(/<[^>]*>/g,' ').replace(/\$\{[^}]*\}/g,'7').split(/['"`]/).find(x=>x.includes(m[0].slice(-4)))||m[0];found.push(s);}}
  const a3=await p.evaluate(({xs})=>xs.map(x=>[x,MQAudio.prepareFR(x)]),{xs:found});
  const bad3=a3.filter(([x,y])=>(y.match(/secondes|litres|mètres|tonnes|grammes|ampères|volts|watts|joules|newtons/g)||[]).length>(x.match(/secondes|litres|mètres|tonnes|grammes|ampères|volts|watts|joules|newtons/g)||[]).length);
  T(`Audio : les ${found.length} phrases réelles du contenu concernées (attendu ≥ 20) ne reçoivent aucune unité inventée`,found.length>=20&&!bad3.length,`${found.length} phrases ; ${bad3.slice(0,4).map(x=>x[1].trim().slice(0,90)).join(' | ')}`);

  // ---------- 2. Accords CE1 / CE2 : millier, centaine, dizaine, unité ----------
  const acc=await p.evaluate(()=>{const ids=['ce2-ma-nombres10000',...ALLCH.filter(c=>/^ce1-ma/.test(c.id)&&/centaine|nombres?/i.test(c.name)).map(c=>c.id)].filter(id=>CHMAP[id]&&CHMAP[id].g);
    const strip=s=>String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');const bad=[];let n=0,seen0=0,seen1=0,seenN=0;
    for(const id of ids)for(let d=1;d<=3;d++)for(let k=0;k<160;k++){let q;try{q=CHMAP[id].g(d);}catch(e){continue;}n++;const t=strip(q.q)+' || '+strip(q.expl)+' || '+strip(q.hint);
     if(/\b0 (millier|centaine|dizaine|unité)\b/.test(t))seen0++;if(/\b1 (millier|centaine|dizaine|unité)\b/.test(t))seen1++;if(/\b[2-9] (milliers|centaines|dizaines|unités)\b/.test(t))seenN++;
     // Un chiffre isolé (pas la fin d'un nombre « 1 108 ») suivi du nom de rang ; la notation « centaine(s) » est volontaire.
     const m=t.match(/(?<!\d[   ]?)(?<!\d)[01] (milliers|centaines|dizaines|unités)\b|(?<!\d[   ]?)(?<!\d)[2-9] (millier|centaine|dizaine|unité)(?![\p{L}(])/u);if(m&&bad.length<6)bad.push(id+' : '+m[0]+' … '+t.slice(0,140));}
    return {ids,n,bad,seen0,seen1,seenN};});
  T(`Accords CE1/CE2 : ${acc.n} questions générées (${acc.ids.length} chapitres) sans « 0/1 + pluriel » ni « ≥ 2 + singulier »`,acc.n>=900&&!acc.bad.length,acc.bad.join(' | '));
  T('Accords CE1/CE2 : les cas 0, 1 et plusieurs sont réellement rencontrés pendant le test',acc.seen0>0&&acc.seen1>0&&acc.seenN>0,JSON.stringify({z:acc.seen0,u:acc.seen1,p:acc.seenN}));

  // ---------- 3. Mini-parcours : jalon en cours centré et entier ----------
  const badPm=[];
  for(const [w,h] of [[320,568],[390,844],[768,1024],[1366,768],[1920,1080]]){
   await p.setViewportSize({width:w,height:h});await p.evaluate(()=>{PARENT=false;home();});await p.waitForTimeout(80);
   const has=await p.locator('.pathmini .pmini.next').count();if(!has){badPm.push(w+' : aucun jalon en cours');continue;}
   for(const t of [0,400,800]){await p.waitForTimeout(t?400:0);
    const g=await p.evaluate(()=>{const box=document.querySelector('.pathmini').getBoundingClientRect(),e=document.querySelector('.pathmini .pmini.next'),r=e.getBoundingClientRect(),cs=getComputedStyle(e);
     const cx=box.left+parseFloat(e.style.left)/100*box.width,cy=box.top+parseFloat(e.style.top)/100*box.height;
     return {inside:r.left>=box.left-1&&r.right<=box.right+1&&r.top>=box.top-1&&r.bottom<=box.bottom+1,dx:Math.abs((r.left+r.right)/2-cx),dy:Math.abs((r.top+r.bottom)/2-cy),anim:cs.animationName,rb:Math.round(r.bottom-box.top),bh:Math.round(box.height)};});
    if(!g.inside||g.dx>2||g.dy>2)badPm.push(`${w}px t+${t} : ${JSON.stringify(g)}`);
    if(g.anim==='none')badPm.push(`${w}px : animation absente`);}}
  T('Mini-parcours : le jalon « étape en cours » reste centré sur son point et entier dans son cadre, animation conservée (320 → 1920 px)',!badPm.length,badPm.slice(0,4).join(' | '));
  await p.setViewportSize({width:1366,height:768});

  // ---------- 4. Diagnostic : Entrée, nom accessible, aucune double soumission ----------
  const {ctx:c2,p:p2,errs:e2}=await freshContext(b,url,{w:1366,h:768});
  await wizard(p2,{name:'Noé',grade:'CE2'});await p2.evaluate(()=>ACT.diagstart());await p2.waitForFunction(()=>CUR==='diagnostic');
  const nAns=()=>p2.evaluate(()=>(S.diagnostic&&S.diagnostic.active&&S.diagnostic.active.answers||[]).length);
  // Avance jusqu'à une question à saisie (#di0), par de vraies réponses au clic
  for(let k=0;k<12&&!(await p2.locator('#di0').count());k++){await p2.locator('[data-a^="diagpick:"],[data-a="diagvalid"]').first().click();await p2.waitForTimeout(60);}
  const nm=await p2.evaluate(()=>{const e=document.getElementById('di0');return e?{aria:e.getAttribute('aria-label')||'',label:!!(e.labels&&e.labels.length),focus:document.activeElement===e}:null;});
  T('Diagnostic : le champ de réponse a un nom accessible et reçoit le focus',!!nm&&(nm.aria.trim().length>2||nm.label)&&nm.focus,JSON.stringify(nm));
  const before=await nAns();await p2.locator('#di0').pressSequentially('42');await p2.keyboard.press('Enter');await p2.waitForTimeout(150);
  const afterOne=await nAns();
  T('Diagnostic : Entrée valide la réponse saisie (une réponse enregistrée, question suivante)',afterOne===before+1,`${before} → ${afterOne}`);
  // Double Entrée rapide sur une réponse saisie : une seule validation ; Entrée sur un champ vide : aucune
  for(let k=0;k<12&&!(await p2.locator('#di0').count())&&(await p2.evaluate(()=>CUR))==='diagnostic';k++){await p2.locator('[data-a^="diagpick:"],[data-a="diagvalid"]').first().click();await p2.waitForTimeout(60);}
  if(await p2.locator('#di0').count()){const b2=await nAns();await p2.locator('#di0').pressSequentially('7');await p2.keyboard.press('Enter');await p2.keyboard.press('Enter');await p2.waitForTimeout(200);const a2n=await nAns();
   T('Diagnostic : deux Entrée d’affilée ne valident qu’une fois (le champ vide de la question suivante n’est pas soumis)',a2n===b2+1,`${b2} → ${a2n}`);}
  else T('Diagnostic : deux Entrée d’affilée ne valident qu’une fois',false,'aucune seconde question à saisie rencontrée');
  // Entrée sur un bouton de choix qui a le focus : son clic natif, une seule réponse
  for(let k=0;k<12&&!(await p2.locator('[data-a^="diagpick:"]').count())&&(await p2.evaluate(()=>CUR))==='diagnostic';k++){await p2.locator('#di0').fill('5');await p2.locator('[data-a="diagvalid"]').click();await p2.waitForTimeout(60);}
  if(await p2.locator('[data-a^="diagpick:"]').count()){const b3=await nAns();await p2.locator('[data-a^="diagpick:"]').first().focus();await p2.keyboard.press('Enter');await p2.waitForTimeout(200);const a3n=await nAns();
   T('Diagnostic : Entrée sur un choix qui a le focus enregistre exactement une réponse',a3n===b3+1,`${b3} → ${a3n}`);}
  else T('Diagnostic : Entrée sur un choix',false,'aucune question à choix rencontrée');

  // ---------- 5. Défilement : vrai changement d'étape → haut de page ; simple choix → inchangé ----------
  const scr=[];
  await p2.setViewportSize({width:1366,height:520});
  if((await p2.evaluate(()=>CUR))==='diagnostic'){await p2.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const y0=await p2.evaluate(()=>scrollY);
   if(await p2.locator('#di0').count()){await p2.locator('#di0').fill('3');await p2.locator('[data-a="diagvalid"]').click();}else await p2.locator('[data-a^="diagpick:"]').first().click();
   await p2.waitForTimeout(120);const g=await p2.evaluate(()=>({y:scrollY,top:Math.round(document.querySelector('.diag-head').getBoundingClientRect().top)}));
   if(!(y0>0&&g.y===0&&g.top>=0))scr.push('diagnostic '+JSON.stringify({y0,...g}));}
  else scr.push('diagnostic terminé trop tôt');
  // Inscription : étape 5 (ressenti) plus haute que l'écran
  const {ctx:c3,p:p3,errs:e3}=await freshContext(b,url,{w:1366,h:520});
  await p3.fill('#pob-name','Iris');await p3.click('[data-pob="gender"][data-value="girl"]');await p3.click('[data-pob="next"]');await p3.click('[data-pob="next"]');
  await p3.click('[data-pob="stage"][data-value="primaire"]');await p3.click('[data-pob="grade"][data-value="CE2"]');
  await p3.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const ya=await p3.evaluate(()=>scrollY);
  await p3.click('[data-pob="next"]');await p3.waitForTimeout(80);const sa=await p3.evaluate(()=>({y:scrollY,step:document.querySelector('.pob-shell').dataset.pobStep}));
  if(!(ya>0&&sa.y===0&&sa.step==='3'))scr.push('inscription « Continuer » '+JSON.stringify({ya,...sa}));
  await p3.click('[data-pob="next"]');await p3.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));const yb=await p3.evaluate(()=>scrollY);
  // clic dans la page : Playwright ferait défiler la page vers l'élément avant de cliquer
  await p3.evaluate(()=>document.querySelector('[data-pob="level"][data-value="ok"]').click());await p3.waitForTimeout(60);const yc=await p3.evaluate(()=>scrollY);
  if(!(yb>0&&Math.abs(yc-yb)<=2))scr.push('inscription : un simple choix a fait défiler '+JSON.stringify({yb,yc}));
  await p3.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p3.click('[data-pob="back"]');await p3.waitForTimeout(60);
  const sb=await p3.evaluate(()=>({y:scrollY,step:document.querySelector('.pob-shell').dataset.pobStep}));
  if(!(sb.y===0&&sb.step==='3'))scr.push('inscription « Retour » '+JSON.stringify(sb));
  T('Défilement : « Continuer », « Retour » et la question suivante du diagnostic ramènent en haut ; un simple choix ne fait pas défiler',!scr.length,scr.join(' | '));

  T('Aucune erreur JavaScript',!errs.length&&!e2.length&&!e3.length,[...errs,...e2,...e3].slice(0,3).join(' | '));
  await ctx.close();await c2.close();await c3.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
