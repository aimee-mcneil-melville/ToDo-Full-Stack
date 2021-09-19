const { generateHash } = require('authenticare/server')

const connection = require('./connection')

module.exports = {
  userExists,
  getUserByName,
  createUser
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

function createUser (user, db = connection) {
  const { username, password } = user
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        throw Promise.reject(new Error('User Exists'))
      }
      return null
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username, hash: passwordHash })
    })
}
