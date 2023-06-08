export interface Task {
  id: number
  task: string
  priority: number
  completed: boolean
}

export type TaskData = Omit<Task, 'id'>
