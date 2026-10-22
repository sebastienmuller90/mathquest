/* Longueur des séries et quiz (22/10/2026) : les exercices étaient figés à 8 questions et le quiz de cours à 6, quel que soit l'âge.
   1. Choix du niveau d'exercice : l'enfant choisit aussi la longueur (8 / 12 / 20), 8 par défaut, choix mémorisé par profil.
   2. La série lancée a bien la longueur choisie (barre de progression comprise) ; le parcours et « Révision » gardent leur propre longueur.
   3. Les étoiles de fin de mission restent proportionnelles à la réussite quelle que soit la longueur choisie.
   4. Quiz de cours adapté à l'âge : 6 questions en CP-CE1, 8 du CE2 au CM2, 10 au collège, seuil de 70 % recalculé.
   5. Mode parent : les erreurs-types déjà repérées par Finot (retenue oubliée, virgule décalée…) apparaissent dans le suivi.
   6. Aucun débordement horizontal à 320 px, aucune erreur JavaScript. */
const {serve,launchEngine,seedProfile}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,600)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);const errs=[];
 const ctx=await b.newContext({viewport:{width:320,height:640}});await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Lou','CE2');
 const cid=await p.evaluate(()=>SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).id);
 // 1. Choix de la longueur dans l'écran de niveau
 await p.evaluate(id=>ACT.start(id),cid);await p.waitForTimeout(60);
 const pick=await p.evaluate(()=>({opts:[...document.querySelectorAll('[data-a^="serieslen:"]')].map(x=>({n:+x.dataset.a.split(':')[1],on:x.getAttribute('aria-pressed')==='true'})),over:document.documentElement.scrollWidth-window.innerWidth}));
 T('Choix du niveau : longueurs 8, 12 et 20 proposées, 8 par défaut',JSON.stringify(pick.opts.map(o=>o.n))==='[8,12,20]'&&pick.opts.find(o=>o.on)?.n===8,JSON.stringify(pick));
 T('Choix du niveau à 320 px : aucun débordement horizontal',pick.over<=1,'débordement '+pick.over+' px');
 // 2. Série de 20, puis mémorisation
 await p.click('[data-a="serieslen:20"]');
 const on20=await p.evaluate(()=>document.querySelector('[data-a="serieslen:20"]').getAttribute('aria-pressed'));
 await p.click(`[data-a="startlevel:${cid}|2"]`);await p.waitForTimeout(60);
 const m=await p.evaluate(()=>({n:M&&M.n,q:M&&M.queue&&M.queue.length,cur:CUR,saved:S.seriesLen}));
 T('Série longue choisie : la mission compte 20 questions et le choix est mémorisé dans le profil',on20==='true'&&m.n===20&&m.q===20&&m.cur==='mission'&&m.saved===20,JSON.stringify(m));
 await p.evaluate(()=>{M=null;save();});await p.reload({waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&S.name==='Lou');
 await p.evaluate(id=>ACT.start(id),cid);await p.waitForTimeout(60);
 const kept=await p.evaluate(()=>document.querySelector('[aria-pressed="true"][data-a^="serieslen:"]')?.dataset.a);
 T('Après rechargement : la longueur choisie (20) reste sélectionnée',kept==='serieslen:20',kept);
 const other=await p.evaluate(()=>{const ids=SCH(S.subj).slice(0,3).map(c=>c.id);startMission(ids);const a=M.n;startMission(ids,{n:5});return {def:a,forced:M.n};});
 T('Les séries lancées sans choix explicite (parcours, révisions) gardent leur longueur propre',other.def===8&&other.forced===5,JSON.stringify(other));
 await p.evaluate(()=>{S.seriesLen='abc';save();});const bad=await p.evaluate(id=>{ACT.startlevel(id+'|2');return M.n;},cid);
 T('Valeur mémorisée corrompue : retour à 8 sans erreur',bad===8,String(bad));
 // 3. Barème d'étoiles indépendant de la longueur : même règle historique, exprimée en taux de réussite.
 const starCases=await p.evaluate(id=>{const original=JSON.parse(JSON.stringify(S)),cases=[[8,8],[6,8],[8,12],[12,12],[8,20],[15,20],[20,20]],out=[];
  const restore=()=>{for(const k of Object.keys(S))delete S[k];Object.assign(S,JSON.parse(JSON.stringify(original)));};
  for(const [ok,n] of cases){restore();const cs=S.chap[id]||(S.chap[id]={stars:0,ok:0,tot:0});cs.stars=0;const mm={ok,n,ids:[id],xp:0,coins:0,mg:0,newB:[],wrong:n-ok,L0:lvl(S.xp),path:false};endChapterMission(mm);out.push({ok,n,stars:S.chap[id].stars,label:document.querySelector('.end .lead')?.textContent.trim()||''});}
  restore();save();return out;
 },cid);
 const starExpected=[[8,8,3,'Sans faute !'],[6,8,2,'Très bien !'],[8,12,1,'Pas mal, continue !'],[12,12,3,'Sans faute !'],[8,20,0,'On recommence ? Tu vas y arriver 💪'],[15,20,2,'Très bien !'],[20,20,3,'Sans faute !']];
 for(const [ok,n,stars,label] of starExpected){const got=starCases.find(x=>x.ok===ok&&x.n===n);T(`Étoiles ${ok}/${n} : ${stars} étoile${stars>1?'s':''} et libellé cohérent`,!!got&&got.stars===stars&&got.label===label,JSON.stringify(got));}
 // 4. Quiz de cours selon l'âge
 const quiz={};for(const g of ['CP','CE1','CE2','CM2','6e','3e']){await p.evaluate(g=>{S.grade=g;save();},g);
  quiz[g]=await p.evaluate(()=>{const c=SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade)||reco();openLesson(c.id);const n=LESSON_QUIZ_N;L.ok=Math.ceil(.7*n)-1;endLesson();const fail=document.querySelector('#app').innerText;return {n,fail:/pas encore validé/.test(fail),need:(fail.match(/au moins (\d+)\/(\d+)/)||[]).slice(1).join('/')};});}
 T('Quiz de cours : 6 questions en CP-CE1, 8 du CE2 au CM2, 10 au collège',quiz.CP.n===6&&quiz.CE1.n===6&&quiz.CE2.n===8&&quiz.CM2.n===8&&quiz['6e'].n===10&&quiz['3e'].n===10,JSON.stringify(quiz));
 T('Seuil de 70 % recalculé : 5/6, 6/8, 7/10 ; une bonne réponse de moins ne valide pas',quiz.CP.need==='5/6'&&quiz.CE2.need==='6/8'&&quiz['6e'].need==='7/10'&&Object.values(quiz).every(x=>x.fail),JSON.stringify(quiz));
 const okq=await p.evaluate(()=>{S.grade='CM1';save();const c=SCH(S.subj).find(c=>WMAP[c.id]&&WMAP[c.id].lvl==='CM1');openLesson(c.id);L.ok=Math.ceil(.7*LESSON_QUIZ_N);endLesson();return {v:!!S.lessons[c.id],t:document.querySelector('#app').innerText.match(/Mini-quiz : (\d+\/\d+)/)?.[1]};});
 T('Quiz de cours CM1 réussi à 6/8 : cours validé',okq.v&&okq.t==='6/8',JSON.stringify(okq));
 // 5. Erreurs-types dans le suivi parent
 const par=await p.evaluate(()=>{const c=SCH(S.subj)[0];const pat=MQErrorPatterns.detect({type:'num',q:'Calcule 47 + 38',ans:85},'75');MQErrorPatterns.record(c.id,{q:'Calcule 47 + 38'},'75',pat);MQErrorPatterns.record(c.id,{q:'Calcule 58 + 26'},'74',MQErrorPatterns.detect({type:'num',q:'Calcule 58 + 26',ans:84},'74'));
  PARENT=true;parentScreen('suivi');const app=document.querySelector('#app'),t=app.innerText;return {pat:pat&&pat.id,has:/Erreurs-types repérées/.test(t),label:/Retenue oubliée/.test(t),count:/2 fois/.test(t),tip:/retenue/i.test(t),over:document.documentElement.scrollWidth-window.innerWidth};});
 T('Suivi parent : rubrique « Erreurs-types repérées » avec le type, le nombre et le conseil',par.pat==='carry-forgotten'&&par.has&&par.label&&par.count&&par.tip,JSON.stringify(par));
 T('Suivi parent à 320 px : aucun débordement horizontal',par.over<=1,'débordement '+par.over+' px');
 const empty=await p.evaluate(()=>{S.errorPatterns={events:[],counts:{}};parentScreen('suivi');const t=document.querySelector('#app').innerText;return /Erreurs-types repérées/.test(t)&&/Aucune erreur-type/.test(t);});
 T('Suivi parent sans erreur-type : message neutre, pas de rubrique vide',empty);
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;