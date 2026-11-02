/* Les scans de tout le dépôt (traces de développement, poids des images) ne doivent pas descendre dans les dossiers de travail
   locaux et non versionnés : worktrees `_wt-*` et sorties `artifacts/` à la racine. Ils contiennent des copies du dépôt, des
   builds Android et des captures qui faussent les résultats. Seuls ces dossiers RACINE sont ignorés : un vrai dossier du dépôt
   (js/, data/, android/…), même nommé « artifacts » plus bas dans l'arborescence, reste scanné. */
const fs=require('fs'),path=require('path');
const lib=require('./lib');const {ROOT,main}=lib;

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const f=lib.isLocalOnly;
 T('lib.isLocalOnly existe',typeof f==='function','');
 if(typeof f!=='function')return R;
 const yes=['_wt-p4-keyboard','_wt35','_wt','artifacts','artifacts/android-rc/validation/x.png',['_wt-p2','android','x.js'].join(String.fromCharCode(92))];
 const no=['js','data','android','tests','docs','index.html','wt-x','xartifacts','artifacts.js','js/artifacts.js','data/artifacts/a.js','docs/_wt-x/a.js','android/app/_wt/x.js'];
 T('Dossiers locaux ignorés (_wt-*, artifacts/ à la racine, y compris leur contenu)',yes.every(f),yes.filter(x=>!f(x)).join(', '));
 T('Vrais dossiers/fichiers du dépôt jamais ignorés (même nommés artifacts ou _wt plus bas)',no.every(x=>!f(x)),no.filter(x=>f(x)).join(', '));

 /* Sonde réelle : de faux dossiers locaux avec appât (TODO, grosse image) sont créés puis retirés ; un parcours de la racine filtré par isLocalOnly ne doit pas les voir. */
 const probe=['_wt-scan-probe','artifacts'];const created=[];
 try{
  for(const d of probe){const p=path.join(ROOT,d);const existed=fs.existsSync(p);if(!existed){fs.mkdirSync(p,{recursive:true});created.push(p);}
   if(!existed){fs.writeFileSync(path.join(p,'probe.js'),'// TODO appât\n');fs.writeFileSync(path.join(p,'probe.png'),Buffer.alloc(8));}}
  const walk=(dir,out=[])=>{for(const e of fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true})){const rel=dir?dir+'/'+e.name:e.name;if(e.name==='node_modules'||e.name==='.git')continue;if(lib.isLocalOnly(rel))continue;if(e.isDirectory())walk(rel,out);else out.push(rel);}return out;};
  const seen=walk('');
  T('Parcours filtré : rien venant de _wt-*/ ni de artifacts/',!seen.some(x=>/^(_wt|artifacts)/.test(x)),seen.filter(x=>/^(_wt|artifacts)/.test(x)).slice(0,5).join(', '));
  T('Parcours filtré : les vrais fichiers (index.html, js/, data/) restent vus',seen.includes('index.html')&&seen.some(x=>x.startsWith('js/'))&&seen.some(x=>x.startsWith('data/')),seen.length+' fichiers');
 }finally{for(const p of created.reverse())fs.rmSync(p,{recursive:true,force:true});}

 /* Les deux scans concernés utilisent bien le filtre (language.test.js est privé, non publié : vérifié seulement s'il est présent). */
 const uses=(file)=>{const p=path.join(__dirname,file);if(!fs.existsSync(p))return null;return /isLocalOnly/.test(fs.readFileSync(p,'utf8'));};
 const perf=uses('release-perf-audit.test.js'),lang=uses('language.test.js');
 T('release-perf-audit (poids des images) ignore les dossiers locaux',perf===true,String(perf));
 T('language (traces de développement) ignore les dossiers locaux (si le test privé est présent)',lang===null||lang===true,String(lang));
 return R;}
if(require.main===module)main(run);
module.exports=run;
