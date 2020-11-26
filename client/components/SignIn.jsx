import React from 'react'
import { connect } from 'react-redux'
import { isAuthenticated, signIn, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions/user'

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
    const { username, password } = this.state
    return signIn({ username, password }, { baseUrl: '/api/v1' })
      .then(() => {
        if (isAuthenticated()) {
          const { username, isAdmin, gardenId } = getDecodedToken()
          this.props.dispatch(setUser({ username, isAdmin, gardenId }))
          return this.props.history.push('/garden')
        }
        return null
      })
  }

  render () {
    return (
      <>
        <div className="column is-one-third">
          <h1>Sign in</h1>

          <label className="label ">Username</label>
          <input
            className="input "
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
            className="button is-primary "
            data-testid="submit-button"
            onClick={this.handleClick}
          >
          Sign in
          </button>
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

export default connect()(SignIn)
