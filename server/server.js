const express = require('express')
const path = require('path')
const auth = require('./routes/auth')

const friendRoutes = require('./routes/friends')
const mediaRoutes = require('./routes/media')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/friends', friendRoutes)
server.use('/api/v1/media', mediaRoutes)
server.use('/api/v1/', auth)

module.exports = server
