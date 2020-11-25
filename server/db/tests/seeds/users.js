const { generateHash } = require('authenticare/server')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => Promise.all([
      generateHash('admin'),
      generateHash('test'),
      generateHash('random')
    ]))
    .then(([adminHash, testHash, randomHash]) =>
      knex('users').insert([
        { id: 1, garden_id: 1, username: 'admin', hash: adminHash, is_admin: true },
        { id: 2, garden_id: 1, username: 'test', hash: testHash, is_admin: false },
        { id: 3, garden_id: 2, username: 'random', hash: randomHash, is_admin: false }
      ])
    )
}
