const { generateHash } = require('authenticare/server')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => Promise.all([
      generateHash('admin'),
      generateHash('ben'),
      generateHash('lewis'),
      generateHash('michael'),
      generateHash('gideon'),
      generateHash('andras'),
      generateHash('matt')
    ]))
    .then(([adminHash, benHash, lewisHash, michaelHash, gideonHash, andrasHash, mattHash]) =>
      knex('users').insert([
        { id: 1, garden_id: 1, username: 'admin', hash: adminHash, isAdmin: true },
        { id: 2, garden_id: 1, username: 'ben', hash: benHash, isAdmin: false },
        { id: 3, garden_id: 2, username: 'lewis', hash: lewisHash, isAdmin: false },
        { id: 4, garden_id: 3, username: 'michael', hash: michaelHash, isAdmin: false },
        { id: 5, garden_id: 3, username: 'gideon', hash: gideonHash, isAdmin: false },
        { id: 6, garden_id: 1, username: 'andras', hash: andrasHash, isAdmin: false },
        { id: 7, garden_id: 2, username: 'matt', hash: mattHash, isAdmin: false }
      ])
    )
}
