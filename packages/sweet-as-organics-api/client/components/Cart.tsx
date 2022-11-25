import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../hooks'
import CartItem from './CartItem'

interface Props {
  children: ReactNode
  history: unknown
}

function Cart({ children }: Props) {
  const cart = useAppSelector((state) => state.cart)

  function submitCart() {
    console.log('coming soon!')
  }

  return cart.length ? (
    <div className="cart">
      <table>
        <thead>
          <tr>
            <td role="columnheader">Product</td>
            <td role="columnheader">Quantity</td>
            <td role="columnheader">Remove</td>
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
