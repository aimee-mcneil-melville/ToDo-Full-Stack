import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import useCredentials from '../hooks/use-auth.ts'
import ErrorMessage from './ErrorMessage.tsx'

export default function LoginForm() {
  const { username, password, login, error, logout } = useCredentials()
  const [formState, setFormState] = useState({ username: '', password: '' })

  const handleLogin = (evt: FormEvent) => {
    evt.preventDefault()
    login(formState)
  }

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((st) => ({ ...st, [name]: value }))
  }, [])

  const handleLogout = (evt: FormEvent) => {
    evt.preventDefault()
    logout()
  }

  if (username && password) {
    return (
      <form onSubmit={handleLogout}>
        <p>Logged in as {username}</p>
        <button>Logout</button>
      </form>
    )
  }

  return (
    <form aria-label="login" onSubmit={handleLogin}>
      <label>
        <span>Username</span>
        <input
          name="username"
          onChange={handleChange}
          value={formState.username}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formState.password}
        />
      </label>
      <button>Login</button>
      {error && <ErrorMessage error={error} />}
    </form>
  )
}
