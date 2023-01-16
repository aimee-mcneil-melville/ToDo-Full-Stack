interface Props {
  product: {
    name: string
    quantity: number
  }
}

function OrderItem(props: Props) {
  const { name, quantity } = props.product
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
    </tr>
  )
}

export default OrderItem
