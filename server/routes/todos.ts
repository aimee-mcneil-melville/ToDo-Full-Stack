import { Router } from 'express'
import * as db from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
    res.json(tasks)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const task = await db.getTaskById(id)
    res.json(task)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const newTask = req.body
    await db.createTask(newTask)
    res.json(newTask)
  } catch (error) {
    console.log(error)
    res.sendStatus(501)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteTask(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { task } = req.body
    // const updatedTask = {
    //   task: task,
    //   completed: completed,
    // }
    await db.updateTask(id, task)
    res.json(202)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
    next(error)
  }
})

export default router
