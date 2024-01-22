import { Link, Outlet } from 'react-router-dom'
import LoginForm from './LoginForm.tsx'

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
            <LoginForm />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
