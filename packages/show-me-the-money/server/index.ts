import server from "./server"

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log("Server listening on port", PORT)
})
