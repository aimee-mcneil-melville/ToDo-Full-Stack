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
          props.history.push('/')
        }
        return null
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h2>Sign in</h2>
      <GridForm>
        <ColOne htmlFor='username'>Email:</ColOne>
        <ColTwo type='text'
          id='username'
          name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne htmlFor='password'>Password:</ColOne>
        <ColTwo type='password'
          id='password'
          name='password'
          value={form.password}
          onChange={handleChange} />

        <Button type='button' onClick={handleClick}>Sign in</Button>
      </GridForm>
    </>
  )
}

export default SignIn
