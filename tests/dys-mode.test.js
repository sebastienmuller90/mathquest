/* Mode DYS / lecture facilitée — vrais parcours navigateur.
   Vérifie : panneau parent, activation et options, persistance, isolation par profil, rendu 320 px et absence d'erreurs JS. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');
  await p.waitForFunction(()=>!!window.MQDys,{timeout:5000});

  const boot=await p.evaluate(()=>({loaded:!!window.MQDys,css:document.querySelectorAll('link[href="js/dys-mode.css"]').length,js:document.querySelectorAll('script[src="js/dys-mode.js"]').length,defaults:MQDys.ensure(),classes:[...document.documentElement.classList]}));
  T('Le module DYS est chargé statiquement une seule fois et désactivé par défaut',boot.loaded&&boot.css===1&&boot.js===1&&!boot.defaults.enabled&&!boot.classes.includes('mq-dys-on'),JSON.stringify(boot));

  await p.evaluate(()=>parentScreen('reglages'));await p.waitForSelector('.mq-dys-settings');
  const panel=await p.evaluate(()=>({title:document.querySelector('.mq-dys-settings h2')?.textContent,buttons:[...document.querySelectorAll('.mq-dys-settings [data-a^="dystoggle:"]')].length,hidden:[...document.querySelectorAll('.mq-dys-settings .mq-dys-sub')].every(x=>x.hidden)}));
  T('Espace parent : panneau « Lecture facilitée », 7 réglages, options masquées tant que le mode est coupé',/Lecture facilitée/.test(panel.title||'')&&panel.buttons===7&&panel.hidden,JSON.stringify(panel));

  await p.click('[data-a="dystoggle:enabled"]');await p.waitForSelector('.mq-dys-settings');
  const on=await p.evaluate(()=>({d:S.dys,classes:[...document.documentElement.classList],pressed:document.querySelector('[data-a="dystoggle:enabled"]')?.getAttribute('aria-pressed'),visible:[...document.querySelectorAll('.mq-dys-settings .mq-dys-sub')].every(x=>!x.hidden)}));
  T('Activation : préférences par profil + grandes lettres + espacement + focus + surlignage appliqués',on.d.enabled&&on.d.largeText&&on.d.spacing&&on.d.focus&&on.d.highlight&&on.classes.includes('mq-dys-on')&&on.classes.includes('mq-dys-large')&&on.classes.includes('mq-dys-spacing')&&on.classes.includes('mq-dys-focus')&&on.classes.includes('mq-dys-highlight')&&on.pressed==='true'&&on.visible,JSON.stringify(on));

  await p.click('[data-a="dystoggle:simpleFont"]');await p.waitForSelector('.mq-dys-settings');
  const font=await p.evaluate(()=>({v:S.dys.simpleFont,c:document.documentElement.classList.contains('mq-dys-simplefont')}));
  T('Police simple : option indépendante activée et classe correspondante appliquée',font.v&&font.c,JSON.stringify(font));

  await p.evaluate(()=>home());await p.waitForTimeout(80);
  const homeState=await p.evaluate(()=>({on:document.documentElement.classList.contains('mq-dys-on'),stored:JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'{}')?.profiles?.[ACTIVE]?.dys?.enabled}));
  T('Retour accueil : mode toujours actif et déjà écrit dans la sauvegarde du profil',homeState.on&&homeState.stored===true,JSON.stringify(homeState));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQDys,{timeout:5000});await p.waitForTimeout(80);
  const reload=await p.evaluate(()=>({name:S.name,d:S.dys,classes:[...document.documentElement.classList]}));
  T('Rechargement : le profil conserve tous ses réglages DYS',reload.name==='Lina'&&reload.d.enabled&&reload.d.simpleFont&&reload.classes.includes('mq-dys-on')&&reload.classes.includes('mq-dys-simplefont'),JSON.stringify(reload));

  // Second profil : aucune préférence DYS ne doit fuir du premier enfant.
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const second=await p.evaluate(()=>({name:S.name,d:MQDys.ensure(),on:document.documentElement.classList.contains('mq-dys-on'),profiles:Object.values(PDB.profiles).map(x=>({name:x.name,dys:x.dys}))}));
  T('Multi-profils : un nouvel enfant démarre sans mode DYS, le premier conserve ses préférences',second.name==='Noé'&&!second.d.enabled&&!second.on&&second.profiles.some(x=>x.name==='Lina'&&x.dys?.enabled&&x.dys?.simpleFont),JSON.stringify(second));

  // Rendu 320 px : panneau parent lisible sans débordement horizontal.
  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>parentScreen('reglages'));await p.waitForSelector('.mq-dys-settings');
  const mobile=await p.evaluate(()=>{const card=document.querySelector('.mq-dys-settings'),r=card.getBoundingClientRect();return {left:r.left,right:r.right,w:r.width,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,buttons:[...card.querySelectorAll('.mq-dys-toggle:not([hidden])')].filter(b=>b.offsetParent!==null).map(b=>({w:b.getBoundingClientRect().width,cw:b.closest('.mq-dys-row').getBoundingClientRect().width}))};});
  T('Mobile 320 px : panneau et boutons visibles restent dans le viewport, aucun débordement horizontal',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1&&mobile.buttons.every(x=>x.w<=x.cw+1),JSON.stringify(mobile));

  T('Aucune erreur JavaScript pendant le parcours DYS',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
