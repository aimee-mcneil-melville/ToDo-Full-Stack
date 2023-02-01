import express from 'express'
import { join } from 'path'

const port = process.env.PORT || 3000

const server = express()

const staticFolder = join(__dirname, 'public')
server.use(express.static(staticFolder))

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
