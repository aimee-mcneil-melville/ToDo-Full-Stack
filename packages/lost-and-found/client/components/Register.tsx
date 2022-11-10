import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { User } from '../../common/User'

import { authError, registerUserRequest } from '../actions/auth'

interface Form extends User {
  confirm_password?: string
}

function Register() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((redux) => redux.auth)

  const [formData, setFormData] = useState<Form>({
    username: '',
    contact_details: '',
    email_address: '',
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    dispatch(authError(''))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.currentTarget.reset()

    const { password, confirm_password } = formData

    if (confirm_password != password) {
      dispatch(authError("Passwords don't match"))
    } else {
      const confirmSuccess = () => navigateTo('/')
      const userInfo = { ...formData }
      delete userInfo.confirm_password
      dispatch(registerUserRequest(userInfo, confirmSuccess))
    }
  }

  return (
    <form className="Register form box" onSubmit={handleSubmit}>
      <h1 className="title is-2">Register</h1>
      <hr />
      {auth.errorMessage && (
        <span className="has-text-danger is-large">{auth.errorMessage}</span>
      )}
      <label className="column is-6 is-offset-one-quarter label is-large has-text-centered">
        Username
        <input
          required
          className="input is-large has-text-centered is-fullwidth"
          placeholder="User Name"
          type="text"
          name="username"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
        />
      </label>
      <div className="columns">
        <label className="column is-6 label is-large has-text-centered">
          Contact Details
          <input
            required
            className="input is-large has-text-centered is-fullwidth"
            placeholder="Contact Details"
            type="text"
            name="contact_details"
            onChange={handleChange}
            value={formData.contact_details}
          />
        </label>
        <label className="column is-6 label is-large has-text-centered">
          Email Address
          <input
            required
            className="input is-large has-text-centered is-fullwidth"
            placeholder="Email Adress"
            type="text"
            name="email_address"
            onChange={handleChange}
            value={formData.email_address}
          />
        </label>
      </div>
      <br />
      <div className="columns">
        <label className="column is-6 label is-large has-text-centered">
          Password
          <input
            required
            className="input is-large has-text-centered is-fullwidth"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            onChange={handleChange}
            value={formData.password}
          />
        </label>
        <label className="column is-6 label is-large has-text-centered">
          Confirm Password
          <input
            required
            className="input is-large has-text-centered is-fullwidth"
            placeholder="Confirm Password"
            type="password"
            name="confirm_password"
            autoComplete="new-password"
            onChange={handleChange}
            value={formData.confirm_password}
          />
        </label>
      </div>
      <input
        className="button is-success is-large is-fullwidth"
        value="Register"
        type="submit"
      />
    </form>
  )
}

export default Register
