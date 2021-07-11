const { generateHash } = require('../../auth')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      Promise.all([
        generateHash('admin'),
        generateHash('member'),
        generateHash('test'),
        generateHash('random')
      ])
    )
    .then(([adminHash, memberHash, testHash, randomHash]) =>
      knex('users').insert([
        {
          id: 1,
          garden_id: 1,
          username: 'admin',
          first_name: 'Admin',
          last_name: 'User',
          hash: adminHash,
          is_admin: true,
          email: 'admin@emailz.co'
        },
        {
          id: 2,
          garden_id: 1,
          username: 'member',
          first_name: 'Member',
          last_name: 'User',
          hash: memberHash,
          is_admin: false,
          email: 'member@emailz.co'
        },
        {
          id: 3,
          garden_id: 1,
          username: 'test',
          hash: testHash,
          is_admin: false,
          email: 'test@emailz.co'
        },
        {
          id: 4,
          garden_id: 2,
          username: 'random',
          hash: randomHash,
          is_admin: false,
          email: 'random@emailz.co'
        },
        {
          id: 5,
          garden_id: 1,
          username: 'Randy',
          hash: memberHash,
          is_admin: false,
          email: 'randy@example.com'
        }
      ])
    )
}
