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

function addFriend (userId, followingId, db = connection) {
  const newFriend = { user_id: userId, following_id: followingId }
  return db('follower_list')
    .insert(newFriend)
    .then(() => {
      return db('follower_list')
        .where('user_id', userId)
        .where('following_id', followingId)
        .select('id')
        .first()
    })
    .catch((err) => {
      console.error(err)
    })
}

function deleteFriend (userId, followingId, db = connection) {
//   const delFriend = { user_id: userId, following_id: followingId }
  return db('follower_list')
    .where('user_id', userId)
    .where('following_id', followingId)
    .del(followingId)
}

module.exports = {
  getFriends,
  addFriend,
  deleteFriend
}
