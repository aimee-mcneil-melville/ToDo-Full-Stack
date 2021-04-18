const connection = require('./connection')

function getFriends (db = connection) {
  return db('follower_list').select()
}

module.exports = {
  getFriends
}
