import React, { useState, useEffect } from 'react'

import { getGardens } from '../apiClient'
import AuthForm from './Register'

function App() {
  const [gardens, setGardens] = useState([])

  useEffect(() => {
    getGardens().then(setGardens)
  }, [])

  return (
    <div className='app'>
      <h1>Gardenz</h1>
      <ul>
        {gardens.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <AuthForm />
    </div>
  )
}

export default App
