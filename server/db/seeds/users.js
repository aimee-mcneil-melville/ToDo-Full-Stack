const { generateHash } = require('authenticare/server')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          { id: 10001, first_name: 'Jared', last_name: 'Pinfold', nickname: 'Daoloth69', email: 'j.pinfold@gmail.com', username: 'jpinfold', password: 'DumbStuff0@', public: true },
          { id: 10002, first_name: 'Remington', last_name: 'Smythe', nickname: 'BeefCake', email: 'remington@example.org', username: 'Remmy', password: 'DumbStuff0@', public: true },
          { id: 10003, first_name: 'Gertrude', last_name: 'Diamond', nickname: 'TekNurd', email: 'gertrude@example.org', username: 'D1am0nd', password: 'DumbStuff0@', public: true },
          { id: 10004, first_name: 'Sloane', last_name: 'Trousers', nickname: 'SportsBall', email: 'sloane@example.org', username: 'STrousers', password: 'DumbStuff0@', public: true },
          { id: 10005, first_name: 'Steve', last_name: 'Puce', nickname: 'SecretBoi2001', email: 'steve@example.org', username: 'secrecyrulez', password: 'DumbStuff0@', public: true }
        ].map(user => {
          return generateHash(user.password)
            .then(hash => {
              user.hash = hash
              delete user.password
              return user
            })
        }))
        .then(users => {
          return knex('users').insert(users)
        })
    })
}