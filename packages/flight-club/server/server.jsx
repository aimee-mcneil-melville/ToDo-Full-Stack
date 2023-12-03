import express from 'express'
import * as Path from 'node:path/posix'
import * as URL from 'node:url'
import { renderToString } from 'react-dom/server'

import Layout from './components/Layout.jsx'
import Ticket from './components/Ticket.jsx'

const server = express()
export default server

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

server.use(express.static(Path.join(__dirname, '..', 'public')))

server.get('/:ticket', async (req, res) => {
  // TODO: call db function to get ticket data

  const ticketNo = req.params.ticket || '1234567890'

  const data = {
    name: 'Jenny Rosen',
    from: 'SYD',
    to: 'LAX',
    carrier: 'Air New Zealand',
    date: '05 Aug 2020',
    seat: '14B',
    class: 'Business',
    ticketNo,
    flightNo: 'NZ1',
    gate: '22',
    departure: '09 Aug 2020 10:00',
    arrival: '10 Aug 2020 17:00',
  }

  res.send(
    renderToString(
      <Layout>
        <Ticket ticket={data} />
      </Layout>
    )
  )
})
