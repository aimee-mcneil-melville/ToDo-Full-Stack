import { useState, useEffect } from 'react'

import * as Models from '../../models/Widget'
import { getWidgets, addWidget } from '../apiClient'
import Widget from './Widget'
import AddWidget from './AddWidget'

function App() {
  const [widgets, setWidgets] = useState([] as Models.Widget[])
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    getWidgets()
      .then((widgets) => setWidgets(widgets))
      .catch((e: unknown) => console.error(e))
  }, [])

  const submitWidget = (widget: Models.WidgetData) => {
    addWidget(widget)
      .then((widgets) => setWidgets(widgets))
      .finally(() => setShowAdd(false))
      .catch((e: unknown) => console.error(e))
  }

  return (
    <div>
      <h1>Widgets for the win!</h1>

      {widgets.map((widget) => (
        <Widget key={widget.id} {...widget} />
      ))}

      {showAdd ? (
        <AddWidget submitWidget={submitWidget} setShowAdd={setShowAdd} />
      ) : (
        <button onClick={() => setShowAdd(true)}>Add Widget</button>
      )}
    </div>
  )
}

export default App
