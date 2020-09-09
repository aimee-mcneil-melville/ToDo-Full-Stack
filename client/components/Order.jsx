import React from 'react'
import { connect } from 'react-redux'

import OrderItem from './OrderItem'

import { updateOrder, getOrders } from '../api-helpers'

const Order = props => {
  const { dispatch, order } = props
  const { id, products, createdAt, status } = order

  const cancelOrder = () => {
    const orderChanges = { status: 'cancelled' }
    updateOrder(id, orderChanges, dispatch)
      .then(() => {
        getOrders(dispatch)
      })
  }
  return (
    <div className='order'>
      <p className='name'>Order #{id}</p>
      <p className='order-details'>Order placed: {createdAt}</p>
      <p className='order-details'>
        <span className={`fa fa-circle ${status}`} aria-hidden="true"></span>
        Status: {status}
      </p>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          {products.map(item => {
            return <OrderItem
              key={item.id}
              product={item}
            />
          })}</tbody>
      </table>
      <div>
        {status === 'pending' &&
          <button
            onClick={cancelOrder}
            className='order-button'
          >Cancel Order</button>
        }
      </div>
    </div>
  )
}

export default connect()(Order)
