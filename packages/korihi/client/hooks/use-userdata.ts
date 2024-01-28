import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { User } from '../../models/User.ts'
import { API_HOST, PASSWORD, USERNAME } from '../env.ts'

export function useUserData(id: string | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await request
        .get(`${API_HOST}/api/v1/users/${id}`)
        .auth(USERNAME, PASSWORD, { type: 'basic' })

      return res.body as User
    },
  })
}
