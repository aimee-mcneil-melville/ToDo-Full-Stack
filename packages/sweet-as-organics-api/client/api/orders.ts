import request from 'superagent'
import { OrderStatus } from '../../models/order'
import { OrderWithProducts } from '../../models/order'
import { CartItemWithQuantity } from '../../models/product'

export function postOrder(order: CartItemWithQuantity[]): Promise<void> {
  return request
    .post('/api/v1/orders')
    .send({
      cart: order,
    })
    .then(() => undefined)
}

export function getOrders(): Promise<OrderWithProducts[]> {
  return request
    .get('/api/v1/orders')
    .then((res) => res.body as OrderWithProducts[])
}

export function patchOrderStatus(
  id: number,
  status: OrderStatus
): Promise<OrderWithProducts> {
  return request
    .patch(`/api/v1/orders/${id}`)
    .send({
      status,
    })
    .then((res) => res.body)
}
