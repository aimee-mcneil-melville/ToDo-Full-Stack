import { CartItemWithQuantity } from '../../models/product'

interface Props {
  product: CartItemWithQuantity
}

export default function OrderItem(props: Props) {
  const { name, quantity } = props.product

  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
    </tr>
  )
}
