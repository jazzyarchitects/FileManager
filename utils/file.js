import * as FS from 'then-fs';
import * as fs from 'fs';
import * as path from 'path';
import 'babel-polyfill';

const doesExists = (filePath) =>{
  return new Promise((resolve)=>{
    fs.access(filePath, fs.constants.R_OK, (err) => {
      try{
        if(err){
          return resolve(false);
        }
      }catch(e){
        console.log(e);
      }
      return resolve(true);
    });
  });
}

const readFile = async function(pathObj) {
  let filePath = path.join(pathObj.base, pathObj.name);
  let fileExists = await doesExists(filePath)
  if(fileExists){
    let buf = await FS.readFile(filePath);
    return buf.toString();
  }
}

const deleteFile = (pathObj) => {

}

export {readFile}

if(require.main === module){
  console.error('Start this script using index.js from the project root.');
  process.exit();
}