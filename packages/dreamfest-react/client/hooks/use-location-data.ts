import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import { Location } from '../../models/Location.ts'

export default function useLocationData(id: number) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/locations/${id}`)
      return res.body as Location
    },
  })
}
