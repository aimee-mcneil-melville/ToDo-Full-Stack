import { useState, useEffect } from 'react'

import * as Models from '../../models/Widget'
import { getWidgets, addWidget } from '../apiClient'
import Widget from './Widget'
import WidgetForm from './WidgetForm'

function App() {
  const [widgets, setWidgets] = useState([] as Models.Widget[])
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('' as string)

  useEffect(() => {
    getWidgets()
      .then((widgets) => setWidgets(widgets))
      .catch((e: Error) => setError(e.message))
  }, [])

  const submitWidget = (widget: Models.WidgetData) => {
    addWidget(widget)
      .then((widgets) => setWidgets(widgets))
      .finally(() => setShowForm(false))
      .catch((e: Error) => setError(e.message))
  }
  // API returns 200 status and state is filtered here to remove the deleted widget
  // Alternate option would be as above to return the updated list of widgets from the API
  const delWidget = (id: number) => {
    setWidgets((widgets) => widgets.filter((widget) => widget.id !== id))
  }

  // API returns the updated widget and state is updated here
  const patchWidget = (updatedWidget: Models.Widget) => {
    setWidgets((widgets) =>
      widgets.map((widget) =>
        widget.id === updatedWidget.id ? updatedWidget : widget
      )
    )
  }

  if (error) return <div className="error-message">{error}</div>
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
