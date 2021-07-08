import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {} from './AddVolunteerFormHelper'

export default function AddVolunteerForm () {
  const [form, setForm] = useState({
    first_name: '',
    last_name: ''
  })
  const history = useHistory

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    // function from Helper
  }

  return (
    <>
      <h2></h2>
      <form>
        <div className=''>
          <label htmlFor='firstname' className=''>First name</label>
          <input
            className='input'
            id='firstname'
            name='firstname'
            value={form.first_name}
            onChange={handleChange}
            placeholder='First name'
            type='text'
          />
        </div>
        <div className=''>
          <label htmlFor='lastname' className=''>Last name</label>
          <input
            className='input'
            id='lastname'
            name='lastname'
            value={form.last_name}
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
