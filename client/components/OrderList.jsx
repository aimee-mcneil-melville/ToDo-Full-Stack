import React from 'react'

import Order from './Order'

function OrderList ({ children }) {
  const orders = []
  return (
    <div className='orderlist'>
      {children} { /* Holds the WaitIndicator */ }
      {orders?.map(order => {
        return (
          <Order
            key={order.id}
            order={order}
          />
        )
      })}
    </div>
  )
}

export default OrderList
