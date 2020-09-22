import React, { useState, useContext } from 'react'
import { isAuthenticated, signIn } from 'authenticare/client'

import { UserContext, updateUserContext } from './UserContext'

function SignIn (props) {
  const [setUser] = useContext(UserContext)
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const baseUrl = '/api/v1'
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClick = () => {
    const { username, password } = form
    return signIn({ username, password }, { baseUrl })
      .then(() => {
        if (isAuthenticated()) {
          updateUserContext(setUser)
          return props.history.push('/garden')
        }
        return null
      })
  }

  return (
    <div className="signInContainer container">
      <div className="signInLeft">
        <div className="signInTitle">
          <h1>Sign in</h1>
        </div>

        <label className="label ">Username</label>
        <input
          className="input "
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          type="text"
        />
        <label className="label">Password</label>
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
          className="button is-primary "
          data-testid="submit-button"
          onClick={handleClick}
        >
          Sign in
        </button>
      </div>
      <div className="signInRight">
        <img
          src="images/comGardenRows.png"
          alt=""
          style={{ width: '600px', height: '500px' }}
        />
      </div>
    </div>
  )
}
export default SignIn
