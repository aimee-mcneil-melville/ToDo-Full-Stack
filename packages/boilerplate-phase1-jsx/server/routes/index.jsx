import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'

import Layout from '../components/Layout.jsx'
import Index from '../components/Index.jsx'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(
    renderToStaticMarkup(
      <Layout>
        <Index />
      </Layout>
    )
  )
})

export default router
