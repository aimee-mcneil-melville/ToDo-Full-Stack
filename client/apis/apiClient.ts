// import request from 'superagent'

export async function fetchTodos() {
  const fakeData = [
    {
      id: 1,
      task: 'eat a burger',
      completed: false,
    },
    {
      id: 2,
      task: 'recreate beanbag pile',
      completed: true,
    },
    {
      id: 3,
      task: 'paint a car',
      completed: false,
    },
  ]
  return fakeData
}

export async function addTodo(task) {
  return
}
