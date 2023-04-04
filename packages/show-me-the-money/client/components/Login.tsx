import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Cred } from 'authenticare/client'

import { loginUser, authError } from '../actions/auth'
import { useAppDispatch, useAppSelector } from '../hooks'

function Login() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((redux) => redux.auth)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    dispatch(authError(''))
  }, [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { username, password } = formData
    const confirmSuccess = () => navigateTo('/')
    dispatch(loginUser({ username, password }, confirmSuccess))
  }

  return (
    <form className="form box" onSubmit={handleSubmit}>
      <h1 className="title is-2">Login</h1>
      <hr />
      {auth.errorMessage && (
        <span className="has-text-danger is-large">{auth.errorMessage}</span>
      )}
      <label className="label is-large has-text-centered">
        Username
        <input
          required
          className="input has-text-centered is-large is-fullwidth"
          placeholder="User Name"
          type="text"
          name="username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label className="label is-large has-text-centered">
        Password
        <input
          required
          className="input has-text-centered is-large is-fullwidth"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <input
        className="button is-large is-fullwidth is-success"
        value="Login"
        type="submit"
      />
    </form>
  )
}

export default Login
