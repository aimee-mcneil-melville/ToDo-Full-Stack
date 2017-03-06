var express = require('express')
var hbs = require('express-handlebars')

var app = express()
module.exports = app

// Middleware
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

// Routes
app.get('/', function (req, res) {
  var viewModel = {
    title: 'Gallery'
  }
  res.render('wombat', viewModel)
})

