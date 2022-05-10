import React, { useState } from 'react'
import store from '../store'

function Wombat(props) {
  const { wombat } = props
  const [input, setInput] = useState('')

  function handleDelete(event) {
    event.preventDefault()
    store.dispatch({
      type: 'DEL_WOMBAT',
      payload: wombat,
    })
  }

  function handleChange(event) {
    setInput(event.target.value)
  }

  function handleUpdate(event) {
    event.preventDefault()
    store.dispatch({
      type: 'UPDATE_WOMBAT',
      payload: {
        oldWombat: wombat,
        newWombat: input,
      },
    })
  }
  return (
    <div>
      <p>{wombat}</p>
      <input value={input} onChange={handleChange} />
      <a href="" onClick={handleDelete}>
        X
      </a>
      &nbsp;
      <a href="" onClick={handleUpdate}>
        Update
      </a>
    </div>
  )
}

export default Wombat
