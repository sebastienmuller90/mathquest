/* Nettoyage lexique anglais / italien — doublons ciblés et migration non destructive. */
const {serve,launch}=require('./lib');
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));
 try{
  await p.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>localStorage.clear());await p.goto(url+'index.html',{waitUntil:'load'});
  await p.fill('#nm','Lina');await p.click('[data-a="pickstage:primaire"]');await p.click('[data-a="pickgrade:CE2"]');await p.click('[data-a="begin"]');

  const catalog=await p.evaluate(()=>{const out={};for(const lang of ['en','it']){const counts={};for(const [cat,c] of Object.entries(MQ_LEXICON[lang].cats))for(const w of c.words){const k=String(w[0]).toLowerCase();(counts[k]||(counts[k]=[])).push(cat);}out[lang]={counts,travel:MQ_LEXICON[lang].cats.travel.words.map(w=>w[0]),hobbies:MQ_LEXICON[lang].cats.hobbies?.words.map(w=>w[0])||[]};}return out;});
  const targetedOk=['train','plane','airport'].every(k=>(catalog.en.counts[k]||[]).length===1)&&['treno','aereo','aeroporto','cucina'].every(k=>(catalog.it.counts[k]||[]).length===1);
  T('Lexique : les 7 doublons réellement fautifs n’existent plus dans plusieurs catégories',targetedOk,JSON.stringify({en:{train:catalog.en.counts.train,plane:catalog.en.counts.plane,airport:catalog.en.counts.airport},it:{treno:catalog.it.counts.treno,aereo:catalog.it.counts.aereo,aeroporto:catalog.it.counts.aeroporto,cucina:catalog.it.counts.cucina}}));
  T('Voyage anglais : ferry, platform, departure remplacent train, plane, airport',catalog.en.travel.includes('ferry')&&catalog.en.travel.includes('platform')&&catalog.en.travel.includes('departure')&&!catalog.en.travel.includes('train')&&!catalog.en.travel.includes('plane')&&!catalog.en.travel.includes('airport'),JSON.stringify(catalog.en.travel));
  T('Voyage italien : traghetto, binario, partenza remplacent treno, aereo, aeroporto',catalog.it.travel.includes('traghetto')&&catalog.it.travel.includes('binario')&&catalog.it.travel.includes('partenza')&&!catalog.it.travel.includes('treno')&&!catalog.it.travel.includes('aereo')&&!catalog.it.travel.includes('aeroporto'),JSON.stringify(catalog.it.travel));
  T('Loisirs italien : cucinare remplace le doublon cucina',catalog.it.hobbies.includes('cucinare')&&!catalog.it.hobbies.includes('cucina'),JSON.stringify(catalog.it.hobbies));

  const moved=await p.evaluate(()=>{S.vocab={
   'en|travel|train':{status:'hard',correct:3,wrong:2,last:200,next:250,box:1},
   'en|transport|train':{status:'mastered',correct:5,wrong:0,last:100,next:999,box:4},
   'it|travel|aereo':{status:'learning',correct:2,wrong:1,last:300,next:350,box:2},
   'it|hobbies|cucina':{status:'mastered',correct:9,wrong:1,last:400,next:900,box:4}
  };MQLexiconMigration.migrateVocab(S.vocab);saveLocal();return JSON.parse(JSON.stringify(S.vocab));});
  T('Migration : ancienne clé train supprimée et état le plus récent conservé sans perdre les compteurs',!moved['en|travel|train']&&moved['en|transport|train']?.status==='hard'&&moved['en|transport|train']?.correct===5&&moved['en|transport|train']?.wrong===2&&moved['en|transport|train']?.last===200,JSON.stringify(moved));
  T('Migration : ancien aereo rejoint transport|aereo et cucina rejoint home|cucina',!moved['it|travel|aereo']&&moved['it|transport|aereo']?.correct===2&&!moved['it|hobbies|cucina']&&moved['it|home|cucina']?.status==='mastered',JSON.stringify(moved));
  T('Migration : aucun nouveau mot de remplacement n’est artificiellement marqué appris',!moved['en|travel|ferry']&&!moved['en|travel|platform']&&!moved['en|travel|departure']&&!moved['it|travel|traghetto']&&!moved['it|travel|binario']&&!moved['it|travel|partenza']&&!moved['it|hobbies|cucinare'],JSON.stringify(moved));

  await p.reload({waitUntil:'load'});await p.waitForTimeout(80);
  const re=await p.evaluate(()=>({old:S.vocab['en|travel|train'],canon:S.vocab['en|transport|train'],newWord:S.vocab['en|travel|ferry']}));
  T('Rechargement : migration persistée, ancienne clé absente',!re.old&&re.canon?.correct===5&&!re.newWord,JSON.stringify(re));
  T('Aucune erreur JavaScript pendant le nettoyage du lexique',!errs.length,errs.join(' | '));
 }finally{await b.close();srv.close();}
 return R;
}
if(require.main===module)require('./lib').main(()=>run());module.exports=run;
