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
          is_admin: true,
          username: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          email: 'kelmarna.admin@email.nz',
          auth0_id: 'auth0|61414f84d35ac900717bc280'
        },
        {
          id: 2,
          garden_id: process.env.E2E_TEST_GARDEN_ID,
          is_admin: process.env.E2E_TEST_IS_ADMIN,
          username: process.env.E2E_TEST_USERNAME,
          first_name: process.env.E2E_TEST_FIRST_NAME,
          last_name: process.env.E2E_TEST_LAST_NAME,
          email: process.env.E2E_TEST_AUTH0_USER_EMAIL,
          auth0_id: process.env.E2E_TEST_AUTH0_USER_ID
        }
      ])
    )
}
