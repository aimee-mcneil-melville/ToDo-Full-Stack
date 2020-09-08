import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import OrderDetails from './OrderDetails'

import { cancelOrder } from '../api-helpers'

const Order = props => {
  const { order, history } = props
  const { id, createdAt, updatedAt } = order
  return (
    <div className='order'>
      <p className='name'>Order #{id}</p>
      <p>
        <span>
          <span className='timestamp'>Order placed: {createdAt}</span>
          <br />
          <span className='timestamp'>Last updated: {updatedAt}</span>
        </span>
        <span className='actions'>
          <button onClick={() => cancelOrder(id, props.dispatch)}>
            <span className='fa fa-trash fa-2x' />
          </button>
          <button className='order-button'>
            <Link to={`/orders/${id}`}>View Order</Link>
          </button>
        </span>
      </p>
      <Route path='/orders/:id' render={(props) => {
        return <OrderDetails
          order={order}
          history={history}
          match={props.match} />
      }} />
    </div>
  )
}

export default connect()(Order)
