/* Finot Académie — build reproductible de l'Android App Bundle (AAB) pour Google Play.
   AUCUNE publication : ce script produit un fichier local et s'arrête. L'envoi dans Play Console reste une action humaine.

   Usage (voir tools/build-google-play-release.cmd, qui prépare JAVA_HOME / ANDROID_HOME) :
     node tools/google-play-release.mjs                   AAB NON signé, pour vérification uniquement (non téléversable)
     node tools/google-play-release.mjs --sign            AAB signé avec la clé d'import (variables FINOT_UPLOAD_* exigées)
     node tools/google-play-release.mjs --record <piste>  note le versionCode du dernier AAB dans le registre, APRÈS téléversement
   Options : --base <sha>  (défaut : commit de base officiel)   --allow-dirty (développement seulement)   --skip-tests

   Le script s'arrête immédiatement (code 1) si : environnement incomplet, base Git incorrecte, arbre modifié, test rouge,
   versionCode déjà utilisé, secret de signature manquant ou placé dans le dépôt, build ou lint en échec, permission non prévue,
   composant exporté inattendu, identifiant « .dev », AAB débogable ou signature invalide. */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, relative, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OFFICIAL_BASE = '4f9444dcd4648818f28e7f4398f406814d6592b4';
const PROD_ID = 'fr.finot.academie';
const LEDGER = join(ROOT, 'docs', 'google-play', 'version-ledger.json');
const OUT_DIR = join(ROOT, 'artifacts', 'google-play');
const SUMMARY = join(OUT_DIR, 'release-summary.json');
const args = process.argv.slice(2);
const has = f => args.includes(f);
const val = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const isWin = process.platform === 'win32';

// Tests exécutés avant le build : configuration Android, paquet web, exécution native, vie privée, liens, permissions.
const TESTS = ['android-project', 'mobile-package', 'mobile-runtime', 'android-backup', 'speech-capability', 'external-links',
  'remote-sync-flag', 'analytics-guard', 'entitlements-guard', 'sync-privacy', 'google-play-release'];
// Permissions autorisées : INTERNET (suivi parent facultatif, désactivé) et la permission de signature propre à l'application
// que AndroidX ajoute pour ses récepteurs dynamiques non exportés. Toute autre permission est refusée.
const ALLOWED_PERMS = new Set(['android.permission.INTERNET', `${PROD_ID}.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION`]);
const ALLOWED_EXPORTED = new Set([`${PROD_ID}.MainActivity`, 'androidx.profileinstaller.ProfileInstallReceiver']);

const step = t => console.log(`\n=== ${t}`);
const ok = t => console.log(`  OK  ${t}`);
function fail(t) { console.error(`\n  ÉCHEC  ${t}\n  Release interrompue : rien n'a été publié.`); process.exit(1); }
function run(cmd, a, o = {}) {
  const r = spawnSync(cmd, a, { cwd: ROOT, encoding: 'utf8', shell: isWin && /\.(bat|cmd)$/i.test(cmd), maxBuffer: 256 << 20, ...o });
  return r;
}
const git = (...a) => run('git', ['-c', `safe.directory=${ROOT.replace(/\\/g, '/')}`, ...a]);
const sha256 = f => new Promise((res, rej) => { const h = createHash('sha256'); createReadStream(f).on('data', d => h.update(d)).on('end', () => res(h.digest('hex'))).on('error', rej); });
const readLedger = () => existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : { uploaded: [] };

function versionFromSw() {
  const sw = readFileSync(join(ROOT, 'sw.js'), 'utf8');
  const m = (sw.match(/const VERSION='([^']+)'/) || [])[1];
  if (!m) fail('VERSION introuvable dans sw.js');
  const p = m.match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!p) fail('VERSION de sw.js illisible : ' + m);
  const [maj, min, pat] = p.slice(1).map(Number);
  if (min > 999 || pat > 999) fail('versionCode : mineur et correctif doivent rester < 1000');
  // versionName = version COMMERCIALE (android/store-version.json, source unique) ; versionCode = compteur interne dérivé de VERSION (même règle que scripts/package-www.mjs)
  let versionName;
  try { versionName = JSON.parse(readFileSync(join(ROOT, 'android', 'store-version.json'), 'utf8')).versionName; } catch (e) { fail('android/store-version.json illisible : ' + e.message); }
  if (typeof versionName !== 'string' || !/^\d+\.\d+\.\d+$/.test(versionName)) fail('android/store-version.json : versionName attendu au format X.Y.Z (reçu ' + JSON.stringify(versionName) + ')');
  return { swVersion: m, versionName, versionCode: maj * 1e6 + min * 1e3 + pat };
}

