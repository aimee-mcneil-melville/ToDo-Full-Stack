import { useState, useEffect } from 'react'
import { useLoaderData} from 'react-router-dom'
import { getWelcome } from '../apiClient'

function App() {
  const welcome = useLoaderData()
  const [welcomeStatement, setWelcomeStatement] = useState(welcome)

  return <h1>{welcomeStatement}</h1>
}

export default App
