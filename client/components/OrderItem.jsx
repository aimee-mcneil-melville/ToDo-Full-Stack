import React from 'react'

function OrderItem (props) {
  const { name, quantity } = props.product
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
    </tr>
  )
}

export default OrderItem
