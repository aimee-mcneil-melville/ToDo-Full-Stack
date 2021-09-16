import React, { useState } from 'react'
import { register } from 'authenticare/client'

// import { baseApiUrl as baseUrl } from '../config'

function Register (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  function handleClick () {
    console.log('clickhandled')
    return (
      <>
        <h2> Register </h2>
        <form>
          <label htmlFor='username'> Username: </label>
          <input type="text" name="username">

          </input>
        </form>
      </>
    )
  }

  return (
    <>
      <button type='button' onClick={handleClick}>Register</button>
    </>
  )
}

export default Register
