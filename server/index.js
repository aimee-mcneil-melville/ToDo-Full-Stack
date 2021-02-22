const server = require('./server')
require('dotenv').config()

// https://stackoverflow.com/a/18024792
const port = process.env.PORT || 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', port)
})
