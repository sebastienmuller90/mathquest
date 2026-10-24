/* Audit de release (24/10/2026) — robustesse technique et performance « raisonnable ». Aucune optimisation, uniquement des constats.
   1. aucune erreur console / pageerror au chargement et sur une douzaine d'écrans ;
   2. aucune requête en échec ou 404 sur le parcours accueil → matières → cours → exercice ;
   3. fichiers statiques : scripts / feuilles de style / images / données référencés mais absents, scripts chargés deux fois ;
   4. poids des images (liste > 400 Ko, échec > 1,5 Mo) ;
   5. cohérence du cache PWA (pré-cache complet, VERSION au bon format) ;
   6. taille du localStorage après un profil et 200 réponses simulées ;
   7. écouteurs document / window et minuteries qui ne s'accumulent pas après des allers-retours accueil ↔ profils ↔ mission. */
const fs=require('fs'),path=require('path');
const {serve,launchEngine,freshContext,wizard,playMission}=require('./release-lib');
const {ROOT,swPrecache,seedProfile}=require('./lib');

const read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const exists=rel=>{try{return fs.statSync(path.join(ROOT,decodeURIComponent(rel))).isFile();}catch(e){return false;}};
const clean=u=>String(u).split('#')[0].split('?')[0].replace(/^\.\//,'');
const external=u=>/^(https?:|data:|mailto:|tel:|blob:|\/\/)/i.test(u);
function walk(dir,out=[]){for(const e of fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true})){const rel=dir?dir+'/'+e.name:e.name;if(e.isDirectory()){if(e.name==='node_modules'||e.name==='.git')continue;walk(rel,out);}else out.push(rel);}return out;}

