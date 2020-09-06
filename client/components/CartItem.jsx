import React from 'react'

const CartItem = (props) => {
  const name = props.item.name
  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          className='update-input'
          value={props.item.quantity}
          onChange={(e) => props.update(props.item.id, e.target.value)} />
      </td>
      <td><button onClick={() => props.deleteFromCart(props.item.id)}>
        <span className='fa fa-trash fa-2x' />
      </button></td>
    </tr>
  )
}

export default CartItem
