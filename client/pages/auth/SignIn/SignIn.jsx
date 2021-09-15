import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { signInUser } from './signInHelper'

export default function SignIn () {
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
    <section className='flex-container'>
      <form className='form-container'>
        <div className="">
          <label htmlFor='username' className='label'>Username</label>
          <input
            className=''
            id='username'
            name='username'
            value={form.username}
            onChange={handleChange}
            placeholder='Username'
            type='text'
          />
        </div>
        <div className="">
          <label htmlFor='password' className='label'>Password</label>
          <input
            className=''
            id='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Password'
            type='password'
          />
        </div>
        <button
          className=''
          data-testid='submit-button'
          onClick={handleClick}
        >Sign in
        </button>
      </form>
      <div className='image-container'>
        <img src='images/comGardenRows.png' alt='image of garden rows' />
      </div>
    </section>
  )
}
