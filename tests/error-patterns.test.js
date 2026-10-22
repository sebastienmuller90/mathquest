/* Détection d'erreurs-types — diagnostics déterministes, persistance, faux positifs. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1200)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CM1');
  await p.waitForFunction(()=>!!window.MQErrorPatterns,{timeout:5000});
  const boot=await p.evaluate(()=>({loaded:!!MQErrorPatterns,js:document.querySelectorAll('script[src="js/error-patterns.js"]').length,css:document.querySelectorAll('link[href="js/error-patterns.css"]').length,store:S.errorPatterns}));
  T('Module erreurs-types chargé une seule fois avec stockage par profil',boot.loaded&&boot.js===1&&boot.css===1&&Array.isArray(boot.store?.events)&&!!boot.store?.counts,JSON.stringify(boot));

  const cases=await p.evaluate(()=>{
   const d=MQErrorPatterns.detect;
   return {
    sign:d({type:'num',q:'Calcule : -8 + 3',ans:-5},'5'),
    decimal:d({type:'num',q:'23 ÷ 5',ans:4.6},'46'),
    mulAdd:d({type:'num',q:'Calcule : 12 × 7',ans:84},'19'),
    addMul:d({type:'num',q:'Calcule : 12 + 7',ans:19},'84'),
    carry:d({type:'num',q:'Calcule : 347 + 286',ans:633},'523'),
    frac:d({type:'frac',q:'Calcule : 3/4 + 2/5',ans:'23/20'},'5/9'),
    div:d({type:'num',q:'157 ÷ 6 : quel est le quotient ?',ans:26},'1'),
    order:d({type:'order',q:'Remets dans l’ordre',tokens:['Je','vais','bien'],ans:'Je vais bien'},'bien vais Je'),
    unknown:d({type:'choice',q:'Quelle proposition est vraie ?',ans:2},'1'),
    close:d({type:'num',q:'Calcule : 347 + 286',ans:633},'632')
   };
  });
  T('Signature : confusion de signe reconnue',cases.sign?.id==='sign'&&cases.sign.confidence>=.9,JSON.stringify(cases.sign));
  T('Signature : virgule décalée reconnue',cases.decimal?.id==='decimal'&&cases.decimal.confidence>=.9,JSON.stringify(cases.decimal));
  T('Signatures : confusion ×/+ reconnue dans les deux sens',cases.mulAdd?.id==='mul-as-add'&&cases.addMul?.id==='add-as-mul',JSON.stringify({mulAdd:cases.mulAdd,addMul:cases.addMul}));
  T('Signature : retenue oubliée reconnue exactement',cases.carry?.id==='carry-forgotten'&&cases.carry.confidence>=.9,JSON.stringify(cases.carry));
  T('Signature : addition des dénominateurs reconnue',cases.frac?.id==='fraction-add-denominators'&&cases.frac.confidence>.99,JSON.stringify(cases.frac));
  T('Signature : quotient et reste inversés reconnus',cases.div?.id==='quotient-remainder-swap',JSON.stringify(cases.div));
  T('Signature : ordre entièrement inversé reconnu',cases.order?.id==='order-reversed',JSON.stringify(cases.order));
  T('Prudence : QCM arbitraire et erreur numérique proche ne sont pas étiquetés',cases.unknown===null&&cases.close===null,JSON.stringify({unknown:cases.unknown,close:cases.close}));

  const cid=await p.evaluate(()=>ALLCH.find(c=>WMAP[c.id]?.lvl===S.grade)?.id||'');
  const record=await p.evaluate(id=>{const fb=document.createElement('div');fb.id='fb';fb.innerHTML='<div class="fb bad">Correction existante</div>';document.querySelector('#app').appendChild(fb);const q={type:'frac',q:'Calcule : 3/4 + 2/5',ans:'23/20'};MQHooks.emit('answer:after',{mode:'mission',ok:false,q,cid:id,M:{your:'5/9'}});const ev=S.errorPatterns.events.slice(-1)[0],card=document.querySelector('.mq-pattern-card');return {ev,card:card?.textContent||'',top:MQErrorPatterns.top(3),saved:JSON.parse(localStorage.getItem('mathquest_profiles_v2')||'{}')?.profiles?.[ACTIVE]?.errorPatterns};},cid);
  T('Réponse réelle : diagnostic enregistré et carte ajoutée à la correction existante',record.ev?.id==='fraction-add-denominators'&&/Dénominateurs additionnés/.test(record.card)&&/M’expliquer cette erreur/.test(record.card),JSON.stringify(record));
  T('Persistance immédiate : événement et compteur sont sauvegardés dans le profil',record.saved?.events?.length===1&&record.saved?.counts?.['fraction-add-denominators']?.n===1,JSON.stringify(record.saved));

  // Deux occurrences supplémentaires pour vérifier le classement récurrent.
  const recurrence=await p.evaluate(id=>{MQErrorPatterns.record(id,{type:'num',q:'12 × 7',ans:84},'19',MQErrorPatterns.detect({type:'num',q:'12 × 7',ans:84},'19'));MQErrorPatterns.record(id,{type:'num',q:'9 × 4',ans:36},'13',MQErrorPatterns.detect({type:'num',q:'9 × 4',ans:36},'13'));return MQErrorPatterns.top(3);},cid);
  T('Récurrence : les motifs sont comptés et triés par fréquence',recurrence[0]?.id==='mul-as-add'&&recurrence[0].n===2,JSON.stringify(recurrence));

  await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQErrorPatterns,{timeout:5000});
  const reload=await p.evaluate(()=>({name:S.name,events:S.errorPatterns?.events?.length||0,top:MQErrorPatterns.top(3)}));
  T('Rechargement : les diagnostics restent disponibles pour le même enfant',reload.name==='Lina'&&reload.events===3&&reload.top.some(x=>x.id==='mul-as-add'&&x.n===2),JSON.stringify(reload));

  await p.setViewportSize({width:320,height:700});
  const mobile=await p.evaluate(()=>{const old=document.querySelector('#fb');if(old)old.remove();const fb=document.createElement('div');fb.id='fb';fb.innerHTML='<div class="fb bad">Correction</div>';document.querySelector('#app').appendChild(fb);MQHooks.emit('answer:after',{mode:'mission',ok:false,q:{type:'num',q:'347 + 286',ans:633},cid:ALLCH.find(c=>WMAP[c.id]?.lvl===S.grade)?.id,M:{your:'523'}});const c=document.querySelector('.mq-pattern-card'),r=c.getBoundingClientRect();return {left:r.left,right:r.right,vw:innerWidth,overflow:document.documentElement.scrollWidth-innerWidth,button:c.querySelector('.btn')?.getBoundingClientRect().width||0};});
  T('Mobile 320 px : diagnostic lisible sans débordement',mobile.left>=-1&&mobile.right<=mobile.vw+1&&mobile.overflow<=1&&mobile.button>150,JSON.stringify(mobile));

  await p.evaluate(()=>createProfile());await seedProfile(p,'Noé','CM1');await p.waitForTimeout(80);
  const second=await p.evaluate(()=>({name:S.name,events:S.errorPatterns?.events?.length||0,top:MQErrorPatterns.top(5),last:MQErrorPatterns.last}));
  T('Multi-profils : aucun diagnostic de Lina ne fuit vers Noé',second.name==='Noé'&&second.events===0&&second.top.length===0&&second.last===null,JSON.stringify(second));

  T('Aucune erreur JavaScript pendant le parcours erreurs-types',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
