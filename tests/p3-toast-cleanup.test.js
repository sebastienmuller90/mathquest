/* P3-C — un toast masqué ne doit pas conserver un ancien message dans la zone aria-live. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();const p=await b.newPage({viewport:{width:390,height:844}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Toast P3','6e');
  const visible=await p.evaluate(()=>{toast('Les deux codes sont différents');const t=document.getElementById('toast');return {text:t.textContent.trim(),show:t.classList.contains('show'),role:t.getAttribute('role'),live:t.getAttribute('aria-live')};});
  T('Toast visible : message et live-region accessibles',visible.show&&/différents/i.test(visible.text)&&visible.role==='status'&&visible.live==='polite',JSON.stringify(visible));
  await p.evaluate(()=>profilesScreen());
  await p.waitForTimeout(2950);
  const hidden=await p.evaluate(()=>{const t=document.getElementById('toast');return {text:(t?.textContent||'').trim(),show:!!t?.classList.contains('show'),screen:CUR};});
  T('Après disparition : le toast est masqué ET son ancien message est vidé',!hidden.show&&hidden.text==='',JSON.stringify(hidden));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
