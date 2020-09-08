import React from 'react'
import { connect } from 'react-redux'

import CartItem from './CartItem'
import WaitIndicator from './WaitIndicator'

import {
  deleteFromCart,
  updateCart
} from '../actions/cart'

import { addOrder } from '../coordinators'

class Cart extends React.Component {
  state = {
    cart: this.props.cart
  }

  update = (id, quantity) => {
    this.setState({
      cart: this.state.cart.map(item => {
        if (item.id === id) item.quantity = Number(quantity)
        return item
      })
    })
  }

  deleteItem = (id) => {
    const cart = this.state.cart.filter(item => item.id !== id)
    this.setState({ cart })
    this.props.deleteFromCart(id)
  }

  keepShopping = () => {
    this.props.history.push('/')
  }

  placeOrder = () => {
    addOrder(this.state.cart, this.props.dispatch)
      .then(() => this.props.history.push('/orders'))
  }

  render () {
    return (
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
            {this.props.cart.map((item, id) => {
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
          <button onClick={this.keepShopping}>Continue shopping</button>
          <button onClick={() => this.props.updateCart(this.state.cart)}>Update</button>
          <span>
            <WaitIndicator />
            <button className='button-primary' onClick={this.placeOrder}>Place Order</button>
          </span>
        </p>
      </div>
    )
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
