import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { EventWithLocation } from '../../models/Event'

export default function useSchedule(day: string) {
  return useQuery({
    queryFn: async () => {
      const res = await request.get(`/api/v1/schedule/${day}`)
      return res.body as { events: EventWithLocation[] }
    },

    queryKey: ['schedule', day],
  })
}
