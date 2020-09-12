import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from './CartItem'
import WaitIndicator from './WaitIndicator'

import {
  deleteFromCart,
  updateCart
} from '../actions/cart'

import {
  placeOrder,
  deleteCartItem,
  updateCartItem
} from './ui-helpers'

export class Cart extends React.Component {
  state = {
    cart: this.props.cart
  }

  update = (id, quantity) => {
    const updateInfo = { id, quantity }
    const cart = this.state.cart
    updateCartItem(updateInfo, cart, this)
  }

  deleteItem = (id) => {
    const cart = this.state.cart
    deleteCartItem(id, cart, this)
  }

  placeOrder = () => {
    const { cart } = this.state
    const { history, dispatch } = this.props
    placeOrder(cart, history, dispatch)
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (id) => dispatch(deleteFromCart(id)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
