module.exports = {
  getUser: getUser,
  getUsers: getUsers
}

function getUsers (knex) {
  return knex('users').select()
}

function getUser (id, knex) {
  return knex('users').where('id', id)
}
