import { beforeEach, test, expect, vi } from 'vitest'

import {
  listTodos,
  addTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
  findTodos,
} from './commands'

// So commands.js get the mock database module
import {
  getAll,
  addTodo as _addTodo,
  completeTodo as _completeTodo,
  deleteTodo as _deleteTodo,
  updateTodo as _updateTodo,
  findTodos as _findTodos,
} from './db'

vi.mock('./db.js')

const initialMockTodos = [
  { id: 1, task: 'test task 1', completed: false },
  { id: 2, task: 'test task 2', completed: true },
  { id: 3, task: 'test task 3', completed: false },
]
let mockTodos = [...initialMockTodos]

beforeEach(() => {
  mockTodos = [...initialMockTodos]
})

test('listTodos returns three todos', () => {
  // Arrange
  getAll.mockImplementation(() => Promise.resolve(mockTodos))

  // Act
  // Be sure to always use `return` when testing with promises
  return listTodos().then((results) => {
    // More arrange
    // This is a regex to get all colons in the resulting string
    const matches = results.match(/:/g)

    // When testing async functions, we always assert inside `.then`.
    // Do you know why?

    // Assert
    expect(matches).toHaveLength(3)
    return expect(results.split('\n')[1]).toMatch('task 2')
  })
})

test('addTodo creates a new todo', () => {
  _addTodo.mockImplementation((todo) => {
    mockTodos.push({ id: 4, task: todo, completed: false })
    return Promise.resolve() // not important what we resolve
  })

  return addTodo('new test task').then((results) => {
    return expect(results).toMatch('4: new test task')
  })
})

test('completeTodo completes the correct todo', () => {
  _completeTodo.mockImplementation((id) => {
    mockTodos = mockTodos.map((task) => {
      if (task.id === id) task.completed = true
      return task
    })
    return Promise.resolve() // not important what we resolve
  })

  return completeTodo(3).then((results) => {
    const todos = results.split('\n')
    const twoIsComplete = todos.some(
      (todo) => todo.includes('2:') && todo.includes('completed')
    )
    return expect(twoIsComplete).toBeTruthy()
  })
})

test('deleteTodo removes the correct todo', () => {
  _deleteTodo.mockImplementation((id) => {
    mockTodos = mockTodos.filter((task) => task.id !== id)
    return Promise.resolve() // not important what we resolve
  })

  return deleteTodo(2).then((results) => {
    return expect(results).not.toMatch('2:')
  })
})

test('updateTodo alters the task', () => {
  _updateTodo.mockImplementation((id, task) => {
    mockTodos = mockTodos.map((todo) => {
      return todo.id !== id
        ? todo
        : {
            id: todo.id,
            task: task,
            completed: todo.completed,
          }
    })
    return Promise.resolve() // not important what we resolve
  })

  const id = 2
  const newTask = 'updated task 2'

  return updateTodo(id, newTask).then((results) => {
    return expect(results).toMatch(`${id}: ${newTask}`)
  })
})

test('findTodos returns the correct number of todos', () => {
  _findTodos.mockImplementation((term) => {
    mockTodos = mockTodos.filter((todo) => todo.task.includes(term))
    return Promise.resolve(mockTodos)
  })

  return findTodos('test task').then((results) => {
    const lineCount = results.trim().split('\n').length
    return expect(lineCount).toBe(3)
  })
})
