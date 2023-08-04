import request from 'superagent'

import { Task } from '../../models/task.ts'
const rootUrl = '/api/v1/todos'

export async function fetchTodos(): Promise<Task[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function createTodo(task: string): Promise<void> {
  await request.post(rootUrl).send({ task })
}

export async function updateTodo(updatedTodo: Task): Promise<void> {
  await request.patch(`${rootUrl}/${updatedTodo.id}`).send(updatedTodo)
}

export async function deleteTodo(id: number): Promise<void> {
  await request.delete(`${rootUrl}/${id}`)
}
