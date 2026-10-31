#!/usr/bin/env node
/* Finot Académie — packaging déterministe du répertoire www/ embarqué par Capacitor (Android).
   Le site web reste servi tel quel depuis la racine du dépôt (aucune étape de build pour la PWA) ; www/ n'est qu'une COPIE
   propre de l'application, construite à partir :
     1. d'une liste blanche explicite (fichiers racine + dossiers data/, js/, fonts/) ;
     2. des seuls fichiers suivis par Git (un brouillon local n'est jamais embarqué) ;
   puis vérifiée : chaque ressource chargée par index.html / parent.html et chaque url() des feuilles de style doit exister,
   sinon le script échoue (code 1). Le service worker n'est pas embarqué : dans l'app native, les fichiers sont déjà dans
   l'APK et js/app-pwa.js ne l'enregistre pas (couche plateforme js/platform.js).
   Sortie reproductible : mêmes sources → mêmes octets, et un manifeste www/finot-package.json (version, versionCode,
   taille et SHA-256 de chaque fichier, empreinte globale) sans date ni chemin machine.

   Usage : node scripts/package-www.mjs [--out www] [--root .] [--no-git]                                                  */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const GENERATOR='finot-package-www';
// Fichiers racine de l'application publiée (miroir de la liste blanche du .gitignore, sans sw.js).
export const ROOT_FILES=['index.html','parent.html','manifest.webmanifest','icon.png','styles.css','pedagogy-upgrade.css','age-adaptive.css',
 'premium-ui.css','premium-pro.css','premium-entry.css','premium-parent.css','premium-v2.css'];
export const DIRS=['data','js','fonts'];
// Jamais embarqué, même suivi par Git : notes, fichiers cachés, brouillons, sources de cartes, journaux.
const EXCLUDE=[/\.md$/i,/(^|\/)\.[^/]*$/,/(^|\/)_tmp/,/\.map$/i,/\.(?:log|bak|tmp)$/i,/(^|\/)(?:Thumbs\.db|desktop\.ini)$/i];
const ESSENTIAL=['index.html','parent.html','manifest.webmanifest','icon.png','styles.css','fonts/fonts.css'];

function fail(msg,code=1){console.error('[package-www] ÉCHEC : '+msg);process.exit(code);}
function args(argv){const o={git:true};for(let i=0;i<argv.length;i++){const a=argv[i];if(a==='--out')o.out=argv[++i];else if(a==='--root')o.root=argv[++i];else if(a==='--no-git')o.git=false;else fail('option inconnue : '+a,2);}return o;}
const posix=p=>p.split(path.sep).join('/');
function walk(dir,base,out=[]){if(!fs.existsSync(dir))return out;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,base,out);else if(e.isFile())out.push(posix(path.relative(base,p)));}return out;}

function candidates(root,useGit){
 if(useGit){let out;try{out=execFileSync('git',['-c','safe.directory=*','ls-files','-z','--',...ROOT_FILES,...DIRS.map(d=>d+'/')],{cwd:root,encoding:'utf8',maxBuffer:64<<20});}
  catch(e){fail('Git est requis pour ne prendre que les fichiers suivis ('+String(e.message).split('\n')[0]+'). Utiliser --no-git uniquement hors dépôt.');}
  // Un fichier suivi mais supprimé localement est un fichier manquant : il sera signalé par les vérifications.
  return out.split('\0').filter(Boolean);}
 return [...ROOT_FILES.filter(f=>fs.existsSync(path.join(root,f))),...DIRS.flatMap(d=>walk(path.join(root,d),root))];}

