const path = require('path')
const express = require('express')

const gardenRoutes = require('./routes/gardens')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/gardens', gardenRoutes)

module.exports = server
