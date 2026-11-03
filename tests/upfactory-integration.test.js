const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const PUBLISHER_SHA = '193597252494f529b454e0a0bb03c31c18fad1ec';

const config = JSON.parse(read('upfactory.app.json'));
assert.strictEqual(config.schemaVersion, 1);
assert.strictEqual(config.id, 'fr.finot.academie');
assert.strictEqual(config.name, 'Finot Académie');
assert.ok(config.node && config.node.minMajor >= 22);

const packageStep = config.stages.package.find(step => step.name === 'Build signed AAB');
assert.ok(packageStep, 'étape Build signed AAB absente');
assert.match(packageStep.command, /tools\/google-play-release\.mjs --sign/);
assert.match(packageStep.commandWindows, /FINOT_UPLOAD_KEYSTORE/);

const publishStep = config.stages.publish.find(step => step.name === 'Google Play upload');
assert.ok(publishStep, 'étape Google Play upload absente');
assert.strictEqual(publishStep.command, 'bundle exec fastlane android deploy');
assert.strictEqual(config.store.android.packageName, 'fr.finot.academie');
assert.strictEqual(config.store.android.track, 'internal');
assert.strictEqual(config.store.android.releaseStatus, 'draft');
assert.match(config.store.android.artifact, /artifacts\/google-play\/\*\.aab/);

for (const rel of [
  'Gemfile.upfactory',
  'fastlane/Fastfile',
  'UPFACTORY_RELEASE.cmd',
  '.github/workflows/upfactory-release.yml'
]) {
  assert.ok(fs.existsSync(path.join(root, rel)), `${rel} absent`);
}

const workflow = read('.github/workflows/upfactory-release.yml');
assert.match(workflow, /node-version:\s*['"]24['"]/);
assert.match(workflow, /java-version:\s*['"]21['"]/);
assert.match(workflow, /platforms;android-36/);
assert.match(workflow, /build-tools;36\.0\.0/);
assert.match(workflow, /repository:\s*sebastienmuller90\/upfactory-publisher/);
assert.ok(workflow.includes(`ref: ${PUBLISHER_SHA}`), 'UpFactory Publisher doit être épinglé sur le commit validé');
assert.match(workflow, /default:\s*false/);
assert.match(workflow, /if \[ "\$\{\{ inputs\.publish \}\}" = "true" \]; then CONFIRM="--confirm-publish"; fi/);

const ignore = read('.gitignore');
for (const rule of [
  '!/upfactory.app.json',
  '!/Gemfile.upfactory',
  '!/fastlane/',
  '!/fastlane/Fastfile',
  '!/UPFACTORY_RELEASE.cmd',
  '!/.github/workflows/upfactory-release.yml',
  '!/tests/upfactory-integration.test.js'
]) {
  assert.ok(ignore.includes(rule), `règle .gitignore absente: ${rule}`);
}

console.log('UpFactory Finot integration: PASS');
