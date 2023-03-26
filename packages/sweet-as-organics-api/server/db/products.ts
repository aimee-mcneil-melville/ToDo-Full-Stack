import connection from './connection'
import { Product } from '../../models/product'

export async function getAllProducts(db = connection): Promise<Product[]> {
  return db('products').select()
}
