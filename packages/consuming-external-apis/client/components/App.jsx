import React, { useState, useEffect } from 'react'

import { getWelcome } from '../api'

function App() {
  const [welcomeStatement, setWelcomeStatement] = useState('')

  useEffect(() => {
    getWelcome()
      .then((res) => {
        setWelcomeStatement(res.statement)
        return null
      })
      .catch((err) => {
        console.error(err.message)
      })
  })

  return <h1>{welcomeStatement}</h1>
}

export default App
