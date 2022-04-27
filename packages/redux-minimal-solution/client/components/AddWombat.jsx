import React, { useState } from 'react'
import store from '../store'

function AddWombat () {
  const [input, setInput] = useState('')

  function handleChange (event) {
    setInput(event.target.value)
  }

  function handleAdd () {
    store.dispatch({
      type: 'ADD_WOMBAT',
      wombat: input
    })
  }
  return (
    <section>
      <input value={input} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </section>
  )
}

export default AddWombat
