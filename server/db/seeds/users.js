const { generateHash } = require('authenticare/server')

exports.seed = async (knex) => {
  return knex('users')
    .del()
    .then(async () => {
      const users = [
        {
          username: 'admin',
          hash: await generateHash('Krang'),
          email_address: 'hello@devacademy.co.nz',
          contact_details: 'Ring the bell ;)',
        },
        {
          username: 'user',
          hash: await generateHash('user'),
          email_address: 'user@email.com',
          contact_details: 'Good user, yes',
        },
      ]
      return knex('users').insert(users)
    })
}
