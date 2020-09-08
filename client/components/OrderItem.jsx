import React from 'react'

const OrderItem = (props) => {
  const { name, quantity, id } = props.product
  return (
    <tr>
      <td>{name}</td>
      <td>
        <input
          className='update-input'
          value={quantity}
          onChange={(e) => props.update(id, e.target.value)} />
      </td>
      <td><button onClick={() => props.deleteFromOrder(id)}>
        <span className='fa fa-trash fa-2x' />
      </button></td>
    </tr>
  )
}

export default OrderItem

