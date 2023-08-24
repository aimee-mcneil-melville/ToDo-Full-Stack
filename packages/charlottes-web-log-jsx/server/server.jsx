import express from 'express'
import * as Path from 'node:path'

import { renderToString } from 'react-dom/server'
import Layout from './components/Layout'

const server = express()
export default server

const __dirname = Path.dirname(new URL(import.meta.url).pathname)

// Server configuration
const publicFolder = Path.join(__dirname, '../public')
console.log('publicFolder', publicFolder)
server.use(express.static(publicFolder))

server.get('/', (req, res) => {
  res.send(
    renderToString(
      <Layout>
        <h1>The future home of Charlotte&apos;s web log!</h1>
      </Layout>
    )
  )
})
