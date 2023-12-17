import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import request from 'superagent'
import TicketView from '../components/TicketView'

export default function Ticket() {
  const { id } = useParams()
  if (!id) {
    throw new Error()
  }

  const ticket = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      const data = await request.get(`/api/v1/tickets/${id}`)
      return data.body
    },
  })

  if (ticket.isLoading) {
    return <p>Loading...</p>
  }

  if (ticket.isError || !ticket.data) {
    return <p>error</p>
  }

  return <TicketView {...ticket.data} />
}
