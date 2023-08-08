import express from 'express'
import users from './routes/users.js'

const server = express()

// Middleware
server.use(express.json())

// Routes
server.use('/users', users)

export default server
