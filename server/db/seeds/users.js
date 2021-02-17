const { generateHash } = require('../../auth')

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => Promise.all([
      generateHash('admin'),
      generateHash('member')
    ]))
    .then(([adminHash, memberHash]) =>
      knex('users').insert([
        { id: 1, garden_id: 1, username: 'admin', hash: adminHash, is_admin: true },
        { id: 2, garden_id: 1, username: 'member', hash: memberHash, is_admin: false }
      ])
    )
}
