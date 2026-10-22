/* Indices progressifs — 3 niveaux, anti-spoiler, pénalité historique dès le premier indice. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');
  await p.waitForFunction(()=>!!window.MQProgressiveHints,{timeout:5000});
  const boot=await p.evaluate(()=>({loaded:!!MQProgressiveHints,js:document.querySelectorAll('script[src="js/progressive-hints.js"]').length,css:document.querySelectorAll('link[href="js/progressive-hints.css"]').length}));
  T('Module indices progressifs chargé statiquement une seule fois',boot.loaded&&boot.js===1&&boot.css===1,JSON.stringify(boot));

  const cid=await p.evaluate(()=>ALLCH.find(c=>WMAP[c.id]?.lvl===S.grade)?.id||'');
  T('Un chapitre du niveau courant est disponible pour le parcours réel',!!cid,cid);
  await p.evaluate(id=>startMission([id],{n:2}),cid);await p.waitForSelector('[data-a="hint"]');

  await p.click('[data-a="hint"]');
  const h1=await p.evaluate(()=>({level:M.hintLevel,hint:M.hint,text:document.querySelector('.ph-card')?.textContent||'',next:!!document.querySelector('.ph-next'),attr:document.querySelector('.ph-card')?.dataset.hintLevel}));
  T('Indice 1 : petit coup de pouce avec la pénalité XP historique',h1.level===1&&h1.hint===true&&/Petit indice/.test(h1.text)&&/XP divisés par 2/.test(h1.text)&&h1.next&&h1.attr==='1',JSON.stringify(h1));

  await p.click('[data-a="hint"]');
  const h2=await p.evaluate(()=>({level:M.hintLevel,hint:M.hint,text:document.querySelector('.ph-card')?.textContent||'',next:!!document.querySelector('.ph-next'),attr:document.querySelector('.ph-card')?.dataset.hintLevel}));
  T('Indice 2 : étape suivante sans modifier davantage la règle de récompense',h2.level===2&&h2.hint===true&&/Étape suivante/.test(h2.text)&&/XP divisés par 2/.test(h2.text)&&h2.next&&h2.attr==='2',JSON.stringify(h2));

  await p.click('[data-a="hint"]');
  const h3=await p.evaluate(()=>({level:M.hintLevel,hint:M.hint,text:document.querySelector('.ph-card')?.textContent||'',next:!!document.querySelector('.ph-next'),attr:document.querySelector('.ph-card')?.dataset.hintLevel}));
  T('Indice 3 : méthode guidée sans bouton supplémentaire',h3.level===3&&h3.hint===true&&/Méthode guidée/.test(h3.text)&&!/Encore un indice|Voir la méthode/.test(h3.text)&&!h3.next&&h3.attr==='3',JSON.stringify(h3));

  const safe=await p.evaluate(()=>({bad:MQProgressiveHints.safeOwnHint({hint:'La réponse est 42.',ans:42}),good:MQProgressiveHints.safeOwnHint({hint:'Pense à poser l’opération.',ans:42}),light:MQProgressiveHints.lightHint({type:'num'},M.cid),method:MQProgressiveHints.methodHint({type:'num'},M.cid)}));
  T('Anti-spoiler : un ancien indice contenant la réponse est rejeté, un indice sûr est conservé',safe.bad===''&&/poser l’opération/.test(safe.good)&&!/42/.test(safe.light)&&!/42/.test(safe.method),JSON.stringify(safe));

  const reset=await p.evaluate(()=>{MQHooks.emit('question:after-render',{q:M.q,M,mode:'mission'});return {level:M.hintLevel,hint:M.hint};});
  T('Nouvelle question : niveau d’aide et pénalité sont remis à zéro',reset.level===0&&reset.hint===false,JSON.stringify(reset));

  const coverage=await p.evaluate(()=>['num','frac','choice','order','multi','text','other'].map(type=>({type,a:MQProgressiveHints.lightHint({type},M.cid),b:MQProgressiveHints.methodHint({type},M.cid)})));
  T('Couverture : les principaux types de questions ont un indice léger et une méthode',coverage.every(x=>x.a.length>15&&x.b.length>20),JSON.stringify(coverage));

  await p.setViewportSize({width:320,height:700});
  await p.evaluate(()=>{M.hintLevel=0;M.hint=false;MQProgressiveHints.show();});
  const mobile=await p.evaluate(()=>{const c=document.querySelector('.ph-card'),r=c.getBoundingClientRect();return {left:r.left,right:r.right,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,btn:document.querySelector('.ph-next')?.getBoundingClientRect().width||0};});
  T('Mobile 320 px : le panneau reste dans le viewport et le bouton d’aide reste utilisable',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1&&mobile.btn>120,JSON.stringify(mobile));

  T('Aucune erreur JavaScript pendant le parcours indices',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
