/* Identité PWA Finot Académie (02/11/2026) : manifeste, icônes installables et couleurs cohérentes avec l'application réelle
   (orange Finot #ff8a3d sur fond crème #fff6e8) et avec l'icône Android validée (Finot sur fond blanc). Plus aucun violet
   historique (#7c3aed / #f4f1ff) dans l'identité d'installation. Les pixels sont lus par un décodeur PNG local (sans navigateur). */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const {ROOT,main}=require('./lib');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');

/* Décodeur PNG minimal : 8 bits, RGB ou RGBA, non entrelacé (suffit pour nos icônes). */
function png(file){const b=fs.readFileSync(path.join(ROOT,file));if(b.readUInt32BE(0)!==0x89504e47)throw new Error('pas un PNG : '+file);
 let o=8,w=0,h=0,ct=0,bd=0,il=0;const idat=[];
 while(o<b.length){const len=b.readUInt32BE(o),type=b.toString('ascii',o+4,o+8),d=b.subarray(o+8,o+8+len);
  if(type==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);bd=d[8];ct=d[9];il=d[12];}else if(type==='IDAT')idat.push(d);o+=12+len;}
 if(bd!==8||il!==0||(ct!==2&&ct!==6))throw new Error('format PNG non géré : '+file+' bd='+bd+' ct='+ct+' il='+il);
 const bpp=ct===6?4:3,raw=zlib.inflateSync(Buffer.concat(idat)),stride=w*bpp,px=Buffer.alloc(w*h*4);let prev=Buffer.alloc(stride);
 for(let y=0;y<h;y++){const f=raw[y*(stride+1)],line=Buffer.from(raw.subarray(y*(stride+1)+1,(y+1)*(stride+1)));
  for(let i=0;i<stride;i++){const a=i>=bpp?line[i-bpp]:0,up=prev[i],c=i>=bpp?prev[i-bpp]:0;
   if(f===1)line[i]=(line[i]+a)&255;else if(f===2)line[i]=(line[i]+up)&255;else if(f===3)line[i]=(line[i]+((a+up)>>1))&255;
   else if(f===4){const p=a+up-c,pa=Math.abs(p-a),pb=Math.abs(p-up),pc=Math.abs(p-c);line[i]=(line[i]+(pa<=pb&&pa<=pc?a:pb<=pc?up:c))&255;}}
  for(let x=0;x<w;x++){const j=(y*w+x)*4;px[j]=line[x*bpp];px[j+1]=line[x*bpp+1];px[j+2]=line[x*bpp+2];px[j+3]=bpp===4?line[x*bpp+3]:255;}
  prev=line;}
 return {w,h,px,at:(x,y)=>{const j=(y*w+x)*4;return [px[j],px[j+1],px[j+2],px[j+3]];}};}
