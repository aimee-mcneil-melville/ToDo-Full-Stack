const { generateHash } = require('../../auth')

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => Promise.all([
      generateHash('admin'),
      generateHash('member')
    ]))
    .then(([adminHash, memberHash]) =>
      knex('users').insert([
        { id: 1, garden_id: 1, username: 'admin', first_name: 'Admin', last_name: 'The Great', hash: adminHash, is_admin: true, email: 'admin@emailz.co' },
        { id: 2, garden_id: 1, username: 'member', first_name: 'Member', last_name: 'Jardin', hash: memberHash, is_admin: false, email: 'member@emailz.co' }
      ])
    )
}
