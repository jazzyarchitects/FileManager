import Table from 'cli-table';

export default function logTable(array) {
  let keys = [...Object.keys(array[0])];
  let first = array[0];
  let colWidths = [];
  for(let key of keys){
    colWidths.push(first[key].toString().length + 5)
  }

  let table = new Table({head: keys, colWidths: colWidths});

  for(let obj of array){
    let row = [];
    for(let key of keys){
      row.push(obj[key]);
    }
    table.push(row);
  }

  console.log(table.toString());
}