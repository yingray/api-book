'use strict'
const path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    libraryTarget: 'var',
    library: 'ApiBook',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './example')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  }
}
