import type * as React from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../hooks'
import CartItem from './CartItem'

interface Props {
  children: React.ReactNode
}

function Cart(props: Props) {
  const { children } = props

  const cart = useAppSelector((state) => state.cart)

  function submitCart() {
    console.log('coming soon!')
  }

  return cart.length ? (
    <div className="cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, id) => {
            return <CartItem key={id} item={item} />
          })}
        </tbody>
      </table>
      <p className="actions">
        <Link to="/">Continue shopping</Link>
        <span>
          {children} {/* Holds the WaitIndicator */}
          <button className="button-primary" onClick={submitCart}>
            Place Order
          </button>
        </span>
      </p>
    </div>
  ) : (
    <p>
      Your cart is empty! Start shopping <Link to="/">here</Link>
    </p>
  )
}

export default Cart
