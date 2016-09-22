var webpack = require('webpack');

module.exports = {
  entry: '',
  output: {
    path: './bundled/',
    filename: 'bundle.js'
  },

  target: 'node',
  module: {
    loaders: [{
      exclude: '/node_modules',
      loader: 'babel-loader'
    }]
  }
};

