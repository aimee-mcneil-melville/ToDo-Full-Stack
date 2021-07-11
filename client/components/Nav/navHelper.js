import { dispatch } from '../../store'
// import { logOff } from '../../auth'
import { clearUser } from '../../actions/user'
import { useAuth0 } from '@auth0/auth0-react'
// const { logout } = useAuth0()

export function logOut (e) {
  e.preventDefault()
  // logout({ returnTo: window.location.origin })
  // logOff()
  dispatch(clearUser())
}

// export function getLinks (page) {
//   switch (page) {
//     case '/signin':
//       return [
//         { to: '/register', name: 'Register' },
//         { to: '/', name: 'Home' }
//       ]

//     case '/register':
//       return [
//         { to: '/signin', name: 'Sign in' },
//         { to: '/', name: 'Home' }
//       ]

//     default:
//       return [
//         { to: '/signin', name: 'Sign in' },
//         { to: '/register', name: 'Register' }
//       ]
//   }
// }

export function logIn (e) {
  // const { loginWithRedirect } = useAuth0()
  e.preventDefault()
  // loginWithRedirect()
}
