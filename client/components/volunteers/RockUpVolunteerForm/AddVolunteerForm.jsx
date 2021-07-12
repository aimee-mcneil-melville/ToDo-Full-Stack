import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { addVolunteer } from './AddVolunteerFormHelper'
import { useParams } from 'react-router-dom'

export default function AddVolunteerForm () {
  const { id } = useParams()

  const [form, setForm] = useState({
    eventId: id,
    firstName: '',
    lastName: ''
  })

  // const history = useHistory

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    addVolunteer(form)
    setForm({ eventId: id, firstName: '', lastName: '' })
  }

  return (
    <>
      <h2></h2>
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
