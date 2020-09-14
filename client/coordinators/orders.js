import requestor from '../consume'

export function placeOrder (order, history, dispatchers, consume = requestor) {
  const { postOrderPending, postOrderSuccess, showError } = dispatchers
  postOrderPending()
  return consume('/orders', 'post', order)
    .then(() => {
      postOrderSuccess()
      history.push('/orders')
    })
    .catch(err => {
      showError(err.message)
    })
}

export function getOrders (dispatchers, consume = requestor) {
  const { fetchOrdersPending, fetchOrdersSuccess, showError } = dispatchers
  fetchOrdersPending()
  return consume('/orders')
    .then(res => {
      const orders = res.body
      fetchOrdersSuccess(orders)
    })
    .catch(err => {
      showError(err.message)
    })
}

export function updateOrder (id, orderChanges, dispatchers, consume = requestor) {
  const { patchOrderPending, patchOrderSuccess, showError } = dispatchers
  patchOrderPending()
  return consume(`/orders/${id}`, 'patch', orderChanges)
    .then(res => {
      const order = res.body
      patchOrderSuccess(order)
    })
    .catch(err => {
      showError(err.message)
    })
}
