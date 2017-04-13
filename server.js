var express = require('express')
var hbs = require('express-handlebars')
var bodyParser = require('body-parser')

var indexRoutes = require('./routes/index')
var dogRoutes = require('./routes/dogs')

var app = express()

// Middleware
app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/', indexRoutes)
app.use('/dogs', dogRoutes)

module.exports = app