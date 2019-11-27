const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')

const server = express()

server.use(cors('*'))

server.use(express.json())
server.use(express.static('public'))

server.use('/api/auth', authRoutes)

module.exports = server
