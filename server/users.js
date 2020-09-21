const { generateHash } = require('authenticare/server')
const connection = require('./db/connection')

// const environment = process.env.NODE_ENV || 'development'
// const config = require('./knexfile')[environment]
// const connection = require('knex')(config)
// const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName
}

function createUser (user, db = connection) {
  console.log('create user')
  return userExists(user.username, db)
    .then((exists) => {
      if (exists) {
        throw new Error('User exists')
      }
      return false
    })
    .then(() => generateHash(user.password))
    .then((passwordHash) => {
      return db('users').insert({ username: user.username, hash: passwordHash })
    })
    .catch((err) => console.error(err))
}

function userExists (username, db = connection) {
  console.log('user exists')
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
    .catch((err) => console.error(err))
}

function getUserByName (username, db = connection) {
  return db('users').select().where('username', username).first()
}