// Références locales d'une page HTML (src/href) et d'une feuille de style (url()), relatives au fichier.
function localRefs(text,from,kind){const out=[];const add=r=>{r=r.trim();if(!r||/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(r))return;r=r.split(/[?#]/)[0];if(!r)return;out.push(posix(path.posix.normalize(path.posix.join(path.posix.dirname(from),decodeURIComponent(r)))));};
 if(kind==='html')for(const m of text.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi))add(m[1]);
 for(const m of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi))add(m[1]);
 return out;}

function versionOf(root){const f=path.join(root,'sw.js');if(!fs.existsSync(f))fail('fichier essentiel manquant : sw.js (source de la version)');
 const v=(fs.readFileSync(f,'utf8').match(/const VERSION='([^']+)'/)||[])[1];if(!v)fail('VERSION introuvable dans sw.js');
 const m=v.match(/^(\d+)\.(\d+)\.(\d+)-/);if(!m)fail('VERSION de sw.js hors format X.Y.Z-description-AAAA-MM-JJ : '+v);
 const [maj,min,pat]=m.slice(1).map(Number);if(min>999||pat>999)fail('versionCode : mineur et correctif doivent rester < 1000 ('+v+')');
 return {version:v,versionName:`${maj}.${min}.${pat}`,versionCode:maj*1e6+min*1e3+pat};}

function prepareOut(out,root){
 const r=path.resolve(root),o=path.resolve(out);
 if(o===r||r.startsWith(o+path.sep))fail('le dossier de sortie ne peut pas être (ou contenir) la racine du dépôt : '+o,2);
 if(fs.existsSync(o)){const items=fs.readdirSync(o);
  if(items.length){let ok=false;try{ok=JSON.parse(fs.readFileSync(path.join(o,'finot-package.json'),'utf8')).generator===GENERATOR;}catch(e){}
   if(!ok)fail('refus de vider '+o+' : dossier non vide qui n’est pas un www/ produit par ce script (aucun fichier supprimé)',2);
   fs.rmSync(o,{recursive:true,force:true});}}
 fs.mkdirSync(o,{recursive:true});return o;}

export function build({root,out,git=true}){
 root=path.resolve(root);
 const list=[...new Set(candidates(root,git))].filter(f=>!EXCLUDE.some(re=>re.test(f))).sort();
 const set=new Set(list);
 const missing=[];
 for(const f of [...ROOT_FILES,...ESSENTIAL])if(!set.has(f)||!fs.existsSync(path.join(root,f)))missing.push(f);
 for(const f of list)if(!fs.existsSync(path.join(root,f)))missing.push(f+' (suivi par Git mais absent du disque)');
 for(const page of ['index.html','parent.html']){const p=path.join(root,page);if(!fs.existsSync(p))continue;
  for(const r of localRefs(fs.readFileSync(p,'utf8'),page,'html'))if(!set.has(r)||!fs.existsSync(path.join(root,r)))missing.push(r+' (référencé par '+page+')');}
 for(const css of list.filter(f=>f.endsWith('.css'))){const p=path.join(root,css);if(!fs.existsSync(p))continue;
  for(const r of localRefs(fs.readFileSync(p,'utf8'),css,'css'))if(!set.has(r)||!fs.existsSync(path.join(root,r)))missing.push(r+' (url() de '+css+')');}
 if(missing.length)fail('fichier(s) essentiel(s) manquant(s) : '+[...new Set(missing)].slice(0,20).join(' | '));
 const ver=versionOf(root);
 const dest=prepareOut(out||path.join(root,'www'),root);
 const files=[];let total=0;const h=crypto.createHash('sha256');
 for(const f of list){const src=path.join(root,f),dst=path.join(dest,f);fs.mkdirSync(path.dirname(dst),{recursive:true});
  const buf=fs.readFileSync(src);fs.writeFileSync(dst,buf);const s=crypto.createHash('sha256').update(buf).digest('hex');
  files.push({path:f,size:buf.length,sha256:s});total+=buf.length;h.update(f+'\t'+buf.length+'\t'+s+'\n');}
 const manifest={generator:GENERATOR,schema:1,app:'Finot Académie',...ver,fileCount:files.length,totalBytes:total,digest:h.digest('hex'),files};
 fs.writeFileSync(path.join(dest,'finot-package.json'),JSON.stringify(manifest,null,1)+'\n');
 return {dest,manifest};}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const o=args(process.argv.slice(2));
 const root=o.root||path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
 const {dest,manifest:m}=build({root,out:o.out&&path.resolve(o.out),git:o.git});
 console.log(`[package-www] ${m.fileCount} fichiers, ${(m.totalBytes/1048576).toFixed(1)} Mo → ${dest}`);
 console.log(`[package-www] version ${m.version} (versionName ${m.versionName}, versionCode ${m.versionCode}) — empreinte ${m.digest.slice(0,16)}…`);}
