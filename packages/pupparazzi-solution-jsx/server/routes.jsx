import { Router } from 'express'
import { renderToStaticMarkup } from 'react-dom/server'
import * as lib from './lib.js'
import Home from './components/Home.jsx'
import Details from './components/Details.jsx'
import Layout from './components/Layout.jsx'
import Edit from './components/Edit.jsx'
import New from './components/New.jsx'

const router = Router()

export default router

router.get('/', async (req, res, next) => {
  try {
    const puppyData = await lib.getPuppyData()
    res.send(
      renderToStaticMarkup(
        <Layout>
          <Home puppies={puppyData} />
        </Layout>
      )
    )
  } catch (err) {
    next(err)
  }
})

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const puppyDetails = await lib.getPuppyById(id)
    res.send(
      renderToStaticMarkup(
        <Layout>
          <Edit puppyDetails={puppyDetails} />
        </Layout>
      )
    )
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
  res.send(
    renderToStaticMarkup(
      <Layout>
        <New />
      </Layout>
    )
  )
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
    res.send(
      renderToStaticMarkup(
        <Layout>
          <Details puppyDetails={puppyDetails} />
        </Layout>
      )
    )
  } catch (err) {
    if (err.code === 404) {
      res.sendStatus(404)
      return
    }

    next(err)
  }
})
