import React from 'react'
import Wombat from './Wombat'

import store from '../store'

function Wombats () {
  const state = store.getState()
  const wombats = state.wombats
  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat) =>
          <li>
            <Wombat name={wombat} />
          </li>
        )}
      </ul>
    </div>
  )
}

export default Wombats
