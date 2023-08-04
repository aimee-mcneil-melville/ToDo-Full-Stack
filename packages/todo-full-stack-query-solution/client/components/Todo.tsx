import { useState } from 'react'

import { Task } from '../../models/task.ts'
import { useTodos } from '../hooks/useTodos.ts'

interface Props {
  todo: Task
}

export default function Todo({ todo }: Props) {
  const { id, task, completed } = todo
  const { updateTodo, deleteTodo } = useTodos()

  const [edit, setEdit] = useState(false)
  const [editTask, setEditTask] = useState(task)

  const findClass = (): string => {
    return !completed && edit ? 'editing' : completed ? 'completed' : ''
  }

  const toggleEdit = () => {
    if (completed) return
    setEdit(true)
  }

  const handleToggle = () => {
    updateTodo.mutate({ ...todo, completed: !completed })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask(e.target.value)
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateTodo.mutate({ ...todo, task: editTask })
    setEdit(false)
  }

  return (
    <li className={findClass()}>
      <div className="view">
        <label htmlFor={`toggle ${task}`} className="sr-only">
          {task}
        </label>
        <input
          id={`toggle ${task}`}
          onChange={handleToggle}
          className="toggle"
          type="checkbox"
          checked={completed}
        />

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <label
          htmlFor={task}
          onDoubleClick={toggleEdit}
          onKeyDown={(e) => (e.key === 'Enter' ? toggleEdit() : null)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          {task}
        </label>

        <button
          aria-label={`delete ${task} task`}
          className="destroy"
          onClick={() => deleteTodo.mutate(id)}
        ></button>
      </div>
      <form onSubmit={handleUpdate}>
        <input
          id={task}
          onChange={handleChange}
          className="edit"
          type="text"
          value={editTask}
        />
      </form>
    </li>
  )
}
