import { ChangeEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { deleteFromCart, updateCart } from '../slices/cart'

interface Props {
  item: {
    name: string
    id: number
    quantity: number
  }
}

function CartItem(props: Props) {
  const { name, id, quantity } = props.item
  const dispatch = useAppDispatch()

  function update(e: ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(e.currentTarget.value)
    const isValidQuantity = !isNaN(newQuantity)

    if (isValidQuantity) {
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
