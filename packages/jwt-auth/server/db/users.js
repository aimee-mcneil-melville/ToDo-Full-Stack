const connection = require('./connection')

module.exports = {
  userExists,
  getUser,
  createUser,
}

function userExists(username, db = connection) {
  return db('users')
    .where('username', username)
    .then((usersFound) => usersFound.length > 0)
}

function getUser(id, db = connection) {
  return db('users').select('username', 'icon').where('auth0_id', id).first()
}

function createUser(user, db = connection) {
  return db('users').insert(user)
}
