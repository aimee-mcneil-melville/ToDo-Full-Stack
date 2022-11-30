import connection from './connection'

export function getFruits(db = connection) {
  return db('fruit').select()
}
