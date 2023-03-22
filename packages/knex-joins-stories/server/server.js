const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')

const server = express()

// Middleware
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: true }))

// Routes
server.use('/', routes)

module.exports = server
