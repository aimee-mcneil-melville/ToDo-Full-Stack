import React, { useState } from 'react'
import { register, isAuthenticated } from '../auth-utils'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button } from './Styled'

function Register (props) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    username: '',
    isPublic: true,
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
    const { firstName, lastName, nickname, username, password, isPublic } = form
    register({ firstName, lastName, nickname, username, password, isPublic }, { baseUrl: baseUrl })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/friends')
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
          placeholder="Jared"
          value={form.firstName}
          onChange={handleChange} />

        <ColOne htmlFor='lastName'>Last Name:</ColOne>
        <ColTwo type='text'
          id='lastName'
          name='lastName'
          placeholder="Pinfold"
          value={form.lastName}
          onChange={handleChange} />

        <ColOne htmlFor='nickname'>Nickname:</ColOne>
        <ColTwo type='nickname'
          id='nickname'
          name='nickname'
          placeholder="How your name will appear"
          value={form.nickname}
          onChange={handleChange} />

        <ColOne htmlFor='username'>Email:</ColOne>
        <ColTwo type='username'
          id='username'
          name='username'
          placeholder="warhammer-slayer@gmail.com"
          value={form.username}
          onChange={handleChange} required/>

        <ColOne htmlFor='password'>Password:</ColOne>
        <ColTwo type='password'
          id='password'
          name='password'
          placeholder="A minimum of 6 characters"
          minlength="6"
          value={form.password}
          onChange={handleChange} />

        <ColOne htmlFor='public'></ColOne>
        <ColTwo type='hidden'
          id='public'
          name='public'
          value={form.isPublic}
          onChange={handleChange} />

        <Button type='button' onClick={handleClick}>Register</Button>
      </GridForm>
    </>
  )
}

export default Register
