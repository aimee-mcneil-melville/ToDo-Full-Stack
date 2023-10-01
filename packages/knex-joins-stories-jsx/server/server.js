import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import express from 'express'

import routes from './routes.jsx'

const server = express()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: true }))

// Routes
server.use('/', routes)

export default server
