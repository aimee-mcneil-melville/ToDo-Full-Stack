function createDateTimeString (timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString() + ', ' + date.toDateString()
}

function createOrder (orderLine) {
  return {
    id: orderLine.orderId,
    createdAt: createDateTimeString(orderLine.createdAt),
    status: orderLine.status,
    products: [ createProduct(orderLine) ]
  }
}

function createProduct (orderLine) {
  return {
    id: orderLine.productId,
    name: orderLine.name,
    quantity: orderLine.quantity
  }
}

function sortById (arr) {
  arr.sort((a, b) => {
    return a.id - b.id
  })
  return arr
}

function formatOrderList (orders) {
  let orderList = []
  orders.forEach(item => {
    let order = orderList.find(o => o.id === item.orderId)
    !order
      ? orderList.push(createOrder(item))
      : order.products = sortById([ ...order.products, createProduct(item) ])
  })
  return sortById(orderList)
}

module.exports = {
  formatOrderList
}
