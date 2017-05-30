import createServer from './compiled/modules/framework/bootstrap'
import http from 'http';
import logTable from './compiled/modules/utils/table';

let args = process.argv.slice(2);

let password = args.filter((content, index) => {
  return content.indexOf("--password=") !== -1;
})[0];

if (password) {
  global.password = password.split('=')[1];
} else {
  console.error("-----------------------------------------------------------------")
  console.error("---------------------No password defined-------------------------");
  console.error("-----------------------------------------------------------------")
}

// console.log(global.password);

global.console.table = logTable;
let isTesting = false;

const start = () => {
  global.isTesting = isTesting;

  const app = createServer({
    // Server config here
  });

  const server = http.createServer(app);

  server.listen(process.env.PORT || 3000, () => {
    !isTesting && console.log("Server listenting on port " + (process.env.PORT || 3000));
  });
};

export { start };

if (require.main === module) {
  start();
} else {
  isTesting = true;
}
