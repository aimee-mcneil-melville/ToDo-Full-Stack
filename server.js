const path = require('path')

const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')

const app = express()

module.exports = app

// Middleware

app.use(express.urlencoded({ extended: true }))
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

// Routes

app.use('/', routes)
