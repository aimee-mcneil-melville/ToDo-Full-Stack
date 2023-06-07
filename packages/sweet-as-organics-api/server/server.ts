import * as Path from 'node:path'
import express from 'express'

import products from './routes/products'

const server = express()

server.use(express.json())

server.use('/api/v1/products', products)

// For the client side BrowserRouter - because there is no '#' to distinguish
// between client and server side routes, this sends back the index.html
// (which contains the bundle.js) if none there is no server side route match.

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(Path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, '../index.html'))
  })
}

export default server
