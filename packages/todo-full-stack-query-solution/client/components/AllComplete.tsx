import { useState } from 'react'
import { useTodos } from '../hooks/useTodos.ts'

export default function AllComplete() {
  const { data, updateTodo } = useTodos()
  const [completed, setCompleted] = useState(true)

  if (!data || data.length === 0) return null

  const handleComplete = () => {
    data.forEach((task) => {
      updateTodo.mutate({ ...task, completed: completed })
    })
    setCompleted(() => {
      return !completed
    })
  }

  return (
    <>
      <input
        onChange={handleComplete}
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={completed}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  )
}
