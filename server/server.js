const express = require('express')
const path = require('path')
const auth = require('./routes/auth')

const friendRoutes = require('./routes/friends')
const mediaRoutes = require('./routes/media')
const userRoutes = require('./routes/user')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/friends', friendRoutes)
server.use('/api/v1/media', mediaRoutes)
server.use('/api/v1/', auth)
server.use('/api/v1/user', userRoutes)

module.exports = server
