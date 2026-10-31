// Finot Académie — tests de sécurité du backend de suivi parent, exécutés RÉELLEMENT dans PostgreSQL 18 (PGlite, local).
// Aucune connexion réseau, aucun projet Supabase, aucune clé. Rôles anon / authenticated recréés comme sur Supabase.
// Couvre docs/supabase-security-test-plan.md : surface API, isolation A/B, jetons, contrat de snapshot, actions,
// suppression, rotation, limite de débit, SECURITY DEFINER, RLS, rétention ; et le contrat avec le VRAI client
// (js/sync-snapshot.js exécuté sur un profil riche).
import {PGlite} from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const HERE=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.join(HERE,'..','..');
const MIG=path.join(HERE,'..','migrations');
const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
const A='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
const tok=n=>[...crypto.randomBytes(n)].map(x=>A[x%A.length]).join('');

// Snapshot réel produit par le client (même code que l'app).
function clientSnapshot(S){const win={};vm.runInNewContext(fs.readFileSync(path.join(ROOT,'js','sync-snapshot.js'),'utf8'),{window:win});return win.MQSyncSnapshot.build(S,1793400000000);}
const RICH={name:'Léa',avatar:'🦊',grade:'CE2',birthdate:'2016-04-12',lastBirthdayYear:2026,gender:'girl',companion:'finot',pin:'4321',sync:{child:'x',parent:'y'},
 dys:{enabled:true},learnerProfile:{level:'fragile'},diagnostic:{answers:[1,2]},homeworkHelp:{last:{text:'SECRET'}},mistakes:{a:[{q:'Q',answer:'A'}]},economy:{coins:3},tts:{rate:1},
 xp:120,totalQ:8,totalOk:5,time:300,streak:{n:2,best:3,last:'2026-10-31'},daily:{date:'2026-10-31',ok:5,done:false},dailyGoal:20,chap:{'ce2-x':{ok:5,tot:8,stars:1}},lessons:{},
 merit:{pts:10,total:12,req:[],rewards:[{id:'r1',e:'🎁',n:'Parc',c:100}],rules:{ok:1},hist:[{t:1,d:2,w:'Bonus'}],notes:['SECRET-NOTE']},readingMastery:{},readingProgress:{},
 competencies:{'ce2-x::identifier':{value:50,attempts:2}},activityLog:[{t0:1,kind:'exo',ids:['ce2-x'],ms:1000,subj:'maths'}],answerLog:[{t:1,cid:'ce2-x',ok:true,source:'practice',ms:900}],
 studyLog:[{cid:'ce2-x',t:1}],interrogations:{active:null,history:[{id:'h',status:'done',score:50,ok:1,total:2,subjects:[],answers:[{q:'Q',your:'SECRET-REPONSE'}]}]},path:{date:'2026-10-31',steps:[]},pathHist:[]};

async function expectRefused(db,sql,params){try{await db.query(sql,params);return false;}catch(e){return /finot: request refused|permission denied/.test(e.message)?e.message:false;}}

