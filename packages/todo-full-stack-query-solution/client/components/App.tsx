import { Outlet } from 'react-router-dom'

import AddTodo from './AddTodo'
import AllComplete from './AllComplete'
import Footer from './Footer'

import { useTodos } from '../hooks/useTodos'

export default function App() {
  const { data } = useTodos()
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
      {data && data?.length > 0 ? <Footer /> : null}
    </>
  )
}
