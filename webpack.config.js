const path = require('path');

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js|\.jsx$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: 'source-map',

  mode: 'development'
};
