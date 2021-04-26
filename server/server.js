const path = require('path')
const express = require('express')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const gardenRoutes = require('./routes/gardens')
const eventRoutes = require('./routes/events')
const volunteerRoutes = require('./routes/volunteer')
const authRoutes = require('./routes/auth')

const server = express()

module.exports = server

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())

server.use('/api/v1/gardens', gardenRoutes)
server.use('/api/v1/events', eventRoutes)
server.use('/api/v1/volunteer', volunteerRoutes)
server.use('/api/v1', authRoutes)