// ---------- Mode --record : à lancer APRÈS avoir téléversé l'AAB dans Play Console ----------
if (has('--record')) {
  const track = val('--record');
  if (!track || track.startsWith('--')) fail('--record <piste> : piste attendue (interne, fermée, ouverte, production)');
  if (!existsSync(SUMMARY)) fail('aucun résumé de build : lancer d\'abord un build signé');
  const s = JSON.parse(readFileSync(SUMMARY, 'utf8'));
  if (!s.signed) fail('le dernier build n\'est pas signé : seul un AAB signé peut avoir été téléversé');
  const l = readLedger();
  if (l.uploaded.some(u => u.versionCode === s.versionCode)) fail(`versionCode ${s.versionCode} déjà enregistré`);
  l.uploaded.push({ versionCode: s.versionCode, versionName: s.versionName, track, sha256: s.sha256, git: s.head, date: new Date().toISOString().slice(0, 10) });
  writeFileSync(LEDGER, JSON.stringify(l, null, 2) + '\n');
  ok(`registre mis à jour : versionCode ${s.versionCode} (${track}). Valider ce fichier dans Git.`);
  process.exit(0);
}

const sign = has('--sign');

// ---------- 1. Environnement ----------
step('1. Environnement');
const java = process.env.JAVA_HOME ? join(process.env.JAVA_HOME, 'bin', isWin ? 'java.exe' : 'java') : 'java';
const jv = run(java, ['-version']);
const jtxt = (jv.stderr || '') + (jv.stdout || '');
if (jv.error || !/version "21\./.test(jtxt)) fail('JDK 21 requis (Gradle échoue avec un JDK plus récent). Défini JAVA_HOME ? Sortie : ' + jtxt.split('\n')[0]);
ok('JDK 21');
if (!process.env.ANDROID_HOME && !process.env.ANDROID_SDK_ROOT) fail('ANDROID_HOME (SDK Android) non défini');
ok('SDK Android : ' + (process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT));
if (!existsSync(join(ROOT, 'node_modules', '@capacitor', 'android'))) fail('node_modules absent : lancer « npm ci » à la racine du dépôt');
ok('dépendances npm présentes');
const explicitId = process.env.FINOT_APP_ID;
if (explicitId && explicitId !== PROD_ID) fail(`FINOT_APP_ID=${explicitId} : une release Google Play doit utiliser ${PROD_ID} (retirer la variable)`);
ok('identifiant de production : ' + PROD_ID);

// ---------- 2. Base Git ----------
step('2. Base Git');
const base = val('--base') || OFFICIAL_BASE;
const head = (git('rev-parse', 'HEAD').stdout || '').trim();
if (!/^[0-9a-f]{40}$/.test(head)) fail('HEAD Git illisible');
if (git('cat-file', '-e', base + '^{commit}').status !== 0) fail(`commit de base ${base} inconnu : lancer « git fetch »`);
if (git('merge-base', '--is-ancestor', base, 'HEAD').status !== 0) fail(`HEAD ${head.slice(0, 7)} ne contient pas la base officielle ${base.slice(0, 7)}`);
ok(`HEAD ${head.slice(0, 7)} descend de la base ${base.slice(0, 7)}`);
// Deux fichiers sont régénérés par « cap sync » (fins de ligne seulement) : seule une vraie différence de contenu compte.
const GENERATED = ['android/app/capacitor.build.gradle', 'android/capacitor.settings.gradle'];
const dirty = [(git('status', '--porcelain', '--untracked-files=no', '--', '.', ...GENERATED.map(g => `:(exclude)${g}`)).stdout || '').trim(),
  ...GENERATED.filter(g => git('diff', '--ignore-cr-at-eol', '--quiet', '--', g).status !== 0).map(g => ' M ' + g + ' (contenu)')].filter(Boolean).join('\n');
if (dirty && !has('--allow-dirty')) fail('arbre de travail modifié (traçabilité impossible) :\n' + dirty);
ok(dirty ? 'arbre modifié toléré (--allow-dirty : NE PAS téléverser cet AAB)' : 'arbre de travail propre');

// ---------- 3. Version ----------
step('3. Version');
const ver = versionFromSw();
const ledger = readLedger();
const cmp = (a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]; return 0; };
const lastName = ledger.uploaded.map(u => u.versionName).filter(Boolean).sort(cmp).pop();
if (ledger.uploaded.some(u => u.versionName === ver.versionName)) fail(`versionName ${ver.versionName} déjà téléversé : modifier android/store-version.json`);
if (lastName && cmp(ver.versionName, lastName) <= 0) fail(`versionName ${ver.versionName} <= dernier téléversé (${lastName}) : la version commerciale doit augmenter`);
const max = Math.max(0, ...ledger.uploaded.map(u => u.versionCode));
if (ledger.uploaded.some(u => u.versionCode === ver.versionCode)) fail(`versionCode ${ver.versionCode} déjà téléversé : incrémenter VERSION dans sw.js`);
if (ver.versionCode <= max) fail(`versionCode ${ver.versionCode} <= dernier téléversé (${max}) : un versionCode ne doit jamais redescendre`);
ok(`versionName ${ver.versionName}, versionCode ${ver.versionCode} (dernier téléversé : ${max || 'aucun'})`);

