import React from 'react'
import { connect } from 'react-redux'

import Order from './Order'
import WaitIndicator from './WaitIndicator'

class OrderList extends React.Component {
  componentDidMount () {
    // getOrders
  }
  render () {
    const { orders, history } = this.props
    return (
      <div className='orderlist'>
        <WaitIndicator />
        {orders.map(order => {
          return (
            <Order
              key={order.id}
              order={order}
              history={history}
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
