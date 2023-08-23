import express from 'express'
import * as Path from 'node:path'

import routes from './routes.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Routes
server.use('/', routes)

export default server
