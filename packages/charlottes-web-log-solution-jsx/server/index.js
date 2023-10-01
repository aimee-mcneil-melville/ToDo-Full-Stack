import server from './server.jsx'

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`)
})
