const { join } = require('node:path')

module.exports = {
  entry: join(__dirname, 'index.tsx'),
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js',
  },
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
