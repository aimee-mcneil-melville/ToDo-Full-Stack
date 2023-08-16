import Wombat from './Wombat.tsx'

import store from '../store.ts'

function Wombats() {
  const state = store.getState()
  const wombats = state.wombats

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
