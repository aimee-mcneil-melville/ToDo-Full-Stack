import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import Nav from './Nav'
import Fruits from './Fruits'
import Register from './Register'

import { clearLoggedInUser, updateLoggedInUser } from '../actions/loggedInUser'
import { cacheUser } from '../auth0-utils'
import { getUser } from '../api'

function App() {
  cacheUser(useAuth0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // TODO: call useAuth0 and destructure:
  // isAuthenticated, and getAccessTokenSilently
  
  const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()
  const getAccessTokenSilently = () => Promise.reject('TODO: getAccessTokenSilently ') // <- TODO: delete this and use the value from useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then(token => getUser(token))
        .then(userInDb => {
          userInDb ? dispatch(updateLoggedInUser(userInDb)) : navigate('/register')
        })
    }
  }, [isAuthenticated])

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Fruits />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
