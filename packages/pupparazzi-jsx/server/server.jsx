import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Your routes/router(s) should go here

export default server
