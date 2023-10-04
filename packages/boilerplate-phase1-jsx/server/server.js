import express from 'express'

import routes from './routes/index.jsx'

const server = express()
server.use(express.urlencoded({ extended: true }))

// server.use('/', routes)

export default server
