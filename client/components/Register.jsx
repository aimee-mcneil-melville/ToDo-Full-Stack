import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button } from './Styled'

function Register (props) {
  console.log('entered register page')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    username: '',
    // public: true,
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
    const { firstName, lastName, nickname, username, password } = form
    register({ firstName, lastName, nickname, username, password }, { baseUrl: baseUrl })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h2> Register </h2>
      <p>Fill in the details below to register a new account.</p>

      <GridForm>
        <ColOne htmlFor='firstName'>First Name:</ColOne>
        <ColTwo type='text'
          id='firstName'
          name='firstName'
          value={form.firstName}
          onChange={handleChange} />

        <ColOne htmlFor='lastName'>Last Name:</ColOne>
        <ColTwo type='text'
          id='lastName'
          name='lastName'
          value={form.lastName}
          onChange={handleChange} />

        <ColOne htmlFor='nickname'>Nickname:</ColOne>
        <ColTwo type='nickname'
          id='nickname'
          name='nickname'
          value={form.nickname}
          onChange={handleChange} />

        <ColOne htmlFor='username'>Email:</ColOne>
        <ColTwo type='username'
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

        <Button type='button' onClick={handleClick}>Register</Button>
      </GridForm>
    </>
  )
}

export default Register
