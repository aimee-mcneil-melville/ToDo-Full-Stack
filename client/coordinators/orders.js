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
