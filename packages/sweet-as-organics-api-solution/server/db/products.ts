import connection from './connection'
import { Product } from '../../common/interfaces'

export function listProducts(db = connection) {
  return db<Product>('products').select()
}