// ---------- 4. Signature ----------
step('4. Signature');
const env = { ...process.env };
const SIGN_VARS = ['FINOT_UPLOAD_KEYSTORE', 'FINOT_UPLOAD_KEYSTORE_PASSWORD', 'FINOT_UPLOAD_KEY_ALIAS', 'FINOT_UPLOAD_KEY_PASSWORD'];
if (sign) {
  const missing = SIGN_VARS.filter(k => !env[k]);
  if (missing.length) fail('signature demandée mais variables manquantes : ' + missing.join(', ') + ' (voir docs/google-play/signing.md)');
  const ks = resolve(env.FINOT_UPLOAD_KEYSTORE);
  if (!existsSync(ks)) fail('keystore introuvable : ' + ks);
  const rel = relative(ROOT, ks);
  if (!rel.startsWith('..') && !isAbsolute(rel)) fail('le keystore est DANS le dépôt (' + ks + ') : le placer hors du dépôt');
  ok('clé d\'import trouvée hors du dépôt (mots de passe fournis par l\'environnement, non affichés)');
} else {
  SIGN_VARS.forEach(k => delete env[k]);
  ok('pas de signature (AAB de vérification, non téléversable)');
}

// ---------- 5. Tests ----------
if (!has('--skip-tests')) {
  step('5. Tests');
  for (const t of TESTS) {
    const f = join(ROOT, 'tests', `${t}.test.js`);
    if (!existsSync(f)) fail('test manquant : tests/' + t + '.test.js');
    const r = run(process.execPath, [f], { env });
    if (r.status !== 0) fail(`test rouge : tests/${t}.test.js\n${(r.stdout || '').split('\n').filter(l => /FAIL|❌/.test(l)).slice(0, 6).join('\n')}`);
    ok(t + ' : ' + ((r.stdout || '').match(/BILAN[^\n]*/) || ['ok'])[0]);
  }
} else console.log('\n=== 5. Tests : IGNORÉS (--skip-tests) — non acceptable avant un téléversement');

// ---------- 6. Web + Capacitor + Gradle ----------
step('6. Paquet web, Capacitor, Gradle (clean bundleRelease lintRelease)');
const npm = isWin ? 'npm.cmd' : 'npm';
let r = run(npm, ['run', 'android:sync'], { env, stdio: 'inherit' });
if (r.status !== 0) fail('android:sync en échec');
const gradle = join(ROOT, 'android', isWin ? 'gradlew.bat' : 'gradlew');
r = run(gradle, ['-p', 'android', '--no-daemon', 'clean', 'bundleRelease', 'lintRelease'], { env, stdio: 'inherit' });
if (r.status !== 0) fail('Gradle en échec (voir la sortie ci-dessus)');
ok('bundleRelease + lintRelease terminés');

