import { Outlet } from 'react-router-dom'

import AddTodo from './AddTodo'
import AllComplete from './AllComplete'
import Footer from './Footer'

export default function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <AllComplete />
        <Outlet />
      </section>
      <Footer />
    </>
  )
}
