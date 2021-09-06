import React from 'react'
import Wombat from './Wombat'
import store from '../store'
import AddWombat from './AddWombat'

function Wombats () {
  const state = store.getState()
  const wombats = state.wombats

  return (
    <div>
      <h1>Wombats</h1>
      <ul>
        {wombats.map((wombat) =>
          <li key={wombat}><Wombat data={wombat}/></li>
        )}
      </ul>
      <AddWombat />
    </div>
  )
}

export default Wombats
