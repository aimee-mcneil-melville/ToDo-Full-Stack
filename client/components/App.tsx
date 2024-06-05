import { fetchTodos } from '../apis/apiClient.ts'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: todos,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchTodos(),
  })
  if (isError) {
    return error
  }
  if (isFetching) {
    return <p>Loading...</p>
  }

  if (todos) {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <AddTodo />
        </header>
        <section className="main">
          <TodoList todos={todos} />
        </section>
        <footer className="footer"></footer>
      </>
    )
  }
}

export default App
