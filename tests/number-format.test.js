/* Affichage des nombres décimaux (14/11/2026) : aucun artefact de virgule flottante (3,0599999999999996) dans les énoncés
   ni dans les réponses des exercices de maths. Régression trouvée par le test de mise en page mobile (zoom 125 %). */
const {serve,launch,seedProfile}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
  const {srv,url}=await serve();const b=await launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Testeur','6e');await p.waitForTimeout(150);
  const u=await p.evaluate(()=>(f=>[f(3.05+0.01),f(0.1+0.2),f(1234567.891),f(-2.5),f(12345),f(1e12),f(0.5)])(MQPrimary.H.nf));
  T('nf : artefacts de virgule flottante effacés, entiers, négatifs et grands nombres inchangés',JSON.stringify(u.map(x=>x.replace(/\s/g,' ')))===JSON.stringify(['3,06','0,3','1 234 567,891','−2,5','12 345','1 000 000 000 000','0,5']),JSON.stringify(u));
  const r=await p.evaluate(()=>{const bad=[];let n=0;const re=/[,.]\d*[1-9]0{7,}\d|[,.]\d*9{7,}\d/;
    for(const c of ALLCH){if(typeof c.g!=='function')continue;for(let d=1;d<=3;d++)for(let k=0;k<40;k++){let q;try{q=c.g(d);}catch(e){break;}if(!q)continue;n++;
      const txt=[q.q,...(q.choices||[]),q.exp,q.ans&&typeof q.ans==='string'?q.ans:''].filter(x=>typeof x==='string').join(' | ');
      const m=txt.replace(/<[^>]+>/g,' ').match(re);if(m&&bad.length<8)bad.push(c.id+' : '+m[0]);}}
    return {n,bad};});
  T('Aucune décimale parasite (longue suite de 9 ou de 0) dans '+r.n+' questions tirées sur tous les chapitres',r.n>500&&!r.bad.length,JSON.stringify(r.bad));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
