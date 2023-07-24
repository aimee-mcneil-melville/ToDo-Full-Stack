import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

import { join } from 'node:path'
import express from 'express'

import fruitRoutes from './routes/fruits.ts'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'))
})

export default server
