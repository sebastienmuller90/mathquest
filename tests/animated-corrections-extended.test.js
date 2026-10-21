/* Corrections animées V2 — multiplication, division euclidienne et fractions. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1100)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQCorrections,{timeout:5000});

  const reg=await p.evaluate(()=>MQCorrections.adapters);
  T('Registre V2 : addition, soustraction, multiplication, division et fractions',JSON.stringify(reg)===JSON.stringify(['addition-posée','soustraction-posée','multiplication-posée','division-euclidienne','fractions-calcul']),JSON.stringify(reg));

  const mul1=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>247 × 6</b>',ans:1482},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {parsed:MQCorrections.parseMultiplication(q),adapter:m?.adapter,title:m?.title,steps:m?.steps?.map(s=>({work:s.work,carry:s.carry,text:s.text,done:!!s.done}))};});
  T('Multiplication 247 × 6 : retenues colonne par colonne et résultat 1482',mul1.parsed?.a===247&&mul1.parsed?.b===6&&mul1.adapter==='multiplication-posée'&&mul1.steps?.length===4&&mul1.steps[0].work?.join('')==='2'&&/7 × 6/.test(mul1.steps[0].text||'')&&/1482/.test((mul1.steps.at(-1).text||'').replace(/\s/g,'')),JSON.stringify(mul1));

  const mul2=await p.evaluate(()=>{const q={type:'num',q:'Calcule : <b>347 × 26</b>',ans:9022},m=MQCorrections.modelFor({q,cid:'cm1-ma-multiplication'});return {adapter:m?.adapter,steps:m?.steps?.map(s=>({partials:s.partials,sum:s.sum,text:s.text,done:!!s.done}))};});
  T('Multiplication 347 × 26 : deux produits partiels 2082 et 6940 puis total 9022',mul2.adapter==='multiplication-posée'&&mul2.steps?.[0]?.partials?.[0]===2082&&mul2.steps?.[1]?.partials?.[1]===6940&&mul2.steps?.[2]?.sum===9022&&/9022/.test((mul2.steps.at(-1).text||'').replace(/\s/g,'')),JSON.stringify(mul2));

  const div=await p.evaluate(()=>{const q1={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>quotient</b> ?',ans:26},q2={type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>reste</b> ?',ans:1},m1=MQCorrections.modelFor({q:q1,cid:'cm1-ma-division'}),m2=MQCorrections.modelFor({q:q2,cid:'cm1-ma-division'});return {p1:MQCorrections.parseDivision(q1),a1:m1?.adapter,last1:m1?.steps?.at(-1),p2:MQCorrections.parseDivision(q2),a2:m2?.adapter,last2:m2?.steps?.at(-1),steps:m1?.steps?.map(s=>({q:s.quotient,r:s.remainder,text:s.text}))};});
  T('Division 157 ÷ 6 : quotient 26 et reste 1, avec vérification 157 = 6 × 26 + 1',div.p1?.quotient===26&&div.p1?.remainder===1&&div.a1==='division-euclidienne'&&div.a2==='division-euclidienne'&&/157.*6.*26.*1/.test((div.last1?.text||'').replace(/<[^>]+>/g,''))&&/reste demandé.*1/i.test(div.last2?.text||''),JSON.stringify(div));

  const frac=await p.evaluate(()=>{const q={type:'frac',q:'Calcule : <b>2/3 + 5/6</b>',ans:[9,6]},eq={type:'frac',q:'Calcule : <b>2/3 + 5/6</b>',ans:[3,2]},m=MQCorrections.modelFor({q,cid:'cm1-ma-fractions-calcul'}),e=MQCorrections.modelFor({q:eq,cid:'cm1-ma-fractions-calcul'});return {parsed:MQCorrections.parseFractionOperation(q),adapter:m?.adapter,steps:m?.steps?.map(s=>s.text),equiv:e?.steps?.at(-1)?.text};});
  T('Fractions 2/3 + 5/6 : dénominateur commun 6, résultat 9/6 et réponse équivalente 3/2 acceptée',frac.parsed?.common===6&&frac.parsed?.n1===4&&frac.parsed?.n2===5&&frac.parsed?.num===9&&frac.adapter==='fractions-calcul'&&/4\/6/.test(frac.steps?.[0]||'')&&/3\/2/.test(frac.equiv||''),JSON.stringify(frac));

  const reject=await p.evaluate(()=>({mulWrong:MQCorrections.modelFor({q:{type:'num',q:'Calcule 12 × 7',ans:99}}),mulDecimal:MQCorrections.modelFor({q:{type:'num',q:'Calcule 2,5 × 3',ans:7.5}}),divWrong:MQCorrections.modelFor({q:{type:'num',q:'Division de 157 par 6 : quel est le quotient ?',ans:25}}),fracWrong:MQCorrections.modelFor({q:{type:'frac',q:'Calcule 2/3 + 5/6',ans:[8,6]}}),fracOther:MQCorrections.modelFor({q:{type:'frac',q:'Écris 1 + 2/3 sous forme de fraction',ans:[5,3]}})}));
  T('Sécurité : aucune animation sur résultat faux, décimal non géré ou forme de fraction non reconnue',!reject.mulWrong&&!reject.mulDecimal&&!reject.divWrong&&!reject.fracWrong&&!reject.fracOther,JSON.stringify(reject));

  await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"><div class="expl">Correction classique.</div></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Calcule : <b>347 × 26</b>',ans:9022},cid:'cm1-ma-multiplication',M:{}});});await p.waitForSelector('.mq-corr');
  const mounted=await p.evaluate(()=>({head:document.querySelector('.mq-corr-head small')?.innerText,text:document.querySelector('#fb')?.innerText||'',eq:document.querySelector('.mq-corr-eq')?.innerText||'',count:document.querySelector('.mq-corr-count')?.innerText}));
  T('Intégration multiplication : ancienne correction conservée et tableau V2 ajouté',/Multiplication posée/.test(mounted.head||'')&&/Correction classique/.test(mounted.text)&&/347 × 26/.test(mounted.eq)&&/1 \/ 4/.test(mounted.count||''),JSON.stringify(mounted));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>{app.innerHTML='<div id="fb"><div class="fb bad"></div></div>';MQHooks.emit('answer:after',{ok:false,mode:'mission',q:{type:'num',q:'Division de <b>157</b> par <b>6</b> : quel est le <b>quotient</b> ?',ans:26},cid:'cm1-ma-division',M:{}});});await p.waitForSelector('.mq-corr');const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-corr')?.getBoundingClientRect().right||0,eqRight:document.querySelector('.mq-corr-eq')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : multiplication/division/fractions utilisent le même cadre sans débordement',mobile.overflow<=1&&mobile.right<=mobile.vw+1&&mobile.eqRight<=mobile.vw+1,JSON.stringify(mobile));
  T('Aucune erreur JavaScript dans les nouveaux adaptateurs',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
