import { useState } from 'react'
import { Task } from '../../models/models'
import { EditTask } from './EditTask'

interface Props {
  todos: Task[]
}
export default function ToDoList({ todos }: Props) {
  const [editId, setEditId] = useState<number | null>(null)

  const handleEditClick = (id: number) => {
    setEditId(id) // Set the editId to the clicked todo item's id
  }

  return (
    <>
      <div>ToDoList</div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId ? (
              <EditTask
                id={todo.id}
                task={todo.task}
                completed={todo.completed}
              />
            ) : (
              <>
                <p> {todo.task}</p>
                <button onClick={() => handleEditClick(todo.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
