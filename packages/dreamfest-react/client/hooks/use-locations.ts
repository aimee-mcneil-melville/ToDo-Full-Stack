import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import type { Location } from '../../models/Location.ts'

export default function useLocations() {
  return useQuery({
    queryKey: ['location'],
    queryFn: async () => {
      const res = await request.get('/api/v1/locations')
      if (res.ok) {
        return res.body as { locations: Location[] }
      }

      throw new Error(res.text)
    },
  })
}
