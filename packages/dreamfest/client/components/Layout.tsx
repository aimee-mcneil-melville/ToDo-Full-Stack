import { Outlet } from 'react-router-dom'

import Header from './Header.tsx'
import Footer from './Footers.tsx'

export default function Layout() {
  return (
    <>
      <div id="page-container">
        <div id="content-wrap">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}
