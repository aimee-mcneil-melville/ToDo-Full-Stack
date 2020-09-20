const { formatOrder, formatOrderList } = require('./formatter')

const mockOrders = [
  {
    id: 2,
    createdAt: '2:13:20 PM, Fri Sep 25 2020',
    status: 'pending',
    products: [
      {
        id: 2,
        name: 'mock product 2',
        quantity: 2
      },
      {
        id: 3,
        name: 'mock product 3',
        quantity: 5
      }
    ]
  },
  {
    id: 1,
    createdAt: '9:40:00 PM, Sun Sep 13 2020',
    status: 'pending',
    products: [
      {
        id: 1,
        name: 'mock product 1',
        quantity: 3
      },
      {
        id: 2,
        name: 'mock product 2',
        quantity: 1
      }
    ]
  }
]

const mockOrderLines = [
  {
    orderId: 1,
    createdAt: 1599990000000,
    status: 'pending',
    productId: 1,
    name: 'mock product 1',
    quantity: 3
  },
  {
    orderId: 1,
    createdAt: 1599990000000,
    status: 'pending',
    productId: 2,
    name: 'mock product 2',
    quantity: 1
  },
  {
    orderId: 2,
    createdAt: 1601000000000,
    status: 'pending',
    productId: 2,
    name: 'mock product 2',
    quantity: 2
  },
  {
    orderId: 2,
    createdAt: 1601000000000,
    status: 'pending',
    productId: 3,
    name: 'mock product 3',
    quantity: 5
  }
]

test('formatOrder formats an order', () => {
  const orderLines = [ mockOrderLines[0], mockOrderLines[1] ]

  const order = formatOrder(orderLines)
  expect(order).toStrictEqual(mockOrders[1])
})

test('formatOrderList formats multiple orders', () => {
  const orderList = formatOrderList(mockOrderLines)
  expect(orderList).toStrictEqual(mockOrders)
})
