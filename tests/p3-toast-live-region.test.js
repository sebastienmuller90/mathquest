/* P3-C — le toast aria-live doit être vidé après sa disparition visuelle. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();const p=await b.newPage({viewport:{width:390,height:844}});
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Toast P3','6e');
  await p.evaluate(()=>toast('Message temporaire'));
  let now=await p.evaluate(()=>({text:document.querySelector('#toast')?.textContent||'',opacity:document.querySelector('#toast')?.style.opacity||''}));
  T('Le toast annonce immédiatement le nouveau message',now.text==='Message temporaire'&&now.opacity==='1',JSON.stringify(now));
  await p.waitForTimeout(2200);
  const after=await p.evaluate(()=>({text:document.querySelector('#toast')?.textContent||'',opacity:document.querySelector('#toast')?.style.opacity||''}));
  T('Après disparition, le toast visuel est masqué',after.opacity==='0',JSON.stringify(after));
  T('Après disparition, la région aria-live ne conserve aucun ancien texte',after.text==='',JSON.stringify(after));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
