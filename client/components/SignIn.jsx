import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button } from './Styled'

function SignIn (props) {
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

  function handleClick () {
    const { username, password } = form
    signIn({ username, password }, { baseUrl: baseUrl })
      .then(() => {
        if (isAuthenticated) {
          props.history.push('/friends')
        }
        return null
      })
      .catch(err => console.error(err))
  }

  // function displayPassword () {
  //   var x = document.getElementById('myInput')
  //   if (x.type === 'password') {
  //     x.type = 'text'
  //   } else {
  //     x.type = 'password'
  //   }
  // }

  return (
    <>
      <h2>Sign in</h2>
      <GridForm>
        <ColOne htmlFor='username'>Email:</ColOne>
        <ColTwo type='text'
          id='username'
          name='username'
          placeholder="Your email address"
          value={form.username}
          onChange={handleChange} required />

        <ColOne htmlFor='password'>Password:</ColOne>
        <ColTwo type='password'
          id='myInput'
          name='password'
          placeholder="Your password"
          minlength="6"
          value={form.password}
          onChange={handleChange} required />

        {/* <ColOne htmlFor='checkbox'>Show Password:</ColOne>
        <ColTwo type="checkbox" onClick={displayPassword()}></ColTwo> */}

        <Button type='button' onClick={handleClick}>Sign in</Button>
      </GridForm>
    </>
  )
}

export default SignIn
