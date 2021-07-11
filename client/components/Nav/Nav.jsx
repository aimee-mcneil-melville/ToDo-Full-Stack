import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { clearUser } from '../../actions/user'
import { dispatch } from '../../store'

// import { logOut, logIn } from './navHelper'
import { IfAuthenticated, IfNotAuthenticated } from '../Authenticated/Authenticated'
import { getAccessToken } from '../../auth-utils'



export default function Nav () {
  // const location = useLocation()
  // const navLinks = getLinks(location.pathname)
  const { logout, loginWithRedirect, user } = useAuth0()
  const [userMetadata, setUserMetadata] = useState({})

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const userDetailsByIdUrl = `https://gardenz.au.auth0.com/api/v2/users/${user.sub}`

        const accessToken = await getAccessToken()
        console.log('access token: ', accessToken)

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const user_metadata = await metadataResponse.json()

        setUserMetadata(user_metadata)
        console.log('user metadata: ', userMetadata)
      } catch (e) {
        console.log(e.message)
      }
    }
    if (user) getUserMetadata()
  }, [user])

  function logOut (e) {
    e.preventDefault()
    logout({ returnTo: window.location.origin })
    // logOff()
    dispatch(clearUser())
  }

  function logIn (e) {
    e.preventDefault()
    loginWithRedirect()
  }

  return (
    <nav className="navbar column">
      <div className="navbar-item">
        <IfAuthenticated>
          <Link to="/" onClick={logOut} className='ml-4'>
              Log out
          </Link>
          <Link to="/" className='ml-4'>Home</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          {/* {navLinks.map(({ to, name }) => (
            <Link key={to} to={to} className='ml-4'>
              {name}
            </Link>
          ))} */}
          <Link to="/" onClick={logIn} className='ml-4'>
              Log in
          </Link>
          <Link to="/" className='ml-4'>Home</Link>

        </IfNotAuthenticated>
      </div>
    </nav>
  )
}
