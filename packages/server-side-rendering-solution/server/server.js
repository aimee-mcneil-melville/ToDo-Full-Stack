const express = require('express')
const hbs = require('express-handlebars')
const art = require('./data/art.json')

const server = express()
module.exports = server

// Middleware
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views',);
server.use(express.static(__dirname + '/public'))

// Routes
server.get('/', (req, res) => {
  const viewData = {
    title: 'Gallery',
    art: art,
  }
  const template = 'home'
  res.render(template, viewData)
})

server.get('/artworks/:id', (req, res) => {
  const id = Number(req.params.id)
  const artwork = art.find((artDetail) => artDetail.id === id)
  const viewData = {
    title: artwork.title,
    artistWork: artwork,
  }
  const template = 'artworks'
  res.render(template, viewData)
})
