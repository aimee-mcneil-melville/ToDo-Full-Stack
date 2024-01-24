import { useState, useEffect } from 'react'

import { getAmiiboWithName } from '../apiClient.ts'
import { AmiiboCollection } from '../../models/amiibo.ts'

function App() {
  const [collection, setCollection] = useState<AmiiboCollection | null>(null)
  const [error, setError] = useState<string | null>(null)

  // useEffect cannot return a promise, so we often define
  // an async function _inside_ the useEffect call
  useEffect(() => {
    async function update() {
      const data = await getAmiiboWithName('Link')
      try {
        setCollection(data)
      } catch (err) {
        setError(String(err))
      }
    }

    update()
    // we list zero dependencies here, (i.e. an empty array) so that our
    // function is called when the component mounts first and we give no reasons why the function
    // needs to be run again
  }, [])

  if (error) {
    return <p>Something went wrong: {error}</p>
  }

  if (!collection) {
    return <>Loading...</>
  }

  return (
    <ul>
      {collection.amiibo.map((value) => (
        <li key={value.head + value.tail}>
          <h3>
            {value.name} - {value.amiiboSeries}
          </h3>
          <img src={value.image} alt={value.name} />
        </li>
      ))}
    </ul>
  )
}

export default App
