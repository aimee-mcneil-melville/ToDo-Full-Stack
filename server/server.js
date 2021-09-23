const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/users')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)

module.exports = server
