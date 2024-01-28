import { Link, Outlet } from 'react-router-dom'
import { USERNAME } from '../env.ts'

export default function Layout() {
  return (
    <>
      <header>
        <div className="row">
          <div className="seven columns">
            <h1>
              <Link to="/" className="site-name__link">
                korihi
              </Link>
            </h1>
            <p>Microblogging in a macro world</p>
          </div>
          <div className="five columns">
            Logged in as <Link to={`/u/${USERNAME}`}>{USERNAME}</Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
