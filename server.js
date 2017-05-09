var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')

var routes = require('./routes')

var app = express()

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// Routes
app.use('/', routes)

// Send back a creator function which links a db with the app so that it is testable
module.exports = function (db) {
  app.set('db', db)
  return app
}