async function main(){
 const db=new PGlite();
 await db.exec(`create role anon nologin; create role authenticated nologin; grant anon to postgres; grant authenticated to postgres;`);
 const files=fs.readdirSync(MIG).filter(f=>f.endsWith('.sql')).sort();
 for(const f of files)await db.exec(fs.readFileSync(path.join(MIG,f),'utf8'));
 T(`Migrations appliquées sans erreur dans PostgreSQL 18 (${files.length})`,files.length>=1,files.join(', '));
 const asAnon=async(sql,params)=>{await db.exec('set role anon');try{return await db.query(sql,params);}finally{await db.exec('reset role');}};
 const anonRefused=async(sql,params)=>{await db.exec('set role anon');try{return await expectRefused(db,sql,params);}finally{await db.exec('reset role');}};

 // ===== A. Surface API
 for(const t of ['families','snapshots','parent_actions'])for(const [op,sql] of [['SELECT',`select * from private.${t}`],['INSERT',`insert into private.${t} default values`],['UPDATE',`update private.${t} set created_at=now()`],['DELETE',`delete from private.${t}`]]){
  if(op==='UPDATE'&&t!=='families')continue;
  T(`Accès direct ${op} private.${t} avec la clé publique (anon) : refusé`,await anonRefused(sql),'');}
 const fns=(await db.query(`select n.nspname||'.'||p.proname f from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('api','private') and has_function_privilege('anon',p.oid,'EXECUTE') order by 1`)).rows.map(r=>r.f);
 T('Seules les 7 RPC prévues sont exécutables par anon (aucune fonction privée)',JSON.stringify([...fns].sort())===JSON.stringify(['api.mq_ack','api.mq_act','api.mq_delete','api.mq_get','api.mq_push','api.mq_register','api.mq_rotate_parent']),fns.join(', '));
 const auth=(await db.query(`select count(*)::int n from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('api','private') and (has_function_privilege('authenticated',p.oid,'EXECUTE'))`)).rows[0].n;
 T('Aucune fonction exécutable par authenticated (pas d’auth dans ce modèle)',auth===0,String(auth));
 T('anon ne peut pas appeler la purge ni le validateur',await anonRefused(`select private.purge_expired()`)&&await anonRefused(`select private.validate_snapshot('{}'::jsonb)`),'');
 const defs=(await db.query(`select p.proname,p.prosecdef,p.proconfig from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname in ('api','private')`)).rows;
 const badPath=defs.filter(d=>!(d.proconfig||[]).some(c=>/^search_path=("")?$/.test(c)));
 T('Toutes les fonctions ont un search_path vide (anti-détournement des SECURITY DEFINER)',!badPath.length,badPath.map(d=>d.proname).join(', '));
 const rls=(await db.query(`select relname,relrowsecurity,relforcerowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='private' and relkind='r'`)).rows;
 T('RLS activée ET forcée sur les 3 tables privées (sans politique : défense en profondeur)',rls.length===3&&rls.every(r=>r.relrowsecurity&&r.relforcerowsecurity),JSON.stringify(rls));
 const pub=(await db.query(`select count(*)::int n from information_schema.tables where table_schema in ('public','api')`)).rows[0].n;
 T('Aucune table dans les schémas exposés (public, api)',pub===0,String(pub));

 // ===== B. Deux familles
 const fam=()=>({c:tok(28),p:tok(32)});const FA=fam(),FB=fam();
 for(const f of [FA,FB]){const r=await asAnon('select api.mq_register($1,$2) r',[f.c,f.p]);if(!r.rows[0].r.ok)throw new Error('register');}
 const snapA=clientSnapshot(RICH),snapB={...clientSnapshot({...RICH,name:'Bob',xp:7})};
 const pushA=await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)]);
 await asAnon('select api.mq_push($1,$2::jsonb) r',[FB.c,JSON.stringify(snapB)]);
 T('Contrat client : le snapshot réel de js/sync-snapshot.js (profil riche) est accepté',Array.isArray(pushA.rows[0].r),JSON.stringify(pushA.rows[0].r));
 const getA=(await asAnon('select api.mq_get($1) r',[FA.p])).rows[0].r,getB=(await asAnon('select api.mq_get($1) r',[FB.p])).rows[0].r;
 T('Isolation : parent A lit A, parent B lit B',getA.data.name==='Léa'&&getB.data.name==='Bob'&&getA.data.xp===120&&getB.data.xp===7,JSON.stringify([getA.data.name,getB.data.name]));
 const rawA=JSON.stringify(getA);
 T('Données stockées : ni date de naissance, ni réponses libres, ni notes, ni DYS, ni secrets',!/2016-04-12|SECRET|"pin"|"dys"|"birthdate"/.test(rawA),'');
 await asAnon('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'bonus',JSON.stringify({n:5,why:'Bravo'})]);
 const pendB=(await asAnon('select api.mq_push($1,$2::jsonb) r',[FB.c,JSON.stringify(snapB)])).rows[0].r;
 const pendA=(await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)])).rows[0].r;
 T('Isolation : l’action du parent A n’arrive qu’à l’enfant A',pendA.length===1&&pendA[0].kind==='bonus'&&pendB.length===0,JSON.stringify({pendA,pendB}));
 const ackB=(await asAnon('select api.mq_ack($1,$2::uuid[]) r',[FB.c,[pendA[0].id]])).rows[0].r;
 T('Isolation : l’enfant B ne peut pas acquitter une action de A',ackB===0&&(await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)])).rows[0].r.length===1,String(ackB));
 const ack1=(await asAnon('select api.mq_ack($1,$2::uuid[]) r',[FA.c,[pendA[0].id]])).rows[0].r,ack2=(await asAnon('select api.mq_ack($1,$2::uuid[]) r',[FA.c,[pendA[0].id]])).rows[0].r;
 T('Acquittement idempotent (1 puis 0), action plus livrée ensuite',ack1===1&&ack2===0&&(await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)])).rows[0].r.length===0,JSON.stringify([ack1,ack2]));

 // ===== C. Jetons
 const bad=[['aléatoire',tok(28),tok(32)],['tronqué',FA.c.slice(0,27),FA.p.slice(0,31)],['surdimensionné',FA.c+'A',FA.p+'A'],['caractère interdit',FA.c.slice(0,27)+'0',FA.p.slice(0,31)+'O'],['parent utilisé comme enfant',FA.p.slice(0,28),FA.c+'ABCD']];
 for(const [lab,c,p] of bad){const push=await anonRefused('select api.mq_push($1,$2::jsonb)',[c,JSON.stringify(snapA)]);const get=(await asAnon('select api.mq_get($1) r',[p])).rows[0].r;const act=await anonRefused('select api.mq_act($1,$2,$3::jsonb)',[p,'bonus','{}']);
  T(`Jeton ${lab} : push refusé, lecture vide (null), action refusée`,push&&get===null&&act,JSON.stringify({push:!!push,get,act:!!act}));}
 const crossLen=(await asAnon('select api.mq_get($1) r',[FA.c+'ABCD'])).rows[0].r;
 T('Le jeton enfant (complété à 32) ne lit pas les données parent',crossLen===null,'');
 const regDup=await anonRefused('select api.mq_register($1,$2)',[FA.c,tok(32)]);
 T('Réenregistrer un jeton enfant existant : refus générique (pas de prise de contrôle)',!!regDup,'');
 const msgs=new Set();for(const c of [tok(28),'x',FA.c.slice(0,27)]){try{await asAnon('select api.mq_push($1,$2::jsonb)',[c,JSON.stringify(snapA)]);}catch(e){msgs.add(e.message);}}
 T('Anti-énumération : un seul message d’erreur, quel que soit le motif',msgs.size===1&&[...msgs][0]==='finot: request refused',[...msgs].join(' | '));
 const allRet=JSON.stringify([getA,getB,pushA.rows]);
 T('Aucun secret ni empreinte renvoyé par l’API',![FA.c,FA.p,FB.c,FB.p].some(s=>allRet.includes(s))&&!/\\\\x[0-9a-f]{64}|hash/i.test(allRet),'');

 // ===== D. Contrat du snapshot (serveur)
 const old={...RICH,lastSeen:1};delete old.pin;delete old.sync; // ancien snapshot complet du client
 T('Ancien snapshot complet (avant minimisation) : refusé',await anonRefused('select api.mq_push($1,$2::jsonb)',[FA.c,JSON.stringify(old)]),'');
 for(const [lab,mut] of [['date de naissance',s=>s.birthdate='2016-04-12'],['code PIN',s=>s.pin='1234'],['codes de synchro',s=>s.sync={}],['clé inconnue',s=>s.secretFutureField=1],['réponse libre imbriquée',s=>s.interrogations={history:[{answers:[{your:'x'}]}]}],
  ['messages à l’enfant (merit.notes)',s=>s.merit={...s.merit,notes:['x']}],['transcription vocale',s=>s.path={transcript:'bonjour'}],['diagnostic',s=>s.chap={x:{diagnostic:{}}}],['schéma inconnu',s=>s.syncSchema=2],['prénom trop long',s=>s.name='x'.repeat(41)],
  ['journal surdimensionné',s=>s.answerLog=Array.from({length:2501},()=>({t:1,cid:'a',ok:true}))],['objet de 600 Ko',s=>s.path={blob:'x'.repeat(600000)}],['non-objet',s=>Object.keys(s).forEach(k=>delete s[k])]]){
  const s=JSON.parse(JSON.stringify(snapA));mut(s);const body=lab==='non-objet'?'[]':JSON.stringify(s);
  T(`Snapshot refusé : ${lab}`,await anonRefused('select api.mq_push($1,$2::jsonb)',[FA.c,body]),'');}
 T('Snapshot valide toujours accepté après les refus',(await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)])).rows.length===1,'');

 // ===== E. Actions parent
 T('Action de type inconnu : refusée',await anonRefused('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'reset_all','{}']),'');
 T('Action de 9 Ko : refusée',await anonRefused('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'bonus',JSON.stringify({why:'x'.repeat(9000)})]),'');
 for(let i=0;i<50;i++)await asAnon('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'bonus','{"n":1}']);
 T('Au plus 50 actions en attente par famille (la 51e est refusée)',await anonRefused('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'bonus','{"n":1}']),'');
 await db.query(`update private.parent_actions set expires_at=now()-interval '1 second' where family_id=(select id from private.families where parent_hash=private.token_hash('parent',$1))`,[FA.p]);
 T('Action expirée : jamais livrée',(await asAnon('select api.mq_push($1,$2::jsonb) r',[FA.c,JSON.stringify(snapA)])).rows[0].r.length===0,'');

 // ===== H. Limite de débit
 const FC=fam();await asAnon('select api.mq_register($1,$2)',[FC.c,FC.p]);let okN=0;for(let i=0;i<30;i++){await asAnon('select api.mq_push($1,$2::jsonb)',[FC.c,JSON.stringify(snapA)]);okN++;}
 T('Limite de débit : 30 envois par minute, le 31e est refusé',okN===30&&await anonRefused('select api.mq_push($1,$2::jsonb)',[FC.c,JSON.stringify(snapA)]),String(okN));

 // ===== G. Rotation du lien parent
 const newP=tok(32);await asAnon('select api.mq_rotate_parent($1,$2)',[FB.p,newP]);
 T('Rotation : l’ancien lien parent ne lit plus rien, le nouveau lit B',(await asAnon('select api.mq_get($1) r',[FB.p])).rows[0].r===null&&(await asAnon('select api.mq_get($1) r',[newP])).rows[0].r.data.name==='Bob','');
 FB.p=newP;

 // ===== F. Suppression
 T('Suppression sans confirmation : refusée',await anonRefused('select api.mq_delete($1,$2)',[FA.p,'oui']),'');
 const del=(await asAnon('select api.mq_delete($1,$2) r',[FA.p,'SUPPRIMER'])).rows[0].r;
 const left=(await db.query(`select (select count(*) from private.snapshots)::int s,(select count(*) from private.parent_actions)::int a,(select count(*) from private.families)::int f`)).rows[0];
 T('Suppression : famille, snapshot et actions de A effacés',del.ok===true&&(await asAnon('select api.mq_get($1) r',[FA.p])).rows[0].r===null,JSON.stringify(left));
 T('Après suppression : l’ancien jeton enfant ne peut plus pousser, l’ancien lien parent ne peut plus agir',await anonRefused('select api.mq_push($1,$2::jsonb)',[FA.c,JSON.stringify(snapA)])&&await anonRefused('select api.mq_act($1,$2,$3::jsonb)',[FA.p,'bonus','{}']),'');
 T('Suppression de A sans effet sur B',(await asAnon('select api.mq_get($1) r',[FB.p])).rows[0].r.data.name==='Bob','');
 const del2=(await asAnon('select api.mq_delete($1,$2) r',[FA.p,'SUPPRIMER'])).rows[0].r;
 T('Seconde suppression : réponse identique, sans information',del2.ok===true,'');

 // ===== J. Rétention
 const FD=fam();await asAnon('select api.mq_register($1,$2)',[FD.c,FD.p]);await asAnon('select api.mq_push($1,$2::jsonb)',[FD.c,JSON.stringify(snapA)]);
 await db.query(`update private.families set last_push_at=now()-interval '200 days', created_at=now()-interval '300 days' where child_hash=private.token_hash('child',$1)`,[FD.c]);
 const pg=(await db.query('select private.purge_expired() r')).rows[0].r;
 T('Rétention : famille inactive depuis plus de 180 jours purgée, familles actives conservées',pg.families===1&&(await asAnon('select api.mq_get($1) r',[FD.p])).rows[0].r===null&&(await asAnon('select api.mq_get($1) r',[FB.p])).rows[0].r!==null,JSON.stringify(pg));

 await db.close();
 let ok=0;for(const r of R){console.log((r.ok?'✅ PASS  ':'❌ FAIL  ')+r.name+(r.detail?'  — '+r.detail:''));if(r.ok)ok++;}
 console.log(`\n${ok}/${R.length} tests réussis`);console.log(`BILAN PASS=${ok} FAIL=${R.length-ok}`);if(ok!==R.length)process.exitCode=1;}
main().catch(e=>{console.error(e&&e.stack||e);console.log('BILAN PASS=0 FAIL=1');process.exitCode=1;});
