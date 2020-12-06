import React from 'react'

import { registerUser } from './registerHelper'

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

  handleClick = (e) => {
    e.preventDefault()
    registerUser(this.state, this.props.history.push)
  }

  render () {
    return (
      <>
        <div className="column is-one-quarter-desktop">
          <form className="pr-5">
            <label htmlFor="username" className="label">Username</label>
            <input
              className="input"
              id="username"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            ></input>
            <label htmlFor="password" className="label">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            ></input>
            <label htmlFor="garden" className="label">My Garden</label>
            <select
              onChange={this.handleChange}
              className="select"
              name="gardenId"
              id="garden"
            >
              <option hidden>Select from this list</option>
              <option value={1}>Kelmarna Gardens</option>
              <option value={2}>Kingsland Community Orchard</option>
              <option value={3}>Devonport Community Garden</option>
            </select>
            <button
              type="button"
              className="button"
              onClick={this.handleClick}
              data-testid="submitButton"
            >
            Register
            </button>
          </form>
        </div>
        <div className="column is-two-thirds-tablet">
          <img
            className='rightHeroImage'
            src="./images/comGardenPlant.png"
            alt=""
            style={{ width: '600px', height: '500px' }}
          />
        </div>
      </>
    )
  }
}

export default Register
