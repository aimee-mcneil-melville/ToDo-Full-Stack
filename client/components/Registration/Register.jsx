import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { registerUser } from './registerHelper'
import { useAuth0 } from '@auth0/auth0-react'

export function Register () {
  const authUser = useAuth0().user

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gardenId: null
  })
  const history = useHistory()

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    registerUser(form, authUser, history.push)
  }

  return (
    <section className='flex-container'>
      <form className='column-6'>
        <div className="field">
          <label htmlFor='firstName' className='form-label'>First Name</label>
          <input
            className='form-input'
            id='firstName'
            name='firstName'
            value={form.firstName}
            placeholder='First Name'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='lastName' className='form-label'>Last Name</label>
          <input
            className='form-input'
            id='lastName'
            name='lastName'
            value={form.lastName}
            placeholder='Last Name'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='username' className='form-label'>Username</label>
          <input
            className='form-input'
            id='username'
            name='username'
            value={form.username}
            placeholder='Username'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='garden' className='form-label'>My Garden</label>
          <select
            onChange={handleChange}
            className='select'
            name='gardenId'
            id='garden'
          >
            <option hidden>Select from this list</option>
            <option value={1}>Kelmarna Gardens</option>
            <option value={2}>Kingsland Community Orchard</option>
            <option value={3}>Devonport Community Garden</option>
          </select>
        </div>
        <button
          type='button'
          className='button-primary'
          onClick={handleClick}
          data-testid='submitButton'
        >
            Register
        </button>
      </form>
      <div className='column-6'>
        <img src='./images/comGardenPlant.png' alt='Person gardening with trowel' />
      </div>
    </section>
  )
}
