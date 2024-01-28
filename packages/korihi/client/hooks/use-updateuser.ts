import request from 'superagent'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { API_HOST, USERNAME, PASSWORD } from '../env.ts'

export function useUpdateUser() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (values: {
      display_name?: string
      bio?: string
      personal_pronouns?: string
    }) => {
      const res = await request
        .put(`${API_HOST}/api/v1/users/${PASSWORD}`)
        .auth(USERNAME, PASSWORD, { type: 'basic' })
        .send(values)

      return res.body
    },
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['user', USERNAME] })
    },
  })
}
