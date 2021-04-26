import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signInUser } from './signInHelper'

export default function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
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
    signInUser(form, history.push)
  }

  return (
    <>
      <form className='column'>
        <div className="field">
          <label htmlFor='username' className='label'>Username</label>
          <input
            className='input'
            id='username'
            name='username'
            value={form.username}
            onChange={handleChange}
            placeholder='Username'
            type='text'
          />
        </div>
        <div className="field">
          <label htmlFor='password' className='label'>Password</label>
          <input
            className='input'
            id='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Password'
            type='password'
          />
        </div>
        <button
          className='button'
          data-testid='submit-button'
          onClick={handleClick}
        >Sign in
        </button>
      </form>
      <div className='column'>
        <img src='images/comGardenRows.png' alt='image of garden rows' />
      </div>
    </>
  )
}
