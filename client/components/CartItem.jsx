import React from 'react'
import { useDispatch } from 'react-redux'

import {
  deleteFromCart,
  updateCart
} from '../actions/cart'

function CartItem (props) {
  const { name, id, quantity } = props.item
  const dispatch = useDispatch()

  function update (e) {
    const newQuantity = e.target.value
    const isValidQuantity = !isNaN(Number(newQuantity))
    if (isValidQuantity) {
      const updateInfo = { id, newQuantity }
      dispatch(updateCart(updateInfo))
    }
  }

  function deleteItem () {
    dispatch(deleteFromCart(id))
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

export default CartItem
