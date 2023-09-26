import express from 'express'
import authRoutes from './routes/auth'
import * as Path from 'node:path/posix'

const server = express()

server.use('/api/v1', authRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(Path.resolve(__dirname, '../assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve(__dirname, '../index.html'))
  })
}
export default server
