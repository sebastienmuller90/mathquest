/* Dictée : second essai avec pistes (sans la réponse), puis correction. XP /2, une seule note par question, carnet d'erreurs. */
const {serve,launch}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const {srv,url}=await serve();const b=await launch();const c=await b.newContext({viewport:{width:320,height:640}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{try{if(!localStorage.getItem('__init')){localStorage.clear();localStorage.setItem('__init','1');localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:'a',profiles:{a:{name:'Test',grade:'CM1',avatar:'🦊'}}}));}}catch(e){}});
 await p.goto(url+'index.html',{waitUntil:'load'});
 const r=await p.evaluate(()=>{const id='cm1-fr-dictee',REF='Les enfants se sont cachés derrière la grande haie du jardin.',o={};
  const mk=()=>({type:'text',q:'🎧 Écoute et écris la phrase :',acc:[REF],audio:{t:REF,l:'fr-FR'},strict:true,lang:'fr',expl:'x'});
  startMission([id]);M.q=mk();document.querySelector('#in0')||document.body.insertAdjacentHTML('beforeend','<input id="in0">');
  const tot0=S.totalQ,xp0=M.xp,mist0=(S.mistakes[id]||[]).length;
  $('#in0').value='Les enfant se sont caché derière la grande haie du jardin.';validate();
  o.retry={box:!!document.querySelector('#fb .dict-retry'),txt:document.querySelector('#fb').innerText,noAnswer:!document.querySelector('#fb').innerText.includes(REF)&&!/La phrase correcte/.test(document.querySelector('#fb').innerText),
   notScored:S.totalQ===tot0&&M.xp===xp0&&!M.locked,inputEnabled:!$('#in0').disabled,mistakes:(S.mistakes[id]||[]).length===mist0,overflow:document.documentElement.scrollWidth>innerWidth+1};
  // second essai réussi
  $('#in0').value=REF;validate();
  o.ok={scored:S.totalQ===tot0+1,xpHalf:M.xp-xp0<=5&&M.xp-xp0>0,mist:(S.mistakes[id]||[]).length>mist0,locked:M.locked};
  // second essai raté : correction + une seule note
  clearTimeout(M.tid);M.locked=false;M.q=mk();const tot1=S.totalQ;
  $('#in0').disabled=false;$('#in0').value='zzz';validate();o.r2a=!!document.querySelector('#fb .dict-retry')&&S.totalQ===tot1;
  $('#in0').value='Les enfant';validate();const t=document.querySelector('#fb').innerText;o.r2b={corr:/La phrase correcte est/.test(t),scored:S.totalQ===tot1+1,noSecondRetry:!document.querySelector('#fb .dict-retry')};
  return o;});
 T('Réponse fausse : pistes affichées, ni la phrase ni la correction',r.retry.box&&r.retry.noAnswer,r.retry.txt);
 T('Premier essai non noté (question, XP, verrou, carnet inchangés) et champ modifiable',r.retry.notScored&&r.retry.inputEnabled&&r.retry.mistakes);
 T('320 px : aucun débordement horizontal',!r.retry.overflow);
 T('Second essai réussi : une seule note, XP divisés par 2 au plus, erreur du premier essai au carnet',r.ok.scored&&r.ok.xpHalf&&r.ok.mist&&r.ok.locked,JSON.stringify(r.ok));
 T('Second essai raté : correction complète, une seule note, pas de troisième essai',r.r2a&&r.r2b.corr&&r.r2b.scored&&r.r2b.noSecondRetry,JSON.stringify(r.r2b));
 T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(run);
module.exports=run;
