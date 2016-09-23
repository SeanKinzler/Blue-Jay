var webpack = require('webpack');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: './client/bundled/',
    filename: 'bundle.js'
  },

  target: 'node',
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: '/node_modules | /server | /client/bundled ',
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};

