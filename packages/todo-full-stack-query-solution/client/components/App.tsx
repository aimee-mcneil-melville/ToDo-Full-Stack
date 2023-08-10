import { Outlet } from 'react-router-dom'

import AddTodo from './AddTodo.tsx'
import AllComplete from './AllComplete.tsx'
import Footer from './Footer.tsx'

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
