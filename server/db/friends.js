const connection = require('./connection')

function getFriends (id = 10001, db = connection) {
  return db('follower_list')
    .join('users', 'following_id', 'users.id')
    .where('user_id', id)
    .select('users.first_name as name', 'users.last_name as lastName', 'users.nickname as nickname')
    .then(result => {
      console.log('result', result)
      return result
    })
}

module.exports = {
  getFriends
}
