const connection = require('./connection')

function getFriends (id, db = connection) {
  return db('follower_list')
    .join('users', 'following_id', 'users.id')
    .where('user_id', Number(id))
    .select('users.first_name as name', 'users.last_name as lastName', 'users.nickname as nickname', 'users.id as id')
    .then(result => {
      return result
    })
}

module.exports = {
  getFriends
}
