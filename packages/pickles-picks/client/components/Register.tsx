import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { Cred , Register} from 'authenticare/client'
import { authError, registerUserRequest } from '../actions/auth'

interface Form extends Cred {
  confirm_password?: string
  email_address?: string
}

function Register() {
  const navigateTo = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState<Form>({
    username: '',
    email_address: '',
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    dispatch(authError(''))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.currentTarget
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
   e.currentTarget.reset()

    const { password, confirm_password, username, email_address } = formData

    if (confirm_password != password) {
      dispatch(authError("Passwords don't match"))
    } else {
      const confirmSuccess = () => navigateTo('/')
      const userInfo: Register = { username, password, email_address: email_address as string }
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
