import * as fs from 'fs';
import * as path from 'path';
import * as async from 'async';
import logTable from './table';

const readDir = (pathObj) => {
  if(!pathObj){
    pathObj = {};
    pathObj.base = '/';
  }

  pathObj.name = pathObj.name ||  '';

  return new Promise((resolve)=>{

    let finalData = [];

    fs.readdir(path.join(pathObj.base, pathObj.name), (err, contents) => {
      async.eachLimit(contents, 5, (content, _cb) => {
        fs.lstat(path.join(pathObj.base, pathObj.name, content), (err, stat)=>{
          finalData.push({
            path: path.join(pathObj.base, pathObj.name, content),
            size: stat.size,
            mtime: stat.mtime,
            ctime: stat.ctime
          });
          _cb();
        })
      }, ()=>{
        logTable(finalData);
      });
    });
  });
};

if(require.main === module){
  readDir();
}