import FS from 'then-fs';
import fs from 'fs';
import path from 'path';
import 'babel-polyfill';

const doesExists = (filePath) => {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.R_OK, (err) => {
      try {
        if (err) {
          return resolve(false);
        }
      } catch (e) {
        console.log(e);
      }
      return resolve(true);
    });
  });
}

const readFile = async function (pathObj) {
  let filePath = path.join(pathObj.base, pathObj.name);
  let fileExists = await doesExists(filePath)
  if (fileExists) {
    let buf = await FS.readFile(filePath);
    return { success: true, content: buf.toString() };
  }
  return { success: false, error: 'File does not exists', code: 'ENOENT' };
}

const createFile = async function (pathObj, content = "") {
  let filePath = path.join(pathObj.base, pathObj.name);
  let fileExists = await doesExists(filePath);
  if (fileExists) {
    return { success: false, error: "File exists", code: 'EEXIST' };
  }
  await FS.writeFile(filePath, content);
  return { success: true };
}

const deleteFile = async (pathObj) => {
  let filePath = path.join(pathObj.base, pathObj.name);
  let fileExists = await doesExists(filePath);
  if (fileExists) {
    await FS.unlink(filePath);
    return { success: true };
  }
  return { success: false, error: 'File does not exists', code: 'ENOENT' };
}

const writeFile = async (pathObj, content) => {
  let filePath = path.join(pathObj.base, pathObj.name);
  let fileExists = await doesExists(filePath);
  if (!fileExists) {
    await createFile(pathObj);
    let error = await FS.writeFile(filePath, content);
    if (!error) return { success: true };
    return { success: false, error: error };
  }
  let error = await FS.writeFile(filePath, content);
  if (!error) return { success: true };
  return { success: false, error: error };
}

export { readFile, deleteFile, createFile, writeFile }

if (require.main === module) {
  console.error('Start this script using index.js from the project root.');
  process.exit();
}
