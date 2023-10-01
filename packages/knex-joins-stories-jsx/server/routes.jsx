import express from 'express'
import { renderToString } from 'react-dom/server'
import Layout from './components/Layout'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(
    renderToString(
      <Layout>
        <p>WOMBLES!</p>
      </Layout>
    )
  )
})

export default router
