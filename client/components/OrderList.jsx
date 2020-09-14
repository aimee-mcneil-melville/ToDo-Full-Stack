import React from 'react'
import { connect } from 'react-redux'

import Order from './Order'
import WaitIndicator from './WaitIndicator'

import { fetchOrdersPending, fetchOrdersSuccess } from '../actions/orders'
import { showError } from '../actions/error'

import { getOrders } from '../coordinators/orders'

class OrderList extends React.Component {
  componentDidMount () {
    const { fetchOrdersPending, fetchOrdersSuccess, showError } = this.props
    const dispatchers = { fetchOrdersPending, fetchOrdersSuccess, showError }
    getOrders(dispatchers)
  }

  render () {
    const { orders } = this.props
    return (
      <div className='orderlist'>
        <WaitIndicator />
        {orders.map(order => {
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
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = {
  fetchOrdersPending,
  fetchOrdersSuccess,
  showError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)
