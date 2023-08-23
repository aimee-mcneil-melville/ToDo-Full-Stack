import express from 'express'
import handlebars from 'express-handlebars'
import * as Path from 'node:path'

import routes from './routes.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', handlebars.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Routes
server.use('/', routes)

export default server
