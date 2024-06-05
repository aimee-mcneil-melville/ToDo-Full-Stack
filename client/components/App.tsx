import AddTodo from './AddTodo.tsx'
import ToDoList from './TodoList.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <ToDoList />
      <section className="main"></section>
      <footer className="footer"></footer>
    </>
  )
}

export default App
