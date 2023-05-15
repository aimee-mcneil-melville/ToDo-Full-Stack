import express from 'express'
import authRoutes from './routes/auth'

const server = express()

server.use('/api/v1', authRoutes)

export default server
