import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { EventData } from '../../models/Event.js'

export default function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: EventData) => {
      await request.post('/api/v1/events').send(data)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['schedule'])
    },
  })
}
