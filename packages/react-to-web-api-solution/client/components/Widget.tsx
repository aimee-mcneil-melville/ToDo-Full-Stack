import { useState } from 'react'
import * as Models from '../../models/Widget'
import { updateWidget } from '../apiClient'
import WidgetForm from './WidgetForm'
interface Props extends Models.Widget {
  delWidget: (id: number) => void
  patchWidget: (widget: Models.Widget) => void
}

export default function Widget(props: Props) {
  const { id, name, price, mfg, inStock, delWidget, patchWidget } = props
  const [edit, setEdit] = useState(false)

  const editWidget = (widget: Models.WidgetData) => {
    updateWidget(id, widget)
      .then((widget: Models.Widget) => patchWidget(widget))
      .finally(() => setEdit(false))
      .catch((e: unknown) => console.error(e))
  }

  return (
    <>
      {!edit ? (
        <div className="widget-details">
          <h3>{name}</h3>
          <p>Price: {price}</p>
          <p>Manufacturer: {mfg}</p>
          <p>In stock: {inStock}</p>
          <button onClick={() => delWidget(id)}>Delete</button>
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      ) : (
        <WidgetForm
          submitWidget={editWidget}
          setShowForm={setEdit}
          {...props}
        />
      )}
    </>
  )
}
