const db = require('./db')

module.exports = {
  listTodos,
  addTodo,
  completeTodo,
  deleteTodo,
  findTodos,
  updateTodo,
  logError
}

function listTodos () {
  return db.getAll()
    .then(formatTodos)
    .catch(logError)
    .finally(db.close)
}

function addTodo (todo) {
  return db.addTodo(todo)
    .then(listTodos)
    .catch(logError)
    .finally(db.close)
}

function completeTodo (id) {
  return db.completeTodo(id)
    .then(listTodos)
    .catch(logError)
    .finally(db.close)
}

function deleteTodo (id) {
  return db.deleteTodo(id)
    .then(listTodos)
    .catch(logError)
    .finally(db.close)
}

function findTodos (search) {
  return db.findTodos(search)
    .then(formatTodos)
    .catch(logError)
    .finally(db.close)
}

function updateTodo (id, task) {
  return db.updateTodo(id, task)
    .then(listTodos)
    .catch(logError)
    .finally(db.close)
}

function formatTodos (todos) {
  let formatted = ''
  todos.forEach(todo => {
    const { id, task, completed } = todo
    const status = completed ? '(completed)' : ''
    formatted += `${id}: ${task} ${status}` + '\n'
  })
  return formatted
}

function logError (err) {
  // eslint-disable-next-line no-console
  console.error('Uh oh!', err.message)
}
