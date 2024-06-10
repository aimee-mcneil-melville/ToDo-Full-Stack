import request from 'superagent'
import { Task, TaskData } from '../../models/models'

const rootUrl = '/api/v1/todos/'

export async function fetchTodos(): Promise<Task[]> {
  const res = await request.get(rootUrl)
  return res.body
}

export async function addTodo(task: string) {
  const newTask = {
    task: task,
    completed: 0,
  }
  await request.post(rootUrl).send(newTask)
}

export async function updateTodo(id: number, task: TaskData) {
  await request.patch(`${rootUrl}${id}`).send(task)
}
