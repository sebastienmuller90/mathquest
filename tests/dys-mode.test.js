/* Mode DYS / lecture facilitée — vrais parcours navigateur.
   Vérifie : panneau parent, persistance, isolation par profil, aides avancées, rendu 320 px et absence d'erreurs JS. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');
  await p.waitForFunction(()=>!!window.MQDys&&!!window.MQDysReading,{timeout:5000});

  const boot=await p.evaluate(()=>({loaded:!!window.MQDys,advanced:!!window.MQDysReading,css:document.querySelectorAll('link[href="js/dys-mode.css"]').length,js:document.querySelectorAll('script[src="js/dys-mode.js"]').length,readingJs:document.querySelectorAll('script[src="js/dys-reading.js"]').length,defaults:MQDys.ensure(),classes:[...document.documentElement.classList]}));
  T('Les modules DYS sont chargés statiquement une seule fois et désactivés par défaut',boot.loaded&&boot.advanced&&boot.css===1&&boot.js===1&&boot.readingJs===1&&!boot.defaults.enabled&&!boot.classes.includes('mq-dys-on'),JSON.stringify(boot));

  await p.evaluate(()=>parentScreen('reglages'));await p.waitForSelector('.mq-dys-settings');
  const panel=await p.evaluate(()=>({title:document.querySelector('.mq-dys-settings h2')?.textContent,buttons:[...document.querySelectorAll('.mq-dys-settings [data-a^="dystoggle:"]')].length,hidden:[...document.querySelectorAll('.mq-dys-settings .mq-dys-sub')].every(x=>x.hidden)}));
  T('Espace parent : panneau « Lecture facilitée », 10 réglages, options masquées tant que le mode est coupé',/Lecture facilitée/.test(panel.title||'')&&panel.buttons===10&&panel.hidden,JSON.stringify(panel));

  await p.click('[data-a="dystoggle:enabled"]');await p.waitForSelector('.mq-dys-settings');
  const on=await p.evaluate(()=>({d:S.dys,classes:[...document.documentElement.classList],pressed:document.querySelector('[data-a="dystoggle:enabled"]')?.getAttribute('aria-pressed'),visible:[...document.querySelectorAll('.mq-dys-settings .mq-dys-sub')].every(x=>!x.hidden)}));
  T('Activation : préférences par profil + grandes lettres + espacement + focus + surlignage appliqués',on.d.enabled&&on.d.largeText&&on.d.spacing&&on.d.focus&&on.d.highlight&&on.classes.includes('mq-dys-on')&&on.classes.includes('mq-dys-large')&&on.classes.includes('mq-dys-spacing')&&on.classes.includes('mq-dys-focus')&&on.classes.includes('mq-dys-highlight')&&on.pressed==='true'&&on.visible,JSON.stringify(on));

  await p.click('[data-a="dystoggle:simpleFont"]');await p.waitForSelector('.mq-dys-settings');
  await p.click('[data-a="dystoggle:syllables"]');await p.waitForSelector('.mq-dys-settings');
  await p.click('[data-a="dystoggle:simpleInstructions"]');await p.waitForSelector('.mq-dys-settings');
  await p.click('[data-a="dystoggle:wordGuide"]');await p.waitForSelector('.mq-dys-settings');
  const advancedPrefs=await p.evaluate(()=>({d:S.dys,classes:[...document.documentElement.classList]}));
  T('Options avancées : police simple, syllabes, consignes et lecture mot par mot sont indépendantes et actives',advancedPrefs.d.simpleFont&&advancedPrefs.d.syllables&&advancedPrefs.d.simpleInstructions&&advancedPrefs.d.wordGuide&&advancedPrefs.classes.includes('mq-dys-simplefont')&&advancedPrefs.classes.includes('mq-dys-syllables')&&advancedPrefs.classes.includes('mq-dys-simpleinstructions')&&advancedPrefs.classes.includes('mq-dys-wordguide'),JSON.stringify(advancedPrefs));

  // DOM contrôlé : on vérifie les aides sans dépendre du hasard d'un exercice généré.
  const advanced=await p.evaluate(()=>{
   const old=document.querySelector('#dys-fixture');if(old)old.remove();
   const f=document.createElement('section');f.id='dys-fixture';
   const instruction='Lis le problème. Repère les nombres utiles. Puis calcule la réponse demandée.';
   f.innerHTML=`<div class="qtext">${instruction} maman</div><div class="reading-text"><p>Maman lit avec Finot.</p></div>`;
   document.querySelector('#app').appendChild(f);MQDysReading.refresh(f);
   const q=f.querySelector('.qtext'),word=q.querySelector('.mq-dys-word-syllables'),steps=f.querySelector('.mq-dys-steps'),guideBtn=f.querySelector('.mq-dys-guide-btn');
   const before=q.textContent;
   const split=MQDysReading.splitKnownWord('maman');
   const stepParts=MQDysReading.instructionParts(instruction);
   let audio=null,activeWord='';
   const origSpeak=MQAudio.speak,origStop=MQAudio.stop;
   MQAudio.stop=()=>{};MQAudio.speak=(segs,opt)=>{audio=segs.map(x=>({t:x.t,l:x.l,type:x.type}));if(opt&&opt.onsegment)opt.onsegment(1);return {spoken:segs,skipped:[]};};
   try{if(guideBtn)MQDysReading.guideRead(guideBtn.dataset.source);activeWord=f.querySelector('.mq-dys-guide-word.reading')?.textContent||'';}finally{MQAudio.speak=origSpeak;MQAudio.stop=origStop;}
   return {split,before,after:q.textContent,syllableText:word?.textContent||'',syllableCount:word?.querySelectorAll('.mq-dys-syl').length||0,steps:steps?.textContent||'',stepParts,audio,activeWord,guideWords:f.querySelectorAll('.mq-dys-guide-word').length};
  });
  T('Syllabes : découpe uniquement issue du lexique et texte pédagogique strictement inchangé',Array.isArray(advanced.split)&&advanced.split.join('').toLowerCase()==='maman'&&advanced.syllableText.toLowerCase()==='maman'&&advanced.syllableCount>=2&&advanced.before===advanced.after,JSON.stringify(advanced));
  T('Consignes en étapes : plusieurs étapes sont proposées sans supprimer ni reformuler la consigne source',advanced.stepParts.length>=2&&/Lis le problème/.test(advanced.steps)&&/Repère les nombres utiles/.test(advanced.steps)&&/calcule la réponse demandée/.test(advanced.steps)&&advanced.before.includes('Lis le problème.'),JSON.stringify(advanced));
  T('Lecture guidée : segments de type mot envoyés au moteur audio et surlignage piloté par onsegment',Array.isArray(advanced.audio)&&advanced.audio.length>=4&&advanced.audio.every(x=>x.type==='mot')&&advanced.activeWord===advanced.audio[1].t&&advanced.guideWords===advanced.audio.length,JSON.stringify(advanced));

  await p.evaluate(()=>home());await p.waitForTimeout(100);
  const homeState=await p.evaluate(()=>({on:document.documentElement.classList.contains('mq-dys-on'),stored:JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'{}')?.profiles?.[ACTIVE]?.dys}));
  T('Retour accueil : réglages avancés déjà écrits dans la sauvegarde du profil',homeState.on&&homeState.stored?.enabled===true&&homeState.stored?.syllables===true&&homeState.stored?.simpleInstructions===true&&homeState.stored?.wordGuide===true,JSON.stringify(homeState));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQDys&&!!window.MQDysReading,{timeout:5000});await p.waitForTimeout(100);
  const reload=await p.evaluate(()=>({name:S.name,d:S.dys,classes:[...document.documentElement.classList]}));
  T('Rechargement : le profil conserve tous ses réglages DYS, y compris les aides avancées',reload.name==='Lina'&&reload.d.enabled&&reload.d.simpleFont&&reload.d.syllables&&reload.d.simpleInstructions&&reload.d.wordGuide&&reload.classes.includes('mq-dys-on')&&reload.classes.includes('mq-dys-syllables')&&reload.classes.includes('mq-dys-wordguide'),JSON.stringify(reload));

  // Vrai cours : les grandes lettres doivent agrandir le corps premium du cours, pas seulement quelques sous-éléments.
  const lessonSizing=await p.evaluate(()=>{
   const id=ALLCH.find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='CE2'&&COURS[c.id])?.id;
   if(!id)return {id:null};
   openLesson(id);const card=document.querySelector('.lcard,.fiche');if(!card)return {id,card:false};
   const descendants=[...card.querySelectorAll('p,li,small,.small,.fh,.ltag')].filter(x=>x.offsetParent!==null);
   const px=x=>parseFloat(getComputedStyle(x).fontSize)||0;
   return {id,card:true,root:px(card),min:descendants.length?Math.min(...descendants.map(px)):px(card),h2:card.querySelector('h2')?px(card.querySelector('h2')):0,overflow:document.documentElement.scrollWidth-innerWidth};
  });
  T('Grandes lettres : un vrai cours passe à au moins 20 px et aucun texte utile visible ne descend sous 16 px',lessonSizing.id&&lessonSizing.card&&lessonSizing.root>=20&&lessonSizing.min>=16&&lessonSizing.overflow<=1,JSON.stringify(lessonSizing));

  // Second profil : aucune préférence DYS ne doit fuir du premier enfant.
  await p.evaluate(()=>createProfile());await seedProfile(p,'Noé','CM1');await p.waitForTimeout(100);
  const second=await p.evaluate(()=>({name:S.name,d:MQDys.ensure(),on:document.documentElement.classList.contains('mq-dys-on'),profiles:Object.values(PDB.profiles).map(x=>({name:x.name,dys:x.dys}))}));
  T('Multi-profils : un nouvel enfant démarre sans DYS, le premier conserve ses réglages avancés',second.name==='Noé'&&!second.d.enabled&&!second.on&&second.profiles.some(x=>x.name==='Lina'&&x.dys?.enabled&&x.dys?.simpleFont&&x.dys?.syllables&&x.dys?.simpleInstructions&&x.dys?.wordGuide),JSON.stringify(second));

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
