/* Architecture stabilisée (20/10/2026) : points d'extension js/app-hooks.js, fonctions cœur à propriétaire unique.
   Vérifie l'API MQHooks, l'absence d'injection/timer de réinstallation, le comptage unique d'une réponse (y compris double
   clic réel), le niveau imposé fixe, l'isolation de l'écran de mission (barre d'onglets, carte de calibrage), le parcours
   (M.path posé avant la 1re question), l'isolation de Finot entre profils, la sauvegarde en échec sans ACK distant. */
const fs=require('fs'),path=require('path');const {serve,launch,ROOT,seedProfile}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const js=fs.readdirSync(path.join(ROOT,'js')).filter(f=>f.endsWith('.js'));
 const bad=js.filter(f=>{const s=fs.readFileSync(path.join(ROOT,'js',f),'utf8');return /setInterval\([^;]*,\s*50\s*\)/.test(s)||/createElement\(['"]script['"]\)/.test(s);});
 const core=['startMission','nextQ','result','renderQ','renderLesson','lvalidate','makeDailyPath','ensurePath','pathScreen','activateProfile','finotAsk','saveLocal','save','syncNow','endMission','pathExoDone','pathChestGains','home','parentScreen','lessonSteps','finotChipsRender','finotPush','finotOpen'];
 const reassigned=[];for(const f of js){const s=fs.readFileSync(path.join(ROOT,'js',f),'utf8');for(const n of core)if(new RegExp('(^|[^.\\w$])'+n+'\\s*=\\s*(function|\\(|async)','m').test(s))reassigned.push(f+':'+n);}
 T('Aucun timer de réinstallation, aucune injection de script, audit-fixes/audit-followup absorbés',!bad.length&&!fs.existsSync(path.join(ROOT,'js/audit-fixes.js'))&&!fs.existsSync(path.join(ROOT,'js/audit-followup.js')),bad.join(','));
 T('Fonctions cœur à propriétaire unique (aucune réaffectation par un autre module)',!reassigned.length,reassigned.join(', '));
 const hoverMove=['styles.css','pedagogy-upgrade.css','age-adaptive.css'].flatMap(f=>(fs.readFileSync(path.join(ROOT,f),'utf8').match(/[^{}]*:hover[^{}]*{[^}]*transform[^}]*}/g)||[]).map(r=>f+' '+r.trim().slice(0,80)));
 T('Aucun survol ne déplace un élément cliquable (pas de transform dans :hover)',!hoverMove.length,hoverMove.join(' | '));

 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 // Suivi distant désactivé par défaut (js/remote-sync-config.js) : backend de TEST pour exercer la logique de synchronisation.
 await ctx.addInitScript(()=>{window.FINOT_REMOTE_SYNC={enabled:true,url:'https://finottest.supabase.co',key:'sb_publishable_TESTKEY123',schema:'api'};});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/\[MQHooks\] t:x/.test(m.text()))errs.push('console: '+m.text());});
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
 const api=await p.evaluate(()=>{const H=MQHooks,out=[];H.on('t:x',()=>out.push('a1'),{id:'a'});H.on('t:x',()=>out.push('a2'),{id:'a'});H.on('t:x',()=>{throw new Error('boom');},{id:'err',order:1});H.on('t:x',()=>out.push('b'),{id:'b',order:200});
  const nErr=H.errors().length;H.emit('t:x');const f=H.filter('t:f',1);H.on('t:f',v=>v+1,{id:'p1'});H.on('t:f',v=>v*10,{id:'p2',order:50});const f2=H.filter('t:f',1);
  H.on('t:first',()=>false,{id:'n'});H.on('t:first',()=>true,{id:'y'});H.on('t:first',()=>{out.push('jamais');return true;},{id:'z'});const fi=H.first('t:first',{});
  for(const e of ['t:x','t:f','t:first'])for(const id of Object.values(H.list()[e]||[]))H.off(e,id);
  return {out,f,f2,fi,err:H.errors().length-nErr,scripts:[...document.scripts].filter(s=>/audit-(fixes|followup)/.test(s.src)).length};});
 T('MQHooks : abonnement idempotent par id, ordre, erreur isolée, filter en chaîne, first s’arrête au premier',api.out.join()==='a2,b'&&api.f===1&&api.f2===11&&api.fi===true&&api.err===1&&!api.scripts,JSON.stringify(api));

 await seedProfile(p,'Lina','CP');
 const homeState=await p.evaluate(()=>({card:!!document.querySelector('#app .diag-home-card'),tabs:document.getElementById('hometabs')?.classList.contains('show')}));
 await p.evaluate(()=>{const id=reco().id;home();ACT.startlevel(id+'|1');});await p.waitForTimeout(120);
 const mis=await p.evaluate(()=>({cur:CUR,tabs:document.getElementById('hometabs')?.classList.contains('show'),card:!!document.querySelector('#app .diag-home-card'),forced:M&&M.forcedDifficulty,d:M&&M.d,act:MQActivity.active()?.kind,study:Object.keys(S.interrogations?.studyLog||{}).length}));
 T('Mission ouverte depuis l’accueil : écran isolé (barre d’onglets masquée, pas de carte « Calibrer mon niveau »)',homeState.card&&homeState.tabs&&mis.cur==='mission'&&!mis.tabs&&!mis.card,JSON.stringify({homeState,mis}));
 T('Niveau imposé via startlevel : passe par startMission (séance suivie)',mis.forced===1&&mis.d===1&&mis.act==='exercise',JSON.stringify(mis));

 const once=await p.evaluate(()=>{const q=M.q,a0={tq:S.totalQ,log:(S.answerLog||[]).length,xp:S.xp,coins:S.coins,rec:(S.recent[M.cid]||[]).length};
  if(q.type==='choice'){validate(q.ans);validate(q.ans);}else result(true);result(true);result(false);
  return {a0,a1:{tq:S.totalQ,log:S.answerLog.length,xp:S.xp,coins:S.coins,rec:S.recent[M.cid].length},d:M.d};});
 T('Réponse comptée une seule fois (question, journal, XP, pièces, historique) malgré des validations répétées',once.a1.tq===once.a0.tq+1&&once.a1.log===once.a0.log+1&&once.a1.rec===once.a0.rec+1&&once.a1.xp>once.a0.xp&&once.a1.xp-once.a0.xp<=40,JSON.stringify(once));
 await p.evaluate(()=>{if(M&&M.locked)advance();});
 let dbl=null;for(let k=0;k<6&&!dbl;k++){const isChoice=await p.evaluate(()=>M&&M.q.type==='choice');if(isChoice){const tq0=await p.evaluate(()=>S.totalQ);const sel=await p.evaluate(()=>`.choice[data-a="pick:${M.q.ans}"]`);await p.dblclick(sel);await p.waitForTimeout(60);dbl={d:(await p.evaluate(()=>S.totalQ))-tq0};}else{await p.evaluate(()=>{result(true);advance();});}}
 T('Double clic réel sur une réponse : une seule réponse enregistrée',dbl&&dbl.d===1,JSON.stringify(dbl));
 const lv=await p.evaluate(()=>{const ds=[];for(let i=0;i<6&&M&&!M.flash&&M.i<M.n;i++){if(!M.locked)result(true);ds.push(M.d);clearTimeout(M.tid);if(M.i<M.n-1)advance();else break;}return ds;});
 T('Niveau Facile choisi : difficulté fixe toute la série (plus d’écrasement par la série par chapitre)',lv.length>=3&&lv.every(d=>d===1),lv.join(','));
 await p.evaluate(()=>ACT.home());

 const pathq=await p.evaluate(()=>{const p=ensurePath();p.steps.slice(0,4).forEach(s=>s.status='done');p.steps[4].status='next';let seen=null;MQHooks.on('mission:question',(q,{M:m})=>{seen=!!(m&&m.path);},{id:'test-probe',order:999});pathGo(4);MQHooks.off('mission:question','test-probe');return {seen,n:M&&M.n,path:!!(M&&M.path),ids:M&&M.ids.length};});
 T('Parcours : la série démarre avec M.path et 8 questions réparties sur les leçons du jour',pathq.seen===true&&pathq.path&&pathq.n===8&&pathq.ids>=2,JSON.stringify(pathq));
 await p.evaluate(()=>ACT.home());

 const fin=await p.evaluate(()=>{const id=reco().id;startMission([id]);const q=M.q;if(q.type==='choice')validate((q.ans+1)%q.choices.length);else result(false);const before=!!MQFinotError.last;
  const other=Object.keys(PDB.profiles).find(k=>k!==ACTIVE);let after=null;if(!other){const cur=ACTIVE;createProfile();const nid=ACTIVE;activateProfile(cur,false);activateProfile(nid,false);after=!!MQFinotError.last;activateProfile(cur,false);}return {before,after};});
 T('Finot : l’erreur récente est oubliée au changement de profil',fin.before&&fin.after===false,JSON.stringify(fin));

 const sv=await p.evaluate(async()=>{const orig=Storage.prototype.setItem;const calls=[];const origRpc=window.rpc;
  S.sync=S.sync||{};S.sync.child='test-child';window.rpc=async(fn,args)=>{calls.push(fn);return fn==='mq_push'&&calls.filter(x=>x==='mq_push').length===1?[{id:'a1',kind:'bonus',payload:{n:2,why:'Test'}}]:null;};
  Storage.prototype.setItem=function(k){if(/mathquest/.test(k))throw new DOMException('quota','QuotaExceededError');return orig.apply(this,arguments);};
  let ok;try{ok=saveLocal();await syncNow();}finally{Storage.prototype.setItem=orig;window.rpc=origRpc;S.sync.child='';}
  return {ok,status:window.MQ_STORAGE_STATUS,calls,sync:SYNC};});
 const lvl3=await p.evaluate(()=>{const id=reco().id;MQPedagogy.openLessonAtLevel(id,3);const i=L.steps.findIndex(s=>s.k==='practice');if(i<0)return {skip:true};L.i=i;L.pq=null;renderLesson();const d=L.pq&&L.pq._mq&&L.pq._mq.d;ACT.home();return {d};});
 T('Niveau Difficile du cours : l’entraînement est aussi au niveau 3',lvl3.skip||lvl3.d===3,JSON.stringify(lvl3));
 const dblSync=await p.evaluate(async()=>{const orig=Storage.prototype.setItem,origRpc=window.rpc;S.sync=S.sync||{};S.sync.child='test-child';const pts0=S.merit.pts;let fail=true;const acts=[{id:'bonus-unique',kind:'bonus',payload:{n:3,why:'Test'}}];
  window.rpc=async fn=>fn==='mq_push'?acts:null;Storage.prototype.setItem=function(k){if(fail&&/mathquest/.test(k))throw new DOMException('quota','QuotaExceededError');return orig.apply(this,arguments);};
  try{await syncNow();fail=false;await syncNow();}finally{Storage.prototype.setItem=orig;window.rpc=origRpc;S.sync.child='';}return {gain:S.merit.pts-pts0};});
 T('Action parent renvoyée après un échec de sauvegarde : appliquée une seule fois',dblSync.gain===3,JSON.stringify(dblSync));
 T('Stockage plein : saveLocal() renvoie false, MQ_STORAGE_STATUS signale l’échec, aucun mq_ack envoyé',sv.ok===false&&sv.status&&sv.status.ok===false&&!sv.calls.includes('mq_ack')&&sv.sync.ok===false,JSON.stringify(sv));
 const hookErrs=await p.evaluate(()=>MQHooks.errors().filter(e=>!/^t:/.test(e.evt)));
 T('Aucune erreur JavaScript ni erreur d’abonné',!errs.length&&!hookErrs.length,errs.join(' | ')+JSON.stringify(hookErrs));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;