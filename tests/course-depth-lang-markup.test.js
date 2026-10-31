/* P2-1 (01/11/2026) : garde statique du balisage de langue des cours approfondis d'anglais et d'italien.
   Chaque passage en gras étranger doit porter lang="en" (anglais) ou lang="it" (italien) ; aucun passage français
   (terme de grammaire, explication, nom français) ne doit porter de lang étranger. Classement : lang-markup-classifier.js. */
const fs=require('fs'),path=require('path');const {main,ROOT}=require('./lib');const {classify}=require('./lang-markup-classifier');
function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const dir=path.join(ROOT,'data/pedagogy');const files=fs.readdirSync(dir).filter(f=>/^course-depth-(anglais-.*|italien-college)\.js$/.test(f));
 T('Les 10 fichiers de cours approfondis de langues sont présents (anglais CP→3e, italien collège)',files.length===10,files.join(', '));
 for(const f of files){const lang=/italien/.test(f)?'it':'en';const src=fs.readFileSync(path.join(dir,f),'utf8');
  const missing=[],wrong=[];let marked=0,total=0;
  for(const m of src.matchAll(/<b( lang="(en|it)")?>([^<]*)<\/b>/g)){const c=classify(m[3],lang);if(!c)continue;total++;
   if(m[2]){marked++;if(m[2]!==lang||c==='fr')wrong.push(m[3]);}else if(c!=='fr')missing.push(m[3]);}
  T(`${f} : chaque passage ${lang==='en'?'anglais':'italien'} en gras porte lang="${lang}" (${marked}/${total} marqués)`,!missing.length,missing.slice(0,8).join(' · '));
  T(`${f} : aucun passage français en gras ne porte de langue étrangère`,!wrong.length,wrong.slice(0,8).join(' · '));}
 return R;}
if(require.main===module)main(run);
module.exports=run;
