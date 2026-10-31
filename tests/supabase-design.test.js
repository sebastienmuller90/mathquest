/* Conception du backend de suivi parent (supabase/, NON DÉPLOYÉ) : cohérence client ↔ serveur et sécurité (31/10/2026).
   - Aucun secret, aucune URL de projet, aucune clé réelle dans supabase/.
   - Chaque RPC appelée par l'app (js/app-state.js, js/app-actions.js, parent.html) existe dans la migration, avec les mêmes
     noms d'arguments ; la liste blanche SQL du snapshot est exactement celle de js/sync-snapshot.js.
   - Exécute les tests de sécurité PostgreSQL réels (supabase/tests/run.mjs, PGlite) : prérequis « cd supabase && npm ci ». */
const fs=require('fs'),path=require('path');
const {spawnSync}=require('child_process');
const {ROOT}=require('./lib');
const SUP=path.join(ROOT,'supabase');

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const migs=fs.existsSync(path.join(SUP,'migrations'))?fs.readdirSync(path.join(SUP,'migrations')).filter(f=>f.endsWith('.sql')).sort():[];
 T('supabase/migrations : au moins une migration versionnée',migs.length>0,migs.join(', '));
 const sql=migs.map(f=>fs.readFileSync(path.join(SUP,'migrations',f),'utf8')).join('\n');
 const all=[];(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name==='node_modules')continue;const p=path.join(d,e.name);if(e.isDirectory())walk(p);else all.push(p);}})(SUP);
 const leaks=all.filter(f=>{const s=fs.readFileSync(f,'utf8');return /https:\/\/[a-z0-9]{20}\.supabase\.co/.test(s)||/sb_publishable_[A-Za-z0-9]{10,}/.test(s)||/sb_secret_|service_role_key|eyJhbGciOi/.test(s);});
 T('Aucune URL de projet, clé publishable réelle, clé secrète ou JWT dans supabase/',!leaks.length,leaks.map(f=>path.relative(ROOT,f)).join(', '));
 const fns={};for(const m of sql.matchAll(/create function api\.(mq_[a-z_]+)\(([^)]*)\)/g))fns[m[1]]=m[2].split(',').map(a=>a.trim().split(/\s+/)[0]).filter(Boolean);
 const client=['js/app-state.js','js/app-actions.js','parent.html',...fs.readdirSync(path.join(ROOT,'js')).filter(f=>/^parent-.*\.js$/.test(f)).map(f=>'js/'+f)].map(f=>fs.readFileSync(path.join(ROOT,f),'utf8')).join('\n');
 const used=[];for(const m of client.matchAll(/rpc\('(mq_[a-z_]+)',\{([^}]*)\}/g))used.push({fn:m[1],args:[...m[2].matchAll(/(p_[a-z_]+)/g)].map(x=>x[1])});
 const bad=used.filter(u=>!fns[u.fn]||u.args.some(a=>!fns[u.fn].includes(a))||fns[u.fn].some(a=>!u.args.includes(a)));
 T(`Contrat RPC : les ${used.length} appels du client existent côté SQL avec exactement les mêmes arguments`,used.length>=6&&!bad.length,bad.map(u=>u.fn+'('+u.args+') ≠ '+(fns[u.fn]||'absente')).join(' | '));
 const win={};require('vm').runInNewContext(fs.readFileSync(path.join(ROOT,'js','sync-snapshot.js'),'utf8'),{window:win});
 const allowed=((sql.match(/allowed text\[\] := array\[([\s\S]*?)\];/)||[])[1]||'').match(/'([^']+)'/g)||[];
 const sqlFields=allowed.map(x=>x.slice(1,-1)).filter(x=>x!=='lastSeen'&&x!=='syncSchema').sort(),cliFields=[...win.MQSyncSnapshot.FIELDS].sort();
 T('Liste blanche du snapshot : SQL = js/sync-snapshot.js (+ lastSeen, syncSchema)',JSON.stringify(sqlFields)===JSON.stringify(cliFields),JSON.stringify({sqlOnly:sqlFields.filter(x=>!cliFields.includes(x)),clientOnly:cliFields.filter(x=>!sqlFields.includes(x))}));
 const kinds=((sql.match(/kind in \(([^)]*)\)/)||[])[1]||'').match(/'([^']+)'/g).map(x=>x.slice(1,-1)).sort();
 const sent=[...new Set([...client.matchAll(/act\('([a-z_]+)'/g)].map(m=>m[1]))].sort();
 T('Types d’actions parent : ceux envoyés par la page parent sont exactement ceux autorisés par le serveur',JSON.stringify(kinds)===JSON.stringify(sent),JSON.stringify({kinds,sent}));
 const mod=path.join(SUP,'node_modules','@electric-sql','pglite');
 if(!fs.existsSync(mod)){T('Tests de sécurité PostgreSQL : dépendance PGlite installée (cd supabase && npm ci)',false,'supabase/node_modules absent');return R;}
 const r=spawnSync(process.execPath,[path.join(SUP,'tests','run.mjs')],{cwd:SUP,encoding:'utf8',timeout:600000});
 const bil=(r.stdout.match(/BILAN PASS=(\d+) FAIL=(\d+)/)||[]);
 T(`Tests de sécurité PostgreSQL 18 réels (PGlite) : ${bil[1]||0} PASS / ${bil[2]||'?'} FAIL`,r.status===0&&bil[2]==='0'&&+bil[1]>=50,(r.stdout.split('\n').filter(l=>/❌/.test(l)).slice(0,5).join(' | ')||r.stderr).slice(0,600));
 return R;}
require('./lib').main(run);
