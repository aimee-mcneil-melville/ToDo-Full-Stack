import * as Models from '../../models/Widget'
interface Props extends Models.Widget {
  delWidget: (id: number) => void
}

export default function Widget(props: Props) {
  const { id, name, price, mfg, inStock, delWidget } = props

  return (
    <div className="widget-details">
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Manufacturer: {mfg}</p>
      <p>In stock: {inStock}</p>
      <button onClick={() => delWidget(id)}>Delete</button>
    </div>
  )
}
