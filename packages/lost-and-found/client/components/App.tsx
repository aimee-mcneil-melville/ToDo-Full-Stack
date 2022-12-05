import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Home from './Home'
import { checkAuth } from '../actions/auth'

function App() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    const confirmSuccess = () => {}
    dispatch(checkAuth(confirmSuccess))
  }, [])

  return (
    <div className="container has-text-centered">
      <div className="hero is-small is-primary">
        <div className="hero-body has-text-centered">
          <Link to="/" className="">
            <h1 className="title is-1">Lost and Found</h1>
          </Link>
          <Nav />
        </div>
      </div>

      <div className="">
        <Routes>
          <Route
            path="/"
            element={auth.isAuthenticated ? <Home /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
