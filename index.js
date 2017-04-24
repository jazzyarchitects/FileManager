'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _bootstrap = require('./compiled/modules/framework/bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _table = require('./compiled/modules/utils/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.console.table = _table2.default;
var isTesting = false;

var start = function start() {
  global.isTesting = isTesting;

  var app = (0, _bootstrap2.default)({
    // Server config here
  });

  var server = _http2.default.createServer(app);

  server.listen(process.env.PORT || 3000, function () {
    !isTesting && console.log("Server listenting on port " + (process.env.PORT || 3000));
  });
};

exports.start = start;


if (require.main === module) {
  start();
} else {
  isTesting = true;
}
