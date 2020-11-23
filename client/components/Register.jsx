import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions'

function Register (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [gardenId, setGardenId] = useState('')
  const baseUrl = '/api/v1'

  const handleClick = () => {
    register(
      {
        username: username,
        password: password,
        gardenId: Number(gardenId)
      },
      { baseUrl }
    )
      .then(() => {
        if (isAuthenticated()) {
          const { username, isAdmin, garden_id: gardenId } = getDecodedToken()
          props.dispatch(setUser({ username, isAdmin, gardenId }))
          return props.history.push('/garden')
        }
        return null
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }

  return (
    <div className="registerContainer container">
      <div className="leftRegister">
        <div className="registerTitle">
          <h1>Register</h1>
        </div>
        <label className="label">Username</label>
        <input
          className="input"
          type="username"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label className="label">My Garden</label>
        <select
          onChange={(e) => setGardenId(e.target.value)}
          className="select"
          name="garden"
          id="name"
        >
          <option hidden>Select from this list</option>
          <option value="1">Kelmarna Gardens</option>
          <option value="2">Kingsland Community Orchard</option>
          <option value="3">Devonport Community Garden</option>
        </select>
        <button
          type="button"
          className="button is-primary"
          onClick={handleClick}
          data-testid="submitButton"
        >
          Register
        </button>
      </div>
      <div className="rightRegister">
        <img
          src="./images/comGardenPlant.png"
          alt=""
          style={{ width: '600px', height: '500px' }}
        />
      </div>
    </div>
  )
}

export default connect()(Register)
