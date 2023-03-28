import { useState, FormEvent, ChangeEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { addWombat } from '../actions'

function AddWombat() {
  const dispatch = useAppDispatch()
  const [newWombat, setNewWombat] = useState('')

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setNewWombat(evt.target.value)
  }
  function handleSubmit(evt: FormEvent) {
    evt.preventDefault()
    // STEP 3: dispatch the action from the component
    // dispatch({
    //   type: 'ADD_WOMBAT',
    //   payload: newWombat,
    // })

    // STEP 6: Refactor to use the action creator
    dispatch(addWombat(newWombat))
    setNewWombat('')
  }
  return (
    <>
      <h2>Add New Wombat</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newWombat">Name</label>
        <input
          id="newWombat"
          type="text"
          name="name"
          onChange={handleChange}
          value={newWombat}
        />
        <button type="submit" aria-label="submit">
          +
        </button>
      </form>
    </>
  )
}

export default AddWombat
