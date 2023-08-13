import { join } from 'node:path'
import express from 'express'
import * as Path from 'node:path'
import * as URL from 'node:url'

import welcome from './routes/welcome.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)

export default server
