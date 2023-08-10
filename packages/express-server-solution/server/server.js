import * as Path from 'node:path/posix'
import * as URL from 'node:url'

import express from 'express'

const server = express()

// http://expressjs.com/en/starter/static-files.html
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

server.get('/compliment', (req, res) => {
  res.send('<h1>you are a beautiful human</h1>')
})

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.get('/profile', (req, res) => {
  const name = req.query.name
  if (!name) res.redirect('/compliment')

  const filePath = Path.join(__dirname, 'public', name.toLowerCase() + '.html')
  res.sendFile(filePath)
})

server.get('/profiles/:id', (req, res) => {
  const id = req.params.id

  const users = {
    1: 'silvia',
    2: 'sampson',
  }

  const name = users[id]
  const filePath = Path.join(__dirname, 'public', name + '.html')
  res.sendFile(filePath)
})

server.post('/named-compliment', (req, res) => {
  res.send('You are wonderful ' + req.body.name)
})

export default server
