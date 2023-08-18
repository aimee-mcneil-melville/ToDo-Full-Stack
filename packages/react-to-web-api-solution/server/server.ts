import { join } from 'node:path'
import * as Path from 'node:path'
import * as URL from 'node:url'

import express from 'express'
import widgets from './routes/widgets.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()
server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/widgets', widgets)

export default server
