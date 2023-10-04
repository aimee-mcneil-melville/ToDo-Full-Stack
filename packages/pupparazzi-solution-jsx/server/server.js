import express from 'express'
import * as Path from 'node:path'

import routes from './routes.jsx'

const server = express()

const __dirname = Path.dirname(new URL(import.meta.url).pathname)

// Server configuration
const publicFolder = Path.join(__dirname, '../public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Routes
server.use('/', routes)

export default server
