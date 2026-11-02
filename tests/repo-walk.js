const fs=require('fs'),path=require('path');

const ALWAYS_SKIP=new Set(['node_modules','.git']);
const isGeneratedRootDir=(dir,name)=>dir===''&&(name==='artifacts'||/^_wt-/.test(name));

function walkRepoFiles(root,dir='',out=[]){
  for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){
    const rel=dir?dir+'/'+e.name:e.name;
    if(e.isDirectory()){
      if(ALWAYS_SKIP.has(e.name)||isGeneratedRootDir(dir,e.name))continue;
      walkRepoFiles(root,rel,out);
    }else out.push(rel);
  }
  return out;
}

module.exports={walkRepoFiles,isGeneratedRootDir};
