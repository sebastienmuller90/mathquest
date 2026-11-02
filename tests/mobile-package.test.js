/* Packaging déterministe du répertoire www/ embarqué par Capacitor (Android), 31/10/2026.
   Le site web (GitHub Pages) reste servi tel quel depuis la racine du dépôt ; www/ est une COPIE propre, construite par
   scripts/package-www.mjs à partir d'une liste blanche explicite et des seuls fichiers suivis par Git.
   Vérifie : contenu attendu, absence de tout fichier de développement, présence des ressources réellement chargées par les
   pages (y compris tout ce que le service worker précharge), reproductibilité octet pour octet, version, et échecs francs. */
const fs=require('fs'),path=require('path'),os=require('os'),crypto=require('crypto');
const {execFileSync,spawnSync}=require('child_process');
const {ROOT,swPrecache}=require('./lib');
const SCRIPT=path.join(ROOT,'scripts','package-www.mjs');
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
function walk(dir,base=dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,base,out);else out.push(path.relative(base,p).split(path.sep).join('/'));}return out.sort();}
const pack=(out,extra=[],opts={})=>spawnSync(process.execPath,[SCRIPT,'--out',out,...extra],{cwd:opts.cwd||ROOT,encoding:'utf8',env:{...process.env,...(opts.env||{})}});
const tmp=n=>fs.mkdtempSync(path.join(os.tmpdir(),'finot-'+n+'-'));
const FORBIDDEN=[/^\.git(\/|$)/,/(^|\/)\.[^/]+$/,/^tests\//,/^docs\//,/^reports\//,/^\.github\//,/^node_modules\//,/^android\//,/^scripts\//,/\.md$/i,/\.map$/i,
 /\.(?:jks|keystore|p12|pem|key|env)$/i,/^package(-lock)?\.json$/,/^capacitor\.config\./,/(^|\/)(?:CLAUDE|README|CHANGELOG)[^/]*$/i,/\.(?:bat|cmd|ps1|sh|log|bak|tmp)$/i,/(^|\/)_tmp/,/(^|\/)(?:Thumbs\.db|desktop\.ini)$/i];

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 T('Le script de packaging existe (scripts/package-www.mjs)',fs.existsSync(SCRIPT),SCRIPT);
 if(!fs.existsSync(SCRIPT))return R;
 const A=tmp('www-a'),B=tmp('www-b');
 const ra=pack(A),rb=pack(B);
 T('Packaging : se termine sans erreur (2 exécutions)',ra.status===0&&rb.status===0,(ra.stderr||'')+(rb.stderr||''));
 const man=JSON.parse(fs.readFileSync(path.join(A,'finot-package.json'),'utf8'));
 const files=walk(A).filter(f=>f!=='finot-package.json');

 // 1. Contenu : uniquement ce qui est nécessaire, rien de privé.
 const bad=files.filter(f=>FORBIDDEN.some(re=>re.test(f)));
 T('Aucun fichier interdit (.git, tests, docs, workflows, rapports, scripts, Markdown, clés, configs, journaux)',files.length>0&&!bad.length,bad.slice(0,10).join(' | '));
 const tracked=new Set(execFileSync('git',['-c','safe.directory=*','ls-files','-z'],{cwd:ROOT,encoding:'utf8'}).split('\0').filter(Boolean));
 const untrackedIn=files.filter(f=>!tracked.has(f));
 T('Uniquement des fichiers suivis par Git (aucun brouillon local embarqué)',!untrackedIn.length,untrackedIn.slice(0,10).join(' | '));
 const tops=[...new Set(files.map(f=>f.split('/')[0]))].sort();
 const allowedTop=new Set(['index.html','parent.html','manifest.webmanifest','icon.png','data','js','fonts','styles.css','pedagogy-upgrade.css','age-adaptive.css','premium-ui.css','premium-pro.css','premium-entry.css','premium-parent.css','premium-v2.css']);
 T('Racine de www/ limitée à la liste blanche (pages, manifeste, icône, styles, data, js, fonts)',tops.every(t=>allowedTop.has(t)),tops.filter(t=>!allowedTop.has(t)).join(', '));
 T('Le service worker n’est pas embarqué dans l’app native (hors ligne natif : les fichiers sont déjà dans l’APK)',!files.includes('sw.js'));
 const appTracked=[...tracked].filter(f=>/^(data|js|fonts)\//.test(f)&&!/\.md$/i.test(f));
 const missingTracked=appTracked.filter(f=>!files.includes(f));
 T(`Tous les fichiers applicatifs suivis de data/, js/, fonts/ sont embarqués (${appTracked.length})`,!missingTracked.length,missingTracked.slice(0,10).join(' | '));

 // 2. Ressources réellement chargées : tout ce que le service worker précharge, et chaque src/href des deux pages.
 const pre=swPrecache().map(r=>r===''?'index.html':r).filter(r=>r!=='sw.js');
 const preMissing=pre.filter(r=>!files.includes(r));
 T(`Tout ce que le service worker précharge est présent dans www/ (${pre.length} fichiers)`,pre.length>100&&!preMissing.length,preMissing.slice(0,10).join(' | '));
 const refsMissing=[];for(const page of ['index.html','parent.html']){const html=fs.readFileSync(path.join(A,page),'utf8');
  for(const m of html.matchAll(/(?:src|href)\s*=\s*["']([^"'#?]+)["']/gi)){const r=m[1];if(/^(?:[a-z]+:|\/\/)/i.test(r))continue;if(!fs.existsSync(path.join(A,r)))refsMissing.push(page+' → '+r);}}
 T('Chaque src/href local de index.html et parent.html existe dans www/',!refsMissing.length,refsMissing.slice(0,10).join(' | '));
 const cssMissing=[];for(const f of files.filter(f=>f.endsWith('.css'))){const t=fs.readFileSync(path.join(A,f),'utf8');for(const m of t.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)){const r=m[1];if(/^(?:data:|[a-z]+:|\/\/|#)/i.test(r))continue;const p=path.join(A,path.dirname(f),r.split(/[?#]/)[0]);if(!fs.existsSync(p))cssMissing.push(f+' → '+r);}}
 T('Chaque url() locale des feuilles de style existe dans www/',!cssMissing.length,cssMissing.slice(0,10).join(' | '));
 const diff=files.filter(f=>sha(path.join(A,f))!==sha(path.join(ROOT,f)));
 T('Copie fidèle : chaque fichier est identique octet pour octet à la source',!diff.length,diff.slice(0,5).join(' | '));

 // 3. Manifeste du paquet, version et reproductibilité.
 const swv=(fs.readFileSync(path.join(ROOT,'sw.js'),'utf8').match(/const VERSION='([^']+)'/)||[])[1];
 const [maj,min,pat]=String(swv).split('-')[0].split('.').map(Number);
 const storeV=(()=>{try{return JSON.parse(fs.readFileSync(path.join(ROOT,'android','store-version.json'),'utf8')).versionName;}catch(e){return null;}})();
 T('finot-package.json : version = VERSION de sw.js ; versionName = version commerciale (android/store-version.json, X.Y.Z) ; versionCode = compteur interne X×1 000 000 + Y×1 000 + Z de VERSION, indépendant du versionName',man.version===swv&&/^\d+\.\d+\.\d+$/.test(String(storeV))&&man.versionName===storeV&&man.versionCode===maj*1e6+min*1e3+pat,JSON.stringify({version:man.version,versionName:man.versionName,versionCode:man.versionCode,swv,storeV}));
 const listed=man.files.map(f=>f.path);
 T('finot-package.json liste exactement les fichiers copiés, triés, avec taille et SHA-256 exacts',JSON.stringify(listed)===JSON.stringify(files)&&man.files.every(f=>f.sha256===sha(path.join(A,f.path))&&f.size===fs.statSync(path.join(A,f.path)).size),'');
 T('finot-package.json ne contient ni date ni chemin absolu de la machine (reproductible)',!/\d{4}-\d{2}-\d{2}T|[A-Za-z]:\\\\|\/home\/|\/Users\//.test(JSON.stringify(man))&&!('builtAt' in man),'');
 const ma=fs.readFileSync(path.join(A,'finot-package.json')),mb=fs.readFileSync(path.join(B,'finot-package.json'));
 T('Reproductible : deux exécutions donnent le même manifeste (même empreinte globale)',ma.equals(mb)&&/^[0-9a-f]{64}$/.test(man.digest),man.digest);

 // 4. Sûreté : relance sur le même dossier (nettoyage), refus d'écraser un dossier étranger, échec si un fichier essentiel manque.
 fs.writeFileSync(path.join(A,'js','_stale-leftover.js'),'x');const ra2=pack(A);
 T('Relance sur un www/ existant : il est entièrement reconstruit (aucun fichier périmé ne survit)',ra2.status===0&&!fs.existsSync(path.join(A,'js','_stale-leftover.js')),ra2.stderr);
 const F=tmp('foreign');fs.writeFileSync(path.join(F,'precieux.txt'),'ne pas effacer');const rf=pack(F);
 T('Refuse de vider un dossier non vide qui n’est pas un www/ Finot (aucune suppression)',rf.status!==0&&fs.existsSync(path.join(F,'precieux.txt')),rf.stdout+rf.stderr);
 const probe=path.join(ROOT,'data','_tmp-untracked-probe.js');fs.writeFileSync(probe,'// sonde de test non suivie\n');
 try{const C=tmp('www-c');const rc=pack(C);T('Un fichier local non suivi par Git dans data/ n’est jamais embarqué',rc.status===0&&!fs.existsSync(path.join(C,'data','_tmp-untracked-probe.js')),rc.stderr);}
 finally{fs.rmSync(probe,{force:true});}
 const FAKE=tmp('fake-root');fs.mkdirSync(path.join(FAKE,'js'));fs.writeFileSync(path.join(FAKE,'index.html'),'<script src="js/absent.js"></script>');
 const rm=spawnSync(process.execPath,[SCRIPT,'--root',FAKE,'--out',tmp('www-d'),'--no-git'],{encoding:'utf8'});
 T('Échec franc (code ≠ 0, message explicite) si un fichier essentiel manque',rm.status!==0&&/manquant|missing/i.test(rm.stdout+rm.stderr),(rm.stdout+rm.stderr).slice(0,300));
 for(const d of [A,B,F,FAKE])fs.rmSync(d,{recursive:true,force:true});
 return R;}
require('./lib').main(run);
