import React from 'react'

const CartItem = (props) => {
  const { name, id, quantity } = props.item
  const displayQuantity = (quantity === 0) ? '' : quantity

  const updateCart = e => {
    props.update(id, e.target.value)
  }

  const deleteItem = () => {
    props.deleteFromCart(id)
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          aria-label='quantity'
          className='update-input'
          value={displayQuantity}
          onChange={updateCart} />
      </td>
      <td><button aria-label='delete' onClick={deleteItem}>
        <span className='fa fa-trash fa-2x' />
      </button></td>
    </tr>
  )
}

export default CartItem
