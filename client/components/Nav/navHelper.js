import { dispatch } from '../../store'
// import { logOff } from '../../auth'
import { clearUser } from '../../actions/user'

export function logOut () {
  // logOff()
  dispatch(clearUser())
}

export function getLinks (page) {
  switch (page) {
    case '/signin':
      return [
        { to: '/register', name: 'Register' },
        { to: '/', name: 'Home' }
      ]

    case '/register':
      return [
        { to: '/signin', name: 'Sign in' },
        { to: '/', name: 'Home' }
      ]

    default:
      return [
        { to: '/signin', name: 'Sign in' },
        { to: '/register', name: 'Register' }
      ]
  }
}
