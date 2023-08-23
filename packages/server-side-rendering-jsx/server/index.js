import server from './server.jsx'

const port = 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on http://localhost:' + port)
})
