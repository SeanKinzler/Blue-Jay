var webpack = require('webpack');

module.exports = {
  entry: './client/testFile.js',
  output: {
    path: './bundled/',
    filename: 'bundle.js'
  },

  target: 'node',
  module: {
    loaders: [{
      exclude: '/node_modules | /server',
      loader: 'babel-loader'
    }]
  }
};

