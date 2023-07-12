import { listen } from './server'

var port = process.env.port || 3000

listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})
