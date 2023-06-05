import { useParams } from 'react-router-dom'

import { useTodos } from '../hooks/useTodos'
import { Task } from '../../common/task'
import Todo from './Todo'

export default function TodoList() {
  const { data, isLoading, error } = useTodos()
  const { status } = useParams()

  if (error instanceof Error) return <p>{error.message}</p>
  if (isLoading || !data) return <p>LOADING...</p>

  const filter = (filter: string | undefined, data: Task[]) => {
    switch (filter) {
      case 'active':
        return data.filter((todo) => !todo.completed)
      case 'completed':
        return data.filter((todo) => todo.completed)
      default:
        return data
    }
  }
  const todos = filter(status, data)

  return (
    <ul className="todo-list" aria-label="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
