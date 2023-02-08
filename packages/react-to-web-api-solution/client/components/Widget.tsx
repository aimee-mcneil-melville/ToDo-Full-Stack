import { useState } from 'react'
import * as Models from '../../models/Widget'
import { deleteWidget, updateWidget } from '../apiClient'
import WidgetForm from './WidgetForm'
interface Props extends Models.Widget {
  delWidget: (id: number) => void
  patchWidget: (widget: Models.Widget) => void
}

export default function Widget(props: Props) {
  const { id, name, price, mfg, inStock, rating, delWidget, patchWidget } =
    props
  const [edit, setEdit] = useState(false)
  const [error, setError] = useState('' as string)

  const editWidget = (widget: Models.WidgetData) => {
    updateWidget(id, widget)
      .then((widget: Models.Widget) => patchWidget(widget))
      .finally(() => setEdit(false))
      .catch((e: Error) => setError(e.message))
  }

  const removeWidget = () => {
    deleteWidget(id)
      .then(() => delWidget(id))
      .catch((e: Error) => setError(e.message))
  }

  if (error) return <div className="error-message">{error}</div>
  return (
    <>
      {!edit ? (
        <div className="widget-details">
          <h3>{name}</h3>
          <p>Price: {price}</p>
          <p>Manufacturer: {mfg}</p>
          <p>In stock: {inStock}</p>
          <p>Rating: {rating}/5</p>
          <button onClick={removeWidget}>Delete</button>
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
