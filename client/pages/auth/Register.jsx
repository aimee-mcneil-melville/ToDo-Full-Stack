import React, { useState } from 'react'

import { registerUser } from './registerHelper'

export default function Register (props) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    gardenId: null
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
    registerUser(form, props.history.push)
  }

  return (
    <>
      <div className="column ">
        <form className="pr-5">
          <label htmlFor="username" className="label">Username</label>
          <input
            className="input"
            id="username"
            name="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
          ></input>
          <label htmlFor="password" className="label">Password</label>
          <input
            className="input"
            id="password"
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <label htmlFor="garden" className="label">My Garden</label>
          <select
            onChange={handleChange}
            className="select"
            name="gardenId"
            id="garden"
          >
            <option hidden>Select from this list</option>
            <option value={1}>Kelmarna Gardens</option>
            <option value={2}>Kingsland Community Orchard</option>
            <option value={3}>Devonport Community Garden</option>
          </select>
          <button
            type="button"
            className="button"
            onClick={handleClick}
            data-testid="submitButton"
          >
          Register
          </button>
        </form>
      </div>
      <div className="column ">
        <div className="imageFit">
          <img
            src="./images/comGardenPlant.png"
            alt=""
          />
        </div>
      </div>
    </>
  )
}