// Compteurs d'écouteurs (uniques : fonction + capture, comme le navigateur) et de minuteries actives, installés avant tout script.
const PATCH=()=>{
  const reg={};window.__reg=reg;const key=(t,type)=>t===document?'document:'+type:t===window?'window:'+type:t===document.documentElement?'html:'+type:t===document.body?'body:'+type:null;
  const A=EventTarget.prototype.addEventListener,Rm=EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener=function(type,fn,opt){try{const k=key(this,type);if(k&&fn){const cap=typeof opt==='boolean'?opt:!!(opt&&opt.capture);(reg[k]=reg[k]||new Set()).add(fn);fn.__caps=(fn.__caps||0)|(cap?2:1);
      if(opt&&opt.once){const w=this;}}}catch(e){}return A.call(this,type,fn,opt);};
  EventTarget.prototype.removeEventListener=function(type,fn,opt){try{const k=key(this,type);if(k&&reg[k])reg[k].delete(fn);}catch(e){}return Rm.call(this,type,fn,opt);};
  const iv=new Set();window.__iv=iv;const SI=window.setInterval,CI=window.clearInterval;
  window.setInterval=function(f,ms,...a){const id=SI.call(window,f,ms,...a);iv.add(id);return id;};
  window.clearInterval=function(id){iv.delete(id);return CI.call(window,id);};
};
const counts=p=>p.evaluate(()=>{const o={};for(const [k,s] of Object.entries(window.__reg))o[k]=s.size;o.intervals=window.__iv.size;return o;});

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();
 const html=read('index.html'),parent=read('parent.html');

 // ===== A. Analyse statique (sans navigateur)
 const attr=(src,tag,a)=>[...src.matchAll(new RegExp('<'+tag+'\\b[^>]*\\b'+a+'="([^"]+)"','gi'))].map(m=>m[1]);
 const scripts=attr(html,'script','src'),links=attr(html,'link','href').filter(h=>!external(h)),imgs=attr(html,'img','src').filter(h=>!external(h));
 const missing=[...scripts,...links,...imgs].filter(u=>!external(u)).map(clean).filter(u=>u&&!exists(u));
 T(`index.html : ${scripts.length} scripts, ${links.length} liens locaux, ${imgs.length} images — tout fichier référencé existe`,scripts.length>30&&!missing.length,missing.join(', '));
 const dup=scripts.filter((s,i)=>scripts.indexOf(s)!==i);const dupL=links.filter((s,i)=>links.indexOf(s)!==i);
 T('index.html : aucun script ni feuille de style chargé deux fois (même src / href)',!dup.length&&!dupL.length,dup.concat(dupL).join(', '));
 const pScripts=attr(parent,'script','src').filter(u=>!external(u)).map(clean),pLinks=attr(parent,'link','href').filter(u=>!external(u)).map(clean);
 const pMissing=pScripts.concat(pLinks).filter(u=>u&&!exists(u)),pDup=pScripts.filter((s,i)=>pScripts.indexOf(s)!==i);
 T('parent.html : scripts et feuilles de style existent, sans doublon',!pMissing.length&&!pDup.length,pMissing.concat(pDup).join(', '));
 const mani=JSON.parse(read('manifest.webmanifest'));const mi=(mani.icons||[]).map(i=>clean(i.src)),mStart=clean(mani.start_url||'');
 T('manifest.webmanifest : icônes présentes, start_url cohérente, nom renseigné',mi.length>0&&mi.every(exists)&&(mStart===''||mStart==='.'||exists(mStart))&&!!mani.name,mi.filter(x=>!exists(x)).join(',')+' start='+mani.start_url);

 // Chemins data/ js/ fonts/ cités dans le code (JS chargés, CSS, HTML) : chaque littéral complet doit exister
 const code=[...scripts.map(clean),...links.map(clean),'index.html','parent.html','sw.js'].filter(f=>exists(f)&&/\.(js|css|html)$/.test(f));
 const RE=/["'`(]((?:\.\/)?(?:data|js|fonts)\/[A-Za-z0-9_\-./%]+\.(?:png|jpe?g|webp|svg|gif|js|json|woff2?|css|mp3|ogg|webmanifest))(?=["'`)?#])/g;
 const refs=new Map();for(const f of code){const src=read(f);for(const m of src.matchAll(RE)){const u=clean(m[1]);if(!refs.has(u))refs.set(u,f);}}
 // lesson-images.js / lexicon : noms d'images construits sans chemin complet
 const absent=[...refs].filter(([u])=>!exists(u)).map(([u,f])=>u+' (dans '+f+')');
 T(`Fichiers data/, js/, fonts/ cités par le code : ${refs.size} chemins littéraux, aucun absent`,refs.size>20&&!absent.length,absent.slice(0,8).join(' | '));
 // Images de leçons : toutes celles que déclare data/lesson-images.js existent
 let liMiss=[],liN=0;try{const vm=require('vm');const ctx={window:{},console};ctx.self=ctx.window;ctx.globalThis=ctx.window;vm.createContext(ctx);vm.runInContext(read('data/lesson-images.js'),ctx);
   const root=ctx.window.MQ_LESSON_IMAGES||ctx.window.LESSON_IMAGES||ctx.MQ_LESSON_IMAGES;
   const collect=o=>{if(typeof o==='string'){if(/\.(png|jpe?g|webp|svg)$/i.test(o)&&!external(o)){liN++;const u=clean(o.startsWith('data/')?o:'data/images/lessons/'+o);if(!exists(u)&&!exists(clean(o)))liMiss.push(o);}}else if(o&&typeof o==='object')Object.values(o).forEach(collect);};
   if(root)collect(root);}catch(e){liMiss.push('lecture impossible : '+e.message);}
 T(`Images de leçons déclarées dans data/lesson-images.js (${liN}) : aucune absente`,!liMiss.length,liMiss.slice(0,6).join(' | '));

 // Poids des images
 const imgFiles=walk('').filter(f=>/\.(png|jpe?g|webp|gif|svg)$/i.test(f)&&!/^(tests|docs|reports|node_modules)\//.test(f));
 const sizes=imgFiles.map(f=>({f,kb:Math.round(fs.statSync(path.join(ROOT,f)).size/1024)})).sort((a,b)=>b.kb-a.kb);
 const big=sizes.filter(x=>x.kb>400),huge=sizes.filter(x=>x.kb>1536);
 const total=Math.round(sizes.reduce((a,x)=>a+x.kb,0)/1024);
 T(`Images : ${imgFiles.length} fichiers (${total} Mo), aucune au-dessus de 1,5 Mo — ${big.length} entre 400 Ko et 1,5 Mo listées`,!huge.length,huge.map(x=>x.f+' '+x.kb+' Ko').join(' | ')||big.slice(0,12).map(x=>x.f+' '+x.kb+' Ko').join(' | '));
 if(big.length)console.log('ℹ️  Images > 400 Ko :\n'+big.map(x=>'   '+x.kb+' Ko  '+x.f).join('\n'));

 // Cache PWA
 const sw=read('sw.js');const ver=(sw.match(/const VERSION='([^']+)'/)||[])[1]||'';
 T('sw.js : VERSION au format X.Y.Z-description-AAAA-MM-JJ et préfixe de cache « mathquest- » conservé',/^\d+\.\d+\.\d+-[a-z0-9-]+-\d{4}-\d{2}-\d{2}$/.test(ver)&&/const CACHE='mathquest-'\+VERSION/.test(sw),ver);
 const pre=new Set(swPrecache());
 const need=[...scripts,...links.filter(h=>!/^data:/.test(h)),...imgs].map(clean).filter(u=>u&&!external(u));
 const notPre=[...new Set(need)].filter(u=>exists(u)&&!pre.has(u));
 T(`Cache PWA : les ${new Set(need).size} ressources d’index.html sont toutes pré-cachées (pré-cache total : ${pre.size} fichiers)`,pre.has('index.html')&&!notPre.length,'');
 T('Cache PWA : aucune ressource d’index.html (scripts, styles, icônes, manifeste) absente du pré-cache',!notPre.length,notPre.join(', '));
 const preMissing=[...pre].filter(u=>!exists(u||'index.html'));
 T('Cache PWA : chaque fichier pré-caché existe sur le disque',!preMissing.length,preMissing.slice(0,5).join(', '));
 const heavy=[...pre].reduce((a,u)=>a+fs.statSync(path.join(ROOT,u||'index.html')).size,0);
 T(`Cache PWA : poids total du pré-cache raisonnable (${(heavy/1048576).toFixed(1)} Mo, limite 150 Mo)`,heavy<150*1048576,(heavy/1048576).toFixed(1)+' Mo');

 // ===== B. Navigateur
 const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true});
  await ctx.addInitScript(PATCH);
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  const p=await ctx.newPage();p.setDefaultTimeout(8000);
  const errs=[],bad=[],failed=[],reqs=[];
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,200));});
  p.on('response',r=>{const u=r.url();reqs.push(u);if(r.status()>=400)bad.push(r.status()+' '+u.replace(url,'/'));});
  p.on('requestfailed',r=>{const f=(r.failure()||{}).errorText||'';if(!/ERR_ABORTED/.test(f))failed.push(f+' '+r.url().replace(url,'/'));});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});reqs.length=0;await p.goto(url+'index.html',{waitUntil:'load'});
  await p.waitForFunction(()=>typeof S!=='undefined'&&typeof home==='function');
  T('Chargement à froid : aucune erreur JavaScript ni console',!errs.length,errs.slice(0,4).join(' | '));
  const e0=errs.length;

  // inscription réelle, puis parcours : accueil → matière → monde → fiche de cours → leçon → exercice
  await wizard(p,{name:'Perf',grade:'CE1',stage:'primaire',birth:'2018-05-05',companion:'finot'});
  const e1=errs.length;
  const nReq0=reqs.length;
  const clickFirst=async sel=>{const l=p.locator(sel).first();if(!await l.count())return false;await l.scrollIntoViewIfNeeded().catch(()=>{});await l.click();await p.waitForTimeout(150);return true;};
  const steps=[];
  steps.push(['accueil',await p.evaluate(()=>CUR==='home')]);
  steps.push(['matières',await clickFirst('[data-a="hometab:matieres"]')]);
  steps.push(['monde',await clickFirst('[data-a^="world:"]')]);
  steps.push(['fiche de cours',await clickFirst('[data-a^="chap:"]')]);
  const hasLesson=await clickFirst('[data-a^="lesson:"]');steps.push(['leçon',hasLesson]);
  if(hasLesson){for(let i=0;i<4;i++){const nx=p.locator('[data-a="lnext"],[data-a="lstart"],[data-a="lessonnext"]').first();if(await nx.count())await nx.click().catch(()=>{});await p.waitForTimeout(80);}}
  await p.evaluate(()=>{try{home();}catch(e){}});
  await p.evaluate(()=>{const c=ALLCH.find(x=>x.grade==='CE1'&&/maths|ma-/.test(x.id));startMission([c.id]);});
  await p.waitForFunction(()=>M&&M.q,null,{timeout:4000}).catch(()=>{});
  const played=await playMission(p,[true,false],{});steps.push(['exercice',played>0]);
  await p.waitForTimeout(500);
  T('Parcours accueil → matières → monde → fiche de cours → leçon → exercice : chaque étape atteinte',steps.every(s=>s[1]),steps.map(s=>s[0]+':'+(s[1]?'ok':'KO')).join(' '));
  T(`Parcours : ${reqs.length-nReq0} requêtes, aucune 404 / erreur serveur (réponses ≥ 400) sur toute la session`,!bad.length,bad.slice(0,6).join(' | '));
  T('Parcours : aucune requête échouée (réseau, ressource introuvable)',!failed.length,failed.slice(0,6).join(' | '));
  const inst=reqs.filter(u=>/\.(js)(\?|$)/.test(u));const jsDup=inst.filter((u,i)=>inst.indexOf(u.split('?')[0])!==i&&false);
  const seenJs={};for(const u of reqs.filter(u=>/\.js(\?|$)/.test(u)&&u.startsWith(url))){const k=u.split('?')[0];seenJs[k]=(seenJs[k]||0)+1;}
  const dupJs=Object.entries(seenJs).filter(([k,n])=>n>1&&!/sw\.js$/.test(k)).map(([k,n])=>k.replace(url,'/')+' ×'+n);
  T('Chaque script n’est téléchargé qu’une fois par chargement de page (pas de balise en double, pas de chargement dynamique redondant)',!dupJs.length,dupJs.join(', '));
  T('Inscription et parcours : aucune erreur JavaScript',errs.length===e1&&e1===e0,errs.slice(e0).slice(0,4).join(' | '));

  // ~12 écrans
  const screens=[['accueil',()=>home()],['profils',()=>profilesScreen()],['boutique',()=>shop()],['badges',()=>badgesScreen()],['récompenses',()=>rewardsScreen()],['bibliothèque',()=>libraryScreen()],
    ['atlas',()=>atlasScreen()],['parcours',()=>pathScreen()],['révision intelligente',()=>smartReviewScreen()],['carnet d’erreurs',()=>mistakesScreen()],['crédits',()=>creditsScreen()],
    ['cours',()=>coursesScreen(WMAP[ALLCH.find(c=>c.grade===S.grade).id].id)],['lexique',()=>lexiconScreen('en'+String(S.grade).replace('e',''))],['Finot',()=>finotScreen()],['éclair',()=>flashMenu()],['réglages',()=>{ACT.home();const b=document.querySelector('[data-a="settings"],[data-a="hometab:settings"]');if(b)b.click();}],['porte parent',()=>ACT.parent()]];
  const visited=[],screenErrs=[];
  for(const [name,fn] of screens){const before=errs.length;
   const ok=await p.evaluate(fn).then(()=>true).catch(e=>{screenErrs.push(name+' : exception '+String(e.message).slice(0,120));return false;});
   await p.waitForTimeout(120);
   const info=await p.evaluate(()=>({cur:CUR,len:document.getElementById('app').innerText.trim().length,ov:document.documentElement.scrollWidth>innerWidth+2}));
   if(ok&&info.len>20)visited.push(name);else if(ok)screenErrs.push(name+' : écran vide');
   if(errs.length>before)screenErrs.push(name+' : '+errs.slice(before).join(' / '));
   await p.evaluate(()=>{try{if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}home();}catch(e){}});}
  T(`${visited.length} écrans parcourus sans erreur console ni pageerror (${visited.join(', ')})`,visited.length>=12&&!screenErrs.length,screenErrs.slice(0,5).join(' | '));

  // localStorage après un profil et 200 réponses simulées (+ erreurs au carnet + journal d'activité)
  const ls=await p.evaluate(()=>{const ch=ALLCH.filter(c=>c.grade===S.grade).map(c=>c.id);
   for(let i=0;i<200;i++){const id=ch[i%ch.length];MQAdaptive.recordAnswer(S,id,i%3!==0,{});S.totalQ=(S.totalQ||0)+1;
     if(i%5===0)MQAdaptive.recordMistake(S,id,{q:'Question simulée '+i+' avec un énoncé assez long pour ressembler à une vraie erreur de l’élève.',answer:'réponse '+i,expl:'Explication simulée '+i});
     if(i%10===0){S.activityLog=S.activityLog||[];S.activityLog.push({t0:Date.now()-i*60000,ms:60000,kind:'exercise',ids:[id],subj:S.subj});}}
   save();let tot=0;const per={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);const n=(k.length+localStorage.getItem(k).length)*2;per[k]=n;tot+=n;}
   const first=tot;
   for(let i=0;i<200;i++){const id=ch[(i*7)%ch.length];MQAdaptive.recordAnswer(S,id,i%2===0,{});S.totalQ++;if(i%5===0)MQAdaptive.recordMistake(S,id,{q:'Autre question '+i,answer:'a'+i,expl:'e'});}
   save();let tot2=0;for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);tot2+=(k.length+localStorage.getItem(k).length)*2;}
   return {first,tot2,per};});
  T(`localStorage : ${(ls.first/1024).toFixed(0)} Ko après 1 profil et 200 réponses, ${(ls.tot2/1024).toFixed(0)} Ko après 400 (limite 1 Mo)`,ls.first<1048576&&ls.tot2<1048576,JSON.stringify(ls.per).slice(0,300));

  // Écouteurs et minuteries : allers-retours accueil ↔ profils ↔ mission
  const cycle=async()=>{
   await p.click('[data-a="profiles"]').catch(()=>p.evaluate(()=>profilesScreen()));await p.waitForFunction(()=>CUR==='profiles'||/profils|Profils/.test(document.getElementById('app').innerText),null,{timeout:3000}).catch(()=>{});
   await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home',null,{timeout:3000});
   await p.evaluate(()=>{const c=ALLCH.find(x=>x.grade===S.grade&&/ma/.test(x.id));startMission([c.id]);});
   await p.waitForFunction(()=>M&&M.q,null,{timeout:3000});
   await p.evaluate(()=>ACT.quit());await p.waitForFunction(()=>CUR==='home'&&!M,null,{timeout:3000});};
  for(let i=0;i<2;i++)await cycle();   // échauffement : tous les écouteurs « une fois pour toutes » sont posés
  const c0=await counts(p);
  for(let i=0;i<10;i++)await cycle();
  const c1=await counts(p);
  const grown=Object.keys(c1).filter(k=>(c1[k]||0)>(c0[k]||0)).map(k=>k+' '+(c0[k]||0)+'→'+c1[k]);
  const lis=Object.entries(c1).filter(([k])=>/^(document|window):(click|keydown)$/.test(k)).map(([k,v])=>k+'='+v).join(', ');
  T(`10 allers-retours accueil ↔ profils ↔ mission : le nombre d’écouteurs document / window ne croît pas (${lis})`,!grown.filter(g=>!/^intervals/.test(g)).length&&(c1['document:click']||0)>0,grown.join(' | '));
  T(`10 allers-retours : aucune minuterie setInterval n’est laissée active après avoir quitté la mission (${c0.intervals} → ${c1.intervals})`,c1.intervals<=c0.intervals,grown.filter(g=>/^intervals/.test(g)).join(''));

  // Mode éclair (setInterval de la barre de temps) et leçon : quitter nettoie
  const iv0=(await counts(p)).intervals;
  for(let i=0;i<5;i++){
   await p.evaluate(()=>{ACT.flash('all');});await p.waitForTimeout(250);
   await p.evaluate(()=>ACT.quit());await p.waitForFunction(()=>CUR==='home',null,{timeout:3000});
   await p.evaluate(()=>{const c=ALLCH.find(x=>x.grade===S.grade&&COURS[x.id]);openLesson(c.id);});await p.waitForTimeout(150);
   await p.evaluate(()=>ACT.home());await p.waitForFunction(()=>CUR==='home',null,{timeout:3000});}
  await p.waitForTimeout(300);
  const iv1=(await counts(p)).intervals;
  T(`Mode éclair et leçon ouverts puis quittés 5 fois : aucune minuterie ne s’accumule (${iv0} → ${iv1})`,iv1<=iv0,'');
  T('Allers-retours et écrans : aucune erreur JavaScript',errs.length===e1&&!errs.slice(e1).length,errs.slice(e1).slice(0,4).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
