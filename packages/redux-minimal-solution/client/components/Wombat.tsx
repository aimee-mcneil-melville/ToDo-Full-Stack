import { useState } from 'react'
import type { ChangeEvent } from 'react'
import store from '../store'

interface Props {
  name: string
}

function Wombat(props: Props) {
  const wombat = props.name
  const [input, setInput] = useState('')

  function handleDelete() {
    store.dispatch({
      type: 'DEL_WOMBAT',
      payload: wombat,
    })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }

  function handleUpdate() {
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
      <button onClick={handleDelete} aria-label="delete">
        X
      </button>
      &nbsp;
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default Wombat
