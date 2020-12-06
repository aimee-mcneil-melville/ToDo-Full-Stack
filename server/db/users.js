const connection = require('./connection')
const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName
}

function getUserByName (username, db = connection) {
  return db('users')
    .select('username', 'is_admin as isAdmin', 'garden_id as gardenId', 'id', 'hash')
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
        is_admin: false
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
