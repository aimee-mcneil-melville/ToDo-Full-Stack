const { join } = require('node:path')

const express = require('express')
const hbs = require('express-handlebars')

const server = express()

// view engine config

const hbsConfig = {
  defaultLayout: 'main',
  extname: 'hbs',
}
server.engine('hbs', hbs.engine(hbsConfig))
server.set('view engine', 'hbs')

// middleware

server.use(express.urlencoded({ extended: false }))
server.use(express.static(join(__dirname, 'public')))

// sample data

const data = {
  cats: [
    { id: 1, name: 'fluffy' },
    { id: 2, name: 'tick' },
  ],
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

// eslint-disable-next-line no-unused-vars
server.get('/cats/:id', function (req, res) {
  console.log(req.params) // try going to /cats/1
})

// eslint-disable-next-line no-unused-vars
server.post('/cats', function (req, res) {
  console.log(req.body)
})

module.exports = server
