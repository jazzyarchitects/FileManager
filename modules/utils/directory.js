import fs from 'fs';
import path from 'path';
import async from 'async';
import 'babel-polyfill';

const readDir = (pathObj) => {
  if (!pathObj) {
    pathObj = {};
    pathObj.base = '/';
  }

  pathObj.name = pathObj.name || '';

  return new Promise((resolve, reject) => {
    if (!reject) {
      reject = console.err;
    }
    let finalData = [];
    fs.readdir(path.join(pathObj.base, pathObj.name), (err, contents) => {
      if (err) {
        return reject(err);
      }
      async.eachLimit(contents, 5, (content, _cb) => {
        fs.lstat(path.join(pathObj.base, pathObj.name, content), (err, stat) => {
          if (err) {
            return reject(err);
          }
          finalData.push({
            path: path.join(pathObj.base, pathObj.name, content),
            name: content,
            size: stat.size,
            atime: new Date(stat.atime).getTime(),
            mtime: new Date(stat.mtime).getTime(),
            ctime: new Date(stat.ctime).getTime(),
            btime: new Date(stat.birthtime).getTime(),
            isFile: stat.isFile()
          });
          _cb();
        })
      }, () => {
        resolve({success: true, content: finalData});
      });
    });
  });
};

export { readDir }

if (require.main === module) {
  console.error('Start this script using index.js from the project root.');
  process.exit();
}
