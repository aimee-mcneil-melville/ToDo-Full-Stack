import { useState, useEffect } from 'react'

import * as Models from '../../models/Widget'
import { getWidgets } from '../apiClient'
import Widget from './Widget'

function App() {
  const [widgets, setWidgets] = useState([] as Models.Widget[])

  useEffect(() => {
    getWidgets()
      .then((widgets) => setWidgets(widgets))
      .catch((e: unknown) => console.error(e))
  }, [])

  return (
    <div>
      <h1>Widgets for the win!</h1>
      {widgets.map((widget: Models.Widget) => (
        <Widget key={widget.id} {...widget} />
      ))}
    </div>
  )
}

export default App
