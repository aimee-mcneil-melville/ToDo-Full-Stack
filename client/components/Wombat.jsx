import React from 'react'
import store from '../store'

function Wombat(props) {
  const wombat = props.name

  function handleDelete() {
    store.dispatch({ type: 'DEL_WOMBAT', wombat: wombat})
    
  }

  return (
    <div>
      <p>{wombat}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Wombat

