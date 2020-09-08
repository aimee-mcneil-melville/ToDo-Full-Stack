import React from 'react'

import OrderItem from './OrderItem'

const OrderDetails = (props) => {
  const { id, products } = props.order
  return (Number(props.match?.params.id) === id
    ? (
    <>
    <table>
      <thead>
        <tr>
          <td>Product</td>
          <td>Quantity</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        {products.map(item => {
          return <OrderItem
            key={item.id}
            product={item}
            update={props.updateOrderLine}
            deleteFromOrder={props.deleteFromOrder} />
        })}</tbody>
    </table>
    <div>
      <button className='order-button'>Update</button>
    </div>
    </>
  )
  : null)
}

export default OrderDetails
