import { Router } from 'express'

import * as lib from './lib.js'

const router = Router()

export default router

router.get('/', async (req, res, next) => {
  try {
    const puppyData = await lib.getPuppyData()
    res.render('home', puppyData)
  } catch (err) {
    next(err)
  }
})

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const puppyDetails = await lib.getPuppyById(id)
    res.render('edit', puppyDetails)
  } catch (err) {
    next(err)
  }
})

router.post('/edit/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, breed, owner, image } = req.body
    const updatedPuppy = { id, name, breed, owner, image }
    await lib.editPuppy(updatedPuppy)
    res.redirect('/' + id)
  } catch (err) {
    if (err.code === 404) {
      res.sendStatus(404)
      return
    }

    next(err)
  }
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res, next) => {
  try {
    const { name, breed, owner, image } = req.body
    const newPuppy = { name, breed, owner, image }
    const id = await lib.addNewPuppy(newPuppy)
    res.redirect('/' + id)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const puppyDetails = await lib.getPuppyById(id)
    res.render('details', puppyDetails)
  } catch (err) {
    if (err.code === 404) {
      res.sendStatus(404)
      return
    }

    next(err)
  }
})
