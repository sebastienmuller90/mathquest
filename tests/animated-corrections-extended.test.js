/* Corrections animées V3 — multiplication, division, décimaux et fractions. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQCorrections,{timeout:5000});

  const reg=await p.evaluate(()=>MQCorrections.adapters);
  const expected=['addition-posée','soustraction-posée','multiplication-posée','multiplication-décimale','division-euclidienne','division-décimale','fractions-calcul','entier-fois-fraction'];
  T('Registre V3 : 8 adaptateurs spécialisés dans un ordre stable',JSON.stringify(reg)===JSON.stringify(expected),JSON.stringify(reg));

  const mul1=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>247 × 6</b>',ans:1482},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {parsed:MQCorrections.parseMultiplication(q),adapter:m?.adapter,title:m?.title,steps:m?.steps?.map(s=>({work:s.work,carry:s.carry,text:s.text,done:!!s.done}))};});
  T('Multiplication 247 × 6 : retenues colonne par colonne et résultat 1482',mul1.parsed?.a===247&&mul1.parsed?.b===6&&mul1.adapter==='multiplication-posée'&&mul1.steps?.length===4&&/7 × 6/.test(mul1.steps[0].text||'')&&/1482/.test((mul1.steps.at(-1).text||'').replace(/\s/g,'')),JSON.stringify(mul1));

  const mul2=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>347 × 26</b>',ans:9022},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {adapter:m?.adapter,steps:m?.steps?.map(s=>({partials:s.partials,sum:s.sum,text:s.text,done:!!s.done}))};});
  T('Multiplication 347 × 26 : deux produits partiels 2082 et 6940 puis total 9022',mul2.adapter==='multiplication-posée'&&mul2.steps?.[0]?.partials?.[0]===2082&&mul2.steps?.[1]?.partials?.[1]===6940&&mul2.steps?.[2]?.sum===9022&&/9022/.test((mul2.steps.at(-1).text||'').replace(/\s/g,'')),JSON.stringify(mul2));

  const mulDec=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>2,35 × 4</b>',ans:9.4},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {parsed:MQCorrections.parseDecimalMultiplication(q),adapter:m?.adapter,title:m?.title,steps:m?.steps};});
  T('Multiplication décimale 2,35 × 4 : 235 × 4 puis virgule replacée, résultat 9,4',mulDec.parsed?.scaled===235&&mulDec.parsed?.scale===2&&mulDec.parsed?.product===940&&mulDec.adapter==='multiplication-décimale'&&/235 × 4 = 940/.test(mulDec.steps?.[1]?.text||'')&&/9,4/.test(mulDec.steps?.at(-1)?.text||''),JSON.stringify(mulDec));

  const div=await p.evaluate(()=>{const q1={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>quotient</b> ?',ans:26},q2={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>reste</b> ?',ans:1},m1=MQCorrections.modelFor({q:q1,cid:'cm1-ma-division'}),m2=MQCorrections.modelFor({q:q2,cid:'cm1-ma-division'});return {p1:MQCorrections.parseDivision(q1),a1:m1?.adapter,last1:m1?.steps?.at(-1),p2:MQCorrections.parseDivision(q2),a2:m2?.adapter,last2:m2?.steps?.at(-1)};});
  T('Division 157 ÷ 6 : quotient 26 et reste 1, avec vérification 157 = 6 × 26 + 1',div.p1?.quotient===26&&div.p1?.remainder===1&&div.a1==='division-euclidienne'&&div.a2==='division-euclidienne'&&/157.*6.*26.*1/.test((div.last1?.text||'').replace(/<[^>]+>/g,''))&&/reste demandé.*1/i.test(div.last2?.text||''),JSON.stringify(div));

  const divDec=await p.evaluate(()=>{const q={type:'num',q:'Calcule le quotient décimal : <b>23 ÷ 5</b>',ans:4.6},m=MQCorrections.modelFor({q,cid:'cm2-ma-division'});return {parsed:MQCorrections.parseDecimalDivision(q),adapter:m?.adapter,title:m?.title,steps:m?.steps};});
  T('Division décimale 23 ÷ 5 : quotient entier 4, reste 3, puis 6 dixièmes = 4,6',divDec.parsed?.quotientInt===4&&divDec.parsed?.remainder===3&&divDec.adapter==='division-décimale'&&/partie entière/.test(divDec.steps?.[0]?.text||'')&&/dixièmes/.test(divDec.steps?.[1]?.text||'')&&/4,6/.test(divDec.steps?.at(-1)?.text||''),JSON.stringify(divDec));

  const divDec2=await p.evaluate(()=>{const q={type:'num',q:'Calcule le quotient décimal : <b>17 ÷ 4</b>',ans:4.25},m=MQCorrections.modelFor({q,cid:'cm2-ma-division'});return {adapter:m?.adapter,steps:m?.steps};});
  T('Division décimale 17 ÷ 4 : progression dixièmes puis centièmes jusqu’à 4,25',divDec2.adapter==='division-décimale'&&divDec2.steps?.length===4&&/dixièmes/.test(divDec2.steps?.[1]?.text||'')&&/centièmes/.test(divDec2.steps?.[2]?.text||'')&&/4,25/.test(divDec2.steps?.at(-1)?.text||''),JSON.stringify(divDec2));

  const frac=await p.evaluate(()=>{const q={type:'frac',q:'Calcule : <b>2/3 + 5/6</b>',ans:[9,6]},eq={type:'frac',q:'Calcule : <b>2/3 + 5/6</b>',ans:[3,2]},m=MQCorrections.modelFor({q,cid:'cm1-ma-fractions-calcul'}),e=MQCorrections.modelFor({q:eq,cid:'cm1-ma-fractions-calcul'});return {parsed:MQCorrections.parseFractionOperation(q),adapter:m?.adapter,steps:m?.steps?.map(s=>s.text),equiv:e?.steps?.at(-1)?.text};});
  T('Fractions 2/3 + 5/6 : dénominateur commun 6, résultat 9/6 et réponse équivalente 3/2 acceptée',frac.parsed?.common===6&&frac.parsed?.n1===4&&frac.parsed?.n2===5&&frac.parsed?.num===9&&frac.adapter==='fractions-calcul'&&/4\/6/.test(frac.steps?.[0]||'')&&/3\/2/.test(frac.equiv||''),JSON.stringify(frac));

  const fracMul=await p.evaluate(()=>{const q={type:'frac',q:'Calcule : <b>4 × 3/10</b>',ans:[12,10]},eq={type:'frac',q:'Calcule : <b>4 × 3/10</b>',ans:[6,5]},m=MQCorrections.modelFor({q,cid:'cm2-ma-fractions-calcul'}),e=MQCorrections.modelFor({q:eq,cid:'cm2-ma-fractions-calcul'});return {parsed:MQCorrections.parseIntegerFractionMultiplication(q),adapter:m?.adapter,steps:m?.steps,equiv:e?.steps?.at(-1)?.text};});
  T('Entier × fraction : 4 × 3/10 = 12/10, avec réponse équivalente 6/5 acceptée',fracMul.parsed?.n===4&&fracMul.parsed?.a===3&&fracMul.parsed?.b===10&&fracMul.parsed?.num===12&&fracMul.adapter==='entier-fois-fraction'&&/4 = 4\/1/.test(fracMul.steps?.[0]?.text||'')&&/12\/10/.test(fracMul.steps?.[1]?.text||'')&&/6\/5/.test(fracMul.equiv||''),JSON.stringify(fracMul));

  const reject=await p.evaluate(()=>({
   mulWrong:MQCorrections.modelFor({q:{type:'num',q:'Calcule 12 × 7',ans:99}}),
   mulDecimalWrong:MQCorrections.modelFor({q:{type:'num',q:'Calcule 2,5 × 3',ans:8}}),
   equation:MQCorrections.modelFor({q:{type:'num',q:'Trouve n : 3 × n = 12',ans:4}}),
   divWrong:MQCorrections.modelFor({q:{type:'num',q:'Division de 157 par 6 : quel est le quotient ?',ans:25}}),
   divRecurring:MQCorrections.modelFor({q:{type:'num',q:'Calcule le quotient décimal : 1 ÷ 3',ans:0.3333333333333333}}),
   fracWrong:MQCorrections.modelFor({q:{type:'frac',q:'Calcule 2/3 + 5/6',ans:[8,6]}}),
   fracMulWrong:MQCorrections.modelFor({q:{type:'frac',q:'Calcule 4 × 3/10',ans:[13,10]}}),
   fracOther:MQCorrections.modelFor({q:{type:'frac',q:'Écris 1 + 2/3 sous forme de fraction',ans:[5,3]}})
  }));
  T('Sécurité V3 : aucun adaptateur sur résultat faux, équation à inconnue, quotient périodique ou fraction hors format',!reject.mulWrong&&!reject.mulDecimalWrong&&!reject.equation&&!reject.divWrong&&!reject.divRecurring&&!reject.fracWrong&&!reject.fracMulWrong&&!reject.fracOther,JSON.stringify(reject));

  await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"><div class="expl">Correction classique.</div></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Calcule : <b>2,35 × 4</b>',ans:9.4},cid:'cm1-ma-multiplication',M:{}});});await p.waitForSelector('.mq-corr');
  const mounted=await p.evaluate(()=>({head:document.querySelector('.mq-corr-head small')?.innerText,text:document.querySelector('#fb')?.innerText||'',eq:document.querySelector('.mq-corr-eq')?.innerText||'',count:document.querySelector('.mq-corr-count')?.innerText}));
  T('Intégration V3 : correction classique conservée et tableau décimal ajouté',/Multiplication décimale/.test(mounted.head||'')&&/Correction classique/.test(mounted.text)&&/2,35/.test(mounted.eq)&&/1 \/ 3/.test(mounted.count||''),JSON.stringify(mounted));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Calcule le quotient décimal : <b>17 ÷ 4</b>',ans:4.25},cid:'cm2-ma-division',M:{}});});await p.waitForSelector('.mq-corr');const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-corr')?.getBoundingClientRect().right||0,eqRight:document.querySelector('.mq-corr-eq')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : variantes V3 restent dans le viewport',mobile.overflow<=1&&mobile.right<=mobile.vw+1&&mobile.eqRight<=mobile.vw+1,JSON.stringify(mobile));
  T('Aucune erreur JavaScript dans les adaptateurs V3',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
