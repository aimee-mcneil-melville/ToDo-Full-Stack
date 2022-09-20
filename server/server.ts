import path from 'path'
import express from 'express'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

// const app = express();
import config from '../client/webpack.config'

const server = express()

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config)
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output?.publicPath,
    })
  )
}

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

export default server
