import server from './server.js'

const port = process.env.PORT || 3000

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
