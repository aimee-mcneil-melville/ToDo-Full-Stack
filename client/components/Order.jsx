import React from 'react'
import { Link, Route } from 'react-router-dom'

import OrderDetails from './OrderDetails'

class Order extends React.Component {
  state = {
    order: this.props.order
  }

  updateOrderLine = (id, quantity) => {
    const order = { ...this.state.order }
    const itemToUpdate = order.products.find(item => id === item.id)
    itemToUpdate.quantity = quantity
    this.setState({ order })
  }

  deleteFromOrder = (id) => {
    let order = { ...this.state.order }
    const newProductList = order.products.filter(item => item.id !== id)
    order.products = newProductList
    this.setState({ order })
  }

  render () {
    const { id, createdAt, updatedAt } = this.state.order
    return (
      <div className='order'>
        <p className='name'>Order #{id}</p>
        <p>
          <span>
            <span className='timestamp'>Order placed: {createdAt}</span>
            <br />
            <span className='timestamp'>Last updated: {updatedAt}</span>
          </span>
          <button className='order-button'>
            <Link to={`/orders/${id}`}>View Order</Link>
          </button>
        </p>
        <Route path='/orders/:id' render={(props) => {
          return <OrderDetails
            order={this.state.order}
            updateOrderLine={this.updateOrderLine}
            deleteFromOrder={this.deleteFromOrder}
            match={props.match} />
        }} />
      </div>
    )
  }
}

export default Order
