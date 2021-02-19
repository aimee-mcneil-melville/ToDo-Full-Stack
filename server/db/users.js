const connection = require('./connection')
const { generateHash } = require('../auth')

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUserEmailsByGarden
}

function getUserEmailsByGarden (gardenID, db = connection) {
  return db('users')
    .select('id', 'garden_id', 'email', 'is_admin')
    .where('garden_id', gardenID)
    .where('is_admin', false)
    .then(users => users.map(user => user.email))
}

getUserEmailsByGarden(1)

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
