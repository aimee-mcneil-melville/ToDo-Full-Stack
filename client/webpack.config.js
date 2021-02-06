const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  mode: 'development',
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: path.join(__dirname, '../node_modules')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
}
