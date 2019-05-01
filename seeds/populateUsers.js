const { hashSync } = require('bcrypt')
const saltRounds = 10

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_name: 'admin',
          first_name: 'Admin',
          last_name: 'Istrator',
          hash: hashSync('Krang', saltRounds),
          hourly_wage: 300
        }
      ])
    })
}
