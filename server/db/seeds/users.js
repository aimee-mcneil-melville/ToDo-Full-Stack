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
          username: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          email: 'kelmarna.admin@email.nz',
          auth0_id: 'auth0|61414f84d35ac900717bc280'
        },
        {
          id: 2,
          garden_id: process.env.E2E_TEST_ADMIN_GARDEN_ID,
          is_admin: process.env.E2E_TEST_ADMIN_IS_ADMIN,
          username: process.env.E2E_TEST_ADMIN_USERNAME,
          first_name: process.env.E2E_TEST_ADMIN_FIRST_NAME,
          last_name: process.env.E2E_TEST_ADMIN_LAST_NAME,
          email: process.env.E2E_TEST_AUTH0_ADMIN_EMAIL,
          auth0_id: process.env.E2E_TEST_AUTH0_ADMIN_ID
        },
        {
          id: 3,
          garden_id: process.env.E2E_TEST_MEMBER_GARDEN_ID,
          is_admin: process.env.E2E_TEST_MEMBER_IS_ADMIN,
          username: process.env.E2E_TEST_MEMBER_USERNAME,
          first_name: process.env.E2E_TEST_MEMBER_FIRST_NAME,
          last_name: process.env.E2E_TEST_MEMBER_LAST_NAME,
          email: process.env.E2E_TEST_AUTH0_MEMBER_EMAIL,
          auth0_id: process.env.E2E_TEST_AUTH0_MEMBER_ID
        }
      ])
    )
}
