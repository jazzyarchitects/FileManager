// import drawTable from './table';

const mapping = {
  s: "string",
  n: "number",
  x: 'Hexadecimal',
  b: "boolean",
  j: "json"
};

const encryptString = function (inputString) {
  let SEGMENT_LENGTH = 3;

  let typeList = [];
  for (let i = 0; i < inputString.length; i++) {
    if (isDigit(inputString[i])) {
      typeList.push('n');
    } else {
      typeList.push('s');
    }
  }
  // typeList = typeList.join('');
  let finalString = '';
  let currentStreak = typeList[0];
  let startIndex = 0;
  let endIndex = 0;
  let r = [];
  for (let j = 1; j <= typeList.length; j++) {
    let subString = inputString.substring(startIndex, endIndex + 1);
    // console.log(`Checking index: ${j}, string is : ${subString}: (${startIndex},${endIndex})`);
    if (currentStreak !== typeList[j] || j === typeList.length || endIndex - startIndex >= SEGMENT_LENGTH - 1) {
      if (j === typeList.length) {
        endIndex++;
      }
      let bufString = Buffer.from(subString).toString('base64');
      r.push({currentStreak, startIndex, endIndex, finalString, len: inputString.length, substr: subString, str: bufString});
      currentStreak = typeList[j];
      finalString += '!' + typeList[j - 1] + bufString;
      startIndex = j;
      endIndex = j;
    } else {
      endIndex++;
    }
    SEGMENT_LENGTH = Math.floor(Math.random() * 5) + 2;
  }

  return Buffer.from(finalString).toString('base64');

  // drawTable(r);

  // console.log(finalString);
  // decryptString(finalString);
}

const decryptString = function (encryptedString) {
  encryptedString = Buffer.from(encryptedString, 'base64').toString();
  // console.log(encryptedString);
  let splits = encryptedString.split('!');
  let finalString = "";
  for (let i = 0; i < splits.length; i++) {
    let str = splits[i];
    finalString += Buffer.from(str.substr(1), 'base64').toString();
  }
  // console.log("Decrypted String");
  // console.log(finalString);
  return finalString;
}

function isDigit (character) {
  switch (character) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return true;
    default:
      return false;
  }
}

const Encrypter = {encryptString, decryptString};

export default Encrypter;

// if (require.main === module) {
//   // let string = '!sJibin%20Mathews!n852';
//   let string = "helloworld85MyN55sejhf34";
//   console.log("Original String: " + string);
//   encryptString(string);
// }
