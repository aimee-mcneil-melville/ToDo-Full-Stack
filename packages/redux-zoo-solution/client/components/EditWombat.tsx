import { useState, FormEvent, ChangeEvent } from 'react'
import { Props } from './Wombat'
import { useAppDispatch } from '../hooks'
import { deleteWombat, updateWombat } from '../actions'

function EditWombat(props: Props) {
  const wombat = props.name

  const dispatch = useAppDispatch()
  const [newName, setNewName] = useState('')

  function handleDelete() {
    // STEP 4: dispatch the action from the component
    // dispatch({
    //   type: 'DEL_WOMBAT',
    //   payload: wombat,
    // })

    // STEP 6: Refactor to use the action creator
    dispatch(deleteWombat(wombat))
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setNewName(evt.target.value)
  }
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    // STEP 5: dispatch the action from the component
    // dispatch({
    //   type: 'UPDATE_WOMBAT',
    //   payload: { old: wombat, new: newName },
    // })

    //STEP 6: Refactor to use the action creator
    dispatch(updateWombat(wombat, newName))
    setNewName('')
  }
  return (
    <>
      <button onClick={handleDelete} aria-label="delete">
        x
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`${wombat}-newName`}>Update Wombat: </label>
        <input
          id={`${wombat}-newName`}
          type="text"
          name="name"
          onChange={handleChange}
          value={newName}
        />
        <button type="submit" aria-label="update">
          ✓
        </button>
      </form>
    </>
  )
}

export default EditWombat
