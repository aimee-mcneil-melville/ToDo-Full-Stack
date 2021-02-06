import requestor from '../consume'

export function placeOrder (cart, history, dispatchers, consume = requestor) {
  const { postOrderPending, postOrderSuccess, showError } = dispatchers
  const order = createOrder(cart)
  postOrderPending()
  return validateOrder(order)
    .then(() => consume('/orders', 'post', order))
    .then(() => {
      postOrderSuccess()
      history.push('/orders')
      return null
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

function validateOrder (order) {
  return new Promise((resolve, reject) => {
    const hasInvalidQuantity = order.some(item => item.quantity === 0)
    if (hasInvalidQuantity) {
      reject(new Error('INVALID ORDER: Quantity required for all items'))
    }
    resolve()
  })
}

function createOrder (cart) {
  return cart.map(item => {
    return {
      id: item.id,
      quantity: item.quantity
    }
  })
}
