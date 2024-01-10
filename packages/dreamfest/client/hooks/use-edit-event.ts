import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Event } from '../../models/Event'

export default function useEditEvent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: Event) => {
      await request.patch(`/api/v1/events/${id}`).send(values)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['event', id])
      queryClient.invalidateQueries(['schedule'])
    },
  })
}
