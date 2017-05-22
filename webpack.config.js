const path = require('path');
const fs = require('fs');
 
module.exports = {
  // context: path.join(__dirname, 'react'),
  entry: path.join(__dirname, 'react', 'index.js'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};