// eslint-disable-next-line @typescript-eslint/no-unused-vars
import path, { join } from 'node:path'
import express from 'express'

const server = express()

server.use(express.static(join(__dirname, 'public')))

export default server
