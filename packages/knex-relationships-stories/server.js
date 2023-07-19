import express from 'express'
import * as hbs from 'express-handlebars'

import userRoutes from './users.js'

const server = express()

// Middleware

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.use(express.urlencoded({ extended: true }))

// Routes

server.use('/', userRoutes)

export default server
