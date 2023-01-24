import request from 'superagent'
import {
  CartItemWithQuantity,
  OrderStatus,
  OrderWithProducts,
} from '../../common/interfaces'

export function postOrder(order: CartItemWithQuantity[]) {
  return request
    .post('/api/v1/orders')
    .send({
      cart: order,
    })
    .then(() => null)
}

export function getOrders() {
  return request
    .get('/api/v1/orders')
    .then((res) => res.body as OrderWithProducts[])
}

export function patchOrderStatus(id: number, status: OrderStatus) {
  return request
    .patch(`/api/v1/orders/${id}`)
    .send({
      status,
    })
    .then((res) => res.body as OrderWithProducts)
}
