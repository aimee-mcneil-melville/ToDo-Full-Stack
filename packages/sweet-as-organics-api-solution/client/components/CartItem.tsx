import type * as React from 'react'
import { CartItemWithQuantity } from '../../common/interfaces'

import { deleteFromCart, updateCart } from '../actions/cart'
import { useAppDispatch } from '../hooks'

interface Props {
  item: CartItemWithQuantity
}

function CartItem(props: Props) {
  const { name, id, quantity } = props.item
  const dispatch = useAppDispatch()

  function update(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(e.target.value)
    if (!newQuantity) {
      const updateInfo = { id, newQuantity }
      dispatch(updateCart(updateInfo))
    }
  }

  function deleteItem() {
    dispatch(deleteFromCart(id))
  }

  const displayQuantity = quantity === 0 ? '' : quantity
  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          aria-label="quantity"
          className="update-input"
          value={displayQuantity}
          onChange={update}
        />
      </td>
      <td>
        <button aria-label="delete" onClick={deleteItem}>
          <span className="fa fa-trash fa-2x" />
        </button>
      </td>
    </tr>
  )
}

export default CartItem
