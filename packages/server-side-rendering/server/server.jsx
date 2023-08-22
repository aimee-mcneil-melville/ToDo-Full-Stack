import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'

const server = express()
export default server

// Routes
server.get('/', (req, res) => {
  res.send(renderToString(<p>hello</p>))
})
