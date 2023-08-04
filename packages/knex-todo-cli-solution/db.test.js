import { test, expect, beforeEach, afterEach } from 'vitest'
import { getTestDb, initialise, cleanup } from './test-environment'
import {
  getAll,
  addTodo,
  completeTodo,
  deleteTodo,
  findTodos,
  updateTodo,
  close,
} from './db.js'

let testDb = null

beforeEach(async () => {
  testDb = getTestDb()
  await initialise(testDb)
})

afterEach(() => cleanup(testDb))

test('getAll gets all todos', () => {
  const expected = 3
  return getAll(testDb).then((todos) => {
    const actual = todos.length
    return expect(actual).toBe(expected)
  })
})

test('addTodo adds a todo', () => {
  return addTodo('add a new test task', testDb).then((newIds) => {
    return expect(newIds[0]).toBe(4)
  })
})

test('completeTodo completes a todo', () => {
  const id = 2
  return completeTodo(id, testDb)
    .then(() => {
      return testDb('todos').where('id', id).first()
    })
    .then((todo) => {
      return expect(todo.completed).toBeTruthy()
    })
})

test('deleteTodo deletes a todo', () => {
  return deleteTodo(3, testDb)
    .then(() => testDb('todos').select())
    .then((todos) => {
      return expect(todos).toHaveLength(2)
    })
})

test('findTodos returns matching todos', () => {
  return findTodos('mow', testDb).then((todos) => {
    return expect(todos).toHaveLength(1)
  })
})

test('updateTodo updates a todo', () => {
  return updateTodo(2, 'updated', testDb)
    .then(() => testDb('todos').where('id', 2).first())
    .then((todo) => {
      return expect(todo.task).toMatch('updated')
    })
})

test('close destroys the database connection', () => {
  const errMessage = 'Unable to acquire a connection'
  const query = close(testDb).then(() => {
    // attempt to query using a closed connection
    return testDb.raw('SELECT 1')
  })

  return expect(query).rejects.toMatchObject({ message: errMessage })
})
