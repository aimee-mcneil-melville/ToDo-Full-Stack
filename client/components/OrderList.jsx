import React from 'react'
import { connect } from 'react-redux'

import Order from './Order'
import WaitIndicator from './WaitIndicator'

import { getOrders } from '../api-helpers'

class OrderList extends React.Component {
  componentDidMount () {
    getOrders(this.props.dispatch)
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

export default connect(
  mapStateToProps
)(OrderList)
