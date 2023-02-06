import { useState, useEffect } from 'react'

import * as Models from '../../models/Widget'
import { getWidgets, addWidget, deleteWidget } from '../apiClient'
import Widget from './Widget'
import WidgetForm from './WidgetForm'

function App() {
  const [widgets, setWidgets] = useState([] as Models.Widget[])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    getWidgets()
      .then((widgets) => setWidgets(widgets))
      .catch((e: unknown) => console.error(e))
  }, [])

  const submitWidget = (widget: Models.WidgetData) => {
    addWidget(widget)
      .then((widgets) => setWidgets(widgets))
      .finally(() => setShowForm(false))
      .catch((e: unknown) => console.error(e))
  }

  const delWidget = (id: number) => {
    deleteWidget(id)
      .then(() => {
        setWidgets(widgets.filter((widget) => widget.id !== id))
      })
      .catch((e: unknown) => console.error(e))
  }

  const patchWidget = (updatedWidget: Models.Widget) => {
    setWidgets(
      widgets.map((widget) =>
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    )
  }

  return (
    <div>
      <h1>Widgets for the win!</h1>

      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          {...widget}
          delWidget={delWidget}
          patchWidget={patchWidget}
        />
      ))}

      {showForm ? (
        <WidgetForm submitWidget={submitWidget} setShowForm={setShowForm} />
      ) : (
        <button onClick={() => setShowForm(true)}>Add Widget</button>
      )}
    </div>
  )
}

export default App
