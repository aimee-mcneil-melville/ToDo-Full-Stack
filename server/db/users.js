const {generatePasswordHash} = require('../auth/hash')

const connection = require('./connection')

function createUser (username, first_name, last_name, password, testDb) {
  const db = testDb || connection

  return generatePasswordHash(password)
    .then(hash => {
      return db('users').insert({username, first_name, last_name, hash})
    })
}

function userExists (username, testDb) {
  const db = testDb || connection

  return db('users')
    .where('username', username)
    .then(users => users.length > 0)
}

function getUserByUsername (username, testDb) {
  const db = testDb || connection

  return db('users')
    .where('username', username)
    .first()
}

module.exports = {
  createUser,
  userExists,
  getUserByUsername
}
