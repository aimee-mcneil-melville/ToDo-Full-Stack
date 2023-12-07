import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <h1 className="title">Pupparazzi</h1>
      <Link className="nav" to="/">
        Home
      </Link>
      <Outlet />
    </>
  )
}
