import express from 'express'

const server = express()
export default server

server.get('/', (req, res) => {
  res.send('Hello World!')
})
