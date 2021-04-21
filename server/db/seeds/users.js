exports.seed = function (knex, Promise) {
  return knex('users').insert([
    { id: 10001, first_name: 'Jared', last_name: 'Pinfold', nickname: 'Daoloth69', email: 'j.pinfold@gmail.com', username: 'jpinfold', password: 'DumbStuff0@', public: true },
    { id: 10002, first_name: 'Shelley', last_name: 'Duncan', nickname: 'BeefCake', email: 'beefcake@example.org', username: 'shelley', password: 'DumbStuff0@', public: true },
    { id: 10003, first_name: 'Bea', last_name: 'Duncan', nickname: 'TekNurd', email: 'piptek@example.org', username: 'beaseemsnice', password: 'DumbStuff0@', public: true },
    { id: 10004, first_name: 'Kyle', last_name: 'Duncan', nickname: 'SportsBall', email: 'errybodylovesmrbrown@example.org', username: 'krob', password: 'DumbStuff0@', public: true },
    { id: 10005, first_name: 'Steve', last_name: 'Puce', nickname: 'SecretBoi2001', email: 'nobodylovesmrbrown@example.org', username: 'secrecyrulez', password: 'DumbStuff0@', public: true }
  ])
}
