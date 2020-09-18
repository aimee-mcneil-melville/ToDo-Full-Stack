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
    <div className="signInContainer container">
      <div className="signInLeft">
        <div className="signInTitle">
          <h1>Sign in</h1>
        </div>

        <label className="label ">Username</label>
        <input
          className="input "
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          type="text"
        />
        <label className="label">Password</label>
        <input
          className="input"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
        />
        <button
          className="button is-primary "
          data-testid="submit-button"
          onClick={handleClick}
        >
          Sign in
        </button>
      </div>
      <div className="signInRight">
        <img
          src="images/comGardenSpace.jpg"
          alt=""
          style={{ width: "600px", height: "500px" }}
        />
      </div>
    </div>
  )
}
export default SignIn
