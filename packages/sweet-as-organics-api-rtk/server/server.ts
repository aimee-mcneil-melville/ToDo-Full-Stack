import { join } from 'node:path'
import express from 'express'

import products from './routes/products'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/products', products)

// For the client side BrowserRouter - because there is no '#' to distinguish
// between client and server side routes, this sends back the index.html
// (which contains the bundle.js) if none there is no server side route match.
server.get('*', (req, res) => {
  res.sendFile(join(__dirname, './public/index.html'))
})

export default server
