import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Event } from '../../models/Event'

export default function useEventData(id: number) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/events/${id}`)
      return res.body as Event
    },
  })
}
