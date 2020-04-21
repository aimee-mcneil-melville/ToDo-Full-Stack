const { hashSync } = require('bcrypt')
const saltRounds = 10

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'admin',
          hash: hashSync('Krang', saltRounds),
          first_name: 'Admin',
          last_name: 'Istrator',
          hourly_wage: 300,
        }
      ])
    })
}
