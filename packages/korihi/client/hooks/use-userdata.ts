import { useQuery } from '@tanstack/react-query'
import useCredentials from './use-auth.ts'
import request from 'superagent'
import { User } from '../../models/User.ts'
import { API_HOST } from '../api-host.ts'

export function useUserData(id: string | undefined) {
  const { username, password } = useCredentials()

  return useQuery({
    queryKey: ['user', id, { username, password }],
    queryFn: async () => {
      if (!username || !password) {
        throw new Error()
      }

      const res = await request
        .get(`${API_HOST}/api/v1/users/${id}`)
        .auth(username, password, { type: 'basic' })

      return res.body as User
    },
    enabled: !!(username && password && id),
  })
}
