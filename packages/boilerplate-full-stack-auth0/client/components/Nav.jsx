import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useSelector } from 'react-redux'

export function useRegisterFn() {
  const { loginWithRedirect } = useAuth0()
  const redirectUri = `${window.location.origin}/profile`
  return () =>
    loginWithRedirect({
      redirectUri,
      screen_hint: 'signin',
      scope: 'role:member',
    })
}

function Nav() {
  const user = useSelector((state) => state.user)
  const { loginWithRedirect, logout } = useAuth0()
  const register = useRegisterFn()

  function handleLogin(event) {
    event.preventDefault()
    loginWithRedirect()
  }

  function handleLogoff(event) {
    event.preventDefault()
    logout()
  }

  function handleRegister(event) {
    event.preventDefault()
    register()
  }

  return (
    <nav>
      <h1 className="logo">Full-stack Boilerplate with Auth0</h1>
      <section className="nav-item">
        <IfAuthenticated>
          <p>
            Hello, {user.name} {user.roles ? `(${user.roles})` : null}
          </p>
          <section className="sign">
            <a href="/" onClick={handleLogoff} className="nav-link">
              Log out
            </a>
          </section>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {/* <section className='nav-item'> */}
          <p>Hello, guest</p>
          <section className="sign">
            <a href="/" onClick={handleLogin} className="nav-link">
              Sign in
            </a>
            <a href="/" onClick={handleRegister} className="nav-link">
              Register
            </a>
          </section>
          {/* </section> */}
        </IfNotAuthenticated>
      </section>
    </nav>
  )
}

export default Nav
