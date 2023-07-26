import { Router } from 'express'
import { addTask, deleteTask, getAllTasks, updateTask } from '../db/tasks.ts'

const router = Router()

//GET /api/v1/todos
router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (err) {
    console.error(`Database error: ${err}`)
    res.sendStatus(500)
  }
})

//POST /api/v1/todos
router.post('/', async (req, res) => {
  try {
    await addTask(req.body)
    res.sendStatus(201)
  } catch (err) {
    console.error(`Database error: ${err}`)
    res.sendStatus(500)
  }
})

//POST /api/v1/todos/:id
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await updateTask(id, req.body)
    res.sendStatus(200)
  } catch (err) {
    console.error(`Database error: ${err}`)
    res.sendStatus(500)
  }
})

//DELETE /api/v1/todos/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await deleteTask(id)
    res.sendStatus(200)
  } catch (err) {
    console.error(`Database error: ${err}`)
    res.sendStatus(500)
  }
})

export default router
