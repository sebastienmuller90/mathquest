import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const norm=p=>p.replaceAll('\\','/').replace(/^\.\//,'');
const errors=[],warnings=[];
const fail=(id,msg,extra='')=>errors.push({id,msg,extra});
const warn=(id,msg,extra='')=>warnings.push({id,msg,extra});

for(const f of ['index.html','parent.html','manifest.webmanifest','sw.js','icon.png','styles.css'])if(!exists(f))fail(f,'Fichier essentiel absent');

function localRef(value,base='.'){
 const v=String(value||'').trim();
 if(!v||v.startsWith('#')||/^(?:https?:|data:|mailto:|tel:|javascript:)/i.test(v))return null;
 const clean=v.split(/[?#]/)[0];
 return clean?norm(path.posix.normalize(path.posix.join(base,clean))):null;
}
function htmlRefs(file){
 const out=[],base=path.posix.dirname(file);
 for(const m of read(file).matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)){const r=localRef(m[1],base);if(r)out.push(r);}
 return out;
}
function cssRefs(file){
 const out=[],base=path.posix.dirname(file),text=read(file);
 for(const re of [/@import\s+(?:url\()?\s*["']([^"']+)["']/gi,/url\(\s*["']?([^"')]+)["']?\s*\)/gi])for(const m of text.matchAll(re)){const r=localRef(m[1],base);if(r)out.push(r);}
 return out;
}
for(const page of ['index.html','parent.html'])for(const r of htmlRefs(page))if(!exists(r))fail(page,'Référence locale absente',r);

const index=read('index.html');
const scripts=[...index.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>norm(m[1].split(/[?#]/)[0]));
const styles=[...index.matchAll(/<link[^>]+href=["']([^"']+\.css(?:[?#][^"']*)?)["']/gi)].map(m=>norm(m[1].split(/[?#]/)[0]));
const dups=a=>[...new Set(a.filter((v,i)=>a.indexOf(v)!==i))];
for(const d of dups(scripts))fail('index.html','Script chargé plusieurs fois',d);
for(const d of dups(styles))fail('index.html','Feuille CSS chargée plusieurs fois',d);
if(!/manifest\.webmanifest/i.test(index))fail('index.html','Manifest PWA non relié');

const pwaEntry=scripts.find(s=>s==='js/app-pwa.js');
if(!pwaEntry||!exists(pwaEntry))fail('PWA','Module js/app-pwa.js non chargé');
else{
 const pwa=read(pwaEntry);
 if(!/serviceWorker\.register\s*\(\s*['"]\.\/sw\.js['"]\s*\)/.test(pwa))fail('PWA','Enregistrement de ./sw.js introuvable dans app-pwa.js');
 if(!/controllerchange/.test(pwa))warn('PWA','Gestion controllerchange introuvable');
}

const cssSeen=new Set(),cssQueue=styles.filter(exists);
while(cssQueue.length){const f=cssQueue.shift();if(cssSeen.has(f))continue;cssSeen.add(f);for(const r of cssRefs(f)){if(!exists(r)){fail(f,'Asset CSS local absent',r);continue}if(r.endsWith('.css')&&!cssSeen.has(r))cssQueue.push(r);}}

let manifest=null;try{manifest=JSON.parse(read('manifest.webmanifest'));}catch(e){fail('manifest.webmanifest','JSON invalide',e.message);}
if(manifest){
 if(!manifest.name||!manifest.short_name)fail('manifest.webmanifest','name/short_name manquant');
 if(!manifest.start_url)fail('manifest.webmanifest','start_url manquant');
 if(!['standalone','fullscreen','minimal-ui'].includes(manifest.display))warn('manifest.webmanifest','display PWA inhabituel',manifest.display);
 for(const icon of manifest.icons||[]){const r=localRef(icon.src,'.');if(r&&!exists(r))fail('manifest.webmanifest','Icône absente',r);}
}

const sw=read('sw.js');
const swVersion=sw.match(/const VERSION\s*=\s*['"]([^'"]+)['"]/)?.[1]||'';
if(!swVersion)fail('sw.js','VERSION absente');else if(!/^\d+\.\d+\.\d+/.test(swVersion))warn('sw.js','VERSION sans préfixe semver',swVersion);
if(!/const ASSET_EXT=.*js.*css.*webmanifest/i.test(sw))fail('sw.js','Auto-découverte JS/CSS/manifest potentiellement incomplète');
for(const seed of ['index.html','parent.html','manifest.webmanifest','styles.css'])if(!sw.includes(seed))fail('sw.js','Seed essentiel non référencé',seed);

const pedagogyDir=path.join(root,'data/pedagogy');
const depthFiles=fs.readdirSync(pedagogyDir).filter(f=>/^course-depth-.*\.js$/i.test(f)).map(f=>'data/pedagogy/'+f).sort();
const depthLoaded=new Set(scripts.filter(s=>s.startsWith('data/pedagogy/course-depth-')));
for(const f of depthFiles)if(!depthLoaded.has(f))fail('course-depth','Fichier présent mais non chargé par index.html',f);
for(const f of depthLoaded)if(!exists(f))fail('course-depth','Fichier chargé mais absent du dépôt',f);

const el=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null},addEventListener(){},removeEventListener(){},querySelector(){return null},querySelectorAll(){return[]},getContext(){return null},focus(){},click(){},scrollIntoView(){},innerHTML:'',textContent:'',value:'',checked:false,disabled:false});
const document={readyState:'loading',visibilityState:'visible',body:el(),documentElement:el(),createElement:el,createTextNode:t=>({textContent:String(t)}),getElementById:()=>el(),querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},removeEventListener(){}};
const store=new Map();
const c={console,document,navigator:{userAgent:'release-readiness',language:'fr-FR',onLine:true},location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame:f=>setTimeout(f,0),cancelAnimationFrame:clearTimeout,Audio:function(){return{play(){return Promise.resolve()},pause(){}}},Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[]}},SpeechSynthesisUtterance:function(){},fetch:async()=>({ok:false,status:404,text:async()=>'',json:async()=>({})}),crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,performance:{now:()=>Date.now()},alert(){},confirm(){return false},prompt(){return null},addEventListener(){},removeEventListener(){}};
c.window=c;c.self=c;c.globalThis=c;vm.createContext(c);
for(const s of scripts){if(s.startsWith('js/vendor/')||!exists(s))continue;try{vm.runInContext(read(s),c,{filename:s,timeout:30000});}catch(e){fail(s,'Erreur au chargement VM',e.message);break}if(s==='js/app-content.js')break;}
let activeIds=[],depthIds=[];
try{activeIds=vm.runInContext(`typeof CHMAP==='object'?Object.keys(CHMAP):[]`,c);depthIds=vm.runInContext(`window.MQCourseDepth?.chapters?Object.keys(MQCourseDepth.chapters):[]`,c);}catch(e){fail('registry','Impossible de lire les registres',e.message);}
const active=new Set(activeIds);for(const id of depthIds)if(!active.has(id))fail('course-depth','Approfondissement orphelin',id);

const debt=[];
function walk(dir){for(const ent of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const p=path.posix.join(dir,ent.name);if(ent.isDirectory())walk(p);else if(/\.(?:js|mjs|css)$/i.test(ent.name))read(p).split(/\r?\n/).forEach((line,i)=>{if(/\b(?:TODO|FIXME|HACK)\b/.test(line))debt.push({file:p,line:i+1,text:line.trim().slice(0,180)});});}}
for(const dir of ['js','data'])walk(dir);if(debt.length)warn('debt','Marqueurs TODO/FIXME/HACK présents',String(debt.length));

const uniq=a=>[...new Map(a.map(v=>[`${v.id}|${v.msg}|${v.extra}`,v])).values()];
const E=uniq(errors),W=uniq(warnings);
const report={generatedAt:new Date().toISOString(),swVersion,indexScripts:scripts.length,indexStyles:styles.length,cssFilesTraversed:cssSeen.size,depthFilesOnDisk:depthFiles.length,depthFilesLoaded:depthLoaded.size,activeChapters:activeIds.length,depthChapters:depthIds.length,debtMarkers:debt.length,errorCount:E.length,warningCount:W.length,errors:E,warnings:W,debt};
fs.writeFileSync(path.join(root,'tests/release-readiness-report.json'),JSON.stringify(report,null,2));
const md=['# Finot Académie — release readiness','',`Généré : ${report.generatedAt}`,'',`- Service worker : **${swVersion||'ABSENT'}**`,`- Scripts index : **${report.indexScripts}**`,`- CSS index / parcourus : **${report.indexStyles} / ${report.cssFilesTraversed}**`,`- Course-depth sur disque / chargés : **${report.depthFilesOnDisk} / ${report.depthFilesLoaded}**`,`- Chapitres actifs / approfondis : **${report.activeChapters} / ${report.depthChapters}**`,`- Marqueurs TODO/FIXME/HACK : **${report.debtMarkers}**`,`- Erreurs bloquantes : **${report.errorCount}**`,`- Avertissements : **${report.warningCount}**`,''];
if(E.length){md.push('## Erreurs','');for(const e of E)md.push(`- **${e.id}** — ${e.msg}${e.extra?` : ${e.extra}`:''}`);md.push('');}
if(W.length){md.push('## Avertissements','');for(const w of W)md.push(`- **${w.id}** — ${w.msg}${w.extra?` : ${w.extra}`:''}`);md.push('');}
if(debt.length){md.push('## Dette explicite détectée','');for(const d of debt.slice(0,100))md.push(`- \`${d.file}:${d.line}\` — ${d.text}`);md.push('');}
fs.writeFileSync(path.join(root,'tests/release-readiness-report.md'),md.join('\n'));
console.log(JSON.stringify(report,null,2));
if(E.length)process.exitCode=1;
