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
          <label htmlFor='firstName' className='label'>First Name</label>
          <input
            className='form-box'
            id='firstName'
            name='firstName'
            value={form.firstName}
            placeholder='First Name'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='lastName' className='label'>Last Name</label>
          <input
            className='form-box'
            id='lastName'
            name='lastName'
            value={form.lastName}
            placeholder='Last Name'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='username' className='label'>Username</label>
          <input
            className='form-box'
            id='username'
            name='username'
            value={form.username}
            placeholder='Username'
            onChange={handleChange}
          ></input>
        </div>
        <div className="field">
          <label htmlFor='garden' className='label'>My Garden</label>
          <select
            onChange={handleChange}
            className='form-box'
            name='gardenId'
            id='garden'
          >
            <option hidden>Select from this list</option>
            <option value={1}>Kelmarna Gardens</option>
            <option value={2}>Kingsland Community Orchard</option>
            <option value={3}>Devonport Community Garden</option>
            <option value={4}>Owairaka Community Garden</option>
            <option value={5}>Auckland Teaching Gardens</option>
          </select>
        </div>
        <button
          type='button'
          className='submit'
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
