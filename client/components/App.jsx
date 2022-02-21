import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'
import { cacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import Register from './Register'

function App() {
  cacheUser(useAuth0)
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Fruits />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
