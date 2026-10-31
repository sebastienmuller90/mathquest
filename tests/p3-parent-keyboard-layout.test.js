/* P3-F — le formulaire PIN parent est un écran protégé : la navigation élève ne doit pas rester fixed au bas
   de l'écran (sinon Android la remonte au-dessus du clavier logiciel quand le viewport se réduit). */
const {serve,launch,seedProfile}=require('./lib');

async function run(){
 const R=[];const T=(name,ok,detail='')=>R.push({name,ok:!!ok,detail:String(detail)});
 const {srv,url}=await serve();const b=await launch();const p=await b.newPage({viewport:{width:390,height:844}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 try{
  await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'Clavier parent','6e');
  await p.evaluate(()=>{home();hometabsSync();});await p.waitForTimeout(80);
  const before=await p.evaluate(()=>({cur:CUR,nav:document.getElementById('hometabs')?.classList.contains('show'),name:S.name}));
  T('Accueil : navigation élève visible avant l’entrée dans l’espace parent',before.cur==='home'&&before.nav&&!!before.name,JSON.stringify(before));

  await p.evaluate(()=>{PARENT=false;S.pin='';parentGate();});await p.waitForTimeout(100);
  const gate=await p.evaluate(()=>({cur:CUR,pin:!!document.getElementById('pin'),confirm:!!document.getElementById('pin2'),nav:document.getElementById('hometabs')?.classList.contains('show'),focus:document.activeElement?.id||''}));
  T('Écran PIN parent : la navigation élève fixed est masquée',gate.pin&&gate.confirm&&!gate.nav,JSON.stringify(gate));
  T('Le clavier peut s’ouvrir sur le PIN sans perdre le focus',gate.focus==='pin',JSON.stringify(gate));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
