const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const { generateHash } = require('authenticare/server')

module.exports = {
    createUser,
    userExists,
    getUserByName
}

function createUser (username, password, db = connection) {
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username, hash: passwordHash })
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

