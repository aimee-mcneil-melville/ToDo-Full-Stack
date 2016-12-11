var development = require('./knexfile').development
var knex = require('knex')(development)

module.exports = {
  getHome: getHome
}

function getHome (req, res) {
  res.send('WOMBLES!')
}
