import React from 'react'

function Login (props) {
  console.log('entered login page')

  function handleLogin () {
    console.log('submit login')
  }

  return (
    <>
      <h2> Login </h2>
      <form>
        <label htmlFor='email address'> Email address </label>
        <input type="text" name="email-address"></input>
        <br></br>
        <label htmlFor='password'> Password </label>
        <input type="password" name="password"></input>
        <br></br>
      </form>
      <button type="submit" onClick={handleLogin}>Login</button>
    </>
  )
}

export default Login
