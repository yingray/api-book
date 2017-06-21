'use strict'
const path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    libraryTarget: 'var',
    library: 'ApiBook',
    filename: 'apiBook-0.2.0.js',
    path: path.resolve(__dirname, './example/1-sample_web/js')
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
