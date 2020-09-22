import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from './CartItem'

import { showError } from '../actions/error'
import {
  postOrderPending,
  postOrderSuccess
} from '../actions/orders'

import { placeOrder } from '../coordinators/orders'

export const Cart = (props) => {
  const { cart, children } = props

  const submitCart = () => {
    const { history, postOrderPending, postOrderSuccess, showError } = props
    const dispatchers = { postOrderPending, postOrderSuccess, showError }
    placeOrder(cart, history, dispatchers)
  }

  return cart.length
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
            {cart.map((item, id) => {
              return (
                <CartItem
                  key={id}
                  item={item}
                />)
            })}
          </tbody>
        </table>
        <p className='actions'>
          <Link to='/'>Continue shopping</Link>
          <span>
            {children}
            <button
              className='button-primary'
              onClick={submitCart}>
              Place Order
            </button>
          </span>
        </p>
      </div>
    )
    : <p>Your cart is empty! Start shopping <Link to='/'>here</Link></p>
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = {
  postOrderPending,
  postOrderSuccess,
  showError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
