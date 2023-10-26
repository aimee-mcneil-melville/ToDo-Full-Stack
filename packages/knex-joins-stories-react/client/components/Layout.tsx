import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header>
        <h1>Art rover &#x1F5BC;</h1>
        <nav>
          <ol className="navigation__list">
            <li className="navigation__list-item">
              <NavLink className="navigation__link" to={'/'}>
                home
              </NavLink>
            </li>
            <li className="navigation__list-item">
              <NavLink className="navigation__link" to={'/artworks'}>
                artworks
              </NavLink>
            </li>
            <li className="navigation__list-item">
              <NavLink className="navigation__link" to={'/galleries'}>
                galleries
              </NavLink>
            </li>
          </ol>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>copyright &copy; 2044</footer>
    </>
  )
}

export default Layout
