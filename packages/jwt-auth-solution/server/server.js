const { join } = require('node:path')
const express = require('express')

const fruitRoutes = require('./routes/fruits')
const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'))
})

module.exports = server
