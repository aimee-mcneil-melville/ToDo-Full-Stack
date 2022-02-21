import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../api'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

function Register() {
  const user = useSelector((state) => state)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    auth0Id: '',
    email: '',
  })

  useEffect(() => {
    setForm({
      auth0Id: user?.auth0Id,
      email: user?.email,
    })
  }, [user])

  async function handleClick() {
    await addUser(form)
    navigate('/')
  }

  return (
    <>
      <h2>Register</h2>
      <GridForm>
        <ColOne htmlFor="username">Auth0 Id:</ColOne>
        <ColTwo
          type="text"
          id="auth0Id"
          name="auth0Id"
          value={form.auth0Id}
          disabled={true}
        />

        <ColOne htmlFor="email">Email:</ColOne>
        <ColTwo
          type="text"
          id="email"
          name="email"
          value={form.email}
          disabled={true}
        />

        <Button type="button" onClick={handleClick}>
          Register
        </Button>
      </GridForm>
    </>
  )
}

export default Register
