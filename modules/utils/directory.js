import fs from 'fs';
import path from 'path';
import async from 'async';
import * as File from './file';
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

const transferFile = function (pathObj, isCut) {
  return new Promise(resolve => {
    console.log("Transferring files");
    let readStream = fs.createReadStream(pathObj.targetFile);
    let fileName = File.getFileName(pathObj.targetFile);
    let newFileName, firstName = fileName.split('.')[0], extn = fileName.substr(fileName.indexOf('.'));
    let targetFilePath = path.join(pathObj.targetDirectory, fileName);
    let writeStream = fs.createWriteStream(targetFilePath);
    readStream.on('error', (err) => {
      console.log("Error readstream");
      console.log(err);
    });
    writeStream.on('error', (err) => {
      console.log("Error writestream");
      console.log(err);
    });
    readStream.pipe(writeStream);
    writeStream.on('close', () => {
      // console.log("Copying successful");
      if (isCut) {
        return File.deleteFile(pathObj.targetFile)
        .then(resolve);
      }
      resolve({success: true});
    });
  });
}

export { readDir, transferFile }

if (require.main === module) {
  console.error('Start this script using index.js from the project root.');
  process.exit();
}
