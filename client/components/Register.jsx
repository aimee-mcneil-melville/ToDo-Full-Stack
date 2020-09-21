import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'
// import { createUser } from "../../server/db/connection"

export default function Register(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [garden, setGarden] = useState(Number(""))
  const baseUrl = "/api/v1"

  const handleClick = () => {
    register(
      {
        username: username,
        password: password,
        garden: Number(garden),
      },
      { baseUrl }
    )
      .then((token) => {
        console.log(token)
        if (isAuthenticated()) {
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
          onChange={(e) => setGarden(e.target.value)}
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
