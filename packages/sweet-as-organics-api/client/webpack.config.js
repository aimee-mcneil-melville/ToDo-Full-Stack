const { join } = require('node:path')

module.exports = {
  entry: join(__dirname, 'index.tsx'),
  mode: 'development',
  output: {
    path: join(__dirname, '../server/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(j|t)sx?$/,
        exclude: join(__dirname, '../node_modules'),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
}
