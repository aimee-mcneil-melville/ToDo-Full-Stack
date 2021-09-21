const connection = require('./connection')

function getUsers (db = connection) {
  return db('users').select()
}

function addUser (input, db = connection) {
  const { auth0Id, name, email, description } = input
  const user = { auth0_id: auth0Id, name, email, description }
  return db('users')
    .insert(user)
}

module.exports = {
  getUsers,
  addUser
}
