/* Régression : onboarding lisible aux largeurs intermédiaires et saisie date stable au clavier. */
const {serve,launch}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail).slice(0,1800)});
 const {srv,url}=await serve();const b=await launch();
 const ctx=await b.newContext({viewport:{width:1024,height:768}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));
 p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.waitForSelector('.pob-shell',{timeout:6000});
  await p.fill('#pob-name','Will');
  await p.click('[data-pob="gender"][data-value="boy"]');await p.click('[data-pob="next"]');

  /* Le champ date ne doit jamais être recréé pendant un événement input : sur PC cela faisait perdre
     le focus / segment courant à chaque frappe. Le marqueur DOM prouve que le même nœud survit. */
  await p.waitForSelector('[data-pob-step="1"] #pob-birth');
  await p.evaluate(()=>{const el=document.getElementById('pob-birth');el.dataset.keyboardStable='1';el.focus();});
  await p.fill('#pob-birth','2014-10-05');
  const birth=await p.evaluate(()=>{
    const el=document.getElementById('pob-birth');
    return {
      value:el?.value||'',
      sameNode:el?.dataset.keyboardStable==='1',
      focused:document.activeElement===el,
      state:window.MQProfileOnboarding?.state?.birthdate||'',
      nextDisabled:document.querySelector('[data-pob="next"]')?.disabled
    };
  });
  T('Date de naissance PC : la saisie ne recrée pas le champ et garde le focus',birth.sameNode&&birth.focused&&birth.value==='2014-10-05',JSON.stringify(birth));
  T('Date de naissance PC : la valeur est synchronisée et permet de continuer',birth.state==='2014-10-05'&&birth.nextDisabled===false,JSON.stringify(birth));

  await p.click('[data-pob="next"]');
  await p.click('[data-pob="stage"][data-value="college"]');await p.click('[data-pob="grade"][data-value="5e"]');await p.click('[data-pob="next"]');
  await p.click('[data-pob="companion"][data-value="momo"]');await p.click('[data-pob="next"]');
  await p.waitForSelector('[data-pob-step="4"]');

  const layouts=[];
  for(const [width,height,name] of [[900,700,'desktop-etroit'],[1024,768,'desktop-intermediaire'],[1440,900,'desktop-large']]){
   await p.setViewportSize({width,height});
   const state=await p.evaluate(()=>{
    const grids=[...document.querySelectorAll('.pob-grid.three')];
    const cards=[...document.querySelectorAll('.pob-grid.three .pob-choice')];
    const boxes=cards.map(card=>{
      const r=card.getBoundingClientRect();const txt=card.querySelector('span:last-child')?.getBoundingClientRect();
      return {w:Math.round(r.width),h:Math.round(r.height),scrollW:card.scrollWidth,clientW:card.clientWidth,scrollH:card.scrollHeight,clientH:card.clientHeight,textRight:txt?Math.round(txt.right-r.right):0,textBottom:txt?Math.round(txt.bottom-r.bottom):0};
    });
    return {
      doc:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
      cols:grids.map(g=>getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length),
      boxes
    };
   });
   layouts.push({name,width,height,...state});
  }
  T('Étape 5 : aucune carte ni texte ne déborde entre 900 et 1440 px',layouts.every(x=>x.doc<=x.client+1&&x.boxes.every(b=>b.scrollW<=b.clientW+1&&b.scrollH<=b.clientH+1&&b.textRight<=1&&b.textBottom<=1)),JSON.stringify(layouts));
  T('Étape 5 : la grille passe à 2 colonnes aux largeurs intermédiaires puis 3 sur grand écran',layouts[0].cols.every(n=>n===2)&&layouts[1].cols.every(n=>n===2)&&layouts[2].cols.every(n=>n===3),JSON.stringify(layouts.map(x=>({name:x.name,cols:x.cols,boxes:x.boxes.map(b=>b.w)}))));
  T('Aucune erreur JavaScript pendant le test responsive intermédiaire',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
