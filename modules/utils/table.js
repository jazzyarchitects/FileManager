import Table from 'cli-table';

export default function logTable (array, { maxColWidth = 20, excluded = [] } = {}) {
  if (!array[0]) {
    return;
  }

  let keys = [...Object.keys(array[0])];

  if (typeof excluded !== 'object') {
    let a = excluded;
    excluded = [a];
  }
  for (let excludedKey of excluded) {
    let i = keys.indexOf(excludedKey);
    if (i !== -1) {
      keys.splice(i, 1);
    }
  }

  let first = array[0];
  let colWidths = [];

  for (let key of keys) {
    colWidths.push(maxColWidth >= (first[key].toString().length + 5) ? (first[key].toString().length + 5) : maxColWidth);
  }
  let table = new Table({ head: keys, colWidths: colWidths });

  for (let obj of array) {
    let row = [];
    for (let key of keys) {
      row.push(obj[key]);
    }
    table.push(row);
  }

  console.log(table.toString());
}
