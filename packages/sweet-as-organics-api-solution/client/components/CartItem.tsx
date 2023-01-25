<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/CartItem.tsx
import type * as React from 'react'
import { useDispatch } from 'react-redux'
import { CartItemWithQuantity } from '../../common/interfaces'

=======
import { ChangeEvent } from 'react'
>>>>>>> main:packages/sweet-as-organics-api/client/components/CartItem.tsx
import { deleteFromCart, updateCart } from '../actions/cart'
import { useAppDispatch } from '../hooks'

interface Props {
<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/CartItem.tsx
  item: CartItemWithQuantity
=======
  item: {
    name: string
    id: number
    quantity: number
  }
>>>>>>> main:packages/sweet-as-organics-api/client/components/CartItem.tsx
}

function CartItem(props: Props) {
  const { name, id, quantity } = props.item
  const dispatch = useAppDispatch()

  function update(e: ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(e.currentTarget.value)
    const isValidQuantity = !isNaN(newQuantity)

<<<<<<< HEAD:packages/sweet-as-organics-api-solution/client/components/CartItem.tsx
  function update(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = parseInt(e.target.value)
    if (!newQuantity) {
=======
    if (isValidQuantity) {
>>>>>>> main:packages/sweet-as-organics-api/client/components/CartItem.tsx
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
