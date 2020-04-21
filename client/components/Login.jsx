import React from 'react'
import {connect} from 'react-redux'
import {loginUser, loginError} from '../actions/login'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(loginError(''))
  }
  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    let {username, password} = this.state
    this.props.dispatch(loginUser({username, password}))
  }
  render() {
    const {auth} = this.props
    return (
      <form className="form box" onSubmit={this.submit}>
        <h1 className="title is-2">Login</h1>
        <hr />
        {auth.errorMessage && <span className="has-text-danger is-large">{auth.errorMessage}</span>}
        <label className="label is-large has-text-centered">Username
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="User Name" type="text" name="username" onChange={this.updateDetails}/>
        </label>
        <label className="label is-large has-text-centered">Password
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails}/>
        </label>
        <input className="button is-large is-fullwidth is-success" value='Login' type="submit" />
      </form>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)
