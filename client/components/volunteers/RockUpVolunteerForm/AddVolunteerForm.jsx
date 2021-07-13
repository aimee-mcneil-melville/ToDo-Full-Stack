import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { addVolunteer } from './AddVolunteerFormHelper'

export default function AddVolunteerForm ({ addExtraVolunteer }) {
  const { id } = useParams()

  const [form, setForm] = useState({
    eventId: id,
    firstName: '',
    lastName: ''
  })

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    addVolunteer(form, addExtraVolunteer)
    setForm({ eventId: id, firstName: '', lastName: '' })
  }

  return (
    <>
      <h2>Add Rock-Up Attendee</h2>

      <form>
        <div className=''>
          <label htmlFor='firstname' className=''>First name</label>
          <input
            className='input'
            id='firstName'
            name='firstName'
            value={form.firstName}
            onChange={handleChange}
            placeholder='First name'
            type='text'
          />
        </div>
        <div className=''>
          <label htmlFor='lastname' className=''>Last name</label>
          <input
            className='input'
            id='lastName'
            name='lastName'
            value={form.lastName}
            onChange={handleChange}
            placeholder='Last name'
            type='text'
          />
        </div>
        <button
          className='button'
          data-testid='submit-button'
          onClick={handleClick}
        >Add
        </button>
      </form>
    </>
  )
}
