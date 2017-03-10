var path = require('path');
var webpack = require('webpack');
var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {
  entry: [
    './src'
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
  },
  resolve: {alias: alias},
};