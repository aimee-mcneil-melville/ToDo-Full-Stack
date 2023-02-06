const { join } = require('node:path')
const express = require('express')
const hbs = require('express-handlebars')

const locationRoutes = require('./routes/locations.js')
const scheduleRoutes = require('./routes/schedule.js')
const eventRoutes = require('./routes/events.js')

/*
 * create the server
 *************************/

const server = express()
module.exports = server

/*
 * configure the server
 *************************/

const publicFolder = join(__dirname, 'public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', join(__dirname, 'views'))

/*
 * define the routes
 *************************/

server.get('/', (req, res) => {
  res.redirect('/schedule/friday')
})

server.use('/locations', locationRoutes)
server.use('/schedule', scheduleRoutes)
server.use('/events', eventRoutes)
