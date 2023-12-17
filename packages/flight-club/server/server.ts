import express from 'express'
import * as flightsDb from './db/index.ts'
const server = express()
export default server

server.use(express.json())

server.get('/api/v1/tickets/:ticket', async (req, res, next) => {
  try {
    const ticketNo = req.params.ticket || '1234567890'
    // TODO: call db function to get ticket data
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

    res.json(data)
  } catch (err) {
    next(err)
  }
})
