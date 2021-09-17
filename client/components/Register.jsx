import React from 'react'
// import { register } from 'authenticare/client'

// import { baseApiUrl as baseUrl } from '../config'

function Register (props) {
  console.log('entered register page')

  function handleRegister () {
    console.log('submit registration')
  }

  return (
    <>
      <h2> Register </h2>
      <form>
        <label htmlFor='first-name'> First Name </label>
        <input type="text" name="first-name"></input>
        <br></br>
        <label htmlFor='last-name'> Last Name </label>
        <input type="text" name="last-name"></input>
        <br></br>
        <label htmlFor='nickname'> Nickname </label>
        <input type="text" name="nickname"></input>
        <br></br>
        <label htmlFor='email address'> Email address </label>
        <input type="text" name="email-address"></input>
        <br></br>
        <label htmlFor='password'> Password </label>
        <input type="text" name="password"></input>
        <br></br>
      </form>
      <button type="submit" onClick={handleRegister}>Register</button>
    </>
  )
}

export default Register
