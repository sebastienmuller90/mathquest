const fs=require('fs'),path=require('path'),os=require('os');
const {walkRepoFiles}=require('./repo-walk');

const root=fs.mkdtempSync(path.join(os.tmpdir(),'finot-repo-walk-'));
const put=rel=>{const p=path.join(root,rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,'x');};
try{
  put('keep/app.png');
  put('nested/artifacts/legit.png');
  put('artifacts/generated.png');
  put('_wt-release/build/generated.png');
  put('_wt-other/generated.js');
  put('node_modules/pkg/generated.png');
  put('.git/objects/generated');
  const files=walkRepoFiles(root).sort();
  const expected=['keep/app.png','nested/artifacts/legit.png'];
  if(JSON.stringify(files)!==JSON.stringify(expected)){
    console.error('FAIL repo walker', {files,expected});
    process.exit(1);
  }
  console.log('PASS repo walker : dossiers générés racine exclus, contenu applicatif conservé');
}finally{fs.rmSync(root,{recursive:true,force:true});}
