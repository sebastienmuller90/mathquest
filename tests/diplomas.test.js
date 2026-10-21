/* Diplômes de chapitre — maîtrise réelle, date honnête, unicité, galerie, PNG, profils et mobile. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');await p.waitForFunction(()=>!!window.MQDiplomas,{timeout:5000});

  const setup=await p.evaluate(()=>{const ids=ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade).map(c=>c.id).slice(0,4);const master=id=>{S.chap[id]={ok:24,tot:24,stars:3};S.lessons[id]=Date.now()-1000;S.lessonScores[id]=100;S.recent[id]=Array(12).fill(true);MQAdaptive.refreshMastery(S,id);return MQAdaptive.mastery(S,id);};return {ids,vals:ids.slice(0,3).map(master)};});
  T('Préparation : trois chapitres atteignent réellement le seuil de maîtrise',setup.ids.length>=4&&setup.vals.every(v=>v>=85),JSON.stringify(setup));

  const legacy=await p.evaluate(id=>{delete S.diplomas;const n=MQDiplomas.scan(true),at=S.diplomas?.[id],text=MQDiplomas.dateText(at);return {n,at,text,entries:MQDiplomas.entries().length};},setup.ids[0]);
  T('Récupération historique : diplôme reconnu sans inventer une date',legacy.n>=3&&legacy.at===-1&&/Déjà maîtrisé/.test(legacy.text)&&legacy.entries>=3,JSON.stringify(legacy));

  // Nouveau chapitre maîtrisé après installation : vraie date, jamais attribué deux fois.
  const fresh=await p.evaluate(id=>{delete S.diplomas[id];const before=Date.now(),first=MQDiplomas.award(id,false),at1=S.diplomas[id],second=MQDiplomas.award(id,false),at2=S.diplomas[id];return {first,second,at1,at2,before,mastery:MQAdaptive.mastery(S,id)};},setup.ids[1]);
  T('Nouveau diplôme : date réelle et attribution strictement unique',fresh.first&&!fresh.second&&fresh.at1===fresh.at2&&fresh.at1>=fresh.before&&fresh.mastery>=85,JSON.stringify(fresh));

  // Un chapitre sous 85 % ne peut pas recevoir de diplôme.
  const low=await p.evaluate(id=>{S.chap[id]={ok:2,tot:8,stars:0};S.recent[id]=[0,0,1,0];delete S.lessons[id];delete S.lessonScores[id];MQAdaptive.refreshMastery(S,id);const m=MQAdaptive.mastery(S,id),ok=MQDiplomas.award(id,false);return {m,ok,has:Object.prototype.hasOwnProperty.call(S.diplomas,id)};},setup.ids[3]);
  T('Seuil pédagogique : aucun diplôme sous 85 % de maîtrise',low.m<85&&!low.ok&&!low.has,JSON.stringify(low));

  // Accès depuis Progrès et galerie.
  await p.evaluate(()=>{HOMETAB='progres';home();});await p.waitForSelector('[data-a="diplomas"]');const access=await p.evaluate(()=>({text:document.querySelector('[data-a="diplomas"]')?.innerText,count:document.querySelectorAll('[data-a="diplomas"]').length}));
  T('Onglet Progrès : un seul accès Diplômes, placé avec les récompenses de progression',access.count===1&&/diplômes/i.test(access.text||''),JSON.stringify(access));
  await p.click('[data-a="diplomas"]');await p.waitForSelector('.mq-diploma-card');const gallery=await p.evaluate(()=>({cards:document.querySelectorAll('.mq-diploma-card').length,title:document.querySelector('.bar h1')?.textContent||'',legacy:[...document.querySelectorAll('.mq-dip-date')].some(x=>/Déjà maîtrisé/.test(x.textContent||'')),overflow:document.documentElement.scrollWidth-innerWidth}));
  T('Galerie : diplômes par chapitre, ancien diplôme identifié et aucun débordement',gallery.cards>=3&&/Mes diplômes/.test(gallery.title)&&gallery.legacy&&gallery.overflow<=1,JSON.stringify(gallery));

  // Ouvrir le diplôme daté et générer son PNG en mémoire.
  await p.evaluate(id=>MQDiplomas.open(id),setup.ids[1]);await p.waitForSelector('#mqDiplomaSheet');const cert=await p.evaluate(id=>{const cv=MQDiplomas.makeCanvas(id),sheet=document.getElementById('mqDiplomaSheet')?.innerText||'';return {name:/Lina/.test(sheet),chapter:/maîtrisé/i.test(sheet),date:!/Déjà maîtrisé/.test(sheet),w:cv?.width,h:cv?.height,png:cv?.toDataURL('image/png').slice(0,22)};},setup.ids[1]);
  T('Certificat : nom enfant, chapitre, vraie date et image PNG 1600×1131 générable localement',cert.name&&cert.chapter&&cert.date&&cert.w===1600&&cert.h===1131&&cert.png==='data:image/png;base64,',JSON.stringify(cert));

  // Persistance après rechargement.
  const countBefore=await p.evaluate(()=>Object.keys(S.diplomas||{}).length);await p.reload({waitUntil:'load'});await p.waitForFunction(()=>!!window.MQDiplomas,{timeout:5000});await p.waitForTimeout(80);const persisted=await p.evaluate(()=>({n:Object.keys(S.diplomas||{}).length,rows:MQDiplomas.entries().length}));
  T('Rechargement : diplômes persistants et aucune attribution dupliquée',persisted.n===countBefore&&persisted.rows===countBefore,JSON.stringify({countBefore,persisted}));

  // Nouveau profil : galerie vierge, sans fuite du premier enfant.
  await p.evaluate(()=>createProfile());await p.fill('#nm','Noé');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CM1"]');await p.click('[data-a="begin"]');await p.waitForTimeout(100);const iso=await p.evaluate(()=>({name:S.name,n:Object.keys(S.diplomas||{}).length,entries:MQDiplomas.entries().length}));
  T('Multi-profils : les diplômes de Lina ne sont jamais visibles chez Noé',iso.name==='Noé'&&iso.n===0&&iso.entries===0,JSON.stringify(iso));

  await p.setViewportSize({width:320,height:700});await p.evaluate(()=>MQDiplomas.gallery());await p.waitForTimeout(40);const mobile=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,right:document.querySelector('#app')?.getBoundingClientRect().right||0,vw:innerWidth}));
  T('Mobile 320 px : galerie sans débordement horizontal',mobile.overflow<=1&&mobile.right<=mobile.vw+2,JSON.stringify(mobile));
  T('Aucune erreur JavaScript pendant les diplômes',!errs.length,errs.slice(0,8).join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
