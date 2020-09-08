import React from 'react'
import { connect } from 'react-redux'

import OrderItem from './OrderItem'

import { updateOrder } from '../api-helpers'

class OrderDetails extends React.Component {
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

  submitUpdate = () => {
    updateOrder(this.state.order, this.props.dispatch)
      .then(() => this.props.history.push('/orders'))
  }

  render () {
    const { id, products } = this.state.order
    return (Number(this.props.match?.params.id) === id
      ? (
      <>
      <table>
        <thead>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {products.map(item => {
            return <OrderItem
              key={item.id}
              product={item}
              update={this.updateOrderLine}
              deleteFromOrder={this.deleteFromOrder} />
          })}</tbody>
      </table>
      <div>
        <button onClick={this.submitUpdate} className='button-primary order-button'>Update</button>
      </div>
      </>
      )
      : null)
  }
}

export default connect()(OrderDetails)
