import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'

import routes from './routes'

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Routes
server.use('/', routes)

export default server
