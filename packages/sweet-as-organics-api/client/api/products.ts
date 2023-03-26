import request from 'superagent'
import { Product } from '../../models/product'

export function getProducts(): Promise<Product[]> {
  return request.get('/api/v1/products').then((res) => res.body)
}
