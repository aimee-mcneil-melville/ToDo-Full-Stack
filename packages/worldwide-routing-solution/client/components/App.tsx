import { Outlet } from 'react-router-dom'
import Nav from './Nav'

// STRETCH: Use nested routes
export default function App() {
  return (
    <>
      <div className="title">
        <img
          src="/images/color_earth.gif"
          alt="A coloured globe of the earth spinning around on its axis"
        />
        <h1>Navigating the worldwide routes</h1>
      </div>

      <div className="main">
        <Nav />
        <Outlet />
      </div>
    </>
  )
}
