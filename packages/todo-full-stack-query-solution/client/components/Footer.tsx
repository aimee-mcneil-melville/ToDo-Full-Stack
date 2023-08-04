import { Link, useParams } from 'react-router-dom'
import { useTodos } from '../hooks/useTodos.ts'

export default function Footer() {
  const { status } = useParams()
  const { data, deleteTodo } = useTodos()

  if (!data || data.length === 0) {
    return null
  }

  const count = data.filter((task) => task.completed == false).length
  const completed = data.filter((task) => task.completed == true)

  const handleClear = () => {
    completed.forEach((task) => {
      deleteTodo.mutate(task.id)
    })
  }

  return (
    <footer className="footer">
      <p className="todo-count">
        <strong>{count}</strong> item{count > 1 || count === 0 ? 's ' : ' '}
        left
      </p>

      <ul className="filters">
        <li>
          <Link to="/" className={!status ? 'selected' : ''}>
            All
          </Link>
        </li>
        <li>
          <Link to="/active" className={status === 'active' ? 'selected' : ''}>
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={status === 'completed' ? 'selected' : ''}
          >
            Completed
          </Link>
        </li>
      </ul>

      {completed.length > 0 ? (
        <button className="clear-completed" onClick={handleClear}>
          Clear completed
        </button>
      ) : null}
    </footer>
  )
}
