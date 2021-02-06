import React from 'react'
import { connect } from 'react-redux'

import {
  deleteFromCart,
  updateCart
} from '../actions/cart'

import { updateCartItem } from '../coordinators/cart'

function CartItem (props) {
  const { name, id, quantity } = props.item

  function update (e) {
    const quantity = e.target.value
    const updateInfo = { id, quantity }
    const { updateCart } = props
    updateCartItem(updateInfo, updateCart)
  }

  function deleteItem () {
    props.deleteFromCart(id)
  }

  const displayQuantity = (quantity === 0) ? '' : quantity
  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          aria-label='quantity'
          className='update-input'
          value={displayQuantity}
          onChange={update} />
      </td>
      <td><button aria-label='delete' onClick={deleteItem}>
        <span className='fa fa-trash fa-2x' />
      </button></td>
    </tr>
  )
}

const mapDispatchToProps = {
  updateCart,
  deleteFromCart
}

export default connect(null, mapDispatchToProps)(CartItem)
