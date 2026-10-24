import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const ignore=new Set(['.git','node_modules','test-results','playwright-report']);
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(ignore.has(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else{const rel=path.relative(root,p).replaceAll('\\','/');const st=fs.statSync(p);files.push({path:rel,bytes:st.size,ext:path.extname(rel).toLowerCase()||'(none)'});}}}
walk(root);
const runtime=files.filter(f=>!/^tests\//.test(f.path)&&!/^\.github\//.test(f.path)&&!/^docs\//.test(f.path)&&!/^tools\//.test(f.path));
const mediaExt=new Set(['.png','.jpg','.jpeg','.webp','.gif','.svg','.mp3','.wav','.ogg','.m4a','.mp4','.webm','.woff','.woff2','.ttf']);
const media=runtime.filter(f=>mediaExt.has(f.ext));
const total=a=>a.reduce((n,f)=>n+f.bytes,0);
const byExt={};for(const f of runtime){const x=byExt[f.ext]||(byExt[f.ext]={count:0,bytes:0});x.count++;x.bytes+=f.bytes;}
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const refs=[...sw.matchAll(/['"](\.\/?[^'"?#]+)['"]/g)].map(m=>m[1].replace(/^\.\//,''));
const precache=[...new Set(refs)].filter(r=>fs.existsSync(path.join(root,r)));
const missingRefs=[...new Set(refs)].filter(r=>!fs.existsSync(path.join(root,r))&&!/^https?:/.test(r));
const top=[...runtime].sort((a,b)=>b.bytes-a.bytes).slice(0,40);
const heavy=runtime.filter(f=>f.bytes>1024*1024).sort((a,b)=>b.bytes-a.bytes);
const report={summary:{runtimeFiles:runtime.length,runtimeBytes:total(runtime),runtimeMiB:+(total(runtime)/1048576).toFixed(2),mediaFiles:media.length,mediaBytes:total(media),mediaMiB:+(total(media)/1048576).toFixed(2),filesOver1MiB:heavy.length,precacheExistingFiles:precache.length,precacheBytes:total(runtime.filter(f=>precache.includes(f.path))),precacheMiB:+(total(runtime.filter(f=>precache.includes(f.path)))/1048576).toFixed(2),missingLocalSwRefs:missingRefs.length},byExtension:Object.entries(byExt).map(([ext,v])=>({ext,...v,miB:+(v.bytes/1048576).toFixed(2)})).sort((a,b)=>b.bytes-a.bytes),top,heavy,missingRefs};
fs.writeFileSync(path.join(root,'tests/asset-performance-report.json'),JSON.stringify(report,null,2));
const md=['# Finot Académie — audit poids PWA','',`- Fichiers runtime : **${report.summary.runtimeFiles}**`,`- Poids runtime : **${report.summary.runtimeMiB} MiB**`,`- Médias/fonts : **${report.summary.mediaMiB} MiB** (${report.summary.mediaFiles} fichiers)`,`- Fichiers > 1 MiB : **${report.summary.filesOver1MiB}**`,`- Précache SW détecté : **${report.summary.precacheMiB} MiB** / ${report.summary.precacheExistingFiles} fichiers`,`- Références locales SW manquantes : **${report.summary.missingLocalSwRefs}**`,'','## 40 fichiers runtime les plus lourds','', '| Fichier | Taille MiB |','|---|---:|',...top.map(f=>`| ${f.path} | ${(f.bytes/1048576).toFixed(2)} |`),'','## Poids par extension','', '| Extension | Fichiers | MiB |','|---|---:|---:|',...report.byExtension.map(x=>`| ${x.ext} | ${x.count} | ${x.miB} |`)];
fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.writeFileSync(path.join(root,'docs/asset-performance-report.md'),md.join('\n'));
console.log(JSON.stringify(report,null,2));
if(missingRefs.length)process.exitCode=1;
