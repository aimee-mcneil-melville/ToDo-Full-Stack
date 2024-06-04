import connection from './connection'
import { Task, TaskData } from '../../models/models'

export function getAllTasks(): Promise<Task[]> {
  return connection('todos').select()
}
console.log('tasks' + getAllTasks())

export function getTaskById(id: number): Promise<Task> {
  return connection('todos').where({ id }).first()
}

export function createTask(newTask: TaskData) {
  return connection('todos').insert(newTask)
}

export function deleteTask(id: number) {
  return connection('todos').where({ id }).del
}

export function updateTask(id: number, task: TaskData): Promise<Task> {
  return connection('todos').where({ id }).update(task)
}
