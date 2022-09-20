const path = require('path')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './client/index.tsx',
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
