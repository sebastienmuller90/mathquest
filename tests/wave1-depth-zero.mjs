import fs from 'node:fs';
import path from 'node:path';

await import('./final-product-inventory.mjs');
const report=JSON.parse(fs.readFileSync(path.join(process.cwd(),'tests/final-product-inventory-report.json'),'utf8'));
const s=report.summary||{};
const failed=[];
if(s.chapters!==1129)failed.push(`chapitres=${s.chapters}, attendu=1129`);
if(s.thinCourses!==0)failed.push(`cours sous seuil=${s.thinCourses}, attendu=0`);
if(s.generatorErrors!==0)failed.push(`erreurs générateur=${s.generatorErrors}, attendu=0`);
console.log(JSON.stringify({chapters:s.chapters,thinCourses:s.thinCourses,depthChapters:s.depthChapters,generatorErrors:s.generatorErrors,readingLinkedChapters:s.readingLinkedChapters,documentChapters:s.documentChapters,audioHintChapters:s.audioHintChapters,failed},null,2));
if(failed.length){console.error('\n❌ Wave 1 : objectif transversal non atteint : '+failed.join(' ; '));process.exitCode=1;}
else console.log('\n✅ Wave 1 : 1 129 chapitres, 0 cours sous seuil, 0 erreur de générateur.');
