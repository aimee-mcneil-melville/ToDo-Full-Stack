import knex from 'knex'
import knexfile from './knexfile.mjs'

const environment = process.env.NODE_ENV || 'development'
const config = knexfile[environment]

export const connection = knex(config)

export function getUsers(db = connection) {
  return db('users').select()
}

export function getUser(id, db = connection) {
  return db('users').where('id', id).first()
}
