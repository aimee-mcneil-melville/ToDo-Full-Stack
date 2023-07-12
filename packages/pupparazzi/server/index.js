import { listen } from './server'

const port = 3000

listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})
