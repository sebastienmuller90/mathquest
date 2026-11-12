/* Calibration du niveau v2 (12/11/2026) — 20 questions, note sur 20, bilan par matière / domaine / chapitre,
   parcours conseillé, calibrations par matière, reprise, compatibilité avec les anciennes calibrations (12 questions),
   aucune modification d'XP ni de pièces, aucun débordement à 360 px, aucune erreur JavaScript. */
const {serve,launch,seedProfile}=require('./lib');
// Joue la question courante (S.diagnostic.active ou S.calib.active) : bonne réponse si ok, sinon une réponse fausse.
const PLAY=`(ok=>{const D=(S.calib&&S.calib.active)||(S.diagnostic&&S.diagnostic.active);const q=D.questions[D.i].q;
  if(q.type==='choice'){ACT.diagpick(ok?q.ans:(q.ans+1)%q.choices.length);return;}
  if(q.type==='order'){let rest=String(q.ans);const used=new Set(),idx=[];let g=0;while(rest.length&&g++<60){const k=q.tokens.findIndex((t,j)=>!used.has(j)&&rest.startsWith(t));if(k<0)break;used.add(k);idx.push(k);rest=rest.slice(q.tokens[k].length).trim();}
   q.tokens.forEach((t,j)=>{if(!used.has(j))idx.push(j);});(ok?idx:idx.slice().reverse()).forEach(k=>ACT.diagtok(k));ACT.diagvalid();return;}
  if(q.type==='multi'){q.labels.forEach((l,j)=>{document.getElementById('di'+j).value=ok?String(Array.isArray(q.ans)?q.ans[j]:q.ans):'@@';});ACT.diagvalid();return;}
  const good=Array.isArray(q.ans)?q.ans.join('/'):(q.ans!==undefined?String(q.ans):(q.acc?String(q.acc[0]):''));
  document.getElementById('di0').value=ok?good:'@@';ACT.diagvalid();})`;
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
  const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:360,height:740}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});

  // 1. Plans : 20 questions, matières principales couvertes, chapitres existants et distincts, domaines variés
  for(const g of ['CP','CE2','6e','3e']){
    await seedProfile(p,'Plan',g);
    const r=await p.evaluate(()=>{const pl=MQDiagnostic.buildPlan('all'),by={};for(const x of pl)by[x.subject]=(by[x.subject]||0)+1;
      const ok=pl.every(x=>CHMAP[x.cid]&&WMAP[x.cid].lvl===S.grade);const m=MQDiagnostic.buildPlan('maths'),doms=new Set(m.map(x=>MQDiagnostic.domainOf(x.cid).cat));
      const f=MQDiagnostic.buildPlan('francais'),fd=new Set(f.map(x=>MQDiagnostic.domainOf(x.cid).cat));
      return {n:pl.length,by,uniq:new Set(pl.map(x=>x.cid)).size,ok,mathsN:m.length,mathsDoms:doms.size,mathsOnly:m.every(x=>x.subject==='maths'),frN:f.length,frDoms:fd.size,hasMF:!!by.maths&&!!by.francais,min:Math.min(...Object.values(by)),subjects:Object.keys(by).length};});
    T(`[${g}] Plan général : 20 questions, matières principales (≥ 3 matières, ≥ 2 questions chacune), chapitres de la classe tous distincts`,r.n===20&&r.uniq===20&&r.ok&&r.hasMF&&r.subjects>=3&&r.subjects<=5&&r.min>=2,JSON.stringify(r));
    T(`[${g}] Plan par matière : 20 questions de maths et de français réparties sur plusieurs domaines`,r.mathsN===20&&r.mathsOnly&&r.mathsDoms>=3&&r.frN===20&&r.frDoms>=3,JSON.stringify({mathsDoms:r.mathsDoms,frDoms:r.frDoms}));
  }

  // 2. Analyse : comptes par matière, domaine et chapitre (enregistrement fabriqué à la main)
  await seedProfile(p,'Analyse','6e');
  const an=await p.evaluate(()=>{const pl=MQDiagnostic.buildPlan('maths'),rec={completedAt:Date.now(),grade:S.grade,mode:'maths',total:20,ok:0,answers:pl.map((x,i)=>({cid:x.cid,subject:'maths',d:x.d,ok:i%2===0,q:'Question '+i}))};rec.ok=rec.answers.filter(a=>a.ok).length;
    const A=MQDiagnostic.analyse(rec);return {n:A.n,ok:A.ok,note:A.note20,subjOk:A.subjects[0].ok,subjN:A.subjects[0].n,domSum:A.domains.reduce((a,d)=>a+d.n,0),domOk:A.domains.reduce((a,d)=>a+d.ok,0),chapN:A.domains.reduce((a,d)=>a+d.chapters.length,0),ratioOk:A.domains.every(d=>Math.abs(d.ratio-d.ok/d.n)<1e-9)};});
  T('Analyse : 20 réponses, 10 justes → note 10/20, comptes de domaines et de chapitres cohérents',an.n===20&&an.ok===10&&an.note===10&&an.subjOk===10&&an.subjN===20&&an.domSum===20&&an.domOk===10&&an.chapN===20&&an.ratioOk,JSON.stringify(an));

  // 3. Calibration générale puis par matière : sans toucher à XP/pièces, sans écraser le bilan général
  await seedProfile(p,'Lina','6e');
  const base=await p.evaluate(()=>({xp:S.xp,coins:S.coins,totalQ:S.totalQ}));
  await p.evaluate(()=>ACT.diagstart());
  for(let i=0;i<20;i++){await p.evaluate(PLAY+'('+(i<13)+')');}
  await p.waitForFunction(()=>CUR==='diagnostic-done',null,{timeout:5000});
  const g1=await p.evaluate(()=>({d:S.diagnostic,txt:document.querySelector('.diag-note')?.innerText||'',sub:document.querySelectorAll('.cal-sub').length,dom:document.querySelectorAll('.cal-dom').length,ch:document.querySelectorAll('.cal-chaps li').length,steps:document.querySelectorAll('.cal-step').length,finot:document.querySelector('.cal-finot')?.innerText||'',sw:document.documentElement.scrollWidth,iw:innerWidth,xp:S.xp,coins:S.coins,totalQ:S.totalQ}));
  T('Calibration générale : 20 questions, note 13/20, bilan complet (matières, domaines, chapitres ✅/❌, parcours, message de Finot)',g1.d.total===20&&g1.d.ok===13&&g1.d.note20===13&&g1.txt.includes('13 / 20')&&g1.sub>=3&&g1.dom>=4&&g1.ch>=10&&g1.steps>=1&&g1.finot.length>80,JSON.stringify({total:g1.d.total,ok:g1.d.ok,note:g1.d.note20,sub:g1.sub,dom:g1.dom,ch:g1.ch,steps:g1.steps}));
  T('Calibration générale : aucun XP, pièce ni compteur de réponses modifié ; 360 px sans débordement',g1.xp===base.xp&&g1.coins===base.coins&&g1.totalQ===base.totalQ&&g1.sw<=g1.iw+1,JSON.stringify({xp:g1.xp,coins:g1.coins,totalQ:g1.totalQ,sw:g1.sw,iw:g1.iw}));
  const finotTxt=g1.finot;
  T('Message de Finot : encourageant, cite des matières, jamais de mot décourageant',/Là où tu (brilles|as le plus à gagner)|homogène/.test(finotTxt)&&!/nul|catastroph|échec|mauvais/i.test(finotTxt),finotTxt.slice(0,260));

  // 4. Calibration par matière : maths 6e
  await p.evaluate(()=>ACT.diagsub('maths'));await p.waitForFunction(()=>CUR==='diagnostic'&&!!S.calib?.active,null,{timeout:3000});
  const gen=await p.evaluate(()=>({n:S.calib.active.questions.length,mode:S.calib.active.mode,all:S.calib.active.questions.every(x=>x.subject==='maths'),head:document.body.innerText.includes('Calibrer · Maths'),diagKept:!!S.diagnostic.completedAt&&S.diagnostic.total===20}));
  T('Calibrer en maths : 20 questions de maths, bilan général conservé',gen.n===20&&gen.mode==='maths'&&gen.all&&gen.head&&gen.diagKept,JSON.stringify(gen));
  // pause puis reprise : même série de questions
  for(let i=0;i<3;i++){await p.evaluate(PLAY+'(true)');}
  const ids1=await p.evaluate(()=>S.calib.active.questions.map(x=>x.cid).join(','));
  await p.evaluate(()=>ACT.diagpause());await p.waitForFunction(()=>CUR==='home',null,{timeout:3000});
  const paused=await p.evaluate(()=>({i:S.calib&&S.calib.active&&S.calib.active.i,diag:!!S.diagnostic.completedAt}));
  await p.evaluate(()=>ACT.diagsub('maths'));await p.waitForFunction(()=>CUR==='diagnostic',null,{timeout:3000});
  const resumed=await p.evaluate(()=>({i:S.calib.active.i,ids:S.calib.active.questions.map(x=>x.cid).join(','),txt:document.body.innerText.includes('Question 4/20')}));
  T('Pause et reprise d’une calibration par matière : même série, reprise à la question 4, bilan général intact',paused.i===3&&paused.diag&&resumed.i===3&&resumed.ids===ids1&&resumed.txt,JSON.stringify({paused,resumed:{i:resumed.i,txt:resumed.txt}}));
  for(let i=3;i<20;i++){await p.evaluate(PLAY+'('+(i%3!==0)+')');}
  await p.waitForFunction(()=>CUR==='diagnostic-done',null,{timeout:5000});
  const m1=await p.evaluate(()=>{const c=S.calibrations&&S.calibrations.maths;return {c:c&&{total:c.total,ok:c.ok,note:c.note20,mode:c.mode},active:!!(S.calib&&S.calib.active),gen:S.diagnostic.note20,txt:document.querySelector('.diag-note')?.innerText||'',dom:document.querySelectorAll('.cal-dom').length,chap:document.querySelectorAll('.cal-chaps li').length,qs:document.querySelectorAll('.cal-qlist li').length,ko:document.querySelectorAll('.cal-chaps li.ko').length,ok:document.querySelectorAll('.cal-chaps li.ok').length,steps:document.querySelectorAll('.cal-step [data-a^="chap:"]').length,sw:document.documentElement.scrollWidth,iw:innerWidth,sub:document.querySelectorAll('.cal-sub').length}});
  T('Bilan de maths : note sur 20, domaines avec chapitres ✅/❌, parcours conseillé, détail des 20 questions',m1.c&&m1.c.total===20&&m1.c.mode==='maths'&&m1.txt.includes(m1.c.note+' / 20')&&m1.dom>=3&&m1.chap===20&&m1.qs===20&&m1.ko>=1&&m1.ok>=1&&m1.steps>=1&&m1.sub===0,JSON.stringify(m1));
  T('Calibration par matière : enregistrée à part (S.calibrations), reprise terminée, note générale intacte, 360 px sans débordement',!m1.active&&m1.gen===13&&m1.sw<=m1.iw+1,JSON.stringify({active:m1.active,gen:m1.gen}));

  // 5. « Mon niveau » : accès, lignes, bilans
  await p.evaluate(()=>{ACT.home();ACT.hometab('plus');});await p.waitForSelector('.diag-hub-card',{timeout:3000});
  await p.click('.diag-hub-card');await p.waitForFunction(()=>CUR==='diagnostic-hub',null,{timeout:3000});
  const hb=await p.evaluate(()=>({rows:document.querySelectorAll('.cal-hubrow').length,txt:document.body.innerText,sw:document.documentElement.scrollWidth,iw:innerWidth,bilan:document.querySelectorAll('.cal-hubrow [data-a^="diagshow:"]').length}));
  T('Mon niveau (onglet Plus) : bilan général et par matière listés avec leur note sur 20, boutons Bilan / Refaire',hb.rows>=6&&/13 \/ 20/.test(hb.txt)&&hb.bilan>=2&&/Refaire/.test(hb.txt)&&hb.sw<=hb.iw+1,JSON.stringify({rows:hb.rows,bilan:hb.bilan}));
  await p.evaluate(()=>ACT.diagshow('maths'));await p.waitForFunction(()=>CUR==='diagnostic-done',null,{timeout:3000});
  T('Mon niveau : le bilan de maths enregistré se rouvre',await p.evaluate(()=>document.body.innerText.includes('Calibration · Maths')&&document.querySelectorAll('.cal-dom').length>=3));
  await p.evaluate(()=>{ACT.home();ACT.hometab('progres');});await p.waitForSelector('.diag-hub-card',{timeout:3000});
  T('Mon niveau : accessible aussi depuis l’onglet Progrès',true);

  // 6. Anciennes calibrations (12 questions, sans domaines enregistrés) : bilan lisible, note recalculée
  await p.evaluate(()=>{const pl=MQDiagnostic.buildPlan('all').slice(0,12);S.diagnostic={completedAt:Date.now(),grade:S.grade,score:75,note20:15,ok:9,total:12,subjects:{},answers:pl.map((x,i)=>({cid:x.cid,subject:x.subject,d:x.d,ok:i<9,skillKind:'',q:'Ancienne question '+i}))};saveLocal();ACT.diagshow('all');});
  const old=await p.evaluate(()=>({txt:document.querySelector('.diag-note')?.innerText||'',qs:document.querySelectorAll('.cal-qlist li').length,dom:document.querySelectorAll('.cal-dom').length}));
  T('Ancienne calibration (12 questions) : bilan toujours affichable, 15/20, détail des 12 questions',old.txt.includes('15 / 20')&&old.txt.includes('9 bonnes réponses sur 12')&&old.qs===12&&old.dom>=3,JSON.stringify(old));
  // Calibration générale en cours à l'ancienne (12 questions) : elle se termine normalement
  await p.evaluate(()=>{const D=MQDiagnostic.create('all');D.questions=D.questions.slice(0,12);S.diagnostic={active:D};saveLocal();ACT.diagstart();});
  for(let i=0;i<12;i++){await p.evaluate(PLAY+'(true)');}
  await p.waitForFunction(()=>CUR==='diagnostic-done',null,{timeout:5000});
  const fin12=await p.evaluate(()=>({t:S.diagnostic.total,n:S.diagnostic.note20,txt:document.querySelector('.diag-note')?.innerText||''}));
  T('Calibration en cours à 12 questions (ancienne sauvegarde) : se termine, note ramenée sur 20',fin12.t===12&&fin12.n===20&&fin12.txt.includes('20 / 20'),JSON.stringify(fin12));

  // 7. Confidentialité : le bilan n'est pas envoyé au suivi parent à distance
  const priv=await p.evaluate(()=>{try{const snap=window.MQSyncSnapshot&&MQSyncSnapshot.build?MQSyncSnapshot.build(S,Date.now()):null;return snap?{has:('calibrations' in snap)||('calib' in snap)||('diagnostic' in snap)}:{skip:true};}catch(e){return {err:e.message};}});
  T('Confidentialité : calibrations et diagnostic absents des données envoyées au suivi parent',priv.skip||priv.has===false,JSON.stringify(priv));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
