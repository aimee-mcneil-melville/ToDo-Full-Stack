const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

exports.seed = function (knex) {
  return knex('users')
    .del() // Deletes ALL existing entries
    .then(() =>
      knex('users').insert([
        {
          id: 1,
          garden_id: 1,
          first_name: 'Admin',
          last_name: 'User',
          email: 'kelmarna.admin@email.nz',
          auth0_id: 'auth0|61414f84d35ac900717bc280',
        },
        {
          id: 2,
          garden_id: 2,
          first_name: 'User',
          last_name: 'second',
          email: '123',
          auth0_id: '123',
        },
        {
          id: 3,
          garden_id: 2,
          first_name: 'User',
          last_name: 'Third',
          email: 'user.third@email.nz',
          auth0_id: '123',
        },
      ])
    )
}
