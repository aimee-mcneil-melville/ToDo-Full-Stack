import request from 'superagent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_HOST } from '../api-host'
import useCredentials from './use-auth'

export function useUpdateUser() {
  const qc = useQueryClient()
  const { username, password } = useCredentials()

  return useMutation({
    mutationFn: async (values: {
      display_name?: string
      bio?: string
      personal_pronouns?: string
    }) => {
      if (!username || !password) {
        throw new Error('Missing credentials')
      }

      const res = await request
        .put(`${API_HOST}/api/v1/users/${username}`)
        .auth(username, password, { type: 'basic' })
        .send(values)

      return res.body
    },
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['user'] })
      qc.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
