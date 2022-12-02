import request from 'superagent'
import type { Product } from '../../common/interfaces'

export function getProducts() {
  return request.get('/api/v1/products').then((res) => res.body as Product[])
}
