import connection from './connection'

export function listProducts(db = connection) {
  return db('products').select()
}
