import React from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated, getDecodedToken } from 'authenticare/client'

import { setUser } from '../actions'

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    gardenId: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = () => {
    const { username, password, gardenId } = this.state
    register({
      username,
      password,
      gardenId: Number(gardenId)
    },
    { baseUrl: '/api/v1' })
      .then(() => {
        if (isAuthenticated()) {
          const { username, isAdmin, garden_id: gardenId } = getDecodedToken()
          this.props.dispatch(setUser({ username, isAdmin, gardenId }))
          return this.props.history.push('/garden')
        }
        return null
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }

  render () {
    return (
      <div className="registerContainer container">
        <div className="leftRegister">
          <div className="registerTitle">
            <h1>Register</h1>
          </div>
          <label className="label">Username</label>
          <input
            className="input"
            name="username"
            value={this.state.username}
            placeholder="username"
            onChange={this.handleChange}
          ></input>
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChange}
          ></input>
          <label className="label">My Garden</label>
          <select
            onChange={this.handleChange}
            className="select"
            name="gardenId"
            id="name"
          >
            <option hidden>Select from this list</option>
            <option value={1}>Kelmarna Gardens</option>
            <option value={2}>Kingsland Community Orchard</option>
            <option value={3}>Devonport Community Garden</option>
          </select>
          <button
            type="button"
            className="button is-primary"
            onClick={this.handleClick}
            data-testid="submitButton"
          >
            Register
          </button>
        </div>
        <div className="rightRegister">
          <img
            src="./images/comGardenPlant.png"
            alt=""
            style={{ width: '600px', height: '500px' }}
          />
        </div>
      </div>
    )
  }
}

export default connect()(Register)
