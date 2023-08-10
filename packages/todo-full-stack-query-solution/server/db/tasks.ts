import connection from './connection.ts'

import { Task, TaskData } from '../../models/task.ts'

export function getAllTasks(): Promise<Task[]> {
  return connection('todos').select('*')
}

export function addTask(task: TaskData): Promise<number[]> {
  return connection('todos').insert(task)
}

export function updateTask(id: number, task: Task): Promise<number> {
  return connection('todos').where({ id }).update(task)
}

export function deleteTask(id: number): Promise<number> {
  return connection('todos').where({ id }).del()
}
