export function createDateTimeString(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString() + ', ' + date.toDateString()
}

export function createOrder(orderLine) {
  return {
    id: orderLine.orderId,
    createdAt: createDateTimeString(orderLine.createdAt),
    status: orderLine.status,
    products: [createProduct(orderLine)],
  }
}

export function createProduct(orderLine) {
  return {
    id: orderLine.productId,
    name: orderLine.name,
    quantity: orderLine.quantity,
  }
}

export function sortByIdAscending<T extends { id: number }>(arr: T[]) {
  arr.sort((a, b) => {
    return a.id - b.id
  })
  return arr
}

export function sortByIdDescending<T extends { id: number }>(arr: T[]) {
  arr.sort((a, b) => {
    return b.id - a.id
  })
  return arr
}

function formatOrder(orderLines) {
  let order
  orderLines.forEach((item) => {
    !order
      ? (order = createOrder(item))
      : order.products.push(createProduct(item))
  })
  order.products = sortByIdAscending(order.products)
  return order
}

function formatOrderList(orderLines) {
  const orderList = []
  orderLines.forEach((item) => {
    const order = orderList.find((o) => o.id === item.orderId)
    !order
      ? orderList.push(createOrder(item))
      : (order.products = sortByIdAscending([
          ...order.products,
          createProduct(item),
        ]))
  })
  return sortByIdDescending(orderList)
}
