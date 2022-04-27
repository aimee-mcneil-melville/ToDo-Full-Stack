import React, { useState } from 'react'
import store from '../store'

function Wombat (props) {
  const { data } = props
  const [input, setInput] = useState('')

  function handleDelete (event) {
    event.preventDefault()
    store.dispatch({
      type: 'DEL_WOMBAT',
      wombat: data
    })
  }

  function handleChange (event) {
    setInput(event.target.value)
  }

  function handleUpdate (event) {
    event.preventDefault()
    store.dispatch({
      type: 'UPDATE_WOMBAT',
      old: data,
      new: input
    })
  }
  return (
    <div>
      <p>{data}</p>
      <input value={input} onChange={handleChange} />
      <a href="" onClick={handleDelete}>X</a>
      <a href="" onClick={handleUpdate}>Update</a>
    </div>
  )
}

export default Wombat
