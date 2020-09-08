import request from 'superagent'

const apiRoot = '/api/v1'

export function fetchProducts () {
  return request.get(`${apiRoot}/products`)
    .then(res => res.body)
}

export function fetchOrders () {
  return request.get(`${apiRoot}/orders`)
    .then(res => res.body)
}

export function postOrder (order) {
  return request.post(`${apiRoot}/orders`)
    .send(order)
    .then(res => res.body)
}

export function patchOrder (order) {
  return request.patch(`${apiRoot}/orders/${order.id}`)
    .send(order.products)
    .then(res => res.body)
}

export function deleteOrder (id) {
  return request.delete(`${apiRoot}/orders/${id}`)
    .then(res => res.body)
}
