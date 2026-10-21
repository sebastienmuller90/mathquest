/* Évaluations blanches — niveaux, séance sans indice, bilan, profils et mobile. */
const {serve,launch}=require('./lib');
const answerJS=`(correct)=>{const q=M.q,sel=s=>document.querySelector(s);if(q.type==='choice'){const i=correct?q.ans:(q.ans+1)%q.choices.length;document.querySelectorAll('.choice')[i].click();return;}if(q.type==='order'){const idx=[];let rest=normLang(q.ans,q.lang);const used=new Set();let guard=0;while(rest.length&&guard++<50){const i=q.tokens.findIndex((t,k)=>!used.has(k)&&rest.startsWith(normLang(t,q.lang)));if(i<0)break;used.add(i);idx.push(i);rest=rest.slice(normLang(q.tokens[i],q.lang).length).trim();}if(!correct)idx.reverse();idx.forEach(i=>document.querySelector('[data-a="otok:'+i+'"]').click());}else if(q.type==='multi')q.labels.forEach((_,i)=>sel('#in'+i).value=correct?String(q.ans[i]):'987654');else if(q.type==='num')sel('#in0').value=correct?String(q.ans):'987654';else if(q.type==='frac')sel('#in0').value=correct?q.ans[0]+'/'+q.ans[1]:'987654/1';else sel('#in0').value=correct?q.acc[0]:'zzzzqqq';const v=sel('[data-a="valid"]');if(v)v.click();}`;
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1000)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});const ans=c=>p.evaluate(`(${answerJS})(${c})`);const next=()=>p.evaluate(()=>{const b=document.querySelector('#fb [data-a="next"]');if(b)b.click();else if(M&&M.locked)advance();});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQNationalAssessment,{timeout:5000});

  const registry=await p.evaluate(()=>MQNationalAssessment.levels.map(level=>{const ids=MQNationalAssessment.selectChapters(level);return {level,n:ids.length,fr:ids.filter(id=>/francais$/.test(sOf(WMAP[id].id).id)).length,ma:ids.filter(id=>/maths$/.test(sOf(WMAP[id].id).id)).length,domains:[...new Set(ids.map(MQNationalAssessment.domain))]};}));
  T('Registre : CP, CE1, CM1 et 6e disposent de français + maths et plusieurs domaines',registry.length===4&&registry.every(x=>x.n>=4&&x.fr>0&&x.ma>0&&x.domains.length>=3),JSON.stringify(registry));

  await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForSelector('.mq-na-levels');const landing=await p.evaluate(()=>({levels:document.querySelectorAll('.mq-na-level').length,notice:document.querySelector('.mq-na-notice')?.innerText||'',overflow:document.documentElement.scrollWidth-innerWidth}));
  T('Écran : 4 niveaux et mention explicite « entraînement non officiel »',landing.levels===4&&/non officiel/i.test(landing.notice)&&landing.overflow<=1,JSON.stringify(landing));

  await p.evaluate(()=>MQNationalAssessment.start('CP'));await p.waitForSelector('.qcard');
  const started=await p.evaluate(()=>({active:!!MQNationalAssessment.active,n:M?.n,ids:M?.ids?.length,classOn:document.documentElement.classList.contains('mq-national-active'),hint:document.querySelector('[data-a="hint"]')?getComputedStyle(document.querySelector('[data-a="hint"]')).display:null,finot:document.querySelector('.finot-fab')?getComputedStyle(document.querySelector('.finot-fab')).display:null}));
  T('Séance : 20 questions, mode actif et aides masquées',started.active&&started.n===20&&started.ids>=4&&started.classOn&&(!started.hint||started.hint==='none')&&(!started.finot||started.finot==='none'),JSON.stringify(started));

  // Répond à la séance entière avec un mélange volontaire de bonnes/mauvaises réponses.
  let guard=0;while(await p.evaluate(()=>!!M)&&guard++<25){const i=await p.evaluate(()=>M.i);await ans(i%4!==3);await p.waitForSelector('#fb .fb');if(await p.evaluate(()=>!!M))await next();await p.waitForTimeout(25);}await p.waitForTimeout(120);
  const rep=await p.evaluate(()=>({m:!!M,active:!!MQNationalAssessment.active,hist:S.nationalAssessments||[],report:document.querySelector('.mq-na-report')?.innerText||'',classOn:document.documentElement.classList.contains('mq-national-active')}));
  T('Fin de séance : bilan stocké, 20 réponses, score et domaines, mode sans aide désactivé',!rep.m&&!rep.active&&!rep.classOn&&rep.hist.length===1&&rep.hist[0].questions===20&&rep.hist[0].domains.length>=3&&/Résultats par domaine/.test(rep.report)&&/Entraînement non officiel/.test(rep.report),JSON.stringify(rep.hist[0]||{}));
  T('Bilan : exactement deux conseils et aucun faux label « épreuve officielle »',rep.hist[0].advice.length===2&&!/épreuve officielle/i.test(rep.report.replace(/ne reproduit pas une épreuve ministérielle/i,'')),rep.report.slice(0,700));

  const oldId=rep.hist[0].id;await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForSelector('.mq-na-history');const histUi=await p.evaluate(id=>({rows:document.querySelectorAll('.mq-na-report-row').length,button:!!document.querySelector(`[data-a="nationalreport:${encodeURIComponent(id)}"]`)}),oldId);
  T('Historique : le bilan est rouvrable depuis le profil',histUi.rows===1&&histUi.button,JSON.stringify(histUi));

  // Nouveau profil : historique isolé.
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(80);
  const iso=await p.evaluate(()=>({name:S.name,n:(S.nationalAssessments||[]).length}));
  T('Multi-profils : les bilans restent propres à chaque enfant',iso.name==='Noé'&&iso.n===0,JSON.stringify(iso));

  await p.evaluate(()=>{HOMETAB='progres';home();});await p.waitForTimeout(80);const nav=await p.evaluate(()=>({button:!!document.querySelector('[data-a="nationalscreen"]'),tabs:document.querySelectorAll('#hometabs .htab').length}));
  T('Navigation : accès depuis Progrès sans nouvel onglet principal',nav.button&&nav.tabs===4,JSON.stringify(nav));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>MQNationalAssessment.screen());await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('.mq-na')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : écran sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant la simulation nationale',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
