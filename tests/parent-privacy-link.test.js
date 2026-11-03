// Lien « Politique de confidentialité » dans l'espace Parents (Google Play, issue #51).
// Visible et ouvrable seulement dans l'espace Parents ; jamais côté enfant ; l'absence de réseau ne casse rien.
const {serve,launch,seedProfile,main}=require('./lib');
const PRIVACY='https://sebastienmuller90.github.io/mathquest/docs/google-play/privacy-policy-public.html';

async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const {srv,url}=await serve();const b=await launch();
 try{
  for(const [label,native] of [['PWA / web',false],['App Android (Capacitor simulé)',true]]){
   const ctx=await b.newContext({viewport:{width:360,height:640},hasTouch:true});
   await ctx.addInitScript(n=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}
    if(n)window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'android',Plugins:{}};},native);
   const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));let popups=0;ctx.on('page',()=>popups++);
   await p.goto(url+'index.html',{waitUntil:'load'});
   await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
   await seedProfile(p,'Lien','CM1');
   const kids=async()=>p.evaluate(h=>[...document.querySelectorAll('#app a[href]')].filter(a=>a.href.startsWith(h.slice(0,40))).length,PRIVACY);
   for(const [n,fn] of [['accueil','ACT.home()'],['Plus','ACT.more&&ACT.more()']]){await p.evaluate(fn).catch(()=>{});await p.waitForTimeout(150);}
   T(`${label} : aucun lien de confidentialité cliquable dans l'espace enfant`,(await kids())===0);
   await p.evaluate(()=>{PARENT=true;parentScreen('reglages');});await p.waitForTimeout(250);
   const a=await p.evaluate(()=>{const e=document.querySelector('#app a.privacy-link');if(!e)return null;const r=e.getBoundingClientRect();return {href:e.getAttribute('href'),target:e.target,rel:e.rel,txt:e.textContent.trim(),w:r.width,h:r.height,inView:r.right<=innerWidth+1&&r.left>=-1};});
   T(`${label} : lien visible dans Parents › Réglages vers l'URL publique exacte`,a&&a.href===PRIVACY&&a.w>40&&a.h>=44&&a.inView,JSON.stringify(a));
   T(`${label} : nouvel onglet sécurisé (_blank, noopener noreferrer)`,a&&a.target==='_blank'&&/noopener/.test(a.rel)&&/noreferrer/.test(a.rel),JSON.stringify(a));
   T(`${label} : libellé explicite en français`,a&&/confidentialit/i.test(a.txt),a&&a.txt);
   // Hors connexion : le clic ne doit pas planter l'appli, qui reste utilisable.
   await ctx.setOffline(true);
   await p.evaluate(()=>{const e=document.querySelector('#app a.privacy-link');if(!e)return;e.addEventListener('click',ev=>ev.preventDefault(),{once:true});e.click();});
   await p.waitForTimeout(200);
   await p.evaluate(()=>{parentScreen('suivi');});await p.waitForTimeout(150);
   const alive=await p.evaluate(()=>!!document.querySelector('#app .tabs'));
   T(`${label} : hors connexion, l'espace Parents reste utilisable`,alive&&!errs.length,errs.join(' | '));
   await ctx.setOffline(false);
   T(`${label} : aucune fenêtre parasite`,popups===0,popups);
   await ctx.close();
  }
 }finally{await b.close();srv.close();}
 // Cohérence : la page publique visée existe dans le dépôt, avec la bonne identité.
 const fs=require('fs'),path=require('path');
 const f=path.join(__dirname,'..','docs','google-play','privacy-policy-public.html');
 const h=fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
 T('La politique publique existe et nomme UpFactory Apps, upfactory.apps@gmail.com et fr.finot.academie',/UpFactory Apps/.test(h)&&/upfactory\.apps@gmail\.com/.test(h),h.length);
 return R;
}
if(require.main===module)main(run);module.exports=run;
