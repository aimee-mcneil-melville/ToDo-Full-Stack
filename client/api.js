import request from 'superagent'

export const url = 'http://localhost:3000'
const apiRoot = url + '/api/v1'

export function fetchProducts () {
  return request.get(`${apiRoot}/products`)
    .then(res => res.body)
    .catch(err => {
      throw err
    })
}

export function fetchOrders () {
  return request.get(`${apiRoot}/orders`)
    .then(res => res.body)
}

export function postOrder (order) {
  return request.post(`${apiRoot}/orders`)
    .send(order)
}

export function patchOrder (id, orderChanges) {
  return request.patch(`${apiRoot}/orders/${id}`)
    .send(orderChanges)
}
