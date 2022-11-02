import connection from './connection'
import { generateHash } from 'authenticare/server'

export function createUser(user, db = connection) {
  const newUser = { ...user }
  return generateHash(newUser.password).then((passwordHash) => {
    newUser.hash = passwordHash
    delete newUser.password
    return db('users').insert(newUser)
  })
}

export function userExists(username, db = connection) {
  return db('users')
    .where('username', username)
    .then((users) => users.length > 0)
}

export function getUserByUsername(username, db = connection) {
  return db('users').where('username', username).first()
}

