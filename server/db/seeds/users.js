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
        }
      ])
    )
}
