import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

export default function useDeleteEvent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await request.delete(`/api/v1/events/${id}`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['schedule'])
    },
  })
}