const white=p=>p[3]>=250&&p[0]>=250&&p[1]>=250&&p[2]>=250;
const violet=p=>p[3]>200&&p[0]>=85&&p[0]<=175&&p[1]<=115&&p[2]>=190&&p[0]-p[1]>=35;   // famille #7c3aed / #9b5cff (rouge > vert) ; le bleu du sweat de Finot a vert >= rouge
const orange=p=>p[3]>200&&p[0]>=200&&p[1]>=80&&p[1]<=170&&p[2]<=90;

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
 const man=JSON.parse(read('manifest.webmanifest'));
 const idx=read('index.html'),css=read('styles.css'),sw=read('sw.js'),pkg=read('scripts/package-www.mjs'),gi=read('.gitignore');
 const metaTheme=(idx.match(/<meta name="theme-color" content="(#[0-9a-fA-F]{6})"/)||[])[1]||'';
 const bg=(css.match(/:root\{--bg:(#[0-9a-fA-F]{6})/)||[])[1]||'';

 T('Couleur de thème : orange Finot de l’application (identique à la balise theme-color de index.html), plus de violet',man.theme_color&&man.theme_color.toLowerCase()===metaTheme.toLowerCase()&&man.theme_color.toLowerCase()==='#ff8a3d',man.theme_color+' / '+metaTheme);
 T('Fond de démarrage (splash PWA) : crème de l’application (--bg de styles.css), plus de lavande',man.background_color&&man.background_color.toLowerCase()===bg.toLowerCase()&&bg.toLowerCase()==='#fff6e8',man.background_color+' / '+bg);
 T('Manifeste : aucun violet historique (#7c3aed, #f4f1ff)',!/7c3aed|f4f1ff/i.test(JSON.stringify(man)),JSON.stringify(man));
 T('Manifeste : nom « Finot Académie », start_url, mode autonome conservés',man.name==='Finot Académie'&&man.short_name==='Finot Académie'&&man.start_url==='./'&&man.display==='standalone','');

 const icons=man.icons||[];const rec=(size,purpose)=>icons.find(i=>i.sizes===size&&(i.purpose||'any')===purpose&&i.type==='image/png');
 T('Icônes : 192 et 512 « any » + 512 « maskable » déclarées séparément (jamais « any maskable » combiné)',!!rec('192x192','any')&&!!rec('512x512','any')&&!!rec('512x512','maskable')&&!icons.some(i=>/any\s+maskable|maskable\s+any/.test(i.purpose||'')),JSON.stringify(icons));
 const dims=[];for(const i of icons){const f=i.src.replace(/^\.\//,'');if(!fs.existsSync(path.join(ROOT,f))){dims.push(f+' absent');continue;}const p=png(f);if(p.w+'x'+p.h!==i.sizes)dims.push(f+' '+p.w+'x'+p.h+' ≠ '+i.sizes);}
 T('Chaque icône déclarée existe et a exactement la taille annoncée',icons.length>=3&&!dims.length,dims.join(' | '));

 const any512=rec('512x512','any'),any192=rec('192x192','any'),mask=rec('512x512','maskable');
 if(any512&&any192&&mask){
  const A=png(any512.src),B=png(any192.src),M=png(mask.src);
  const frame=(P,pct)=>{const m=Math.round(P.w*pct);let bad=0;for(let y=0;y<P.h;y++)for(let x=0;x<P.w;x++){if(x<m||y<m||x>=P.w-m||y>=P.h-m){if(!white(P.at(x,y)))bad++;}}return bad;};
  const count=(P,f)=>{let n=0;for(let i=0;i<P.w*P.h;i++){const j=i*4;if(f([P.px[j],P.px[j+1],P.px[j+2],P.px[j+3]]))n++;}return n;};
  T('Icône « any » 512 (icon.png) : fond blanc comme l’icône Android, marge blanche, aucun pixel violet, orange de Finot présent',frame(A,.04)===0&&count(A,violet)===0&&count(A,orange)>A.w*A.h*.05,JSON.stringify({bordNonBlanc:frame(A,.04),violet:count(A,violet),orange:count(A,orange)}));
  T('Icône « any » 192 : fond blanc, marge blanche, aucun pixel violet, orange de Finot présent',frame(B,.04)===0&&count(B,violet)===0&&count(B,orange)>B.w*B.h*.05,JSON.stringify({bordNonBlanc:frame(B,.04),violet:count(B,violet),orange:count(B,orange)}));
  let out=0,opaque=0,minX=1e9,maxX=-1,minY=1e9,maxY=-1;const cx=M.w/2,cy=M.h/2,R0=M.w*.4;
  for(let y=0;y<M.h;y++)for(let x=0;x<M.w;x++){const p=M.at(x,y);if(p[3]<255)opaque++;if(!white(p)){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);if(Math.hypot(x+.5-cx,y+.5-cy)>R0)out++;}}
  T('Icône « maskable » 512 : entièrement opaque, fond blanc, tout Finot dans la zone de sécurité (cercle de 80 % du côté), aucun violet',opaque===0&&out===0&&count(M,violet)===0&&count(M,orange)>M.w*M.h*.04,JSON.stringify({transparents:opaque,horsZone:out,bbox:[minX,minY,maxX,maxY],violet:count(M,violet)}));
 }else T('Icônes « any » 512, « any » 192 et « maskable » 512 lisibles',false,'icônes manquantes');

 const files=[...new Set(icons.map(i=>i.src.replace(/^\.\//,'')))];
 T('Hors ligne : chaque icône du manifeste est préchargée par le service worker (SEEDS)',files.every(f=>sw.includes("'./"+f+"'")),files.filter(f=>!sw.includes("'./"+f+"'")).join(', '));
 T('Application Android embarquée : chaque icône est copiée dans www/ (liste blanche de package-www)',files.every(f=>pkg.includes("'"+f+"'")),files.filter(f=>!pkg.includes("'"+f+"'")).join(', '));
 T('Dépôt : chaque icône est autorisée par la liste blanche .gitignore',files.every(f=>new RegExp('^!/'+f.replace(/[.]/g,'\\.')+'\\s*$','m').test(gi)),files.filter(f=>!new RegExp('^!/'+f.replace(/[.]/g,'\\.')+'\\s*$','m').test(gi)).join(', '));
 T('Pages : apple-touch-icon pointe une icône existante, thème de la barre cohérent',['index.html','parent.html'].every(pg=>{const h=read(pg);const m=h.match(/rel="apple-touch-icon" href="([^"]+)"/);return m&&fs.existsSync(path.join(ROOT,m[1]));})&&/#ff8a3d/i.test(metaTheme),metaTheme);
 return R;}
if(require.main===module)main(run);
module.exports=run;
