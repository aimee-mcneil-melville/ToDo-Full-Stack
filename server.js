var path = require('path')

var express = require('express')
var hbs = require('express-handlebars')

var server = express()

// view engine config

var hbsConfig = {
  defaultLayout: 'main',
  extname: 'hbs'
}
server.engine('hbs', hbs(hbsConfig))
server.set('view engine', 'hbs')

// middleware

server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

// sample data

var data = {
  cats: [
    {id: 1, name: 'fluffy'},
    {id: 2, name: 'tick'}
  ]
}

// routes

server.get('/', function (req, res) {
  res.redirect('/cats') // what is this doing?
})

server.get('/cats', function (req, res) {
  res.render('index', data)
})

server.get('/cats/new', function (req, res) {
  res.render('new')
})

server.get('/cats/:id', function (req, res) {
  console.log(req.params) // try going to /cats/1
})

server.post('/cats', function (req, res) {
  console.log(req.body)
})

module.exports = server
