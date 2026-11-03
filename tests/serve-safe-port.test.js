// Harnais de test : serve() ne doit jamais retourner automatiquement un port refusé par Chromium (ERR_UNSAFE_PORT).
// Un port explicite reste inchangé, la recherche est bornée et le serveur rejeté est fermé (aucune fuite).
const http=require('http');const {serve}=require('./lib');
const close=s=>new Promise(r=>s.close(()=>r()));
async function run(){
 const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const realAddress=http.Server.prototype.address,realListen=http.Server.prototype.listen;
 try{
  // 1. Tirages automatiques simulés tombant sur des ports interdits : ils sont rejetés puis un port sûr est rendu.
  let n=0;const fake=[1720,6000,1723];
  http.Server.prototype.address=function(){const a=realAddress.call(this);if(a&&n<fake.length&&this.__f!==1){return {...a,port:fake[n]};}return a;};
  const origListen=http.Server.prototype.listen;let listens=0;
  http.Server.prototype.listen=function(...a){listens++;return origListen.apply(this,a);};
  const origClose=http.Server.prototype.close;
  http.Server.prototype.close=function(cb){if(n<fake.length)n++;return origClose.call(this,cb);};
  const s1=await serve();
  const p1=realAddress.call(s1.srv).port;
  T('3 ports interdits simulés (1720, 6000, 1723) sont rejetés',n===3&&listens===4,JSON.stringify({n,listens}));
  T('Le port finalement rendu est sûr et l’URL le reflète',![1720,6000,1723].includes(p1)&&s1.url.endsWith(':'+p1+'/'),s1.url);
  http.Server.prototype.address=realAddress;http.Server.prototype.listen=origListen;http.Server.prototype.close=origClose;
  await close(s1.srv);
  // 2. Port explicite, même « interdit » : jamais réécrit.
  const s2=await serve(25871);
  T('Port explicite inchangé (25871)',realAddress.call(s2.srv).port===25871&&s2.url.includes(':25871/'));
  await close(s2.srv);
  const s3=await serve(1720).catch(e=>e);
  const ok3=s3&&s3.srv?realAddress.call(s3.srv).port===1720:/EACCES|EADDRINUSE|1720/.test(String(s3));
  T('Port explicite interdit (1720) : respecté tel quel, jamais remplacé',ok3,String(s3&&s3.url||s3));
  if(s3&&s3.srv)await close(s3.srv);
  // 3. 300 tirages réels : jamais de port interdit, aucun serveur résiduel.
  const bad=[];const UN=new Set([1719,1720,1723,6000,6665,6666,6667,6668,6669,6679,6697,10080,2049,4045,5060,5061]);
  for(let i=0;i<300;i++){const s=await serve();const p=realAddress.call(s.srv).port;if(UN.has(p))bad.push(p);await close(s.srv);}
  T('300 tirages réels : aucun port interdit',!bad.length,bad.join(','));
  const handles=process._getActiveHandles().filter(h=>h&&h.constructor&&h.constructor.name==='Server'&&h.listening).length;
  T('Aucune fuite de serveur en écoute',handles===0,handles);
 }finally{http.Server.prototype.address=realAddress;http.Server.prototype.listen=realListen;}
 return R;
}
if(require.main===module)require('./lib').main(run);module.exports=run;
