const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)
const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUserById,
}

function createUser(user, db = connection) {
  return userExists(user.username, db)
    .then((exists) => {
      if (exists) {
        throw new Error('User exists')
      }
      return false
    })
    .then(() => generateHash(user.password))
<<<<<<< HEAD
    .then((passwordHash) => {
      return db('users').insert({
        username: user.username,
        garden_id: user.garden,
        hash: passwordHash,
        isAdmin: false,
      })
=======
    .then(passwordHash => {
      return db('users').insert({ username: user.username, garden_id: user.garden, hash: passwordHash, isAdmin: false })
>>>>>>> 3f4ee2978507edeb50f775780b6fb4ee9e83097f
    })
}

function getUserByName(username, db = connection) {
  return db('users').select().where('username', username).first()
}

function userExists(username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
}

function getUserById(id, db = connection) {
  return db('users').select().where('id', id).first()
}
