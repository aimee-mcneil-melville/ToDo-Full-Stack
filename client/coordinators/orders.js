import requestor from '../consume'

export function validateOrder (order) {
  const hasInvalidQuantity = order.some(item => item.quantity === 0)
  if (hasInvalidQuantity) {
    return Promise.reject(new Error('Please enter a valid quantity for all items'))
  }
  return Promise.resolve()
}

export function placeOrder (order, history, dispatchers, validate = validateOrder, consume = requestor) {
  const { postOrderPending, postOrderSuccess, showError } = dispatchers
  postOrderPending()
  return validate(order)
    .then(() => consume('/orders', 'post', order))
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
