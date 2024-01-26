import { useState, useEffect } from 'react'
import { getGreeting } from '../apiClient.ts'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [count, setCount] = useState(0)

  const {
    data: greeting,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['greeting', count], queryFn: getGreeting })

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      {count}
      <h1>{greeting}</h1>
      {isError && (
        <p style={{ color: 'red' }}>
          There was an error retrieving the greeting.
        </p>
      )}
      <button onClick={() => setCount(count + 1)}>Click</button>
    </>
  )
}

export default App
