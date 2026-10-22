/* Corrections animées — moteur générique et opérations posées. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');await p.waitForFunction(()=>!!window.MQCorrections,{timeout:5000});

  const add=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>347 + 286</b>',ans:633},m=MQCorrections.modelFor({q,cid:'ce2-ma-add-sous'});return {parsed:MQCorrections.parseIntegerOperation(q),adapter:m?.adapter,steps:m?.steps?.map(s=>({text:s.text,result:s.result,carries:s.carries,done:s.done||false}))};});
  T('Addition 347 + 286 : adaptateur exact, retenues et résultat 633',add.parsed?.a===347&&add.parsed?.b===286&&add.adapter==='addition-posée'&&add.steps?.length===4&&/13/.test(add.steps[0].text)&&/retiens?/.test(add.steps[0].text)&&/633/.test(add.steps.at(-1).text),JSON.stringify(add));

  const sub=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>503 − 278</b>',ans:225},m=MQCorrections.modelFor({q,cid:'ce2-ma-add-sous'});return {adapter:m?.adapter,steps:m?.steps?.map(s=>({text:s.text,result:s.result,a:s.displayA,borrowed:s.borrowed,done:s.done||false}))};});
  T('Soustraction 503 − 278 : emprunt correct et résultat 225',sub.adapter==='soustraction-posée'&&sub.steps?.length===4&&sub.steps[0].a?.join(',')==='4,9,13'&&/13 − 8 = <b>5/.test(sub.steps[0].text)&&/225/.test(sub.steps.at(-1).text),JSON.stringify(sub));

  const zero=await p.evaluate(()=>{const q={type:'num',q:'Effectue 1002 - 278',ans:724},m=MQCorrections.modelFor({q,cid:'ce2-ma-add-sous'});return {adapter:m?.adapter,first:m?.steps?.[0],last:m?.steps?.at(-1)};});
  T('Soustraction 1002 − 278 : emprunt à travers les zéros correctement propagé',zero.adapter==='soustraction-posée'&&zero.first?.displayA?.join(',')==='0,9,9,12'&&/traversant 2 colonnes/.test(zero.first?.text||'')&&/724/.test(zero.last?.text||''),JSON.stringify(zero));

  const mul=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>347 × 26</b>',ans:9022},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {parsed:MQCorrections.parseMultiplication(q),adapter:m?.adapter,steps:m?.steps?.map(s=>({text:s.text,partials:s.partials,sum:s.sum,done:s.done||false}))};});
  T('Multiplication 347 × 26 : deux produits partiels, décalage des dizaines et résultat 9 022',mul.parsed?.a===347&&mul.parsed?.b===26&&mul.adapter==='multiplication-posée'&&mul.steps?.length===4&&mul.steps[0]?.partials?.[0]===2082&&mul.steps[1]?.partials?.[1]===6940&&mul.steps[2]?.sum===9022&&/9.?022/.test(mul.steps.at(-1)?.text||''),JSON.stringify(mul));

  const div=await p.evaluate(()=>{const qq={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>quotient</b> ?',ans:26},qr={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>reste</b> ?',ans:1},mq=MQCorrections.modelFor({q:qq,cid:'cm1-ma-division'}),mr=MQCorrections.modelFor({q:qr,cid:'cm1-ma-division'});return {pq:MQCorrections.parseDivision(qq),pr:MQCorrections.parseDivision(qr),aq:mq?.adapter,ar:mr?.adapter,qLast:mq?.steps?.at(-1),rLast:mr?.steps?.at(-1)};});
  T('Division euclidienne 157 ÷ 6 : quotient 26 et reste 1 reconnus séparément',div.pq?.quotient===26&&div.pq?.remainder===1&&div.pr?.quotient===26&&div.pr?.remainder===1&&div.aq==='division-euclidienne'&&div.ar==='division-euclidienne'&&/quotient demandé.*26/i.test(div.qLast?.text||'')&&/reste demandé.*1/i.test(div.rLast?.text||''),JSON.stringify(div));

  const fracAdd=await p.evaluate(()=>{const q={type:'frac',q:'Calcule : <b>3/4 + 5/8</b>',ans:[11,8]},m=MQCorrections.modelFor({q,cid:'cm2-ma-fractions-calcul'});return {parsed:MQCorrections.parseFractionOperation(q),adapter:m?.adapter,steps:m?.steps};});
  T('Fractions 3/4 + 5/8 : dénominateur commun 8 puis 11/8',fracAdd.parsed?.common===8&&fracAdd.parsed?.n1===6&&fracAdd.parsed?.n2===5&&fracAdd.adapter==='fractions-calcul'&&fracAdd.steps?.some(s=>/6\/8/.test(s.text||''))&&/11\/8/.test(fracAdd.steps?.at(-1)?.text||''),JSON.stringify(fracAdd));

  const fracSub=await p.evaluate(()=>{const q={type:'frac',q:'Calcule : <b>7/8 − 1/4</b>',ans:[5,8]},m=MQCorrections.modelFor({q,cid:'cm2-ma-fractions-calcul'});return {parsed:MQCorrections.parseFractionOperation(q),adapter:m?.adapter,last:m?.steps?.at(-1)};});
  T('Fractions 7/8 − 1/4 : soustraction sûre au même dénominateur, résultat 5/8',fracSub.parsed?.op==='−'&&fracSub.parsed?.common===8&&fracSub.parsed?.num===5&&fracSub.adapter==='fractions-calcul'&&/5\/8/.test(fracSub.last?.text||''),JSON.stringify(fracSub));

  const reject=await p.evaluate(()=>({wrong:MQCorrections.modelFor({q:{type:'num',q:'Calcule 20 + 3',ans:99},cid:'ce2-ma-add-sous'}),decimal:MQCorrections.modelFor({q:{type:'num',q:'Calcule 2,5 + 1,2',ans:3.7},cid:'ce2-ma-add-sous'}),text:MQCorrections.modelFor({q:{type:'text',q:'Explique 20 + 3',acc:['23']},cid:'ce2-ma-add-sous'}),equation:MQCorrections.modelFor({q:{type:'num',q:'Trouve n : <b>3 × n = 12</b>',ans:4},cid:'cm1-ma-algebre'})}));
  T('Sécurité pédagogique : aucune animation si résultat incohérent, décimal non géré, texte ou équation à inconnue',!reject.wrong&&!reject.decimal&&!reject.text&&!reject.equation,JSON.stringify(reject));

  // Intégration hook : simule le feedback déjà produit par le moteur historique.
  await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"><b>Pas encore.</b><div class="expl">Correction classique conservée.</div></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Calcule : <b>347 + 286</b>',ans:633},cid:'ce2-ma-add-sous',M:{}});});
  await p.waitForSelector('.mq-corr');
  const mounted=await p.evaluate(()=>({classic:/Correction classique/.test(document.querySelector('#fb')?.innerText||''),count:document.querySelector('.mq-corr-count')?.textContent,next:!!document.querySelector('[data-a^="corrnext:"]'),prevDisabled:document.querySelector('[data-a^="corrprev:"]')?.disabled,text:document.querySelector('.mq-corr-text')?.innerText}));
  T('Intégration : correction classique conservée et tableau pas à pas ajouté automatiquement',mounted.classic&&/1 \/ 4/.test(mounted.count||'')&&mounted.next&&mounted.prevDisabled&&/13/.test(mounted.text||''),JSON.stringify(mounted));

  const id=await p.evaluate(()=>document.querySelector('.mq-corr')?.dataset.corr);await p.click(`[data-a="corrnext:${id}"]`);const step2=await p.evaluate(()=>({count:document.querySelector('.mq-corr-count')?.textContent,prev:document.querySelector('[data-a^="corrprev:"]')?.disabled,text:document.querySelector('.mq-corr-text')?.innerText}));
  T('Navigation : étape suivante puis précédent deviennent disponibles sans recalculer la réponse',/2 \/ 4/.test(step2.count||'')&&!step2.prev&&!!step2.text,JSON.stringify(step2));
  await p.click(`[data-a="corrreplay:${id}"]`);const replay=await p.evaluate(()=>document.querySelector('.mq-corr-count')?.textContent);
  T('Recommencer : retour à l’étape 1',/1 \/ 4/.test(replay||''),replay);

  // Une question non prise en charge ne doit rien injecter.
  await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"><div class="expl">Correction</div></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'text',q:'Explique ton raisonnement',acc:['x']},cid:'ce2-ma-add-sous',M:{}});});await p.waitForTimeout(40);
  T('Question non prise en charge : aucune fausse correction animée',await p.locator('.mq-corr').count()===0,'');

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Calcule 1002 − 278',ans:724},cid:'ce2-ma-add-sous',M:{}});});await p.waitForSelector('.mq-corr');const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-corr').getBoundingClientRect().right,vw:innerWidth,buttons:[...document.querySelectorAll('.mq-corr-controls button')].map(x=>x.getBoundingClientRect().width)}));
  T('Mobile 320 px : tableau et commandes sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+1&&mobile.buttons.every(x=>x>0),JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les corrections animées',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
