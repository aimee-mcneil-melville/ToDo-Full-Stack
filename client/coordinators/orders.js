import requestor from '../consume'

export function getOrders (dispatchers, consume = requestor) {
  const { fetchOrdersPending, fetchOrdersSuccess, showError } = dispatchers
  fetchOrdersPending()
  return consume('/orders')
    .then(res => {
      const orders = res.body
      fetchOrdersSuccess(orders)
      return null
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
      return null
    })
    .catch(err => {
      showError(err.message)
    })
}
