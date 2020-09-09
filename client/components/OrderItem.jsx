import React from 'react'

const OrderItem = (props) => {
  const { name, quantity } = props.product
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
    </tr>
  )
}

export default OrderItem
