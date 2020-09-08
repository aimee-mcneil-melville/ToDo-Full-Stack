function createDateTimeString (timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString() + ', ' + date.toDateString()
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
      ? order = {
        id: item.orderId,
        createdAt: createDateTimeString(item.createdAt),
        updatedAt: createDateTimeString(item.updatedAt),
        products: [
          {
            id: item.productId,
            name: item.name,
            quantity: item.quantity
          }
        ]
      }
      : order.products.push({
        id: item.productId,
        name: item.name,
        quantity: item.quantity
      })
  })
  order.products = sortById(order.products)
  return order
}

function formatOrderList (orders) {
  let orderList = []
  orders.forEach(item => {
    let order = orderList.find(o => o.id === item.orderId)
    !order
      ? orderList.push({
        id: item.orderId,
        createdAt: createDateTimeString(item.createdAt),
        updatedAt: createDateTimeString(item.updatedAt),
        products: [
          {
            id: item.productId,
            name: item.name,
            quantity: item.quantity
          }
        ]
      })
      : order.products = sortById([...order.products, {
        id: item.productId,
        name: item.name,
        quantity: item.quantity
      }])
  })
  return sortById(orderList)
}

module.exports = {
  formatOrder,
  formatOrderList
}
