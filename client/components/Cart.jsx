import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from './CartItem'
import WaitIndicator from './WaitIndicator'

import { showError } from '../actions/error'
import {
  deleteFromCart,
  updateCart
} from '../actions/cart'
import {
  postOrderPending,
  postOrderSuccess
} from '../actions/orders'

import { placeOrder } from '../coordinators/orders'
import {
  deleteCartItem,
  updateCartItem,
  createOrder
} from '../coordinators/cart'

export class Cart extends React.Component {
  state = {
    cart: this.props.cart
  }

  update = (id, quantity) => {
    const updateInfo = { id, quantity }
    const { cart } = this.state
    const { updateCart } = this.props
    const newCart = updateCartItem(updateInfo, cart, updateCart)
    this.setState({ cart: newCart })
  }

  deleteItem = (id) => {
    const cart = this.state.cart
    const { deleteFromCart } = this.props
    const newCart = deleteCartItem(id, cart, deleteFromCart)
    this.setState({ cart: newCart })
  }

  placeOrder = () => {
    const { cart } = this.state
    const order = createOrder(cart)
    const { history, postOrderPending, postOrderSuccess, showError } = this.props
    const dispatchers = { postOrderPending, postOrderSuccess, showError }
    placeOrder(order, history, dispatchers)
  }

  render () {
    return this.state.cart.length
      ? (
        <div className='cart'>
          <table>
            <thead>
              <tr>
                <td role='columnheader'>Product</td>
                <td role='columnheader'>Quantity</td>
                <td role='columnheader'>Remove</td>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.map((item, id) => {
                return (
                  <CartItem
                    key={id}
                    item={item}
                    update={this.update}
                    deleteFromCart={this.deleteItem}
                  />)
              })}
            </tbody>
          </table>
          <p className='actions'>
            <Link to='/'>Continue shopping</Link>
            <span>
              <WaitIndicator />
              <button
                className='button-primary'
                onClick={this.placeOrder}>
                Place Order
              </button>
            </span>
          </p>
        </div>
      )
      : <p>Your cart is empty! Start shopping <Link to='/'>here</Link></p>
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = {
  updateCart,
  deleteFromCart,
  postOrderPending,
  postOrderSuccess,
  showError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
