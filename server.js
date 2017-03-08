var express = require('express')
var hbs = require('express-handlebars')

var art = require('./art.json')

var app = express()
module.exports = app

// Middleware
app.engine('hbs', hbs({
  extname: 'hbs'
}))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// Routes
