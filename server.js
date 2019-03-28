const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const routes = require('./routes')

const server = express()

// Middleware
server.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: true }))

// Routes
server.use('/', routes)

module.exports = server
