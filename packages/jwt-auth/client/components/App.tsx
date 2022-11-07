import { useState } from 'react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { NavLink, NavGroup } from './Styled'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