// ---------- 7. Contrôles du manifeste fusionné ----------
step('7. Manifeste fusionné release');
const manPath = join(ROOT, 'android', 'app', 'build', 'intermediates', 'merged_manifests', 'release', 'processReleaseManifest', 'AndroidManifest.xml');
if (!existsSync(manPath)) fail('manifeste fusionné introuvable : ' + manPath);
const man = readFileSync(manPath, 'utf8');
const pkg = (man.match(/<manifest[^>]*\spackage="([^"]+)"/) || [])[1];
if (pkg !== PROD_ID) fail(`package du manifeste = ${pkg}, attendu ${PROD_ID}`);
if (/\.dev$/.test(pkg)) fail('identifiant de développement dans une release');
ok('package ' + pkg);
if (/android:debuggable="true"/.test(man)) fail('application débogable');
ok('non débogable');
if (!/android:allowBackup="false"/.test(man)) fail('allowBackup doit être false');
if (/android:usesCleartextTraffic="true"/.test(man)) fail('trafic en clair autorisé');
ok('sauvegarde Android désactivée, trafic en clair interdit');
const target = +((man.match(/android:targetSdkVersion="(\d+)"/) || [])[1] || 0);
if (target < 36) fail('targetSdkVersion ' + target + ' < 36');
ok('targetSdkVersion ' + target);
const mv = (man.match(/android:versionCode="(\d+)"/) || [])[1];
if (+mv !== ver.versionCode) fail(`versionCode du manifeste (${mv}) différent de sw.js (${ver.versionCode})`);
const mn = (man.match(/android:versionName="([^"]+)"/) || [])[1];
if (mn !== ver.versionName) fail(`versionName du manifeste (${mn}) différent de android/store-version.json (${ver.versionName})`);
ok(`versionName ${mn}, versionCode ${mv} dans le manifeste fusionné`);
const perms = [...man.matchAll(/<uses-permission[^>]*android:name="([^"]+)"/g)].map(m => m[1]);
const bad = perms.filter(p => !ALLOWED_PERMS.has(p));
if (bad.length) fail('permission(s) non prévue(s) : ' + bad.join(', '));
ok('permissions : ' + perms.join(', '));
const comps = [...man.matchAll(/<(activity|activity-alias|service|receiver|provider)\b[^>]*>/g)].map(m => m[0]).filter(t => /android:exported="true"/.test(t))
  .map(t => (t.match(/android:name="([^"]+)"/) || [])[1]);
const unexpected = comps.filter(c => !ALLOWED_EXPORTED.has(c));
if (unexpected.length) fail('composant(s) exporté(s) inattendu(s) : ' + unexpected.join(', '));
ok('composants exportés : ' + comps.join(', '));
if (/<data\b[^>]*android:scheme=/.test(man)) fail('lien profond (android:scheme) détecté');
ok('aucun lien profond');

// ---------- 8. Contrôles de l'AAB ----------
step('8. Android App Bundle');
const aab = join(ROOT, 'android', 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab');
if (!existsSync(aab)) fail('AAB introuvable : ' + aab);
const ls = run('tar', ['-tf', aab]);
if (ls.status !== 0) fail('impossible de lister l\'AAB (tar)');
const entries = ls.stdout.split(/\r?\n/).filter(Boolean);
for (const must of ['base/assets/public/index.html', 'base/assets/public/js/app-state.js', 'base/assets/capacitor.config.json', 'base/manifest/AndroidManifest.xml'])
  if (!entries.includes(must)) fail('entrée absente de l\'AAB : ' + must);
ok(`${entries.length} entrées, application web embarquée (hors ligne)`);
const secrets = entries.filter(e => /\.(jks|keystore|p12|pem|env)$|google-services|keystore\.properties/i.test(e));
if (secrets.length) fail('fichier sensible dans l\'AAB : ' + secrets.join(', '));
ok('aucun fichier de clé ni de configuration sensible');
const cc = JSON.parse(run('tar', ['-xOf', aab, 'base/assets/capacitor.config.json']).stdout);
if (cc.appId !== PROD_ID || (cc.server && cc.server.url) || (cc.android && cc.android.webContentsDebuggingEnabled)) fail('capacitor.config.json embarqué incorrect : ' + JSON.stringify(cc));
ok('configuration Capacitor embarquée : id de production, sans URL distante, débogage WebView désactivé');
let signed = false;
const jarsigner = process.env.JAVA_HOME ? join(process.env.JAVA_HOME, 'bin', isWin ? 'jarsigner.exe' : 'jarsigner') : 'jarsigner';
if (sign) {
  const v = run(jarsigner, ['-verify', aab]);
  if (!/jar verified/.test((v.stdout || '') + (v.stderr || ''))) fail('signature de l\'AAB invalide : ' + (v.stdout || v.stderr));
  signed = true; ok('AAB signé et vérifié (jarsigner)');
} else {
  if (entries.some(e => /^META-INF\/.*\.(RSA|DSA|EC|SF)$/.test(e))) fail('AAB signé alors que --sign n\'est pas demandé');
  ok('AAB non signé (attendu sans --sign)');
}

// ---------- 9. Résumé ----------
step('9. Résumé');
mkdirSync(OUT_DIR, { recursive: true });
const final = join(OUT_DIR, `finot-academie-${ver.versionName}-${ver.versionCode}${signed ? '' : '-NON-SIGNE'}.aab`);
copyFileSync(aab, final);
const digest = await sha256(final);
const summary = { head, base, appId: pkg, versionName: ver.versionName, versionCode: ver.versionCode, swVersion: ver.swVersion, targetSdk: target,
  permissions: perms, signed, aab: relative(ROOT, final).replace(/\\/g, '/'), sha256: digest, bytes: readFileSync(final).length, date: new Date().toISOString(), dirty: !!dirty };
writeFileSync(SUMMARY, JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
console.log(signed
  ? '\nAAB signé prêt. Étape HUMAINE suivante : le téléverser dans Play Console, puis lancer --record <piste>.'
  : '\nAAB NON signé : vérification technique uniquement, il ne peut pas être téléversé.');
