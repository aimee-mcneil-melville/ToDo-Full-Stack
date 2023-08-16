import { useState, ChangeEvent } from 'react'

import store from '../store.ts'

function AddWombat() {
  const [input, setInput] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }

  function handleAdd() {
    store.dispatch({
      type: 'ADD_WOMBAT',
      payload: input,
    })
    setInput('')
  }
  return (
    <section>
      <input value={input} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </section>
  )
}

export default AddWombat
