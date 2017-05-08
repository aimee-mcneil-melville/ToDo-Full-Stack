var createServer = require('./server')
var development = require('./knexfile').development
var knex = require('knex')(development)

var server = createServer(knex)

var PORT = 3000

server.listen(PORT, function () {
  console.log('CLEANING UP ALL OF THE THINGS THAT WE FIND... ON PORT', PORT)
})
