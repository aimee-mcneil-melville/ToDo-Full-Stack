const { generateHash } = require('authenticare/server')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          { id: 10001, first_name: 'Jared', last_name: 'Pinfold', nickname: 'Daoloth69', email: 'j.pinfold@gmail.com', password: 'DumbStuff0@', public: true, invite_code: '111A11' },
          { id: 10002, first_name: 'Remington', last_name: 'Smythe', nickname: 'Remmy', email: 'remington@example.org', password: 'DumbStuff0@', public: true, invite_code: '222b22' },
          { id: 10003, first_name: 'Gertrude', last_name: 'Diamond', nickname: 'D1am0nd', email: 'gertrude@example.org', password: 'DumbStuff0@', public: true, invite_code: '333C33' },
          { id: 10004, first_name: 'Sloane', last_name: 'Trousers', nickname: 'STrousers', email: 'sloane@example.org', password: 'DumbStuff0@', public: true, invite_code: '4d4444' },
          { id: 10005, first_name: 'Steve', last_name: 'Puce', nickname: 'SecretBoi2001', email: 'steve@example.org', password: 'DumbStuff0@', public: true, invite_code: 'E55555' }
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
