exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      knex('users').insert([
        {
          id: 1,
          garden_id: 1,
          username: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          email: 'random@email.com',
          auth0_id: 'auth0|98e78a925b3c78006a2be3e4'
        }
      ])
    )
}
