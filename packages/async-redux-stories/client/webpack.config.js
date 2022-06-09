const path = require('path')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  mode: 'development',
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
