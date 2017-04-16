import {Directory, File, logTable} from './compiled';


const testReadDirPathObj = {
  base: '/home/jibin/Documents/NodeJS/FileManager'
};

const testReadFilePathObj = {
  base: '/home/jibin/Documents/NodeJS/FileManager',
  name: 'package.json'
};


global.logTable = logTable;

if(require.main == module){
  Directory.readDir(testReadDirPathObj)
  .then(data => logTable(data, {excluded: ['path']}));

  File.readFile(testReadFilePathObj)
  .then(data => console.log(data));
}
