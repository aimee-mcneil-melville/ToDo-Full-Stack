const { generateHash } = require('authenticare/server')

const replacePasswordWithHash = (user) => {
  const { username, email_address, contact_details } = user
  return generateHash(user.password).then((hash) => {
    return {
      username,
      email_address,
      contact_details,
      hash,
    }
  })
}

const fakeUserData = [
  {
    username: 'admin',
    password: 'Krang',
    email_address: 'hello@devacademy.co.nz',
    contact_details: 'Ring the bell ;)',
  },
]

const fakeUsers = Promise.all(fakeUserData.map(replacePasswordWithHash))

exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(() => fakeUsers)
    .then((users) => {
      return knex('users').insert(users)
    })
}
