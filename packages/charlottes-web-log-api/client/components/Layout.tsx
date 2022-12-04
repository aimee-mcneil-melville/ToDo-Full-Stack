import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

interface IProps {
  errorMessage?: string
}

const Layout = ({ errorMessage }: IProps) => {
  return (
    <div id="layout" className="pure-g">
      <div className="sidebar pure-u-1 pure-u-md-1-4">
        <Header />
      </div>
      <div className="content pure-u-1 pure-u-md-3-4">
        <Outlet />
        {errorMessage && <h1>{errorMessage}</h1>}
      </div>
      <div className="content pure-u-1 pure-u-md-3-4">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
