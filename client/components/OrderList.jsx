import React from 'react'
import { connect } from 'react-redux'

import Order from './Order'

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
    const { children, orders } = this.props
    return (
      <div className='orderlist'>
        {children}
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

function mapStateToProps (state) {
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
