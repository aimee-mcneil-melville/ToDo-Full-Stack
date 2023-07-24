import {
  getAll,
  close,
  addTodo as _addTodo,
  completeTodo as _completeTodo,
  deleteTodo as _deleteTodo,
  findTodos as _findTodos,
  updateTodo as _updateTodo,
} from './db.js'

export {
  listTodos,
  addTodo,
  completeTodo,
  deleteTodo,
  findTodos,
  updateTodo,
  logError,
}

function listTodos() {
  return getAll().then(formatTodos).catch(logError).finally(close)
}

function addTodo(todo) {
  return _addTodo(todo).then(listTodos).catch(logError).finally(close)
}

function completeTodo(id) {
  return _completeTodo(id).then(listTodos).catch(logError).finally(close)
}

function deleteTodo(id) {
  return _deleteTodo(id).then(listTodos).catch(logError).finally(close)
}

function findTodos(search) {
  return _findTodos(search).then(formatTodos).catch(logError).finally(close)
}

function updateTodo(id, task) {
  return _updateTodo(id, task).then(listTodos).catch(logError).finally(close)
}

function formatTodos(todos) {
  let formatted = ''
  todos.forEach((todo) => {
    const { id, task, completed } = todo
    const status = completed ? '(completed)' : ''
    formatted += `${id}: ${task} ${status}` + '\n'
  })
  return formatted
}

function logError(err) {
  // eslint-disable-next-line no-console
  console.error('Uh oh!', err.message)
}
