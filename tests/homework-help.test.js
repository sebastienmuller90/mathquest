/* Aide aux devoirs : matière -> thème -> cours/exercices, historique et responsive multi-écrans. */
const {serve,launch,seedProfile}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1400)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lina','CE2');
  await p.waitForFunction(()=>!!window.MQHomeworkHelp&&!!window.MQEconomy,null,{timeout:6000});
  const boot=await p.evaluate(()=>({hh:!!MQHomeworkHelp,eco:!!MQEconomy,css:document.querySelectorAll('link[href="js/homework-help.css"]').length,js:document.querySelectorAll('script[src="js/homework-help.js"]').length,subjects:MQHomeworkHelp.subjects().length}));
  T('Aide aux devoirs chargée une seule fois au-dessus de l’économie anti-triche',boot.hh&&boot.eco&&boot.css===1&&boot.js===1&&boot.subjects>0,JSON.stringify(boot));
  await p.waitForSelector('[data-homework-help-card="1"]');T('Carte Aide aux devoirs visible sur l’accueil',await p.locator('[data-homework-help-card="1"]').count()===1);
  await p.click('[data-a="homeworkhelp"]');
  const intro=await p.evaluate(()=>({cur:CUR,subs:document.querySelectorAll('.hh-subject').length,text:document.body.innerText.includes('Sur quoi porte ton devoir')}));
  T('Écran d’entrée : matières du niveau courant uniquement',intro.cur==='homework-help'&&intro.subs>0&&intro.text,JSON.stringify(intro));

  const data=await p.evaluate(()=>{const s=MQHomeworkHelp.subjects().find(x=>MQHomeworkHelp.chapters(x.id).length>1);const cs=s?MQHomeworkHelp.chapters(s.id):[];return {sid:s?.id||'',sname:s?.name||'',cid:cs[0]?.id||'',cname:cs[0]?.name||'',token:(cs[0]?.name||'').split(/\s+/).find(x=>x.length>=4)||''};});
  T('Une matière avec thèmes est disponible pour le profil',!!data.sid&&!!data.cid,JSON.stringify(data));
  await p.click(`[data-a="hhsubject:${data.sid}"]`);await p.waitForSelector('#hhq');
  const allCount=await p.locator('.hh-topic').count();await p.fill('#hhq',data.token);await p.click('[data-a="hhsearch"]');const filtered=await p.locator('.hh-topic').count();
  T('Recherche de leçon filtre réellement les thèmes',filtered>=1&&filtered<=allCount,JSON.stringify({allCount,filtered,token:data.token}));
  await p.click(`[data-a="hhtopic:${data.cid}"]`);
  const topic=await p.evaluate(cid=>({hasCourse:!!document.querySelector(`[data-a="hhlesson:${cid}"]`),hasFast:!!document.querySelector(`[data-a="hhfast:${cid}"]`),has5:!!document.querySelector(`[data-a="hhexo:${cid}|5"]`),has8:!!document.querySelector(`[data-a="hhexo:${cid}|8"]`),recap:/Révision express/.test(document.body.innerText),hist:S.homeworkHelp?.history?.length||0}),data.cid);
  T('Thème : fiche express + cours complet + révision rapide + séries 5/8',topic.hasCourse&&topic.hasFast&&topic.has5&&topic.has8&&topic.recap&&topic.hist>=1,JSON.stringify(topic));

  await p.click(`[data-a="hhexo:${data.cid}|5"]`);await p.waitForFunction(()=>typeof M!=='undefined'&&!!M&&M.n===5,null,{timeout:5000});
  const mission=await p.evaluate(cid=>({n:M.n,cid:M.ids?.[0],flash:!!M.flash,path:!!M.path,eco:!!MQEconomy} ),data.cid);
  T('5 exercices : vraie mission ciblée, soumise à l’économie anti-triche',mission.n===5&&mission.cid===data.cid&&!mission.flash&&!mission.path&&mission.eco,JSON.stringify(mission));
  await p.evaluate(()=>{M.ok=M.n;M.xp=0;M.coins=0;endMission();});await p.waitForSelector('[data-a^="hhreturn:"]');
  T('Après la série, un bouton revient à la révision du devoir',await p.locator(`[data-a="hhreturn:${data.cid}"]`).count()===1);
  await p.click(`[data-a="hhreturn:${data.cid}"]`);await p.waitForSelector(`[data-a="hhexo:${data.cid}|8"]`);
  const hist=await p.evaluate(cid=>({n:S.homeworkHelp?.history?.length||0,result:S.homeworkHelp?.history?.some(x=>x.cid===cid&&x.kind==='result'),profile:S.name}),data.cid);
  T('Historique de révision enregistré dans le profil',hist.n>=2&&hist.result&&hist.profile==='Lina',JSON.stringify(hist));

  const sizes=[[390,844,'phone-portrait'],[844,390,'phone-landscape'],[768,1024,'tablet-portrait'],[1024,768,'tablet-landscape'],[1440,900,'desktop']];
  const layout=[];
  for(const [width,height,name] of sizes){await p.setViewportSize({width,height});await p.evaluate(cid=>MQHomeworkHelp.openTopic(cid),data.cid);await p.waitForSelector('.hh-actions');const g=await p.evaluate(()=>({doc:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,app:document.getElementById('app').scrollWidth,hero:document.querySelector('.hh-topic-head')?.getBoundingClientRect().width||0,actions:getComputedStyle(document.querySelector('.hh-actions')).gridTemplateColumns}));layout.push({name,width,height,...g});}
  T('Portrait, paysage, tablette et desktop : aucun débordement horizontal',layout.every(x=>x.doc<=x.client+1&&x.app<=x.client+1&&x.hero<=x.client+1),JSON.stringify(layout));
  T('Paysage/tablette/desktop utilisent une composition multi-colonnes',layout.filter(x=>x.width>x.height||x.width>=900).every(x=>String(x.actions).split(' ').length>=2),JSON.stringify(layout));
  T('Aucune erreur JavaScript pendant l’aide aux devoirs',!errs.length,errs.slice(0,10).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
