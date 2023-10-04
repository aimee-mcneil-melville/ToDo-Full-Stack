import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '../components/Layout.tsx'
import ShowLocation from '../components/ShowLocation.tsx'
import * as db from '../db/index.ts'
import EditLocation from '../components/EditLocation.tsx'

const router = express.Router()

// GET /locations
router.get('/', async (req, res) => {
  // TODO: Replace this with all of the locations in the database
  const locations = await db.getAllLocations()

  res.send(
    renderToStaticMarkup(
      <Layout>
        <ShowLocation locations={locations} />
      </Layout>
    )
  )
})

// GET /locations/4/edit
router.get('/:id/edit', async (req, res) => {
  const id = Number(req.params.id)

  // TODO: Get the location based on its id and replace this viewData
  const location = await db.getLocationById(id)

  res.send(
    renderToStaticMarkup(
      <Layout>
        <EditLocation location={location} />
      </Layout>
    )
  )
})

// POST /locations/edit
router.post('/edit', async (req, res, next) => {
  try {
    const { id, ...data } = req.body
    await db.updateLocation(id, data)
    res.redirect('/locations')
  } catch (e) {
    next(e)
  }
})

export default router
