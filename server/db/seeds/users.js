const { generateHash } = require('authenticare/server')

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(() => Promise.all ([
        generateHash('benpai'),
        generateHash('test'),
        generateHash('random')
      ])) 
        .then(([benpaiHash, testHash, randomHash]) =>
         knex('users').insert([
           { id: 1, garden_id: 1, username: 'benpai', hash: benpaiHash , isAdmin: true},
           { id: 2, garden_id: 1, username: 'test', hash: testHash , isAdmin: false},
           { id: 3, garden_id: 2, username: 'random', hash: randomHash , isAdmin: false}
        ])
      );
  };