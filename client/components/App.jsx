import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import { getGardens } from '../apiClient'

function App () {
  const [gardens, setGardens] = useState([])

  useEffect(() => {
    getGardens().then(setGardens)
  }, [])

  return (
    <div className="app">

      <h1>Gardenz</h1>
      <Route exact path='/register' component={} />
      <ul>
        {gardens.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
