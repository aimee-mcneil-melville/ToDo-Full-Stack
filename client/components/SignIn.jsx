import React, { useState } from 'react'
import { signIn, isAuthenticated } from '../auth-utils'

import { baseApiUrl as baseUrl } from '../config'

import Input from './Input'
import Button from './Button'

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
        if (isAuthenticated()) {
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
      <Input
        value={form.username}
        id='username'
        name='username'
        changeHandler={handleChange}
        placeholder='Your email address'
        label='Email address'
      />
      <Input
        value={form.password}
        type='password'
        id='password'
        name='password'
        changeHandler={handleChange}
        placeholder='Your password'
        label='Password'
      />
      <Button buttonText='Log in' clickFunction={handleClick} />
    </>
  )
}

export default SignIn
