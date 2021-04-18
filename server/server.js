const express = require('express')
const path = require('path')

const friendRoutes = require('./routes/friends')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/friends', friendRoutes)

module.exports = server
