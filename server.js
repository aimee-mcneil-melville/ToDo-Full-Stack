const path = require('path')
const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')

const server = express()
const publicFolder = path.join(__dirname, 'public')

server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

server.use('/', routes)

module.exports = server
