import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars'

const server = express()

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here

export default server
