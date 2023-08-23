import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'
import hbs from 'express-handlebars'

const server = express()
export default server

// Middleware
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))

// Routes
