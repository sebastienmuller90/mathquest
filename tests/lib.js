/* Outils communs aux tests MathQuest : serveur statique local + lancement de Chromium.
   Usage : cd tests && npm install && npm test
   Le navigateur utilisé est Chromium (playwright-core). Variable CHROME_PATH possible pour en choisir un autre. */
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.css':'text/css','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
// opts.cacheControl : en-tête Cache-Control servi ('no-store' par défaut ; 'max-age=600' imite GitHub Pages).
function serve(port=0,root=ROOT,opts={}){const CC=opts.cacheControl||'no-store';
  return new Promise(res=>{const srv=http.createServer((req,rsp)=>{
    let u=decodeURIComponent(req.url.split('?')[0]);if(u.endsWith('/'))u+='index.html';
    const f=path.join(root,u);if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){rsp.writeHead(404);rsp.end('not found');return;}
    rsp.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream','Cache-Control':CC});fs.createReadStream(f).pipe(rsp);
  });srv.listen(port,'127.0.0.1',()=>res({srv,url:`http://127.0.0.1:${srv.address().port}/`}));});
}
function chromePath(){
  if(process.env.CHROME_PATH)return process.env.CHROME_PATH;
  const base=path.join(process.env.LOCALAPPDATA||path.join(process.env.HOME||'','.cache'),'ms-playwright');
  try{const dirs=fs.readdirSync(base).filter(d=>/^chromium-\d+$/.test(d)).sort((a,b)=>+b.split('-')[1]-+a.split('-')[1]);
    for(const d of dirs){for(const sub of ['chrome-win64/chrome.exe','chrome-win/chrome.exe','chrome-linux/chrome','chrome-mac/Chromium.app/Contents/MacOS/Chromium']){const p=path.join(base,d,sub);if(fs.existsSync(p))return p;}}}catch(e){}
  return undefined;
}
async function launch(){const {chromium}=require('playwright-core');return chromium.launch({executablePath:chromePath()});}
// WebKit (moteur de Safari iOS) ou Firefox, installés par « npx playwright-core install webkit firefox ».
async function launchEngine(name){if(name==='chromium')return launch();const pw=require('playwright-core');if(!pw[name])throw new Error('moteur inconnu : '+name);return pw[name].launch();}
// Petit rapport : chaque test renvoie {name, ok, detail}.
// Toute liste vide ou contenant un échec est un échec : process.exitCode passe à 1 (jamais de « succès » avec un test rouge).
function report(results){let ok=0;if(!Array.isArray(results)||!results.length){console.log('❌ FAIL  Aucun résultat de test produit');console.log('BILAN PASS=0 FAIL=1');process.exitCode=1;return false;}
  for(const r of results){const pass=!!r&&r.ok===true;console.log(`${pass?'✅ PASS':'❌ FAIL'}  ${r&&r.name}${r&&r.detail?'  — '+r.detail:''}`);if(pass)ok++;}
  const fail=results.length-ok;console.log(`\n${ok}/${results.length} tests réussis`);console.log(`BILAN PASS=${ok} FAIL=${fail}`);if(fail)process.exitCode=1;return fail===0;}
// Point d'entrée commun : exécute la suite, affiche le bilan ; code de sortie 1 au moindre échec ou exception.
function main(fn){Promise.resolve().then(fn).then(r=>{report(r);}).catch(e=>{console.error(e&&e.stack||e);console.log('BILAN PASS=0 FAIL=1');process.exitCode=1;
 // Navigateur ou serveur encore ouverts après une exception : on sort quand même, au lieu de bloquer run-all 30 min.
 setTimeout(()=>process.exit(1),1500).unref();});}

/* Liste de pré-cache du service worker, calculée hors navigateur avec SES PROPRES fonctions (refsFromText, lexiconImages,
   SEEDS) chargées dans un bac à sable : même exploration que buildCache(), mais en lisant les fichiers sur le disque.
   Renvoie les chemins relatifs à la racine ('' pour './'). Remplace l'ancien tableau CORE écrit à la main. */
function swPrecache(root=ROOT){const vm=require('vm');const src=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  const base='http://mq.test/';const ctx={URL,Request:function(){},console,self:{registration:{scope:base},addEventListener(){}},caches:{},fetch(){}};
  vm.createContext(ctx);vm.runInContext(src+';this.__x={SEEDS,refsFromText,lexiconImages,TEXT_EXT,ONDEMAND};',ctx);const X=ctx.__x;
  const seen=new Set(),q=X.SEEDS.map(x=>new URL(x,base).href),out=[];
  while(q.length){const u=q.shift();if(seen.has(u))continue;seen.add(u);const rel=decodeURIComponent(new URL(u).pathname.slice(1));
    const file=path.join(root,rel===''?'index.html':rel);if(!fs.existsSync(file))continue;out.push(rel);
    if(X.TEXT_EXT.test(rel||'index.html')){const t=fs.readFileSync(file,'utf8');for(const r of X.refsFromText(t,u))q.push(r);if(rel==='data/lexicon.js')for(const r of X.lexiconImages(t))q.push(r);}}
  return out;}
module.exports={serve,launch,launchEngine,report,main,ROOT,chromePath,swPrecache};
