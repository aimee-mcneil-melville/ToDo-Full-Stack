function createDateTimeString(timestamp: string | Date | number) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString() + ', ' + date.toDateString()
}

function createOrder(orderLine: OrderLine) {
  return {
    id: orderLine.orderId,
    createdAt: createDateTimeString(orderLine.createdAt),
    status: orderLine.status,
    products: [createProduct(orderLine)],
  }
}

function createProduct(orderLine: OrderLine) {
  return {
    id: orderLine.productId,
    name: orderLine.name,
    quantity: orderLine.quantity,
  }
}

type OrderLine = {
  productId: number
  orderId: number
  quantity: number
  createdAt: string
  status: string
  name: string
}
type OrderLines = OrderLine[]
type OrderProductOutput = {
  id: number
  status: string
  createdAt: string
  products: { id: number; name: string; quantity: number }[]
}
export function formatOrder(orderLines: OrderLines): OrderProductOutput {
  const order = createOrder(orderLines[0])

  order.products = orderLines.map((o) => createProduct(o))

  return order
}

export function formatOrderList(orderLines: OrderLines): OrderProductOutput[] {
  const orders: OrderProductOutput[] = []

  orderLines.forEach((orderLine) => {
    const order = orders.find((o) => o.id === orderLine.orderId)
    if (order) {
      order.products.push(createProduct(orderLine))
    } else {
      orders.push(createOrder(orderLine))
    }
  })

  return orders
}
