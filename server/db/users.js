const connection = require('./connection')
const { generateHash } = require('../auth')

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUserDetailsByGarden
}

function getUserDetailsByGarden (gardenId, db = connection) {
  return db('users')
    .select('id', 'username', 'garden_id', 'email', 'is_admin')
    .where('garden_id', gardenId)
    .where('is_admin', false)
}

function getUserByName (username, db = connection) {
  return db('users')
    .select('username', 'is_admin as isAdmin', 'garden_id as gardenId', 'id', 'hash', 'email')
    .where('username', username)
    .first()
}

function createUser (user, db = connection) {
  return userExists(user.username, db)
    .then((exists) => {
      if (exists) {
        throw new Error('User exists')
      }
      return false
    })
    .then(() => generateHash(user.password))
    .then((passwordHash) => {
      return db('users').insert({
        username: user.username,
        garden_id: user.gardenId,
        hash: passwordHash,
        is_admin: false,
        email: user.email
      })
    })
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
}
