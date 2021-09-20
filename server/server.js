const express = require('express')
const path = require('path')

const fruitRoutes = require('./routes/fruits')
const publicRoutes = require('./routes/public')
const protectedRoutes = require('./routes/protected')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/public', publicRoutes)
server.use('/api/v1/protected', protectedRoutes)

module.exports = server
