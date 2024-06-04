export interface Task {
  id: number
  task: string
  completed: boolean
}

export type TaskData = Omit<Task, 'id'>
