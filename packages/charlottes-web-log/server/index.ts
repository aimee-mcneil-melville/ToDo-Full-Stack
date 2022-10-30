const express = require('express')
const path = require('path')

const port = process.env.PORT || 3000

const server = express()

const staticFolder = path.join(__dirname, 'public')
server.use(express.static(staticFolder))

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
