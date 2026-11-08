/* S-03 — « porte adulte » avant la création du PREMIER code parent.
   Avant correction : un enfant qui ouvre l'espace Parents sur un appareil sans code pouvait créer lui-même le code
   (et enfermer l'adulte dehors). Un défi de calcul à plusieurs étapes, tiré avec crypto.getRandomValues, doit précéder la création. */
const {serve,launch,seedProfile,passAdultGate}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();
 const p=await b.newPage({viewport:{width:320,height:568}});
 p.setDefaultTimeout(2500);const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Enfant Test','6e');
  await p.evaluate(()=>{S.pin='';S.rec='';save();PARENT=false;});
  const open=async()=>{await p.evaluate(()=>{PARENT=false;L=null;ACT.parent();});await p.waitForTimeout(60);};

  await open();
  const g1=await p.evaluate(()=>({pin2:!!document.getElementById('pin2'),pin:!!document.getElementById('pin'),ans:!!document.getElementById('adultans'),q:(document.getElementById('adultq-vis')||{}).textContent||''}));
  T('Sans code existant, l’espace Parents propose d’abord un calcul d’adulte (pas de formulaire de création)',!g1.pin2&&!g1.pin&&g1.ans&&!!g1.q,JSON.stringify(g1));

  const ops=(g1.q.match(/[×+−-]/g)||[]).length;
  const m=g1.q.match(/(\d+)\s*×\s*(\d+)\s*\+\s*(\d+)\s*[−-]\s*(\d+)/);
  const ans=m?+m[1]*+m[2]+ +m[3]-+m[4]:0;
  T('Le défi est à plusieurs étapes et son résultat n’est pas devinable (≥ 3 opérations, résultat ≥ 150)',ops>=3&&ans>=150,g1.q+' = '+ans);

  const lab=await p.evaluate(()=>{const i=document.getElementById('adultans');const l=i&&(i.getAttribute('aria-label')||(document.querySelector('label[for="adultans"]')||{}).textContent||'');const sr=document.querySelector('#adultq .sr-only');return {lab:l,sr:sr?sr.textContent:'',inputmode:i&&i.inputMode,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,h1:!!document.querySelector('#app [role=status],#app [aria-live]')||true};});
  T('Accessible : champ nommé, calcul lu en toutes lettres pour lecteur d’écran, clavier numérique, pas de défilement horizontal à 320 px',/calcul|résultat/i.test(lab.lab)&&/fois/.test(lab.sr)&&lab.inputmode==='numeric'&&!lab.overflow,JSON.stringify(lab));

  await p.fill('#adultans','7');await p.click('[data-a="adultok"]');await p.waitForTimeout(80);
  const bad=await p.evaluate(()=>({pin2:!!document.getElementById('pin2'),ans:!!document.getElementById('adultans'),pin:S.pin,parent:PARENT,toast:(document.getElementById('toast')||{}).textContent||'',val:(document.getElementById('adultans')||{}).value}));
  T('Mauvaise réponse : pas de création de code, nouveau calcul proposé, message neutre',!bad.pin2&&bad.ans&&!bad.pin&&!bad.parent&&bad.val===''&&!/nul|bête|tricheur|honte|menteur/i.test(bad.toast),JSON.stringify(bad));

  const direct=await p.evaluate(()=>{try{ACT.pinok();}catch(e){}return {pin:S.pin,rec:S.rec,parent:PARENT};});
  T('Appeler l’action de création sans avoir passé le défi ne crée aucun code',!direct.pin&&!direct.rec&&!direct.parent,JSON.stringify(direct));

  await p.evaluate(()=>{window.__mr=Math.random;Math.random=()=>0.5;});
  const seen=new Set();
  for(let i=0;i<8;i++){await open();await p.fill('#adultans','1');await p.click('[data-a="adultok"]');seen.add(await p.locator('#adultq-vis').textContent());}
  await p.evaluate(()=>{Math.random=window.__mr;});
  T('Le défi ne dépend pas de Math.random (aléa cryptographique : défis variés même avec Math.random figé)',seen.size>=6,[...seen].join(' / '));

  await p.keyboard.press('Tab');
  await open();
  await passAdultGate(p);
  const ok=await p.evaluate(()=>({pin:!!document.getElementById('pin'),pin2:!!document.getElementById('pin2'),S:S.pin}));
  T('Bonne réponse (au clavier ou au toucher) : le formulaire de création du code apparaît, toujours sans code créé',ok.pin&&ok.pin2&&!ok.S,JSON.stringify(ok));

  await p.fill('#pin','2468');await p.fill('#pin2','2468');await p.click('[data-a="pinok"]');await p.waitForSelector('.reckey');
  const made=await p.evaluate(()=>({pin:!!S.pin,rec:!!S.rec,parent:PARENT,key:document.querySelector('.reckey').textContent}));
  T('Après le défi, la création du code et l’affichage de la clé de secours fonctionnent',made.pin&&made.rec&&made.parent&&/^[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(made.key),JSON.stringify(made));

  await p.evaluate(()=>{PARENT=false;L=null;ACT.parent();});await p.waitForTimeout(60);
  const again=await p.evaluate(()=>({ans:!!document.getElementById('adultans'),pin:!!document.getElementById('pin'),pin2:!!document.getElementById('pin2')}));
  T('Une fois un code existant, aucune porte adulte : simple saisie du code',!again.ans&&again.pin&&!again.pin2,JSON.stringify(again));

  // Entrée au clavier valide le défi.
  await p.evaluate(()=>{S.pin='';S.rec='';save();PARENT=false;L=null;ACT.parent();});await p.waitForTimeout(60);
  const t=await p.locator('#adultq-vis').textContent();const mm=t.match(/(\d+)\s*×\s*(\d+)\s*\+\s*(\d+)\s*[−-]\s*(\d+)/);
  await p.fill('#adultans',String(+mm[1]*+mm[2]+ +mm[3]-+mm[4]));await p.keyboard.press('Enter');await p.waitForTimeout(80);
  T('Touche Entrée dans le champ du calcul valide le défi',await p.evaluate(()=>!!document.getElementById('pin2')));
  T('Aucune erreur JavaScript',errs.length===0,errs.join(' | '));
 }catch(e){T('Déroulé interrompu : '+String(e.message).split(String.fromCharCode(10))[0],false);}finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
