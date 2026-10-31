/* P3-B — Entrée sur le premier champ du code parent ne doit pas comparer avec une confirmation vide. */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();const p=await b.newPage({viewport:{width:390,height:844}});
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Parent P3','6e');
  await p.evaluate(()=>{S.pin='';S.rec='';save();PARENT=false;parentGate();});
  await p.locator('#pin').fill('1234');
  await p.locator('#pin').focus();
  await p.keyboard.press('Enter');
  await p.waitForTimeout(80);
  const first=await p.evaluate(()=>({focus:document.activeElement&&document.activeElement.id,toast:(document.querySelector('#toast')?.textContent||'').trim(),pin:!!S.pin,parent:!!PARENT}));
  T('Entrée sur le premier code place le focus sur la confirmation',first.focus==='pin2',JSON.stringify(first));
  T('Aucune comparaison prématurée avec une confirmation vide',!first.pin&&!first.parent&&!/différents/i.test(first.toast),JSON.stringify(first));

  await p.locator('#pin2').fill('1234');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(80);
  const second=await p.evaluate(()=>({pin:!!S.pin,parent:!!PARENT,recovery:!!document.querySelector('.reckey')}));
  T('Entrée sur la confirmation valide normalement les deux codes identiques',second.pin&&second.parent&&second.recovery,JSON.stringify(second));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
