import { Task } from '../../models/models'

interface Props {
  todos: Task[]
}
export default function ToDoList({ todos }: Props) {
  return (
    <>
      <div>ToDoList</div>
      <ul>
        {todos.map((todo: Task) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </>
  )
}
