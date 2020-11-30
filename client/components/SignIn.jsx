import React from 'react'

import { signInUser } from './signInHelper'

class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    signInUser(this.state, this.props.history.push)
  }

  render () {
    return (
      <>
        <div className="column is-one-third">
          <form className="pr-5">
            <label className="label ">Username</label>
            <input
              className="input"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Username"
              type="text"
            />
            <label className="label">Password</label>
            <input
              className="input"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
            />
            <button
              className="button"
              data-testid="submit-button"
              onClick={this.handleClick}
            >Sign in
            </button>
          </form>
        </div>
        <div className="column is-four-fifths">
          <img
            src="images/comGardenRows.png"
            alt=""
            style={{ width: '600px', height: '500px' }}
          />
        </div>
      </>
    )
  }
}

export default SignIn
