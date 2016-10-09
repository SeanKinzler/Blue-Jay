var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/bundled');
var APP_DIR = path.resolve(__dirname, 'client/components');

module.exports = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: './client/components',
      exclude: '/node_modules | /server | /client/bundled ',
      loader: 'babel'
    }]
  }
};

