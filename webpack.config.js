var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/app'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  },
  externals: ['axios'],
  module: {
    loaders: [{
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: path.join(__dirname, 'src')
    }]
  }
};