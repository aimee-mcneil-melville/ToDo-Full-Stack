import { Task } from '../../models/models'

export default function ToDoList() {
  const fakeData = [
    {
      id: 1,
      task: 'make a burger',
      completed: 'false',
    },
    {
      id: 2,
      task: 'recreate beanbag tower',
      completed: 'true',
    },
    {
      id: 3,
      task: 'paint a treehouse',
      completed: 'false',
    },
  ]
  return (
    <>
      <div>ToDoList</div>
      <ul>
        {fakeData.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </>
  )
}
