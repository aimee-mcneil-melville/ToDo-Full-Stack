import * as Models from '../../models/Widget'

type Props = Models.Widget

export default function Widget(props: Props) {
  const { name, price, mfg, inStock } = props

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Manufacturer: {mfg}</p>
      <p>In stock: {inStock}</p>
    </div>
  )
}
