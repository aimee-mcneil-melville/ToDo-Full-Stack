import React, { useState } from 'react'

import { signInUser } from './signInHelper'

export default function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
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
    signInUser(form, props.history.push)
  }

  return (
    <>
      <div className="column">
        <form className="pr-5">
          <label htmlFor="username" className="label">Username</label>
          <input
            className="input"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            type="text"
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            className="input"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />
          <button
            className="button"
            data-testid="submit-button"
            onClick={handleClick}
          >Sign in
          </button>
        </form>
      </div>
      <div className="column">
        <div className="imageFit">
          <img
            src="images/comGardenRows.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
