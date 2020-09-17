import React, { useState } from "react"

import { isAuthenticated, signIn } from "authenticare/client"

function SignIn(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleClick = () => {
    const { username, password } = form
    signIn({ username, password }, "http://localhost:3000/api/v1").then(
      (token) => {
        if (isAuthenticated()) {
          props.history.push("/")
        }
      }
    )
  }
  return (
    <div>
      <h1>Sign in</h1>
      <input
        id="username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        type="text"
      />
      <input
        id="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />
      <button onClick={handleClick}>Log in</button>
    </div>
  )
}
export default SignIn
