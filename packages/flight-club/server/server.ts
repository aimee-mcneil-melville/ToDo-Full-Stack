import express from 'express'
import * as flightsDb from './db/index.ts'
const server = express()
export default server

server.use(express.json())

server.get('/api/v1/tickets/:ticket', async (req, res, next) => {
  try {
    const ticketNo = req.params.ticket || '1234567890'
    // TODO: call db function to get ticket data

    const result = await flightsDb.fullTicketInfo(ticketNo)
    if (result == undefined) {
      res.sendStatus(404)
      return
    }

    const { arrival, departure, ...ticket } = result
    console.log({ arrival, departure })
    const data = {
      ...ticket,
      arrival: new Date(+arrival).toLocaleString(),
      departure: new Date(+departure).toLocaleString(),
      date: new Date(+departure).toLocaleDateString(),
      carrier: 'Air New Zealand',
      seat: '14B',
      class: 'Business',
      gate: '22',
    }

    res.json(data)
  } catch (err) {
    next(err)
  }
})
