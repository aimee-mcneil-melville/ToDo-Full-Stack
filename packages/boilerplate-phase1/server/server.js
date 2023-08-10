import express from 'express'
import hbs from 'express-handlebars'
import * as Path from 'node:path'

import routes from './routes/index.js'

const server = express()
server.engine('hbs', hbs())
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))
server.use(express.urlencoded({ extended: true }))
server.use('/', routes)

export default server
