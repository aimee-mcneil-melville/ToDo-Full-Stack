import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import CartItem from './CartItem'
import WaitIndicator from './WaitIndicator'

import {
  deleteFromCart,
  updateCart
} from '../actions/cart'

import { addOrder } from '../api-helpers'

export class Cart extends React.Component {
  state = {
    cart: this.props.cart
  }

  update = (id, quantity) => {
    this.setState({
      cart: this.state.cart.map(item => {
        const newQuantity = (item.id === id) ? Number(quantity) : item.quantity
        return { ...item, quantity: newQuantity }
      })
    }, () => this.props.updateCart(this.state.cart))
  }

  deleteItem = (id) => {
    const cart = this.state.cart.filter(item => item.id !== id)
    this.setState({ cart })
    this.props.deleteFromCart(id)
  }

  placeOrder = () => {
    addOrder(this.state.cart, this.props.dispatch)
      .then(() => this.props.history.push('/orders'))
  }

  render () {
    return this.state.cart.length
      ? (
        <div className='cart'>
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Quantity</td>
                <td>Remove</td>
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
