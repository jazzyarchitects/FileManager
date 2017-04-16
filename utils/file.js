import * as fs from 'fs';
import * as path from 'path';


const readFile = (pathObj) => {
  return new Promise((resolve)=> {
    fs.readFile(path.join(pathObj.base, pathObj.name), (err, content) => {
      resolve(content.toString());
    });
  });
}

export {readFile}

if(require.main === module){
  console.error('Start this script using index.js from the project root.');
  process.exit();
}