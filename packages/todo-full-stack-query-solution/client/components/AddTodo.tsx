import { useState } from 'react'
import { useTodos } from '../hooks/useTodos.ts'

export default function AddTodo() {
  const { addTodo } = useTodos()
  const [newTask, setNewTask] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo.mutate(newTask)
      setNewTask('')
    }
  }

  return (
    <>
      <label htmlFor="add-todo" className="sr-only">
        Add task to do
      </label>
      <input
        id="add-todo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
        value={newTask}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
