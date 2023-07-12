import { join } from 'node:path'
import express from 'express'
import * as hbs from 'express-handlebars'

import locationRoutes from './routes/locations'
import scheduleRoutes from './routes/schedule'
import eventRoutes from './routes/events'

/*
 * create the server
 *************************/

const server = express()
export default server

/*
 * configure the server
 *************************/

const publicFolder = join(__dirname, 'public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', join(__dirname, 'views'))

/*
 * define the routes
 *************************/

server.get('/', (req, res) => {
  res.redirect('/schedule/friday')
})

server.use('/locations', locationRoutes)
server.use('/schedule', scheduleRoutes)
server.use('/events', eventRoutes)
