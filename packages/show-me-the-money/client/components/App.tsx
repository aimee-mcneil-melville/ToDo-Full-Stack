import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks'
import { checkAuth } from '../actions/auth'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Meeting from './Meeting'
import History from './History'

function App() {
  const auth = useAppSelector((reduxState) => reduxState.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const confirmSuccess = () => {}
    dispatch(checkAuth(confirmSuccess))
  }, [dispatch])

  return (
    <>
      <div className="container has-text-centered">
        <div className="hero is-small is-primary">
          <div className="hero-body has-text-centered">
            <Link to="/" className="">
              <h1 className="title is-1">$how Me The Money</h1>
            </Link>
            <Nav />
          </div>
        </div>

        <div className="">
          <Routes>
            <Route
              path="/"
              element={auth.isAuthenticated ? <></> : <Login />}
              />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
