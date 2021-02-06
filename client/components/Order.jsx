import React from 'react'
import { connect } from 'react-redux'

import OrderItem from './OrderItem'

import {
  patchOrderPending,
  patchOrderSuccess
} from '../actions/orders'
import { showError } from '../actions/error'

import { updateOrder } from '../coordinators/orders'

const Order = (props) => {
  const { patchOrderPending, patchOrderSuccess, showError, order } = props
  const { id, products, createdAt, status } = order

  const updateStatus = status => {
    const orderChanges = { status }
    const dispatchers = { patchOrderPending, patchOrderSuccess, showError }
    updateOrder(id, orderChanges, dispatchers)
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
            <td role='columnheader'>Product</td>
            <td role='columnheader'>Quantity</td>
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
          <>
            <button
              onClick={() => updateStatus('cancelled')}
              className='order-button'
            >Cancel Order</button>
            <button
              onClick={() => updateStatus('completed')}
              className='order-button button-primary'
            >Order Received</button>
          </>
        }
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  patchOrderPending,
  patchOrderSuccess,
  showError
}

export default connect(null, mapDispatchToProps)(Order)
