import React from 'react'
import { useSelector } from 'react-redux'
import Wombat from './Wombat'

function Wombats() {
  const wombats = useSelector((state) => state.wombats)

  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat) => (
          <li key={wombat}>
            <Wombat name={wombat} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Wombats
