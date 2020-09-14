module.exports = {
  formatOrder,
  formatOrderList
}

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

function formatOrder (orderLines) {
  let order
  orderLines.forEach(item => {
    !order
      ? order = createOrder(item)
      : order.products.push(createProduct(item))
  })
  order.products = sortById(order.products)
  return order
}

function formatOrderList (orderLines) {
  let orderList = []
  orderLines.forEach(item => {
    let order = orderList.find(o => o.id === item.orderId)
    !order
      ? orderList.push(createOrder(item))
      : order.products = sortById([ ...order.products, createProduct(item) ])
  })
  return sortById(orderList)
}
