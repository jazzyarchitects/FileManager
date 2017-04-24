import fs from 'fs';
import FS from 'then-fs';
import path from 'path';
import async from 'async';
import 'babel-polyfill';

const readDir = (pathObj) => {
  if (!pathObj) {
    pathObj = {};
    pathObj.base = '/';
  }

  pathObj.name = pathObj.name || '';

  return new Promise((resolve) => {
    let finalData = [];
    fs.readdir(path.join(pathObj.base, pathObj.name), (err, contents) => {
      async.eachLimit(contents, 5, (content, _cb) => {
        fs.lstat(path.join(pathObj.base, pathObj.name, content), (err, stat) => {
          finalData.push({
            path: path.join(pathObj.base, pathObj.name, content),
            name: content,
            size: stat.size,
            mtime: new Date(stat.mtime).getTime(),
            ctime: new Date(stat.ctime).getTime(),
            isFile: stat.isFile()
          });
          _cb();
        })
      }, () => {
        resolve(finalData);
      });
    });
  });
};

export { readDir }

if (require.main === module) {
  console.error('Start this script using index.js from the project root.');
  process.exit();
}
