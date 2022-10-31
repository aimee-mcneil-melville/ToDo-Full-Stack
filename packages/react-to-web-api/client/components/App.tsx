import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { TWidget } from '../../server/db/db'

type TJustName = Pick<TWidget, 'name'>
function App() {
  const [widgets, setWidgets] = useState<Array<TJustName>>([])
  const widgetList = useLoaderData()
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = event.currentTarget.elements.namedItem(
      'widget'
    ) as HTMLInputElement
    const newWidget: TJustName = {
      name: input.value,
    }
    setWidgets((widgets) => [...widgets, newWidget])
  }
  return (
    <div>
      <h1>Widgets for the win!</h1>
      {widgets && widgets.map((widget, i) => <p key={i}>{widget.name}</p>)}
      <form onSubmit={handleSubmit}>
        <input type="text" name="widget" required />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App
