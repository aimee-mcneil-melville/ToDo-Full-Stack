const { generateHash } = require('authenticare/server')
import { Knex } from 'knex'

interface User {
  id: number
  username: string
  password?: string
  first_name: string
  last_name: string
  hourly_wage: number
  hash?: string
}

exports.seed = function (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          {
            id: 1,
            username: 'admin',
            password: 'Krang',
            first_name: 'Admin',
            last_name: 'Istrator',
            hourly_wage: 300,
          },
        ].map((user: User) => {
          return generateHash(user.password).then((hash: string) => {
            user.hash = hash
            delete user.password
            return user
          })
        })
      ).then((users) => {
        return knex('users').insert(users)
      })
    })
}
